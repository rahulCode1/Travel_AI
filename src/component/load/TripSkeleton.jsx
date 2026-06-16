const TripSkeleton = () => {
  return (
    <section className="mt-5 w-11/12 mx-auto">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />

          <div className="flex-1">
            <div className="h-6 w-48 bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Best Time + Duration */}
        <div className="bg-slate-800 rounded-xl p-4 grid grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-24 bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-5 w-40 bg-slate-700 rounded animate-pulse" />
          </div>

          <div>
            <div className="h-4 w-32 bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-5 w-24 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Attractions */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="h-5 w-40 bg-slate-700 rounded animate-pulse mb-4" />

          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded-full bg-slate-700 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="h-5 w-32 bg-slate-700 rounded animate-pulse mb-4" />

          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-700 animate-pulse" />

              <div className="flex-1">
                <div className="h-4 w-24 bg-slate-700 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Hotels */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="h-5 w-24 bg-slate-700 rounded animate-pulse mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-700 rounded-lg p-3 animate-pulse"
              >
                <div className="h-4 w-32 bg-slate-600 rounded mb-2" />
                <div className="h-3 w-20 bg-slate-600 rounded mb-2" />
                <div className="h-5 w-24 bg-slate-600 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="h-5 w-40 bg-slate-700 rounded animate-pulse mb-4" />

          <div className="grid grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-700 rounded-lg p-4 animate-pulse"
              >
                <div className="h-4 w-16 bg-slate-600 rounded mb-2" />
                <div className="h-6 w-24 bg-slate-600 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Local Tips */}
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="h-5 w-24 bg-slate-700 rounded animate-pulse mb-4" />

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-slate-700 rounded animate-pulse mb-3"
            />
          ))}
        </div>

        {/* Button */}
        <div className="h-12 bg-slate-700 rounded-lg animate-pulse" />
      </div>
    </section>
  );
};

export default TripSkeleton;
