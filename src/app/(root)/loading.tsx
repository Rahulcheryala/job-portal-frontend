import Spinner from "@/Components/Loaders/Spinner";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100dvh]">
      <Spinner />
    </div>
  );
};

export default loading;
