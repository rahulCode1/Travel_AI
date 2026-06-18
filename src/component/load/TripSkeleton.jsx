const TripSkeleton = () => {
  const cardClass = "bg-[#1a1d26] border border-slate-800 rounded-[14px] p-5";

  const pulseClass = "bg-[#2a2e39] animate-pulse rounded";

  const pulseLightClass = "bg-[#343949] animate-pulse rounded";

  return (
    <section className="max-w-[720px] mx-auto px-2 py-3 bg-slate-900">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className={`w-[42px] h-[42px] rounded-[10px] ${pulseClass}`} />

            <div className="flex-1">
              <div className={`h-6 w-52 ${pulseClass} mb-2`} />
              <div className={`h-3 w-32 ${pulseLightClass}`} />
            </div>

            <div className={`h-6 w-28 rounded-full ${pulseClass}`} />
          </div>
        </div>

        {/* Best Time + Duration */}
        <div className={cardClass}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className={`h-3 w-24 ${pulseClass} mb-2`} />
              <div className={`h-4 w-32 ${pulseClass}`} />
            </div>

            <div className="text-right">
              <div className={`h-3 w-28 ${pulseClass} mb-2 ml-auto`} />
              <div className={`h-8 w-20 ${pulseClass} ml-auto`} />
            </div>
          </div>
        </div>

        {/* Attractions */}
        <div className={cardClass}>
          <div className={`h-5 w-36 ${pulseClass} mb-4`} />

          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-8 w-24 rounded-full ${pulseClass}`} />
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className={cardClass}>
          <div className={`h-5 w-28 ${pulseClass} mb-4`} />

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-3 py-3 border-b border-white/5 last:border-b-0"
            >
              <div className={`w-9 h-9 rounded-full shrink-0 ${pulseClass}`} />

              <div className="flex-1">
                <div className={`h-4 w-20 ${pulseClass} mb-2`} />
                <div className={`h-3 w-full ${pulseLightClass} mb-2`} />
                <div className={`h-3 w-10/12 ${pulseLightClass}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Hotels */}
        <div className={cardClass}>
          <div className={`h-5 w-24 ${pulseClass} mb-4`} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-3"
              >
                <div className={`h-4 w-32 ${pulseClass} mb-2`} />
                <div className={`h-3 w-20 ${pulseLightClass} mb-2`} />
                <div className={`h-3 w-28 ${pulseLightClass} mb-2`} />
                <div className={`h-5 w-20 ${pulseClass}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className={cardClass}>
          <div className={`h-4 w-40 ${pulseClass} mb-3`} />
          <div className={`h-5 w-52 ${pulseClass} mb-4`} />

          {/* Budget Tiers */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl p-4">
                <div className={`h-3 w-16 ${pulseClass} mb-2`} />
                <div className={`h-6 w-20 ${pulseClass}`} />
              </div>
            ))}
          </div>

          {/* Budget Table */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-10 ${pulseLightClass}`} />
            ))}
          </div>
        </div>

        {/* Local Tips */}
        <div className={cardClass}>
          <div className={`h-5 w-28 ${pulseClass} mb-4`} />

          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-4 ${pulseLightClass} mb-3`} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className={`h-12 rounded-xl ${pulseClass}`} />
        <div className={`h-12 rounded-xl ${pulseLightClass}`} />
      </div>
    </section>
  );
};

export default TripSkeleton;
