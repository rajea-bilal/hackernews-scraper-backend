import { convertTimeToMilliseconds } from './utils.js';
import { arraysAreEqual } from './utils.js';
import { csvWriter } from './utils.js';
import { chromium } from "playwright"


// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION
export async function sortHackerNewsArticles(articleCount, startPage) {
 
        
  const browser = await chromium.launch( { headless: false })
  const context = await browser.newContext();
  const page = await context.newPage();



  // go to Hacker News
  try {
 
    // Navigate to Hacker News "newest" page
    await page.goto(startPage, { timeout: 60000, waitUntil: 'networkidle' }).catch((error) => { 
      throw new Error('Failed to navigate to requested page.') 
    });

    let totalCount = 0; // Total articles collected
    let articles = [];

    
    // Function to extract article titles and their times
    async function extractArticles() {
      const newArticles = await page.$$eval('.athing', (elementsArray) => {
        return elementsArray.map((row) => {
          const title = row.querySelector('.titleline a').innerText;
          const posted = row.nextElementSibling.querySelector('.age').innerText;
          const link = row.querySelector('.titleline a').getAttribute('href');
          if (!title || !posted || !link) throw new Error("Article title, age, or link not found");
          return { title, posted, link };
        });
      });
     

        // Add new articles to the articles array
      articles = [...articles, ...newArticles];
      totalCount += newArticles.length;

      return newArticles;
    }
   
      
  while (totalCount < articleCount) {
    // console.log(`Current article count: ${totalCount}`);
    // Loop until at least 100 articles are collected
    await extractArticles();

    if(totalCount < articleCount) {
      // Find the "More" button and navigate to the next page if it exists
      const moreLink = await page.$('.title .morelink');
      const href = await moreLink.getAttribute('href');
      if (!href) break;
     
      // move across to the next page
      await page.goto(`https://news.ycombinator.com/${href}`);

      // wait for a second before moving on to the next page
      await page.waitForTimeout(1000); 
    }
  }

  // Slice to get only the first 100 articles
  articles = articles.slice(0, articleCount);
  console.log(`Total articles scraped: ${articles.length}`);
    
  function validateSorting() {
  
    

 
      // Validate sorting order (ascending)

      // articles array contains objects with title and posted properties
     const sortedArticles = [...articles].sort((a, b) => {
       // Assuming age is a string like '2 hours ago', convert it to a comparable number using the convertTimeToMilliseconds function
       // Example: Convert '2 hours ago' to actual time in milliseconds and compare
       const timeA = convertTimeToMilliseconds(a.posted); // extract posted from object a and convert to milliseconds
       const timeB = convertTimeToMilliseconds(b.posted);

       return timeA - timeB; // Sort ascending (latest article first - smallest milliseconds first)
     });

     // Compare sortedArticles with articles to validate sorting order
    const isSortedAscending = arraysAreEqual(articles, sortedArticles);
    console.log(`Articles are sorted correctly in ascending order: ${isSortedAscending}`);
    
  }

  // Call validateSorting() once after printing all articles
  validateSorting()

  // Write articles to a CSV file
  await csvWriter.writeRecords(articles).catch((error) => {
    throw new Error('Failed to write articles to CSV file.')
  });

    return articles

  } catch(error) {
    console.log(`An error occurred, ${error.message}`)
    throw new Error('Failed to navigate to requested page.');
  } finally {
    // close the browser that was opened by Playwright, ensuring browser is closed if an error occurred during the script execution
    await browser.close();
  }
}
    
      
     
        




   
// (async () => {
//   await sortHackerNewsArticles(defaultArticleCount, defaultStartPage);
// })().catch((error) => {
//   console.error(`An error occurred, ${error.message}`)
// })
    
  

   



    
 
  


