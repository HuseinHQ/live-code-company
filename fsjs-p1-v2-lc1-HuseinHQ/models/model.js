const fs = require("fs");
const Factory = require("./class");


class Model {
  // Tambahkan parameter sesuai kebutuhanmu
  static listCompany(cb) { // Release 1
    fs.readFile("./data.json", "utf-8", (err, companies) => {
      if(err) {
        cb(err);
      } else {
        companies = JSON.parse(companies);

        const result = companies.map(company => {
          const {id, name, since, address, employees} = company;
          return Factory.createCompany(id, name, since, address, employees);
        })
        
        cb(null, result);
      }
    })
  }

  static listEmployee(idToSearch, cb) { // Release 2 & 3
    this.listCompany((err, companies) => {
      if(err) {
        cb(err);
      } else {
        const company = companies.find(company => company.id == idToSearch);
        if(!company) {
          cb({code: "company"})
        } else {
          cb(null, company);
        }
      }
    })
  }

  static addEmployee(employee, cb) { // Release 4
    const [companyId, name, ktp, joined_year, position, salary] = employee;
    this.listEmployee(+companyId, (err, company) => {
      if(err) {
        cb(err);
      } else {
        if(!company) {
          cb({code: "company"});
        } else {
          const newEmployee = Factory.createEmployee(name, +ktp, +joined_year, position, +salary);
          company.employees.push(newEmployee);
          
          this.listCompany((err, companies) => {
            if(err) {
              cb(err);
            } else {
              let sameIdCompany = companies.findIndex(company => company.id === +companyId);
              companies[sameIdCompany] = company;

              this.save("./data.json", companies, (err) => {
                if(err) {
                  cb(err);
                } else {
                  cb(null, newEmployee);
                }
              })
            }
          })
        }
      }
    })
  }

  static save(pathFile, data, cb) { // Release 4
    data = JSON.stringify(data, null, 2);
    fs.writeFile(pathFile, data, (err) => {
      cb(err);
    })
  }

}

module.exports = Model