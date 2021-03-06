/*!
 * @pixi/filter-kawase-blur - v3.2.0
 * Compiled Wed, 23 Dec 2020 00:29:02 UTC
 *
 * @pixi/filter-kawase-blur is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { Filter } from '../pixi.js';
import { Point } from '../pixi.js';

var vertex = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";

var fragment = "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}";

var fragmentClamp = "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n";

/**
 * A much faster blur than Gaussian blur, but more complicated to use.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/kawase-blur.png)
 *
 * @see https://software.intel.com/en-us/blogs/2014/07/15/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-kawase-blur|@pixi/filter-kawase-blur}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {number|number[]} [blur=4] - The blur of the filter. Should be greater than `0`. If
 *        value is an Array, setting kernels.
 * @param {number} [quality=3] - The quality of the filter. Should be an integer greater than `1`.
 * @param {boolean} [clamp=false] - Clamp edges, useful for removing dark edges
 *        from fullscreen filters or bleeding to the edge of filterArea.
 */
var KawaseBlurFilter = /*@__PURE__*/(function (Filter) {
    function KawaseBlurFilter(blur, quality, clamp) {
        if ( blur === void 0 ) blur = 4;
        if ( quality === void 0 ) quality = 3;
        if ( clamp === void 0 ) clamp = false;

        Filter.call(this, vertex, clamp ? fragmentClamp : fragment);
        this.uniforms.uOffset = new Float32Array(2);

        this._pixelSize = new Point();
        this.pixelSize = 1;
        this._clamp = clamp;
        this._kernels = null;

        // if `blur` is array , as kernels
        if (Array.isArray(blur)) {
            this.kernels = blur;
        }
        else {
            this._blur = blur;
            this.quality = quality;
        }
    }

    if ( Filter ) KawaseBlurFilter.__proto__ = Filter;
    KawaseBlurFilter.prototype = Object.create( Filter && Filter.prototype );
    KawaseBlurFilter.prototype.constructor = KawaseBlurFilter;

    var prototypeAccessors = { kernels: { configurable: true },clamp: { configurable: true },pixelSize: { configurable: true },quality: { configurable: true },blur: { configurable: true } };

    /**
     * Overrides apply
     * @private
     */
    KawaseBlurFilter.prototype.apply = function apply (filterManager, input, output, clear) {
        var uvX = this._pixelSize.x / input._frame.width;
        var uvY = this._pixelSize.y / input._frame.height;
        var offset;

        if (this._quality === 1 || this._blur === 0) {
            offset = this._kernels[0] + 0.5;
            this.uniforms.uOffset[0] = offset * uvX;
            this.uniforms.uOffset[1] = offset * uvY;
            filterManager.applyFilter(this, input, output, clear);
        }
        else {
            var renderTarget = filterManager.getFilterTexture();

            var source = input;
            var target = renderTarget;
            var tmp;

            var last = this._quality - 1;

            for (var i = 0; i < last; i++) {
                offset = this._kernels[i] + 0.5;
                this.uniforms.uOffset[0] = offset * uvX;
                this.uniforms.uOffset[1] = offset * uvY;
                filterManager.applyFilter(this, source, target, 1);

                tmp = source;
                source = target;
                target = tmp;
            }
            offset = this._kernels[last] + 0.5;
            this.uniforms.uOffset[0] = offset * uvX;
            this.uniforms.uOffset[1] = offset * uvY;
            filterManager.applyFilter(this, source, output, clear);

            filterManager.returnFilterTexture(renderTarget);
        }
    };

    KawaseBlurFilter.prototype._updatePadding = function _updatePadding () {
        this.padding = Math.ceil(this._kernels.reduce(function (acc, v) { return acc + v + 0.5; }, 0));
    };

    /**
     * Auto generate kernels by blur & quality
     * @private
     */
    KawaseBlurFilter.prototype._generateKernels = function _generateKernels () {
        var blur = this._blur;
        var quality = this._quality;
        var kernels = [ blur ];

        if (blur > 0) {
            var k = blur;
            var step = blur / quality;

            for (var i = 1; i < quality; i++) {
                k -= step;
                kernels.push(k);
            }
        }

        this._kernels = kernels;

        this._updatePadding();
    };

    /**
     * The kernel size of the blur filter, for advanced usage.
     *
     * @member {number[]}
     * @default [0]
     */
    prototypeAccessors.kernels.get = function () {
        return this._kernels;
    };
    prototypeAccessors.kernels.set = function (value) {
        if (Array.isArray(value) && value.length > 0) {
            this._kernels = value;
            this._quality = value.length;
            this._blur = Math.max.apply(Math, value);
        }
        else {
            // if value is invalid , set default value
            this._kernels = [0];
            this._quality = 1;
        }
    };

    /**
     * Get the if the filter is clampped.
     *
     * @readonly
     * @member {boolean}
     * @default false
     */
    prototypeAccessors.clamp.get = function () {
        return this._clamp;
    };

    /**
     * Sets the pixel size of the filter. Large size is blurrier. For advanced usage.
     *
     * @member {PIXI.Point|number[]}
     * @default [1, 1]
     */
    prototypeAccessors.pixelSize.set = function (value) {
        if (typeof value === 'number') {
            this._pixelSize.x = value;
            this._pixelSize.y = value;
        }
        else if (Array.isArray(value)) {
            this._pixelSize.x = value[0];
            this._pixelSize.y = value[1];
        }
        else if (value instanceof Point) {
            this._pixelSize.x = value.x;
            this._pixelSize.y = value.y;
        }
        else {
            // if value is invalid , set default value
            this._pixelSize.x = 1;
            this._pixelSize.y = 1;
        }
    };
    prototypeAccessors.pixelSize.get = function () {
        return this._pixelSize;
    };

    /**
     * The quality of the filter, integer greater than `1`.
     *
     * @member {number}
     * @default 3
     */
    prototypeAccessors.quality.get = function () {
        return this._quality;
    };
    prototypeAccessors.quality.set = function (value) {
        this._quality = Math.max(1, Math.round(value));
        this._generateKernels();
    };

    /**
     * The amount of blur, value greater than `0`.
     *
     * @member {number}
     * @default 4
     */
    prototypeAccessors.blur.get = function () {
        return this._blur;
    };
    prototypeAccessors.blur.set = function (value) {
        this._blur = value;
        this._generateKernels();
    };

    Object.defineProperties( KawaseBlurFilter.prototype, prototypeAccessors );

    return KawaseBlurFilter;
}(Filter));

export { KawaseBlurFilter };
//# sourceMappingURL=filter-kawase-blur.esm.js.map
