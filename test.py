from collections import Counter
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def analyze_url():
    url = request.json.get('url')
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    words = soup.get_text().split()
    word_counts = Counter(words)
    unique_words = list(word_counts.keys())
    word_frequency = list(word_counts.values())
    response_data = {'words': unique_words, 'frequency': word_frequency}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
