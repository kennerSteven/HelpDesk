import { useState } from "react";
import { SearchIcon } from "../../../Components/Icons";
import useModal from "../../../Hooks/useModal";
import Modal from "../../../Components/Modal/Modal";
import CreateProject from "../../Projects/Components/CreateProject";
import useShowToast from "../../../Hooks/useShowToast";
import Toast from "../../../Components/Toast/Toast";

interface TaskFiltersProps {
  search?: string;
  onSearchChange?: (val: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  totalTasks?: number;
}

export default function TaskFilters({
  search = "",
  onSearchChange,
  activeFilter = "Todas",
  onFilterChange,
  totalTasks = 12,
}: TaskFiltersProps) {
  const [internalSearch, setInternalSearch] = useState(search);
  const [selectedProject, setSelectedProject] = useState("all");
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
    { label: "Todas", count: totalTasks },
    { label: "Pendiente" },
    { label: "Asignada" },
    { label: "Completada" },
  ];

  const projects = [
    {
      id: "all",
      name: "Todos los proyectos",
      count: 6,
      dotColor: "bg-slate-900",
    },
    {
      id: "design",
      name: "Diseño & UX",
      count: 2,
      dotColor: "bg-purple-500",
    },
    {
      id: "frontend",
      name: "Desarrollo Frontend",
      count: 2,
      dotColor: "bg-blue-500",
    },
    {
      id: "research",
      name: "Investigación",
      count: 2,
      dotColor: "bg-emerald-500",
    },
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
            const isActive = activeFilter === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onFilterChange?.(item.label)}
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
          {projects.map((project) => {
            const isSelected = selectedProject === project.id;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-100/90 text-slate-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-50 font-normal"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`size-2 rounded-full shrink-0 ${project.dotColor}`}
                  />
                  <span className="text-sm leading-tight">{project.name}</span>
                </div>
                <span
                  className={`text-xs ${
                    isSelected
                      ? "font-bold text-slate-800"
                      : "font-medium text-slate-400"
                  }`}
                >
                  {project.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Sección: VENCIMIENTOS */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          VENCIMIENTOS
        </span>
        <div className="grid grid-cols-3 gap-2">
          {dueDates.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                item.isAlert
                  ? "bg-rose-50/40 border-rose-200/90"
                  : "bg-white border-slate-200/90"
              }`}
            >
              <span
                className={`text-[11px] font-medium leading-tight ${
                  item.isAlert
                    ? "text-rose-600 font-semibold"
                    : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-sm font-bold mt-1 leading-tight ${
                  item.isAlert ? "text-rose-600" : "text-slate-800"
                }`}
              >
                {item.count}
              </span>
            </div>
          ))}
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
