import { TrackableMap } from "../lib/index";

let map = new TrackableMap<Object, number>();

let obj1= {};

map.set(obj1, 3);

console.log(map.get(obj1));

