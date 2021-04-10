const word = {
  count() {
    return this.word.length
  },
  lookUp() {
    return this.lookUpUrl + this.word
  },
}

const englishWord = Object.assign(Object.create(word), {
  word: 'dog',
  language: 'English',
  lookUpUrl: 'https://en.wiktionary.org/wiki/',
})
const japaneseWord = Object.assign(Object.create(word), {
  word: '犬',
  language: 'Japanese',
  lookUpUrl: 'http://jisho.org/search/',
})

const wish = require('wish')

// 인터페이스 테스트
wish(japaneseWord.word === '犬')
wish(japaneseWord.lookUp() === 'http://jisho.org/search/犬')
wish(japaneseWord.count() === 1)

wish(englishWord.word === 'dog')
wish(englishWord.lookUp() === 'https://en.wiktionary.org/wiki/dog')
wish(englishWord.count() === 3)

// 내부 테스트
wish(typeof japaneseWord === 'object')
console.log(Object.getPrototypeOf(japaneseWord))
