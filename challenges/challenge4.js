/*
 *******************************************************************************
 * INSTRUCTIONS:
 * Follow the steps below and answer the discusssion questions that follow.
 *
 * 1. Read over the code that follows. `makePromise` is a function that makes
 *    an API call and returns a Promise containing the result. Uncomment code
 *    block #1 and run the code. What happens? (HINT: You may need to run
 *    `npm init` first.)
 *
 *      - Just returns the output of the first API call.
 *
 *
 * 2. Sometimes, when making API calls, we want to make a bunch of calls in
 *    parallel and don't care in what order they resolve. (In other words, they
 *    don't depend on each other.)
 *
 *      - Yep....
 *
 *    Uncomment code block #2 and run the code. What happens? What advantages
 *    does `Promise.all` give us when dealing with promises?
 *
 *      - Let's us make function calls in parallel, and returns an array of their outputs.
 *        If at least one pf those returns an error, the whole thing rejects! We can then
 *        access individual elemnts of that returned array and do whatever we want! 
 *
 *
 * 3. Make another variable `planet1Promise` and assign to it the result of
 *    calling `makePromise` with the URL `https://swapi.co/api/planets/1`.
 *    Add it to the array passed to `Promise.all`, then print the name of the
 *    returned planet inside the `.then()` callback.
 *
 *
 *      - Done!
 *
 *
 *******************************************************************************
 */

const request = require('request');


// **** STAR WARS API WAS BROKEN, SO I USED THE CARDS API INSTEAD!! ***


/**
 * Makes an API request and returns a Promise containing the result.
 * @param url The url to make an API request to.
 */
function makePromise(url) {
    return new Promise(function(resolve, reject){
        request(url, function (err, response, body) {
            if (err) {
                // Deal with any errors from the API call
                return reject(err);
            } else {
                try {
                    // If this works, then - success!! Return the parsed body.
                    resolve(JSON.parse(body))
                } catch (err) {
                    // Deal with any errors from parsing the response
                    return reject(err);
                }
            }
        });
    });
}

const person1Promise = makePromise('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
const person2Promise = makePromise('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
const person3Promise = makePromise('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
const planet1Promise = makePromise('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')

/* Uncomment me! #1 */
// person1Promise.then(function(deckResult) {
//     console.log(`Resulting deck id: ${deckResult.deck_id}`);
// }).catch(function(err) {
//     console.log("Got an error!")
//     console.log(err);
// });

/* Uncomment me! #2 */
Promise.all([person1Promise, person2Promise, person3Promise, planet1Promise])
    .then(function(results) {
        for (let i = 0; i < 3; i++) {
            console.log(`Deck ${i+1}'s id: ${results[i].deck_id}`)
        }
        console.log(`Planet 1 deck_id: ${results[3].deck_id}`)
    })
    .catch(function(err) {
        console.log('Got an error!')
        console.log(err)
    })
