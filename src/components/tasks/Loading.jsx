const Loading = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex justify-center">
        <div className="flex space-x-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 h-8 bg-cyan-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.2s",
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-cyan-300 text-center mt-3 text-sm">Fetching data...</p>
    </div>
  );
};

export default Loading;
