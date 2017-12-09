import {getContent} from "../lib";

const input = getContent('day9/input');

const state = {
    i: 1,
    depth: 1,
    score: 0,
    inGarbage: 0,
};

while (state.i < input.length) {
    switch (input[state.i]) {
        case '{':
            state.depth++;
            break;
        case '}':
            state.score += state.depth;
            state.depth--;
            break;
        case '<':
            state.i++;
            garbage: while (state.i < input.length) {
                switch (input[state.i]) {
                    case '>':
                        break garbage;
                    case '!':
                        state.i += 2;
                        break;
                    default:
                        state.inGarbage++;
                        state.i++;
                }
            }
            break;
        case '!':
            state.i++;
            break;
        case ',':
            break;
        default:
            throw new Error('Unexpected '+ input[state.i]);
    }
    state.i++;
}

console.log(state.score);
console.log(state.inGarbage);