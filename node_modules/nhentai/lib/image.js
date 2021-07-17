"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var node_fetch_1 = require("node-fetch");
var api_1 = require("./api");
var Image = /** @class */ (function () {
    /**
     * Internal constructor. Use only if you know what you are doing.
     * @param raw Raw data
     * @param name Indicates page number or thumbnail / cover
     * @param doujin Parent doujin instance
     */
    function Image(raw, name, doujin) {
        /**
         * Page number or null when this is a thumbnail/cover.
         */
        this.page_number = null;
        this.extension = Image.extensionConvert(raw.t);
        this.height = raw.h;
        this.width = raw.w;
        var parsedName = Number(name);
        this.url = (isNaN(parsedName) ? api_1.THUMBS_URL : api_1.IMAGE_URL) + "/galleries/" + doujin.mediaId + "/" + name + "." + this.extension;
    }
    /**
     * Fetches the image
     */
    Image.prototype.fetch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            node_fetch_1.default(_this.url)
                .then(function (data) { return data.buffer(); })
                .then(function (data) { return resolve(data); })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Converts an images `t` paramater to a file extension
     * @param extension Raw type from the api
     */
    Image.extensionConvert = function (extension) {
        switch (extension) {
            case 'p':
                return 'png';
            case 'j':
                return 'jpg';
            case 'g':
                return 'gif';
            default:
                throw new Error("Image extension \"" + extension + "\" is not a known format.");
        }
    };
    return Image;
}());
exports.Image = Image;
