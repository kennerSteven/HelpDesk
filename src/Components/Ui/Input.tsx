interface Input {
  name: string;
  value: string;
  onChange: any;
}

export default function Input({ value, name, onChange }: Input) {
  return (
    <div className="my-2">
      <input
        className="border-none bg-zinc-200 rounded-md shadow-sm shadow-zinc-200"
        type="text"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
