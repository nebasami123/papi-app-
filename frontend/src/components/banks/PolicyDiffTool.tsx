"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FileText } from "lucide-react"
import { useState } from "react"

const STATEMENT_DATA: Record<string, { prev: string, currBefore: string, diffText: string, diffType: 'hawkish' | 'dovish', currAfter: string }> = {
  "Federal Reserve (FOMC)": {
    prev: "Recent indicators suggest that economic activity has been expanding at a solid pace. Job gains have remained strong, and the unemployment rate has remained low. Inflation has eased over the past year but remains elevated. The Committee seeks to achieve maximum employment and inflation at the rate of 2 percent over the longer run.",
    currBefore: "Recent indicators suggest that economic activity has been expanding at a solid pace. Job gains have remained strong, and the unemployment rate has remained low. Inflation has eased over the past year but remains elevated. ",
    diffText: "In recent months, there has been a lack of further progress toward the Committee's 2 percent inflation objective.",
    diffType: "hawkish",
    currAfter: " The Committee seeks to achieve maximum employment and inflation at the rate of 2 percent over the longer run."
  },
  "European Central Bank (ECB)": {
    prev: "The Governing Council decided to keep the three key ECB interest rates unchanged. Although inflation has dropped in recent months, it is likely to pick up again temporarily in the near term.",
    currBefore: "The Governing Council decided to keep the three key ECB interest rates unchanged. ",
    diffText: "Inflation has continued to decline faster than anticipated, and most measures of underlying inflation are easing.",
    diffType: "dovish",
    currAfter: " The Governing Council remains determined to ensure that inflation returns to its 2% medium-term target."
  },
  "Bank of England (BoE)": {
    prev: "The Bank of England's Monetary Policy Committee sets monetary policy to meet the 2% inflation target, and in a way that helps to sustain growth and employment.",
    currBefore: "The Bank of England's Monetary Policy Committee sets monetary policy to meet the 2% inflation target, and in a way that helps to sustain growth and employment. ",
    diffText: "However, services price inflation and wage growth have remained surprisingly persistent.",
    diffType: "hawkish",
    currAfter: " We will continue to monitor these dynamics closely."
  }
};

export function PolicyDiffTool() {
  const [bank, setBank] = useState("Federal Reserve (FOMC)")

  return (
    <Card className="col-span-1 border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Policy Statement Diff Analyzer
          </div>
          <select 
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="text-sm bg-black/50 border border-white/10 rounded px-3 py-1 focus:outline-none focus:border-indigo-500"
          >
            <option>Federal Reserve (FOMC)</option>
            <option>European Central Bank (ECB)</option>
            <option>Bank of England (BoE)</option>
          </select>
        </CardTitle>
        <p className="text-sm text-neutral-400 mt-2">
          Highlights word changes between consecutive Central Bank statements. Green indicates hawkish additions, Red indicates dovish shifts or removals.
        </p>
      </CardHeader>
      <CardContent>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-black/40 border border-white/5 rounded-lg p-4">
            <h4 className="text-sm font-bold text-neutral-400 mb-3 pb-2 border-b border-white/10">Previous Meeting</h4>
            <p className="text-sm leading-relaxed text-neutral-300">
              {STATEMENT_DATA[bank]?.prev}
            </p>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-lg p-4">
            <h4 className="text-sm font-bold text-neutral-400 mb-3 pb-2 border-b border-white/10">Current Meeting</h4>
            <p className="text-sm leading-relaxed text-neutral-300">
              {STATEMENT_DATA[bank]?.currBefore}
              <span 
                className={`px-1 py-0.5 mx-1 rounded border font-semibold ${
                  STATEMENT_DATA[bank]?.diffType === 'hawkish' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border-red-500/30 line-through decoration-red-500/50'
                }`} 
                title={`${STATEMENT_DATA[bank]?.diffType === 'hawkish' ? 'Hawkish Addition' : 'Dovish Removed or Altered'}`}
              >
                {STATEMENT_DATA[bank]?.diffText}
              </span>
              {STATEMENT_DATA[bank]?.currAfter}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

