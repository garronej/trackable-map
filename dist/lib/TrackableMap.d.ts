import { SyncEvent } from "ts-events-extended";
export declare type Void = never[];
export declare function isVoid(value: any): value is Void;
export declare class TrackableMap<K, V> {
    static [Symbol.species]: typeof TrackableMap;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    private readonly map;
    static readonly isVoid: typeof isVoid;
    isVoid(value: V | Void): value is Void;
    /**[ oldValue, key ] */
    readonly evtDelete: SyncEvent<[V, K]>;
    /** [ newValue, key ] */
    readonly evtCreate: SyncEvent<[V, K]>;
    /** [ newValue, key, oldValue ], newValue !== odlValue */
    readonly evtUpdate: SyncEvent<[V, K, V]>;
    /** [ newValue, key ], is equivalent to evtCreateOrUpdate */
    readonly evtSet: SyncEvent<[V, K]>;
    /** [ newValue, key, oldValue ], newValue !== oldValue */
    readonly evt: SyncEvent<[never[] | V, K, never[] | V]>;
    private readonly _evt;
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
