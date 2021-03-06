class Classifier {
  constructor() {
    this._songList = {
      allChords: new Set(),
      difficulties: ['easy', 'medium', 'hard'],
      songs: [],
      addSong: function (name, chords, difficulty) {
        this.songs.push({ name, chords, difficulty: this.difficulties[difficulty] })
      },
    }
    this._labelCounts = new Map()
    this._labelProbabilities = new Map()
    this._smoothing = 1.01
  }

  addSong(...songParams) {
    this._songList.addSong(...songParams)
  }

  trainAll() {
    this._songList.songs.forEach(function (song) {
      this._train(song.chords, song.difficulty)
    }, this)

    this._setLabelProbabilities()
  }

  _train(chords, label) {
    chords.forEach(chord => this._songList.allChords.add(chord))

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
        this._labelCounts.get(label) / this._songList.songs.length,
      )
    }, this)
  }

  _chordCountForDifficulty(difficulty, testChord) {
    return this._songList.songs.reduce(function (counter, song) {
      if (song.difficulty === difficulty) {
        counter += song.chords.filter(chord => chord === testChord).length
      }
      return counter
    }, 0)
  }

  setProbabilityOfChordsInLabels() {
    this.chordCountsInLabels.forEach(function (_chords, difficulty) {
      Object.keys(this.chordCountsInLabels.get(difficulty)).forEach(function (chord) {
        this.chordCountsInLabels.get(difficulty)[chord] /= this._songList.songs.length
      }, this)
    }, this)
  }

  _likelihoodFromChord(difficulty, chord) {
    return this._chordCountForDifficulty(difficulty, chord) / this._songList.songs.length
  }

  _valueForChordDifficulty(difficulty, chord) {
    const value = this._likelihoodFromChord(difficulty, chord)
    return value ? value + this._smoothing : 1
  }

  classify(chords) {
    return new Map(
      Array.from(this._labelProbabilities.entries()).map(labelWithProbability => {
        const difficulty = labelWithProbability[0]

        return [
          difficulty,
          chords.reduce((total, chord) => {
            return total * this._valueForChordDifficulty(difficulty, chord)
          }, this._labelProbabilities.get(difficulty) + this._smoothing),
        ]
      }),
    )
  }
}

// Test Code //

const wish = require('wish')

describe('the file', function () {
  const classifier = new Classifier()

  classifier.addSong('imagine', ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'], 0)
  classifier.addSong('somewhereOverTheRainbow', ['c', 'em', 'f', 'g', 'am'], 0)
  classifier.addSong('tooManyCooks', ['c', 'g', 'f'], 0)
  classifier.addSong('iWillFollowYouIntoTheDark', ['f', 'dm', 'bb', 'c', 'a', 'bbm'], 1)
  classifier.addSong('babyOneMoreTime', ['cm', 'g', 'bb', 'eb', 'fm', 'ab'], 1)
  classifier.addSong('creep', ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'], 1)
  classifier.addSong(
    'paperBag',
    ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'],
    2,
  )
  classifier.addSong('toxic', ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'], 2)
  classifier.addSong('bulletproof', ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'], 2)

  classifier.trainAll()

  it('classifies', function () {
    const classified = classifier.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'])

    wish(classified.get('easy') === 1.3433333333333333)
    wish(classified.get('medium') === 1.5060259259259259)
    wish(classified.get('hard') === 1.6884223991769547)
  })

  it('label probabilities', function () {
    wish(classifier._labelProbabilities.get('easy') === 0.3333333333333333)
    wish(classifier._labelProbabilities.get('medium') === 0.3333333333333333)
    wish(classifier._labelProbabilities.get('hard') === 0.3333333333333333)
  })
})
