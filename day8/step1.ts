import {getContent} from "../lib";

const lines = getContent('day8/input').split('\n');

const insts = lines.map(line => {
    const words = line.split(' ');
    return {
        register: words[0],
        action: words[1],
        howMany : parseInt(words[2], 10),
        compareReg: words[4],
        compareOp: words[5],
        compareTo: parseInt(words[6], 10),
    }
});

const registers = new Map();

insts.forEach(inst => registers.set(inst.register, 0));

insts.forEach(inst => {
    if (doCompare(inst)) {
        doExecute(inst);
    }
});

console.log(Math.max(...Array.from(registers.values())));

function doCompare(inst) {
    const a = registers.get(inst.compareReg);
    const b = inst.compareTo;
    switch (inst.compareOp) {
        case '<':
            return a < b;
        case '>':
            return a > b;
        case '<=':
            return a <= b;
        case '>=':
            return a >= b;
        case '==':
            return a === b;
        case '!=':
            return a != b;
        default:
            throw new Error('Unknown operator: ' + inst.compareOp);
    }
}

function doExecute(inst) {
    let val = registers.get(inst.register);
    switch (inst.action) {
        case 'inc':
            val += inst.howMany;
            break;
        case 'dec':
            val -= inst.howMany;
            break;
        default:
            throw new Error('Unknown action: ' + inst.action);
    }
    registers.set(inst.register, val);
}