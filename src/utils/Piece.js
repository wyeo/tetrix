class Piece {
  constructor(type, values) {
    this.type = type
    this.value = Array(values)
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
