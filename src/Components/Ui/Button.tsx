interface Button {
  typeBtn: "button" | "submit";
  labelBtn?: string;
  onClick?: () => void;
  loading?: boolean
  loadingText?: string
}

export default function Button({ typeBtn, onClick, labelBtn, loading, loadingText }: Button) {
  return (
    <div>
      <button
        className={loading ? "border-none bg-zinc-500 rounded-xl text-white px-4 py-2  " : "border-none bg-zinc-800 rounded-xl text-white px-4 py-2  cursor-pointer hover:bg-zinc-600"}
        onClick={typeBtn === "button" && !loading ? onClick : undefined}
        type={typeBtn}
        disabled={loading}
      >
        {loading ? loadingText : labelBtn}
      </button>
    </div>
  );
}
