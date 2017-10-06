(function () {

    /*
        By: Trevor Bednarek
        On: 10/5/2017
    */

    "use strict";

    // CONSTANTS
    let boardSize = 4;  // 4 for 16 puzzle, 5 for 25 puzzle, etc.
    const BOARD_WIDTH = 500;  // 500 pixels
    const BORDER_SIZE = 3;    // 3 pixels


    // OTHER VARS
    const chooseEle = document.getElementById('button');
    const boardDiv = document.getElementById("board");
    const size = document.getElementsByName('size');

    // called when the page first loads to create tiles and empty space 
    function setup() {
        boardSize = getRadioValue();
        let current = 1;

        boardDiv.innerHTML = '';
        boardDiv.style.paddingTop = '20px';
        boardDiv.style.width = BOARD_WIDTH + 'px';

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const newSpan = document.createElement('span');
                const isBlank = current === boardSize * boardSize;

                updateNewSpan(newSpan, boardSize, current, isBlank);

                boardDiv.appendChild(newSpan);
                current++;
            }
        }

        shuffle();
    }

    // gets the value for the size of the board
    function getRadioValue() {
        for (let i = 0; i < size.length; i++) {
            if (size[i].checked) {
                return size[i].value;
            }
        }
    }

    function shuffle() {
        const tiles = boardDiv.childNodes;
        const moves = getRandomInt(boardSize, tiles.length);

        for (let i = 0; i < moves; i++) {
            const blankIndex = getBlankIndex();
            const move = randomMove(blankIndex);

            swapDomElements(tiles[move], tiles[blankIndex]);
        }
    }

    // gets a random integer no lower than the min and less than the max
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // checks to see that the user clicked a valid tile
    function randomMove(blankIndex) {
        const aboveIndex = blankIndex - boardSize;
        const belowIndex = blankIndex + parseInt(boardSize);
        const leftIndex = blankIndex - 1;
        const rightIndex= blankIndex + 1;

        const aboveEle = getTile(aboveIndex);
        const belowEle = getTile(belowIndex);
        const leftEle = getTile(leftIndex);
        const rightEle = getTile(rightIndex);
        let moveList = [];

        if (aboveEle !== -1) {
            moveList.push(aboveIndex);
        }

        if (belowEle !== -1) {
            moveList.push(belowIndex);
        }

        if (leftEle !== -1) {
            moveList.push(leftIndex);   
        }

        if (rightEle !== -1) {
            moveList.push(rightIndex);
        }

        return getRandomInt(0, moveList.length);
    }

    // adds the css elements needed to the tile spans
    function updateNewSpan(newSpan, boardSize, current, isBlank) {
        const tileSize = BOARD_WIDTH / boardSize - BORDER_SIZE * 2;
        const tilePadding = (tileSize - 82) / 2;

        if (isBlank) {
            newSpan.className = 'space';
            newSpan.style.fontSize = '50pt';
            newSpan.style.display = 'inline-block';
            newSpan.style.textAlign = 'center';
            newSpan.style.color = '#999';
        } else {
            newSpan.className = 'tile';
            newSpan.addEventListener('click', moveTile, false);
        }

        newSpan.textContent = current;
        newSpan.style.borderWidth = BORDER_SIZE;
        newSpan.style.borderColor = 'red';
        newSpan.style.borderStyle = 'solid';
        newSpan.style.width = tileSize.toString() + 'px';
        newSpan.style.padding = tilePadding.toString() + 'px 0';
    }

    // checks to see that all the tiles are in order
    function checkWin() {
        const currentState = boardDiv.childNodes;
        let previous = currentState[0].innerHTML;

        for (let i = 1; i < currentState.length; i++) {
            const curVal = currentState[i].innerHTML;
            const isLower = parseInt(previous) < parseInt(curVal);

            if (!isLower) {
                return false;
            } else {
                previous = curVal;
            }
        }

        return true;
    }

    // Exchange the locations of two elements in the DOM.  
    // Assumes that neither element is the parent of the other.	
    // from http://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them

    function swapDomElements(element1, element2) {
        // create marker element and insert it where element1 is
        const temp = document.createElement("div");
        element1.parentNode.insertBefore(temp, element1);

        // move element1 to immediately before element2
        element2.parentNode.insertBefore(element1, element2);

        // move element2 to immediately before where element1 used to be
        temp.parentNode.insertBefore(element2, temp);

        // remove temporary marker node
        temp.parentNode.removeChild(temp);
    }

    // If clicked tile is next to the empty space, 
    // swap them
    function moveTile() {
        const blankEle = document.getElementsByClassName('space')[0];
        const isValid = validMove(this, blankEle);
        let isWon = false;

        if (isValid) {
            swapDomElements(this, blankEle);
            isWon = checkWin();
        }

        if (isWon) {
            alert('You won!');
            setup();
        }
    }

    // checks to see that the user clicked a valid tile
    function validMove(clickedTile) {
        const blankIndex = getBlankIndex();
        const aboveEle = getTile(blankIndex - boardSize);
        const belowEle = getTile(blankIndex + parseInt(boardSize));
        const leftEle = getTile(blankIndex - 1);
        const rightEle = getTile(blankIndex + 1);

        const clickedAbove = clickedTile == aboveEle;
        const clickedBelow = clickedTile == belowEle;
        const clickedLeft = clickedTile == leftEle;
        const clickedRight = clickedTile == rightEle;

        return clickedAbove || clickedBelow || clickedLeft || clickedRight;
    }

    // gets the index of the blank tile
    function getBlankIndex() {
        const currentState = boardDiv.childNodes;

        for (let i = 0; i < currentState.length; i++) {
            if (currentState[i].className === 'space') {
                return i;
            }
        }
    }

    // gets the tile based on the index
    function getTile(index) {
        const board = boardDiv.childNodes;
        if (index > 0 || index < board.length) {
            return board[index];
        } else {
            return -1;
        }
    }

    window.onload = setup;
    chooseEle.addEventListener('click', setup, false);
})();
