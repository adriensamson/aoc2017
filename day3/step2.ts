const grid = new Map();

let x = 0, y = 0, r = 0, n = 1;
let min = Math.pow(2 * r - 1, 2) + 1;
let max = Math.pow((2 * r + 1), 2);
let segSize = (max - min + 1) / 4;

grid.set(`${x} ${y}`, 1);

while (true) {
    n++;
    if (n > max) {
        r++;
        min = Math.pow(2 * r - 1, 2) + 1;
        max = Math.pow((2 * r + 1), 2);
        segSize = (max - min + 1) / 4;
        x++;
    } else if (n >= min + 3 * segSize) {
        x++;
    } else if (n >= min + 2 * segSize) {
        y--;
    } else if (n >= min + segSize) {
        x--;
    } else {
        y++;
    }
    const sum = (grid.get(`${x+1} ${y}`) || 0)
        + (grid.get(`${x+1} ${y+1}`) || 0)
        + (grid.get(`${x} ${y+1}`) || 0)
        + (grid.get(`${x-1} ${y+1}`) || 0)
        + (grid.get(`${x-1} ${y}`) || 0)
        + (grid.get(`${x-1} ${y-1}`) || 0)
        + (grid.get(`${x} ${y-1}`) || 0)
        + (grid.get(`${x+1} ${y-1}`) || 0);
    console.log(sum);
    grid.set(`${x} ${y}`, sum);
    if (sum > 265149) {
        process.exit(0);
    }
}