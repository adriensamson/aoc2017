import {getContent} from "../lib";

const SIZE = 16;

const input = getContent('day16/input');

function createWhere() : string[] {
    let where = [];
    for (let i = 0; i < SIZE; i++) {
        where[i] = String.fromCharCode(97 + i);
    }
    return where;
}

function applyFile(where0 : string[]) : string[] {
    let where = where0.slice(0);
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
    return where;
}

const where0 = createWhere();

const seen = [where0.join('')];

let where = where0;
let boucleDeb = null;
let boucleFin = null;
for (let i = 1; i <= 100; i++) {
    where = applyFile(where);
    const idx = seen.indexOf(where.join(''));

    if (idx === -1) {
        seen.push(where.join(''));
    } else {
        if (boucleDeb === null) {
            boucleDeb = idx;
            boucleFin = i;
        }
        console.log(i, idx);
        console.log(where.join(''));
        console.log(seen[(i % (boucleFin - boucleDeb)) + boucleDeb]);
        break;
    }
}

console.log(seen[(1000000000 % (boucleFin - boucleDeb)) + boucleDeb]);