//1 Deposit some money
//2 Determine number of lines to bet on
//3 Collect a bet amount
//4 Spin the lot machine
//5 User won?
//6 Give the reward
//7 play again

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOLS_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberAmount = parseFloat(depositAmount);

        if (isNaN(numberAmount) || numberAmount <= 0 ){
            console.log("Invalid deposit amount. Try again");
        } else {
            return numberAmount;
        }
    }
}

const betOn = () => {
    while (true) {
        const lineAmount = prompt("Enter a number of lines to bet on(1-3): ")
        const numberOfLines = parseFloat(lineAmount);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines. Try again");
        } else {
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ")
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet. Try again");
        } else {
            return numberBet;
        }
    }
}


const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];

        for (let j = 0; j < ROWS; j++) {
            const randomIndex =Math.floor(Math.random() * reelSymbols.length);
            const selected = reelSymbols[randomIndex];
            reels[i].push(selected);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowStr = ""; 
        for (const [i, symbol] of row.entries()) {
            rowStr += symbol;
            if ( i != row.length - 1) {
                rowStr += " | ";
            }
        }
        console.log(rowStr);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if ( symbol != symbols[0]) {
                allSame = false;
                break;
            }
        };

        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const game = () => {
    let balance = deposit();
   
    while (true) {
        console.log("Current balance: " + balance + "$");
        const lines = betOn();
        let bet = getBet(balance, lines);
        balance -= bet * lines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        console.log("You won " + winnings + "$");
        if (balance <= 0) {
            console.log("You ran out of money");
            break;
        }

        const exit = prompt("Enter e to exit ");
        if (exit == "e") break;
        console.log("\n\n\n\n\n");
    }
}

game();
console.log("Quit gambling!!!")
