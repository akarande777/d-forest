declare type Path = Array<string | number>;
declare type Callback<T> = (node: any, depth: number, path: Path) => T;
declare type Reducer<T> = (acc: T, node: any, depth: number, path: Path) => T;
declare class Forest {
    forEachLeaf: (data: any, callback: Callback<void>) => void;
    forEachNode: (data: any, callback: Callback<void>) => void;
    findLeaf: <Type>(data: any, callback: Callback<boolean>) => Type;
    findNode: <Type>(data: any, callback: Callback<boolean>) => Type;
    everyLeaf: (data: any, callback: Callback<boolean>) => boolean;
    everyNode: (data: any, callback: Callback<boolean>) => boolean;
    findLeaves: <Type>(data: any, callback: Callback<boolean>) => Type[];
    findNodes: <Type>(data: any, callback: Callback<boolean>) => Type[];
    mapLeaves: <Type>(data: any, callback: Callback<Type>, level?: number) => Type[];
    minHeight: (data: any) => number;
    maxHeight: (data: any) => number;
    nodesByLevel: <Type>(data: any, level: number) => Type[];
    reduce: <Type>(data: any, callback: Reducer<Type>, initial: Type) => Type[];
    hierarchy: (data: any, callback: Callback<boolean>) => any[];
    findPath: (data: any, callback: Callback<boolean>) => Path;
    findByPath: <Type>(data: any, path: Path) => Type;
    removeByPath: (data: any, path: Path) => any;
    removeNodes: (data: any, callback: Callback<boolean>) => any;
}
declare const _default: Forest;
export default _default;
