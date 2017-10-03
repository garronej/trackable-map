import { SyncEvent } from "ts-events-extended";
import { MapExtended } from "./MapExtended";

const _void_= [];

export type Void= never[];

export function isVoid(value: any): value is Void { return value === _void_; }

export class TrackableMap<K,V> extends MapExtended<K,V>{

    public static [Symbol.species]= TrackableMap;
    public [Symbol.iterator]() { return this.entries(); }

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

        super(iterable);

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

        if (super.has(key)) {
            oldValue = super.get(key)!;
            if(oldValue === value ) return this;
        } else {
            oldValue = _void_;
        }

        super.set(key, value);

        this._evt.post({ oldValue, key, "newValue": value });

        return this;

    }

    public delete(key: K): boolean {

        if (!super.has(key)) return false;

        let oldValue = super.get(key)!;

        super.delete(key);

        this._evt.post({ oldValue, key, "newValue": _void_ });

        return true;

    }

    public clear() {

        for (let key of super.keys())
            this.delete(key);

    }



}
