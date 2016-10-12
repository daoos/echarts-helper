(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["echarts"], factory);
	else if(typeof exports === 'object')
		exports["echartsHelper"] = factory(require("echarts"));
	else
		root["echartsHelper"] = factory(root["echarts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var echarts = __webpack_require__(2);
	var extend = __webpack_require__(3);


	var echartsInstanceExtend = {
	    setData:function(data){
	        var option = hcharts.getOption(extend(this.__opt,{data:data}));
	        this.hideLoading();
	        this.setOption(option);
	    }
	}

	var echartsHelper = {}


	/**
	 * return an extended echartsInstance
	 * var chart = echartsHelper.create({
	 *    dom:document.getElementById('main'),
	 *    data:{},                         //{},[] or null, when null is set,not emptyTips will show.     
	 *    type:'bar',
	 *    resize:true,                     //(Optional)Default true
	 *    sort:'none',                     //(Optional)Default none,['none','asc','desc']
	 *    sortType:'auto',                 //(Optional)Default auto identify,can be ['date','number','text','number-like']
	 *    emptyTips:{                      //(Optional)show empty tips when data is empty.set null to disable empty tips
	 *      text:"暂无数据"
	 *      textColor:"#000",
	 *      maskColor:"rgba(255, 255, 255, 0.8)"
	 *    } ,     
	 *    theme:'dark',                    //(Optional)Default null
	 *    echartsOption:{}                  //(Optional)Default {},will merge to the generate option
	 * })
	**/
	echartsHelper.create = function(opt){

	    var defaultOpt = {
	        resize:true,
	        sort:'none',           
	        sortType:'auto',       
	        emptyTips:{
	            text:'暂无数据',
	            textColor:"#aaa",
	            textSize:14,
	            bgColor:"#eee"
	        },   
	        echartsOption:{}
	    }
	    opt = extend({},defaultOpt,opt);

	    var chart = echarts.init(opt.dom);
	    
	    function showEmptyTips(){
	        var canvas = document.createElement('canvas');
	        var width = opt.dom.clientWidth;
	        var height = opt.dom.clientHeight;
	        var ctx = canvas.getContext('2d');
	        var text = opt.emptyTips.text || '暂无数据';
	        var textSize = opt.emptyTips.textSize || 14;
	        
	        canvas.width = width;
	        canvas.height = height;
	        if(opt.dom.children[0].children.length > 0){
	            for(var i = opt.dom.children[0].children.length - 1;i>=0;i--){
	                opt.dom.children[0].removeChild(opt.dom.children[0].children[i]);
	            }
	        }
	        opt.dom.children[0].appendChild(canvas);

	        ctx.fillStyle = opt.emptyTips.bgColor || defaultOpt.emptyTips.bgColor;
	        ctx.fillRect(0, 0, width, height);
	        ctx.fillStyle = opt.emptyTips.textColor || defaultOpt.emptyTips.textColor;
	        ctx.font = (opt.emptyTips.textSize || 14)+ "px";
	        var mesure = ctx.measureText(text);
	        ctx.fillText(text, (width - mesure.width) / 2, (height - textSize) / 2);
	    }

	    if(opt.data){
	        //empty data
	        if((toString.call(opt.data) === '[object Object]' && isObjectEmpty(opt.data))
	           || (toString.call(opt.data) === '[object Array]' && opt.data.length === 0)
	        ){  
	            //show empty tips
	            if(opt.emptyTips){
	                showEmptyTips();
	            }
	        }else{
	            var option = hcharts.getOption(opt);
	            chart.setOption(option);
	        }
	    }
	    chart.__opt = opt;
	    extend(chart,echartsInstanceExtend);
	    return chart;
	}

	/**
	 * return echarts formatted option
	 */
	echartsHelper.getOption = function(opt){
	    return {}
	}

	module.exports = echartsHelper;

	function isObjectEmpty(object) {
	    for (var i in object) {
	        if (object.hasOwnProperty(i)) {
	            return false;
	        }
	    }
	    return true;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ }
/******/ ])
});
;