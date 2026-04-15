import { TradeJournal } from "@/components/journal/TradeJournal"
import { CommunitySharing } from "@/components/journal/CommunitySharing"

export default function JournalPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Trade Journal & Context Logging
            </h1>
            <p className="text-neutral-400 mt-1">Record executions backed up with fundamental metric snapshots</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TradeJournal />
          </div>
          <div className="lg:col-span-1">
            <CommunitySharing />
          </div>
        </div>
        
      </div>
    </main>
  );
}
