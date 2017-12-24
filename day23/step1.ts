import {getContent} from "../lib";

const instrs = getContent('day23/input').split('\n');

const registers = new Map();
'abcdefgh'.split('').forEach(c => registers.set(c, 0));

function registerOrValue(str) {
    if (parseInt(str, 10).toString(10) === str) {
        return parseInt(str, 10);
    }
    return registers.get(str);
}

let i = 0;
let nbmul = 0;

while (i >= 0 && i < instrs.length) {
    const ops = instrs[i].split(' ');
    let offset = 1;
    switch (ops[0]) {
        case 'set':
            registers.set(ops[1], registerOrValue(ops[2]));
            break;
        case 'sub':
            registers.set(ops[1], registers.get(ops[1]) - registerOrValue(ops[2]));
            break;
        case 'mul':
            registers.set(ops[1], registers.get(ops[1]) * registerOrValue(ops[2]));
            nbmul++;
            break;
        case 'jnz':
            if (registerOrValue(ops[1]) !== 0) {
                offset = registerOrValue(ops[2]);
            }
            break;
    }
    i += offset;
}

console.log(nbmul);