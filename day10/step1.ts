
import {getContent} from "../lib";

//const lengths = [3, 4, 1, 5];
const SIZE = 256;
const lengths = getContent('day10/input').split(',').map(n => parseInt(n, 10));


const list = [];
for (let i = 0; i < SIZE; i++) {
    list.push(i);
}

let current = 0;
let skipSize = 0;

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

console.log(list[0] * list[1]);