'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        style: { textAlign: 'center' },
        classNames: {
          toast:
            'group-[.toaster]:bg-[var(--card)] group-[.toaster]:text-[var(--text)] group-[.toaster]:border-[var(--border)] group-[.toaster]:shadow-lg',
          title: 'text-center w-full',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
