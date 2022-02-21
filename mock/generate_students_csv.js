"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var fileName = "./mock/students.csv";
var content = "学号,姓名,电话号码,组织\n";
(0, fs_1.unlinkSync)(fileName);
var id = function () {
    var _id = 1238400000;
    return function () { return _id++; };
};
var name = function () {
    var _name = 0x1200;
    return function () {
        _name++;
        return decodeUnicode("\\u" + _name + "\\u" + _name + "\\u" + _name);
    };
};
var tel = function () {
    var _tel = 19923890000;
    return function () { return _tel++; };
};
var org = "23级美声";
(0, fs_1.appendFileSync)(fileName, content);
var g_id = id();
var g_name = name();
var g_tel = tel();
for (var i = 0; i < 500; i++) {
    var row = "".concat(g_id(), ",").concat(g_name(), ",").concat(g_tel(), ",").concat(org, "\n");
    (0, fs_1.appendFileSync)(fileName, row);
}
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
