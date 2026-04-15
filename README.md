# 🌐 Institutional Forex Intelligence Platform

A high-performance, unified dashboard engineered for quantitative and retail forex traders. This platform aggregates live macroeconomic fundamentals, AI-driven sentiment analysis, COT (Commitment of Traders) positioning data, and complex intermarket correlations into a single interactive `Next.js` and `FastAPI` ecosystem.

### Features
This platform acts as a terminal capable of executing heavily data-intensive operations entirely through visually responsive UI components:

* **Live Market Sentiment Hub:** NLP-based pipeline classifying real-time news sources into Bullish/Bearish vectors, aggregated alongside explicit retail tracking (Long/Short ratios).
* **Intermarket Risk Engines:** Dynamic heatmap matrices displaying 60-day Pearson correlations across currencies, equities (S&P 500), and commodities (Gold, Crude Oil), coupled with a composite Risk-On / Risk-Off VIX gauge.
* **Institutional Options Flow:** Dedicated derivatives dashboard visualizing Open Interest Volume Profiles, Dark Pool block alerts, and implied Volatility Smiles directly within the browser.
* **Central Bank Policy Differencing:** An intelligent diff-analyzer that visually highlights hawkish and dovish semantic shifts between consecutive central bank monetary policy statements.
* **Algorithmic Alert Builder:** A visual drag-and-drop boolean builder that allows traders to string complex multi-variable conditions (e.g. `IF EUR/USD COT Index > 80 AND Retail Sentiment > 75% Short = FIRE CONTRARIAN WEBHOOK`).

## ⚙️ Architecture Stack

This repository is organized into a completely decoupled `backend` and `frontend` monorepo structure.

**Frontend (`/frontend`)**
* Next.js 14 (React) Native Client Components
* Tailwind CSS for heavy "Dark-Mode First" Glassmorphism UI
* Recharts (Complex Parabolic Skews and Distribution Charting)
* Zustand / React Context (Global Alert State handling)

**Backend (`/backend`)**
* Python 3.11+ / FastAPI
* Supabase PostgreSQL connection bindings
* Advanced Webhooks Subsystem (`notifications.py`)
* Background Cron Schedulers mapping third-party CSV ingestion

## 🚀 Getting Started

### 1. Boot up the Backend Pipeline
The backend requires a `Supabase` PostgreSQL connection stream to serialize the economic and fundamental ticks.

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `/backend` and pass in your unique credentials:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

Run the FastAPI Uvicorn engine:
```bash
uvicorn main:app --reload
```

### 2. Launch the Application Frontend
Run the UI on `localhost:3000`.

```bash
cd frontend
npm install
npm run dev
```

## 🔗 Extensibility API (Phase 4)
The backend exposes public REST endpoints intended for headless trading algorithms to scrape clean sentiment data dynamically without interacting with the UI. Check `localhost:8000/docs` while the backend is active to review the Swagger OpenAPI specification.
