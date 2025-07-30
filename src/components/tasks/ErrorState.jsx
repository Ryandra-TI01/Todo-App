export default function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-8">
      <p className="text-red-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
