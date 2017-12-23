import {getContent, Matrix} from "../lib";

const matrix = new Matrix();

const input = getContent('day22/input').split('\n');

const offsetRow = (input.length - 1) / 2;
const offsetCol = (input[0].length - 1) / 2;

input.forEach((row, y) => {
    row.split('').forEach((char, x) => {
        matrix.set(x - offsetCol, y - offsetRow, char === '#' ? 1 : 0);
    });
});

const pos = {
    x: 0,
    y: 0,
};

let dir = 0;

let infections = 0;

for (let i = 0; i < 10000; i++) {
    if (matrix.get(pos.x, pos.y) === 1) {
        dir = (dir + 1) % 4;
        matrix.set(pos.x, pos.y, 0);
    } else {
        dir = (dir + 3) % 4;
        infections++;
        matrix.set(pos.x, pos.y, 1);
    }
    switch (dir) {
        case 0:
            pos.y--;
            break;
        case 1:
            pos.x++;
            break;
        case 2:
            pos.y++;
            break;
        case 3:
            pos.x--;
            break;
    }
}

console.log(infections);