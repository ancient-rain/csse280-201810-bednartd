// Create the simon object

let simon = {
    first: "Simon",
    last: "Willison",
    getFullName: function () {
        return this.first + ' ' + this.last;
    }
};

// access properties and methods

let firstName = simon.first;
let fullname = simon.getFullName();

let simonsFirstName = simon["first"];
let simonsFullName = simon["getFullName"]();

let bill = new Object();  // alternative & preferred approach: use {} 

bill.first = "Bill";
bill.last = "Waterson";
bill.age = 25;
bill.getFullName = function () {
    return this.first + ' ' + this.last;
};

let lnp = "last";

bill.first = "William";
bill[lnp] = "James";
delete bill.age;



