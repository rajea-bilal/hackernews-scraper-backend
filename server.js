import express from "express";
import cors from 'cors'
import { sortHackerNewsArticles } from "./scraper.js";

export const app = express()
const port = 4000


//middlewares

// to allow access to the server from the frontend
app.use(
  cors({
    origin: "*", 
  })
);


// Configurable options - modify these values to change the script's behavior
const defaultArticleCount = 100
const defaultStartPage = 'https://news.ycombinator.com/newest'

let articles = [];

// Function to run the scraper
async function runScraper() {
  try {
    articles = await sortHackerNewsArticles(defaultArticleCount, defaultStartPage);
    console.log(`Scraped ${articles.length} articles`);
  } catch (error) {
    console.error('Error running scraper:', error);
  }
}

// // Run scraper when server starts
// runScraper();

//endpoint to access articles from hacker news webpage
app.get('/', async (req, res) => {
  try {
    res.json(articles);
  } catch(error) {
    res.status(500).json({ error: 'Failed to scrape data from HackerNews'})
  }
})

let server;

export async function startServer() {
  try {
    // scrape the articles from the Hacker News website and start the server
    await runScraper()
    server = app.listen(port, () => { console.log(`Server is listening on http://localhost:${port}`) })
  } catch(error) {
    console.error('Error starting server:', error)
  }
}


export async function stopServer() {
  try {
    server = server.close()
  } catch(error) {
    console.error('Error stopping server:', error)
  }
}


// starting the server conditionally, so that it doesn't start when running tests
if(process.env.NODE_ENV !== 'test') {
  startServer()
}

