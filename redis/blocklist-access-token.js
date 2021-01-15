const redis = require('redis')

const blocklist = redis.createClient({prefix: 'blocklist-access-token:'})
const manipulaLista = require('./manipula-lista')
const manipulaBlocklist = manipulaLista(blocklist)

const jwt = require('jsonwebtoken')
const {createHash} = require('crypto')

function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    setToken: async token => {
        const dataExp = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        await manipulaBlocklist.adiciona(tokenHash, '', dataExp)
    },

    getToken: async token => {
        const tokenHash = geraTokenHash(token)
        return await manipulaBlocklist.contemChave(tokenHash)
    }
}