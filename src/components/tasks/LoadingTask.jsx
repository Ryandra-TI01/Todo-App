export default function LoadingTask() {
    return (
           <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    )
}