import httpx
import logging

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Replace with your actual Discord Webhook URI generated from Server Settings > Integrations
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_MOCK_ID/YOUR_MOCK_TOKEN"

async def dispatch_discord_alert(title: str, description: str, color: int = 15158332):
    """
    Sends an embedded message payload to a Discord webhook.
    For this MVP, it prints to the terminal if the URL is not configured.
    """
    if "YOUR_MOCK_ID" in DISCORD_WEBHOOK_URL:
        # Mock Interceptor
        logger.info(f"========== DISCORD WEBHOOK INTERCEPTED ==========")
        logger.info(f"Title: {title}")
        logger.info(f"Body:  {description}")
        logger.info(f"=================================================")
        return True

    payload = {
        "embeds": [{
            "title": title,
            "description": description,
            "color": color
        }]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(DISCORD_WEBHOOK_URL, json=payload)
            response.raise_for_status()
            logger.info("Successfully dispatched Discord webhook alert.")
            return True
    except Exception as e:
        logger.error(f"Failed to trigger webhook: {e}")
        return False
