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
};

const buttonElms = document.querySelectorAll('button');

for (let i = 0; i < buttonElms.length; i++) {
    buttonElms[i].addEventListener('click', addClass);
}
