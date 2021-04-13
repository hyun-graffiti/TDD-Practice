const http = require('http')

function setup() {
  return Object.create(getBody)
}

const getBody = {
  bodyArray: [],
  saveBody: function (chunk) {
    this.bodyArray.push(chunk)
  },
  printBody: function () {
    console.log(this.bodyArray.join(''))
    this.allDone()
  },
  getResult: function (result) {
    result.on('data', this.saveBody.bind(this))
    result.on('end', this.printBody.bind(this))
  },
  allDone: function () {},
}

const test = require('tape')
const testDouble = require('testdouble')

test('out async routine', function (assert) {
  const newBody = setup()
  newBody.allDone = testDouble.function()
  testDouble.when(newBody.allDone()).thenDo(function () {
    assert.notEqual(newBody.bodyArray.length, 0)
    assert.end()
  })
  http.get('http://refactoringjs.com', newBody.getResult.bind(newBody))
})
