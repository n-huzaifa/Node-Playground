const { readFile, writeFile } = require('fs').promises;

const start = async () => {
    try {
        const first = await readFile('./data.txt', 'utf8');
        const second = await readFile('./data2.txt', 'utf8');
        await writeFile('./data3.txt', 'data is cool and pretty good to know about')
        console.log(first)
        console.log(second)
    }
    catch (error) { console.log(error) }
}

start()