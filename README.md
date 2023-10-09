# scrapio
A Python library that is helpful in scrapping complete webpages including HTML, JavaScript, CSS, and Favicons. Just plug and play.

# Webpage Content Downloader Python Library

![GitHub](https://img.shields.io/github/license/your-username/webpage-content-downloader)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/your-username/webpage-content-downloader)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/webpage-content-downloader)
![Python version](https://img.shields.io/badge/python-3.7%20%7C%203.8%20%7C%203.9-blue)

A Python library that allows you to download the HTML, JavaScript, CSS, and favicons of a webpage. This library is useful for web scraping, archiving web pages, or analyzing web content locally.

## Table of Contents

- [scrapio](#scrapio)
- [Webpage Content Downloader Python Library](#webpage-content-downloader-python-library)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Documentation](#documentation)
  - [Contribution](#contribution)
  - [License](#license)


## Usage
To use this code you need to install the following libraries on your system.
- pandas
- BeautifulSoup 
- Selenium
- webdriver-manager
- requests
- pillow

```bash
pip install pandas
```

```bash
pip install beautifulsoup4
```

```bash
pip install selenium
```

```bash
pip install webdriver-manager
```

```bash
pip install requests
```

```bash
pip install pillow
```


Change the name of the LogFile to whatever name you require (make sure the extension is .xlsx).
Change the *mainPage_URL* to the URL of the PhishTank page containing legitimate URLs if you want to scrape the data for legitimate or to the page containing Phishy URLs if you want to scrape the data for phishy.

```python
# mainPage_URL for the webpage containing list of legitimate URLs
mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&valid=n&Search=Search"


# mainPage_URL for the webpage containing list of Phishy URLs
mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"

```

## Documentation
The code is designed to perform web scraping on a list of URLs retrieved from the Phishtank database. For each URL in the list, the code conducts comprehensive web scraping, capturing various resources, including:
- The HTML code of the landing page.
- Javascript content (both inline and external).
- CSS content (both inline and external).
- Images found on the landing page.
- The website's favicon.
- A screenshot of the landing page.

This process allows for the extraction and analysis of multiple types of data from each URL, which can be useful for various purposes such as security analysis, content archiving, and data extraction.

## Contribution
Contributers: 
- Patel Shahil Manishbhai (Indian Institute of Technology, Dharwad, India)
- Shivam Pradip Tirmare (Indian Institute of Technology, Dharwad, India)
- Aditya Kulkarni (Indian Institute of Technology, Dharwad, India)
- Vivek Balachandran (Singapore Institute of Technology, Singapore)
- Tamal Das (Indian Institute of Technology, Dharwad, India)

## License
