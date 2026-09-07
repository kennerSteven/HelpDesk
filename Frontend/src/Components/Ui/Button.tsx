interface ButtonProps {
  typeBtn: "button" | "submit";
  labelBtn?: string;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
  formId?: string;
  className?: string;
}

export default function Button({
  typeBtn,
  onClick,
  labelBtn,
  loading,
  loadingText,
  formId,
  className
}: ButtonProps) {
  return (
    <div>
      
      <button
      
        className={`${className}  ${
          loading
            ? "border-none bg-zinc-500 rounded-xl text-white px-4 py-2"
            : "border-none bg-zinc-800 rounded-xl text-white px-4 py-2 cursor-pointer hover:bg-zinc-600"
        }`}
        onClick={typeBtn === "button" && !loading ? onClick : undefined}
        type={typeBtn}
        form={formId}
        disabled={loading}
      >
        {loading ? loadingText : labelBtn}
      </button>
    </div>
  );
}
