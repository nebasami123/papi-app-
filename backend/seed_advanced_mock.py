import os
import random
import time
from database import supabase

def seed_advanced_data():
    if not supabase:
        print("Missing Supabase client")
        return

    print("Clearing old mock data...")
    try:
        supabase.table("cot_history").delete().neq("id", -1).execute()
        supabase.table("central_bank_rates").delete().neq("id", -1).execute()
    except Exception as e:
        print(f"Error clearing data: {e}")

    currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"]

    # 1. Seed Central Bank Rates
    print("Seeding Central Bank Rates...")
    banks = {
        "USD": {"bank": "Federal Reserve (Fed)", "rate": 5.50, "bias": "Hawkish"},
        "EUR": {"bank": "European Central Bank (ECB)", "rate": 4.50, "bias": "Neutral"},
        "GBP": {"bank": "Bank of England (BoE)", "rate": 5.25, "bias": "Hawkish"},
        "JPY": {"bank": "Bank of Japan (BoJ)", "rate": 0.10, "bias": "Dovish"},
        "AUD": {"bank": "Reserve Bank of Australia (RBA)", "rate": 4.35, "bias": "Neutral"},
        "CAD": {"bank": "Bank of Canada (BoC)", "rate": 5.00, "bias": "Neutral"},
        "CHF": {"bank": "Swiss National Bank (SNB)", "rate": 1.50, "bias": "Dovish"},
        "NZD": {"bank": "Reserve Bank of New Zealand (RBNZ)", "rate": 5.50, "bias": "Hawkish"},
    }
    
    rates = []
    for cur, data in banks.items():
        rates.append({
            "bank": data["bank"],
            "currency": cur,
            "rate": data["rate"],
            "next_meeting": "2024-06-01",
            "bias": data["bias"]
        })
    supabase.table("central_bank_rates").insert(rates).execute()

    # 2. Seed COT History (12 weeks for 8 currencies)
    print("Seeding COT History...")
    cot_data = []
    for cur in currencies:
        # Generate a semi-random walk for net position
        current_pos = random.randint(30, 70)
        
        for w in range(12, 0, -1):
            if cur == "USD": current_pos += random.randint(-2, 5) # USD trending up
            elif cur == "JPY": current_pos += random.randint(-5, 1) # JPY trending down
            else: current_pos += random.randint(-6, 6) # Others random
            
            # keep within bounds 0-100
            current_pos = max(5, min(95, current_pos))
            
            trend = "Neutral"
            if current_pos > 60: trend = "Up"
            elif current_pos < 40: trend = "Down"

            cot_data.append({
                "currency": cur,
                "week": f"Week {13 - w}",
                "net_position": current_pos,
                "trend": trend
            })
            
    # Insert in chunks to avoid large payloads if any
    chunk_size = 20
    for i in range(0, len(cot_data), chunk_size):
        supabase.table("cot_history").insert(cot_data[i:i+chunk_size]).execute()

    print("Advanced mock seeding complete!")

if __name__ == "__main__":
    seed_advanced_data()
