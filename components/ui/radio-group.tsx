// import * as React from 'react';

// interface RadioGroupProps {
//   value: string;
//   onValueChange: (value: string) => void;
//   children: React.ReactNode;
// }

// export function RadioGroup({ value, onValueChange, children }: RadioGroupProps) {
//   return (
//     <div className="space-y-2">
//       {React.Children.map(children, (child) =>
//         React.isValidElement(child)
//           ? React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
//               groupValue: value,
//               onGroupChange: onValueChange,
//             })
//           : child
//       )}
//     </div>
//   );
// }

// interface RadioGroupItemProps {
//   value: string;
//   id: string;
//   groupValue?: string;
//   onGroupChange?: (value: string) => void;
//   className?: string;
// }

// export function RadioGroupItem({ value, id, groupValue, onGroupChange, className }: RadioGroupItemProps) {
//   // Prevent groupValue and onGroupChange from being passed to the DOM element
//   const inputProps = {
//     type: 'radio',
//     id,
//     value,
//     checked: groupValue === value,
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => onGroupChange && onGroupChange(e.target.value),
//     className: `h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${className || ''}`,
//   };

//   return <input {...inputProps} />;
// }

"use client"

import * as React from "react"

interface RadioGroupProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <div className={`space-y-3 ${className || ""}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
              groupValue: value,
              onGroupChange: onValueChange,
            })
          : child,
      )}
    </div>
  )
}

interface RadioGroupItemProps {
  value: string
  id: string
  groupValue?: string
  onGroupChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

export function RadioGroupItem({ value, id, groupValue, onGroupChange, className, children }: RadioGroupItemProps) {
  const isChecked = groupValue === value

  return (
    <div className={`flex items-center space-x-3 ${className || ""}`}>
      <input
        type="radio"
        id={id}
        value={value}
        checked={isChecked}
        onChange={(e) => onGroupChange && onGroupChange(e.target.value)}
        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
      />
      {children}
    </div>
  )
}
