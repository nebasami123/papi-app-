"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type CotData = {
  [currency: string]: {
    current_index: number;
    trend: string;
    history: { week: string; net_position: number }[];
  }
}

export function CotChart() {
  const [data, setData] = useState<CotData>({})
  const [loading, setLoading] = useState(true)
  const [selectedCur, setSelectedCur] = useState("USD")

  useEffect(() => {
    fetch("/api/cot")
      .then(res => res.json())
      .then(resData => {
        setData(resData.cot)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch COT data", err)
        setLoading(false)
      })
  }, [])

  const chartData = selectedCur && data[selectedCur] ? data[selectedCur].history : []

  return (
    <Card className="col-span-1 lg:col-span-2 border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2 h-auto">
        <CardTitle className="text-xl flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-500" />
          COT Index Trends
        </CardTitle>
        <div className="flex gap-2">
          {Object.keys(data).slice(0, 4).map(cur => (
            <button
              key={cur}
              onClick={() => setSelectedCur(cur)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                selectedCur === cur 
                  ? 'bg-emerald-500 border-emerald-500 text-black font-bold' 
                  : 'border-neutral-700 text-neutral-400 hover:border-emerald-500/50'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse h-[250px] bg-white/5 rounded mt-4"></div>
        ) : (
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="week" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="net_position" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
