import { SyncEvent } from "ts-events-extended";
import { MapExtended } from "./MapExtended";
export declare type Void = never[];
export declare function isVoid(value: any): value is Void;
export declare class TrackableMap<K, V> extends MapExtended<K, V> {
    static [Symbol.species]: typeof TrackableMap;
    [Symbol.iterator](): IterableIterator<[K, V]>;
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
}
