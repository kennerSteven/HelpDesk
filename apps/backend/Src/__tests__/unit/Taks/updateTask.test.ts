import { ConnectDb } from "../../../Config/database";
import mongoose from "mongoose";
import { UpdateTask } from "../../../Services/task.service";
import "../../../Models/Category";
import {
  mockUpdateTaskId,
  mockUpdateTaskPayload,
} from "../../mocks/updateTask.mock";

beforeAll(async () => {
  await ConnectDb();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Update task manager", () => {
  describe("Update a task", () => {
    test("The task should be updated succesfully", async () => {
      const updated = await UpdateTask(mockUpdateTaskId, mockUpdateTaskPayload);

      expect(updated).toBeDefined();
      expect(updated?.name).toBe(mockUpdateTaskPayload.name);
      expect(updated?.status).toBe(mockUpdateTaskPayload.status);
    });
  });
});