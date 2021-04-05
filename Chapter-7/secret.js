// 생성자 함수
const Secret = function () {
  this.normalInfo = 'this is normal'
  const secret = 'sekrit'
  const secretFunction = function () {
    return secret
  }
  this.notSecret = function () {
    return secret
  }
  totallyNotSecret = "I'm defined in the global scope"
}

const s = new Secret()
console.log(s.normalInfo) // 'this is normal'
console.log(s.secret) // undefined
console.log(s.secretFunction()) // error
console.log(s.notSecret()) // 'sekrit'
console.log(s.totallyNotSecret) // undefined
console.log(totallyNotSecret) // I'm defined in the global scope

////////////////////////////////////////////////////////////////////////////

// 팩토리 함수
const SecretTemplate = (function () {
  var obj = {}
  obj.normalInfo = 'this is normal'
  const secret = 'sekrit'
  const secretFunction = function () {
    return secret
  }
  obj.notSecret = function () {
    return secret
  }
  totallyNotSecret = "I'm defined in the global scope"
  return obj
})()

const s1 = Object.create(SecretTemplate)
console.log(s1.normalInfo) // 'this is normal'
console.log(s1.secret) // undefined
console.log(s1.secretFunction()) // error
console.log(s1.notSecret()) // 'sekrit'
console.log(s1.totallyNotSecret) // undefined
console.log(totallyNotSecret) // I'm defined in the global scope
