import data from './badWords.json'

const filter = (str) => {
    if (!str) return;
    str = str.toLowerCase()
    data.array.forEach(e => {
        str = str.replace(e, '#'.repeat(e.length))
    })
    return str
}

export default filter