interface Button {
  typeBtn: "button" | "submit";
  labelBtn?: string;
  onClick?: () => void;
}

export default function Button({ typeBtn, onClick, labelBtn }: Button) {
  return (
    <div>
      <button
        className="border-none bg-zinc-800 rounded-xl text-white px-4 py-2  cursor-pointer hover:bg-zinc-600"
        onClick={typeBtn === "button" ? onClick : undefined}
        type={typeBtn}
      >
        {labelBtn}
      </button>
    </div>
  );
}
