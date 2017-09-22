/* 
    Complete these and the remaining functions described in the 
    assignment in this file.

    You may work with your in-class partner.
*/

function isBlank(input) {
    return input.length <= 0;
}

function stringToArray(input) {
    return input.split(' ');
}

function abbreviateName(name) {
    let nameList = name.split(' ');
    let output = '';

    let firstName = nameList[0];
    let lastName = nameList[1].substring(0, 1) + '.';

    return firstName + ' ' + lastName;
}

function titleCase(input) {
    let list = input.split(' ');
    let output = '';

    for (let i = 0; i < list.length; i++) {
        output += list[i][0].toUpperCase() + list[i].substring(1);

        if (i + 1 < list.length) {
            output += ' ';
        }
    }

    return output;
}

function firstN(array, n) {
    if (n) {
        if (n < array.length) {
            return array.slice(0, n);
        }
        return array;
    } else {
        return array[0];
    }
}

function lastN(array, n) {
    if (n) {
        if (n < array.length) {
            array.splice(0, array.length - n);
        }
        return array;
    } else {
        return array[array.length - 1];
    }
}

function sumPair(numbers, target) {
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i - 1] + numbers[i] === target) {
            return [i - 1, i];
        }
    }
    return [-1, -1];
}

function move(array, from, to) {
    if (from >= 0 && to >= 0) {
        const tempFrom = array[from];
        array[from] = array[to];
        array[to] = tempFrom;
    }
    return array;
}