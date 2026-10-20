import { CreateTaskSchemaType, priority, status } from "@repo/schemas";
import { db } from "../Config/firebase";

const COLLECTION_NAME = "tasks";

async function populateCategories(tasks: any[]): Promise<any[]> {
  const categoriesSnapshot = await db.collection("categories").get();
  const categoriesMap = new Map<string, any>();
  categoriesSnapshot.docs.forEach((doc) => {
    categoriesMap.set(doc.id, {
      _id: doc.id,
      id: doc.id,
      ...doc.data(),
    });
  });

  return tasks.map((task) => {
    const rawCat = task.categoryId;
    const catId =
      typeof rawCat === "string"
        ? rawCat
        : rawCat?._id || rawCat?.id || "";

    const populatedCat =
      categoriesMap.get(catId) ||
      (typeof rawCat === "object" && rawCat !== null && rawCat.nameCategory
        ? rawCat
        : { _id: catId, id: catId, nameCategory: "General" });

    return {
      ...task,
      categoryId: populatedCat,
    };
  });
}

async function CreateTask(data: CreateTaskSchemaType) {
  const catId =
    typeof data.categoryId === "string"
      ? data.categoryId
      : (data.categoryId as any)?._id || (data.categoryId as any)?.id || "";

  const taskPayload = {
    name: data.name,
    description: data.description || "",
    dateInit: data.dateInit,
    dateFinish: data.dateFinish,
    status: data.status || "PENDING",
    priority: data.priority || "MEDIUM",
    categoryId: catId,
    projectId: data.projectId || null,
    showSteps: data.showSteps ?? false,
    steps: data.steps || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await db.collection(COLLECTION_NAME).add(taskPayload);
  const snapshot = await docRef.get();

  if (data.projectId) {
    try {
      const projectRef = db.collection("projects").doc(data.projectId);
      const projectDoc = await projectRef.get();
      if (projectDoc.exists) {
        const currentTasks = projectDoc.data()?.tasks || [];
        await projectRef.update({
          tasks: [...currentTasks, docRef.id],
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (projectError) {
      console.error("Error al asociar tarea al proyecto:", projectError);
    }
  }

  const createdTask = {
    _id: docRef.id,
    id: docRef.id,
    ...snapshot.data(),
  };

  const [populated] = await populateCategories([createdTask]);
  return populated;
}

async function GetTasks() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const tasks = snapshot.docs.map((doc) => ({
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  }));

  return populateCategories(tasks);
}

async function UpdateTask(id: string, data: Partial<CreateTaskSchemaType>) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("El payload está vacío. No hay datos para actualizar.");
  }

  const taskRef = db.collection(COLLECTION_NAME).doc(id);
  const existingDoc = await taskRef.get();

  if (!existingDoc.exists) {
    throw new Error("La tarea con el ID proporcionado no existe.");
  }

  const updatePayload: any = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (typeof updatePayload.categoryId === "object" && updatePayload.categoryId !== null) {
    updatePayload.categoryId =
      updatePayload.categoryId._id || updatePayload.categoryId.id;
  }

  await taskRef.update(updatePayload);

  const updatedDoc = await taskRef.get();
  const updatedTask = {
    _id: updatedDoc.id,
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };

  const [populated] = await populateCategories([updatedTask]);
  return populated;
}

async function DeleteTask(id: string) {
  const taskRef = db.collection(COLLECTION_NAME).doc(id);
  const existingDoc = await taskRef.get();

  if (!existingDoc.exists) {
    throw new Error("La tarea con el ID proporcionado no existe.");
  }

  const taskData = existingDoc.data();
  const projectId = taskData?.projectId;

  await taskRef.delete();

  if (projectId) {
    try {
      const projectRef = db.collection("projects").doc(projectId);
      const projectDoc = await projectRef.get();
      if (projectDoc.exists) {
        const currentTasks: any[] = projectDoc.data()?.tasks || [];
        const updatedTasks = currentTasks.filter(
          (t: any) => t !== id && t?._id !== id && t?.id !== id,
        );
        await projectRef.update({
          tasks: updatedTasks,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (projectError) {
      console.error("Error al desvincular tarea del proyecto:", projectError);
    }
  }

  // Desvincular de cualquier otro proyecto que contenga esta tarea como referencia
  try {
    const projectsSnapshot = await db
      .collection("projects")
      .where("tasks", "array-contains", id)
      .get();
    for (const pDoc of projectsSnapshot.docs) {
      const currentTasks: any[] = pDoc.data()?.tasks || [];
      const updatedTasks = currentTasks.filter(
        (t: any) => t !== id && t?._id !== id && t?.id !== id,
      );
      await pDoc.ref.update({
        tasks: updatedTasks,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error("Error al limpiar referencia de tarea en proyectos:", err);
  }

  return { id };
}

async function FilterByPriority(filterBy: {
  priority?: priority;
  status?: status;
}) {
  let query: FirebaseFirestore.Query = db.collection(COLLECTION_NAME);

  if (filterBy.priority) {
    query = query.where("priority", "==", filterBy.priority);
  }

  if (filterBy.status) {
    query = query.where("status", "==", filterBy.status);
  }

  const snapshot = await query.get();
  const tasks = snapshot.docs.map((doc) => ({
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  }));

  return populateCategories(tasks);
}

export { GetTasks, CreateTask, UpdateTask, DeleteTask, FilterByPriority };
