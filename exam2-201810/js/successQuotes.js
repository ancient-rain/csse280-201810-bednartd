const ALL_QUOTES = [{
    quote: "Welcome every morning with a smile. Look on the new day as another special gift from your Creator, another golden opportunity.",
    author: "Og Mandino"
},
{
    quote: "Happiness cannot be traveled to, owned, earned, or worn. It is the spiritual experience of living every minute with love, grace & gratitude.",
    author: "Denis Waitley"
},
{
    quote: "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.",
    author: "Carl Bard"
},
{
    quote: "Accept responsibility for your life. Know that it is you who will get you where you want to go, no one else.",
    author: "Les Brown"
},
{
    quote: "Surround yourself with only people who are going to lift you higher.",
    author: "Oprah Winfrey"
},
{
    quote: "Nobody ever wrote down a plan to be broke, fat, lazy, or stupid. Those things are what happen when you don’t have a plan.",
    author: "Larry Winget"
},
{
    quote: "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible.",
    author: "Joel Brown"
},
{
    quote: "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    author: "Joshua J.Marine"
},
{
    quote: "Build your own dreams, or someone else will hire you to build theirs.",
    author: "Farrah Gray"
},
{
    quote: "The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle.",
    author: "Steve Jobs"
},
{
    quote: "In the end, it isn’t about changing the world, but rather, how many worlds you have changed.",
    author: "Unknown"
},
{
    quote: "Success is not a destination, but the road that you're on. Being successful means that you're working hard and walking your walk every day. You can only live your dream by working hard towards it. That's living your dream.",
    author: "Marlon Wayans"
},
{
    quote: "In order to succeed, your desire for success should be greater than your fear of failure.",
    author: "Bill Cosby"
},
{
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra"
},
{
    quote: "Life is like photography. You need the negatives to develop.",
    author: "Unknown"
},
{
    quote: "I am thankful for all of those who said NO to me. It’s because of them I’m doing it myself.",
    author: "Albert Einstein"
},
{
    quote: "Life isn’t about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw"
},
{
    quote: "We don’t see things the way they are. We see them the way we are.",
    author: "Talmud"
},
{
    quote: "My philosophy is that not only are you responsible for your life, but doing the best at this moment puts you in the best place for the next moment.",
    author: "Oprah Winfrey"
},
{
    quote: "Never be bullied into silence. Never allow yourself to be made a victim. Accept no one’s definition of your life; define yourself.",
    author: "Harvey Fierstein"
},
{
    quote: "The price of anything is the amount of life you exchange for it.",
    author: "Henry David Thoreau"
},
{
    quote: "Life is either a daring adventure or nothing.",
    author: "Helen Keller"
},
{
    quote: "No one is going to hand me success. I must go out & get it myself. That’s why I’m here. To dominate. To conquer. Both the world, and myself.",
    author: "Unknown"
}
];

/* Use this to store user's choice */
let userChoice = 'all';

/* Use this to update the search string */
let searchString;

function displayQuote(container, quote) {
    container.append($(`<div class="author-quote"> <q> ${quote.quote} </q>
        <span class="quote-author-name">– ${quote.author} </span> </div>`));
}

function displayQuotes(quotes) {
    const quotesContainer = $('#author-quotes-container').empty();
    quotes.forEach(function (quote) {
        displayQuote(quotesContainer, quote);
    });
}

/**
 * Question 1 Implement a function that displays the shortest quote.  
 * See the search() function to determine when this function will run.
 */
function displayShortestQuote() {
    // DONE: complete this function.
    let quotesContainer = document.getElementById('author-quotes-container');
    const quotes = quotesContainer.childNodes;
    const shortest = {
        quote: quotes[0].childNodes[1].innerHTML,
        author: quotes[0].childNodes[3].innerHTML
    };

    for (let i = 1; i < quotes.length; i++) {
        const quote = quotes[i].childNodes[1].innerHTML;

        if (quote.length < shortest.quote.length) {
            const auth = quotes[i].childNodes[3].innerHTML;
            shortest.quote = quote;
            shortest.author = auth.substring(2);
        }
    }

    quotesContainer = $('#author-quotes-container').empty();
    displayQuote(quotesContainer, shortest);
}

/**
 * Question 2 Write a function that displays quotes that 
 * contain the substring entered by the user. See the search() 
 * function to determine when this function will run.
 */
function displayQuotesWithSubstring(thisString) {
    // DONE: complete this function. 
    let quotesContainer = document.getElementById('author-quotes-container');   

    quotesContainer = $('#author-quotes-container').empty();

    for (let i = 0; i < ALL_QUOTES.length; i++) {
        const quote = ALL_QUOTES[i].quote;
        const index = quote.indexOf(thisString);

        if (index > -1) {
            displayQuote(quotesContainer, ALL_QUOTES[i]);
        }
    }
}

/**
 * Question 3. Implement a function that displays the quote with the most
 * unique words.  This should be case insensitive, i.e., 'The' and 'the' 
 * should count as the same unique word.
 */

function displayQuoteWithMostUniqueWords() {
    // TODO: complete this function. 
}



/**
 * Question 4 Implement a function that displays quotes from the
 * top n authors with the most quotes. See the search() function
 * to determine when this function will run.
 * 
 * In this exam, n == 2;
 */
function displayQuotesFromAuthorsWithMostQuotes(n) {
    // TODO: complete this function. 
}

/* This is a utility function that aids with sorting an array of objects 
 * in descending order of the value of the provided property.
 * 
 * This is called like this:  
 *      array.sort(compareByPropertyDescending("prop"));
 * 
 * Use if needed.
 */
function compareByPropertyDescending(prop) {
    return (a, b) => {
        if(a[prop] > b[prop]) return -1;
        if(a[prop] < b[prop]) return 1;
        return 0;
    };
}

/* This is a utility function for removing punctuation marks from a string.
 * It returns the string with punctuation marks removed. 
 * 
 * Use if needed.
 * */
function removePunctuation(str) {
    return str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
}

function search() {
    switch (userChoice) {
    case 'all':
        displayQuotes(ALL_QUOTES);
        break;
    case 'unique':
        displayQuoteWithMostUniqueWords();
        break;
    case 'substr':
        displayQuotesWithSubstring(searchString);
        break;
    case 'short':
        displayShortestQuote();
        break;
    case 'most':
        displayQuotesFromAuthorsWithMostQuotes(2);
        break;
    default:
        displayQuotes(ALL_QUOTES);
        break;
    }
}

function setup() {
    $('input:radio[name="choices"]').change(
        function () {
            userChoice = $(this).val();
            if ($(this).is(':checked')) {
                search();
            }
        });

    /* Question 5 Add support here to programmatically select the radio
     * button with value == 'substr' when the input text field receives a
     * focus event. You should update the record of the user's choice and
     * also call the search() function. 
     * */
    // TODO: Implement your solution here

    $('#search').on('input', function () {
        searchString = $(this).val();
        if (searchString.length < 1) {
            searchString = undefined;
        }
        search();
    });

    displayQuotes(ALL_QUOTES);
}

$(window).on('load', function () {
    //load in initial state
    setup();
});