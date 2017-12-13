import {getContent} from "../lib";

const lines = getContent('day13/input').split('\n');

const scannerPos = new Map<number, {range: number, position: number, dir: 'inc' | 'dec'}>();

lines.forEach(line => {
    const vals = line.split(': ').map(n => parseInt(n, 10));
    scannerPos.set(vals[0], {range: vals[1], position: 0, dir: 'inc'});
});

const max = Math.max(...Array.from(scannerPos.keys()));

function advanceScanners() {
    scannerPos.forEach(pos => {
        if (pos.dir === 'inc') {
            if (pos.position === pos.range - 1) {
                pos.dir = 'dec';
                pos.position--;
            } else {
                pos.position++;
            }
        } else {
            if (pos.position === 0) {
                pos.dir = 'inc';
                pos.position++;
            } else {
                pos.position--;
            }
        }
    });
}

let severity = 0;
let position = -1;

while (position <= max) {
    position++;
    if (scannerPos.has(position) && scannerPos.get(position).position === 0) {
        severity += position * scannerPos.get(position).range;
    }
    advanceScanners();
}

console.log(severity);