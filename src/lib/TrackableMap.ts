import { SyncEvent } from "ts-events-extended";

const _void_= [];

export type Void= never[];

export function isVoid(value: any): value is Void { return value === _void_; }

export class TrackableMap<K,V>{

    public static [Symbol.species]= TrackableMap;
    public [Symbol.iterator]() { return this.map.entries(); }

    private readonly map: Map<K,V>;

    public static readonly isVoid= isVoid;
    public isVoid(value: V | Void): value is Void { return value === _void_; }

    /**[ oldValue, key ] */
    public readonly evtDelete= new SyncEvent<[V,K]>();

    /** [ newValue, key ] */
    public readonly evtCreate= new SyncEvent<[V, K]>();

    /** [ newValue, key, oldValue ], newValue !== odlValue */
    public readonly evtUpdate= new SyncEvent<[V,K,V]>();

    /** [ newValue, key ], is equivalent to evtCreateOrUpdate */
    public readonly evtSet= new SyncEvent<[V,K]>();

    /** [ newValue, key, oldValue ], newValue !== oldValue */
    public readonly evt= new SyncEvent<[V | Void, K, V | Void]>();

    //oldValue !== newValue
    private readonly _evt= new SyncEvent<{ 
        key: K; 
        oldValue: V | Void; 
        newValue: V | Void;
    }>();

    constructor(iterable: Iterable<[K, V]> = []) {

        this.map = new Map(iterable);

        this._evt.attach(
            ({ key, oldValue, newValue }) => {

                this.evt.post([newValue, key, oldValue]);

                if( isVoid(newValue) )
                    this.evtDelete.post([oldValue as V, key]);

                if( isVoid(oldValue) ){
                    this.evtCreate.post([newValue as V, key]);
                    this.evtSet.post([newValue as V, key]);
                }
                
                if( !isVoid(oldValue) && !isVoid(newValue) ){
                    this.evtUpdate.post([newValue, key, oldValue]);
                    this.evtSet.post([newValue, key]);
                }

            }
        );

    }

    public set(key: K, value: V) {

        let oldValue: V | Void;

        if (this.map.has(key)) {
            oldValue = this.map.get(key)!;
            if(oldValue === value ) return this;
        } else {
            oldValue = _void_;
        }

        this.map.set(key, value);

        this._evt.post({ oldValue, key, "newValue": value });

        return this;

    }

    public delete(key: K): boolean {

        if (!this.map.has(key)) return false;

        let oldValue = this.map.get(key)!;

        this.map.delete(key);

        this._evt.post({ oldValue, key, "newValue": _void_ });

        return true;

    }

    public clear() {

        for (let key of this.map.keys())
            this.delete(key);

    }

    public values() { return this.map.values(); }

    public keys() { return this.map.keys(); }

    public entries() { return this.map.entries(); }

    public get(key: K) { return this.map.get(key); }

    public get size() { return this.map.size; }

    public has(key: K) { return this.map.has(key); }


    //Custom

    public keySet() { return new Set(this.map.keys()); }

    public valueSet() { return new Set(this.map.values()); }

    public find(match: (value: V) => boolean): V | undefined {

        for (let value of this.map.values())
            if (match(value)) return value;

        return undefined;

    }

    public keyOf(value: V): K | undefined {

        for (let [key, value_] of this.map)
            if (value_ === value) return key;

        return undefined;

    }


    public keysAsArray(): K[] {

        let out = new Array<K>();

        for (let key of this.map.keys())
            out.push(key);

        return out;

    }

    public valuesAsArray(): V[] {

        let out = new Array<V>();

        for (let value of this.map.values())
            out.push(value);

        return out;

    }

    public valuesAsArrayNoDuplicate(): V[] {

        let out: V[] = [];

        for (let value of new Set(this.map.values()))
            out.push(value);

        return out;

    }


    public toObject(): { [key: string]: V } {

        let out = {};

        for (let [key, value] of this.map)
            out[`${key}`] = value;

        return out;

    }

    public intKeysAsSortedArray(): number[] {

        return TrackableMap.intKeyAsSortedArray(this.toObject());

    }

    public valuesAsArraySortedByKey(): V[] {

        let out: V[] = [];

        let obj = this.toObject();

        for (let key of this.intKeysAsSortedArray())
            out.push(obj[key]);

        return out;

    }

    public static intKeyAsSortedArray(object: Object): number[] {

        let arr = Object.keys(object)
            .map(indexStr => {
                let index = parseInt(indexStr);
                if (isNaN(index)) return null;
                return index;
            });

        let index: number;

        while ((index = arr.indexOf(null)) >= 0)
            arr.splice(index, 1);

        return (arr as number[]).sort((index1, index2) => index1 - index2);


    }

}
