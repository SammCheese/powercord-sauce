"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.nhentaiAPIError = exports.API = exports.API_URL = exports.THUMBS_URL = exports.IMAGE_URL = exports.HOST_URL = exports.SortMethods = void 0;
var node_fetch_1 = require("node-fetch");
var doujin_1 = require("./doujin");
var search_1 = require("./search");
// TODO: confirm that popular actually sorts by favorites
var SortMethods;
(function (SortMethods) {
    /**
     * Sort by most recently published
     */
    SortMethods["RECENT"] = "";
    /**
     * Sort by amount of favorites
     */
    SortMethods["POPULAR_ALL_TIME"] = "popular";
    /**
     * Sort by amount of favorites gained in the last 7 days
     */
    SortMethods["POPULAR_THIS_WEEK"] = "popular-week";
    /**
     * Sort by amount of favorites gained in the last 24 hours
     */
    SortMethods["POPULAR_TODAY"] = "popular-today";
})(SortMethods = exports.SortMethods || (exports.SortMethods = {}));
exports.HOST_URL = 'https://nhentai.net';
exports.IMAGE_URL = 'https://i.nhentai.net';
exports.THUMBS_URL = 'https://t.nhentai.net';
exports.API_URL = exports.HOST_URL + '/api';
var API = /** @class */ (function () {
    /**
     * Constuct a new API wrapper
     * @param options.preserveRaw Save the raw doujin to `Doujin#raw`
     */
    function API(options) {
        if (options === void 0) { options = { preserveRaw: false }; }
        this.options = options;
        this.options = options;
    }
    /**
     * Check if a doujin exists
     * @param doujinID ID of the doujin
     */
    API.prototype.doujinExists = function (doujinID) {
        return new Promise(function (resolve, reject) {
            if (isNaN(+doujinID))
                return reject(new Error('DoujinID paramater is not a number.'));
            if (+doujinID <= -1)
                return reject(new Error('DoujinID cannot be lower than 1.'));
            node_fetch_1.default(exports.API_URL + "/gallery/" + doujinID, { method: 'HEAD' })
                .then(function (res) {
                if (res.status !== 200 && res.status !== 404)
                    reject(new Error("Response code is not a 404 or 200. (" + res.status + ")"));
                else
                    resolve(res.status === 200);
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Fetch a doujin
     * @param doujinID ID of the doujin.
     */
    API.prototype.fetchDoujin = function (doujinID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (isNaN(+doujinID))
                return reject(new Error('DoujinID paramater is not a number.'));
            if (+doujinID <= -1)
                return reject(new Error('DoujinID cannot be lower than 1.'));
            var url = exports.API_URL + "/gallery/" + doujinID;
            node_fetch_1.default(url)
                .then(function (data) { return data.json(); })
                .then(function (data) {
                if (data.error) {
                    if (data.error === 'does not exist')
                        resolve(undefined);
                    else
                        reject(new nhentaiAPIError(data, url));
                }
                else
                    resolve(new doujin_1.Doujin(data, _this));
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Get doujins shown on the homepage. Alias for `search('*', [...])`
     */
    API.prototype.fetchHomepage = function (page, sort) {
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = ''; }
        return this.search('*', page, sort);
    };
    /**
     * Search nhentai for any doujin that matches the query in any titles
     */
    API.prototype.search = function (query, page, sort) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = ''; }
        return new Promise(function (resolve, reject) {
            if (isNaN(+page))
                return reject(new Error('Page paramater is not a number.'));
            var sorting = !!sort ? "&sort=" + sort : '';
            var url = exports.API_URL + "/galleries/search?query=" + query + "&page=" + page + sorting;
            node_fetch_1.default(url)
                .then(function (data) { return data.json(); })
                .then(function (data) {
                if (data.error)
                    reject(new nhentaiAPIError(data, url));
                else
                    resolve(new search_1.SearchResult(data, _this));
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Searches nhentai for doujins that have this tag
     * @param tagID ID of the tag
     */
    API.prototype.searchByTagID = function (tagID, page, sort) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = ''; }
        return new Promise(function (resolve, reject) {
            if (isNaN(+page))
                return reject(new Error('Page paramater is not a number.'));
            if (isNaN(+tagID))
                return reject(new Error('TagID paramater is not a number'));
            var sorting = !!sort ? "&sort=" + sort : '';
            var url = exports.API_URL + "/galleries/tagged?tag_id=" + tagID + "&page=" + page + sorting;
            node_fetch_1.default(url)
                .then(function (data) { return data.json(); })
                .then(function (data) {
                if (data.error)
                    reject(new nhentaiAPIError(data, url));
                else
                    resolve(new search_1.SearchResult(data, _this));
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Find similar doujins
     * @param doujinID ID of the doujin
     */
    API.prototype.searchRelated = function (doujinID, page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        return new Promise(function (resolve, reject) {
            if (isNaN(+page))
                return reject(new Error('Page paramater is not a number.'));
            if (isNaN(+doujinID))
                return reject(new Error('DoujinID paramater is not a number'));
            var url = exports.API_URL + "/gallery/" + doujinID + "/related";
            node_fetch_1.default(url)
                .then(function (data) { return data.json(); })
                .then(function (data) {
                if (data.error)
                    reject(new nhentaiAPIError(data, url));
                else
                    resolve(new search_1.SearchResult(data, _this));
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Get a random doujin by using nhentai's `/random` endpoint which redirects to a doujin and the url is captured.
     */
    API.prototype.randomDoujinID = function () {
        return new Promise(function (resolve, reject) {
            node_fetch_1.default(exports.HOST_URL + "/random", { method: 'HEAD' })
                .then(function (data) {
                var match = data.url.match(/https?:\/\/nhentai\.net\/g\/(\d{1,7})\//);
                if (!match || !match[1])
                    return reject(new Error('Could not find doujin id in redirect url.'));
                resolve(+match[1]);
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Gets a random doujin using `randomDoujinID()` and `fetchDoujin()`
     */
    API.prototype.randomDoujin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.randomDoujinID()
                .then(function (doujinID) {
                return _this.fetchDoujin(doujinID).then(function (doujin) {
                    if (!doujin)
                        reject(new Error("Random doujin is now not accessible, this shouldn't happen again."));
                    else
                        resolve(doujin);
                });
            })
                .catch(function (error) { return reject(error); });
        });
    };
    return API;
}());
exports.API = API;
var nhentaiAPIError = /** @class */ (function (_super) {
    __extends(nhentaiAPIError, _super);
    function nhentaiAPIError(response, url) {
        var _this = _super.call(this, 'API returned an error') || this;
        _this.response = response;
        _this.url = url;
        _this.name = 'nhentaiAPIError';
        Error.captureStackTrace(_this, nhentaiAPIError);
        return _this;
    }
    return nhentaiAPIError;
}(Error));
exports.nhentaiAPIError = nhentaiAPIError;
