import {getContent} from "../lib";

const banks = getContent('day6/input').split('\t').map(n => parseInt(n, 10));
//const banks = [0, 2, 7, 0];

const seen = [];

function hasBeenSeen(banks) {
    return seen.some(b => b.join(',') === banks.join(','));
}

while (!hasBeenSeen(banks)) {
    seen.push(banks.slice());
    const max = Math.max(...banks);
    const iMax = banks.findIndex(b => b === max);
    banks[iMax] = 0;
    for (let i = 1; i <= max; i++) {
        banks[(iMax + i) % banks.length]++;
    }
}

console.log(seen.length);
console.log(seen.length - seen.findIndex(s => s.join(',') === banks.join(',')));