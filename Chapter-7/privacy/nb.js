module.exports = class Classifier {
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
