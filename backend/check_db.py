import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    print("Error: Supabase credentials not found in .env")
    exit(1)

supabase: Client = create_client(url, key)

tables_to_check = ["economic_calendar", "news_feed", "cot_history", "central_bank_rates"]

print("Testing Supabase connection and tables...")
for table in tables_to_check:
    try:
        response = supabase.table(table).select("id").limit(1).execute()
        print(f"OK: Table '{table}' exists and is accessible. Data: {response.data}")
    except Exception as e:
        print(f"ERROR: Error accessing table '{table}': {e}")
