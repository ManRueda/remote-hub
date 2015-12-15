// Type definitions for screenres v2.0.0-rc1
// Project: https://github.com/davidmarkclements/screenres
// Definitions by: Manuel Rueda <https://github.com/manrueda>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "screenres" {
    export function get(): Array<number>;
    export function set(h: number, w: number);
}

