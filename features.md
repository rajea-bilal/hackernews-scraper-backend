
![Backend server](./backend/images/backend-server.png)


# Backend features
## Edge Cases in time formats

For example, a different time format, "2 days ago".
Added an additional if statement that handles days:

```javascript
if (unit === 'day' || unit === 'days') {
  return age * 24 * 60 * 60 * 1000; // Convert days to milliseconds
} 
```

## Making the code more configurable 

To enhance flexibility of the code, added configurable options

1. Added two variables at the top of the file:

```javascript
const defaultArticleCount = 100
const defaultStartPage = 'https://news.ycombinator.com/newest'
```

2. Modified the sortHackerNewsArticles( ) function to accept these two arguments

```javascript
async function sortHackerNewsArticles(articleCount, startPage) {
  //
}
```

## Robust Error Handling

1. Implemented try-catch blocks within the code to manage potential issues during web scraping.
2. Implemented logging of caught errors for easier debugging and maintenance.

````javascript
  await page.goto(startPage).catch((error) => { 
      throw new Error('Failed to navigate to requested page.') 
    });
````


## Saving articles from Hacker News to a CSV file

1. Installed CSV writer package to facilitate the process of saving articles to a csv file in the root directory
2. Implemented `createObjectCsvWriter` functionality within the utils file

```javascript
export const csvWriter = createObjectCsvWriter({
  path: 'path to the saved file',
  header: [
    { column01 in CSV file},
    { column02 in CSV file},
    { column03 in CSV file}
  ]
})
````

## Adding unit tests to test individual functions in the backend
 - Utilized the `Jest testing framework` to create and execute unit tests for individual backend functions, ensuring their reliability.
- Created separate tests for the web scraping function and integration tests for API endpoints requests.
- For the integration test, utilized `supertest` to make HTTP requests to our Express app.
- Organized tests using `describe` and `it` functions. 

**Original errors in the integration test**: 
  - The test was taking too long and timing out.
  - The error handling wasn't being triggered properly.
  - The server wasnt closing correctly after tests.

**Solution**: 
  - I took help from ChatGPT to arrive at the current solution.
  - Instead of mocking the entire route, I focused on the specific route handler.
  - Found the exact function handling request to root route by accessing Express app's internal properties.
  - Temporarily replaced the handler function with a mock function that always returns an error.
  - After the test, restored the original function back.
  - Increased the timeout to 3000 ms to allow for sufficient time for the test.
  - Made use of the AfterAll function provided by `Jest` to correctly close the server once tests are complete.

***
# Frontend Features

![React app interface](./backend/images/app-interface.png)

The frontend is built with React, offering a modern and interactive user interface for displaying Hacker News articles. Key features include:

- **Real-time Data Display**: Articles scraped from Hacker News are dynamically displayed, sorted in ascending order.

- **Responsive Design**: Utilizing `Tailwind CSS`, the interface adapts seamlessly to various screen sizes and devices, ensuring a consistent user experience across desktop and mobile platforms.

- **Sleek UI Components**: Incorporation of `shadcn` UI library for aesthetically pleasing and functional button component, enhancing the overall look and feel of the application.

- **Efficient Data Fetching**: Integration of `Axios` library for smooth and efficient API calls to the backend, ensuring fast and reliable data retrieval.

- **Component-Based Architecture**: Leveraging React's component-based structure, we've created separate components for:
  - Navbar: For easy navigation and app structure
  - ArticleViewer: To display and manage article content efficiently

- **User-Friendly Article Presentation**: Articles are presented in a separate section displaying title and posted time. 

- **Enhanced User Feedback**: 
  - Implemented intuitive loading states using `lucide-React` icons:
    - A loading spinner is displayed while articles are being fetched, improving user experience during data retrieval.
    - An expressive error icon (annoyed face) is shown in case of network or server errors, providing clear visual feedback for troubleshooting.
  - These visual cues ensure users are always informed about the current state of data fetching and any potential issues.

***loading-state***
![loading state user feedback](./backend/images/loading-state.png)

***error-state***
![error state user feedback](./backend/images/error-state.png)

## Adding integration tests to test the React App as a whole

All frontend tests are located within the `./src/tests` folder.

#### App Component

- Imported testing utilities from `react testing library` and `vitest` to test the App component.
- Setup the `msw` (Mock Service Worker) package with the help of docs, creating necessary folders and files to get it up and working
- `msw` allows us to test how our app behaves with different data scenarios without needing a real backend
- it allows us to catch requests made from react frontend, responding with mock data specified by us in the `./src/mocks/handlers.js` file 
- Used a `describe` block to group all tests related to the App component.

Tested for the following: 
- App renders
- Click 'Scrape Articles' button
- Use `waitFor` to handle async rendering
- Check for presence of articles or error message
- Verify article content matches mock data
- Checked for headline and main h1 tag within the App.
- Verify error message displays when appropriate.

#### ArticleViewer Component

- Verified correct rendering of articles when provided with mock data as props
- Checked for the presence of a loading spinner when `isLoading` props is passed as true
- Verified error message is show when `error` prop is passed as true
- Verified message of 'no articles' being shown when articles array is empty

- Used `render` function to mount the component for each test.
- Utilized `screen` queries to find and make assertions on rendered elements.


