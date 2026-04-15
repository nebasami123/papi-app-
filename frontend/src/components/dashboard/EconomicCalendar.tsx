"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Calendar, Clock } from "lucide-react"

type Event = {
  id: number;
  event_time: string;
  currency: string;
  impact: string;
  event: string;
  actual: string;
  forecast: string;
  previous: string;
}

export function EconomicCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/calendar")
      .then(res => res.json())
      .then(data => {
        setEvents(data.events)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch calendar", err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-indigo-500/20 bg-indigo-950/10 hover:border-indigo-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          Economic Calendar (Next 48h)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-white/5 rounded"></div>
            <div className="h-10 bg-white/5 rounded"></div>
            <div className="h-10 bg-white/5 rounded"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 uppercase bg-black/20 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Cur.</th>
                  <th className="px-4 py-3">Impact</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3 text-right">Actual</th>
                  <th className="px-4 py-3 text-right">Forecast</th>
                  <th className="px-4 py-3 text-right">Prev</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {new Date(ev.event_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="px-4 py-3 font-semibold">{ev.currency}</td>
                    <td className="px-4 py-3">
                      <Badge variant={ev.impact === 'High' ? 'destructive' : ev.impact === 'Medium' ? 'default' : 'secondary'}>
                        {ev.impact}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-neutral-200">{ev.event}</td>
                    <td className={`px-4 py-3 text-right font-bold ${ev.actual ? 'text-green-400' : ''}`}>
                      {ev.actual || '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-neutral-400">{ev.forecast}</td>
                    <td className="px-4 py-3 text-right text-neutral-400">{ev.previous}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

