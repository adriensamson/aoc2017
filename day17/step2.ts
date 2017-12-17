import {} from "../lib";

const input = 348;

let zeroPosition = 0;
let valueAfterZero = 0;

let position = 0;

for (let i = 1; i <= 50000000; i++) {
    position = (position + input) % i;
    if (position < zeroPosition) {
        zeroPosition++;
    } else if (position === zeroPosition) {
        valueAfterZero = i;
    }
    position++;
}

console.log(valueAfterZero);