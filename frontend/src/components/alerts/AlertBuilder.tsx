"use client"

import { useState } from "react"
import { Plus, Trash, BellRing } from "lucide-react"
import { useAlerts } from "@/context/AlertsContext"

type Condition = {
  metric: string;
  operator: string;
  value: string;
}

export function AlertBuilder() {
  const { addAlert } = useAlerts()
  const [conditions, setConditions] = useState<Condition[]>([
    { metric: "EUR/USD COT Index", operator: ">", value: "80" }
  ])

  const addCondition = () => setConditions([...conditions, { metric: "Retail Sentiment", operator: ">", value: "70% Short" }])
  
  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  const handleSaveAlert = () => {
    if (conditions.length === 0) return;
    
    // Create a readable string from conditions
    const desc = conditions.map((c, i) => 
      `${i === 0 ? 'IF' : 'AND'} ${c.metric} ${c.operator} ${c.value}`
    ).join(" ")

    addAlert({
      title: "Custom Rule Activated",
      description: desc
    })
    
    // Optionally reset builder
    setConditions([{ metric: "EUR/USD COT Index", operator: ">", value: "" }])
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden backdrop-blur-xl group hover:border-indigo-500/30 transition">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full -mr-16 -mt-16 transition group-hover:scale-110"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <BellRing className="w-5 h-5 text-yellow-500" />
        <h3 className="text-xl font-bold">Custom Alert Builder</h3>
      </div>

      <div className="space-y-4">
        {conditions.map((cond, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
            <span className="font-mono text-neutral-500 text-sm">{idx === 0 ? "IF" : "AND"}</span>
            <select 
              className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 w-full md:w-auto"
              value={cond.metric}
              onChange={(e) => {
                const newConds = [...conditions]
                newConds[idx].metric = e.target.value
                setConditions(newConds)
              }}
            >
              <option>EUR/USD COT Index</option>
              <option>USD Retail Sentiment</option>
              <option>ECB Rate Probability</option>
              <option>News Sentiment (AI)</option>
            </select>

            <select 
              className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
              value={cond.operator}
              onChange={(e) => {
                const newConds = [...conditions]
                newConds[idx].operator = e.target.value
                setConditions(newConds)
              }}
            >
              <option>&gt;</option>
              <option>&lt;</option>
              <option>=</option>
              <option>Flips</option>
            </select>

            <input 
              className="bg-black/50 flex-1 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
              value={cond.value}
              onChange={(e) => {
                const newConds = [...conditions]
                newConds[idx].value = e.target.value
                setConditions(newConds)
              }}
              placeholder="Value (e.g. 80, Bearish, 75%)"
            />

            <button onClick={() => removeCondition(idx)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded text-neutral-500 transition">
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/10">
        <button onClick={addCondition} className="flex items-center gap-2 text-sm font-semibold text-yellow-500 hover:text-yellow-400">
          <Plus className="w-4 h-4" /> Add Condition
        </button>
        <button onClick={handleSaveAlert} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg transition shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          Save Alert Rule
        </button>
      </div>
    </div>
  )
}

