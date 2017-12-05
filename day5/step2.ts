import {getContent} from "../lib";

const instrs = getContent('day5/input').split('\n').map(n => parseInt(n, 10));

let i = 0;
let n = 0;

while (true) {
    const newI = i + instrs[i];
    if (instrs[i] >= 3) {
        instrs[i]--;
    } else {
        instrs[i]++;
    }
    i = newI;
    n++;
    if (i < 0 || i >= instrs.length) {
        break;
    }
}

console.log(n);