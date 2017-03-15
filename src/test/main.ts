import { TrackableMap } from "../lib/index";

let map = new TrackableMap<number | string, string>();


map.set(3, "second");
map.set(2, "first")
map.set("4", "third");


console.log(map.intKeysAsSortedArray());


let obj= { 
    "-1": "first",
    "2": "second",
    "3": "last"
};

console.log(TrackableMap.intKeyAsSortedArray(obj));



