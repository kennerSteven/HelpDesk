import { UpdateTask } from "../../../Services/task.service";
import {
  mockUpdateTaskId,
  mockUpdateTaskPayload,
} from "../../mocks/updateTask.mock";

describe("Update task manager", () => {
  describe("Update a task", () => {
    test("The update task service is defined", async () => {
      expect(UpdateTask).toBeDefined();
    });
  });
});
