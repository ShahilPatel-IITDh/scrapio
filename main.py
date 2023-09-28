import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from urllib.parse import urljoin
import pandas as pd

# driver path (chrome driver), in ubuntu
driverPath = "/home/administrator/Downloads/chromedriver_linux64/chromedriver"

# create a new Chrome browser instance
options = webdriver.ChromeOptions()
# headless mode: run Chrome in the background
options.add_argument("--headless")
# disable-gpu: disable the GPU hardware acceleration
options.add_argument("--disable-gpu")
# no-sandbox: disable the Chrome sandbox
options.add_argument("--no-sandbox")
# disable-dev-shm-usage: disable the /dev/shm usage
options.add_argument("--disable-dev-shm-usage")

# Set up new Chrome browser instance
browser = webdriver.Chrome(service=Service(executable_path=driverPath), options=options)
browser.maximize_window() 

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
}

# File path for storing the Legitimate entries
LogFile = "Legitimate-Data.xlsx"


# File path for storing the Phishy entries
# LogFile = "Phishy-Data.xlsx"


# Create the directory which will have all the web resources for a URL, name the directory as the PhishID
def generateDirectory(webResource_folder, phishID):

    # Create the directory named after the PhishID
    directory = os.path.join(webResource_folder, phishID)

    # Create the directory if it does not exist at the webResource_folder create it
    if not os.path.exists(directory):
        os.makedirs(directory)

    # return the directory
    return directory


# This function will extract the JavaScript code of the landing page
def scrape_JavaScript(URL, JavaScript_Directory): 
    
    # Fetch the web page content 
    response = requests.get(URL)
    if response.status_code != 200:
        return False

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract all script tags
    scriptTags = soup.find_all('script')

    # Variable to check if the JavaScript is found or not
    JavaScript_Found = False

    # Extract and save the JavaScript code
    for tag in scriptTags:
        # If the script tag has a 'src' attribute, it's an external JavaScript file
        if 'src' in tag.attrs:
            js_URL = urljoin(URL, tag['src'])
            js_response = requests.get(js_URL)
            if js_response.status_code == 200:
                js_content = js_response.text
                
                # Check if the file already has the .js extension
                JS_filename = os.path.basename(urlparse(js_URL).path)
                if not JS_filename.endswith('.js'):
                    JS_filename += '.js'

                with open(os.path.join(JavaScript_Directory, JS_filename), 'w') as JSFile:
                    JSFile.write(js_content)

                    with open('terminalOutputs.txt', 'a') as textLog:
                        textLog.write(f'JavaScript found for {URL}' + '\n')

                    JavaScript_Found = True

        else:
            # If the script tag doesn't have a 'src' attribute, it contains inline JavaScript code
            js_content = tag.string
            if js_content:
                # Check if the file already has the .js extension
                JS_filename = 'inline.js' if not tag.has_attr('id') else f"{tag['id']}.js"
                if not JS_filename.endswith('.js'):
                    JS_filename += '.js'

                with open(os.path.join(JavaScript_Directory, JS_filename), 'w') as JSFile:
                    JSFile.write(js_content)

                    with open('terminalOutputs.txt', 'a') as textLog:
                        textLog.write(f'JavaScript found for {URL}' + '\n')

                    JavaScript_Found = True


    return JavaScript_Found


# This function will extract the CSS code of the landing page
def scrape_CSS(URL, CSS_Directory):
    
    # Fetch the web page content
    response = requests.get(URL)
    if response.status_code != 200:
        return False

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract all link tags with rel='stylesheet'
    CSS_Tags = soup.find_all('link', rel='stylesheet')

    # Variable to check if the CSS is found or not
    CSS_found = False

    for tag in CSS_Tags:
        # If href is there in tag, it means it has external link
        if 'href' in tag.attrs:
            css_URL = urljoin(URL, tag['href'])
            css_response = requests.get(css_URL)

            if css_response.status_code == 200:
                css_content = css_response.text

                # Check if the file already has the .css extension
                CSS_filename = os.path.basename(urlparse(css_URL).path)

                if not CSS_filename.endswith('.css'):
                    CSS_filename += '.css'
                
                with open(os.path.join(CSS_Directory, CSS_filename), 'w') as cssFile:
                    cssFile.write(css_content)

                    with open('terminalOutputs.txt', 'a') as textLog:
                        textLog.write(f'External CSS found for {URL}' + '\n')

                    CSS_found = True

    # Extract and save the inline CSS
    styleTags = soup.find_all('style')

    for tag in styleTags:
        css_content = tag.string
        if css_content:
            CSS_filename = 'inline.css'
            
            with open(os.path.join(CSS_Directory, CSS_filename), 'w') as f:
                f.write(css_content)

                with open('terminalOutputs.txt', 'a') as textLog:
                    textLog.write(f'Inline CSS found for {URL}' + '\n')
                CSS_found = True
    
    return CSS_found


# This function will extract the images of the landing page
def scrape_Images(URL, Images_Directory):
   
    # Send a GET request to the URL
    response = requests.get(URL)
    
    # check for the response code
    if response.status_code != 200:
        with open('terminalOutputs.txt', 'a') as logText:
            logText.write(f'failed to retrieve page: {response.status_code}')
        
        with open('terminalOutputs.txt', 'a') as textLog:
            textLog.write(f'Images NOT found for {URL}' + '\n')

        return False

    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all the <img> tags in the HTML
    imgTags = soup.find_all('img')

    # variable to track if we are able to download atleast one Image file
    downloaded = False

    for tag in imgTags:
        # Get the image source URL
        imgSource = tag.get('src')

        # Handle relative URLs
        if not imgSource.startswith('http'):
            imgSource = urljoin(URL, imgSource)

        
        # Extract the image filename
        imageFilename = os.path.basename(urlparse(imgSource).path)

        try:
            # Send a GET request to download the image
            imageResponse = requests.get(imgSource)
            if imageResponse.status_code == 200:
                # Save the image to the specified directory
                with open(os.path.join(Images_Directory, imageFilename), 'wb') as ImageFile:
                    ImageFile.write(imageResponse.content)
                
                with open('terminalOutputs.txt', 'a') as textLog:
                    textLog.write(f"Image Downloaded: {imageFilename}")

                with open('terminalOutputs.txt', 'a') as textLog:
                    textLog.write(f' Images found for {URL}' + '\n')

                downloaded = True

            else:
                with open('terminalOutputs.txt', 'a') as textLog:
                    textLog.write(f"Failed to download image: {imgSource} (Status code: {imageResponse.status_code})")
        
        except requests.exceptions.RequestException as error:

            with open('terminalOutputs.txt', 'a') as textLog:
                textLog.write(f"Failed to download image: {imgSource} ({str(error)})")
        
    return downloaded


def scrape_Favicon(URL, Favicons_Directory):

    # Fetch the web page content
    response = requests.get(URL)
    if response.status_code != 200:
        return False
    
     # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

     # List of favicon link types to check
    favicon_link_types = ['icon', 'apple-touch-icon', 'shortcut icon', 'mask-icon', 'fluid-icon', 'manifest', 'yandex-tableau-widget']

    # Find the favicon URL
    favicon_URL = None

    for link_type in favicon_link_types:
        link_tags = soup.find_all('link', rel=link_type)
        for link_tag in link_tags:
            if 'href' in link_tag.attrs:
                favicon_URL = urljoin(URL, link_tag['href'])
                break
        if favicon_URL:
            break

    # If a favicon URL is found, download the favicon
    if favicon_URL:
        favicon_response = requests.get(favicon_URL)

        if favicon_response.status_code == 200:
            favicon_content = favicon_response.content
            filename = os.path.basename(urlparse(favicon_URL).path)

            if not filename.endswith('.ico'):
                filename += '.ico'

            with open(os.path.join(Favicons_Directory, filename), 'wb') as f:
                f.write(favicon_content)

                with open('terminalOutputs.txt', 'a') as textLog:
                    textLog.write(f'Favicon found for {URL}' + '\n')

                return True
    with open('terminalOutputs.txt', 'a') as textLog:
        textLog.write(f'Favicon NOT found for {URL}' + '\n')

    return False


def scrape_Screenshot(screenshotURL, ScreenShot_Directory, phishID):

    screenshot_found = False

    try:
        response = requests.get(screenshotURL)

        # Set the filename
        screenshotFile = f"{phishID}_screenshot.jpg"

        # Check if the request for the image was successful

        if response.status_code == 200:
            #  Save the image to a file
            filePath = os.path.join(ScreenShot_Directory, screenshotFile)

            with open(filePath, "wb") as file:
                file.write(response.content)

            with open('terminalOutputs.txt', 'a') as textLog:
                textLog.write(f"Image downloaded and saved as {screenshotFile}"+'\n')

            screenshot_found = True
            
        else:
            with open('terminalOutputs.txt', 'a') as textLog:
                textLog.write(f"Not able to download screenshot for {screenshotURL}"+'\n')
            
            screenshot_found = False

    except requests.exceptions.RequestException as e:
        with open('terminalOutputs.txt', 'a') as textLog:
                textLog.write(f"Not able to download screenshot for {screenshotURL}"+'\n')
            
        screenshot_found = False

    return screenshot_found

# This function will extract the HTML code of the landing page, and also call the other functions to extract the JavaScript, CSS and images. This function will also create the directory structure for the web resources
def URL_Processing(landingPage_URL, phishID):

    # Variables for html, js, css, images, not_found, and forbidden columns in xlsx file
    html, js, css, images, not_found, forbidden, favicon, screenshot, statusCode = 0, 0, 0, 0, 0, 0, 0, 0, 0

    # for landingPage_URL in urls:
    try:
        response = requests.get(landingPage_URL, headers=headers, verify=False)
        response.raise_for_status()

        # Save the status code in the variable
        statusCode = response.status_code

        html_content = response.content

        soup = BeautifulSoup(html_content, 'html.parser')

        ParentDirectory = generateDirectory(webResource_folder, phishID)

        HTML_Directory = os.path.join(ParentDirectory, 'HTML')
        JavaScript_Directory = os.path.join(ParentDirectory, 'JavaScript')
        CSS_Directory = os.path.join(ParentDirectory, 'CSS')
        Images_Directory = os.path.join(ParentDirectory, 'Images')
        Favicons_Directory = os.path.join(ParentDirectory, 'Favicon')
        ScreenShot_Directory = os.path.join(ParentDirectory, 'ScreenShots')

        if not os.path.exists(HTML_Directory):
            os.makedirs(HTML_Directory)

        if not os.path.exists(JavaScript_Directory):
            os.makedirs(JavaScript_Directory)

        if not os.path.exists(CSS_Directory):
            os.makedirs(CSS_Directory)

        if not os.path.exists(Images_Directory):
            os.makedirs(Images_Directory)

        if not os.path.exists(Favicons_Directory):
            os.makedirs(Favicons_Directory)
        
        if not os.path.exists(ScreenShot_Directory):
            os.makedirs(ScreenShot_Directory)

        with open(os.path.join(HTML_Directory, 'landingPage.html'), 'w', encoding='utf-8') as landingPage:
            
            if soup.prettify() is not None:
                html = 1
            else:
                html = 0

            landingPage.write(soup.prettify())


        # Extract the Javascript
        js = int(scrape_JavaScript(landingPage_URL, JavaScript_Directory))
        
        # Extract the CSS
        css = int(scrape_CSS(landingPage_URL, CSS_Directory))

        # Call the scrape_Images function to download and save the image
        images = int(scrape_Images(landingPage_URL, Images_Directory))

        # Extract the Favicons
        favicon = int(scrape_Favicon(landingPage_URL, Favicons_Directory))

        # Also extract the Screenshots
        screenshotURL = f"https://cdn.phishtank.com/{phishID}.jpg"

        # Get Screenshot
        screenshot = int(scrape_Screenshot(screenshotURL, ScreenShot_Directory, phishID))

        # Append the entry to the DataFrame
        df.loc[len(df)] = [phishID, landingPage_URL, html or 0, js or 0, css or 0, images or 0, not_found or 0, forbidden or 0, favicon or 0, screenshot or 0, statusCode]

    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            not_found = 1
        elif e.response.status_code == 403:
            forbidden = 1
        else:
            # Handle other HTTP errors if needed
            pass

        # Append the entry to the DataFrame
        df.loc[len(df)] = [phishID, landingPage_URL, html, js, css, images, not_found, forbidden, favicon, screenshot, statusCode]

    except (requests.RequestException, requests.ConnectionError) as e:
        with open("logs1.txt",'a') as errors1:
            errors1.write(f"Failed to fetch content for {landingPage_URL}: {e}\n")
            
    except Exception as e:
        with open("logs2.txt",'a') as errors2:
            errors2.write(f"An error occurred while processing {landingPage_URL}: {e}\n")
            

if __name__ == "__main__":

    # Create a folder to store all the sub-folders containing the web-resources of legitmate URLs
    webResource_folder = "Legitimate-Resources"

    # Create a folder to store all the sub-folders containing the web-resources of phishy URLs
    # webResource_folder = "Phishy-Resources"

    current_Working_Directory = os.getcwd()

    resourcePath = os.path.join(current_Working_Directory, webResource_folder)

    if not os.path.isdir(resourcePath):
        os.makedirs(resourcePath)
        print(f"Folder created with name: {webResource_folder}")
    
    else:
        print(f"Folder already exists with name: {webResource_folder}")
    
    # Excel file for maintaining the metrics

    # Check if the LogFile already exists
    if os.path.exists(LogFile):
        df = pd.read_excel(LogFile)
    else:
        df = pd.DataFrame(columns=["PhishID", "URL", "HTML", "JS", "CSS", "Images", "Not Found", "Forbidden", "Favicon", "ScreenShot", "Status Code"])

    count = 1
    processedCount = 1

    for pageNo in range(0, 10):
        # Send a GET request to the webpage and get the HTML content to page containg confirmed Legitimate URLs
        mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&valid=n&Search=Search"

        # URL of the mainpage containing confirmed Phishy URLs
        # mainPage_URL = f"https://phishtank.org/phish_search.php?page={pageNo}&active=y&valid=y&Search=Search"

        browser.get(mainPage_URL)

        # Wait for the table to be present on the page
        table_present = EC.presence_of_element_located((By.CLASS_NAME, "data"))
        WebDriverWait(browser, 10).until(table_present)

        # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
        soup = BeautifulSoup(browser.page_source, "html.parser")

        # Find the table that contains the data
        table = soup.find("table", {"class": "data"})

        # Get the rows in the table
        rows = table.find_all("tr")

        # Loop row each row in the table
        for row in rows[1:]:
            cells = row.find_all("td")

            # Extract the Phish_ID
            phish_id = cells[0].text.strip()

            # Send a GET request to the webpage and get the HTML content
            phishID_URL = f"https://phishtank.org/phish_detail.php?phish_id={phish_id}"
            browser.get(phishID_URL)

            # Parse the HTML content using BeautifulSoup, driver.page_source is the HTML content of the page
            newSoup = BeautifulSoup(browser.page_source, "html.parser")

            # The required URL of the phishy page is enclosed in a span element with style attribute as 'word-wrap:break-word;'
            spanElement = newSoup.find('span', style='word-wrap:break-word;')
            
            if spanElement is not None:
                requiredElement = spanElement.find('b')

                if requiredElement is not None:
                    phishyURL = requiredElement.text.strip()

                    # Write the Phishy URL and the counter to a terminal Output file
                    with open('terminalOutputs.txt', 'a') as textLog:
                        textLog.write(f"Phishy URL: {phishyURL}"+'\n')
                        textLog.write(f"{count}"+"\n")
                    
                    # Read the URL column of the Excel file and only call the processing funtion if the URL isn't present in the Excel file

                    # Read only the 'URL' column from the LogFile Excel sheet
                    URL_Column = pd.read_excel(LogFile, usecols=['URL'])['URL']

                    # If PhishyURL not in the URL column, process it.
                    if phishyURL not in URL_Column.values:
                        URL_Processing(phishyURL, phish_id)
                        
                        print(f"Processed URL: {phishyURL}")
                        print(f"Processed count: {processedCount}")
                        print(f"Total Count: {count}")
                        print("--------------------------------------------------------") 

                        # Increment the processedCount as the URL is now processed
                        processedCount+=1    
                    
                    else:
                        with open('duplicateURLs.txt', 'a') as duplicates:
                            duplicates.write(f"Duplicates URLs: {phishyURL}"+'\n')
                    
                    with open('terminalOutputs.txt', 'a') as textLog:
                        textLog.write("--------------------------------------------------"+'\n')

                    count+=1
                    
                    # Save the DataFrame to the output file after each iteration
                    df.to_excel(LogFile, index=False)

                    # time to sleep between two URLs
                    time.sleep(3)

        # Go back to the previous page
        browser.back()
        # Wait for 5 seconds before moving to the next page
        time.sleep(5)

    browser.quit()