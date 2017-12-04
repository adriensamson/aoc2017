import {getContent} from "../lib";

const lines = getContent('day4/input').split('\n');

const sum = lines.reduce((sum, line) => {
    const words = line.split(' ');
    if (words.some((w, i) => words.slice(i + 1).indexOf(w) !== -1)) {
        return sum;
    }
    return sum + 1;
}, 0);

console.log(sum);