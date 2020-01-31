import { Task } from "../types/Task";
import {
  RecordDamageVariables,
  CheckDamageVariables,
  TaskVariables
} from "../types/Variables";

export default class TaskService {
  list = async (): Promise<Task[]> => {
    const res = await fetch(
      "/engine-rest/task?processDefinitionKey=Insurance_Test_Process"
    );
    return await res.json();
  };

  start = async (): Promise<Task> => {
    const res = await fetch(
      "/engine-rest/process-definition/key/Insurance_Test_Process/start",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }
    );
    return await res.json();
  };

  complete = async (
    taskId: string,
    variables: RecordDamageVariables | CheckDamageVariables
  ): Promise<RecordDamageVariables | CheckDamageVariables> => {
    const body = {
      ...variables,
      withVariablesInReturn: true
    };
    const res = await fetch(`/engine-rest/task/${taskId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return await res.json();
  };

  listTaskVariables = async (taskId: string): Promise<TaskVariables> => {
    const res = await fetch(`/engine-rest/task/${taskId}/variables`);
    return await res.json();
  };
}
