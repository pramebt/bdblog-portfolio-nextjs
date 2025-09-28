import { cn } from "@/lib/utils"

// Fade in animation
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = "duration-500",
  className = "" 
}) {
  return (
    <div 
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4",
        duration,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Stagger children animations
export function StaggerContainer({ 
  children, 
  staggerDelay = 100,
  className = "" 
}) {
  return (
    <div className={className}>
      {children && Array.isArray(children) 
        ? children.map((child, index) => (
            <FadeIn key={index} delay={index * staggerDelay}>
              {child}
            </FadeIn>
          ))
        : children
      }
    </div>
  )
}

// Hover scale effect
export function HoverScale({ 
  children, 
  scale = "hover:scale-105",
  className = "" 
}) {
  return (
    <div className={cn(
      "transition-transform duration-200 ease-out",
      scale,
      className
    )}>
      {children}
    </div>
  )
}

// Hover lift effect
export function HoverLift({ 
  children, 
  className = "" 
}) {
  return (
    <div className={cn(
      "transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      {children}
    </div>
  )
}

// Loading spinner
export function LoadingSpinner({ 
  size = "h-8 w-8",
  color = "text-primary",
  className = "" 
}) {
  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-current border-t-transparent",
      size,
      color,
      className
    )} />
  )
}

// Pulse animation
export function Pulse({ 
  children, 
  className = "" 
}) {
  return (
    <div className={cn("animate-pulse", className)}>
      {children}
    </div>
  )
}

// Slide in from direction
export function SlideIn({ 
  children, 
  direction = "bottom", // top, bottom, left, right
  delay = 0,
  duration = "duration-500",
  className = "" 
}) {
  const directionClasses = {
    top: "slide-in-from-top-4",
    bottom: "slide-in-from-bottom-4", 
    left: "slide-in-from-left-4",
    right: "slide-in-from-right-4"
  }

  return (
    <div 
      className={cn(
        "animate-in fade-in",
        directionClasses[direction],
        duration,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Bounce in animation
export function BounceIn({ 
  children, 
  delay = 0,
  className = "" 
}) {
  return (
    <div 
      className={cn(
        "animate-in zoom-in-50 duration-500",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      }}
    >
      {children}
    </div>
  )
}

// Progress bar
export function ProgressBar({ 
  progress = 0, 
  className = "",
  showPercentage = false 
}) {
  return (
    <div className={cn("w-full bg-muted rounded-full h-2", className)}>
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      {showPercentage && (
        <div className="text-xs text-muted-foreground mt-1 text-center">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}

