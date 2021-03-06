/*!
 * @pixi/filter-advanced-bloom - v3.2.0
 * Compiled Wed, 23 Dec 2020 00:29:02 UTC
 *
 * @pixi/filter-advanced-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { Filter } from '../pixi.js';
import { KawaseBlurFilter } from './filter-kawase-blur.js';
import { settings } from '../pixi.js';

var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";

var fragment = "\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n";

/**
 * Internal filter for AdvancedBloomFilter to get brightness.
 * @class
 * @private
 * @param {number} [threshold=0.5] Defines how bright a color needs to be extracted.
 */
var ExtractBrightnessFilter = /*@__PURE__*/(function (Filter) {
    function ExtractBrightnessFilter(threshold) {
        if ( threshold === void 0 ) threshold = 0.5;

        Filter.call(this, vertex, fragment);

        this.threshold = threshold;
    }

    if ( Filter ) ExtractBrightnessFilter.__proto__ = Filter;
    ExtractBrightnessFilter.prototype = Object.create( Filter && Filter.prototype );
    ExtractBrightnessFilter.prototype.constructor = ExtractBrightnessFilter;

    var prototypeAccessors = { threshold: { configurable: true } };

    /**
     * Defines how bright a color needs to be extracted.
     *
     * @member {number}
     * @default 0.5
     */
    prototypeAccessors.threshold.get = function () {
        return this.uniforms.threshold;
    };
    prototypeAccessors.threshold.set = function (value) {
        this.uniforms.threshold = value;
    };

    Object.defineProperties( ExtractBrightnessFilter.prototype, prototypeAccessors );

    return ExtractBrightnessFilter;
}(Filter));

var fragment$1 = "uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n";

/**
 * The AdvancedBloomFilter applies a Bloom Effect to an object. Unlike the normal BloomFilter
 * this had some advanced controls for adjusting the look of the bloom. Note: this filter
 * is slower than normal BloomFilter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/advanced-bloom.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-advanced-bloom|@pixi/filter-advanced-bloom}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 *
 * @param {object|number} [options] - The optional parameters of advanced bloom filter.
 *                        When options is a number , it will be `options.threshold`.
 * @param {number} [options.threshold=0.5] - Defines how bright a color needs to be to affect bloom.
 * @param {number} [options.bloomScale=1.0] - To adjust the strength of the bloom. Higher values is more intense brightness.
 * @param {number} [options.brightness=1.0] - The brightness, lower value is more subtle brightness, higher value is blown-out.
 * @param {number} [options.blur=8] - Sets the strength of the Blur properties simultaneously
 * @param {number} [options.quality=4] - The quality of the Blur filter.
 * @param {number[]} [options.kernels=null] - The kernels of the Blur filter.
 * @param {number|number[]|PIXI.Point} [options.pixelSize=1] - the pixelSize of the Blur filter.
 * @param {number} [options.resolution=PIXI.settings.FILTER_RESOLUTION] - The resolution of the Blur filter.
 */
var AdvancedBloomFilter = /*@__PURE__*/(function (Filter) {
    function AdvancedBloomFilter(options) {

        Filter.call(this, vertex, fragment$1);

        if (typeof options === 'number') {
            options = { threshold: options };
        }

        options = Object.assign({
            threshold: 0.5,
            bloomScale: 1.0,
            brightness: 1.0,
            kernels: null,
            blur: 8,
            quality: 4,
            pixelSize: 1,
            resolution: settings.FILTER_RESOLUTION,
        }, options);

        /**
         * To adjust the strength of the bloom. Higher values is more intense brightness.
         *
         * @member {number}
         * @default 1.0
         */
        this.bloomScale = options.bloomScale;

        /**
         * The brightness, lower value is more subtle brightness, higher value is blown-out.
         *
         * @member {number}
         * @default 1.0
         */
        this.brightness = options.brightness;

        var kernels = options.kernels;
        var blur = options.blur;
        var quality = options.quality;
        var pixelSize = options.pixelSize;
        var resolution = options.resolution;

        this._extractFilter = new ExtractBrightnessFilter(options.threshold);
        this._extractFilter.resolution = resolution;
        this._blurFilter = kernels ?
            new KawaseBlurFilter(kernels) :
            new KawaseBlurFilter(blur, quality, true);
        this.pixelSize = pixelSize;
        this.resolution = resolution;
    }

    if ( Filter ) AdvancedBloomFilter.__proto__ = Filter;
    AdvancedBloomFilter.prototype = Object.create( Filter && Filter.prototype );
    AdvancedBloomFilter.prototype.constructor = AdvancedBloomFilter;

    var prototypeAccessors = { resolution: { configurable: true },threshold: { configurable: true },kernels: { configurable: true },blur: { configurable: true },quality: { configurable: true },pixelSize: { configurable: true } };

    /**
     * Override existing apply method in PIXI.Filter
     * @private
     */
    AdvancedBloomFilter.prototype.apply = function apply (filterManager, input, output, clear, currentState) {

        var brightTarget = filterManager.getFilterTexture();

        this._extractFilter.apply(filterManager, input, brightTarget, 1, currentState);

        var bloomTarget = filterManager.getFilterTexture();

        this._blurFilter.apply(filterManager, brightTarget, bloomTarget, 1, currentState);

        this.uniforms.bloomScale = this.bloomScale;
        this.uniforms.brightness = this.brightness;
        this.uniforms.bloomTexture = bloomTarget;

        filterManager.applyFilter(this, input, output, clear);

        filterManager.returnFilterTexture(bloomTarget);
        filterManager.returnFilterTexture(brightTarget);
    };

    /**
     * The resolution of the filter.
     *
     * @member {number}
     */
    prototypeAccessors.resolution.get = function () {
        return this._resolution;
    };
    prototypeAccessors.resolution.set = function (value) {
        this._resolution = value;

        if (this._extractFilter) {
            this._extractFilter.resolution = value;
        }
        if (this._blurFilter) {
            this._blurFilter.resolution = value;
        }
    };

    /**
     * Defines how bright a color needs to be to affect bloom.
     *
     * @member {number}
     * @default 0.5
     */
    prototypeAccessors.threshold.get = function () {
        return this._extractFilter.threshold;
    };
    prototypeAccessors.threshold.set = function (value) {
        this._extractFilter.threshold = value;
    };

    /**
     * Sets the kernels of the Blur Filter
     *
     * @member {number}
     * @default 4
     */
    prototypeAccessors.kernels.get = function () {
        return this._blurFilter.kernels;
    };
    prototypeAccessors.kernels.set = function (value) {
        this._blurFilter.kernels = value;
    };

    /**
     * Sets the strength of the Blur properties simultaneously
     *
     * @member {number}
     * @default 2
     */
    prototypeAccessors.blur.get = function () {
        return this._blurFilter.blur;
    };
    prototypeAccessors.blur.set = function (value) {
        this._blurFilter.blur = value;
    };

    /**
     * Sets the quality of the Blur Filter
     *
     * @member {number}
     * @default 4
     */
    prototypeAccessors.quality.get = function () {
        return this._blurFilter.quality;
    };
    prototypeAccessors.quality.set = function (value) {
        this._blurFilter.quality = value;
    };

    /**
     * Sets the pixelSize of the Kawase Blur filter
     *
     * @member {number|number[]|PIXI.Point}
     * @default 1
     */
    prototypeAccessors.pixelSize.get = function () {
        return this._blurFilter.pixelSize;
    };
    prototypeAccessors.pixelSize.set = function (value) {
        this._blurFilter.pixelSize = value;
    };

    Object.defineProperties( AdvancedBloomFilter.prototype, prototypeAccessors );

    return AdvancedBloomFilter;
}(Filter));

export { AdvancedBloomFilter };
//# sourceMappingURL=filter-advanced-bloom.esm.js.map
