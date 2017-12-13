import {getContent} from "../lib";

const lines = getContent('day13/input').split('\n');
const config = new Map<number, number>();

lines.forEach(line => {
    const vals = line.split(': ').map(n => parseInt(n, 10));
    config.set(vals[0], vals[1]);
});

function scannerWillCaught(delay, position) : boolean {
    if (!config.has(position)) {
        return false;
    }
    return (position + delay) % ((config.get(position) - 1) * 2) === 0;
}

const max = Math.max(...Array.from(config.keys()));

function isCaught(delay : number) {
    let position = -1;

    while (position <= max) {
        position++;
        if (scannerWillCaught(delay, position)) {
            return true;
        }
    }
    return false;
}

let delay = 0;
while(isCaught(delay)) {
    delay++;
}
console.log(delay);