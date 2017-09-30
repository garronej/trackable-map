require("rejection-tracker").main(__dirname, "..", "..");

import { TrackableMap, isVoid } from "../lib/index";

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

    console.log("PASS");

})();

(() => {

    let map = new TrackableMap<number | string, string>();

    map.set(3, "tree");
    map.set("3", "tree");

    console.assert(JSON.stringify(map.intKeysAsSortedArray()) === `[3]`);

    console.log("PASS");

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

    console.log("PASS");

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

    console.log("PASS");

})();


(() => {

    let map = new TrackableMap<string, { p1: string; p2: string }>();

    map.evtSet.attachOnce(([{ p1, p2 }]) => console.assert(p1 === "foo" && p2 === "bar"));

    map.set("_", { "p1": "foo", "p2": "bar" });

    console.log("PASS");

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

    console.log("PASS");

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

    console.log("PASS");

})();


(() => {

    let map = new TrackableMap([
        [0, "foo"],
        [1, "foo"],
        [2, "bar"]
    ]);

    let keysAsArray = new Array<number>();

    for (let key of map.keySet())
        keysAsArray.push(key);

    console.assert(JSON.stringify(keysAsArray) === JSON.stringify(map.keysAsArray()));

    let valuesAsArrayNoDuplicate = new Array<string>();

    for (let value of map.valueSet())
        valuesAsArrayNoDuplicate.push(value);

    console.assert(JSON.stringify(valuesAsArrayNoDuplicate) === JSON.stringify(map.valuesAsArrayNoDuplicate()));

    console.log("PASS");

})();


(async () => {

    let map = new TrackableMap<number, string>();

    await (async () => {

        map.evtDelete.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtUpdate.waitFor(10).then(() => console.assert(false)).catch(() => { });

        let events = Promise.all([
            map.evt.waitFor(0),
            map.evtCreate.waitFor(0),
            map.evtSet.waitFor(0)
        ]);

        map.set(0, "foo");

        let [e1, e2, e3] = await events;


        console.assert(
            e1[0] === "foo" && 
            e1[1] === 0 &&
            isVoid(e1[2])
        );

        console.assert(JSON.stringify(e2) === '["foo",0]');
        console.assert(JSON.stringify(e3) === '["foo",0]');

        await new Promise(resolve => setTimeout(resolve, 100));

    })();

    console.log("PASS1");

    await (async () => {

        map.evtDelete.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtUpdate.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evt.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtCreate.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtSet.waitFor(10).then(() => console.assert(false)).catch(() => { });

        map.set(0, "foo");

        await new Promise(resolve => setTimeout(resolve, 100));

    })();

    console.log("PASS2");

    await (async () => {

        map.evtDelete.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtCreate.waitFor(10).then(() => console.assert(false)).catch(() => { });

        let events = Promise.all([
            map.evt.waitFor(0),
            map.evtSet.waitFor(0),
            map.evtUpdate.waitFor(0)
        ]);

        map.set(0, "bar");

        let [e1, e2, e3] = await events;

        console.assert(JSON.stringify(e1) === '["bar",0,"foo"]');
        console.assert(JSON.stringify(e2) === '["bar",0]');
        console.assert(JSON.stringify(e3) === '["bar",0,"foo"]');

        await new Promise(resolve => setTimeout(resolve, 100));

    })();

    console.log("PASS3");

    await (async () => {

        map.evtUpdate.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtCreate.waitFor(10).then(() => console.assert(false)).catch(() => { });
        map.evtSet.waitFor(10).then(() => console.assert(false)).catch(() => { });

        let events = Promise.all([
            map.evtDelete.waitFor(0),
            map.evt.waitFor(0),
        ]);

        map.delete(0);

        let [e1, e2] = await events;

        console.assert(JSON.stringify(e1) === '["bar",0]');

        console.assert(
            isVoid(e2[0]) && 
            e2[1] === 0 &&
            e2[2] === "bar"
        );

        await new Promise(resolve => setTimeout(resolve, 100));

    })();

    console.log("PASS4");

    await (async () => {

        map.set(2,"foo");
        map.set(1,"bar");
        map.set(0,"baz");

        map.evtUpdate.waitFor(10).then(() => console.assert(false,"m1")).catch(() => { });
        map.evtCreate.waitFor(10).then(() => console.assert(false,"m2")).catch(() => { });
        map.evtSet.waitFor(10).then(() => console.assert(false,"m3")).catch(() => { });

        (async ()=>{

                let e1= await map.evtDelete.waitFor(0);
                let e2= await map.evtDelete.waitFor(0);
                let e3= await map.evtDelete.waitFor(0);

                console.assert(JSON.stringify(e1) === '["foo",2]', "m4");
                console.assert(JSON.stringify(e2) === '["bar",1]', "m5");
                console.assert(JSON.stringify(e3) === '["baz",0]', "m6");

        })();

        map.clear();

        await new Promise(resolve => setTimeout(resolve, 100));

    })();

    console.log("PASS");

})();


