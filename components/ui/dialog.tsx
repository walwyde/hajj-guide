// import * as React from 'react';

// interface DialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   children: React.ReactNode;
// }

// export function Dialog({ open, onOpenChange, children }: DialogProps) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
//         {children}
//       </div>
//     </div>
//   );
// }

// export function DialogContent({ children }: { children: React.ReactNode }) {
//   return <div className="p-6">{children}</div>;
// }

// export function DialogHeader({ children }: { children: React.ReactNode }) {
//   return <div className="mb-4">{children}</div>;
// }

// export function DialogTitle({ children }: { children: React.ReactNode }) {
//   return <h2 className="text-xl font-bold text-gray-900">{children}</h2>;
// }

// export function DialogDescription({ children }: { children: React.ReactNode }) {
//   return <p className="text-sm text-gray-600 mt-2">{children}</p>;
// }

// export function DialogFooter({ children }: { children: React.ReactNode }) {
//   return <div className="mt-6 flex justify-end gap-2">{children}</div>;
// }

// export function DialogTrigger({ children }: { children: React.ReactNode }) {
//   return <>{children}</>;
// }

import type * as React from "react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col max-h-[90vh]">{children}</div>
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pb-4 border-b">{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-gray-900">{children}</h2>
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 mt-2">{children}</p>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pt-4 border-t flex justify-end gap-2 bg-gray-50">{children}</div>
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
