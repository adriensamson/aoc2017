import {getContent} from "../lib";

const steps = getContent('day11/input').split(',');

let x = 0, y = 0;

steps.forEach(step => {
    switch (step) {
        case 'n':
            y++;
            break;
        case 'ne':
            x++;
            y += .5;
            break;
        case 'se':
            x++;
            y -= .5;
            break;
        case 's':
            y--;
            break;
        case 'sw':
            x--;
            y -= .5;
            break;
        case 'nw':
            x--;
            y += .5;
            break;
    }
});

console.log(x, y);

const xpos = Math.abs(x);
const ypos = Math.abs(y);

const diag = Math.min(xpos, ypos * 2);
console.log(diag + Math.abs(ypos - diag * 0.5));