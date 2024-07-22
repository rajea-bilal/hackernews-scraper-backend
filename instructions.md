

# Instructions for app usage

## Table of Contents
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Running Tests](#running-tests)
4. [API Endpoints](#api-endpoints)

## Installation



1. Install backend dependencies

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../react-frontend
npm install
```

## Running the Application

#### Start the backend server

```bash
cd backend
npm run start
```
The above command will 
1. start the server on http://localhost:4000
2. allow Playwright to open Hacker News website, move across pages to collect 100 article titles 
3. sort them in ascending order
3. save them to a csv file in the root directory.

#### In a new terminal, start the frontend

```bash
cd react-frontend
npm run dev
```

The frontend will be available at http://localhost:5173

## Running Frontend Tests

```bash
cd react-frontend
npm test
``` 

## Running Backend Tests

```bash
cd backend
```
#### To test the API endpoint

```bash
npm run test server.test.js
```

#### To test the web scraper function
```bash
npm run test scraper.test.js
```

#### API Endpoints
 - Get http://localhost:4000/: Fetches sorted HackerNews article
  - Response: An array of article objects, each containing:
    - title: String
    - link: String
    - posted: String (timestamp)

