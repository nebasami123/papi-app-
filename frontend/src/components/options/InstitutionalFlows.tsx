"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { DatabaseZap } from "lucide-react"

export function InstitutionalFlows() {
  const mockFlows = [
    { id: 1, time: "14:22:05", pair: "EUR/USD", side: "BUY", size: "450M", price: "1.0850", type: "Dark Pool" },
    { id: 2, time: "14:15:30", pair: "USD/JPY", side: "SELL", size: "1.2B", price: "151.20", type: "Block Trade" },
    { id: 3, time: "13:45:10", pair: "GBP/USD", side: "SELL", size: "200M", price: "1.2640", type: "Sweep" },
    { id: 4, time: "13:10:00", pair: "EUR/USD", side: "BUY", size: "550M", price: "1.0845", type: "Dark Pool" },
    { id: 5, time: "12:30:22", pair: "AUD/USD", side: "BUY", size: "150M", price: "0.6510", type: "Block Trade" },
  ]

  return (
    <Card className="border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DatabaseZap className="w-5 h-5 text-indigo-500" />
            Institutional Dark Pool Flows
          </div>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-500 uppercase border-b border-white/10">
              <tr>
                <th className="pb-2">Time</th>
                <th className="pb-2">Pair</th>
                <th className="pb-2">Side</th>
                <th className="pb-2 text-right">Size</th>
                <th className="pb-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockFlows.map((flow) => (
                <tr key={flow.id} className="hover:bg-white/5 transition group">
                  <td className="py-3 text-neutral-400 font-mono text-xs">{flow.time}</td>
                  <td className="py-3 font-bold">{flow.pair}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${flow.side === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {flow.side}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-neutral-200">{flow.size}</td>
                  <td className="py-3 text-right font-mono text-fuchsia-400">{flow.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

