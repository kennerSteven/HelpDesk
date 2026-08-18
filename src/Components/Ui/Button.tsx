interface Button {
  typeBtn: "button" | "submit";
  labelBtn?: string;
  onClick?: () => void;
}

export default function Button({ typeBtn, onClick, labelBtn }: Button) {
  return (
    <div>
      <button
        className="border-none bg-zinc-800 rounded-md text-white p-1"
        onClick={typeBtn === "button" ? onClick : undefined}
        type={typeBtn}
      >
        {labelBtn}
      </button>
    </div>
  );
}
