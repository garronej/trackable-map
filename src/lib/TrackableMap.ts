import { SyncEvent } from "ts-events-extended";


export class TrackableMap<K,V>{

    private readonly map: Map<K,V>;

    public readonly evtSet= new SyncEvent<[V,K]>();
    public readonly evtDelete= new SyncEvent<[V,K]>();

    public static [Symbol.species]= TrackableMap;
    public [Symbol.iterator]() { return this.map.entries(); }

    constructor(iterable: Iterable<[K,V]> = []){
        this.map= new Map(iterable);
    }

    public values() {
        return this.map.values();
    }

    public keys() {
        return this.map.keys();
    }

    public entries() {
        return this.map.entries();
    }

    public get(key: K): V | undefined{
        return this.map.get(key);
    }

    public get size() {
        return this.map.size;
    }


    public has(key: K): boolean {
        return this.map.has(key);
    }


    public set(key: K, value: V): this{

        this.map.set(key, value);

        this.evtSet.post([value, key]);

        return this;

    }

    public delete(key: K): boolean {

        let has= this.map.has(key);

        if( !has ) return false;

        let value = this.map.get(key)!;

        this.map.delete(key);

        this.evtDelete.post([value, key]);

        return true;


    }

    public keySet() {

        let out= new Set<K>();

        for( let key of this.map.keys() )
            out.add(key);
        
        return out;

    }

    public valueSet() {

        let out= new Set<V>();

        for( let value of this.map.values() )
            out.add(value);

        return out;

    }

    public update(key: K, newValue: V): V | undefined {

        if( !this.map.has(key) ){

            this.set(key, newValue);

            return undefined;

        }

        let oldValue= this.map.get(key)!;

        this.map.set(key, newValue);

        return oldValue;

    }


    public find(
        match: (value: V)=> boolean
    ): V | undefined{

        for( let value of this.values())
            if( match(value) ) return value;
        
        return undefined;

    }

    public keyOf( value: V ): K | undefined {

        for( let key of this.keys() )
            if( this.get(key) === value ) return key;

        return undefined;

    }


    public keysAsArray(): K[] {

        let out: K[] = [];

        this.map.forEach((_, key) => out.push(key));

        return out;

    }

    public valuesAsArrayNoDuplicate(): V[] {

        let out: V[] = [];

        for( let value of this.valueSet() )
            out.push(value);

        return out;

    }

    public valuesAsArray(): V[] {

        let out: V[] = [];

        this.map.forEach(value => out.push(value));

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


    public toObject(): { [key: string]: V } {

        let out = {};

        for (let key of this.map.keys())
            out[key.toString()] = this.map.get(key);

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
