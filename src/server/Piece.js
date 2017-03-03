class Piece {
  constructor(type) {
    this.type = type
    this.value = Array(4)
  }

  getType() {
    return this.type
  }

  getValue(index = 0) {
    return this.value[index]
  }
}

module.exports = {
  Piece,
}
