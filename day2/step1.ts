import {getContent} from "../lib";

const input = getContent('day2/input');

const rows = input.split('\n');

let checksum = 0;

for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].split('\t').map(d => parseInt(d, 10));
    const min = Math.min(...cols);
    const max = Math.max(...cols);
    checksum += max - min;
}

console.log(checksum);