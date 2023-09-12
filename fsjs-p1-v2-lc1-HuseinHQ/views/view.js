class View {
  // Tambahkan parameter sesuai kebutuhanmu
  static showError(err) {
    switch(err.code) {
      case "company":
        console.log("===========\n== Error ==\n===========\nCompany not found");
        break;
      default:
        console.log(err);
    }
  }

  static showList(data){ // Release 1
    console.log(data);
  }

  static showListEmployee(data) { // Release 2 & 3
    const table = data.employees.map(employee => {
      const {name, ktp, joined_year, position} = employee
      return {
        name,
        ktp,
        joined_year,
        position,
        lengthOfWork: employee.lengthOfWork,
        salaryEstimate: employee.applySalary(),
      }
    })

    console.log("====================\n== List Employee ===\n====================");
    console.log(`Company Name: ${data.name}`);
    console.log(`Since: ${data.since}`);
    console.log(`Address: ${data.address}\n`);
    console.table(table);
  }

  static showAddEmployee(data){ // Release 4
    console.log("=============\n== SUCCESS ==\n=============");
    console.log(`Success add ${data.name} as employee`);
  }
}

module.exports = View