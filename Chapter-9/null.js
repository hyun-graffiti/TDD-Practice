class NullString {
  capitalize() {
    return this
  }

  tigerify() {
    return this
  }

  display() {
    return ''
  }
}

class NameString extends String {
  capitalize() {
    return new NameString(this[0].toUpperCase() + this.substring(1))
  }

  tigerify() {
    return new NameString(`${this}, the tiger`)
  }

  display() {
    return this.toString()
  }
}

class Person {
  constructor(name) {
    this.name = new NameString(name)
  }
}

class AnonymousPerson extends Person {
  constructor() {
    super()
    this.name = new NullString()
  }
}

const personOne = new Person('tony')
const personTwo = new AnonymousPerson('tony')

console.log(personOne.name.capitalize().tigerify().display())
console.log(personTwo.name.capitalize().tigerify().display())
