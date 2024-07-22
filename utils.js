import { createObjectCsvWriter } from 'csv-writer'

export function convertTimeToMilliseconds(ageString) {
  const ageParts = ageString.split(' '); // ['1', 'hour']
  const age = parseInt(ageParts[0]);  // 1
  const unit = ageParts[1];  // 'hour'

  // Convert age to milliseconds based on the unit
   if(unit === 'day' || unit === 'days') {
    return age * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  }
  if(unit === 'hour' || unit === 'hours') {
    return age * 60 * 60 * 1000; // Convert hours to milliseconds
  }
  if(unit === 'minute' || unit === 'minutes') {
    return age * 60 * 1000; // Convert minutes to milliseconds
  }
  if(unit === 'second' || unit === 'seconds') {
    return age * 1000; // Convert seconds to milliseconds
  }
 
}


export function arraysAreEqual(array01, array02) {

  
  // if the arrays being compared are not equal in length, return false
  if(array01.length !== array02.length) {
    console.log(`arrays are not of equal length`)
    return false
  }

  // iterate through the arrays and compare each element(article) in the array to 
  // see if they are equal, meaning if they are arranged in the same order
  for (let i = 0; i < array01.length; i++) {
    if (array01[i].posted !== array02[i].posted) {
      console.log(`Arrays are not arranged in the same order at index ${i}`);
      return false;
    }
  }

  // if none of the above conditions are met, return true
  return true
}

export const csvWriter = createObjectCsvWriter({
  path: 'hackernews_articles.csv',
  // header defines the structure of the CSV file
  // each object in the array represents a column in the CSV file
  header: [
    {id: 'title', title: 'Title'},
    {id: 'link', title: 'Link'},
    {id: 'age', title: 'Posted'}
  ]
})
