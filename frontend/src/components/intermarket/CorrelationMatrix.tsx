"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Grid3X3 } from "lucide-react"

export function CorrelationMatrix() {
  const assets = ["EUR/USD", "USD/JPY", "AUD/USD", "Gold", "S&P500", "US10Y"]
  
  // Mock correlation matrix (1.0 = perfect positive, -1.0 = perfect negative)
  const matrix = [
    [ 1.00, -0.65,  0.81,  0.75,  0.55, -0.60], // EUR/USD
    [-0.65,  1.00, -0.58, -0.52, -0.40,  0.88], // USD/JPY
    [ 0.81, -0.58,  1.00,  0.89,  0.72, -0.45], // AUD/USD
    [ 0.75, -0.52,  0.89,  1.00,  0.40, -0.72], // Gold
    [ 0.55, -0.40,  0.72,  0.40,  1.00, -0.30], // S&P500
    [-0.60,  0.88, -0.45, -0.72, -0.30,  1.00], // US10Y
  ]

  const getColor = (val: number) => {
    if (val === 1) return "bg-neutral-800 text-neutral-500" // Self map
    if (val > 0.8) return "bg-green-500 text-black font-bold"
    if (val > 0.5) return "bg-green-500/60 text-white"
    if (val > 0.2) return "bg-green-500/20 text-neutral-300"
    if (val > -0.2) return "bg-black/50 text-neutral-400"
    if (val > -0.5) return "bg-red-500/20 text-neutral-300"
    if (val > -0.8) return "bg-red-500/60 text-white"
    return "bg-red-500 text-black font-bold"
  }

  return (
    <Card className="h-full border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-indigo-500" />
          Cross-Asset Correlation Matrix
        </CardTitle>
        <p className="text-sm text-neutral-400">
          60-day rolling Pearson correlation between major currency pairs and global macro assets. 
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-sm text-center border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="p-2 border-b border-white/10 hidden sm:table-cell"></th>
                {assets.map((asset, i) => (
                  <th key={i} className="p-2 font-semibold text-neutral-300 tracking-wider text-xs">{asset}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <td className="p-2 font-semibold text-neutral-300 text-right pr-4 text-xs tracking-wider">{assets[i]}</td>
                  {row.map((val, j) => (
                    <td 
                      key={j} 
                      className={`p-3 rounded-md transition-all hover:scale-110 hover:z-10 relative cursor-crosshair border border-white/5 ${getColor(val)}`}
                      title={`${assets[i]} vs ${assets[j]} = ${val}`}
                    >
                      {val.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500"></div> Perfect Positive (+1)
          </div>
          <div className="flex items-center gap-2">
            Perfect Negative (-1) <div className="w-3 h-3 rounded bg-red-500"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
