"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Area } from "recharts"

const mockSentimentPriceData = [
  { time: "00:00", price: 1.0850, sentiment: 10 },
  { time: "04:00", price: 1.0845, sentiment: -20 },
  { time: "08:00", price: 1.0820, sentiment: -60 },
  { time: "12:00", price: 1.0835, sentiment: -10 },
  { time: "16:00", price: 1.0870, sentiment: 40 },
  { time: "20:00", price: 1.0890, sentiment: 75 },
  { time: "24:00", price: 1.0885, sentiment: 55 },
]

export function SentimentChart() {
  return (
    <Card className="col-span-1 lg:col-span-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Price vs Sentiment Overlay
        </CardTitle>
        <p className="text-sm text-neutral-400">
          Rolling AI sentiment mapped over active EUR/USD price action.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mockSentimentPriceData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              
              {/* Left Y Axis for Price */}
              <YAxis yAxisId="left" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin', 'dataMax']} />
              
              {/* Right Y Axis for Sentiment */}
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" fontSize={12} tickLine={false} axisLine={false} domain={[-100, 100]} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              
              {/* Sentiment colored underlying Area */}
              <Area yAxisId="right" type="monotone" dataKey="sentiment" fill="#82ca9d" stroke="none" fillOpacity={0.2} />
              <Line yAxisId="right" type="monotone" dataKey="sentiment" stroke="#82ca9d" strokeWidth={2} dot={false} />
              
              {/* Price Line */}
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
