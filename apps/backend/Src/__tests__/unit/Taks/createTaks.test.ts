import { CreateTask, DeleteTask } from "../../../Services/task.service";
import { mockTaskWithoutSteps, mockTaskWithSteps } from "../../mocks/task.mock";

describe("Task Manager", () => {
  let taskWithStepsId: string;
  let taskWithoutStepsId: string;

  afterAll(async () => {
    if (taskWithStepsId) {
      await DeleteTask(taskWithStepsId);
    }
    if (taskWithoutStepsId) {
      await DeleteTask(taskWithoutStepsId);
    }
  });

  describe("Create Task with steps", () => {
    test("The task should create successfully", async () => {
      console.log("1. Iniciando prueba");

      const DataWithSteps = await CreateTask(mockTaskWithSteps);
      taskWithStepsId = DataWithSteps._id.toString();

      expect(DataWithSteps).toBeDefined();
      expect(taskWithStepsId).toBeDefined();
      console.log("2. Tarea guardada con ID:", taskWithStepsId);
    });
  });

  describe("Create Task without steps", () => {
    test("The task without steps must be created succesfully", async () => {
      const DataWithoutSteps = await CreateTask(mockTaskWithoutSteps);
      taskWithoutStepsId = DataWithoutSteps._id.toString();

      expect(DataWithoutSteps).toBeDefined();
      expect(taskWithoutStepsId).toBeDefined();
    });
  });
});
