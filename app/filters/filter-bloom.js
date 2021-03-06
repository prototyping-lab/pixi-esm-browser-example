/*!
 * @pixi/filter-bloom - v3.2.0
 * Compiled Wed, 23 Dec 2020 00:29:02 UTC
 *
 * @pixi/filter-bloom is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
import { Filter } from '../pixi.js';
import { BLEND_MODES } from '../pixi.js';
import { AlphaFilter } from './filter-alpha.js';
import { BlurFilterPass } from './filter-blur.js';
import { settings } from '../pixi.js';
import { Point } from '../pixi.js';

/**
 * The BloomFilter applies a Gaussian blur to an object.
 * The strength of the blur can be set for x- and y-axis separately.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bloom.png)
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 * @see {@link https://www.npmjs.com/package/@pixi/filter-bloom|@pixi/filter-bloom}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 * @param {number|PIXI.Point|number[]} [blur=2] Sets the strength of both the blurX and blurY properties simultaneously
 * @param {number} [quality=4] The quality of the blurX & blurY filter.
 * @param {number} [resolution=PIXI.settings.FILTER_RESOLUTION] The resolution of the blurX & blurY filter.
 * @param {number} [kernelSize=5] The kernelSize of the blurX & blurY filter.Options: 5, 7, 9, 11, 13, 15.
 */
var BloomFilter = /*@__PURE__*/(function (Filter) {
    function BloomFilter(blur, quality, resolution, kernelSize) {
        if ( blur === void 0 ) blur = 2;
        if ( quality === void 0 ) quality = 4;
        if ( resolution === void 0 ) resolution = settings.FILTER_RESOLUTION;
        if ( kernelSize === void 0 ) kernelSize = 5;

        Filter.call(this);

        var blurX;
        var blurY;

        if (typeof blur === 'number') {
            blurX = blur;
            blurY = blur;
        }
        else if (blur instanceof Point) {
            blurX = blur.x;
            blurY = blur.y;
        }
        else if (Array.isArray(blur)) {
            blurX = blur[0];
            blurY = blur[1];
        }

        this.blurXFilter = new BlurFilterPass(true, blurX, quality, resolution, kernelSize);
        this.blurYFilter = new BlurFilterPass(false, blurY, quality, resolution, kernelSize);
        this.blurYFilter.blendMode = BLEND_MODES.SCREEN;
        this.defaultFilter = new AlphaFilter();
    }

    if ( Filter ) BloomFilter.__proto__ = Filter;
    BloomFilter.prototype = Object.create( Filter && Filter.prototype );
    BloomFilter.prototype.constructor = BloomFilter;

    var prototypeAccessors = { blur: { configurable: true },blurX: { configurable: true },blurY: { configurable: true } };

    BloomFilter.prototype.apply = function apply (filterManager, input, output, clear) {
        var renderTarget = filterManager.getFilterTexture();

        //TODO - copyTexSubImage2D could be used here?
        this.defaultFilter.apply(filterManager, input, output, clear);

        this.blurXFilter.apply(filterManager, input, renderTarget);
        this.blurYFilter.apply(filterManager, renderTarget, output, 0);

        filterManager.returnFilterTexture(renderTarget);
    };

    /**
     * Sets the strength of both the blurX and blurY properties simultaneously
     *
     * @member {number}
     * @default 2
     */
    prototypeAccessors.blur.get = function () {
        return this.blurXFilter.blur;
    };
    prototypeAccessors.blur.set = function (value) {
        this.blurXFilter.blur = this.blurYFilter.blur = value;
    };

    /**
     * Sets the strength of the blurX property
     *
     * @member {number}
     * @default 2
     */
    prototypeAccessors.blurX.get = function () {
        return this.blurXFilter.blur;
    };
    prototypeAccessors.blurX.set = function (value) {
        this.blurXFilter.blur = value;
    };

    /**
     * Sets the strength of the blurY property
     *
     * @member {number}
     * @default 2
     */
    prototypeAccessors.blurY.get = function () {
        return this.blurYFilter.blur;
    };
    prototypeAccessors.blurY.set = function (value) {
        this.blurYFilter.blur = value;
    };

    Object.defineProperties( BloomFilter.prototype, prototypeAccessors );

    return BloomFilter;
}(Filter));

export { BloomFilter };
//# sourceMappingURL=filter-bloom.esm.js.map
