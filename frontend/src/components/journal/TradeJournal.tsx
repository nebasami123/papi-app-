"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BookOpen, Camera, Save, ArrowRight } from "lucide-react"
import { useState } from "react"

interface TradeLog {
  id: number;
  pair: string;
  direction: string;
  entryPrice: string;
  conviction: string;
  thesis: string;
  timestamp: string;
}

export function TradeJournal() {
  const [logs, setLogs] = useState<TradeLog[]>([])
  const [pair, setPair] = useState("EUR/USD")
  const [direction, setDirection] = useState("LONG")
  const [entryPrice, setEntryPrice] = useState("")
  const [conviction, setConviction] = useState("High (A+)")
  const [thesis, setThesis] = useState("")

  const handleLogEntry = () => {
    if (!entryPrice || !thesis) return;

    const newLog: TradeLog = {
      id: Date.now(),
      pair,
      direction,
      entryPrice,
      conviction,
      thesis,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setLogs([newLog, ...logs]);
    setEntryPrice("");
    setThesis("");
  }
  return (
    <Card className="border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Execution Journal
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 font-bold uppercase">Pair</label>
            <select value={pair} onChange={(e) => setPair(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50">
              <option>EUR/USD</option>
              <option>USD/JPY</option>
              <option>GBP/USD</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 font-bold uppercase">Direction</label>
            <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50">
              <option>LONG</option>
              <option>SHORT</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 font-bold uppercase">Entry Price</label>
            <input type="text" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} placeholder="1.0850" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50" />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-neutral-500 font-bold uppercase">Conviction</label>
            <select value={conviction} onChange={(e) => setConviction(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50">
              <option>High (A+)</option>
              <option>Medium (B)</option>
              <option>Low (C)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1 mt-4">
          <label className="text-xs text-neutral-500 font-bold uppercase">Fundamental Thesis</label>
          <textarea 
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            placeholder="Why are you taking this trade? (e.g., Extreme retail short positioning combined with a hawkish ECB statement...)" 
            className="w-full h-32 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 resize-none"
          ></textarea>
        </div>

        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-start gap-4">
          <div className="p-2 bg-indigo-500/20 rounded">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-indigo-200">Auto-Snapshot Context</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Saving this entry will automatically capture and attach the current Market Risk Gauge (7.5) and the active EUR spec COT index (82) metadata.
            </p>
          </div>
        </div>

      </CardContent>
      <div className="p-6 pt-4 border-t border-white/5 flex justify-end">
        <button 
          onClick={handleLogEntry}
          disabled={!entryPrice || !thesis}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-black font-bold rounded-lg transition shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" /> Log Entry
        </button>
      </div>

      {logs.length > 0 && (
        <div className="border-t border-white/5 bg-black/20 p-6 flex-1 overflow-y-auto">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Saved Executions</h3>
          <div className="space-y-3">
            {logs.map(log => (
              <div key={log.id} className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.direction === 'LONG' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {log.direction}
                    </span>
                    <span className="font-bold text-neutral-200">{log.pair}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-500" />
                    <span className="font-mono text-neutral-300">{log.entryPrice}</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">{log.timestamp}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-3">{log.thesis}</p>
                <div className="flex gap-2 text-[10px] uppercase font-bold">
                  <span className="px-2 py-1 bg-black/40 rounded text-indigo-300 border border-indigo-500/20">Risk Gauge: 7.5</span>
                  <span className="px-2 py-1 bg-black/40 rounded text-indigo-300 border border-indigo-500/20">COT Index: 82</span>
                  <span className="px-2 py-1 bg-black/40 rounded text-neutral-500 border border-white/5">Bias: {log.conviction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

