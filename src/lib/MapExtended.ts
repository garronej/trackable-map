
export class MapExtended<K,V>{

    public static [Symbol.species]= MapExtended;
    public [Symbol.iterator]() { return this.map.entries(); }

    private readonly map: Map<K,V>;

    constructor(iterable: Iterable<[K, V]> = []) {

        this.map = new Map(iterable);

    }

    public set(key: K, value: V) {

        this.map.set(key, value);

        return this;

    }

    public delete(key: K) {
        return this.map.delete(key);
    }

    public clear() {
        this.map.clear();
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

        return MapExtended.intKeyAsSortedArray(this.toObject());

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
