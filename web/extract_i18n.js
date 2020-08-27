const fs = require("fs");
const jsonXlsx = require("./json-xlsx");
const extract_i18n_cura = require("./extract_i18n_cura");

fs.rmdirSync("./build-web/asset/i18n", {recursive: true});
extract_i18n_cura();
jsonXlsx.xlsx2json("./i18n.xlsx", "./build-web/asset/i18n/common/");
