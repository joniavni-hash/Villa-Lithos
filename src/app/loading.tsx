"use client"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F6F4]">
            <div className="flex flex-col items-center gap-8">
                <h1
                    className="font-serif text-3xl md:text-5xl text-[#1A2332] uppercase text-center opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]"
                    style={{ letterSpacing: '0.2em' }}
                >
                    Villa Lithos
                </h1>
                <div className="relative w-24 h-[1px] bg-[#E8E0D8] overflow-hidden">
                    <div className="absolute inset-0 bg-[#8B9A7D] animate-[progress_2s_ease-in-out_infinite]" />
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); letter-spacing: 0.1em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: 0.25em; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    )
}
