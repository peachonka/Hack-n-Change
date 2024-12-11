import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "accent"
}

export function LoadingSpinner({
  size = "md",
  color = "primary",
  className,
  ...props
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-full border-2 border-current border-t-transparent animate-spin",
          sizeClasses[size]
        )}
      />
    </div>
  )
}

