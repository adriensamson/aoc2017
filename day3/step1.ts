console.log(getSteps(1));
console.log(getSteps(12));
console.log(getSteps(23));
console.log(getSteps(1024));
console.log(getSteps(265149));

function getSteps(i : number) {
    const r = getRound(i);
    if (r === 0) {
        return 0;
    }
    const min =  Math.pow(2 * r - 1, 2) + 1;
    const max = Math.pow((2 * r + 1), 2);
    const segSize = (max - min + 1) / 4;
    const segPos = (i - min) % segSize;
    return r + Math.abs(segPos + 1 - segSize/2);
}

function getRound(i: number) {
    const sqrt = Math.ceil(Math.sqrt(i));
    return Math.floor(sqrt / 2);
}
