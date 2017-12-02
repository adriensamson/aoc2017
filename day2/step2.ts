import {getContent} from "../lib";

const input = getContent('day2/input');

const rows = input.split('\n');

let checksum = 0;

for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].split('\t').map(d => parseInt(d, 10));
    for (let j = 0; j < cols.length - 1; j++) {
        for (let k = j + 1; k < cols.length; k++) {
            if (cols[j] % cols[k] === 0) {
                checksum += cols[j] / cols[k];
            } else if (cols[k] % cols[j] === 0) {
                checksum += cols[k] / cols[j];
            }
        }
    }
}

console.log(checksum);