"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Share2, Copy, Check } from "lucide-react"
import { useState } from "react"

export function CommunitySharing() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    // Mock the clipboard logic
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Share2 className="w-5 h-5 text-indigo-500" />
          Community Hub
        </CardTitle>
        <p className="text-sm text-neutral-400 mt-1">
          Export your custom Alert Rules, Layouts, and Trading Scorecards to share with the Discord community.
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        
        <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-neutral-400 uppercase">My EUR Scorecard Config</h4>
            <button 
              onClick={handleCopy}
              className="p-1 hover:bg-white/10 rounded transition text-indigo-400"
              title="Copy to Clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre className="text-[10px] font-mono text-neutral-600 bg-black/80 p-2 rounded overflow-hidden">
{`{
  "template": "EUR_SCALPER_v1",
  "weights": {
    "cot": 0.4,
    "sentiment": 0.4,
    "cb_bias": 0.2
  },
  "alerts": ["RETAIL > 80", "COT_INDEX < 20"]
}`}
          </pre>
        </div>

        <button className="w-full py-2 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded transition text-sm">
          Import Configuration Code
        </button>

      </CardContent>
    </Card>
  )
}
