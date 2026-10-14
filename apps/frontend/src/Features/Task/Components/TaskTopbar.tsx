
import Button from "../../../Components/Ui/Button";
import { PlusIcon } from "../../../Components/Icons";
import useModal from "../../../Hooks/useModal";
import Modal from "../../../Components/Modal/Modal";
import CreateTask from "./CreateTask/CreateTask";
import Category from "../../Category/Components/Category";
import useShowToast from "../../../Hooks/useShowToast";
import Toast from "../../../Components/Toast/Toast";

export default function TaskTopbar() {
  const {
    isOpen: isTaskModalOpen,
    openModal: openTaskModal,
    closeModal: closeTaskModal,
  } = useModal();

  const {
    isOpen: isCategoryModalOpen,
    openModal: openCategoryModal,
    closeModal: closeCategoryModal,
  } = useModal();

  const {
    isOpen: showSuccessToast,
    showToast: openSuccessToast,
    closeToast: closeSuccessToast,
  } = useShowToast();

  const handleTaskSuccess = () => {
    closeTaskModal();
    openSuccessToast();
  };

  return (
    <div className="flex w-full items-center justify-between">
      {/* Lado Izquierdo: Textos */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">
            Mis tareas
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Workspace
          </span>
        </div>
        <p className="text-[14px] text-slate-500 font-medium">
          Gestiona tus tareas creadas en el sistema.
        </p>
      </div>

      {/* Lado Derecho: Botones */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          labelBtn="Crear / Ver categoría"
          onClick={openCategoryModal}
          className="h-[38px] px-4 rounded-[10px]"
        />
        <Button
          variant="primary"
          size="sm"
          icon={<PlusIcon className="size-4" />}
          labelBtn="Crear nueva tarea"
          onClick={openTaskModal}
          className="h-[38px] px-4 rounded-[10px]"
        />
      </div>

      {/* Modal para Crear Tarea */}
      {isTaskModalOpen && (
        <Modal
          width="low"
          labelConfirm="Crear tarea"
          labelCancel="Cancelar"
          Confirm={() => {}}
          Cancel={closeTaskModal}
          closeModal={closeTaskModal}
          modalTitle="Crear tarea"
          formId="CreateTask"
          contentModal={<CreateTask onSuccess={handleTaskSuccess} />}
          typeBtnConfirm="submit"
        />
      )}

      {/* Modal para Administrar Categorías */}
      {isCategoryModalOpen && (
        <Modal
          width="large"
          modalTitle="Administrar Categorías"
          contentModal={<Category />}
          closeModal={closeCategoryModal}
          Cancel={closeCategoryModal}
          labelCancel="Cerrar"
          typeBtnConfirm="button"
        />
      )}

      {/* Toast Flotante */}
      <Toast
        titleToast="Se ha creado una nueva tarea"
        typeToast="success"
        isOpen={showSuccessToast}
        onClose={closeSuccessToast}
      />
    </div>
  );
}
