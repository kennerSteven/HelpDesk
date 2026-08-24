import useForm from "../../../Shared/Hooks/useForm";
import useErrors from "../../../Shared/Hooks/useErrors";
import { ValidateFields } from "../../../Utils/FieldValidate";

export default function useCreateTask() {
  const taskFields = {
    name: "",
    description: "",
    dateInit: "",
    dateFinish: "",
    photo: "",
    priority: "",
    status: "",
    category: "",
  };

  const { errors: taskError, setErrors } =
    useErrors<Record<string, string>>(taskFields);
  const { values: task, HandleChange } = useForm(taskFields);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = ValidateFields(task);
    setErrors(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;
  }
  return {
    handleSubmit,
    taskError,
    task,
    HandleChange,
  };
}
