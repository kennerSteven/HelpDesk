import Button from "../../../Components/Ui/Button";
import { PlusIcon } from "../../../Components/Icons";
import useModal from "../../../Hooks/useModal";
import Modal from "../../../Components/Modal/Modal";
import CreateProject from "./CreateProject";
import useShowToast from "../../../Hooks/useShowToast";
import Toast from "../../../Components/Toast/Toast";

export default function ProjectTopbar() {
  const {
    isOpen: isProjectModalOpen,
    openModal: openProjectModal,
    closeModal: closeProjectModal,
  } = useModal();

  const {
    isOpen: showProjectSuccessToast,
    showToast: openProjectSuccessToast,
    closeToast: closeProjectSuccessToast,
  } = useShowToast();

  const handleProjectSuccess = () => {
    closeProjectModal();
    openProjectSuccessToast();
  };

  return (
    <div className="flex w-full items-center justify-between">
      {/* Lado Izquierdo: Textos */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Mis proyectos
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Workspace
          </span>
        </div>
        <p className="text-[14px] text-slate-500 font-medium">
          Gestiona y organiza tus proyectos creados en el sistema.
        </p>
      </div>

      {/* Lado Derecho: Botones de Acción */}

      <Button
        variant="primary"
        size="sm"
        icon={<PlusIcon className="size-4" />}
        labelBtn="Crear nuevo proyecto"
        onClick={openProjectModal}
        className="h-[38px] px-4 rounded-[10px]"
      />

      {isProjectModalOpen && (
        <Modal
          width="low"
          labelConfirm="Crear proyecto"
          labelCancel="Cancelar"
          Confirm={() => {}}
          Cancel={closeProjectModal}
          closeModal={closeProjectModal}
          modalTitle="Crear nuevo proyecto"
          formId="createProject"
          contentModal={<CreateProject onClose={handleProjectSuccess} />}
          typeBtnConfirm="submit"
        />
      )}

      {/* Toasts Flotantes */}
      <Toast
        titleToast="Se ha creado un nuevo proyecto"
        typeToast="success"
        isOpen={showProjectSuccessToast}
        onClose={closeProjectSuccessToast}
      />
    </div>
  );
}

export { ProjectTopbar as TaskTopbar };
