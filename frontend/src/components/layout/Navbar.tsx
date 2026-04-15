"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Bell, X } from "lucide-react"
import { useAlerts } from "@/context/AlertsContext"

export function Navbar() {
  const pathname = usePathname()
  const { alerts, removeAlert } = useAlerts()

  const tabs = [
    { name: "Dashboard", href: "/" },
    { name: "Calendar", href: "/calendar" },
    { name: "COT", href: "/cot" },
    { name: "Sentiment", href: "/sentiment" },
    { name: "Banks", href: "/banks" },
    { name: "Alerts", href: "/alerts" },
    { name: "Intermarket", href: "/intermarket" },
    { name: "Options", href: "/options" },
    { name: "Journal", href: "/journal" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              FX
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Live Feed Active
          </div>
          
          <button className="relative p-2 hover:bg-white/10 rounded-full transition group">
            <Bell className="w-5 h-5 text-neutral-300 group-hover:text-white" />
            {alerts.length > 0 && <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-black rounded-full"></div>}
            
            <div className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl p-4 hidden group-hover:block cursor-default">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <h4 className="font-bold text-left">Triggered Alerts</h4>
                <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">{alerts.length}</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-4">No recent alerts triggered.</p>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.id} className="bg-indigo-500/10 border border-indigo-500/20 p-2 rounded text-left relative group/alert">
                      <button 
                        onClick={(e) => { e.preventDefault(); removeAlert(alert.id); }}
                        className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="text-xs text-indigo-400 font-bold mb-1 pr-6">{alert.title}</div>
                      <div className="text-sm text-neutral-300">{alert.description}</div>
                      <div className="text-[10px] text-neutral-500 mt-2">{alert.time}</div>
                    </div>
                  ))
                )}
              </div>
              <Link href="/alerts" className="block text-center text-sm font-semibold text-blue-400 mt-4 hover:underline">
                Manage Alerts
              </Link>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
