(function () {

    let count = 0;

    const sayHelloEl = document.getElementById('clickMe');
    const demoEl = document.getElementById('demo');
    const displayDateEl = document.getElementById('displayDate');
    const dateEl = document.getElementById('date');
    const overMeEl = document.getElementById('overme');

    sayHelloEl.onclick = sayHello;
    
    displayDateEl.addEventListener('click', dispalyDate, false);
    overMeEl.addEventListener('mouseover', passOverMe, false);
    overMeEl.addEventListener('mouseout', leaveMe, false);

    function sayHello() {
        count++;

        if (count % 2 === 1) {
            sayHelloEl.textContent = 'Click Me';
            demoEl.textContent = 'Hello World';
        } else {
            sayHelloEl.textContent = 'Say Hello';
            demoEl.textContent = '';
        }
    }

    function dispalyDate() {
        dateEl.textContent = new Date();
    }  

    function passOverMe() {
        overMeEl.style.color = 'red';
    }

    function leaveMe() {
        overMeEl.style.color = 'black';
    }
})();
