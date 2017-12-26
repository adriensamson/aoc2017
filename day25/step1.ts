import {loadConfig} from "./loader";

const config = loadConfig('day25/input');

const tape = new Map();
let cursor = 0;
let state = config.begin;

for (let i = 0; i < config.nb; i++) {
    const {move, write, next} = config.states.get(state).get(tape.get(cursor) || 0);
    tape.set(cursor, write);
    if (move === 'right') {
        cursor++;
    } else {
        cursor--;
    }
    state = next;
}

console.log(Array.from(tape.values()).filter(v => v === 1).length);