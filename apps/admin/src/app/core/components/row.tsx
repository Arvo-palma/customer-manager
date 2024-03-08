
import React from 'react'
import { classNameBuilder } from '../helpers/class-name-builder'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Row: React.FC<RowProps> = React.forwardRef<
  HTMLInputElement,
  RowProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNameBuilder('flex flex-row', className)}
      {...props}
    >
      {children}
    </div>
  )
})

Row.displayName = 'Row'

export default Row
