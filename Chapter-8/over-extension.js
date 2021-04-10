class GenericReport {
  constructor(params) {
    this.params = params
  }
  printReport(params) {
    return Object.assign(this.params, params)
  }
}

const report = new GenericReport({ whatever: 'we want', to: 'add' })
console.log(report.printReport({ extra: 'params' }))

//////////////////////////////////////////////

const wish = require('wish')
const deepEqual = require('deep-equal')

wish(
  deepEqual(report.printReport({ extra: 'params' }), {
    whatever: 'we want',
    to: 'add',
    extra: 'params',
  }),
)
