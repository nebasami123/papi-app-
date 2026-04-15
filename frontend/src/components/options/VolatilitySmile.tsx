"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts"

const mockSmileData = [
  { strike: 1.050, iv: 12.5, type: 'Put' },
  { strike: 1.060, iv: 10.8, type: 'Put' },
  { strike: 1.070, iv: 9.5, type: 'Put' },
  { strike: 1.080, iv: 8.8, type: 'Put' },
  { strike: 1.085, iv: 8.5, type: 'ATM' }, // Spot Price
  { strike: 1.090, iv: 8.7, type: 'Call' },
  { strike: 1.100, iv: 9.2, type: 'Call' },
  { strike: 1.110, iv: 10.0, type: 'Call' },
  { strike: 1.120, iv: 11.2, type: 'Call' },
]

export function VolatilitySmile() {
  return (
    <Card className="border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            EUR/USD Volatility Smile
          </div>
          <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded font-bold">1M Expiry</span>
        </CardTitle>
        <p className="text-sm text-neutral-400 mt-1">
          Implied Volatility (IV) vs Strike Price. Notice the right-side skew (Calls are natively more expensive than Puts here).
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockSmileData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="strike" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#14b8a6' }}
              />

              {/* Spot Price Marker */}
              <ReferenceLine x={1.085} stroke="#888" strokeDasharray="3 3" label={{ position: 'top', value: 'Spot (ATM)', fill: '#888', fontSize: 10 }} />
              
              <Line 
                type="monotone" 
                dataKey="iv" 
                name="Implied Volatility %"
                stroke="#14b8a6" 
                strokeWidth={3} 
                dot={{ fill: '#14b8a6', r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

