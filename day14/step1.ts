import {knotHash} from "../day10/knot-hash";

const input = 'hwlqcszp';

function countOnes(str16 : string) {
    let n = 0;
    for (let i = 0; i < str16.length; i++) {
        const str2 = parseInt(str16[i], 16).toString(2);
        n += str2.split('').filter(c => c === '1').length;
    }
    return n;
}

let count = 0;

for (let i = 0; i < 128; i++) {
    count += countOnes(knotHash(input + '-' + i));
}

console.log(count);