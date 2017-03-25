"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_events_extended_1 = require("ts-events-extended");
var TrackableMap = (function () {
    function TrackableMap() {
        this.map = new Map();
        this.evtSet = new ts_events_extended_1.SyncEvent();
        this.evtDelete = new ts_events_extended_1.SyncEvent();
    }
    TrackableMap.prototype.get = function (key) {
        return this.map.get(key);
    };
    Object.defineProperty(TrackableMap.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    TrackableMap.prototype.getBy = function (propKey, propValue) {
        for (var _i = 0, _a = this.keysAsArray(); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = this.get(key);
            if (!(value instanceof Object))
                continue;
            if (value[propKey] === propValue)
                return value;
        }
        return undefined;
    };
    TrackableMap.prototype.has = function (key) {
        return this.map.has(key);
    };
    TrackableMap.prototype.set = function (key, value) {
        this.map.set(key, value);
        this.evtSet.post([value, key]);
        return this;
    };
    TrackableMap.prototype.delete = function (key) {
        var value = this.map.get(key);
        if (!value)
            return false;
        this.map.delete(key);
        this.evtDelete.post([value, key]);
        return true;
    };
    TrackableMap.prototype.keysAsArray = function () {
        var out = [];
        this.map.forEach(function (_, key) { return out.push(key); });
        return out;
    };
    TrackableMap.prototype.valuesAsArrayNoDuplicate = function () {
        var out = [];
        this.map.forEach(function (value) {
            if (out.indexOf(value) >= 0)
                return;
            out.push(value);
        });
        return out;
    };
    TrackableMap.prototype.valuesAsArray = function () {
        var out = [];
        this.map.forEach(function (value) { return out.push(value); });
        return out;
    };
    TrackableMap.prototype.intKeysAsSortedArray = function () {
        return TrackableMap.intKeyAsSortedArray(this.toObject());
    };
    TrackableMap.prototype.valuesAsArraySortedByKey = function () {
        var out = [];
        var obj = this.toObject();
        for (var _i = 0, _a = this.intKeysAsSortedArray(); _i < _a.length; _i++) {
            var key = _a[_i];
            out.push(obj[key]);
        }
        return out;
    };
    TrackableMap.prototype.toObject = function () {
        var out = {};
        for (var _i = 0, _a = this.keysAsArray(); _i < _a.length; _i++) {
            var key = _a[_i];
            out[key.toString()] = this.map.get(key);
        }
        return out;
    };
    TrackableMap.intKeyAsSortedArray = function (object) {
        var arr = Object.keys(object)
            .map(function (indexStr) {
            var index = parseInt(indexStr);
            if (isNaN(index))
                return null;
            return index;
        });
        var index;
        while ((index = arr.indexOf(null)) >= 0)
            arr.splice(index, 1);
        return arr.sort(function (index1, index2) { return index1 - index2; });
    };
    return TrackableMap;
}());
exports.TrackableMap = TrackableMap;
//# sourceMappingURL=TrackableMap.js.map