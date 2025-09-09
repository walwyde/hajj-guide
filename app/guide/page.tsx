import { HAJJ_STEPS } from "@/lib/steps";

export default function GuidePage() {
  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Hajj Guide (Read-Only)</h1>
        <p className="text-slate-300">Sign in to save your progress on the checklist in the Dashboard.</p>
      </div>
      <ul className="space-y-3">
        {HAJJ_STEPS.map(step => (
          <li key={step.id} className="card">
            <div className="font-semibold">{step.title} <span className="text-xs text-slate-400">({step.day})</span></div>
            <div className="text-sm text-slate-300">{step.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
