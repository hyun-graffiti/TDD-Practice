const wordFactory = function () {
  return {
    count() {
      return this.word.length
    },
    lookUp() {
      return this.lookUpUrl + this.word
    },
  }
}

const englishWordFactory = theWord => {
  let copy = Object.assign(wordFactory(), {
    word: theWord,
    language: 'English',
    lookUpUrl: 'https://en.wiktionary.org/wiki/',
  })

  return Object.setPrototypeOf(copy, wordFactory)
}

const japaneseWordFactory = theWord => {
  let copy = Object.assign(wordFactory(), {
    word: theWord,
    language: 'Japanese',
    lookUpUrl: 'http://jisho.org/search/',
  })

  return Object.setPrototypeOf(copy, wordFactory)
}

const englishWord = englishWordFactory('dog')
const japaneseWord = japaneseWordFactory('犬')

wordFactory.reportLanguage = function () {
  return `The Language is: ${this.language}`
}

console.log(englishWord.reportLanguage())
console.log(japaneseWord.reportLanguage())

const wish = require('wish')

// 인터페이스 테스트
wish(japaneseWord.word === '犬')
wish(japaneseWord.lookUp() === 'http://jisho.org/search/犬')
wish(japaneseWord.count() === 1)

wish(englishWord.word === 'dog')
wish(englishWord.lookUp() === 'https://en.wiktionary.org/wiki/dog')
wish(englishWord.count() === 3)
