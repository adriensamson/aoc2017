import {readFileSync} from 'fs';

export function getContent(filename : string) : string {
    return readFileSync(filename).toString('utf8').trim();
}

export function getLines(filename : string) : string[] {
    return getContent(filename).split('\n');
}

export class Matrix<T> {
    private map  = new Map<string, T>();
    private minX = 0;
    private maxX = 0;
    private minY = 0;
    private maxY = 0;

    get<U = T>(x : number, y : number, def : T | U = null) : T | U {
        if (!this.map.has(`${x} ${y}`)) {
            return def;
        }
        return this.map.get(`${x} ${y}`)!;
    }

    set(x : number, y : number, val : T) {
        this.map.set(`${x} ${y}`, val);
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        this.minY = Math.min(this.minY, y);
        this.maxY = Math.max(this.maxY, y);
    }

    toString() {
        let str = '';
        for (let y = this.minY; y <= this.maxY; y++) {
            for (let x = this.minX; x <= this.maxX; x++) {
                str += this.get(x, y, ' ');
                if (x < this.maxX) {
                    str += '\t';
                }
            }
            if (y < this.maxY) {
                str += '\n';
            }
        }
        return str;
    }
}