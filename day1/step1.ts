import {getContent} from "../lib";

const content = getContent('day1/input');

let sum = 0;

for (let i = 0; i < content.length; i++) {
    if (i === content.length - 1) {
        if (content[i] === content[0]) {
            sum += parseInt(content[i], 10);
        }
    } else if (content[i] === content[i + 1]) {
        sum += parseInt(content[i], 10);
    }
}

console.log(sum);