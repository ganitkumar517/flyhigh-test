import requests
from bs4 import BeautifulSoup
import json

def get_word_frequency(url):
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html.parser')
 
    text = soup.get_text()

    words = [word.lower().strip('.,!?"\'') for word in text.split()]
    word_frequency = {}
    for word in words:
        if word in word_frequency:
            word_frequency[word] += 1
        else:
            word_frequency[word] = 1

    return json.dumps(word_frequency)


url = 'https://en.wikipedia.org/wiki/Python_(programming_language)'
word_frequency = get_word_frequency(url)
print(word_frequency)
