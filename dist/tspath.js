#! /usr/bin/env node
"use strict";
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
exports.TSpath = void 0;
const pkg = require("../package.json");
const chalk_1 = require("chalk");
const yargs = require("yargs");
const Confirm = require("prompt-confirm");
const log = console.log;
const argv = yargs.argv;
const parser_engine_1 = require("./parser-engine");
const parent_file_finder_1 = require("./parent-file-finder");
const type_definitions_1 = require("./type-definitions");
const engine = new parser_engine_1.ParserEngine();
function processPath(projectPath) {
    if (engine.setProjectPath(projectPath)) {
        engine.execute();
    }
}
function exist_string(val) {
    return val && typeof val === "string";
}
function TSpath() {
    log(chalk_1.default.yellow("TSPath " + pkg.version));
    let filter = ["js"];
    const force = (!!argv.force || !!argv.f);
    const projectPath = process.cwd();
    const compactOutput = argv.preserve ? false : true;
    const findResult = parent_file_finder_1.ParentFileFinder.findFile(projectPath, type_definitions_1.TS_CONFIG);
    //Check existence of argv param filter
    const argvParamFilter = argv.ext || argv.filter;
    if (exist_string(argvParamFilter)) {
        filter = argvParamFilter.split(",").map((ext) => {
            return ext.replace(/\s/g, "");
        });
    }
    if (filter.length === 0) {
        log(chalk_1.default.bold.red("File filter missing!"));
        process.exit(23);
    }
    engine.compactMode = compactOutput;
    engine.setFileFilter(filter);
    if (force && findResult.fileFound) {
        processPath(findResult.path);
    }
    else if (findResult.fileFound) {
        new Confirm("Process project at: <" + findResult.path + "> ?").ask(function (answer) {
            if (answer) {
                processPath(findResult.path);
            }
        });
    }
    else {
        log(chalk_1.default.bold("No project root found!"));
    }
}
exports.TSpath = TSpath;
