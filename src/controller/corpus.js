const initSearch = (searchTerm) => {
  const readline = require("linebyline");
  const path = require('path')
  const rl = readline(`${path.resolve()}/src/data/AL-QURAN_WITH_TRANSLATION_AND_TRANSLITERATION.json`);
  
  const arr = []; let temp = []

  return new Promise((resolve) => {
  
    rl.on('line', async (line) => {
      const id = line.trim().split(':')
      if (id[0] === '"id"') {
        temp = id
      }

      if (new RegExp(`\\b${searchTerm}\\b`).test(line.toLowerCase())) {

        if (line.trim().split(':')[0] === '"translation_eng"') {

          arr.push({
            "surah_no": temp[1].trim().replace(',', "").split('.')[1],
            "verse_no": temp[1].trim().replace(',', "").split('.')[0],
            "content": `${line.toLowerCase().trim().split(':')[1]}...`
          })


        }

      }
    }).on('end', () => {
      arr.unshift({ "total_matches ": arr.length })
      resolve(arr)

    });


  })
}

const getLine = (num) => {
  const nthline = require('nthline')
    ; const path = require('path')
    ; const filePath = `${path.resolve()}/src/data/AL-QURAN_WITH_TRANSLATION_AND_TRANSLITERATION.json`

  return new Promise((resolve) => {
    nthline(num - 1, filePath).then(line => {
      resolve(line)
    })
  })

}

module.exports = initSearch