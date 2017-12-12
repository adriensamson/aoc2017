import {getContent} from "../lib";

const lines = getContent('day12/input').split('\n');

const map = new Map<number, Set<number>>();

function addLink(left : number, right : number) {
    if (!map.has(left)) {
        map.set(left, new Set());
    }
    const arr = map.get(left)!;
    arr.add(right);
}

function addLinks(left : number, rights : number[]) {
    rights.forEach(right => {
        addLink(left, right);
        //addLink(right, left);
    });
}

lines.forEach(line => {
    const [leftStr, rightStr] = line.split(' <-> ');
    const left = parseInt(leftStr);
    const rights = rightStr.split(', ').map(n => parseInt(n, 10));
    addLinks(left, rights);
});

const groups = [];

function addInGroup(group : Set<number>, n : number) {
    if (group.has(n)) {
        return;
    }
    group.add(n);
    Array.from(map.get(n).values()).forEach(right => addInGroup(group, right));
}

Array.from(map.keys()).forEach(n => {
    if (!groups.some(g => g.has(n))) {
        const g = new Set();
        addInGroup(g, n);
        groups.push(g);
    }
});

console.log(groups.length);