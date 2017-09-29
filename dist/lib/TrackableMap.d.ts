import { SyncEvent } from "ts-events-extended";
export declare class TrackableMap<K, V> {
    private readonly map;
    readonly evtSet: SyncEvent<[V, K]>;
    readonly evtDelete: SyncEvent<[V, K]>;
    static [Symbol.species]: typeof TrackableMap;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    constructor(iterable?: Iterable<[K, V]>);
    values(): IterableIterator<V>;
    keys(): IterableIterator<K>;
    entries(): IterableIterator<[K, V]>;
    get(key: K): V | undefined;
    readonly size: number;
    has(key: K): boolean;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    keySet(): Set<K>;
    valueSet(): Set<V>;
    find(match: (value: V) => boolean): V | undefined;
    keyOf(value: V): K | undefined;
    keysAsArray(): K[];
    valuesAsArrayNoDuplicate(): V[];
    valuesAsArray(): V[];
    intKeysAsSortedArray(): number[];
    valuesAsArraySortedByKey(): V[];
    toObject(): {
        [key: string]: V;
    };
    static intKeyAsSortedArray(object: Object): number[];
}
