import { RiskGauge } from "@/components/intermarket/RiskGauge"
import { CorrelationMatrix } from "@/components/intermarket/CorrelationMatrix"
import { SeasonalityHeatmap } from "@/components/intermarket/SeasonalityHeatmap"

export default function IntermarketPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Intermarket Intelligence
            </h1>
            <p className="text-neutral-400 mt-1">Cross-Asset Divergences, Risk Environment & Seasonality flows</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RiskGauge />
          <div className="lg:col-span-2">
            <CorrelationMatrix />
          </div>
        </div>
        
        <SeasonalityHeatmap />
      </div>
    </main>
  );
}
