class Company {
  constructor(id, name, since, address, employees) {
    this.id = id;
    this.name = name;
    this.since = since;
    this.address = address;
    this.employees = this.allEmployees(employees);
  }

  allEmployees(employees) {
    const employeeIntances = employees.map(employee => {
      const {name, ktp, joined_year, position, salary} = employee;
      return Factory.createEmployee(name, ktp, joined_year, position, salary)
    })
    return employeeIntances;
  }
}

class Employee {
  #salary
  constructor(name, ktp, joined_year, position, salary) {
    this.name = name;
    this.ktp = ktp;
    this.joined_year = joined_year;
    this.position = position;
    this.#salary = salary;
  }

  get salary() {
    return this.#salary;
  }

  get lengthOfWork() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.joined_year;
  }

  applySalary(percentage = 10) {
    const salaryBonus = this.lengthOfWork >= 1 ? true : false;
    if(salaryBonus) {
      return this.#salary + (this.#salary * (percentage/100));
    } else {
      return this.#salary;
    }
  }

  toJSON() {
    return {
      name: this.name,
      ktp: this.ktp,
      joined_year: this.joined_year,
      position: this.position,
      salary: this.#salary,
    }
  }
}

class Staff extends Employee {
  constructor(name, ktp, joined_year, salary) {
    super(name, ktp, joined_year, "Staff", salary)
  }
}

class Manager extends Employee {
  constructor(name, ktp, joined_year, salary) {
    super(name, ktp, joined_year, "Manager", salary)
  }

  applySalary() {
    return super.applySalary(15)
  }  
}

class Factory {
  static createCompany(id, name, since, address, employees) {
    return new Company(id, name, since, address, employees);
  }

  static createEmployee(name, ktp, joined_year, position, salary) {
    const pos = {"Staff": Staff, "Manager": Manager};
    return new pos[position](name, ktp, joined_year, salary)
  }
}

module.exports = Factory;