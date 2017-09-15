import { SyncEvent } from "ts-events-extended";

export class TrackableMap<K,V>{

    private readonly map= new Map<K,V>();

    public readonly evtSet= new SyncEvent<[V,K]>();
    public readonly evtDelete= new SyncEvent<[V,K]>();

    public values() {
        return this.map.values();
    }

    public keys() {
        return this.map.keys();
    }

    public get(key: K): V | undefined{
        return this.map.get(key);
    }

    public find(
        match: (value: V)=> boolean
    ): V | undefined{

        for( let value of this.values())
            if( match(value) ) return value;
        
        return undefined;

    }

    public get size(): number {
        return this.map.size;
    }

    public getBy(propKey: string, propValue: any): V | undefined {

        for( let key of this.keysAsArray() ){

            let value= this.get(key);

            if( !( value instanceof Object ) )
                continue;
            
            if( value[propKey] === propValue )
                return value;
            
        }

        return undefined;

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

        let value = this.map.get(key);

        if (!value) return false;

        this.map.delete(key);

        this.evtDelete.post([value, key]);

        return true;


    }

    public keysAsArray(): K[] {

        let out: K[] = [];

        this.map.forEach((_, key) => out.push(key));

        return out;

    }

    public valuesAsArrayNoDuplicate(): V[] {

        let out: V[] = [];

        this.map.forEach( value => {

            if( out.indexOf(value) >= 0 ) 
                return;

            out.push(value);
        });

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

        for (let key of this.keysAsArray())
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