import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "../Constants/projectKeys";
import { getProjectByFilters } from "../Services/project.service";
import { useSearchParams } from "react-router-dom";
import type { ProjectStatus, ProjectPriority } from "@repo/schemas";

export default function useProjects() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
 const [searchParams, setSearchParams] = useSearchParams();
 const activeFiltefar = searchParams.get("status") || "ALL";

  const filters = {
    priority: ["LOW", "MEDIUM", "HIGH"],
    status: ["PENDING", "IN_PROGRESS", "COMPLETED"],
  };

  let finallyFilter:
    | { priority?: ProjectPriority; status?: ProjectStatus }
    | {};

  if (filters.priority.some((filter) => filter === activeFilter)) {
    finallyFilter = { priority: activeFilter as ProjectPriority };
  } else if (filters.status.some((filter) => filter === activeFilter)) {
    finallyFilter = { status: activeFilter as ProjectStatus };
  }

  const {
    data: filteredProjects = [],
    isLoading: isLoadingFilteredProjects,
    isError: isErrorFilteredProjects,
    refetch: refetchFilteredProjects,
  } = useQuery({
    queryKey: [...projectKeys.all, activeFilter],
    queryFn: () => getProjectByFilters(finallyFilter),
  });

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filteredProjects,
    isLoadingFilteredProjects,
    isErrorFilteredProjects,
    refetchFilteredProjects,
  };
}
