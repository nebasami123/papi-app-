import { EconomicCalendar } from "@/components/dashboard/EconomicCalendar";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { NewsFeed } from "@/components/dashboard/NewsFeed";
import { CotChart } from "@/components/dashboard/CotChart";
import { CentralBankRates } from "@/components/dashboard/CentralBankRates";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">FX</span>
              News Platform
            </h1>
            <p className="text-neutral-400 mt-1">Fundamentals, Sentiment & Institutional Positioning</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full border border-white/10 bg-black/50 text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Market Open
            </div>
            <button className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition">
              Launch WebTrader
            </button>
          </div>
        </header>

        <CentralBankRates />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScoreCard />
          <NewsFeed />
          <CotChart />
        </div>

        <EconomicCalendar />
        
      </div>
    </main>
  );
}
