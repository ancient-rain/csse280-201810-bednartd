
// Invocation as a constructor function
function Person(first, last) {
    this.first = first;
    this.last = last;

    this.fullName = () => {
        return this.first + ' ' + this.last;
    };

    this.fullNameReversed = () => {
        return this.last + ', ' + this.first;
    };

    Person.prototype.nationality = "English";

    Person.prototype.great = function () {
        return this.first + ' says hi.';
    };

    Person.prototype.greetFriends = function (friendA, friendB) {
        return this.first + ' says hi to ' + friendA.first + ' and ' + friendB.first + '.';
    };
}

console.log(new Person('Trevor', 'Bednarek').great());

const bill = { first: 'Bill', last: 'Nye' };
const calvin = new Person('Calvin', 'James');
const hobbes = { first: 'Hobbes' };

// apply will change what the value of this will be
// this.first = bill when calling greetFriends
console.log(calvin.greetFriends.apply(bill, [calvin, hobbes]));

function convertFromMiles(to) {
    const milesToKm = 1.60934;
    const milesToFt = 5280;

    return function(amount) {
        let factor;

        if (to === 'km') {
            factor = milesToKm;
        } else if (to === 'ft') {
            factor = milesToFt;
        } else {
            factor = 1;
        }

        return factor * amount;
    }
}