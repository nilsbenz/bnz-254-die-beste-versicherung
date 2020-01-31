export interface Task {
  id: string;
  name: string;
  processInstanceId: string;
  taskDefinitionKey: "recordDamage" | "checkDamage";
  created: string;
}
