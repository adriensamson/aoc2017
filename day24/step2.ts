import {getContent} from "../lib";

const components = getContent('day24/input').split('\n').map(c => c.split('/').map(n => parseInt(n, 10)));

function getMaxWeight(currentWeight, currentLength, currentPort, remaining) {
    const usable = remaining.filter(c => c[0] === currentPort || c[1] === currentPort);
    if (usable.length === 0) {
        return {weight: currentWeight + currentPort, length: currentLength};
    }
    const weightsAndLength = usable.map(c => {
        const nextPort = c[0] === currentPort ? c[1] : c[0];
        const nextRemaining = remaining.filter((r, i) => i !== remaining.indexOf(c));
        return getMaxWeight(currentWeight + 2 * currentPort, currentLength + 1, nextPort, nextRemaining);
    });
    return weightsAndLength.sort((wl1, wl2) => {
        if (wl1.length < wl2.length) {
            return 1;
        } else if (wl2.length < wl1.length) {
            return -1;
        }
        if (wl1.weight < wl2.weight) {
            return 1;
        } else if (wl2.weight < wl1.weight) {
            return -1;
        }
        return 0;
    })[0];
}

console.log(getMaxWeight(0, 0, 0, components).weight);