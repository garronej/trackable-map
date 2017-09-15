import { SyncEvent } from "ts-events-extended";
export declare class TrackableMap<K, V> {
    private readonly map;
    readonly evtSet: SyncEvent<[V, K]>;
    readonly evtDelete: SyncEvent<[V, K]>;
    values(): IterableIterator<V>;
    keys(): IterableIterator<K>;
    get(key: K): V | undefined;
    find(match: (value: V) => boolean): V | undefined;
    keyOf(value: V): K | undefined;
    readonly size: number;
    getBy(propKey: string, propValue: any): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    delete(key: K): boolean;
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
