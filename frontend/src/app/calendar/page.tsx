import { EconomicCalendar } from "@/components/dashboard/EconomicCalendar";

export default function CalendarPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              Economic Calendar
            </h1>
            <p className="text-neutral-400 mt-1">Live Macroeconomic Releases & Events</p>
          </div>
        </header>

        <EconomicCalendar />
      </div>
    </main>
  );
}
