declare type Parent = {
    element: any | any[];
    key: string | number;
};
declare type Callback<T> = (node: any, depth: number, parent: Parent) => T;
declare type Reducer = (prev: any, curr: any, depth: number, parent: Parent) => any;
declare class Forest {
    private data;
    constructor(data: any);
    forEachLeaf: (callback: Callback<void>) => void;
    forEachNode: (callback: Callback<void>) => void;
    findLeaf: (callback: Callback<boolean>) => any;
    findNode: (callback: Callback<boolean>) => any;
    everyLeaf: (callback: Callback<boolean>) => boolean;
    everyNode: (callback: Callback<boolean>) => boolean;
    findLeaves: (callback: Callback<boolean>) => any[];
    findNodes: (callback: Callback<boolean>) => any[];
    mapLeaves: (callback: Callback<any>) => any[];
    minHeight: () => number;
    maxHeight: () => number;
    nodesByLevel: (level: number) => any[];
    reduce: (callback: Reducer, initial: any) => any[];
}
declare const _default: (data: any) => Forest;
export default _default;
