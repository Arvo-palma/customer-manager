
import React from 'react'
import { classNameBuilder } from '../helpers/class-name-builder'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Flex: React.FC<FlexProps> = React.forwardRef<
  HTMLInputElement,
  FlexProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={classNameBuilder('flex', className)} {...props}>
      {children}
    </div>
  )
})

Flex.displayName = 'Flex'

export default Flex
