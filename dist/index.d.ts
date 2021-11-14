declare type Path = Array<string | number>;
declare type Callback<T> = (node: any, depth: number, path: Path) => T;
declare type Reducer<T> = (acc: T, node: any, depth: number, path: Path) => T;
declare type PureFn<T> = (value: any) => T;
declare class Forest {
    forEachLeaf: (data: any, callback: Callback<void>) => void;
    forEachNode: (data: any, callback: Callback<void>) => void;
    findLeaf: <Type>(data: any, predicate: Callback<boolean>) => Type;
    findNode: <Type>(data: any, predicate: Callback<boolean>) => Type;
    everyLeaf: (data: any, predicate: Callback<boolean>) => boolean;
    everyNode: (data: any, predicate: Callback<boolean>) => boolean;
    findLeaves: <Type>(data: any, predicate: Callback<boolean>) => Type[];
    findNodes: <Type>(data: any, predicate: Callback<boolean>) => Type[];
    mapLeaves: <Type>(data: any, callback: Callback<Type>, level?: number) => Type[];
    minHeight: (data: any) => number;
    maxHeight: (data: any) => number;
    nodesByLevel: <Type>(data: any, level: number) => Type[];
    reduce: <Type>(data: any, callback: Reducer<Type>, initial: Type) => Type[];
    hierarchy: (data: any, predicate: Callback<boolean>) => any[];
    findPath: (data: any, predicate: Callback<boolean>) => Path;
    findByPath: <Type>(data: any, path: Path) => Type;
    removeByPath: (data: any, path: Path) => any;
    updateByPath: <T>(data: any, path: Path, callback: PureFn<T>) => any;
    removeNode: (data: any, predicate: Callback<boolean>) => any;
    updateNode: <T>(data: any, predicate: Callback<boolean>, callback: PureFn<T>) => any;
}
declare const _default: Forest;
export default _default;
