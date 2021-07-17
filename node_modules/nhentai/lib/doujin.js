"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doujin = void 0;
var image_1 = require("./image");
var tag_1 = require("./tag");
var api_1 = require("./api");
var Doujin = /** @class */ (function () {
    /**
     * Internal constructor. Use only if you know what you are doing.
     * @param raw Raw data
     * @param api Instance of the api
     */
    function Doujin(raw, api) {
        var _this = this;
        this.id = raw.id;
        this.mediaId = +raw.media_id;
        this.titles = raw.title;
        this.scanlator = raw.scanlator;
        this.uploadDate = new Date(raw.upload_date * 1000);
        this.length = raw.num_pages;
        this.favorites = raw.num_favorites;
        this.url = api_1.HOST_URL + "/g/" + raw.id;
        this.pages = raw.images.pages.map(function (image, index) { return new image_1.Image(image, index + 1, _this); });
        this.cover = new image_1.Image(raw.images.cover, 'cover', this);
        this.thumbnail = new image_1.Image(raw.images.thumbnail, 'thumb', this);
        this.tags = new tag_1.TagManager(raw.tags);
        if (api.options.preserveRaw)
            this.raw = raw;
    }
    Doujin.prototype.hasTagByName = function (name) {
        return !!this.tags.all.find(function (tag) { return tag.name === name; });
    };
    Doujin.prototype.hasTagByID = function (ID) {
        return !!this.tags.all.find(function (tag) { return tag.id === ID; });
    };
    return Doujin;
}());
exports.Doujin = Doujin;
