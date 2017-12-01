import {readFileSync} from 'fs';

export function getContent(filename : string) : string {
    return readFileSync(filename).toString('utf8');
}

export function getLines(filename : string) : string[] {
    return getContent(filename).split('\n');
}
