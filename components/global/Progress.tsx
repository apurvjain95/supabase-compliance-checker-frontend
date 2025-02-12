const Progress = ({ value, maxValue }: { value: number; maxValue: number }) => {
  return (
    <div className="w-full rounded-md bg-gray-200 h-2 relative">
      <div
        className="rounded-md bg-current absolute top-0 left-0 h-full bg-[var(--accent-9)]"
        style={{ width: `${(value / maxValue) * 100}%` }}
      />
    </div>
  );
};

export default Progress;
