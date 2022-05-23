# Al-Quran API
RESTful Quran API with original Arabic text, English Translation, transliteration, Verse Search, Surah Search and Word Search in corpus in plain JSON.
 
## Web Data Extraction
*Web-Scraped from [al-quran.info](https://al-quran.info) [Python Script used Included in ./quran-scraping]*
Entire Quran in JSON in ***./quran-scraping/AL-QURAN_WITH_TRANSLATION_AND_TRANSLITERATION.json***

### Install dependencies

  

```
npm install
```

  

### Running in development

  

```
npm run dev
```

  

### Running in production

  

```
npm start
```

  

Runs on localhost:3000 by default but can be configured using the `PORT` environment variable.

  

### Running tests

 

```
npm test

# Watch repo
npm run test:watch
```
# API Endpoints

 - */*
 Responds with JSON including some properties of the Quran. *(deprecated)*
 
 - */:surah*
 Possible values: *1-114*
 Responds with entire Surah/Chapter of the Quran including all verses in the Surah and some additional information.
 
 - */:surah/:verse*
For a specific Ayah/Verse in a specific Surah along with original Arabic text, translation, transliteration and verse ID

 - */:surah/:range*
 Get a range (collection) of verses within valid limits of chapters and verse numbers. e.g: /1/1-5

 - */:surah/:keyword*
 Looks for a given keyword (English) in *translation_eng* key in the entire Quran and responds with all the verses containing the given keyword in JSON

 - */corpus/:keyword*
 Looks for a given keyword (English) in *translation_eng* key in the entire Quran and responds with all the verses containing the given keyword in JSON

### Contribute
Due to the nature of scraping from web, the JSON Quran contains unnecessary information and references which are of no use to me. Feel free to edit and remove those :)