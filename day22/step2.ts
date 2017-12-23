import {getContent, Matrix} from "../lib";

const matrix = new Matrix<number>();

const input = getContent('day22/input').split('\n');

const offsetRow = (input.length - 1) / 2;
const offsetCol = (input[0].length - 1) / 2;

input.forEach((row, y) => {
    row.split('').forEach((char, x) => {
        matrix.set(x - offsetCol, y - offsetRow, char === '#' ? 2 : 0);
    });
});

const pos = {
    x: 0,
    y: 0,
};

let dir = 0;

let infections = 0;

for (let i = 0; i < 10000000; i++) {
    switch (matrix.get(pos.x, pos.y, 0)) {
        case 0:
            dir = (dir + 3) % 4;
            break;
        case 1:
            infections++;
            break;
        case 2:
            dir = (dir + 1) % 4;
            break;
        case 3:
            dir = (dir + 2) % 4;
    }
    matrix.set(pos.x, pos.y, (matrix.get(pos.x, pos.y, 0) + 1) % 4);
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