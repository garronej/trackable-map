import { SyncEvent } from "ts-events-extended";

export class TrackableMap<K,V>{

    private readonly map= new Map<K,V>();

    public readonly evtSet= new SyncEvent<{key: K, value: V}>();
    public readonly evtDelete= new SyncEvent<{key: K, value: V}>();

    public get(key: K): V | undefined{
        return this.map.get(key);
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

        this.evtSet.post({key, value});

        return this;

    }

    public delete(key: K): boolean {

        let value = this.map.get(key);

        if (!value) return false;

        this.map.delete(key);

        this.evtDelete.post({ key, value });

        return true;


    }

    public keysAsArray(): K[] {

        let out: K[] = [];

        this.map.forEach((_, key) => out.push(key));

        return out;

    }

    public valuesAsArray(): V[] {

        let out: V[]= [];

        let value: V;

        for( let key of this.keysAsArray() ){

            value= this.get(key)!;

            if( out.indexOf(value) >= 0 ) continue;

            out.push(value);

        }

        return out;

    }

    public toObject(): { [key: string]: V } {

        let out = {};

        for (let key of this.keysAsArray())
            out[key.toString()] = this.map.get(key);

        return out;

    }

}