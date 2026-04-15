"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users } from "lucide-react"

type RetailPair = {
  pair: string;
  longPercent: number;
  shortPercent: number;
  signal: string;
}

const mockRetailData: RetailPair[] = [
  { pair: "EUR/USD", longPercent: 68, shortPercent: 32, signal: "Contrarian Short" },
  { pair: "GBP/USD", longPercent: 28, shortPercent: 72, signal: "Contrarian Long" },
  { pair: "USD/JPY", longPercent: 52, shortPercent: 48, signal: "Neutral" },
  { pair: "AUD/USD", longPercent: 19, shortPercent: 81, signal: "Strong Contrarian" },
]

export function RetailSentimentPanel() {
  return (
    <Card className="col-span-1 lg:col-span-2 border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Retail Sentiment Overview
        </CardTitle>
        <p className="text-sm text-neutral-400">
          Live aggregate positioning across major retail brokers. Extreme positioning (&gt;70%) triggers potential contrarian signals.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-2">
          {mockRetailData.map((data) => (
            <div key={data.pair} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold w-20">{data.pair}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded border overflow-hidden ${
                  data.signal.includes("Strong") ? "border-green-500 text-green-400 bg-green-500/10" :
                  data.signal.includes("Contrarian") ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" :
                  "border-neutral-600 text-neutral-400 bg-neutral-800/30"
                }`}>
                  {data.signal}
                </span>
              </div>
              <div className="w-full flex h-3 bg-neutral-800 rounded-full overflow-hidden relative">
                <div 
                  className="bg-green-500 h-full transition-all" 
                  style={{ width: `${data.longPercent}%` }}
                ></div>
                <div 
                  className="bg-red-500 h-full transition-all" 
                  style={{ width: `${data.shortPercent}%` }}
                ></div>
                <div className="absolute inset-0 flex justify-between px-2 items-center text-[9px] font-black mix-blend-difference text-white/80">
                  <span>{data.longPercent}% LONG</span>
                  <span>{data.shortPercent}% SHORT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

