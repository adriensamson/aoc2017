import {getContent} from "../lib";

const instrs = getContent('day18/input').split('\n');
//const instrs = getContent('day18/test').split('\n');

const registers = new Map<string, number>();

function getValue(arg : string) : number {
    if (parseInt(arg, 10).toString() === arg) {
        return parseInt(arg, 10);
    }
    if (registers.has(arg)) {
        return registers.get(arg);
    }
    return 0;
}

let freq = 0;

let i = 0;

while (i >= 0 && i < instrs.length) {
    const inst = instrs[i];
    const op = inst.slice(0, 3);
    const arg1 = inst.slice(4, 5);
    const arg2 = inst.slice(6);
    let offset = 1;
    switch (op) {
        case 'snd':
            freq = getValue(arg1);
            break;
        case 'set':
            registers.set(arg1, getValue(arg2));
            break;
        case 'add':
            registers.set(arg1, getValue(arg1) + getValue(arg2));
            break;
        case 'mul':
            registers.set(arg1, getValue(arg1) * getValue(arg2));
            break;
        case 'mod':
            registers.set(arg1, getValue(arg1) % getValue(arg2));
            break;
        case 'rcv':
            if (getValue(arg1) !== 0) {
                console.log(freq);
                process.exit(0);
            }
            break;
        case 'jgz':
            if (getValue(arg1) > 0) {
                offset = getValue(arg2);
            }
            break;
        default:
            throw new Error(inst.slice(0,3));
    }
    i += offset;
}

console.log(registers);