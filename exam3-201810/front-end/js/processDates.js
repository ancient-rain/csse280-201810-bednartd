// new Date(year, month, date, hours, minutes, seconds, milliseconds);
// Month is 0-based
const year = 2018;
const shows = [];

/* Lion King New York */
const kingStartHr = 11;
const kingEndHr = 14;

shows.push( {
    name: "The Lion King",
    location: "New York",
    start: (new Date(year, 1, 10, kingStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 1, 10, kingEndHr, 0, 0, 0)).getTime()
});

/* Lion King Chicago */
shows.push( {
    name: "The Lion King",
    location: "Chicago",
    start: (new Date(year, 2, 10, kingStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 2, 10, kingEndHr, 0, 0, 0)).getTime()
});

/* Lion King San Francisco */
shows.push( {
    name: "The Lion King",
    location: "San Francisco",
    start: (new Date(year, 2, 24, kingStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 2, 24, kingEndHr, 0, 0, 0)).getTime()
});

/* Elf the Musical New York */
const elfStartHr = 11;
const elfEndHr = 13;

shows.push( {
    name: "Elf the Musical",
    location: "New York",
    start: (new Date(year, 3, 7, elfStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 3, 7, elfEndHr, 0, 0, 0)).getTime()
});

/* Elf the Musical Chicago */
shows.push( {
    name: "Elf the Musical",
    location: "Chicago",
    start: (new Date(year, 4, 5, elfStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 4, 5, elfEndHr, 0, 0, 0)).getTime()
});

/* Elf the Musical San Francisco */
shows.push( {
    name: "Elf the Musical",
    location: "San Francisco",
    start: (new Date(year, 4, 19, elfStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 4, 19, elfEndHr, 0, 0, 0)).getTime()
});

/* Charlie and the Chocolate Factory New York */
const charlieStartHr = 11;
const charlieEndHr = 14;

shows.push( {
    name: "Charlie and the Chocolate Factory",
    location: "New York",
    start: (new Date(year, 5, 9, charlieStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 5, 9, charlieEndHr, 0, 0, 0)).getTime()
});

/* Charlie and the Chocolate Factory Chicago */
shows.push( {
    name: "Charlie and the Chocolate Factory",
    location: "Chicago",
    start: (new Date(year, 6, 7, charlieStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 6, 7, charlieEndHr, 0, 0, 0)).getTime()
});

/* Charlie and the Chocolate Factory San Francisco */
shows.push( {
    name: "Charlie and the Chocolate Factory",
    location: "San Francisco",
    start: (new Date(year, 6, 21, charlieStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 6, 21, charlieEndHr, 0, 0, 0)).getTime()
});

/* Wicked New York */
const wickedStartHr = 11;
const wickedEndHr = 16;

shows.push( {
    name: "Wicked",
    location: "New York",
    start: (new Date(year, 7, 4, wickedStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 7, 4, wickedEndHr, 0, 0, 0)).getTime()
});

/* Wicked Chicago */
shows.push( {
    name: "Wicked",
    location: "Chicago",
    start: (new Date(year, 8, 8, wickedStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 8, 8, wickedEndHr, 0, 0, 0)).getTime()
});

/* Wicked San Francisco */
shows.push( {
    name: "Wicked",
    location: "San Francisco",
    start: (new Date(year, 8, 15, wickedStartHr, 0, 0, 0)).getTime(),
    end: (new Date(year, 8, 15, wickedEndHr, 0, 0, 0)).getTime()
});

window.displayTimeAmPm = (date) => {
    return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
};

window.displayTimeShortNames = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleString('en-US', options);
};

function consoleLogShow(show) {
    const showString = `{ 
    "name": "${show.name}",
    "location": "${show.location}",
    "start": ${show.start},
    "end": ${show.end}
}`;
    console.log(showString);
}

window.isValidEmail = (email) =>{
    if (!email) return false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


// Example uses of these functions.  They are made global
// window.displayTimeShortNames(new Date(year, 8, 15, wickedEndHr, 0, 0, 0));
// window.displayTimeAmPm(new Date(year, 8, 15, wickedEndHr, 0, 0, 0));

// Run the code below to see the shows you need to post to the db
// on endpoint http://localhost:4500/api/shows/
// Can use Postman to post each show. 
/* shows.forEach( show => {
    consoleLogShow(show);
}); */