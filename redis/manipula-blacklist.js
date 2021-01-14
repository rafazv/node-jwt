const blacklist = require('./blacklist')

const { promisify } = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)

const jwt = require('jsonwebtoken')
const {createHash} = require('crypto')

function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    setToken: async token => {
        const dataExp = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await setAsync(tokenHash, '')
        blacklist.expireat(tokenHash, dataExp)
    },

    getToken: async token => {
        const tokenHash = geraTokenHash(token)
        const res = await existsAsync(tokenHash)
        return res === 1
    }
}