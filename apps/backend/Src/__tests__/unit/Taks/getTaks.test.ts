import { GetTasks } from "../../../Services/task.service";

describe("Get task manager", () => {
  describe("Get all tasks", () => {
    test("The task should be listed succesfully", async () => {
      const data = await GetTasks();
      expect(data).toBeDefined();
    });
  });
});
