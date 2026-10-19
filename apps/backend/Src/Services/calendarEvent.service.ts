import { CalendarEvent } from "@repo/schemas";
import { db } from "../Config/firebase";

const COLLECTION_NAME = "calendarEvents";

async function createCalendarEvent(data: CalendarEvent) {
  const eventPayload = {
    date: data.date,
    title: data.title,
    taskId: data.taskId || null,
    createdAt: new Date().toISOString(),
  };

  const docRef = await db.collection(COLLECTION_NAME).add(eventPayload);
  const snapshot = await docRef.get();

  return {
    _id: docRef.id,
    id: docRef.id,
    ...snapshot.data(),
  };
}

async function GetCalendarEvent() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  if (snapshot.empty) {
    return [];
  }

  const taskIds = new Set<string>();
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.taskId) {
      taskIds.add(data.taskId);
    }
  });

  const tasksMap = new Map<string, any>();
  if (taskIds.size > 0) {
    const [taskDocs, categoriesSnapshot] = await Promise.all([
      Promise.all(
        Array.from(taskIds).map((id) => db.collection("tasks").doc(id).get()),
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
  }

  const events = snapshot.docs.map((doc) => {
    const data = doc.data();
    const populatedTask = data.taskId ? tasksMap.get(data.taskId) : null;

    return {
      _id: doc.id,
      id: doc.id,
      ...data,
      taskId: populatedTask || data.taskId,
    };
  });

  return events;
}

export { GetCalendarEvent, createCalendarEvent };
