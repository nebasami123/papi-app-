"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CalendarDays } from "lucide-react"

export function SeasonalityHeatmap() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const pairs = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "USD/CHF"]

  // Mock historical win percentage (e.g. 55 = closed higher 55% of the time in this month over 10yrs)
  const dataMap: Record<string, number[]> = {
    "EUR/USD": [45, 48, 55, 62, 45, 52, 58, 41, 55, 40, 50, 65],
    "GBP/USD": [50, 42, 45, 70, 48, 45, 55, 40, 52, 45, 55, 60],
    "USD/JPY": [55, 60, 65, 45, 50, 42, 40, 55, 58, 62, 55, 40],
    "AUD/USD": [45, 52, 55, 65, 40, 45, 48, 45, 42, 55, 50, 68],
    "USD/CAD": [58, 52, 45, 40, 55, 58, 55, 52, 50, 55, 48, 40],
    "USD/CHF": [52, 50, 48, 42, 55, 50, 45, 58, 48, 60, 52, 38],
  }

  const getHeatmapColor = (winRate: number) => {
    if (winRate >= 65) return "bg-green-500 text-black font-bold"
    if (winRate >= 58) return "bg-green-500/60 text-white"
    if (winRate >= 52) return "bg-green-500/20 text-neutral-300"
    if (winRate >= 48) return "bg-black/50 text-neutral-400"
    if (winRate > 40) return "bg-red-500/20 text-neutral-300"
    if (winRate > 35) return "bg-red-500/60 text-white"
    return "bg-red-500 text-black font-bold"
  }

  return (
    <Card className="border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-500" />
          10-Year Seasonality Vectors
        </CardTitle>
        <p className="text-sm text-neutral-400">
          Historical win-rate distribution indicating the probability of a pair closing the month higher than it opened.
        </p>
      </CardHeader>
      <CardContent>
        
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-center border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="p-2 border-b border-white/10 text-left">Base/Quote</th>
                {months.map((m, i) => (
                  <th key={i} className="p-2 font-mono text-neutral-500 font-bold text-xs">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair) => (
                <tr key={pair}>
                  <td className="p-3 font-bold text-neutral-300 text-left tracking-wide text-xs">{pair}</td>
                  {dataMap[pair].map((val, j) => (
                    <td 
                      key={j} 
                      className={`p-2 rounded transition-all hover:ring-2 ring-white/50 relative cursor-crosshair border border-white/5 ${getHeatmapColor(val)}`}
                      title={`${pair} in ${months[j]} = ${val}% Win Rate`}
                    >
                      {val}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </CardContent>
    </Card>
  )
}

