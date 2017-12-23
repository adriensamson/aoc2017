import {getContent} from "../lib";

const particles = [];

getContent('day20/input').split('\n').forEach((line, i) => {
    const matches = /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/.exec(line);
    particles.push({
        i,
        p: [parseInt(matches[1], 10), parseInt(matches[2], 10),parseInt(matches[3], 10)],
        v: [parseInt(matches[4], 10), parseInt(matches[5], 10),parseInt(matches[6], 10)],
        a: [parseInt(matches[7], 10), parseInt(matches[8], 10),parseInt(matches[9], 10)],
        collides: false,
    })
});

// v(1) = v + a ; pos(1) = p + v + a
// v(2) = v + 2a ; pos(2) = p + v + a + v + 2a = p + 2v + 3a
// v(3) = v + 3a ; pos(3) = p + 2v + 3a + v + 3a = p + 3v + 6a
// v(4) = v + 4a ; pos(4) = p + 4v + 10a
// pos(5) = p + 5v + 15a
// pos(t) = p + v * t + a * t(t+1)/2 = p + t * (v + a/2) + t^2 * a/2

function pos(part, t) {
    return [
        part.p[0] + t * part.v[0] + t * (t + 1) / 2 * part.a[0],
        part.p[1] + t * part.v[1] + t * (t + 1) / 2 * part.a[1],
        part.p[2] + t * part.v[2] + t * (t + 1) / 2 * part.a[2],
    ];
}

function collidesAxes(part1, part2, axe) {
    const a = (part1.a[axe] - part2.a[axe]) / 2;
    const b = part1.v[axe] - part2.v[axe] + (part1.a[axe] - part2.a[axe]) / 2;
    const c = part1.p[axe] - part2.p[axe];

    if (a === 0) {
        return null;
    }

    const delta = b * b - (4 * a * c);
    if (delta < 0) {
        return [];
    }
    if (delta === 0) {
        return [-b / (2 * a)].filter(n => parseInt(n.toFixed(0), 10) === n);
    }
    return [(-b + Math.sqrt(delta) ) / (2 * a), (-b - Math.sqrt(delta) ) / (2 * a)].filter(n => parseInt(n.toFixed(0), 10) === n);
}

function collides(part1, part2) {
    let sols = collidesAxes(part1, part2, 0);
    if (sols === null) {
        sols = collidesAxes(part1, part2, 1);
    }
    if (sols === null) {
        sols = collidesAxes(part1, part2, 2);
    }
    if (sols === null || sols.length === 0) {
        return false;
    }
    return sols.some(t => pos(part1, t).join() === pos(part2, t).join());
}

for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
        if (collides(particles[i], particles[j])) {
            particles[i].collides = true;
            particles[j].collides = true;
        }
    }
}

console.log(particles.filter(p => !p.collides).length);