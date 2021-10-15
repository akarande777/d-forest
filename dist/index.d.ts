declare type Path = Array<string | number>;
declare type Callback<T> = (node: any, depth: number, path: Path) => T;
declare type Reducer = (prev: any, curr: any, depth: number, path: Path) => any;
declare class Forest {
    forEachLeaf(data: any, callback: Callback<void>): void;
    forEachNode(data: any, callback: Callback<void>): void;
    findLeaf(data: any, callback: Callback<boolean>): any;
    findNode(data: any, callback: Callback<boolean>): any;
    everyLeaf(data: any, callback: Callback<boolean>): boolean;
    everyNode(data: any, callback: Callback<boolean>): boolean;
    findLeaves(data: any, callback: Callback<boolean>): any[];
    findNodes(data: any, callback: Callback<boolean>): any[];
    mapLeaves(data: any, callback: Callback<any>): any[];
    minHeight(data: any): number;
    maxHeight(data: any): number;
    nodesByLevel(data: any, level: number): any[];
    reduce(data: any, callback: Reducer, initial: any): any[];
    hierarchy(data: any, callback: Callback<boolean>): any[];
    findPath(data: any, callback: Callback<boolean>): Path;
}
declare const _default: Forest;
export default _default;
