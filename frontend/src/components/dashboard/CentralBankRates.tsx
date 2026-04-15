"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Landmark } from "lucide-react"

type Rate = {
  bank: string;
  currency: string;
  rate: number;
  next_meeting: string;
  bias: string;
}

export function CentralBankRates() {
  const [rates, setRates] = useState<Rate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/central-banks")
      .then(res => res.json())
      .then(data => {
        setRates(data.rates)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch central bank rates", err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="col-span-1 lg:col-span-2 border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Landmark className="w-5 h-5 text-indigo-500" />
          Central Bank Rates Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-20 bg-white/5 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rates.map((bank) => (
              <div key={bank.currency} className="flex flex-col p-3 rounded-lg bg-black/40 border border-white/5 hover:bg-indigo-900/20 transition cursor-pointer relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition group-hover:scale-150 group-hover:bg-indigo-500/10"></div>
                <div className="flex justify-between items-center mb-2 z-10">
                  <span className="font-bold text-lg">{bank.currency}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    bank.bias === 'Hawkish' ? 'bg-green-500/20 text-green-400' :
                    bank.bias === 'Dovish' ? 'bg-red-500/20 text-red-400' :
                    'bg-neutral-500/20 text-neutral-400'
                  }`}>
                    {bank.bias}
                  </span>
                </div>
                <div className="text-2xl font-black text-white z-10">
                  {bank.rate.toFixed(2)}%
                </div>
                <div className="text-xs text-neutral-500 mt-2 truncate z-10" title={bank.bank}>
                  {bank.bank}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
