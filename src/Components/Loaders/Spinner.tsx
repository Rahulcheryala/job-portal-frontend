const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-56">
      <div
        className="animate-spin inline-block size-16 border-[5px] border-transparent border-t-blue-500 border-b-blue-500 text-blue-500 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
