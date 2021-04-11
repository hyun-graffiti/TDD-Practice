function log(func, number) {
  console.log(func(number))
}

function whatIsInBinary(number) {
  return Number('0b' + number)
}

function whatIs(number) {
  return number
}

;[whatIsInBinary, whatIs].forEach(func => {
  log(func, 10)
})
