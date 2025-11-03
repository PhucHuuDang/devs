import { Spinner } from "../ui/spinner";

export const SimpleLoading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center justify-center gap-1">
        <Spinner />
        <span>Loading...</span>
      </div>
    </div>
  );
};
