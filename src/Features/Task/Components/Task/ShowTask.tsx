import { GetStorageItem } from "../../../../Utils/Storage.utils";

export default function ShowTask() {
  const task = GetStorageItem("user", []);
  console.log(task);

  return <div>{task.length === 0 && <p>Sin data</p>}</div>;
}
