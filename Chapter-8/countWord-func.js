function Word(word, language, lookUpUrl) {
  this.word = word
  this.language = language
  this.lookUpUrl = lookUpUrl

  this.count = function () {
    return this.word.length
  }

  this.lookUp = function () {
    return this.lookUpUrl + this.word
  }
}

function EnglishWord(word) {
  Word.call(this, word, 'English', 'https://en.wiktionary.org/wiki/')
}

function JapaneseWord(word) {
  Word.call(this, word, 'Japanese', 'http://jisho.org/search/')
}

Word.prototype.reportLanguage = function () {
  return `The Language is: ${this.language}`
}

JapaneseWord.prototype = Object.create(Word.prototype)
JapaneseWord.prototype.constructor = JapaneseWord
EnglishWord.prototype = Object.create(Word.prototype)
EnglishWord.prototype.constructor = EnglishWord

const japaneseWord = new JapaneseWord('犬')
const englishWord = new EnglishWord('dog')

console.log(japaneseWord.count())
console.log(japaneseWord.word)
console.log(englishWord.count())
console.log(englishWord.word)
console.log(englishWord.lookUp())
console.log(japaneseWord.lookUp())

const wish = require('wish')
// const deepEqual = require('deep-equal')

// 인터페이스 테스트
wish(japaneseWord.word === '犬')
wish(japaneseWord.lookUp() === 'http://jisho.org/search/犬')
wish(japaneseWord.count() === 1)

wish(englishWord.word === 'dog')
wish(englishWord.lookUp() === 'https://en.wiktionary.org/wiki/dog')
wish(englishWord.count() === 3)

// 내부 테스트
wish(typeof japaneseWord === 'object')
wish(typeof JapaneseWord === 'function')
wish(japaneseWord instanceof JapaneseWord)
wish(japaneseWord instanceof Word)
wish(!(JapaneseWord instanceof Word))

wish(japaneseWord.constructor === JapaneseWord)
// wish(Object.getPrototypeOf(JapaneseWord) === Word) // 에러

// 약간 개략적인 테스트
console.log(Object.getPrototypeOf(japaneseWord))
// wish(deepEqual(Object.getPrototypeOf(japaneseWord), {})) // 에러
// JapaneseWord {}에 대한 확인
