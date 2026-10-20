import { useState } from "react";
import { SearchIcon } from "../../../Components/Icons";
import useModal from "../../../Hooks/useModal";
import Modal from "../../../Components/Modal/Modal";
import CreateProject from "./CreateProject";
import useShowToast from "../../../Hooks/useShowToast";
import Toast from "../../../Components/Toast/Toast";
import useProjects from "../Hooks/useProjects";

import projectColor from "../../../Utils/AssignColor";

export interface ProjectFiltersProps {
  search?: string;
  onSearchChange?: (val: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  totalTasks?: number;
}

export default function ProjectFilters({
  search = "",
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalTasks = 12,
}: ProjectFiltersProps) {
  const [internalSearch, setInternalSearch] = useState(search);
  const [selectedProject, setSelectedProject] = useState("all");
  const { filteredProjects } = useProjects();
  const {
    openModal: openCreateProject,
    isOpen: isOpenCreateProject,
    closeModal: closeCreateProject,
  } = useModal();

  const {
    isOpen: isOpenProjectToast,
    showToast: showProjectToast,
    closeToast: closeProjectToast,
  } = useShowToast();

  const closeProject = () => {
    closeCreateProject();
    showProjectToast();
  };

  const handleSearch = (val: string) => {
    setInternalSearch(val);
    onSearchChange?.(val);
  };

  const statuses = [
    { label: "Todas", count: totalTasks, value: "ALL" },
    { label: "Pendiente", value: "PENDING" },
    { label: "En proceso", value: "IN_PROGRESS" },
    { label: "Completada", value: "COMPLETED" },
  ];

  const dueDates = [
    { label: "Para hoy", count: 0, isAlert: false },
    { label: "Esta sem.", count: 4, isAlert: false },
    { label: "Vencidas", count: 1, isAlert: true },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-6">
      {/* 1. Input de Búsqueda */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={onSearchChange ? search : internalSearch}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300/30 focus:border-slate-400 transition-all"
        />
      </div>

      {/* 2. Sección: ESTADO */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          ESTADO
        </span>
        <div className="grid grid-cols-2 gap-2">
          {statuses.map((item) => {
            const isActive = activeFilter === item.value;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onFilterChange?.(item.value)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0B132B] text-white font-semibold shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50"
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-slate-800 text-slate-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sección: PROYECTOS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            PROYECTOS
          </span>
          <button
            onClick={openCreateProject}
            type="button"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            + Nuevo
          </button>
        </div>

        <div className="space-y-1">
          {(filteredProjects || []).map((project: any) => {
            const isSelected = selectedProject === project._id;
            return (
              <div
                key={project._id}
                onClick={() => setSelectedProject(project._id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-100/90 text-slate-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-50 font-normal"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`size-2 rounded-full shrink-0 ${projectColor(project.color)}`}
                  />
                  <span className="text-sm leading-tight">
                    {project.nameProject}
                  </span>
                </div>
                <span
                  className={`text-xs ${
                    isSelected
                      ? "font-bold text-slate-800"
                      : "font-medium text-slate-400"
                  }`}
                >
                  {project.tasks.length}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {isOpenCreateProject && (
        <Modal
          modalTitle="Crear nuevo proyecto"
          width="low"
          formId="createProject"
          typeBtnConfirm="submit"
          labelCancel="Cancel"
          labelConfirm="Crear proyecto"
          Confirm={() => ""}
          closeModal={closeCreateProject}
          Cancel={closeCreateProject}
          contentModal={<CreateProject onClose={closeProject} />}
        />
      )}

      {/* Toast de confirmación al crear proyecto */}
      <Toast
        titleToast="Se ha creado un nuevo proyecto"
        typeToast="success"
        isOpen={isOpenProjectToast}
        onClose={closeProjectToast}
      />
    </div>
  );
}

export { ProjectFilters as TaskFilters };
