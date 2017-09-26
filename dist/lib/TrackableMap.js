"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_events_extended_1 = require("ts-events-extended");
var TrackableMap = /** @class */ (function () {
    function TrackableMap() {
        this.map = new Map();
        this.evtSet = new ts_events_extended_1.SyncEvent();
        this.evtDelete = new ts_events_extended_1.SyncEvent();
    }
    TrackableMap.prototype.values = function () {
        return this.map.values();
    };
    TrackableMap.prototype.keys = function () {
        return this.map.keys();
    };
    TrackableMap.prototype.get = function (key) {
        return this.map.get(key);
    };
    TrackableMap.prototype.find = function (match) {
        try {
            for (var _a = __values(this.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (match(value))
                    return value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
        var e_1, _c;
    };
    TrackableMap.prototype.keyOf = function (value) {
        try {
            for (var _a = __values(this.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                if (this.get(key) === value)
                    return key;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
        var e_2, _c;
    };
    Object.defineProperty(TrackableMap.prototype, "size", {
        get: function () {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    TrackableMap.prototype.getBy = function (propKey, propValue) {
        try {
            for (var _a = __values(this.keysAsArray()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                var value = this.get(key);
                if (!(value instanceof Object))
                    continue;
                if (value[propKey] === propValue)
                    return value;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
        var e_3, _c;
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
        var has = this.map.has(key);
        if (!has)
            return false;
        var value = this.map.get(key);
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
        try {
            for (var _a = __values(this.intKeysAsSortedArray()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                out.push(obj[key]);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return out;
        var e_4, _c;
    };
    TrackableMap.prototype.toObject = function () {
        var out = {};
        try {
            for (var _a = __values(this.keysAsArray()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                out[key.toString()] = this.map.get(key);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return out;
        var e_5, _c;
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
