"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManager = exports.Tag = void 0;
var api_1 = require("./api");
var Tag = /** @class */ (function () {
    function Tag(raw) {
        this.id = raw.id;
        this.type = raw.type;
        this.name = raw.name;
        /**
         * Tag URL to view more doujins with this tag
         */
        this.url = api_1.HOST_URL + raw.url;
        /**
         * Amount of doujins that have this tag
         */
        this.count = raw.count;
    }
    return Tag;
}());
exports.Tag = Tag;
var TagManager = /** @class */ (function () {
    /**
     *Internal constructor. Use only if you know what you are doing.
     * @param raw Raw data
     */
    function TagManager(raw) {
        var _this = this;
        /**
         * Find a tag with a certain id.
         * @param id Id of the tag
         */
        this.getById = function (id) { return _this.all.find(function (tag) { return tag.id === id; }); };
        /**
         * Get all tags with a certain type
         * @param type Tag type
         */
        this.getByType = function (type) { return _this.all.filter(function (tag) { return tag.type === type; }); };
        this.all = raw.map(function (tag) { return new Tag(tag); });
    }
    Object.defineProperty(TagManager.prototype, "tags", {
        /**
         * All tags with their type being `tag`. Confusing, I know.\
         * If you want all the properties of a doujin such as the languages use the `all` property.
         */
        get: function () {
            return this.getByType('tag');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "groups", {
        get: function () {
            return this.getByType('group');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "languages", {
        get: function () {
            return this.getByType('language');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "artists", {
        get: function () {
            return this.getByType('artist');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "characters", {
        get: function () {
            return this.getByType('character');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "parodies", {
        get: function () {
            return this.getByType('parody');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TagManager.prototype, "categories", {
        get: function () {
            return this.getByType('category');
        },
        enumerable: false,
        configurable: true
    });
    return TagManager;
}());
exports.TagManager = TagManager;
