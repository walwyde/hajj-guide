// 'use client';
// import { useEffect, useState } from "react";
// import { HAJJ_STEPS } from "@/lib/steps";
// import Link from "next/link";

// export default function StepChecklist() {
//   const [progress, setProgress] = useState<Record<string, boolean>>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSteps();
//   }, []);
  
// async function fetchSteps(){
//   try {
    
//     const res = await fetch('/api/steps') as any;
//     setLoading(true);
//     if (res?.data) {
//        const data = await res.json();
//        console.log('checklist', data);
//          const p: Record<string, boolean> = {};
//          data.progress.forEach((item: any) => p[item.stepId] = item.completed);
//          setProgress(s => ({...s, ...p}));
//        setLoading(false);
//     } else {
//        setLoading(false);}
//   } catch (error) {
//     console.log(error);
//     setLoading(false);
//   }


// }
//    async function toggle(stepId: string, completed: boolean) {
//      setProgress(s => ({...s, [stepId]: completed}));
//      await fetch('/api/steps', {
//        method: 'PATCH',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify({ stepId, completed })
//      });
//    }


//   if (loading) return <div>Loading...</div>;

//   const completedCount = Object.values(progress).filter(Boolean).length;

//   return (
//     <div className="space-y-4">
//       <div className="card">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-lg font-semibold">Your Hajj Progress</div>
//             <div className="text-sm text-slate-400">{completedCount} / {HAJJ_STEPS.length} steps completed</div>
//           </div>
//           <div className="w-40 bg-slate-800 rounded-full overflow-hidden h-3">
//             <div className="bg-blue-600 h-3" style={{width: `${(completedCount/HAJJ_STEPS.length)*100}%`}} />
//           </div>
//         </div>
//       </div>

//       <ul className="space-y-3">
//         {HAJJ_STEPS.map(step => (
//           <li key={step.id} className="card">
//             <div className="flex items-start gap-3">
//             <p>{Object.keys(progress).every(Boolean)}</p>
//               <input
//                 type="checkbox"
//                 checked={!!progress[step.id]}
//                 onChange={e => toggle(step.id, e.target.checked)}
//                 className="mt-1 h-5 w-5 accent-blue-600"
//               />
//               <div>
//                 <Link href={`/steps/${step.id}`}>
//                 <div className="font-medium">{step.title} <span className="text-xs text-slate-400">({step.day})</span></div>
//                 <div className="text-sm text-slate-300">{step.description}</div>
//                 {step.mandatory && <span className="text-xs text-pink-300">Mandatory</span>}
//               </Link>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

'use client';
import { useEffect, useState } from "react";
import { HAJJ_STEPS } from "@/lib/steps";
import Link from "next/link";

export default function StepChecklist() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps();
  }, []);
  
  async function fetchSteps() {
    try {
      setLoading(true);
      const res = await fetch('/api/steps');
      if (!res.ok) throw new Error("Failed to fetch steps");

      const data = await res.json();
      console.log('checklist', data);

      const p: Record<string, boolean> = {};
      data.progress.forEach((item: any) => {
        p[item.stepId] = item.completed;
      });
      setProgress(p);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Your Hajj Progress</div>
            <div className="text-sm text-slate-400">
              {completedCount} / {HAJJ_STEPS.length} steps completed
            </div>
          </div>
          <div className="w-40 bg-slate-800 rounded-full overflow-hidden h-3">
            <div
              className="bg-blue-600 h-3"
              style={{ width: `${(completedCount / HAJJ_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {HAJJ_STEPS.map(step => {
          const isCompleted = !!progress[step.id];
          return (
            <li key={step.id} className="card">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  readOnly
                  className={`mt-1 h-5 w-5 accent-blue-600 ${
                    isCompleted
                      ? "opacity-100 cursor-default"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                />
                <div>
                  <Link href={`/steps/${step.id}`}>
                    <div className="font-medium">
                      {step.title}{" "}
                      <span className="text-xs text-slate-400">({step.day})</span>
                    </div>
                    <div className="text-sm text-slate-300">{step.description}</div>
                    {step.mandatory && (
                      <span className="text-xs text-pink-300">Mandatory</span>
                    )}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


