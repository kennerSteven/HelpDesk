interface Props {
    message: string;

}

export default function FieldMessageError({
    message,

}: Props) {
    return (
        <p className={"text-sm my-2 text-red-500 bg-red-100 rounded-md p-2"}>
            {message}
        </p>
    );
}