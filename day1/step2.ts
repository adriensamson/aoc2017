import {getContent} from "../lib";

const content = getContent('day1/input');

let sum = 0;

for (let i = 0; i < content.length; i++) {
    if (content[i] === content[(i + content.length/2) % content.length]) {
        sum += parseInt(content[i], 10);
    }
}

console.log(sum);