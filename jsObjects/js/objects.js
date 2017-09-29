// Create the simon object

var simon =  {	
    first: "Simon",
    last: "Willison",
    getFullName: function () {
        return this.first + ' ' + this.last;
    }
};  

// access properties and methods

var firstName =  simon.first;
var fullname = simon.getFullName();

var simonsFirstName = simon["first"];
var simonsFullName = simon["getFullName"]();

var bill = new Object();  // alternative & preferred approach: use {} 

bill.first = "Bill";
bill.last = "Waterson";
bill.age = 25;
bill.getFullName = function () {
    return this.first + ' ' + this.last;
}; 

var lnp = "last";

bill.first = "William";
bill[lnp] = "James";
delete bill.age;



