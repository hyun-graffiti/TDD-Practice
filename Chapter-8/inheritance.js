const barky = {
  bark() {
    console.log('woof woof')
  },
}

const bitey = {
  bark() {
    console.log('grrr')
  },
  bite() {
    console.log('real bite')
  },
}

const animal = {
  beFluffy() {
    console.log('fluffy')
  },
  bite() {
    console.log('normal bite')
  },
}

const myPet = Object.assign({}, animal, barky, bitey)
myPet.beFluffy()
myPet.bark()
myPet.bite()

bitey.bite = function () {
  console.log("don't bite")
}
myPet.bite() // bitey와 myPet 사이의 연결고리는 없음

console.log(Object.getPrototypeOf(myPet)) // {}
