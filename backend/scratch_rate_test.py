import requests
from bs4 import BeautifulSoup

def scrape_central_bank_rates():
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    # Best URL for table format
    url = "https://tradingeconomics.com/country-list/interest-rate"
    
    try:
        html = requests.get(url, headers=headers, timeout=10).text
        soup = BeautifulSoup(html, "html.parser")
        
        rates = {}
        # Find the major row links
        links = soup.find_all("a", href=lambda href: href and "/interest-rate" in href)
        
        for link in links:
            country = link.text.strip()
            # The rate is usually in the next <td> or nearby. Actually, the link is usually in <td>, so:
            td = link.find_parent("td")
            if not td: continue
            
            # get all tds in this tr
            tr = td.find_parent("tr")
            if not tr: continue
            
            all_tds = tr.find_all("td")
            if len(all_tds) >= 2:
                rate_text = all_tds[1].text.strip()
                try:
                    rate_val = float(rate_text)
                    rates[country] = rate_val
                except ValueError:
                    pass
                    
        return rates
    except Exception as e:
        print(f"Error scraping: {e}")
        return {}

if __name__ == "__main__":
    rates = scrape_central_bank_rates()
    print("Scraped rates count:", len(rates))
    for c in ['United States', 'Euro Area', 'United Kingdom', 'Japan', 'Australia', 'Canada', 'Switzerland', 'New Zealand']:
        print(f"{c}: {rates.get(c)}")
