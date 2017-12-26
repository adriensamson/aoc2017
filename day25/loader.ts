import {getContent} from "../lib";

export function loadConfig(filename : string) {
    let begin = null;
    let nb = null;
    let currentState = null;
    let currentValue = null;
    const states = new Map();
    getContent(filename).split('\n').forEach(row => {
        let matches;
        if (matches = /Begin in state (\w)./.exec(row)) {
            begin = matches[1];
        } else if (matches = /Perform a diagnostic checksum after (\d+) steps./.exec(row)) {
            nb = parseInt(matches[1], 10);
        } else if (matches = /In state (\w):/.exec(row)) {
            currentState = new Map();
            states.set(matches[1], currentState);
        } else if (matches = /If the current value is ([01]):/.exec(row)) {
            currentValue = {write: null, move: null, next: null};
            currentState.set(parseInt(matches[1], 10), currentValue);
        } else if (matches = /- Write the value ([01])./.exec(row)) {
            currentValue.write = parseInt(matches[1], 10);
        } else if (matches = /- Move one slot to the (left|right)./.exec(row)) {
            currentValue.move = matches[1];
        } else if (matches = /- Continue with state (\w)./.exec(row)) {
            currentValue.next = matches[1];
        }
    });

    return {states, begin, nb};
}