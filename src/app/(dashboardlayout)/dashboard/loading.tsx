const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Animation */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <h1 className="text-3xl font-semibold animate-pulse">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
