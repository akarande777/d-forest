declare function _exports(forest: any): Forest;
export = _exports;
declare function Forest(forest: any): void;
declare class Forest {
    constructor(forest: any);
    forest: any;
    isObject(element: any): boolean;
    forEachLeaf(callback: any): void;
    forEachNode(callback: any): void;
    findLeaf(callback: any): any;
    findNode(callback: any): any;
    findLeaves(callback: any): any;
    findNodes(callback: any): any;
    mapLeaves(callback: any): any;
    nodesByLevel(level: any): any;
    removeNode(callback: any): any;
    removeLeaf(callback: any): any;
    reduce(callback: any, initial: any): any;
}
