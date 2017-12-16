import {getContent} from "../lib";

const SIZE = 16;

const input = getContent('day16/input');

let where = [];
for (let i = 0; i < SIZE; i++) {
    where[i] = String.fromCharCode(97 + i);
}

input.split(',').forEach(move => {
    switch (move[0]) {
        case 's':
            const dec = +move.slice(1);
            where = where.slice(-dec).concat(where.slice(0, -dec));
            break;
        case 'x':
            const x1 = +move.slice(1).split('/')[0];
            const x2 = +move.slice(1).split('/')[1];
            const c1 = where[x1];
            const c2 = where[x2];
            where[x1] = c2;
            where[x2] = c1;
            break;
        case 'p':
            const p1 = move.slice(1).split('/')[0];
            const p2 = move.slice(1).split('/')[1];
            const pi1 = where.indexOf(p1);
            const pi2 = where.indexOf(p2);
            where[pi1] = p2;
            where[pi2] = p1;
            break;
    }
});

console.log(where.join(''));