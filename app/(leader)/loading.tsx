export default function LeaderLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#D9C7A3] border-t-[#172B4D]" />
        <p className="mt-4 text-sm font-medium text-slate-600">
          Loading leader tools...
        </p>
      </div>
    </div>
  );
}
