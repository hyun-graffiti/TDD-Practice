function four() {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve(4), 500)
  })
}

function addOne(addend) {
  return Promise.resolve(addend + 1)
}

const test = require('tape')
const testDouble = require('testdouble')

test('our addOne function', assert => {
  addOne(3).then(result => {
    assert.equal(result, 4)
    assert.end()
  })
})

test('our four function', assert => {
  four().then(result => {
    assert.equal(result, 4)
    assert.end()
  })
})

test('our end-to-end test', assert => {
  testDouble.replace(console, 'log')
  four()
    .then(addOne)
    .then(console.log)
    .then(() => {
      testDouble.verify(console.log(5))
      assert.pass()
      testDouble.reset()
      assert.end()
    })
    .catch(e => {
      testDouble.reset()
      console.log(e)
    })
})
