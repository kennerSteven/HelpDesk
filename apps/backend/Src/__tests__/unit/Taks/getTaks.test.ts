import mongoose from "mongoose";
import { ConnectDb } from "../../../Config/firebase";
import { GetTasks } from "../../../Services/task.service";
import "../../../Models/Category";

beforeEach(async () => {
  await ConnectDb();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Get task manager", () => {
  describe("Get all tasks", () => {
    test("The task should be listed succesfully", async () => {
      const data = await GetTasks();
      expect(data).toBeDefined();
    });
  });
});
