export declare class MapExtended<K, V> {
    static [Symbol.species]: typeof MapExtended;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    private readonly map;
    constructor(iterable?: Iterable<[K, V]>);
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
    values(): IterableIterator<V>;
    keys(): IterableIterator<K>;
    entries(): IterableIterator<[K, V]>;
    get(key: K): V | undefined;
    readonly size: number;
    has(key: K): boolean;
    keySet(): Set<K>;
    valueSet(): Set<V>;
    find(match: (value: V) => boolean): V | undefined;
    keyOf(value: V): K | undefined;
    keysAsArray(): K[];
    valuesAsArray(): V[];
    valuesAsArrayNoDuplicate(): V[];
    toObject(): {
        [key: string]: V;
    };
    intKeysAsSortedArray(): number[];
    valuesAsArraySortedByKey(): V[];
    static intKeyAsSortedArray(object: Object): number[];
}
