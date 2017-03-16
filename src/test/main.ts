import { TrackableMap } from "../lib/index";

let map = new TrackableMap<number | string, string>();


map.set(3, "tree");
map.set(2, "two");
map.set("4", "four");

console.assert(map.get("4") === "four");

console.assert(map.get(NaN) === undefined );

console.assert(map.has(2));

console.assert( map.has(4) === false );

console.assert(JSON.stringify(map.keysAsArray()) === `[3,2,"4"]`);

console.assert(JSON.stringify(map.intKeysAsSortedArray()) === `[2,3,4]`);


map = new TrackableMap<number | string, string>();


map.set(3, "tree");
map.set("3", "tree");


console.assert(JSON.stringify(map.intKeysAsSortedArray()) === `[3]`);


map = new TrackableMap<number | string, string>();


map.set(2, "bar");
map.set(3, "foo");
map.set(1, "foo");

console.assert( map.size === 3 );

console.assert(JSON.stringify(map.valuesAsArray()) === `["bar","foo","foo"]`);
console.assert(JSON.stringify(map.valuesAsArrayNoDuplicate())=== `["bar","foo"]`);
console.assert(JSON.stringify(map.valuesAsArraySortedByKey()) === `["foo","bar","foo"]`);

console.assert(JSON.stringify(map.toObject()) === `{"1":"foo","2":"bar","3":"foo"}`);

map = new TrackableMap<number, string>();

let evtSet= false;

map.evtSet.attachOnce( () => evtSet = true );
map.evtSet.attachOnce( ([key, value]) => console.assert(key === 666 && value === "666"));
map.evtSet.attachOnce( ([key]) => console.assert(key === 666));
map.evtSet.attachOnce( ([_, value]) => console.assert(value === "666"));

map.set(666,"666");

let evtDelete= false;

map.evtDelete.attachOnce( () => evtDelete = true );
map.evtDelete.attachOnce( ([key, value]) => console.assert(key === 666 && value === "666"));
map.evtDelete.attachOnce( ([key]) => console.assert(key === 666));
map.evtDelete.attachOnce( ([_, value]) => console.assert(value === "666"));

map.delete(666);

console.assert( !map.size && evtSet && evtDelete );

console.log("PASS");