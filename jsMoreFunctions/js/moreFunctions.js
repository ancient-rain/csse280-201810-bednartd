
// Invocation as a constructor function
function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = function () {
        return this.first + ' ' + this.last;
    };
    this.fullNameReversed = function () {
        return this.last + ', ' + this.first;
    };
}

Person.prototype.greet = function () {
    return this.first + ' says hi.';
};

console.log(new Person('Delvin', 'Thomas').greet()); //Delvin says hi.

// Invocation using apply

const simon = new Person("Simon", "Willison");
const calvin = new Person('Calvin', 'James');
const hobbes = {first: 'Hobbes'};

console.log(calvin.greet.apply(hobbes)); 

Person.prototype.greetFriends = function (friendA, friendB) {
    return this.first + ' says hi to ' + friendA.first + ' and ' + friendB.first + '.';
};

const bill = {first: 'Bill', last: 'Watterson'};

console.log(calvin.greetFriends.apply(bill, [calvin, hobbes]));


// Closure

function makeFunc() {
    const name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

// myFunc is a closure
const myFunc = makeFunc();
myFunc();


/* A function factory for creating functions that 
add a specific value to their arguments */

function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

// Closure example
function convertFromMiles(to) {
    const milesToKm = 1.60934;
    const milesToFt = 5280;
    return function(amount) {
        let factor;
        if(to === "km") {
            factor = milesToKm;
        } else if (to === "ft") {
            factor = milesToFt;
        } else {
            factor = 1;
        }
        return factor * amount;
    };
}

const milesToKm = convertFromMiles("km");
const milesToFt = convertFromMiles("ft");