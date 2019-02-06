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
var MapExtended = /** @class */ (function () {
    function MapExtended(iterable) {
        if (iterable === void 0) { iterable = []; }
        this.map = new Map(iterable);
    }
    MapExtended.prototype[Symbol.iterator] = function () { return this.map.entries(); };
    MapExtended.prototype.set = function (key, value) {
        this.map.set(key, value);
        return this;
    };
    MapExtended.prototype.delete = function (key) {
        return this.map.delete(key);
    };
    MapExtended.prototype.clear = function () {
        this.map.clear();
    };
    MapExtended.prototype.values = function () { return this.map.values(); };
    MapExtended.prototype.keys = function () { return this.map.keys(); };
    MapExtended.prototype.entries = function () { return this.map.entries(); };
    MapExtended.prototype.get = function (key) { return this.map.get(key); };
    Object.defineProperty(MapExtended.prototype, "size", {
        get: function () { return this.map.size; },
        enumerable: true,
        configurable: true
    });
    MapExtended.prototype.has = function (key) { return this.map.has(key); };
    //Custom
    MapExtended.prototype.keySet = function () { return new Set(this.map.keys()); };
    MapExtended.prototype.valueSet = function () { return new Set(this.map.values()); };
    MapExtended.prototype.find = function (match) {
        var e_1, _a;
        try {
            for (var _b = __values(this.map.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                if (match(value))
                    return value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    MapExtended.prototype.keyOf = function (value) {
        var e_2, _a;
        try {
            for (var _b = __values(this.map), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value_ = _d[1];
                if (value_ === value)
                    return key;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
    };
    MapExtended.prototype.keysAsArray = function () {
        var e_3, _a;
        var out = new Array();
        try {
            for (var _b = __values(this.map.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                out.push(key);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return out;
    };
    MapExtended.prototype.valuesAsArray = function () {
        var e_4, _a;
        var out = new Array();
        try {
            for (var _b = __values(this.map.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                out.push(value);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return out;
    };
    MapExtended.prototype.valuesAsArrayNoDuplicate = function () {
        var e_5, _a;
        var out = [];
        try {
            for (var _b = __values(new Set(this.map.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                out.push(value);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return out;
    };
    MapExtended.prototype.toObject = function () {
        var e_6, _a;
        var out = {};
        try {
            for (var _b = __values(this.map), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                out["" + key] = value;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return out;
    };
    MapExtended.prototype.intKeysAsSortedArray = function () {
        return MapExtended.intKeyAsSortedArray(this.toObject());
    };
    MapExtended.prototype.valuesAsArraySortedByKey = function () {
        var e_7, _a;
        var out = [];
        var obj = this.toObject();
        try {
            for (var _b = __values(this.intKeysAsSortedArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                out.push(obj[key]);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return out;
    };
    MapExtended.intKeyAsSortedArray = function (object) {
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
    MapExtended[Symbol.species] = MapExtended;
    return MapExtended;
}());
exports.MapExtended = MapExtended;
