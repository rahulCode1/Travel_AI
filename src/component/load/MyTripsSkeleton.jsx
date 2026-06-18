const MyTripsSkeleton = () => {
  return (
    <main className=" flex flex-col animate-pulse items-center gap-5  h-screen bg-slate-900">
      <div className="w-11/12 rounded  flex justify-between items-center  bg-slate-600   p-4">
        <div className="w-32 h-8 p-2 bg-slate-500 rounded"> </div>
        <div className="w-32 h-8 p-2 bg-slate-500 rounded"> </div>
      </div>

      <div className="w-11/12 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full flex justify-between items-center bg-slate-600 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-500" />

              <div>
                <div className="w-32 h-5 bg-slate-500 rounded mb-2" />
                <div className="w-20 h-3 bg-slate-500 rounded" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-24 h-7 bg-slate-500 rounded-full" />
              <div className="w-3 h-5 bg-slate-500 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyTripsSkeleton;
