import {getContent} from "../lib";

const instrs = getContent('day18/input').split('\n');
//const instrs = getContent('day18/test2').split('\n');

const registers0 = new Map<string, number>();
const registers1 = new Map<string, number>();

registers1.set('p', 1);

function getValue0(arg : string) : number {
    if (parseInt(arg, 10).toString() === arg) {
        return parseInt(arg, 10);
    }
    if (registers0.has(arg)) {
        return registers0.get(arg);
    }
    return 0;
}

function getValue1(arg : string) : number {
    if (parseInt(arg, 10).toString() === arg) {
        return parseInt(arg, 10);
    }
    if (registers1.has(arg)) {
        return registers1.get(arg);
    }
    return 0;
}

let sent0 = 0;
let sent1 = 0;

const queue0 = [];
const queue1 = [];

let i0 = 0;
let i1 = 0;

function execute0() {
    while(i0 >= 0 && i0 < instrs.length) {
        const inst = instrs[i0];
        const op = inst.slice(0, 3);
        const arg1 = inst.slice(4, 5);
        const arg2 = inst.slice(6);
        let offset = 1;
        switch (op) {
            case 'snd':
                queue1.push(getValue0(arg1));
                sent0++;
                break;
            case 'set':
                registers0.set(arg1, getValue0(arg2));
                break;
            case 'add':
                registers0.set(arg1, getValue0(arg1) + getValue0(arg2));
                break;
            case 'mul':
                registers0.set(arg1, getValue0(arg1) * getValue0(arg2));
                break;
            case 'mod':
                registers0.set(arg1, getValue0(arg1) % getValue0(arg2));
                break;
            case 'rcv':
                if (queue0.length === 0) {
                    return;
                }
                registers0.set(arg1, queue0.shift());
                break;
            case 'jgz':
                if (getValue0(arg1) > 0) {
                    offset = getValue0(arg2);
                }
                break;
            default:
                throw new Error(inst.slice(0, 3));
        }
        i0 += offset;
    }
}

function execute1() {
    while(i1 >= 0 && i1 < instrs.length) {
        const inst = instrs[i1];
        const op = inst.slice(0, 3);
        const arg1 = inst.slice(4, 5);
        const arg2 = inst.slice(6);
        let offset = 1;
        switch (op) {
            case 'snd':
                queue0.push(getValue1(arg1));
                sent1++;
                break;
            case 'set':
                registers1.set(arg1, getValue1(arg2));
                break;
            case 'add':
                registers1.set(arg1, getValue1(arg1) + getValue1(arg2));
                break;
            case 'mul':
                registers1.set(arg1, getValue1(arg1) * getValue1(arg2));
                break;
            case 'mod':
                registers1.set(arg1, getValue1(arg1) % getValue1(arg2));
                break;
            case 'rcv':
                if (queue1.length === 0) {
                    return;
                }
                registers1.set(arg1, queue1.shift());
                break;
            case 'jgz':
                if (getValue1(arg1) > 0) {
                    offset = getValue1(arg2);
                }
                break;
            default:
                throw new Error(inst.slice(0, 3));
        }
        i1 += offset;
    }
}

while (true) {
    const inQueue = queue0.length + queue1.length;
    const totalSent = sent0 + sent1;
    execute0();
    execute1();
    if (totalSent === sent0 + sent1 && inQueue === queue0.length + queue1.length) {
        console.log(sent1);
        break;
    }
}
