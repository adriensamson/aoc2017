import {getContent} from "../lib";

let a = 1;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
let g = 0;
let h = 0;

for (b = 106700; b <= 123700; b += 17) {
    f = 1;
    for (d = 2; d < Math.sqrt(b); d++) {
        const truc = b / d;
        if (parseInt(truc.toFixed(0), 10) === truc) {
            f = 0;
            break;
        }
    }
    if (f === 0) {
        h++;
    }
}

console.log(h);