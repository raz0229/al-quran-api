'''
@author: raz0229
[Writes essential information about Chapter/Surah in a JSON file in current directory]
Web scraped from https://al-quran.info

dependencies:
    ```pip install selenium```
'''

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium import webdriver


def init(chap_no):
    driver = webdriver.Firefox()
    driver.get(f'https://al-quran.info/#{chap_no}')

    elem = WebDriverWait(driver, 190).until(EC.presence_of_element_located((By.XPATH, "//*[@class='basmalah']")))
    desc = driver.find_element_by_class_name("lead")
    divs = driver.find_element_by_css_selector(".c-header-content p")
    names = driver.find_element_by_css_selector(".c-header-content h2 small")
    english = driver.find_element_by_css_selector(".c-header-content")

    id = chap_no
    surah_name = names.text.split('(')[0].strip()  # name in english
    surah_name_ar = names.text.split('(')[1].replace(' )', "").strip() # name in arabic
    translation_eng = english.text.split('\n')[1].strip() # translation of name
    type = divs.text.split(' ')[-1].lower() # type of surah
    total_verses = divs.text.split(' ')[0] # number of verses
    description = desc.text.replace('»', "").replace('ff', '').replace('\n', "").replace('«', "")  # description

    f = open("struct.json", "a")
    f.write('''
                "%s" : {
                    "id" : %s,
                    "surah_name": "%s",
                    "surah_name_ar" : "%s",
                    "translation_eng" : "%s",
                    "type": "%s",
                    "total_verses" : %s,
                    "description" : "%s",
                    "verses" : {

                    }
                },
                ''' % (id, id, surah_name, surah_name_ar, translation_eng, type, total_verses, description))

    f.close()
    driver.close()


for iterable in range(1, 115):
    print("Writing to 'struct.json' for Chapter: ", iterable, "...\n")
    init(iterable)