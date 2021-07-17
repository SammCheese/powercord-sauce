"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
var doujin_1 = require("./doujin");
var SearchResult = /** @class */ (function () {
    /**
     * Internal constructor. Use only if you know what you are doing.
     * @param raw Raw data
     * @param api Instance of the api
     */
    function SearchResult(raw, api) {
        this.doujins = raw.result.map(function (doujin) { return new doujin_1.Doujin(doujin, api); });
        this.numPages = raw.num_pages;
        this.doujinsPerPage = raw.per_page;
        if (api.options.preserveRaw)
            this.raw = raw;
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
