const { Client, logger, Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'calculateSum'
client.subscribe("calculateSum", async function({ task, taskService }) {
  // Put your business logic

  // get the process variables
  const amount = task.variables.get("amount");
  const insurance = task.variables.get("insurance");
  let payedByClient;
  let payedAmount;
  let limit = amount;
  let deductible = 1;

  switch (insurance){
  	case "gold":
  		limit = 300;
  		deductible = 0.1;
		  break;
  	case "silver":
  		limit = 1000;
  		deductible = 0.2;
  		break;
  	case "bronze":
  		limit = 2000;
  		deductible = 0.4;
  		break;
  }

  payedByClient = amount * deductible;

  if(payedByClient>limit){
  	payedByClient = limit;
  }

  payedAmount = amount - payedByClient;

  // set a process variable 'winning'
  const processVariables = new Variables();
  processVariables.set("payedByClient", payedByClient);
  processVariables.set("payedAmount", payedAmount);

  // complete the task
  await taskService.complete(task, processVariables);
});