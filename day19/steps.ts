import {readFileSync} from "fs";

const map = readFileSync('day19/input').toString('utf8').split('\n');

let letters = '';
let dir = 'down';
let pos = {x: map[0].indexOf('|'), y: 0};
let steps = 1;

w: while (true) {
    switch (dir) {
        case 'down':
            pos.y++;
            break;
        case 'up':
            pos.y--;
            break;
        case 'left':
            pos.x--;
            break;
        case 'right':
            pos.x++;
            break;
    }
    steps++;
    switch (map[pos.y][pos.x]) {
        case '|':
        case '-':
            continue;
        case '+':
            const around = {
                up: map[pos.y-1] && map[pos.y-1][pos.x] || ' ',
                down: map[pos.y+1] && map[pos.y+1][pos.x] || ' ',
                left: map[pos.y][pos.x-1] || ' ',
                right: map[pos.y][pos.x+1] || ' ',
            };
            const from = {
                up: 'down',
                down: 'up',
                left: 'right',
                right: 'left',
            }[dir];
            dir = Object.keys(around).find(k => k !== from && around[k] !== ' ');
            break;
        case ' ':
            steps--;
            break w;
        default:
            letters += map[pos.y][pos.x];
            break;
    }
}

console.log(letters);
console.log(steps);