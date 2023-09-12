const Controller = require("./controllers/controller.js")

const command = process.argv[2];

switch(command) {
  case "list":
    Controller.list();
    break;
  case "listEmployee":
    const idToSearch = process.argv[3];
    Controller.listEmployee(idToSearch);
    break;
  case "add":
    const employee = process.argv.slice(3);
    Controller.addEmployee(employee);
    break;
  default:
    breakk;
}