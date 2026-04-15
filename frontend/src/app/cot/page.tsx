import { CotChart } from "@/components/dashboard/CotChart";

export default function CotPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              COT Positioning
            </h1>
            <p className="text-neutral-400 mt-1">Commitment of Traders (CFTC) Weekly Institutional Holdings</p>
          </div>
        </header>

        <CotChart />
      </div>
    </main>
  );
}
