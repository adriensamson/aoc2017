import {getContent} from "../lib";

const particles = [];

getContent('day20/input').split('\n').forEach((line, i) => {
    const matches = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/.exec(line);
    particles.push({
        i,
        p: [parseInt(matches[1], 10), parseInt(matches[2], 10),parseInt(matches[3], 10)],
        v: [parseInt(matches[4], 10), parseInt(matches[5], 10),parseInt(matches[6], 10)],
        a: [parseInt(matches[7], 10), parseInt(matches[8], 10),parseInt(matches[9], 10)],
    })
});

function norm(v : [number, number, number]) {
    return Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2]);
}

particles.sort((p1, p2) => {
    const a1 = norm(p1.a);
    const a2 = norm(p2.a);
    if (a1 < a2) {
        return -1;
    }
    if (a1 > a2) {
        return 1;
    }
    const v1 = norm(p1.v);
    const v2 = norm(p2.v);
    if (v1 < v2) {
        return -1;
    }
    if (v1 > v2) {
        return 1;
    }
    const pos1 = norm(p1.p);
    const pos2 = norm(p2.p);
    if (pos1 < pos2) {
        return -1;
    }
    if (pos1 > pos2) {
        return 1;
    }
    return 0;
});

console.log(particles[0].i);