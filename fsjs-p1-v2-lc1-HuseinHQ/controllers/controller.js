const Model = require("../models/model.js")
const View = require("../views/view.js")

class Controller {
  // Tambahkan parameter sesuai kebutuhanmu
  static list() { // Release 1
    Model.listCompany((err, data) => {
      if(err) {
        View.showError(err);
      } else {
        View.showList(data);
      }
    })
  }

  static listEmployee(idToSearch) { // Release 2 & 3
    Model.listEmployee(idToSearch, (err, data) => {
      if(err) {
        View.showError(err);
      } else {
        View.showListEmployee(data);
      }
    })
  }

  static addEmployee(employee) { // Release 4
    Model.addEmployee(employee, (err, data) => {
      if(err) {
        View.showError(err);
      } else {
        View.showAddEmployee(data);
      }
    });
  }
}

module.exports = Controller