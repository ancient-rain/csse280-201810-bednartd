// function that returns a single value
function getRectangleArea(width, height) {
    return width * height;
}

const firstRectangleArea = getRectangleArea(4, 5);
const secondRectangleArea = getRectangleArea(20, 6);

const recWidth = 99;
const recHeight = 4;

const area1 = (function (width, height) {
    return width * height;
}(recWidth, recHeight));

// iffy in es6 using arrow functions
const area2 = ((width, height) => {
    return width * height;
})(recWidth, recHeight);

function a() {
    let hi = 'hi';
    console.log(hi); //hi
    console.log(bye); //undefined

    if (true) {
        let bye = 'bye';
        console.log(hi); //hi
        console.log(bye); //bye
    }
    console.log(hi); //hi
    console.log(bye); //bye
}

const person = {
    name: 'Calvin',
    age: 25,
    greet: function () {
        alert('My name is ' + this.name + '.');
    }
};

// Add a new method to person
person.calculateAge = function (yearsFromNow) {

    console.log(this);

    const yearsOld = () => this.age + yearsFromNow;

    alert('I will be ' + yearsOld() + ' years old ' +
        yearsFromNow + ' years from now.');
};

person.calculateAge(10);