import {getContent} from "../lib";

const rules = new Map();

getContent('day21/input').split('\n').forEach(line => rules.set(line.slice(0, line.indexOf(' ')), line.slice(line.indexOf('=> ') + 3)));

let drawing = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
];

function createDrawing(s) {
    const d = [];
    for (let i = 0; i < s; i++) {
        d[i] = [];
        for (let j = 0; j < s; j++) {
            d[i][j] = '?';
        }
    }
    return d;
}

function getDrawingPart(drawing, x, y, s) {
    return drawing.slice(y * s, (y + 1) * s).map(row => row.slice(x * s, (x+1) * s).join('')).join('/');
}

function setDrawingPart(drawing, x, y, s, art) {
    for (let i = 0; i < s; i++) {
        for (let j = 0; j < s; j++) {
            drawing[y * s + i][x * s + j] = art[i * (s + 1) + j];
        }
    }
}

function findRule(str) {
    if (rules.has(str)) {
        return rules.get(str);
    }
    const rot1 = rotate(str);
    if (rules.has(rot1)) {
        return rules.get(rot1);
    }
    const rot2 = rotate(rot1);
    if (rules.has(rot2)) {
        return rules.get(rot2);
    }
    const rot3 = rotate(rot2);
    if (rules.has(rot3)) {
        return rules.get(rot3);
    }
    const flip0 = flipH(str);
    if (rules.has(flip0)) {
        return rules.get(flip0);
    }
    const flip1 = rotate(flip0);
    if (rules.has(flip1)) {
        return rules.get(flip1);
    }
    const flip2 = rotate(flip1);
    if (rules.has(flip2)) {
        return rules.get(flip2);
    }
    const flip3 = rotate(flip2);
    if (rules.has(flip3)) {
        return rules.get(flip3);
    }
    throw new Error('Not found');
}

function rotate(str) {
    const a = str.split('/').map(s => s.split(''));
    const b = createDrawing(a.length);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length; j++) {
            b[i][j] = a[j][a.length - 1 - i];
        }
    }
    return b.map(r => r.join('')).join('/');
}

function flipH(str) {
    return str.split('/').reverse().join('/')
}

function pixelsOn(drawing) {
    return drawing.reduce((t, r) => t + r.filter(c => c === '#').length, 0);
}

for (let i = 0; i < 18; i++) {
    let div = drawing.length % 2 === 0 ? 2 : 3;
    const newDrawing = createDrawing(drawing.length / div * (div + 1));
    for (let x = 0; x < drawing.length / div; x++) {
        for (let y = 0; y < drawing.length / div; y++) {
            setDrawingPart(newDrawing, x, y, div + 1, findRule(getDrawingPart(drawing, x, y, div)));
        }
    }

    drawing = newDrawing;
    if (i === 4 || i === 17) {
        console.log(pixelsOn(drawing));
    }
}

