"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var MapExtended_1 = require("./MapExtended");
var _void_ = [];
function isVoid(value) { return value === _void_; }
exports.isVoid = isVoid;
var TrackableMap = /** @class */ (function (_super) {
    __extends(TrackableMap, _super);
    function TrackableMap(iterable) {
        if (iterable === void 0) { iterable = []; }
        var _this = _super.call(this, iterable) || this;
        /**[ oldValue, key ] */
        _this.evtDelete = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key ] */
        _this.evtCreate = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key, oldValue ], newValue !== odlValue */
        _this.evtUpdate = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key ], is equivalent to evtCreateOrUpdate */
        _this.evtSet = new ts_events_extended_1.SyncEvent();
        /** [ newValue, key, oldValue ], newValue !== oldValue */
        _this.evt = new ts_events_extended_1.SyncEvent();
        //oldValue !== newValue
        _this._evt = new ts_events_extended_1.SyncEvent();
        _this._evt.attach(function (_a) {
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
        return _this;
    }
    TrackableMap.prototype[Symbol.iterator] = function () { return this.entries(); };
    TrackableMap.prototype.isVoid = function (value) { return value === _void_; };
    TrackableMap.prototype.set = function (key, value) {
        var oldValue;
        if (_super.prototype.has.call(this, key)) {
            oldValue = _super.prototype.get.call(this, key);
            if (oldValue === value)
                return this;
        }
        else {
            oldValue = _void_;
        }
        _super.prototype.set.call(this, key, value);
        this._evt.post({ oldValue: oldValue, key: key, "newValue": value });
        return this;
    };
    TrackableMap.prototype.delete = function (key) {
        if (!_super.prototype.has.call(this, key))
            return false;
        var oldValue = _super.prototype.get.call(this, key);
        _super.prototype.delete.call(this, key);
        this._evt.post({ oldValue: oldValue, key: key, "newValue": _void_ });
        return true;
    };
    TrackableMap.prototype.clear = function () {
        try {
            for (var _a = __values(_super.prototype.keys.call(this)), _b = _a.next(); !_b.done; _b = _a.next()) {
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
    TrackableMap[Symbol.species] = TrackableMap;
    TrackableMap.isVoid = isVoid;
    return TrackableMap;
}(MapExtended_1.MapExtended));
exports.TrackableMap = TrackableMap;
