'use strict';

let player = 'circle';

const addClass = (event) => {
    event.target.classList.add(`board__field--${player}`);
    event.target.disabled = true;

    if (player === 'circle') {
        player = 'cross';
    } else {
        player = 'circle';
    }

    document.querySelector('.icon--player').src = `images/${player}.svg`;

    if (isWinningMove(event.target)) {
        if (getSymbol(event.target) === 'circle') {
            const confirmation = confirm(
                `Vyhrává kolečko. Přejete si hrát znovu?`,
            );
            if (confirmation === true) {
                location.reload();
            }
        } else if (getSymbol(event.target) === 'cross') {
            const confirmation = confirm(
                'Vyhrává křížek. Přejete si hrát znovu?',
            );
            if (confirmation === true) {
                location.reload();
            }
        }
    }
};

const buttonElms = document.querySelectorAll('button');

for (let i = 0; i < buttonElms.length; i++) {
    buttonElms[i].addEventListener('click', addClass);
}

/* funkce pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined */
const getSymbol = (field) => {
    if (field.classList.contains('board__field--circle')) {
        return 'circle';
    } else if (field.classList.contains('board__field--cross')) {
        return 'cross';
    } else {
        return undefined;
    }
};

/* funkce pro číslo řádku a sloupce vrátí příslušný prvek */
const getField = (row, column) => buttonElms[row * 10 + column];

/* funkce pro dané políčko vrátí objekt s číslem řádku a sloupce */
const getPosition = (field) => {
    let fieldIndex = 0;
    while (fieldIndex < buttonElms.length && field !== buttonElms[fieldIndex]) {
        fieldIndex += 1;
    }
    return {
        row: Math.floor(fieldIndex / 10),
        column: fieldIndex % 10,
    };
};

/* funkce zjistí, jestli je tah výherní */
const isWinningMove = (field) => {
    const position = getPosition(field);
    const symbol = getSymbol(field);

    let i;

    let inRow = 1;
    i = position.column;
    while (i > 0 && symbol === getSymbol(getField(position.row, i - 1))) {
        inRow += 1;
        i -= 1;
    }

    i = position.column;
    while (i < 10 - 1 && symbol === getSymbol(getField(position.row, i + 1))) {
        inRow += 1;
        i += 1;
    }

    if (inRow >= 5) {
        return true;
    }

    let inColumn = 1;

    i = position.row;
    while (i > 0 && symbol === getSymbol(getField(i - 1, position.column))) {
        inColumn += 1;
        i -= 1;
    }

    i = position.row;
    while (
        i < 10 - 1 &&
        symbol === getSymbol(getField(i + 1, position.column))
    ) {
        inColumn += 1;
        i += 1;
    }

    if (inColumn >= 5) {
        return true;
    }

    return false;
};
