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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_events_extended_1 = require("ts-events-extended");
var _void_ = [];
function isVoid(value) { return value === _void_; }
exports.isVoid = isVoid;
var TrackableMap = /** @class */ (function () {
    function TrackableMap(iterable) {
        if (iterable === void 0) { iterable = []; }
        var _this = this;
        /**[ oldValue, key ] */
        this.evtDelete = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key ] */
        this.evtCreate = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key, oldValue ], newValue !== odlValue */
        this.evtUpdate = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key ], is equivalent to evtCreateOrUpdate */
        this.evtSet = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key, oldValue ], newValue !== oldValue */
        this.evt = new ts_events_extended_1.SyncEvent();
        //oldValue !== newValue
        this._evt = new ts_events_extended_1.SyncEvent();
        this.map = new Map(iterable);
        this._evt.attach(function (_a) {
            var key = _a.key, oldValue = _a.oldValue, newValue = _a.newValue;
            _this.evt.post([newValue, key, oldValue]);
            if (isVoid(newValue))
                _this.evtDelete.post([oldValue, key]);
            if (isVoid(oldValue)) {
                _this.evtCreate.post([newValue, key]);
                _this.evtSet.post([newValue, key]);
            }
            if (!isVoid(oldValue) && !isVoid(newValue)) {
                _this.evtUpdate.post([newValue, key, oldValue]);
                _this.evtSet.post([newValue, key]);
            }
        });
    }
    TrackableMap.prototype[Symbol.iterator] = function () { return this.map.entries(); };
    TrackableMap.prototype.isVoid = function (value) { return value === _void_; };
    TrackableMap.prototype.set = function (key, value) {
        var oldValue;
        if (this.map.has(key)) {
            oldValue = this.map.get(key);
            if (oldValue === value)
                return this;
        }
        else {
            oldValue = _void_;
        }
        this.map.set(key, value);
        this._evt.post({ oldValue: oldValue, key: key, "newValue": value });
        return this;
    };
    TrackableMap.prototype.delete = function (key) {
        if (!this.map.has(key))
            return false;
        var oldValue = this.map.get(key);
        this.map.delete(key);
        this._evt.post({ oldValue: oldValue, key: key, "newValue": _void_ });
        return true;
    };
    TrackableMap.prototype.clear = function () {
        try {
            for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                this.delete(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    TrackableMap.prototype.values = function () { return this.map.values(); };
    TrackableMap.prototype.keys = function () { return this.map.keys(); };
    TrackableMap.prototype.entries = function () { return this.map.entries(); };
    TrackableMap.prototype.get = function (key) { return this.map.get(key); };
    Object.defineProperty(TrackableMap.prototype, "size", {
        get: function () { return this.map.size; },
        enumerable: true,
        configurable: true
    });
    TrackableMap.prototype.has = function (key) { return this.map.has(key); };
    //Custom
    TrackableMap.prototype.keySet = function () { return new Set(this.map.keys()); };
    TrackableMap.prototype.valueSet = function () { return new Set(this.map.values()); };
    TrackableMap.prototype.find = function (match) {
        try {
            for (var _a = __values(this.map.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                if (match(value))
                    return value;
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
    TrackableMap.prototype.keyOf = function (value) {
        try {
            for (var _a = __values(this.map), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), key = _c[0], value_ = _c[1];
                if (value_ === value)
                    return key;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
        var e_3, _d;
    };
    TrackableMap.prototype.keysAsArray = function () {
        var out = new Array();
        try {
            for (var _a = __values(this.map.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                out.push(key);
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
    TrackableMap.prototype.valuesAsArray = function () {
        var out = new Array();
        try {
            for (var _a = __values(this.map.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
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
    TrackableMap.prototype.valuesAsArrayNoDuplicate = function () {
        var out = [];
        try {
            for (var _a = __values(new Set(this.map.values())), _b = _a.next(); !_b.done; _b = _a.next()) {
                var value = _b.value;
                out.push(value);
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
            for (var _a = __values(this.map), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                out["" + key] = value;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return out;
        var e_7, _d;
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
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return out;
        var e_8, _c;
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
    TrackableMap.isVoid = isVoid;
    return TrackableMap;
}());
exports.TrackableMap = TrackableMap;
