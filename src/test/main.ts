import { TrackableMap } from "../lib/index";

(() => {

    let map = new TrackableMap<number | string, string>();

    map.set(3, "tree");
    map.set(2, "two");
    map.set("4", "four");

    console.assert(map.get("4") === "four");

    console.assert(map.get(NaN) === undefined);

    console.assert(map.has(2));

    console.assert(map.has(4) === false);

    console.assert(JSON.stringify(map.keysAsArray()) === `[3,2,"4"]`);

    console.assert(JSON.stringify(map.intKeysAsSortedArray()) === `[2,3,4]`);

})();

(() => {

    let map = new TrackableMap<number | string, string>();

    map.set(3, "tree");
    map.set("3", "tree");

    console.assert(JSON.stringify(map.intKeysAsSortedArray()) === `[3]`);

})();


(() => {

    let map = new TrackableMap<number | string, string>();

    map.set(2, "bar");
    map.set(3, "foo");
    map.set(1, "foo");

    console.assert(map.size === 3);

    console.assert(JSON.stringify(map.valuesAsArray()) === `["bar","foo","foo"]`);
    console.assert(JSON.stringify(map.valuesAsArrayNoDuplicate()) === `["bar","foo"]`);
    console.assert(JSON.stringify(map.valuesAsArraySortedByKey()) === `["foo","bar","foo"]`);

    console.assert(JSON.stringify(map.toObject()) === `{"1":"foo","2":"bar","3":"foo"}`);

})();


(() => {

    let map = new TrackableMap<number, string>();

    let evtSet = false;

    map.evtSet.attachOnce(() => evtSet = true);
    map.evtSet.attachOnce(([value, key]) => console.assert(key === 666 && value === "666"));
    map.evtSet.attachOnce(([_, key]) => console.assert(key === 666));
    map.evtSet.attachOnce(([value]) => console.assert(value === "666"));

    map.set(666, "666");

    let evtDelete = false;

    map.evtDelete.attachOnce(() => evtDelete = true);
    map.evtDelete.attachOnce(([value, key]) => console.assert(key === 666 && value === "666"));
    map.evtDelete.attachOnce(([_, key]) => console.assert(key === 666));
    map.evtDelete.attachOnce(([value]) => console.assert(value === "666"));

    map.delete(666);

    console.assert(!map.size && evtSet && evtDelete);

})();


(() => {

    let map = new TrackableMap<string, { p1: string; p2: string }>();

    map.evtSet.attachOnce(([{ p1, p2 }]) => console.assert(p1 === "foo" && p2 === "bar"));

    map.set("_", { "p1": "foo", "p2": "bar" });

})();

(() => {

    let map = new TrackableMap<never[], { foo: string }>();

    let srcKey = [];
    let srcObj = { "foo": "baz" };

    map.set([], { "foo": "bar" });
    map.set(srcKey, srcObj);

    let obj = map.find(({ foo }) => foo === "baz");

    console.assert(obj!.foo === "baz");
    console.assert(obj === srcObj);

    console.assert(map.keyOf(srcObj) === srcKey);

})();


(() => {

    let map = new TrackableMap([
        [0, "foo"],
        [1, "bar"]
    ]);

    for (let [key, value] of map) {

        switch (key) {
            case 0: console.assert(value === "foo"); break;
            case 1: console.assert(value === "bar"); break;
            default: throw new Error();
        }

    }

})();

console.log("PASS");
