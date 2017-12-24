import {getContent} from "../lib";

const components = getContent('day24/input').split('\n').map(c => c.split('/').map(n => parseInt(n, 10)));

function getMaxWeight(currentWeight, currentPort, remaining) {
    const usable = remaining.filter(c => c[0] === currentPort || c[1] === currentPort);
    if (usable.length === 0) {
        return currentWeight + currentPort;
    }
    const weights = usable.map(c => {
        const nextPort = c[0] === currentPort ? c[1] : c[0];
        const nextRemaining = remaining.filter((r, i) => i !== remaining.indexOf(c));
        return getMaxWeight(currentWeight + 2 * currentPort, nextPort, nextRemaining);
    });
    return Math.max(...weights);
}

console.log(getMaxWeight(0, 0, components));