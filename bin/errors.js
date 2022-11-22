class InvalidCollectionError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class SpecParsingError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class UnexpectedStatusrror extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = { InvalidCollectionError, SpecParsingError, UnexpectedStatusrror }
