import { VolatilitySmile } from "@/components/options/VolatilitySmile"
import { VolumeProfile } from "@/components/options/VolumeProfile"
import { InstitutionalFlows } from "@/components/options/InstitutionalFlows"

export default function OptionsPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Options Flow & Volume Profile
            </h1>
            <p className="text-neutral-400 mt-1">Institutional Dark Pool tracking, Volatility Skew and Price Value mapping</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeProfile />
          <div className="space-y-6 lg:col-span-1">
            <VolatilitySmile />
            <InstitutionalFlows />
          </div>
        </div>
        
      </div>
    </main>
  );
}
