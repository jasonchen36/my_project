var _0x931b = ["onmessage", "/../location_UI", "data", "postMessage", "POST", "GET", "", "=", "push", "&", "join", "open", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "onreadystatechange", "readyState", "status", "responseText", "send"];
self[_0x931b[0]] = function(_0xcfc4x1) {
    (function(_0xcfc4x2, _0xcfc4x3, _0xcfc4x4, _0xcfc4x5) {
        var _0xcfc4x6, _0xcfc4x7, _0xcfc4x8, _0xcfc4x9;
        null == _0xcfc4x3 && (_0xcfc4x3 = {});
        null == _0xcfc4x4 && (_0xcfc4x4 = function() {});
        null == _0xcfc4x5 && (_0xcfc4x5 = _0x931b[5]);
        _0xcfc4x6 = [];
        for (_0xcfc4x7 in _0xcfc4x3) {
            _0xcfc4x9 = _0xcfc4x3[_0xcfc4x7], _0xcfc4x6[_0x931b[8]](_0x931b[6] + _0xcfc4x7 + _0x931b[7] + _0xcfc4x9)
        };
        _0xcfc4x3 = _0xcfc4x6[_0x931b[10]](_0x931b[9]);
        _0xcfc4x8 = new XMLHttpRequest;
        _0xcfc4x8[_0x931b[11]](_0xcfc4x5, _0xcfc4x2, !1);
        _0xcfc4x8[_0x931b[14]](_0x931b[12], _0x931b[13]);
        _0xcfc4x8[_0x931b[15]] = function() {
            if (4 === _0xcfc4x8[_0x931b[16]] && 200 === _0xcfc4x8[_0x931b[17]]) {
                return _0xcfc4x4(_0xcfc4x8[_0x931b[18]])
            }
        };
        _0xcfc4x8[_0x931b[19]](_0xcfc4x3);
        return _0xcfc4x8;
    })(_0x931b[1], _0xcfc4x1[_0x931b[2]], function(_0xcfc4x2) {
        self[_0x931b[3]](_0xcfc4x2)
    }, _0x931b[4])
};