import {} from "../lib";

const input = 348;

const buffer = [0];
let position = 0;

for (let i = 1; i <= 2017; i++) {
    position = (position + input) % buffer.length;
    buffer.splice(position + 1, 0, i);
    position++;
}

console.log(buffer[(position + 1) % buffer.length]);