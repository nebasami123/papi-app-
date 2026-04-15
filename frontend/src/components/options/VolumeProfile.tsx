"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AlignRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

const mockVolumeNodes = [
  { price: 1.095, volume: 15 },
  { price: 1.094, volume: 20 },
  { price: 1.093, volume: 35 },
  { price: 1.092, volume: 60 },
  { price: 1.091, volume: 85 },
  { price: 1.090, volume: 120 }, // High Volume Node
  { price: 1.089, volume: 55 },
  { price: 1.088, volume: 210 }, // POC (Point of Control)
  { price: 1.087, volume: 95 },
  { price: 1.086, volume: 40 },
  { price: 1.085, volume: 30 },
  { price: 1.084, volume: 65 },
  { price: 1.083, volume: 110 },
  { price: 1.082, volume: 45 },
  { price: 1.081, volume: 20 },
]

export function VolumeProfile() {
  const maxVolume = Math.max(...mockVolumeNodes.map(n => n.volume));

  return (
    <Card className="h-full border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlignRight className="w-5 h-5 text-indigo-500" />
            EUR/USD Volume Profile
          </div>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold">1W Lookback</span>
        </CardTitle>
        <p className="text-sm text-neutral-400 mt-1">
          Trading volume distributed across price levels. The longest bar represents the Point of Control (POC), historically acting as heavy gravity.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {/* layout="vertical" flips the axis so bars grow horizontally mapped to Y-Axis price */}
            <BarChart 
              data={mockVolumeNodes} 
              layout="vertical" 
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
              barGap={0}
              barCategoryGap={1}
            >
              <XAxis type="number" hide domain={[0, maxVolume + 20]} />
              
              {/* Force the Y-Axis to render numbers decreasing from top to bottom (chart native behavior) */}
              <YAxis 
                dataKey="price" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888', fontSize: 12 }} 
                width={50}
              />
              
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#3b82f6' }}
              />

              <ReferenceLine y={1.088} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'POC', fill: '#ef4444', fontSize: 11 }} />

              <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                {mockVolumeNodes.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.volume === maxVolume ? '#ef4444' : entry.volume > 100 ? '#60a5fa' : '#1e3a8a'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

