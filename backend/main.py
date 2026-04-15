import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from fetchers import fetch_and_store_news, fetch_cot_from_supabase
import database as db
import logging
from notifications import dispatch_discord_alert
import fetchers

scheduler = BackgroundScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: seed mock data into Supabase if empty
    fetchers.seed_mock_data_if_empty()
    fetchers.fetch_and_store_news()
    
    # Schedule the news fetcher every 30 minutes
    scheduler.add_job(fetchers.fetch_and_store_news, 'interval', minutes=30)
    scheduler.start()
    yield
    # Shutdown
    scheduler.shutdown()

app = FastAPI(title="Forex Platform API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Forex Platform API - Supabase Connected!"}

@app.get("/api/calendar")
def get_calendar():
    if not db.supabase: return {"events": []}
    response = db.supabase.table("economic_calendar").select("*").order("event_time", desc=True).limit(10).execute()
    return {"events": response.data}

@app.get("/api/news")
def get_news():
    if not db.supabase: return {"news": []}
    # Time diff in sqlite/postgres formatting handled natively by supabase client
    response = db.supabase.table("news_feed").select("*").order("published_at", desc=True).limit(10).execute()
    # Format for frontend
    news_formatted = []
    for row in response.data:
        news_formatted.append({
            "id": row["id"],
            "title": row["title"],
            "source": row["source"],
            "time": row["published_at"][:10], # Just date for MVP
            "sentiment": row["sentiment"],
            "currency": row["currency"]
        })
    return {"news": news_formatted}

@app.get("/api/cot")
def get_cot():
    if not db.supabase: return {"cot": {}}
    response = db.supabase.table("cot_history").select("*").order("id").execute()
    # Re-structure for frontend
    cot_data = {}
    for row in response.data:
        cur = row["currency"]
        if cur not in cot_data:
            cot_data[cur] = {"history": []}
        cot_data[cur]["history"].append({"week": row["week"], "net_position": row["net_position"]})
        cot_data[cur]["current_index"] = row["net_position"]
        cot_data[cur]["trend"] = row["trend"]
    return {"cot": cot_data}

@app.get("/api/central-banks")
def get_central_banks():
    return {"rates": [
        {"currency": "USD", "rate": 5.50, "bank": "Federal Reserve (Fed)", "bias": "Hawkish"},
        {"currency": "EUR", "rate": 4.50, "bank": "European Central Bank (ECB)", "bias": "Neutral"},
        {"currency": "GBP", "rate": 5.25, "bank": "Bank of England (BoE)", "bias": "Hawkish"},
        {"currency": "JPY", "rate": 0.10, "bank": "Bank of Japan (BoJ)", "bias": "Dovish"},
        {"currency": "AUD", "rate": 4.35, "bank": "Reserve Bank of Australia (RBA)", "bias": "Neutral"},
        {"currency": "CAD", "rate": 5.00, "bank": "Bank of Canada (BoC)", "bias": "Neutral"},
        {"currency": "CHF", "rate": 1.50, "bank": "Swiss National Bank (SNB)", "bias": "Dovish"},
        {"currency": "NZD", "rate": 5.50, "bank": "Reserve Bank of New Zealand (RBNZ)", "bias": "Hawkish"}
    ]}

# ---------------------------------------------------------
# Phase 4: Expansion (v1 Public API and Webhooks)
# ---------------------------------------------------------

@app.get("/api/v1/trigger-mock-webhook")
async def trigger_mock_webhook():
    """Endpoint to physically test the Discord Webhook execution."""
    success = await dispatch_discord_alert(
        title="⚠️ Extreme Retail Sentiment (EUR/USD)",
        description="Retail positioned 82% SHORT. Contrarian LONG signal generated. COT Index agrees.",
        color=3447003 # Blue
    )
    return {"dispatched": success}

@app.get("/api/v1/sentiment/live")
def get_v1_sentiment_public():
    """Extensibility endpoint for third-party Mobile Apps to scrape clean sentiment data."""
    repo = db.NewsRepository()
    records = repo.get_recent_news(limit=10)
    
    formatted = []
    for r in records:
        formatted.append({
            "headline": r.title,
            "sentiment_label": r.sentiment,
            "currency_tag": r.currency,
            "published_at": r.published_at.isoformat() if r.published_at else None
        })
        
    return {"status": "success", "data": formatted}

@app.get("/api/scorecard")
def get_scorecard():
    if not db.supabase: return {"currencies": []}
    
    currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"]
    scorecard_data = []
    
    for cur in currencies:
        base_score = 50
        bias = "Neutral"
        cot = "Neutral"
        
        # 1. Central bank bias
        rate_res = db.supabase.table("central_bank_rates").select("bias").eq("currency", cur).execute()
        if rate_res.data:
            bias = rate_res.data[0]["bias"]
            if bias == "Hawkish": base_score += 15
            elif bias == "Dovish": base_score -= 15
            
        # 2. COT Trend
        cot_res = supabase.table("cot_history").select("trend", "net_position").eq("currency", cur).order("id", desc=True).limit(1).execute()
        if cot_res.data:
            cot_item = cot_res.data[0]
            if cot_item["trend"] == "Up": 
                cot = "Long"
                base_score += 10
            elif cot_item["trend"] == "Down":
                cot = "Short"
                base_score -= 10
            
            if cot_item["net_position"] > 70: cot = "Extreme Long"
            elif cot_item["net_position"] < 30: cot = "Extreme Short"
            
        # 3. Sentiment from news
        news_res = supabase.table("news_feed").select("sentiment").eq("currency", cur).limit(10).execute()
        bull_count = sum(1 for n in news_res.data if n["sentiment"] == "Bullish")
        bear_count = sum(1 for n in news_res.data if n["sentiment"] == "Bearish")
        
        if bull_count > bear_count: base_score += 15
        elif bear_count > bull_count: base_score -= 15
        
        # Clamp between 0 and 100
        final_score = max(0, min(100, base_score))
        
        scorecard_data.append({
            "name": cur,
            "score": final_score,
            "bias": bias,
            "cot": cot
        })
        
    scorecard_data.sort(key=lambda x: x["score"], reverse=True)
    return {"currencies": scorecard_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

