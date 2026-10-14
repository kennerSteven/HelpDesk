import { useState } from "react";
import { getAllTasks } from "../Services/task.service";
import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../Constants/taskKeys";
import { getProject } from "../../Projects/Services/project.service";
import { projectKeys } from "../../Projects/Constants/projectKeys";

export default function useTask() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");

  const { data: Tasks = [] } = useQuery({
    queryKey: taskKeys.all,
    queryFn: getAllTasks,
  });

  const { data: Projects = [] } = useQuery({
    queryKey: projectKeys.all,
    queryFn: getProject,
  });

  console.log("Tareas cargadas useQuery", Tasks);
  console.log("Proyectos cargados useQuery", Projects);
  return {
    search,
    setSearch,
    Tasks,
    Projects,
    activeFilter,
    setActiveFilter,
  };
}
