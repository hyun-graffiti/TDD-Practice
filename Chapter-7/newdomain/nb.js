module.exports = class Classifier {
  constructor() {
    this._textList = {
      allWords: new Set(),
      understood: ['yes', 'no'],
      texts: [],
      addText: function (name, words, comprehension) {
        this.texts.push({ name, words, comprehension: this.understood[comprehension] })
      },
    }
    this._labelCounts = new Map()
    this._labelProbabilities = new Map()
    this._smoothing = 1.01
  }

  addText(...textParams) {
    this._textList.addText(...textParams)
  }

  _wordCountForComprehension(comprehension, textWord) {
    return this._textList.texts.reduce(function (counter, text) {
      if (text.comprehension === comprehension) {
        counter += text.words.filter(word => word === textWord).length
      }
      return counter
    }, 0)
  }

  _likelihoodFromWord(comprehension, word) {
    return this._wordCountForComprehension(comprehension, word) / this._textList.texts.length
  }

  _valueForWordComprehension(comprehension, word) {
    const value = this._likelihoodFromWord(comprehension, word)
    return value ? value + this._smoothing : 1
  }

  trainAll() {
    this._textList.texts.forEach(function (text) {
      this._train(text.words, text.comprehension)
    }, this)

    this._setLabelProbabilities()
  }

  _train(words, label) {
    words.forEach(word => this._textList.allWords.add(word))

    if (Array.from(this._labelCounts.keys()).includes(label)) {
      this._labelCounts.set(label, this._labelCounts.get(label) + 1)
    } else {
      this._labelCounts.set(label, 1)
    }
  }

  _setLabelProbabilities() {
    this._labelCounts.forEach(function (_count, label) {
      this._labelProbabilities.set(
        label,
        this._labelCounts.get(label) / this._textList.texts.length,
      )
    }, this)
  }

  classify(words) {
    return new Map(
      Array.from(this._labelProbabilities.entries()).map(labelWithProbability => {
        const comprehension = labelWithProbability[0]

        return [
          comprehension,
          words.reduce((total, word) => {
            return total * this._valueForWordComprehension(comprehension, word)
          }, this._labelProbabilities.get(comprehension) + this._smoothing),
        ]
      }),
    )
  }
}
