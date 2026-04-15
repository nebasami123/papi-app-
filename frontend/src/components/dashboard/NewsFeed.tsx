"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Newspaper } from "lucide-react"

type NewsItem = {
  id: number;
  title: string;
  source: string;
  time: string;
  sentiment: string;
  currency: string;
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/news")
      .then(res => res.json())
      .then(data => {
        setNews(data.news)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch news", err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="col-span-1 lg:col-span-2 border-purple-500/20 bg-purple-950/10 hover:border-purple-500/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-purple-500" />
          News Sentiment Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-white/5 rounded"></div>
            <div className="h-16 bg-white/5 rounded"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <a 
                key={item.id} 
                href={`https://www.google.com/search?q=${encodeURIComponent(item.title + " " + item.source)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-lg border border-white/5 bg-black/40 p-4 transition hover:bg-white/5 cursor-pointer group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent group-hover:from-purple-400"></div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-medium leading-snug group-hover:text-purple-400 group-hover:underline transition-colors">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-bold text-xs">{item.currency}</span>
                    <Badge className={
                      item.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 
                      item.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                      'bg-neutral-500/20 text-neutral-400 hover:bg-neutral-500/30'
                    }>
                      {item.sentiment}
                    </Badge>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
