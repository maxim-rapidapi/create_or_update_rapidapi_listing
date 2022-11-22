class InvalidCollectionError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

class NoCurrentVersionError extends Error {
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

class UnexpectedStatusError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = { InvalidCollectionError, NoCurrentVersionError, SpecParsingError, UnexpectedStatusrror }
