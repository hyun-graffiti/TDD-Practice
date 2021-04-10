function coinToss() {
  return Math.random() > 0.5
}

class User {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  sayName() {
    return `my name is ${this.name}`
  }
}

class Project {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  sayTheName() {
    return `the project name is ${this.name}`
  }
}

// const agent = new Agent('name')
let agent

if (coinToss()) {
  agent = new User('name', 'user')
} else {
  agent = new Project('name', 'project')
}

//////////////////////////////////////////////////////////

const wish = require('wish')

wish(new User('name', 'user').sayName() === 'my name is name')
wish(new Project('name', 'user').sayTheName() === 'the project name is name')

if (agent instanceof User) {
  wish(agent.sayName() === 'my name is name')
} else {
  wish(agent.sayTheName() === 'the project name is name')
}
