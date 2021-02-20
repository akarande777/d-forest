declare function _exports(forest: any): Forest;
export = _exports;
declare function Forest(forest: any): void;
declare class Forest {
    constructor(forest: any);
    forest: any;
    forEachLeaf(callback: any): void;
    forEachNode(callback: any): void;
    findLeaf(callback: any): any;
    findNode(callback: any): any;
    everyLeaf(callback: any): any;
    everyNode(callback: any): any;
    findLeaves(callback: any): any;
    findNodes(callback: any): any;
    mapLeaves(callback: any): any;
    minHeight(): any;
    maxHeight(): any;
    nodesByLevel(level: any): any;
    reduce(callback: any, initial: any): any;
}
