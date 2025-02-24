import { cn } from "@/lib/utils"

export function LoadingSpinner() {
  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    )}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer circle */}
          <div className="w-24 h-24 rounded-full absolute border-4 border-gray-800/50"></div>
          
          {/* Animated spinner */}
          <div className="w-24 h-24 rounded-full animate-spin border-4 border-transparent border-t-primary-500 border-r-primary-500"
            style={{ 
              backgroundImage: 'conic-gradient(rgba(255,255,255,0.1) 0% 75%, transparent)',
              WebkitMask: 'linear-gradient(black, transparent)'
            }}>
          </div>
          
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Text with fade animation */}
        <p className="text-gray-300 font-medium animate-pulse">
          Loading content...
        </p>
      </div>
    </div>
  )
}