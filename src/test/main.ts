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

let map1 = new TrackableMap<number, string>();

let evtSet= false;

map1.evtSet.attachOnce( () => evtSet = true );
map1.evtSet.attachOnce( ([value, key]) => console.assert(key === 666 && value === "666"));
map1.evtSet.attachOnce( ([_, key]) => console.assert(key === 666));
map1.evtSet.attachOnce( ([value]) => console.assert(value === "666"));

map1.set(666,"666");

let evtDelete= false;

map1.evtDelete.attachOnce( () => evtDelete = true );
map1.evtDelete.attachOnce( ([value, key]) => console.assert(key === 666 && value === "666"));
map1.evtDelete.attachOnce( ([_, key]) => console.assert(key === 666));
map1.evtDelete.attachOnce( ([value]) => console.assert(value === "666"));

map1.delete(666);

console.assert( !map1.size && evtSet && evtDelete );



let map2= new TrackableMap<string, { p1: string; p2: string }>();

map2.evtSet.attachOnce( ([{p1, p2}]) => console.assert( p1 === "foo" && p2 === "bar" ));

map2.set("_", { "p1": "foo", "p2": "bar" });



let map3= new TrackableMap<string, { foo: string }>();


map3.set("a", { "foo": "bar" });
map3.set("b", { "foo": "baz" });

let obj=map3.find(({foo})=> foo === "baz");

console.assert( obj!.foo === "baz");

console.log("PASS");

