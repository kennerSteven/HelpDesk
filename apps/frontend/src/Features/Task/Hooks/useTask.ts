import { useState } from "react";
import { getAllTasks } from "../Services/task.service";
import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../Constants/taskKeys";

export default function useTask() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const { data: Tasks = [] } = useQuery({
    queryKey: taskKeys.all,
    queryFn: getAllTasks,
  });

  console.log("Tareas cargadas useQuery", Tasks);

  return {
    search,
    setSearch,
    Tasks,
    activeFilter,
    setActiveFilter,
  };
}
