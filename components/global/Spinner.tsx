const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-[3px] border-solid border-current border-r-[transparent] align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] h-full w-full ${className}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
