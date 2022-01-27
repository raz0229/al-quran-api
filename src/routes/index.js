const express = require('express');
const initSearch = require('../controller/corpus')
const quran = require('../data/AL-QURAN_WITH_TRANSLATION_AND_TRANSLITERATION.json')

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    "total_surahs": 14,
    "total_meccan_surahs": 89,
    "total_medinan_surahs": 25,
    "total_verses": 6236,
    "number_of_words": 77430,
    "number_of_unique_words": 18994,
    "number_of_stems": 12183,
    "number_of_lemmas": 3382,
    "number_of_roots": 1685
  });
});

router.get('/corpus/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm.toLowerCase()
  const resolve = initSearch(searchTerm)
  resolve.then(r => {
    if (r.length === 0) {
      res.status(400).json({
        "error": `no matching keyword(s) for : '${searchTerm}'`
      })
      return;
    }

    res.status(200).json(Object.assign(r))
  })

})

router.get('/:chapterId', (req, res) => {

  const response = quran.chapters[req.params.chapterId]
  if (!response) {
    res.status(404).json({
      "error": `resource not found`
    })
    return;
  }
  res.status(200)
    .json(response);
});

router.get('/:chapterId/:verseId', (req, res) => {

  const response = quran.chapters[req.params.chapterId].verses[req.params.verseId]
  if (!response) {
    res.status(404).json({
      "error": `resource not found`
    })
    return;
  }

  res.status(200)
    .json(response);
});

router.get('*', (req, res) => {
  res.status(404).json({
    "error": `resource not found`
  })

})

module.exports = router;
