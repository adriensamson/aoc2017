import {getContent} from "../lib";

const lines = getContent('day4/input').split('\n');

const sum = lines.reduce((sum, line) => {
    const words = line.split(' ');
    if (words.some((w, i) => words.slice(i + 1).some(w2 => areAnagrams(w, w2)))) {
        return sum;
    }
    return sum + 1;
}, 0);

console.log(sum);

function areAnagrams(w1 : string, w2 : string) {
    return w1.split('').sort().join() === w2.split('').sort().join();
}