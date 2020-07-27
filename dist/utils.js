"use strict";
// tslint:disable: no-parameter-reassignment
/*=--------------------------------------------------------------=

 TSPath - Typescript Path Resolver

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman

 I hope this piece of software brings joy into your life, makes
 you sleep better knowing that you are no longer in path hell!

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 Also, I would love to see you getting involved in the project!

 Enjoy!

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =----------------------------------------------------------------= */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var nodePath = require("path");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Helper method used to safely get the value of an AST node
     * @param node
     * @returns {string}
     */
    Utils.safeGetAstNodeValue = function (node) {
        if (Utils.isEmpty(node) || Utils.isEmpty(node.value)) {
            return "";
        }
        else {
            return node.value;
        }
    };
    /**
     * Cross platform method that verifies that the given path ends
     * with a path delimiter, NOTE that this method does no effort
     * in verifying that your path string is correct.
     * @param searchPath
     * @returns {string}
     */
    Utils.ensureTrailingPathDelimiter = function (searchPath) {
        var retSearchPath = searchPath;
        if (Utils.isEmpty(searchPath)) {
            return;
        }
        var pathSep = nodePath.sep;
        if (retSearchPath.endsWith(pathSep) === false) {
            retSearchPath = retSearchPath + pathSep;
        }
        return retSearchPath;
    };
    /**
     * Appends given value to a given path
     * @param path
     * @param part
     * @param trailingDelim
     */
    Utils.appendToPath = function (path, part, trailingDelim) {
        if (trailingDelim === void 0) { trailingDelim = true; }
        Utils.ensureTrailingPathDelimiter(path);
        path += part;
        if (trailingDelim) {
            Utils.ensureTrailingPathDelimiter(path);
        }
    };
    /**
     * Checks for unset input string
     * @param input
     * @returns {boolean}
     */
    Utils.isEmpty = function (input) {
        return (input === undefined || input === null || input === '');
    };
    /**
     * Removes the trailing "*" from a string (if any)
     * @param path
     * @returns {string}
     */
    Utils.stripWildcard = function (path) {
        if (path.endsWith("/*")) {
            path = path.substr(0, path.length - 2);
        }
        return path;
    };
    /**
     * Replaces double slashes "//" (if any)
     * @param filePath
     */
    Utils.replaceDoubleSlashes = function (filePath) {
        filePath = nodePath.normalize(filePath);
    };
    /**
     * Converts EFBBBF (UTF-8 BOM) to FEFF (UTF-16 BOM)
     * @param data
     */
    Utils.stripByteOrderMark = function (data) {
        if (data.charCodeAt(0) === 0xFEFF) {
            data = data.slice(1);
        }
        return data;
    };
    /**
     * Checks if a given filename contains a search path
     * @param filename
     * @returns {boolean}
     */
    Utils.fileHavePath = function (filename) {
        return (filename !== nodePath.basename(filename));
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map