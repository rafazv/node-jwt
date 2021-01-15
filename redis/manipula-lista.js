const { promisify } = require('util')

module.exports = lista => {
    const existsAsync = promisify(lista.exists).bind(lista)
    const setAsync = promisify(lista.set).bind(lista)
    const getAsync = promisify(lista.get).bind(lista)
    const delAsync = promisify(lista.del).bind(lista)

    return {
        async adiciona(chave, valor, dataExp) {
            await setAsync(chave, valor)
            lista.expireat(chave, dataExp)
        },

        async buscaValor(chave) {
            return await getAsync(chave)
        },

        async contemChave(chave) {
            const res = await existsAsync(chave)
            return res === 1
        },

        async deleta(chave) {
            await delAsync(chave)
        }
    }
}