import { CreateProjectSchemaType, Filters } from "@repo/schemas";
import { db } from "../Config/firebase";

const COLLECTION_NAME = "projects";

async function populateTasksForProjects(projectsData: any[]): Promise<any[]> {
  const allTaskIds = new Set<string>();

  projectsData.forEach((project) => {
    if (Array.isArray(project.tasks)) {
      project.tasks.forEach((task: any) => {
        const id = typeof task === "string" ? task : task?._id || task?.id;
        if (id) allTaskIds.add(id);
      });
    }
  });

  if (allTaskIds.size === 0) {
    return projectsData.map((project) => ({
      ...project,
      tasks: [],
    }));
  }

  const [taskDocs, categoriesSnapshot] = await Promise.all([
    Promise.all(
      Array.from(allTaskIds).map((id) => db.collection("tasks").doc(id).get()),
    ),
    db.collection("categories").get(),
  ]);

  

  const categoriesMap = new Map<string, any>();
  categoriesSnapshot.docs.forEach((doc) => {
    categoriesMap.set(doc.id, {
      _id: doc.id,
      id: doc.id,
      ...doc.data(),
    });
  });

  const tasksMap = new Map<string, any>();
  taskDocs.forEach((doc) => {
    if (doc.exists) {
      const taskData = doc.data() || {};
      const catId =
        typeof taskData.categoryId === "string"
          ? taskData.categoryId
          : taskData.categoryId?._id || taskData.categoryId?.id || "";

      const populatedCategory =
        categoriesMap.get(catId) ||
        (typeof taskData.categoryId === "object" && taskData.categoryId !== null
          ? taskData.categoryId
          : { _id: catId, id: catId, nameCategory: "General" });

      tasksMap.set(doc.id, {
        _id: doc.id,
        id: doc.id,
        ...taskData,
        categoryId: populatedCategory,
      });
    }
  });

  return projectsData.map((project) => {
    const populated = Array.isArray(project.tasks)
      ? project.tasks
          .map((t: any) => {
            const id = typeof t === "string" ? t : t?._id || t?.id;
            return tasksMap.get(id) || (typeof t === "object" ? t : null);
          })
          .filter(Boolean)
      : [];

    return {
      ...project,
      tasks: populated,
    };
  });
}

async function CreateProject(data: CreateProjectSchemaType) {
  const taskIds = Array.isArray(data.tasks)
    ? data.tasks
        .map((t: any) => (typeof t === "string" ? t : t?._id || t?.id))
        .filter(Boolean)
    : [];

  const projectPayload = {
    nameProject: data.nameProject,
    descriptionProject: data.descriptionProject || "",
    dateInit: data.dateInit,
    dateFinish: data.dateFinish,
    color: data.color || "BLUE",
    tasks: taskIds,
    status: data.status || "PENDING",
    priority: data.priority || "MEDIUM",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await db.collection(COLLECTION_NAME).add(projectPayload);
  const snapshot = await docRef.get();

  const createdProject = {
    _id: docRef.id,
    id: docRef.id,
    ...snapshot.data(),
  };

  const [populated] = await populateTasksForProjects([createdProject]);
  return populated;
}

async function GetProjects() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const projects = snapshot.docs.map((doc) => ({
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  }));

  return populateTasksForProjects(projects);
}

async function FilterProjects(filter: Filters) {
  let query: FirebaseFirestore.Query = db.collection(COLLECTION_NAME);

  if (filter.status && filter.status !== "ALL") {
    query = query.where("status", "==", filter.status);
  }

  if (filter.priority) {
    query = query.where("priority", "==", filter.priority);
  }

  const snapshot = await query.get();
  const projects = snapshot.docs.map((doc) => ({
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  }));

  return populateTasksForProjects(projects);
}

async function GetProjectById(id: string) {
  const doc = await db.collection(COLLECTION_NAME).doc(id).get();
  if (!doc.exists) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }

  const project = {
    _id: doc.id,
    id: doc.id,
    ...doc.data(),
  };

  const [populated] = await populateTasksForProjects([project]);
  return populated;
}

async function UpdateProject(
  id: string,
  data: Partial<CreateProjectSchemaType>,
) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("El payload está vacío. No hay datos para actualizar.");
  }

  const projectRef = db.collection(COLLECTION_NAME).doc(id);
  const existingDoc = await projectRef.get();

  if (!existingDoc.exists) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }

  const updatePayload: any = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (Array.isArray(updatePayload.tasks)) {
    updatePayload.tasks = updatePayload.tasks
      .map((t: any) => (typeof t === "string" ? t : t?._id || t?.id))
      .filter(Boolean);
  }

  await projectRef.update(updatePayload);

  const updatedDoc = await projectRef.get();
  const updatedProject = {
    _id: updatedDoc.id,
    id: updatedDoc.id,
    ...updatedDoc.data(),
  };

  const [populated] = await populateTasksForProjects([updatedProject]);
  return populated;
}

async function DeleteProject(id: string) {
  const projectRef = db.collection(COLLECTION_NAME).doc(id);
  const existingDoc = await projectRef.get();

  if (!existingDoc.exists) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }

  await projectRef.delete();
  return { id };
}

export {
  CreateProject,
  GetProjects,
  FilterProjects,
  GetProjectById,
  UpdateProject,
  DeleteProject,
};
