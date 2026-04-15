"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ActivitySquare } from "lucide-react"

export function RiskGauge() {
  // 1 to 10 scale (1 = Max Risk-Off Panic, 10 = Max Risk-On Euphoria)
  const currentRiskScore = 7.5;
  const isRiskOn = currentRiskScore >= 6;
  const isNeutral = currentRiskScore < 6 && currentRiskScore > 4;

  return (
    <Card className="col-span-1 border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ActivitySquare className="w-5 h-5 text-cyan-500" />
          Market Risk Gauge
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4">
        
        <div className="relative w-48 h-48 rounded-full border-[8px] border-white/5 flex items-center justify-center bg-black/40 overflow-hidden shadow-2xl">
          {/* Semicircle color overlay driven by risk score */}
          <div 
            className={`absolute bottom-0 w-full transition-all duration-1000 ${
              isRiskOn ? "bg-green-500/30 border-t border-green-500" :
              isNeutral ? "bg-yellow-500/30 border-t border-yellow-500" :
              "bg-red-500/30 border-t border-red-500"
            }`}
             style={{ height: `${(currentRiskScore / 10) * 100}%` }}
          ></div>
          
          <div className="z-10 flex flex-col items-center">
            <span className="text-5xl font-black">{currentRiskScore}</span>
            <span className={`text-sm font-bold uppercase tracking-wider mt-1 ${
              isRiskOn ? "text-green-400" : isNeutral ? "text-yellow-400" : "text-red-400"
            }`}>
              {isRiskOn ? "Risk-On" : isNeutral ? "Neutral" : "Risk-Off"}
            </span>
          </div>
        </div>

        <div className="w-full mt-8 space-y-3">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest text-center mb-4 border-b border-white/10 pb-2">Composite Drivers</h4>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">VIX Volatility</span>
            <span className="text-green-400 font-bold font-mono">13.4 (Low)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">S&P 500 Trend</span>
            <span className="text-green-400 font-bold font-mono">+1.2% (Up)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">US10Y Yields</span>
            <span className="text-yellow-400 font-bold font-mono">4.52% (Flat)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-400">JPY/CHF Strength</span>
            <span className="text-red-400 font-bold font-mono">Weakening</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
