import { CentralBankRates } from "@/components/dashboard/CentralBankRates"
import { PolicyDiffTool } from "@/components/banks/PolicyDiffTool"

export default function BanksPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Central Bank Policy Tracker
            </h1>
            <p className="text-neutral-400 mt-1">Interest Rate Divergences & Policy Statement Analysis</p>
          </div>
        </header>

        <CentralBankRates />
        <PolicyDiffTool />
      </div>
    </main>
  );
}
