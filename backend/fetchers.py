import os
import requests
from datetime import datetime
from database import supabase

NEWS_API_KEY = os.environ.get("NEWS_API_KEY")

ALPHA_VANTAGE_API_KEY = os.environ.get("ALPHA_VANTAGE_API_KEY")

def fetch_and_store_news():
    print("Fetching AI sentiment news from Alpha Vantage...")
    if not supabase:
        print("Missing Supabase client.")
        return

    # Try Alpha Vantage First
    av_url = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_macro&apikey={ALPHA_VANTAGE_API_KEY}&limit=15"
    
    try:
        if ALPHA_VANTAGE_API_KEY:
            av_res = requests.get(av_url)
            av_data = av_res.json()
            
            # Check if rate limit hit or error
            if "Information" not in av_data and "feed" in av_data:
                print("Successfully fetched AV AI News!")
                articles = av_data.get("feed", [])
                
                for article in articles:
                    title = article.get("title", "")
                    title_lower = title.lower()
                    
                    # Convert AV Label to our standard: Bullish/Bearish/Neutral
                    label = article.get("overall_sentiment_label", "Neutral")
                    sentiment = "Neutral"
                    if "Bullish" in label: sentiment = "Bullish"
                    elif "Bearish" in label: sentiment = "Bearish"
                    
                    # Determine Currency (fallback logic)
                    currency = "USD" # Default macro
                    if "eur" in title_lower or "euro" in title_lower: currency = "EUR"
                    elif "gbp" in title_lower or "pound" in title_lower: currency = "GBP"
                    elif "jpy" in title_lower or "yen" in title_lower: currency = "JPY"
                    
                    time_pub = article.get("time_published", "")
                    try:
                        dt = datetime.strptime(time_pub, "%Y%m%dT%H%M%S")
                        pub_time = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
                    except:
                        pub_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                        
                    record = {
                        "title": title,
                        "source": article.get("source", "Unknown"),
                        "published_at": pub_time,
                        "sentiment": sentiment,
                        "currency": currency
                    }
                    
                    existing = supabase.table("news_feed").select("id").eq("title", title).execute()
                    if not existing.data:
                        supabase.table("news_feed").insert(record).execute()
                print("AI Sentiment correctly seeded via Alpha Vantage")
                return # Exit if successful
                
        print("Alpha Vantage failed or limited, falling back to NewsAPI keyword scanner...")
        # Fallback to NewsAPI
        if not NEWS_API_KEY: return
        news_url = f"https://newsapi.org/v2/everything?q=forex OR currency OR USD OR EUR&apiKey={NEWS_API_KEY}&language=en&sortBy=publishedAt&pageSize=10"
        response = requests.get(news_url)
        data = response.json()
        
        if data.get("status") == "ok":
            articles = data.get("articles", [])
            for article in articles:
                title = article.get("title", "")
                title_lower = title.lower()
                sentiment = "Neutral"
                if any(word in title_lower for word in ["surge", "jump", "high", "positive", "growth", "cut"]):
                    sentiment = "Bullish"
                elif any(word in title_lower for word in ["drop", "fall", "low", "negative", "recession", "hike"]):
                    sentiment = "Bearish"
                
                currency = "USD"
                if "eur" in title_lower or "euro" in title_lower: currency = "EUR"
                elif "gbp" in title_lower or "pound" in title_lower: currency = "GBP"
                elif "jpy" in title_lower or "yen" in title_lower: currency = "JPY"

                record = {
                    "title": title,
                    "source": article.get("source", {}).get("name", "Unknown"),
                    "published_at": article.get("publishedAt"),
                    "sentiment": sentiment,
                    "currency": currency
                }
                
                existing = supabase.table("news_feed").select("id").eq("title", title).execute()
                if not existing.data:
                    supabase.table("news_feed").insert(record).execute()
            print("News successfully updated via NewsAPI (Fallback).")
    except Exception as e:
        print(f"Error fetching news: {e}")

def fetch_and_store_calendar():
    print("Fetching Economic Calendar from Forex Factory...")
    if not supabase:
        print("Missing Supabase client.")
        return

    url = "https://nfs.faireconomy.media/ff_calendar_thisweek.json"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            events = response.json()
            records = []
            now = datetime.now()
            
            # Delete old events just to keep it clean for the week
            supabase.table("economic_calendar").delete().neq("id", -1).execute()

            for item in events:
                # Forex factory uses "country" for currency, and format strings that sometimes lack data
                records.append({
                    "event_time": item.get("date", f"{now.date()}T00:00:00-04:00"),
                    "currency": item.get("country", ""),
                    "impact": item.get("impact", "Low"),
                    "event": item.get("title", "Unknown Event"),
                    "actual": item.get("actual", ""),
                    "forecast": item.get("forecast", ""),
                    "previous": item.get("previous", "")
                })
            
            # Insert in chunks if needed, but usually it's ~100 items per week
            # We'll just insert all at once
            if records:
                supabase.table("economic_calendar").insert(records).execute()
                print(f"Calendar successfully updated with {len(records)} events.")
        else:
            print(f"Failed to fetch calendar, status code: {response.status_code}")
    except Exception as e:
        print(f"Error fetching calendar: {e}")

# Fetch real COT Data or Central Bank rates is generally a paid/complex integration.
# We will use simple mock population functions here for MVP demonstration via Supabase.
def seed_mock_data_if_empty():
    if not supabase: return
    fetch_and_store_calendar()
    
    # 1. Seed COT
    try:
        cot_res = supabase.table("cot_history").select("id").limit(1).execute()
        if not cot_res.data:
            print("Seeding COT History...")
            mock_cot = [
                {"currency": "USD", "week": "Week 12", "net_position": 65, "trend": "Up"},
                {"currency": "EUR", "week": "Week 12", "net_position": 42, "trend": "Down"},
                {"currency": "GBP", "week": "Week 12", "net_position": 51, "trend": "Up"},
            ]
            supabase.table("cot_history").insert(mock_cot).execute()
            
        # 2. Seed Rates
        rates_res = supabase.table("central_bank_rates").select("id").limit(1).execute()
        if not rates_res.data:
            print("Seeding Central Bank Rates...")
            mock_rates = [
                {"bank": "Federal Reserve (Fed)", "currency": "USD", "rate": 5.50, "next_meeting": "2024-05-01", "bias": "Neutral"},
                {"bank": "European Central Bank (ECB)", "currency": "EUR", "rate": 4.50, "next_meeting": "2024-06-06", "bias": "Dovish"},
            ]
            supabase.table("central_bank_rates").insert(mock_rates).execute()
    except Exception as e:
        print(f"Error seeding mock data: {e}")
