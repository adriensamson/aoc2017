export const plop = '';

let a = 679;
let b = 771;

const aFact = 16807;
const bFact = 48271;
const mod = 2147483647;

function nextStep() {
    a = a * aFact % mod;
    b = b * bFact % mod;
}

let count = 0;

for (let i = 0; i < 40000000; i++) {
    nextStep();
    if ((a % 65536) === (b % 65536)) {
        count++;
    }
}

console.log(count);