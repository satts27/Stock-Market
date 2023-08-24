from flask import Flask, request, jsonify, render_template, Markup
from flask_cors import CORS
# import statistics
# import pickle 
import yfinance as yf
# import numpy as np
import pandas as pd
# import tensorflow as tf
import pandas as pd
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from urllib.request import urlopen
from urllib.request import Request
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# import statistics

# loaded_model = tf.keras.models.load_model("Model.h5")

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "server started..."


@app.route("/AMZNlinechart", methods=["GET"])
def AMZNlinechart():
    ans = {}
    stock = yf.Ticker("AMZN")
    ans["STOCK"] = stock.history(period="310d")["Close"].values.tolist()[-50:]
    index = yf.Ticker('^IXIC')
    ans["NASDAQ"] = index.history(period="310d")["Close"].values.tolist()
    ans["DATES"] = stock.history(period="310d").index.strftime("%Y-%m-%d").tolist()[-50:]
    ans["SMA50"] = stock.history(period="365d")["Close"].rolling(window=50).mean().tail(50).tolist()
    ans["SMA200"] = stock.history(period="365d")["Close"].rolling(window=200).mean().tail(50).tolist()
    ans["SMA20"] = stock.history(period="365d")["Close"].rolling(window=20).mean().tail(50).tolist()
    # print(ans)
    return ans

@app.route("/AMZNbarchart", methods=["GET"])
def AMZNbarchart():
    ans = {}
    stock = yf.Ticker("AMZN")
    ans["data"] = stock.history(interval='1m', period='1d')["Close"].values.tolist()
    ans["time"] = stock.history(interval='1m', period='1d').index.strftime("%H:%M:%S").values.tolist()
    # print(ans)
    return ans

@app.route("/AMZNpiechart", methods=["GET"])
def AMZNpiechart():
    major_holders = yf.Ticker('AMZN').get_major_holders()
    shares = major_holders[1].values
    vals = major_holders[0].values
    share = shares.tolist()
    share = share[:2]
    val = vals.tolist()
    val = val[:2]
    share += ["% of Shares in Stock Market"]
    percentages_float = [float(p.strip('%')) for p in val]
    total_percent = sum(percentages_float)
    percentages_float += [100-total_percent]
    ans = {k: v for k, v in zip(share, percentages_float)}
    # print(ans)
    return ans

@app.route("/AMZNnews", methods=["GET"])
def AMZNnews():
    n = 3
    tickers = ['AMZN']
    finviz_url = 'https://finviz.com/quote.ashx?t='
    news_tables = {}
    for ticker in tickers:
        url = finviz_url + ticker
        req = Request(url=url,headers={'user-agent': 'my-app'}) 
        # print(req)
        resp = urlopen(req)    
        html = BeautifulSoup(resp, features="lxml")
        news_table = html.find(id='news-table')
        # print(news_table)
        news_tables[ticker] = news_table
    try:
        for ticker in tickers:
            df = news_tables[ticker]
            df_tr = df.findAll('tr')
        
            # print ('\n')
            # print ('Recent News Headlines for {}: '.format(ticker))
            
            for i, table_row in enumerate(df_tr):
                a_text = table_row.a.text
                td_text = table_row.td.text
                td_text = td_text.strip()
                # print(a_text)
                # print(a_text,'(',td_text,')')
                if i == n-1:
                    break
    except KeyError:
        pass
    parsed_news = []
    for file_name, news_table in news_tables.items():
        for x in news_table.findAll('tr'):
            text = x.a.get_text() 
            date_scrape = x.td.text.split()

            if len(date_scrape) == 1:
                time = date_scrape[0]
                
            else:
                date = date_scrape[0]
                time = date_scrape[1]

            ticker = file_name.split('_')[0]
    #         print(ticker)
            
            parsed_news.append([ticker, date, time, text])    
    analyzer = SentimentIntensityAnalyzer()

    columns = ['Ticker', 'Date', 'Time', 'Headline']
    news = pd.DataFrame(parsed_news, columns=columns)
    # print(type(news['Headline']))
    scores = news['Headline'].apply(analyzer.polarity_scores).tolist()
    # print(scores)
    # print(type(news['Headline']))
    # print(news['Headline'])
    # print(scores)

    df_scores = pd.DataFrame(scores)
    # print(df_scores)
    news = news.join(df_scores, rsuffix='_right')
    news['Date'] = pd.to_datetime(news.Date, format='%b-%d-%y').dt.date

    unique_ticker = news['Ticker'].unique().tolist()
    news_dict = {name: news.loc[news['Ticker'] == name] for name in unique_ticker}

    values = []
    for ticker in tickers: 
        dataframe = news_dict[ticker]
        dataframe = dataframe.set_index('Ticker')
        dataframe = dataframe.drop(columns = ['Headline'])
        # print ('\n')
        # print (dataframe.head())
        
        mean = round(dataframe['compound'].mean(), 2)
        values.append(mean)
        
    df = pd.DataFrame(list(zip(tickers, values)), columns =['Ticker', 'Mean Sentiment']) 
    df = df.set_index('Ticker')
    df = df.sort_values('Mean Sentiment', ascending=False)

    a = dataframe['compound'].head().tolist()
    ans = []
    for num in a:
        num = ((num+1)/2)*100
        ans.append(num)
    ans1 = []
    links = news_table.find_all('a')
    hrefs = []
    for link in links:
        href = link.get('href')
        hrefs.append(href)
    for i in range(5):
        current = {}
        current["news"] = news["Headline"][i]
        current["val"] = ans[i]
        current["link"] = hrefs[i]
        ans1.append(current)

    # ans1 = {k: v for k, v in zip(news['Headline'][:5], ans)}
    # print(ans1)
    return jsonify(ans1)

if __name__ == "__main__":
    app.run(debug=True)