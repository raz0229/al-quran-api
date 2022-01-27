'''
@author: raz0229
[Writes individual Chapter/Surah in a JSON file in current directory]
Web scraped from https://al-quran.info

dependencies:
    ```pip install selenium```

NOTE: Astaghfirullah! Word of Allah cannot be subject to copyright.. still giving credits
'''

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium import webdriver


def init(chap_no):
    driver = webdriver.Firefox()
    driver.get(f'https://al-quran.info/#{chap_no}')

    elem = WebDriverWait(driver, 1990).until(EC.presence_of_element_located((By.XPATH, "//*[@class='basmalah']")))
    print(elem.text)
    qc = driver.find_elements_by_class_name("quran-content")
    divs = driver.find_elements_by_css_selector("div.trans-content-ltr")
    print("Total verses in Surah ", chap_no, ": ", len(divs)/2)

    i, n = 1, 1
    translation, transliteration, arabic = '', '', ''
    number = 0
    f = open(f"surah_{ chap_no }.json", "a")

    for i in range(len(divs)):
        if i % 2 == 0:
            translation = divs[i].text.replace("\n", "")
            arabic = qc[n - 1].text
            n += 1
            f.write('''
            "%s" : {
                "id" : %s,
                "content" : "%s",
                "translation_eng" : "%s",
                "transliteration" : "%s"
            },
            ''' %(number, f"{number}.{chap_no}", arabic, translation, transliteration))
        else:
            number = n - 1
            transliteration = divs[i].text
    f.close()
    driver.close()


for iterable in reversed(range(1, 115)):
    print("Fetching Surah ", iterable, "...\n")
    init(iterable)