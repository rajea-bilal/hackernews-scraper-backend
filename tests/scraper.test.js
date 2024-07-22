import { sortHackerNewsArticles } from "../scraper";

describe('sortHackerNewsArticles', () => {
  it('should return an array of articles as objects', async() => {
    const articles = await sortHackerNewsArticles(100, 'https://news.ycombinator.com/newest')
    expect(articles).toBeInstanceOf(Array)
    expect(articles.length).toBeGreaterThan(0)
    expect(articles[0]).toHaveProperty('title')
    expect(articles[0]).toHaveProperty('posted')
    expect(articles[0]).toHaveProperty('link')
  }, 20000)

  it('should handle errors gracefully', async () => {
    // simulate an error by passing an invalid url
    await expect(sortHackerNewsArticles(100, 'https://newss.ycombinator.com/newest'))
    .rejects.toThrow('Failed to navigate to requested page.')
  })
})