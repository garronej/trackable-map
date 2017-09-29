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
    function TrackableMap(iterable) {
        if (iterable === void 0) { iterable = []; }
        this.evtSet = new ts_events_extended_1.SyncEvent();
        this.evtDelete = new ts_events_extended_1.SyncEvent();
        this.map = new Map(iterable);
    }
    TrackableMap.prototype[Symbol.iterator] = function () { return this.map.entries(); };
    TrackableMap.prototype.values = function () {
        return this.map.values();
    };
    TrackableMap.prototype.keys = function () {
        return this.map.keys();
    };
    TrackableMap.prototype.entries = function () {
        return this.map.entries();
    };
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
    TrackableMap.prototype.keySet = function () {
        var out = new Set();
        try {
            for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                out.add(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return out;
        var e_1, _c;
    };
    TrackableMap.prototype.valueSet = function () {
        var out = new Set();
        try {
            for (var _a = __values(this.map.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                out.add(value);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return out;
        var e_2, _c;
    };
    TrackableMap.prototype.update = function (key, newValue) {
        if (!this.map.has(key)) {
            this.set(key, newValue);
            return undefined;
        }
        var oldValue = this.map.get(key);
        this.map.set(key, newValue);
        return oldValue;
    };
    TrackableMap.prototype.find = function (match) {
        try {
            for (var _a = __values(this.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (match(value))
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
    TrackableMap.prototype.keyOf = function (value) {
        try {
            for (var _a = __values(this.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                if (this.get(key) === value)
                    return key;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return undefined;
        var e_4, _c;
    };
    TrackableMap.prototype.keysAsArray = function () {
        var out = [];
        this.map.forEach(function (_, key) { return out.push(key); });
        return out;
    };
    TrackableMap.prototype.valuesAsArrayNoDuplicate = function () {
        var out = [];
        try {
            for (var _a = __values(this.valueSet()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                out.push(value);
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
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return out;
        var e_6, _c;
    };
    TrackableMap.prototype.toObject = function () {
        var out = {};
        try {
            for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                out[key.toString()] = this.map.get(key);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return out;
        var e_7, _c;
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
    TrackableMap[Symbol.species] = TrackableMap;
    return TrackableMap;
}());
exports.TrackableMap = TrackableMap;
