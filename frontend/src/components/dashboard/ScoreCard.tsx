"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

type CurrencyScore = {
  name: string;
  score: number;
  bias: string;
  cot: string;
}

export function ScoreCard() {
  const [currencies, setCurrencies] = useState<CurrencyScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/scorecard")
      .then(res => res.json())
      .then(data => {
        setCurrencies(data.currencies)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch scorecard", err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="col-span-1 border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Currency Scorecard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-8 bg-white/5 rounded"></div>)}
          </div>
        ) : (
          <div className="space-y-4">
            {currencies.map((currency) => (
              <div key={currency.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold w-10">{currency.name}</div>
                  <div className="w-32 bg-neutral-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full ${currency.score > 60 ? 'bg-green-500' : currency.score < 40 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                      style={{ width: `${currency.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={currency.bias === 'Hawkish' ? 'default' : currency.bias === 'Dovish' ? 'destructive' : 'secondary'}>
                    {currency.bias}
                  </Badge>
                  <Badge variant="outline" className="border-neutral-600 text-neutral-400">
                    {currency.cot}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

