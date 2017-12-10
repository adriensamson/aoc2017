
import {getContent} from "../lib";

const SIZE = 256;
const input = getContent('day10/input');
const lengths = input.split('').map(s => s.charCodeAt(0)).concat([17, 31, 73, 47, 23]);


const list = [];
for (let i = 0; i < SIZE; i++) {
    list.push(i);
}

let current = 0;
let skipSize = 0;

for (let round = 0; round < 64; round++) {

    lengths.forEach(l => {
        const end = current + l;
        if (end < SIZE) {
            const select = list.slice(current, current + l);
            const reverse = select.reverse();
            list.splice(current, l, ...reverse);
        } else {
            // list = [0, ..., end - SIZE - 1, ..., current, ..., SIZE -1]
            // select/reverse => [0 : current, ..., SIZE - 1 - current : SIZE - 1] + [SIZE - current : 0, l - 1: end - SIZE - 1]
            const select = list.slice(current).concat(list.slice(0, end - SIZE));
            const reverse = select.reverse();
            list.splice(0, end - SIZE, ...reverse.slice(SIZE - current));
            list.splice(current, SIZE - current, ...reverse.slice(0, SIZE - current));
        }
        current = (current + l + skipSize) % SIZE;
        skipSize++;
    });
}

let str = "";
for (let h = 0; h < 16; h++) {
    const val = list[16 * h] ^ list[16 * h + 1] ^ list[16 * h + 2] ^ list[16 * h + 3]
        ^ list[16 * h + 4] ^ list[16 * h + 5] ^ list[16 * h + 6] ^ list[16 * h + 7]
        ^ list[16 * h + 8] ^ list[16 * h + 9] ^ list[16 * h + 10] ^ list[16 * h + 11]
        ^ list[16 * h + 12] ^ list[16 * h + 13] ^ list[16 * h + 14] ^ list[16 * h + 15];
    str += ('00' + val.toString(16)).slice(-2);
}

console.log(str);