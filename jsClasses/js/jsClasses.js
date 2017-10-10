const customerName = "John Smith";
console.log(`Hello ${customerName}`);

function getCustomer() {
    return "Allan Lou";
}
console.log(`Hello ${getCustomer()}`);

function currencyAdjustment(stringParts, region, amount) {
    // console.log(stringParts);
    // console.log(region);
    // console.log(amount);
    let sign;
    if (region == 1) {
        sign = "$";
    } else {
        sign = '\u20AC'; /* Euro sign */
        amount = 0.9 * amount; /* currency conversion */
    }
    return `${stringParts[0]}${sign}${amount}${stringParts[2]}`;
}

const amount = 100;
const region = 2;
const msg = currencyAdjustment`You've earned ${region} ${amount}!`;
console.log(msg);

function calcTaxES5(income, state) {
    state = state || "Florida";
    console.log("ES5. Calculating tax for the resident of " +
        state + " with income of $" + income);
}
calcTaxES5(50000);

function calcTaxES6(income, state = "Florida") {
    console.log(`ES6. Calculating tax for the resident of ${state} with income of $${income}`);
}
calcTaxES6(50000);

class Pony {
    constructor(color) {
        this.color = color;
    }

    toString() {
        return `${this.color} pony`;
    }

    static defaultSpeed() {
        return 10;
    }

    get ponyColor() {
        console.log('get color');
        return this.color;
    }
    set ponyColor(newColor) {
        console.log(`set color ${newColor}`);
        this.color = newColor;
    }
}
console.log(Pony.defaultSpeed());
Pony.count = 1;
console.log(Pony.count);

const bluePony = new Pony('blue');
bluePony.ponyColor = 'red';
console.log(bluePony.ponyColor);

class Horse {
    constructor(speed) { this.speed = speed; }
    maxSpeed() {
        return this.speed + 10;
    }
}
class Colt extends Horse {
    constructor(speed, color) {
        super(speed);
        this.color = color;
    }
    maxSpeed() {
        return super.maxSpeed() + 10;
    }
}
const colt = new Colt(20, 'blue');
console.log(colt.speed);
console.log(colt.maxSpeed());

console.log("");

class Tax {
    constructor(income) {
        this.income = income;
    }
    calculateFederalTax() {
        console.log(`Calculating federal tax for income ${this.income}`);
    }
    calcMinTax() {
        console.log("In Tax. Calculating min tax");
        return 123;
    }
}

class IndianaTax extends Tax {
    constructor(income, taxRate) {
        super(income);
        this.taxRate = taxRate;
    }

    calcMinTax() {
        const val = super.calcMinTax();
        console.log('Indiana Tax: adjusting min tax');
        return val;
    }

    calculateStateTax() {
        console.log(`Calculating state tax for income ${this.income}`);
    }
}

const theTax = new IndianaTax(50000, 6);
theTax.calculateFederalTax();
theTax.calculateStateTax();
theTax.calcMinTax();
