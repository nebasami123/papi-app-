"use client"

import React, { createContext, useContext, useState } from "react"

export type GlobalAlert = {
  id: number;
  title: string;
  description: string;
  time: string;
}

type AlertsContextType = {
  alerts: GlobalAlert[];
  addAlert: (alert: Omit<GlobalAlert, "id" | "time">) => void;
  removeAlert: (id: number) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined)

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<GlobalAlert[]>([
    { id: 1, title: "Extreme Retail Short", description: "EUR/USD retail traders reached 82% short bias. Potential contrarian long.", time: "2 min ago" },
    { id: 2, title: "COT Divergence", description: "JPY commercial hedgers extending longs while price drops.", time: "1 hour ago" },
  ])

  const addAlert = (alert: Omit<GlobalAlert, "id" | "time">) => {
    setAlerts(prev => [
      { ...alert, id: Date.now(), time: "Just now" },
      ...prev
    ])
  }

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}

export function useAlerts() {
  const context = useContext(AlertsContext)
  if (!context) throw new Error("useAlerts must be used within an AlertsProvider")
  return context
}
