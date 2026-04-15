import { RetailSentimentPanel } from "@/components/sentiment/RetailSentimentPanel";
import { SentimentChart } from "@/components/sentiment/SentimentChart";

export default function SentimentPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Sentiment Hub
            </h1>
            <p className="text-neutral-400 mt-1">Deep Dive into Institutional & Retail Market Psychology</p>
          </div>
          
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
            {['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'].map(pair => (
              <button 
                key={pair} 
                className={`px-4 py-1.5 text-sm font-semibold rounded-md ${pair === "EUR/USD" ? "bg-primary text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"} transition-colors`}
              >
                {pair}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <SentimentChart />
          <RetailSentimentPanel />
        </div>
      </div>
    </main>
  );
}
