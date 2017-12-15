export const plop = '';

let a = 679;
let b = 771;

const aFact = 16807;
const bFact = 48271;
const mod = 2147483647;

function nextStepA() {
    a = a * aFact % mod;
    while (a % 4 !== 0) {
        a = a * aFact % mod;
    }
}

function nextStepB() {
    b = b * bFact % mod;
    while (b % 8 !== 0) {
        b = b * bFact % mod;
    }
}

let count = 0;

for (let i = 0; i < 5000000; i++) {
    nextStepA();
    nextStepB();
    if ((a % 65536) === (b % 65536)) {
        count++;
    }
}

console.log(count);