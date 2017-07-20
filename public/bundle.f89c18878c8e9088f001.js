webpackJsonp([1],{

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _consolidatedEvents = __webpack_require__(246);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _computeOffsetPixels = __webpack_require__(423);

var _computeOffsetPixels2 = _interopRequireDefault(_computeOffsetPixels);

var _constants = __webpack_require__(184);

var _constants2 = _interopRequireDefault(_constants);

var _debugLog = __webpack_require__(424);

var _debugLog2 = _interopRequireDefault(_debugLog);

var _ensureChildrenIsSingleDOMElement = __webpack_require__(425);

var _ensureChildrenIsSingleDOMElement2 = _interopRequireDefault(_ensureChildrenIsSingleDOMElement);

var _getCurrentPosition = __webpack_require__(426);

var _getCurrentPosition2 = _interopRequireDefault(_getCurrentPosition);

var _onNextTick = __webpack_require__(428);

var _onNextTick2 = _interopRequireDefault(_onNextTick);

var _resolveScrollableAncestorProp = __webpack_require__(431);

var _resolveScrollableAncestorProp2 = _interopRequireDefault(_resolveScrollableAncestorProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
  topOffset: '0px',
  bottomOffset: '0px',
  horizontal: false,
  onEnter: function onEnter() {},
  onLeave: function onLeave() {},
  onPositionChange: function onPositionChange() {},

  fireOnRapidScroll: true
};

/**
 * Calls a function when you scroll to the element.
 */

var Waypoint = function (_React$Component) {
  _inherits(Waypoint, _React$Component);

  function Waypoint(props) {
    _classCallCheck(this, Waypoint);

    var _this = _possibleConstructorReturn(this, (Waypoint.__proto__ || Object.getPrototypeOf(Waypoint)).call(this, props));

    _this.refElement = function (e) {
      return _this._ref = e;
    };
    return _this;
  }

  _createClass(Waypoint, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _ensureChildrenIsSingleDOMElement2.default)(this.props.children);

      if (this.props.scrollableParent) {
        // eslint-disable-line react/prop-types
        throw new Error('The `scrollableParent` prop has changed name to `scrollableAncestor`.');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!Waypoint.getWindow()) {
        return;
      }

      // this._ref may occasionally not be set at this time. To help ensure that
      // this works smoothly, we want to delay the initial execution until the
      // next tick.
      this.cancelInitialTimeout = (0, _onNextTick2.default)(function () {
        _this2._handleScroll = _this2._handleScroll.bind(_this2);
        _this2.scrollableAncestor = _this2._findScrollableAncestor();

        if (undefined !== 'production' && _this2.props.debug) {
          (0, _debugLog2.default)('scrollableAncestor', _this2.scrollableAncestor);
        }

        _this2.scrollEventListenerUnsubscribe = (0, _consolidatedEvents.addEventListener)(_this2.scrollableAncestor, 'scroll', _this2._handleScroll, { passive: true });

        _this2.resizeEventListenerUnsubscribe = (0, _consolidatedEvents.addEventListener)(window, 'resize', _this2._handleScroll, { passive: true });

        _this2._handleScroll(null);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _ensureChildrenIsSingleDOMElement2.default)(nextProps.children);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!Waypoint.getWindow()) {
        return;
      }

      if (!this.scrollableAncestor) {
        // The Waypoint has not yet initialized.
        return;
      }

      // The element may have moved.
      this._handleScroll(null);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!Waypoint.getWindow()) {
        return;
      }

      if (this.scrollEventListenerUnsubscribe) {
        this.scrollEventListenerUnsubscribe();
      }
      if (this.resizeEventListenerUnsubscribe) {
        this.resizeEventListenerUnsubscribe();
      }

      if (this.cancelInitialTimeout) {
        this.cancelInitialTimeout();
      }
    }

    /**
     * Traverses up the DOM to find an ancestor container which has an overflow
     * style that allows for scrolling.
     *
     * @return {Object} the closest ancestor element with an overflow style that
     *   allows for scrolling. If none is found, the `window` object is returned
     *   as a fallback.
     */

  }, {
    key: '_findScrollableAncestor',
    value: function _findScrollableAncestor() {
      var _props = this.props,
          horizontal = _props.horizontal,
          scrollableAncestor = _props.scrollableAncestor;


      if (scrollableAncestor) {
        return (0, _resolveScrollableAncestorProp2.default)(scrollableAncestor);
      }

      var node = this._ref;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document.body) {
          // We've reached all the way to the root node.
          return window;
        }

        var style = window.getComputedStyle(node);
        var overflowDirec = horizontal ? style.getPropertyValue('overflow-x') : style.getPropertyValue('overflow-y');
        var overflow = overflowDirec || style.getPropertyValue('overflow');

        if (overflow === 'auto' || overflow === 'scroll') {
          return node;
        }
      }

      // A scrollable ancestor element was not found, which means that we need to
      // do stuff on window.
      return window;
    }

    /**
     * @param {Object} event the native scroll event coming from the scrollable
     *   ancestor, or resize event coming from the window. Will be undefined if
     *   called by a React lifecyle method
     */

  }, {
    key: '_handleScroll',
    value: function _handleScroll(event) {
      if (!this._ref) {
        // There's a chance we end up here after the component has been unmounted.
        return;
      }

      var bounds = this._getBounds();
      var currentPosition = (0, _getCurrentPosition2.default)(bounds);
      var previousPosition = this._previousPosition;

      if (undefined !== 'production' && this.props.debug) {
        (0, _debugLog2.default)('currentPosition', currentPosition);
        (0, _debugLog2.default)('previousPosition', previousPosition);
      }

      // Save previous position as early as possible to prevent cycles
      this._previousPosition = currentPosition;

      if (previousPosition === currentPosition) {
        // No change since last trigger
        return;
      }

      var callbackArg = {
        currentPosition: currentPosition,
        previousPosition: previousPosition,
        event: event,
        waypointTop: bounds.waypointTop,
        waypointBottom: bounds.waypointBottom,
        viewportTop: bounds.viewportTop,
        viewportBottom: bounds.viewportBottom
      };
      this.props.onPositionChange.call(this, callbackArg);

      if (currentPosition === _constants2.default.inside) {
        this.props.onEnter.call(this, callbackArg);
      } else if (previousPosition === _constants2.default.inside) {
        this.props.onLeave.call(this, callbackArg);
      }

      var isRapidScrollDown = previousPosition === _constants2.default.below && currentPosition === _constants2.default.above;
      var isRapidScrollUp = previousPosition === _constants2.default.above && currentPosition === _constants2.default.below;

      if (this.props.fireOnRapidScroll && (isRapidScrollDown || isRapidScrollUp)) {
        // If the scroll event isn't fired often enough to occur while the
        // waypoint was visible, we trigger both callbacks anyway.
        this.props.onEnter.call(this, {
          currentPosition: _constants2.default.inside,
          previousPosition: previousPosition,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
        this.props.onLeave.call(this, {
          currentPosition: currentPosition,
          previousPosition: _constants2.default.inside,
          event: event,
          waypointTop: bounds.waypointTop,
          waypointBottom: bounds.waypointBottom,
          viewportTop: bounds.viewportTop,
          viewportBottom: bounds.viewportBottom
        });
      }
    }
  }, {
    key: '_getBounds',
    value: function _getBounds() {
      var horizontal = this.props.horizontal;

      var _ref$getBoundingClien = this._ref.getBoundingClientRect(),
          left = _ref$getBoundingClien.left,
          top = _ref$getBoundingClien.top,
          right = _ref$getBoundingClien.right,
          bottom = _ref$getBoundingClien.bottom;

      var waypointTop = horizontal ? left : top;
      var waypointBottom = horizontal ? right : bottom;

      var contextHeight = void 0;
      var contextScrollTop = void 0;
      if (this.scrollableAncestor === window) {
        contextHeight = horizontal ? window.innerWidth : window.innerHeight;
        contextScrollTop = 0;
      } else {
        contextHeight = horizontal ? this.scrollableAncestor.offsetWidth : this.scrollableAncestor.offsetHeight;
        contextScrollTop = horizontal ? this.scrollableAncestor.getBoundingClientRect().left : this.scrollableAncestor.getBoundingClientRect().top;
      }

      if (undefined !== 'production' && this.props.debug) {
        (0, _debugLog2.default)('waypoint top', waypointTop);
        (0, _debugLog2.default)('waypoint bottom', waypointBottom);
        (0, _debugLog2.default)('scrollableAncestor height', contextHeight);
        (0, _debugLog2.default)('scrollableAncestor scrollTop', contextScrollTop);
      }

      var _props2 = this.props,
          bottomOffset = _props2.bottomOffset,
          topOffset = _props2.topOffset;

      var topOffsetPx = (0, _computeOffsetPixels2.default)(topOffset, contextHeight);
      var bottomOffsetPx = (0, _computeOffsetPixels2.default)(bottomOffset, contextHeight);
      var contextBottom = contextScrollTop + contextHeight;

      return {
        waypointTop: waypointTop,
        waypointBottom: waypointBottom,
        viewportTop: contextScrollTop + topOffsetPx,
        viewportBottom: contextBottom - bottomOffsetPx
      };
    }

    /**
     * @return {Object}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;


      if (!children) {
        // We need an element that we can locate in the DOM to determine where it is
        // rendered relative to the top of its context.
        return _react2.default.createElement('span', { ref: this.refElement, style: { fontSize: 0 } });
      }

      var ref = function ref(node) {
        _this3.refElement(node);
        if (children.ref) {
          children.ref(node);
        }
      };

      return _react2.default.cloneElement(children, { ref: ref });
    }
  }]);

  return Waypoint;
}(_react2.default.Component);

exports.default = Waypoint;


Waypoint.propTypes = {
  children: _propTypes2.default.element,
  debug: _propTypes2.default.bool,
  onEnter: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  onPositionChange: _propTypes2.default.func,
  fireOnRapidScroll: _propTypes2.default.bool,
  scrollableAncestor: _propTypes2.default.any,
  horizontal: _propTypes2.default.bool,

  // `topOffset` can either be a number, in which case its a distance from the
  // top of the container in pixels, or a string value. Valid string values are
  // of the form "20px", which is parsed as pixels, or "20%", which is parsed
  // as a percentage of the height of the containing element.
  // For instance, if you pass "-20%", and the containing element is 100px tall,
  // then the waypoint will be triggered when it has been scrolled 20px beyond
  // the top of the containing element.
  topOffset: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  // `bottomOffset` is like `topOffset`, but for the bottom of the container.
  bottomOffset: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Waypoint.above = _constants2.default.above;
Waypoint.below = _constants2.default.below;
Waypoint.inside = _constants2.default.inside;
Waypoint.invisible = _constants2.default.invisible;
Waypoint.getWindow = function () {
  if (typeof window !== 'undefined') {
    return window;
  }
};
Waypoint.defaultProps = defaultProps;
Waypoint.displayName = 'Waypoint';
module.exports = exports['default'];

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkControls = function (_React$Component) {
	_inherits(WorkControls, _React$Component);

	function WorkControls(props) {
		_classCallCheck(this, WorkControls);

		var _this = _possibleConstructorReturn(this, (WorkControls.__proto__ || Object.getPrototypeOf(WorkControls)).call(this, props));

		_this.urls = ['pressinggame', 'hmce', 'musicplayer', 'deepspace'];
		return _this;
	}

	_createClass(WorkControls, [{
		key: 'leftArrowSvg',
		value: function leftArrowSvg() {
			var _this2 = this;

			return _react2.default.createElement(
				'g',
				{ id: 'prev', onClick: function onClick() {
						return _this2.props.onNextOrPrev('slide-left');
					} },
				_react2.default.createElement('path', { className: 'a', d: 'M33.8 31.3a3.8 3.8 0 0 0 1.8-3V12a3.8 3.8 0 0 0-1.8-3l-14-8a3.8 3.8 0 0 0-3.5 0l-14 8a3.8 3.8 0 0 0-1.8 3v16.3a3.8 3.8 0 0 0 1.7 3l14 8a3.8 3.8 0 0 0 3.6 0z' }),
				_react2.default.createElement('path', { className: 'b', d: 'M19 22.2l2.3 1v.7L19 22.7c-2-1-3.4-2-3.4-2a1 1 0 0 1 0-.7l3.5-1.8 2.3-1v. 5l-2.2 1-3 1.8 3 1.7z' }),
				_react2.default.createElement('path', { className: 'b', d: 'M21.8 24.6l-.7-.3-2.2-1c-2-1-3.4-2-3.4-2L15 21a1.3 1.3 0 0 1 0-.4 1.3 1.3 0 0 1 0-.6l.2-.2 3.4-2 2.3-1 1-.3V18h-.4l-2.3 1.2-2.3 1.3 2.3 1.3 2.3 1 .3.2z' })
			);
		}
	}, {
		key: 'rightArrowSvg',
		value: function rightArrowSvg() {
			var _this3 = this;

			return _react2.default.createElement(
				'g',
				{ id: 'next', onClick: function onClick() {
						return _this3.props.onNextOrPrev('slide-right');
					} },
				_react2.default.createElement('path', { className: 'a', d: 'M162.6 31.3a3.8 3.8 0 0 0 1.7-3V12a3.8 3.8 0 0 0-1.7-3l-14-8a3.8 3.8 0 0 0-3.6 0l-14 8a3.8 3.8 0 0 0-1.7 3v16.3a3.8 3.8 0 0 0 1.7 3l14 8a3.8 3.8 0 0 0 3.5 0z' }),
				_react2.default.createElement('path', { d: 'M146.8 18.8l-2.2-1V17l2.2 1c2 1 3.5 2 3.5 2a1 1 0 0 1 0 .7l-3.5 1.8-2.2 1v-.5l2.2-1c1.2-.6 3-1.8 3-1.8l-3-1.7z' }),
				_react2.default.createElement('path', { className: 'b', d: 'M144 24.6V23h.4l2.2-1.2 2.3-1.3-2.4-1.3-2.2-1-.3-.2v-1.6l.8.3 2.3 1 3.5 2h.2v.2a1.3 1.3 0 0 1 0 .5 1.3 1.3 0 0 1 0 .5v.2h-.2l-3.4 2-2.2 1z' })
			);
		}
	}, {
		key: 'nextPage',
		value: function nextPage() {
			var currentIndex = this.urls.indexOf(this.props.currentPage);
			var nextPage = currentIndex + 1 > this.urls.length - 1 ? null : '/work/' + this.urls[currentIndex + 1];
			this.currentPage = this.urls[currentIndex + 1];

			if (nextPage !== null) {
				return _react2.default.createElement(
					_reactRouterDom.Link,
					{ to: nextPage },
					this.rightArrowSvg()
				);
			}
		}
	}, {
		key: 'prevPage',
		value: function prevPage() {
			var currentIndex = this.urls.indexOf(this.props.currentPage);
			var prevPage = currentIndex - 1 < 0 ? null : '/work/' + this.urls[currentIndex - 1];

			if (prevPage !== null) {
				return _react2.default.createElement(
					_reactRouterDom.Link,
					{ to: prevPage },
					this.leftArrowSvg()
				);
			}
		}
	}, {
		key: 'renderControls',
		value: function renderControls() {
			return _react2.default.createElement(
				'div',
				{ className: 'col-sm-4 col-sm-offset-4 work-controls-content' },
				_react2.default.createElement(
					'svg',
					{ id: 'work-controls', viewBox: '0 0 164.81 40.3' },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/work' },
						_react2.default.createElement(
							'g',
							{ id: 'exit' },
							_react2.default.createElement('path', { className: 'a', d: 'M98.2 31.3a3.8 3.8 0 0 0 1.7-3V12A3.8 3.8 0 0 0 98 9l-14-8a3.8 3.8 0 0 0-3.5 0l-14 8a3.8 3.8 0 0 0-1.8 3v16.3a3.8 3.8 0 0 0 1.6 3l14 8a3.8 3.8 0 0 0 3.5 0z' }),
							_react2.default.createElement('path', { d: 'M80.2 15.4s1 2 2.2 3.6l2.2-3.6h.7l-2.5 4 2.6 4.4h-.7s-1-2.2-2.3-3.8c-1.2 1.7-2.3 3.8-2.3 3.8h-.6s1.5-2.6 2.6-4.3l-2.5-4z' }),
							_react2.default.createElement('path', { className: 'b', d: 'M86.3 24.3h-2V24l-2-3c-1 1.4-1.8 3-1.8 3v.3h-2l.5-.8 2.4-4-2.3-4-.3-.6h1.8v.2l2 3 1.7-3v-.3h2l-.5.6-2.4 4c1.2 1.6 2.5 3.8 2.5 4z' })
						)
					),
					this.nextPage(),
					this.prevPage()
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'work-controls-partial' },
				this.renderControls()
			);
		}
	}]);

	return WorkControls;
}(_react2.default.Component);

exports.default = WorkControls;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * VERSION: 1.19.1
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_doc = window.document,
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.TweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>
			 * <script>
			 *     gs.TweenLite.to(...); //would use v1.7
			 *     TweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl, hasModule;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							hasModule = (typeof(module) !== "undefined" && module.exports);
							if (!hasModule && "function" === "function" && __webpack_require__(196)){ //AMD
								!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return cl; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
							} else if (hasModule){ //node
								if (ns === moduleName) {
									module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
				return new Definition(ns, dependencies, func, global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) { 
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && _doc.visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000) {
					_ticker.wake();
				}
				setTimeout(_checkTimeout, 2000);
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * TweenLite
 * ----------------------------------------------------------------
 */
		var TweenLite = _class("TweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = TweenLite.prototype = new Animation();
		p.constructor = TweenLite;
		p.kill()._gc = false;

//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		TweenLite.version = "1.19.1";
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		TweenLite.defaultOverwrite = "auto";
		TweenLite.ticker = _ticker;
		TweenLite.autoSleep = 120;
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		TweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				TweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : (v === 1) ? this.end : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min && !pt.blob) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				a.end = end;
				start = a[0] = start + ""; //ensure values are strings
				end = a[1] = end + "";
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var type = typeof(target[prop]),
					getterName = (type !== "function") ? "" : ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3)),
					s = (start !== "get") ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob;

				if (typeof(s) !== "number" || (typeof(end) !== "number" && !isRelative)) {
					if (funcParam || isNaN(s) || (!isRelative && isNaN(end)) || typeof(s) === "boolean" || typeof(end) === "boolean") {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, (isRelative ? pt.s + pt.c : end), stringFilter || TweenLite.defaultStringFilter, pt);
						pt = {t: blob, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: overwriteProp || prop, pr: 0, m: 0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else {
						pt.s = parseFloat(s);
						if (!isRelative) {
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = TweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = TweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- TweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				this._startAt = TweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001 && time >= 0) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				TweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----TweenLite static methods -----------------------------------------------------

		TweenLite.to = function(target, duration, vars) {
			return new TweenLite(target, duration, vars);
		};

		TweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new TweenLite(target, duration, vars);
		};

		TweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new TweenLite(target, duration, toVars);
		};

		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		TweenLite.set = function(target, vars) {
			return new TweenLite(target, 0, vars);
		};

		TweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};

		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = TweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		TweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenLite");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(241);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(28);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(422);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

        undefined !== 'production' ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes = undefined !== "production" ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  above: 'above',
  inside: 'inside',
  below: 'below',
  invisible: 'invisible'
};
module.exports = exports['default'];

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(30);

var _Hexagons = __webpack_require__(218);

var _Hexagons2 = _interopRequireDefault(_Hexagons);

var _TopNav = __webpack_require__(224);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _AboutMe = __webpack_require__(211);

var _AboutMe2 = _interopRequireDefault(_AboutMe);

var _Work = __webpack_require__(226);

var _Work2 = _interopRequireDefault(_Work);

var _Contact = __webpack_require__(215);

var _Contact2 = _interopRequireDefault(_Contact);

var _Home = __webpack_require__(219);

var _Home2 = _interopRequireDefault(_Home);

var _WorkControls = __webpack_require__(121);

var _WorkControls2 = _interopRequireDefault(_WorkControls);

var _reactTransitionGroup = __webpack_require__(24);

var _nodeUuid = __webpack_require__(39);

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _Transitions = __webpack_require__(43);

var _utils = __webpack_require__(56);

var _reactSwipeable = __webpack_require__(419);

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _gsap = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			orientation: 'landscape',
			hexagonVis: 'default',
			show: false,
			reRender: false,
			initial: false,
			swipeable: false
		};

		window.mobileCheck = _utils.mobileCheck;
		if (!window.mobileCheck()) {
			_this.handleResize = _this.handleResize.bind(_this);
			window.addEventListener('resize', _this.handleResize);
		}

		_this.handleInit = _this.handleInit.bind(_this);

		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps, nextState) {
			console.log('receiving at app');
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {

			if (this.state.reRender !== nextState.reRender) {
				return true;
			}

			if (this.state.hexagonVis !== nextState.hexagonVis) {
				return true;
			}

			if (this.state.initial !== nextState.initial) {
				return false;
			}

			if (this.state.swipeable || !this.state.swipeable || nextState.swipeable || !nextState.swipeable) {
				return false;
			}
		}
	}, {
		key: 'handleResize',
		value: function handleResize() {
			function setReRender() {

				this.setState(_extends({}, this.state, {
					reRender: !this.state.reRender
				}));
			}
			clearTimeout(window.resizedFinished);
			window.resizedFinished = setTimeout(setReRender.bind(this), 150);
		}
	}, {
		key: 'handleSwipeable',
		value: function handleSwipeable() {
			this.setState(_extends({}, this.state, {
				swipeable: true
			}));
		}
	}, {
		key: 'handleUnSwipeable',
		value: function handleUnSwipeable() {
			this.setState(_extends({}, this.state, {
				swipeable: false
			}));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'renderHomePage',
		value: function renderHomePage(props) {
			var _this2 = this;

			return _react2.default.createElement(
				_reactSwipeable2.default,
				{ trackMouse: true, delta: 200, onSwipedDown: function onSwipedDown() {
						return (0, _utils.handleSwipeDown)(props, _this2.state.swipeable);
					}, onSwipedUp: function onSwipedUp() {
						return (0, _utils.handleSwipeUp)(props, _this2.state.swipeable);
					} },
				_react2.default.createElement(_Home2.default, _extends({ onSwipeable: this.handleSwipeable.bind(this), onUnSwipeable: this.handleUnSwipeable.bind(this) }, props))
			);
		}
	}, {
		key: 'renderMainPages',
		value: function renderMainPages(props) {
			var _this3 = this;

			var pages = {
				work: _Work2.default,
				about: _AboutMe2.default,
				contact: _Contact2.default
			};
			var CurrentPage = pages[props.match.params.page];

			return _react2.default.createElement(
				_reactSwipeable2.default,
				{ trackMouse: true, delta: 200, onSwipedDown: function onSwipedDown() {
						return (0, _utils.handleSwipeDown)(props, _this3.state.swipeable);
					}, onSwipedUp: function onSwipedUp() {
						return (0, _utils.handleSwipeUp)(props, _this3.state.swipeable);
					} },
				_react2.default.createElement(CurrentPage, _extends({ onSwipeable: this.handleSwipeable.bind(this), onUnSwipeable: this.handleUnSwipeable.bind(this) }, props))
			);
		}
	}, {
		key: 'handleInit',
		value: function handleInit() {
			this.setState(_extends({}, this.state, {
				initial: !this.state.initial
			}));
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'root' },
				_react2.default.createElement(
					_reactRouterDom.BrowserRouter,
					null,
					_react2.default.createElement(
						'div',
						{ className: 'container app-container click-through-child' },
						_react2.default.createElement(_TopNav2.default, null),
						_react2.default.createElement(_reactRouterDom.Route, { render: function render(_ref) {
								var location = _ref.location,
								    history = _ref.history,
								    match = _ref.match;

								return _react2.default.createElement(
									_reactRouterDom.Switch,
									null,
									_react2.default.createElement(_reactRouterDom.Route, { path: match.url + ':page', component: _this4.renderMainPages.bind(_this4) }),
									_react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _this4.renderHomePage.bind(_this4) })
								);
							} }),
						_react2.default.createElement(_Hexagons2.default, { ref: 'hexagons', reRender: this.state.reRender, width: window.innerWidth + 55, height: window.innerHeight + 55, initial: this.state.initial, onInit: this.handleInit, viewBox: '0 0 ' + window.innerWidth + ' ' + window.innerHeight })
					)
				)
			);
		}
	}]);

	return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(253);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(459)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-0!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-0!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* access database */
var pageDefaults = {
	hmce: {
		title: 'HMCE',
		images: ['hmce-1', 'hmce-2', 'hmce-3'],
		description: 'Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in'
	},
	pressinggame: {
		title: 'Pressing Game',
		images: ['pressing-game-1', 'pressing-game-2', 'pressing-game-3', 'pressing-game-4', 'pressing-game-5'],
		description: 'Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in'
	},
	deepspace: {
		title: 'Deep Space',
		images: ['deep-space-1', 'deep-space-2', 'deep-space-3'],
		description: 'Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in'
	},
	gravesendseye: {
		title: 'Gravesends Eye',
		images: ['gravesendseye-1', 'gravesendseye-2'],
		description: 'Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in'
	},
	musicplayer: {
		title: 'Music Player',
		images: ['music-player-1'],
		description: 'Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in'
	}
};

var ContentApi = {

	getImages: function getImages(title) {
		return pageDefaults[title].images;
	},
	getDescription: function getDescription(title) {
		return pageDefaults[title].description;
	},
	getTitle: function getTitle(title) {
		return pageDefaults[title].title;
	},
	getEverything: function getEverything(title) {
		return pageDefaults[title];
	}
};

exports.default = ContentApi;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Browser = __webpack_require__(213);

var _Browser2 = _interopRequireDefault(_Browser);

var _SkillButtons = __webpack_require__(223);

var _SkillButtons2 = _interopRequireDefault(_SkillButtons);

var _reactRouterTransition = __webpack_require__(116);

var _reactTransitionGroup = __webpack_require__(24);

var _Transitions = __webpack_require__(43);

var _NotifySwipe = __webpack_require__(55);

var _NotifySwipe2 = _interopRequireDefault(_NotifySwipe);

var _reactWaypoint = __webpack_require__(108);

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftContent = function LeftContent() {
	return _react2.default.createElement(
		'div',
		{ className: 'col-sm-12 col-md-6 col-lg-6 bio-content' },
		_react2.default.createElement(
			'div',
			{ className: 'row about-title-left' },
			_react2.default.createElement(
				'div',
				{ className: 'col-sm-3 col-md-2 empty-border-button' },
				_react2.default.createElement(
					'h5',
					null,
					_react2.default.createElement(
						'span',
						{ className: 'code-arrows' },
						'<'
					),
					'about',
					_react2.default.createElement(
						'span',
						{ className: 'code-arrows' },
						'>'
					)
				)
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'row bio-text' },
			_react2.default.createElement(
				'div',
				{ className: 'col-sm text-content' },
				_react2.default.createElement(
					'p',
					null,
					'I\u2019m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor\u2019s of technology and currently an adjunct lecturer at New York City College of Technology. I\u2019m a natural problem solver; I enjoy finding efficient solutions to complex problems. I\u2019m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. I\u2019m a New York based web developer who has a *heart* for the design process. I tinker with many different types of media and absolutely love making ideas into reality. I have a bachelor\u2019s of technology and currently an adjunct lecturer at New York City College of Technology. I\u2019m a natural problem solver; I enjoy finding efficient solutions to complex problems. I\u2019m also a data lover, I like to analyze and visualize data to expose trends, Baautem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et ac. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
				)
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'row about-title-right' },
			_react2.default.createElement(
				'div',
				{ className: 'col-sm-3 col-sm-offset-9 col-md-2 col-md-offset-10 empty-border-button' },
				_react2.default.createElement(
					'h5',
					null,
					_react2.default.createElement(
						'span',
						{ className: 'code-arrows' },
						'<'
					),
					'/about',
					_react2.default.createElement(
						'span',
						{ className: 'code-arrows' },
						'>'
					)
				)
			)
		)
	);
};

var AboutMe = function (_React$Component) {
	_inherits(AboutMe, _React$Component);

	function AboutMe(props) {
		_classCallCheck(this, AboutMe);

		var _this = _possibleConstructorReturn(this, (AboutMe.__proto__ || Object.getPrototypeOf(AboutMe)).call(this, props));

		_this.state = {
			visualization: 'default'
		};
		return _this;
	}

	_createClass(AboutMe, [{
		key: 'onClick',
		value: function onClick(type) {
			this.setState({ visualization: type });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onUnSwipeable();
		}
	}, {
		key: 'renderRightContent',
		value: function renderRightContent() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'col-sm-12 col-md-6 skill-content' },
				_react2.default.createElement(_Browser2.default, { vis: this.state.visualization }),
				_react2.default.createElement(_SkillButtons2.default, { handleClick: this.onClick.bind(this) }),
				_react2.default.createElement(
					'div',
					{ className: 'row skill-selectors' },
					_react2.default.createElement(
						'div',
						{ className: 'col-sm-4 skill-selectors-content-front-end empty-border-button', onClick: function onClick() {
								return _this2.onClick('front-end');
							} },
						_react2.default.createElement(
							'h5',
							null,
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'<'
							),
							'/FrontEnd',
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'>'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-sm-4 skill-selectors-content-back-end empty-border-button', onClick: function onClick() {
								return _this2.onClick('back-end');
							} },
						_react2.default.createElement(
							'h5',
							null,
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'<'
							),
							'/BackEnd',
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'>'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-sm-4 skill-selectors-content-dev-ops empty-border-button', onClick: function onClick() {
								return _this2.onClick('front-end');
							} },
						_react2.default.createElement(
							'h5',
							null,
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'<'
							),
							'/DevOps',
							_react2.default.createElement(
								'span',
								{ className: 'code-arrows' },
								'>'
							)
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Transitions.Transition,
				{ settings: {
						transition: 'slide-up',
						time: 2000
					} },
				_react2.default.createElement(
					'div',
					{ key: this.props.location.key, className: 'col-sm-12 col-lg-8 col-lg-offset-2 about-me-content' },
					_react2.default.createElement(
						'div',
						{ ref: 'aboutMe', className: 'row page-title' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-6 col-sm-offset-3' },
							_react2.default.createElement(
								'h2',
								null,
								'Hello,'
							),
							_react2.default.createElement(
								'p',
								{ className: 'title-divider' },
								'\u25A0 \u25A0 \u25A0 \u25A0'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'row about-total' },
						LeftContent(),
						this.renderRightContent()
					),
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-12' },
							_react2.default.createElement(_NotifySwipe2.default, this.props)
						)
					)
				)
			);
		}
	}]);

	return AboutMe;
}(_react2.default.Component);

exports.default = AboutMe;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d3Selection = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackEndVisual = function (_React$Component) {
	_inherits(BackEndVisual, _React$Component);

	function BackEndVisual(props) {
		_classCallCheck(this, BackEndVisual);

		var _this = _possibleConstructorReturn(this, (BackEndVisual.__proto__ || Object.getPrototypeOf(BackEndVisual)).call(this, props));

		_this.onRef = function (ref) {
			_this.setState({
				g: (0, _d3Selection.select)(ref)
			}, function () {
				return console.log('FrontEndVisual Rendered!');
			});
		};

		_this.state = {
			g: null
		};

		return _this;
	}

	_createClass(BackEndVisual, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				{ className: 'BackEndVisual' },
				_react2.default.createElement(
					'text',
					{ fill: 'white', transform: 'translate(200, 200)' },
					'BackEnd Visualisation'
				)
			);
		}
	}]);

	return BackEndVisual;
}(_react2.default.Component);

exports.default = BackEndVisual;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d3Selection = __webpack_require__(29);

var _FrontEndVisual = __webpack_require__(217);

var _FrontEndVisual2 = _interopRequireDefault(_FrontEndVisual);

var _BackEndVisual = __webpack_require__(212);

var _BackEndVisual2 = _interopRequireDefault(_BackEndVisual);

var _DevOpsVisual = __webpack_require__(216);

var _DevOpsVisual2 = _interopRequireDefault(_DevOpsVisual);

var _gsap = __webpack_require__(22);

var _DrawSVGPlugin = __webpack_require__(57);

var _DrawSVGPlugin2 = _interopRequireDefault(_DrawSVGPlugin);

var _reactWaypoint = __webpack_require__(108);

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Browser = function (_React$Component) {
	_inherits(Browser, _React$Component);

	function Browser(props) {
		_classCallCheck(this, Browser);

		return _possibleConstructorReturn(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).call(this, props));
	}

	_createClass(Browser, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			setTimeout(function () {
				_this2.browserAnimation = _this2.getBrowserAnimation();
			}, 300);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'renderVisualization',
		value: function renderVisualization(vis) {
			switch (vis) {
				case 'front-end':
					return _react2.default.createElement(_FrontEndVisual2.default, null);
					break;
				case 'back-end':
					return _react2.default.createElement(_BackEndVisual2.default, null);
					break;
				case 'dev-ops':
					return _react2.default.createElement(_DevOpsVisual2.default, null);
					break;
				default:
					return _react2.default.createElement(
						'g',
						{ id: 'default-vis' },
						_react2.default.createElement(
							'text',
							{ fill: 'white', transform: 'translate(200, 200)' },
							'Default Visualisation'
						)
					);
			}
		}
	}, {
		key: 'getBrowserAnimation',
		value: function getBrowserAnimation() {
			var _refs = this.refs,
			    browserMenuBar = _refs.browserMenuBar,
			    filledTab = _refs.filledTab,
			    browserInnerWindow = _refs.browserInnerWindow,
			    browserScrollBar = _refs.browserScrollBar,
			    exitCircle = _refs.exitCircle,
			    expandCircle = _refs.expandCircle,
			    emptyCircle = _refs.emptyCircle,
			    exitX = _refs.exitX,
			    expandPlus = _refs.expandPlus,
			    strokedTab = _refs.strokedTab;


			var stroked = [browserMenuBar, browserScrollBar, browserInnerWindow, exitCircle, expandCircle, strokedTab, emptyCircle];

			var unStroked = [expandPlus, exitX, filledTab];

			var browserTl = new _gsap.TimelineMax();

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = stroked[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var el = _step.value;

					browserTl.set(el, {
						transformOrigin: '50% 50%',
						opacity: 0,
						drawSVG: '0%',
						scale: 1
					});
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = unStroked[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _el = _step2.value;

					browserTl.set(_el, {
						transformOrigin: '50% 50%',
						opacity: 0,
						scale: 1.5
					});
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			browserTl.staggerTo([browserInnerWindow, browserMenuBar, strokedTab, browserScrollBar], 1.2, {
				transformOrigin: '50% 50%',
				opacity: 1,
				drawSVG: '100%',
				ease: _gsap.Power4.easeIn
			}, .5);

			browserTl.staggerTo([exitCircle, expandCircle, emptyCircle], .5, {
				transformOrigin: '50% 50%',
				opacity: 1,
				ease: _gsap.Power4.easeIn,
				drawSVG: '100%'
			}, .1);

			browserTl.staggerFromTo([exitCircle, expandCircle, emptyCircle], 1, {
				scale: 1.6
			}, {
				transformOrigin: '50% 50%',
				scale: 1,
				ease: _gsap.Bounce.easeOut
			}, .1);

			browserTl.staggerFromTo([exitX, expandPlus], 3, {
				scale: 2
			}, {
				transformOrigin: '50% 50%',
				opacity: 1,
				drawSVG: '100%',
				scale: 1,
				ease: _gsap.Bounce.easeOut
			}, .1);

			browserTl.to(filledTab, .8, {
				opacity: 1,
				scale: 1,
				ease: _gsap.Bounce.easeOut
			}, '-=4');

			return browserTl.pause();
		}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {
			var _this3 = this;

			setTimeout(function () {
				_this3.browserAnimation.play();
			}, 300);
		}
	}, {
		key: 'handleLeave',
		value: function handleLeave() {
			this.browserAnimation.reverse(0);
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				_reactWaypoint2.default,
				{ onEnter: this.handleEnter.bind(this), onLeave: this.handleLeave.bind(this) },
				_react2.default.createElement(
					'div',
					{ className: 'row browser' },
					_react2.default.createElement(
						'div',
						{ className: 'col-sm browser-content' },
						_react2.default.createElement(
							'svg',
							{ id: 'browser-item-svg', viewBox: '0 0 604.8 403.7' },
							_react2.default.createElement('path', { ref: 'browserMenuBar', d: 'M602.2.5H2.6A2 2 0 0 0 .6 2V46a2 2 0 0 1 2-1.6h599.6a2 2 0 0 1 2 1.6V2a2 2 0 0 0-2-1.5z', className: 'a' }),
							_react2.default.createElement('path', { ref: 'filledTab', d: 'M175.3 44c-1.6 0-2.2-1-1.2-2.4l16-22.8a6.6 6.6 0 0 1 5-2.5h55a6.2 6.2 0 0 1 4.7 2.6L269 41.4c1 1.4.3 2.6-1.3 2.6z', className: 'b' }),
							_react2.default.createElement('path', { ref: 'browserInnerWindow', d: 'M.5 44h603.8v359.2H.5z', className: 'a' }),
							_react2.default.createElement('path', { ref: 'strokedTab', d: 'M90.2 44.3c-1.7 0-2.2-1-1.3-2.5L105 19a6.6 6.6 0 0 1 4.8-2.5h55a6.2 6.2 0 0 1 4.7 2.6L184 41.8c.8 1.4.2 2.6-1.5 2.6z', className: 'a' }),
							_react2.default.createElement('rect', { ref: 'browserScrollBar', width: '7.5', height: '328.4', x: '592', y: '58.4', className: 'a', rx: '2', ry: '2' }),
							_react2.default.createElement('circle', { ref: 'exitCircle', cx: '18.5', cy: '24.1', r: '6', className: 'a' }),
							_react2.default.createElement('circle', { ref: 'expandCircle', cx: '37.6', cy: '24.4', r: '6', className: 'a' }),
							_react2.default.createElement('circle', { ref: 'emptyCircle', cx: '55.6', cy: '24.2', r: '6', className: 'a' }),
							_react2.default.createElement('path', { ref: 'exitX', transform: 'translate(-.2, -.5)', d: 'M20.4 27H20l-1.5-2-1.3 2h-.6l1.7-2.4-1.7-2.4h.5l1.5 2 1.4-2h.4l-1.6 2.4c.8 1 1.6 2.5 1.6 2.5z', className: 'b' }),
							_react2.default.createElement('path', { ref: 'expandPlus', d: 'M35 24h2.4v-2.4h.5V24h2.4v.6H38v2.6h-.6v-2.6h-2.5z', className: 'b' }),
							' ',
							this.renderVisualization(this.props.vis)
						)
					)
				)
			);
		}
	}]);

	return Browser;
}(_react2.default.Component);

exports.default = Browser;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d3Selection = __webpack_require__(29);

var _Glasses = __webpack_require__(54);

var _Glasses2 = _interopRequireDefault(_Glasses);

var _gsap = __webpack_require__(22);

var _DrawSVGPlugin = __webpack_require__(57);

var _DrawSVGPlugin2 = _interopRequireDefault(_DrawSVGPlugin);

var _utils = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CenterLogo = function (_React$Component) {
	_inherits(CenterLogo, _React$Component);

	function CenterLogo(props) {
		_classCallCheck(this, CenterLogo);

		var _this = _possibleConstructorReturn(this, (CenterLogo.__proto__ || Object.getPrototypeOf(CenterLogo)).call(this, props));

		_this.onRef = function (ref) {
			_this.setState({
				g: (0, _d3Selection.select)(ref)
			}, function () {});
		};

		_this.state = {
			g: null,
			glassesPos: 'LeftOne'
		};

		_this.portraitGyro = _this.portraitGyro.bind(_this);
		_this.mouseMovement = _this.mouseMovement.bind(_this);

		window.mobileCheck = _utils.mobileCheck;
		if (window.mobileCheck()) {
			window.addEventListener('deviceorientation', _this.portraitGyro, true);
		} else {
			window.addEventListener('mousemove', _this.mouseMovement, true);
		}

		return _this;
	}

	_createClass(CenterLogo, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return true;
		}
	}, {
		key: 'portraitGyro',
		value: function portraitGyro(e) {
			var pos = 'Front';

			if (e.gamma < 20 && e.gamma > -20) {
				pos = 'Front';
			}
			if (e.gamma < 30 && e.gamma > 21) {
				pos = 'RightOne';
			}
			if (e.gamma < 40 && e.gamma > 31) {
				pos = 'RightTwo';
			}
			if (e.gamma < 50 && e.gamma > 41) {
				pos = 'RightThree';
			}
			if (e.gamma < -21 && e.gamma > -30) {
				pos = 'LeftOne';
			}
			if (e.gamma < -31 && e.gamma > -40) {
				pos = 'LeftTwo';
			}
			if (e.gamma < -41 && e.gamma > -50) {
				pos = 'LeftThree';
			}
			if (e.beta < 40) {
				pos = 'TopOne';
			}
			if (e.beta < 30) {
				pos = 'TopTwo';
			}
			if (e.beta < 20) {
				pos = 'TopThree';
			}
			if (e.beta > 90) {
				pos = 'BottomOne';
			}
			if (e.beta > 100) {
				pos = 'BottomTwo';
			}
			if (e.beta > 110) {
				pos = 'BottomThree';
			}

			this.setState(_extends({}, this.state, {
				glassesPos: pos
			}));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('deviceorientation', this.portraitGyro, true);
			window.removeEventListener('mousemove', this.mouseMovement, true);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var arrowArray = [this.refs.outline1, this.refs.outline2, this.refs.outline3, this.refs.outline4, this.refs.outline5, this.refs.outline6];

			var bounceIn = function bounceIn(item, iter) {
				var add = iter * .2 + 0,
				    params = {
					transformOrigin: '50% 50%',
					scale: .8,
					repeat: -1,
					repeatDelay: 3,
					delay: add,
					ease: _gsap.Bounce.easeOut,
					yoyo: true
				};

				var tl = new _gsap.TimelineMax();

				tl.to(item, 1.5, params);
			};

			setTimeout(function () {
				return arrowArray.forEach(bounceIn);
			}, 1000);
			this.float(document.getElementById('glasses-total'));
		}
	}, {
		key: 'float',
		value: function float(item) {
			var tl = new _gsap.TimelineMax();
			tl.to(item, 2, {
				y: -10,
				repeat: -1,
				yoyo: true
			});
		}
	}, {
		key: 'mouseMovement',
		value: function mouseMovement(e) {
			var pos = 'Front',
			    tW = window.innerWidth,
			    tH = window.innerHeight;

			if (e.screenX < tW * .64 && e.screenX > tW * .46) {
				pos = 'Front';
			}
			if (e.screenX < tW * .45 && e.screenX > tW * .31) {
				pos = 'LeftOne';
			}
			if (e.screenX < tW * .30 && e.screenX > tW * .15) {
				pos = 'LeftTwo';
			}
			if (e.screenX < tW * .14 && e.screenX > 0) {
				pos = 'LeftThree';
			}
			if (e.screenX < tW * .78 && e.screenX > tW * .65) {
				pos = 'RightOne';
			}
			if (e.screenX < tW * .92 && e.screenX > tW * .79) {
				pos = 'RightTwo';
			}
			if (e.screenX < tW && e.screenX > tW * .93) {
				pos = 'RightThree';
			}
			if (e.screenY > tH * .60) {
				pos = 'BottomOne';
			}
			if (e.screenY > tH * .75) {
				pos = 'BottomTwo';
			}
			if (e.screenY > tH * .85) {
				pos = 'BottomThree';
			}
			if (e.screenY < tH * .45) {
				pos = 'TopOne';
			}
			if (e.screenY < tH * .35) {
				pos = 'TopTwo';
			}
			if (e.screenY < tH * .25) {
				pos = 'TopThree';
			}

			this.setState(_extends({}, this.state, {
				glassesPos: pos
			}));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'row center-logo click-through' },
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-6 col-sm-offset-3 center-logo-content' },
					_react2.default.createElement('div', null),
					_react2.default.createElement(
						'svg',
						{ id: 'center-logo-svg', viewBox: '0 0 292.2 333.9', ref: this.onRef },
						_react2.default.createElement(
							'g',
							{ id: 'logo-outline' },
							_react2.default.createElement(
								'g',
								{ id: 'glasses-total' },
								_react2.default.createElement(_Glasses2.default, { position: this.state.glassesPos, transformation: 'translate(50, 120)' })
							),
							_react2.default.createElement('path', { d: 'M226.8 51.3l57.4 33a5.8 5.8 0 0 1 2.5 4.4V173l5.5-3.6V88.6a11.2 11.2 0 0 0-5.2-9l-56.2-32.3z', ref: 'outline3', className: 'white-outlines' }),
							_react2.default.createElement('path', { d: 'M5.5 172.5V88.7A5.8 5.8 0 0 1 8 84.4l55.3-32-5-3.5-53 30.6a11.2 11.2 0 0 0-5.3 9v87.8z', ref: 'outline1', className: 'other-outlines' }),
							_react2.default.createElement('path', { d: 'M82 41.6L143.7 6a5.8 5.8 0 0 1 5 0l60.3 35 4-4-61.7-35.7a11.2 11.2 0 0 0-10.4 0L77 38z', ref: 'outline2', className: 'colored-outlines' }),
							_react2.default.createElement('path', { d: 'M286.6 196.5v48.8a5.8 5.8 0 0 1-2.4 4.2l-55.8 32.3 1.2 5.7 57.4-33.2a11.2 11.2 0 0 0 5.2-9V193z', ref: 'outline4', className: 'other-outlines' }),
							_react2.default.createElement('path', { d: 'M210.2 292.3l-61.6 35.5a5.8 5.8 0 0 1-5 0l-65.3-37.6 1.5 7.2 61 35.3a11.2 11.2 0 0 0 10.5 0l60-34.7z', ref: 'outline5', className: 'colored-outlines' }),
							_react2.default.createElement('path', { d: 'M55.2 276.8L8 249.5a5.8 5.8 0 0 1-2.5-4.2V197L0 201v44.3a11.2 11.2 0 0 0 5.2 9L56.7 284z', ref: 'outline6', className: 'white-outlines' }),
							_react2.default.createElement(
								'text',
								{ className: 'logo-text', transform: 'translate(31.89 237.25)' },
								'</',
								_react2.default.createElement(
									'tspan',
									{ x: '51', y: '0', className: 'logo-name' },
									'viera.io'
								),
								_react2.default.createElement(
									'tspan',
									{ x: '206.6', y: '0', className: 'e' },
									'>'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return CenterLogo;
}(_react2.default.Component);

exports.default = CenterLogo;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NotifySwipe = __webpack_require__(55);

var _NotifySwipe2 = _interopRequireDefault(_NotifySwipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_React$Component) {
	_inherits(Contact, _React$Component);

	function Contact(props) {
		_classCallCheck(this, Contact);

		return _possibleConstructorReturn(this, (Contact.__proto__ || Object.getPrototypeOf(Contact)).call(this, props));
	}

	_createClass(Contact, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onUnSwipeable();
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			console.log('will update');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			console.log('did update');
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			console.log('will receive');
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'huge' },
					'CONTACT PAGE'
				)
			);
		}
	}]);

	return Contact;
}(_react2.default.Component);

exports.default = Contact;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d3Selection = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevOpsVisual = function (_React$Component) {
	_inherits(DevOpsVisual, _React$Component);

	function DevOpsVisual(props) {
		_classCallCheck(this, DevOpsVisual);

		var _this = _possibleConstructorReturn(this, (DevOpsVisual.__proto__ || Object.getPrototypeOf(DevOpsVisual)).call(this, props));

		_this.onRef = function (ref) {
			_this.setState({
				g: (0, _d3Selection.select)(ref)
			}, function () {
				return console.log('FrontEndVisual Rendered!');
			});
		};

		_this.state = {
			g: null
		};

		return _this;
	}

	_createClass(DevOpsVisual, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				{ className: 'DevOpsVisual' },
				_react2.default.createElement(
					'text',
					{ fill: 'white', transform: 'translate(200, 200)' },
					'DevOps Visualisation'
				)
			);
		}
	}]);

	return DevOpsVisual;
}(_react2.default.Component);

exports.default = DevOpsVisual;

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _d3Selection = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrontEndVisual = function (_React$Component) {
	_inherits(FrontEndVisual, _React$Component);

	function FrontEndVisual(props) {
		_classCallCheck(this, FrontEndVisual);

		var _this = _possibleConstructorReturn(this, (FrontEndVisual.__proto__ || Object.getPrototypeOf(FrontEndVisual)).call(this, props));

		_this.onRef = function (ref) {
			_this.setState({
				g: (0, _d3Selection.select)(ref)
			}, function () {
				return console.log('FrontEndVisual Rendered!');
			});
		};

		_this.state = {
			g: null
		};

		return _this;
	}

	_createClass(FrontEndVisual, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'g',
				{ className: 'FrontEndVisual' },
				_react2.default.createElement(
					'text',
					{ fill: 'white', transform: 'translate(200, 200)' },
					'FrontEnd Visualisation'
				)
			);
		}
	}]);

	return FrontEndVisual;
}(_react2.default.Component);

exports.default = FrontEndVisual;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(56);

var _reactRouterDom = __webpack_require__(30);

var _nodeUuid = __webpack_require__(39);

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _gsap = __webpack_require__(22);

var _reactTransitionGroup = __webpack_require__(24);

var _Transitions = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hexagons = function (_React$Component) {
	_inherits(Hexagons, _React$Component);

	function Hexagons(props) {
		_classCallCheck(this, Hexagons);

		var _this = _possibleConstructorReturn(this, (Hexagons.__proto__ || Object.getPrototypeOf(Hexagons)).call(this, props));

		var data = _this.generateData(props.width, props.height);

		_this.state = _extends({}, data);

		_this.handleMouseOver = _this.handleMouseOver.bind(_this);

		return _this;
	}

	_createClass(Hexagons, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.refresh = this.getRefreshAnimation();
			this.updateAnimations();
			this.matrixAnimation.play();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var _this2 = this;

			var width = _ref.width,
			    height = _ref.height;

			console.log('here');
			if (width != this.props.width || height != this.props.height) {
				this.waveAnimation.pause(0);
				this.refresh.play().eventCallback('onComplete', function () {
					return _this2.refresh.reverse(0);
				});

				this.setState(_extends({}, this.generateData(width, height)));
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {

			return JSON.stringify(nextProps) !== JSON.stringify(this.props) && JSON.stringify(nextState) !== JSON.stringify(this.state);
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			console.log('here');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this3 = this;

			this.updateAnimations(true);
			this.refresh.eventCallback('onReverseComplete', function () {
				return _this3.matrixAnimation.play();
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'offsetToCubeCoords',
		value: function offsetToCubeCoords(hex) {
			var x = hex.col - (hex.row + (hex.row & 1)) / 2;
			var z = hex.row;
			var y = -x - z;

			return { x: x, y: y, z: z };
		}
	}, {
		key: 'cube_to_evenr',
		value: function cube_to_evenr(cube) {
			var col = cube.x + (cube.z + (cube.z & 1)) / 2;
			var row = cube.z;
			return { row: row, col: col };
		}
	}, {
		key: 'getDirection',
		value: function getDirection(direction) {
			var cubeDirections = [{
				x: +1,
				y: -1,
				z: 0
			}, {
				x: +1,
				y: 0,
				z: -1
			}, {
				x: 0,
				y: +1,
				z: -1
			}, {
				x: -1,
				y: +1,
				z: 0
			}, {
				x: -1,
				y: 0,
				z: +1
			}, {
				x: 0,
				y: -1,
				z: +1
			}];
			return cubeDirections[direction];
		}
	}, {
		key: 'addToHex',
		value: function addToHex(a, b) {
			return {
				x: a.x + b.x,
				y: a.y + b.y,
				z: a.z + b.z
			};
		}
	}, {
		key: 'subtractFromHex',
		value: function subtractFromHex(a, b) {
			return {
				x: a.x - b.x,
				y: a.y - b.y,
				z: a.z - b.z
			};
		}
	}, {
		key: 'scaleHex',
		value: function scaleHex(a, k) {
			return {
				x: a.x * k,
				y: a.y * k,
				z: a.z * k
			};
		}
	}, {
		key: 'hexLength',
		value: function hexLength(hex) {
			return Math.trunc((Math.abs(hex.x) + Math.abs(hex.y) + Math.abs(hex.z)) / 2);
		}
	}, {
		key: 'findNeighbor',
		value: function findNeighbor(hex, direction) {
			return this.addToHex(hex, this.getDirection(direction));
		}
	}, {
		key: 'getHexRing',
		value: function getHexRing(center, radius) {
			var results = [];
			var hex = this.addToHex(center, this.scaleHex(this.getDirection(4), radius));
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < radius; j++) {
					results.push(hex);
					hex = this.findNeighbor(hex, i);
				}
			}
			return results;
		}
	}, {
		key: 'getHexagonElement',
		value: function getHexagonElement(hexCoords) {
			var c = this.state.cubeCoordinates[hexCoords.x + ' ' + hexCoords.y + ' ' + hexCoords.z];
			if (typeof c === 'undefined') return null;
			var key = c.translatedHexagon.pRef;
			return this.refs[key];
		}
	}, {
		key: 'getHexagonElementGroup',
		value: function getHexagonElementGroup(hexCoords) {
			var key = this.state.cubeCoordinates[hexCoords.x + ' ' + hexCoords.y + ' ' + hexCoords.z].translatedHexagon.gRef;
			return this.refs[key];
		}
	}, {
		key: 'getHexagonCubicCoords',
		value: function getHexagonCubicCoords(offsetCoords) {
			var x = Math.trunc(offsetCoords.x),
			    y = Math.trunc(offsetCoords.y);

			var key = '' + (0, _utils.pad)(x, 2) + (0, _utils.pad)(y, 2);
			return this.state.offsetCoords[key].cubeCoords;
		}
	}, {
		key: 'getHexagonData',
		value: function getHexagonData(row, col, t) {
			var r = (0, _utils.pad)(row, 2),
			    c = (0, _utils.pad)(col, 2);
			var hexId = '' + r + c;
			return {
				id: hexId,
				transforms: t,
				gRef: 'g_' + hexId,
				pRef: 'p_' + hexId,
				offsetCoords: {
					row: row,
					col: col
				}
			};
		}
	}, {
		key: 'getPixelToHexagon',
		value: function getPixelToHexagon(width, height) {
			width = Math.floor(width / 27.5);
			height = Math.floor(height / 23.5);
			return { width: width, height: height };
		}
	}, {
		key: 'getRingLayers',
		value: function getRingLayers(h, w) {
			var _this4 = this;

			var ringLayers = [];
			var hSize = 15;

			var _getPixelToHexagon = this.getPixelToHexagon(w, h),
			    height = _getPixelToHexagon.height,
			    width = _getPixelToHexagon.width;

			var longestSide = width > height ? width : height;
			var center = this.getHexagonCubicCoords({
				y: width / 2,
				x: height / 2
			});

			for (var i = 1; i < longestSide; i++) {
				var l = this.getHexRing(center, i).map(function (d) {
					return _this4.getHexagonElement(d);
				}).filter(function (d) {
					return d !== null;
				});
				if (l[0] != null) ringLayers.push(l);
			}
			return ringLayers;
		}
	}, {
		key: 'handleMouseOver',
		value: function handleMouseOver(_ref2) {
			var currentTarget = _ref2.currentTarget;

			var tl = new TimelineMax();
			tl.to(currentTarget, 1, {
				stroke: '#E6F99D',
				strokeWidth: .1,
				opacity: 0,
				repeat: 1,
				yoyo: true,
				ease: _gsap.Sine.easeInOut,
				onComplete: function onComplete(d) {
					return tl.set(currentTarget, { clearProps: 'stroke, opacity, strokeWidth' });
				}
			});
		}
	}, {
		key: 'updateLayers',
		value: function updateLayers() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.animation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var anim = _step.value;

					anim.updateTo({
						css: {
							transformOrigin: '50% 50%',
							scale: 1.2 / 2,
							fill: 'yellow'
						}
					}, true);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'updateAnimations',
		value: function updateAnimations() {
			var tlExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var rings = this.getRingLayers(this.props.height, this.props.width);

			if (tlExists) {
				this.removeAnimations(this.waveAnimation);
				this.removeAnimations(this.matrixAnimation);
			}

			this.waveAnimation = this.getWaveAnimation(rings);
			this.matrixAnimation = this.getMatrixAnimation(this.state.transposedHexagonMap);
		}
	}, {
		key: 'removeAnimations',
		value: function removeAnimations(tl) {
			var children = tl.getChildren();
			tl.pause();
			tl.clear();
			tl.invalidate();
			tl.kill();
			tl.remove();

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var child = _step2.value;

					child.pause(0);
					child.kill();
					child.invalidate();
					_gsap.TweenMax.set(child, { clearProps: 'all' });
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'getRefreshAnimation',
		value: function getRefreshAnimation() {
			var refreshTl = new TimelineMax(),
			    _refs = this.refs,
			    hexcontainer = _refs.hexcontainer,
			    refreshPaneContainer = _refs.refreshPaneContainer,
			    refreshPane = _refs.refreshPane;

			refreshTl.fromTo(hexcontainer, 0, {
				zIndex: -1
			}, { zIndex: 1000 });
			refreshTl.fromTo(refreshPaneContainer, 0, {
				visibility: 'hidden'
			}, { visibility: 'visible' });
			refreshTl.fromTo(refreshPane, 1, {
				width: '0%',
				ease: _gsap.Power4.easeInOut
			}, {
				width: '100%',
				ease: _gsap.Power4.easeInOut
			});

			return refreshTl.reverse();
		}
	}, {
		key: 'getMatrixAnimation',
		value: function getMatrixAnimation(matrix) {
			var _this5 = this;

			var fills = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['#259073', '#7FDA89', '#C8E98E', '#E6F99D', '#FFFFFF', '#000000'];

			var shuffled = (0, _utils.shuffle)(matrix.slice()),
			    matrixTl = new TimelineMax({ repeat: -1 });

			shuffled.forEach(function (row, rowIndex, rowArr) {
				var lineTl = new TimelineMax(),
				    fill = fills[(0, _utils.getRandomInt)(0, 6)],
				    speed = (0, _utils.getRandomFloat)(.1, 5),
				    lineDelay = 5 * (0, _utils.getRandomInt)(0, 10),
				    linePosition = rowIndex / rowArr;

				row.forEach(function (col, colIndex, colArr) {
					var hexagon = _this5.refs[col.gRef],
					    placement = colIndex / colArr,
					    params = {
						transformOrigin: '50% 50%',
						useFrames: true,
						scale: -.8,
						fill: fill,
						opacity: speed,
						delay: .05 * colIndex,
						repeat: 1,
						yoyo: true,
						repeatDelay: 1,
						ease: _gsap.Sine.easeIn
					};

					lineTl.add(_gsap.TweenMax.to(hexagon, speed, params), placement);
				});
				matrixTl.add(lineTl.delay(lineDelay), linePosition);
			});
			return matrixTl.pause();
		}
	}, {
		key: 'getWaveAnimation',
		value: function getWaveAnimation(rings) {
			var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#071F3A';

			var amplitude = 1.2,
			    frequency = 40,
			    segments = rings.length * 40,
			    tl = new TimelineMax({ repeat: -1 }),
			    params = {
				transformOrigin: '50% 50%',
				scale: .8,
				fill: fill,
				yoyo: true,
				ease: _gsap.Sine.easeInOut,
				repeat: 1
			};

			rings.forEach(function (layer, index) {
				var norm = index / segments;
				tl.add(_gsap.TweenMax.to(layer, .7, params), norm * frequency);
			});

			return tl.pause();
		}
	}, {
		key: 'generateData',
		value: function generateData(width, height) {
			var hSize = 15;
			var hSpacing = 12.5;
			var vSpacing = 8.5;
			var hAmount = Math.floor(width / (hSize + hSpacing));
			var vAmount = Math.floor(height / (hSize + vSpacing));
			/* h/vSpacing spacing between each hexagon. offset x - spacing between every odd row.*/
			var offset = -13.5;
			var offsetCoords = {},
			    hexagonsAttrs = [],
			    hexagonMap = [],
			    cubeCoordinates = {},
			    cubeCoords = {};

			for (var vHexagons = 0; vHexagons < vAmount; vHexagons++) {
				var row = [],
				    col = [],
				    translate = void 0,
				    translatedHexagon = void 0;

				for (var hHexagons = 0; hHexagons < hAmount; hHexagons++) {
					var calculatedHSpacing = (hSize + hSpacing) * hHexagons,
					    calculatedVSpacing = (hSize + vSpacing) * vHexagons;

					translate = vHexagons % 2 === 0 ? calculatedHSpacing + ', ' + calculatedVSpacing : calculatedHSpacing + offset + ', ' + calculatedVSpacing;

					translatedHexagon = this.getHexagonData(vHexagons, hHexagons, 'translate(' + translate + ')');

					cubeCoords = this.offsetToCubeCoords(translatedHexagon.offsetCoords);

					cubeCoordinates[cubeCoords.x + ' ' + cubeCoords.y + ' ' + cubeCoords.z] = _extends({}, cubeCoords, {
						translatedHexagon: translatedHexagon
					});

					offsetCoords['' + translatedHexagon.id] = _extends({}, translatedHexagon, {
						cubeCoords: cubeCoords
					});

					hexagonsAttrs.push(translatedHexagon);
					row.push(translatedHexagon);
				}
				hexagonMap.push(row);
			}

			return { hexagonMap: hexagonMap, cubeCoordinates: cubeCoordinates, hexagonsAttrs: hexagonsAttrs, offsetCoords: offsetCoords, transposedHexagonMap: (0, _utils.transpose)(hexagonMap) };
		}
	}, {
		key: 'renderHexagons',
		value: function renderHexagons(attrs) {
			var _this6 = this;

			return attrs.map(function (_ref3, i) {
				var id = _ref3.id,
				    gRef = _ref3.gRef,
				    transforms = _ref3.transforms,
				    pRef = _ref3.pRef;

				return _react2.default.createElement(
					'g',
					{ key: i, id: id, ref: gRef, transform: transforms },
					_react2.default.createElement('path', { onMouseOver: _this6.handleMouseOver, className: 'hexagon', ref: pRef, d: 'M26 22.42V7.52L13 0 0 7.52v14.9L13 30l13-7.58' }),
					_react2.default.createElement('path', { className: 'hexagon-stroke', d: 'M26 7.52L13 0 0 7.52v14.9L13 30l13-7.58zM13 29.08L.8 22V8L13 .92 25.19 8v14z' })
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var hexagonsAttrs = this.state.hexagonsAttrs;

			return _react2.default.createElement(
				'svg',
				{ ref: 'hexcontainer', className: 'hexcontainer', id: 'main', viewBox: this.props.viewBox, preserveAspectRatio: 'none' },
				_react2.default.createElement(
					'g',
					{ className: 'hexagons' },
					this.renderHexagons(hexagonsAttrs)
				),
				_react2.default.createElement(
					'g',
					{ ref: 'refreshPaneContainer', className: 'refresh-pane-container' },
					_react2.default.createElement('rect', { ref: 'refreshPane', className: 'refresh-pane' })
				)
			);
		}
	}]);

	return Hexagons;
}(_react2.default.Component);

exports.default = Hexagons;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CenterLogo = __webpack_require__(214);

var _CenterLogo2 = _interopRequireDefault(_CenterLogo);

var _MediaIcons = __webpack_require__(220);

var _MediaIcons2 = _interopRequireDefault(_MediaIcons);

var _reactTransitionGroup = __webpack_require__(24);

var _Transitions = __webpack_require__(43);

var _NotifySwipe = __webpack_require__(55);

var _NotifySwipe2 = _interopRequireDefault(_NotifySwipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
	_inherits(Home, _React$Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {
			hover: false
		};
		return _this;
	}

	_createClass(Home, [{
		key: 'handleHover',
		value: function handleHover() {
			this.setState({ hover: true });
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onUnSwipeable();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_Transitions.Transition,
				{ settings: {
						time: 300,
						transition: 'slide-up'
					} },
				_react2.default.createElement(
					'div',
					{ key: this.props.location.key, className: 'col-sm home-content click-through-child' },
					_react2.default.createElement(_CenterLogo2.default, { className: 'click-through click-through-child' }),
					_react2.default.createElement(_MediaIcons2.default, { onHover: this.handleHover.bind(this) }),
					_react2.default.createElement(_NotifySwipe2.default, this.props)
				)
			);
		}
	}]);

	return Home;
}(_react2.default.Component);

exports.default = Home;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _gsap = __webpack_require__(22);

var _DrawSVGPlugin = __webpack_require__(57);

var _DrawSVGPlugin2 = _interopRequireDefault(_DrawSVGPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaIcons = function (_React$Component) {
	_inherits(MediaIcons, _React$Component);

	function MediaIcons(props) {
		_classCallCheck(this, MediaIcons);

		var _this = _possibleConstructorReturn(this, (MediaIcons.__proto__ || Object.getPrototypeOf(MediaIcons)).call(this, props));

		_this.faceBook = 'https://www.facebook.com/people/Carlos-Viera/100010910018655';
		_this.gitHub = 'https://github.com/carlosxviera';
		_this.linkedIn = 'https://www.linkedin.com/in/cxviera/';

		_this.strokeTo = {
			stroke: '#E6F99D',
			drawSVG: '0%'
		};

		_this.strokeBackTo = {
			stroke: '#FFF',
			delay: 1,
			drawSVG: '100%'
		};

		_this.mouseProps = {
			onMouseOver: _this.handleMouseOver.bind(_this),
			onMouseOut: _this.handleMouseOut.bind(_this),
			onClick: _this.handleOnClick.bind(_this)
		};

		return _this;
	}

	_createClass(MediaIcons, [{
		key: 'handleMouseOver',
		value: function handleMouseOver(_ref) {
			var currentTarget = _ref.currentTarget;

			var g = currentTarget.children[0];

			_gsap.TweenLite.to(g.firstChild, 1, this.strokeTo);
			_gsap.TweenLite.to(g.lastChild, .3, {
				transformOrigin: '50% 50%',
				scale: .8,
				fill: '#E6F99D'
			});
		}
	}, {
		key: 'handleMouseOut',
		value: function handleMouseOut(_ref2) {
			var currentTarget = _ref2.currentTarget;

			var g = currentTarget.children[0];

			_gsap.TweenLite.to(g.firstChild, 1, this.strokeBackTo);
			_gsap.TweenLite.to(g.lastChild, 1, {
				transformOrigin: '50% 50%',
				scale: 1,
				fill: '#FFF',
				delay: .5
			});
		}
	}, {
		key: 'handleOnClick',
		value: function handleOnClick(_ref3) {
			var currentTarget = _ref3.currentTarget,
			    preventDefault = _ref3.preventDefault;

			window.location.href = currentTarget.getAttribute('href');

			preventDefault();

			console.log(preventDefault);
		}
	}, {
		key: 'faceBookIcon',
		value: function faceBookIcon() {
			var _this2 = this;

			return _react2.default.createElement(
				'a',
				_extends({ href: this.faceBook }, this.mouseProps),
				_react2.default.createElement(
					'g',
					{ id: 'facebook', onClick: function onClick() {
							return console.log(_this2);
						} },
					_react2.default.createElement('rect', { width: '25', height: '24.9', x: '66.7', y: '.5', className: 'icon-border', rx: '2', ry: '2', fill: '#FFF' }),
					_react2.default.createElement('path', { d: 'M77.5 20h2.8v-7h2l.2-2.5h-2.2V9.3c0-.6 0-1 1-1h1.3V6h-2c-2.3 0-3 1-3 3v1.5H76V13h1.4z', className: 'icon' })
				)
			);
		}
	}, {
		key: 'linkedInIcon',
		value: function linkedInIcon() {
			return _react2.default.createElement(
				'a',
				_extends({ href: this.linkedIn }, this.mouseProps),
				_react2.default.createElement(
					'g',
					{ id: 'linkedin' },
					_react2.default.createElement('rect', { width: '25', height: '24.9', x: '.5', y: '.6', className: 'icon-border', rx: '2', ry: '2' }),
					_react2.default.createElement('path', { d: 'M19.8 18.7v-5c0-2.7-1.4-4-3.3-4a3 3 0 0 0-2.6 1.5V10h-3v8.7h3v-5a2 2 0 0 1 0-.6 1.6 1.6 0 0 1 1.5-1c1 0 1.4.8 1.4 2v4.7zm-12-10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 1 0 0 3zm1.6 10V10h-3v8.7z', className: 'icon' })
				)
			);
		}
	}, {
		key: 'gitHubIcon',
		value: function gitHubIcon() {

			return _react2.default.createElement(
				'a',
				_extends({ href: this.gitHub }, this.mouseProps),
				_react2.default.createElement(
					'g',
					{ id: 'github' },
					_react2.default.createElement('rect', { width: '25', height: '24.9', x: '33.6', y: '.6', className: 'icon-border', rx: '2', ry: '2' }),
					_react2.default.createElement('path', { d: 'M49 20.7h-4.2v-2c-2.8.6-3.6-1.6-3.6-1.6a6.3 6.3 0 0 0-1-1.4c-1-.6 0-.5 0-.5a2 2 0 0 1 1.5 1 2.4 2.4 0 0 0 3 1 2.5 2.5 0 0 1 .6-1.4c-2.2-.3-4-1.6-4-4.2s.4-3 1-3.6a3.2 3.2 0 0 1 0-2.5s1 0 2 1.5c.4-.5 2-.5 2.5-.5s2 0 2.6.5c1-1.5 2-1.5 2-1.5a3.2 3.2 0 0 1 0 2.5c.5.6 1 1 1 3.6s-2 4-4 4.2a2.8 2.8 0 0 1 .4 1.5v3.7z', className: 'icon' })
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'row social-media-icons click-through' },
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-6 col-sm-offset-3 social-media-icons-content click-through' },
					_react2.default.createElement(
						'svg',
						{ id: 'social-media-icons-item-svg', className: 'click-through-child', viewBox: ' 0 0 92.3 26' },
						this.linkedInIcon(),
						this.gitHubIcon(),
						this.faceBookIcon()
					)
				)
			);
		}
	}]);

	return MediaIcons;
}(_react2.default.Component);

exports.default = MediaIcons;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LogoSubTitle = exports.SlideNav = exports.LogoButton = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(24);

var _Transitions = __webpack_require__(43);

var _reactRouterDom = __webpack_require__(30);

var _Glasses = __webpack_require__(54);

var _Glasses2 = _interopRequireDefault(_Glasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogoButton = exports.LogoButton = function LogoButton() {
	return _react2.default.createElement(
		'div',
		{ className: 'col-sm-2 mobile-logo-button-container' },
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: '/' },
			_react2.default.createElement(
				'svg',
				{ className: 'mobile-logo-button', viewBox: '0 0 157 60' },
				_react2.default.createElement(_Glasses2.default, { position: 'Front', transformation: 'scale(.8)' })
			)
		)
	);
};

var SlideNav = exports.SlideNav = function SlideNav() {
	return _react2.default.createElement(
		'div',
		{ className: 'slide-nav' },
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ className: 'slide-nav-item', to: '/about' },
			_react2.default.createElement(
				'h5',
				null,
				'About Me'
			)
		),
		_react2.default.createElement(
			'a',
			{ className: 'slide-nav-item', href: 'http://blog.viera.io' },
			_react2.default.createElement(
				'h5',
				null,
				'Blog'
			)
		),
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ className: 'slide-nav-item', to: '/work' },
			_react2.default.createElement(
				'h5',
				null,
				'Works'
			)
		),
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ className: 'slide-nav-item', to: '/contact' },
			_react2.default.createElement(
				'h5',
				null,
				'Contact'
			)
		)
	);
};

var LogoSubTitle = exports.LogoSubTitle = function LogoSubTitle(_ref) {
	var show = _ref.show;

	var sub = !show ? _react2.default.createElement(
		'small',
		null,
		'Viera.io',
		_react2.default.createElement('br', null),
		'Web Developer'
	) : '';

	return _react2.default.createElement(
		'div',
		{ className: 'col-sm-3 logo-subtitle' },
		_react2.default.createElement(
			'h5',
			null,
			_react2.default.createElement(
				_Transitions.Transition,
				{ settings: {
						time: 300,
						transition: 'slide-left'
					} },
				sub
			)
		)
	);
};

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _gsap = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavButton = function (_React$Component) {
	_inherits(NavButton, _React$Component);

	function NavButton(props) {
		_classCallCheck(this, NavButton);

		var _this = _possibleConstructorReturn(this, (NavButton.__proto__ || Object.getPrototypeOf(NavButton)).call(this, props));

		_this.state = {
			exitButton: null,
			menuButton: null
		};

		_this.handleExitOnRef = _this.handleExitOnRef.bind(_this);
		_this.getExitAnimation = _this.getExitAnimation.bind(_this);
		_this.handleExitClick = _this.handleExitClick.bind(_this);
		_this.handleSettingClick = _this.handleSettingClick.bind(_this);
		_this.renderMenuButton = _this.renderMenuButton.bind(_this);
		_this.handleSettingOnRef = _this.handleSettingOnRef.bind(_this);

		return _this;
	}

	_createClass(NavButton, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'getSettingsAnimation',
		value: function getSettingsAnimation(ref) {
			if (ref === null) {
				this.settingAnimation.kill().invalidate().clear().remove();
				delete this.settingAnimation;
				return;
			}

			var dividers = ref.children,
			    settingsTl = new _gsap.TimelineMax(),
			    toParams = {
				transformOrigin: '50% 50%',
				x: -5,
				opacity: 0,
				ease: _gsap.Power4.easeOut
			},
			    fromParams = {
				transformOrigin: '50% 50%',
				x: 0,
				opacity: 1,
				ease: _gsap.Power4.easeIn
			};

			settingsTl.staggerFromTo(dividers, .2, toParams, fromParams, .1).eventCallback('onReverseComplete', this.props.onShow);

			return settingsTl;
		}
	}, {
		key: 'getExitAnimation',
		value: function getExitAnimation(ref) {
			var _this2 = this;

			if (ref === null) {
				this.exitSettingAnimation.kill().invalidate().clear().remove();
				delete this.exitSettingAnimation;
				return;
			}

			var exitTl = new _gsap.TimelineMax(),
			    toParams = {
				transformOrigin: '50% 50%',
				scale: 1,
				opacity: 1,
				ease: _gsap.Power4.easeOut
			},
			    fromParams = {
				transformOrigin: '50% 50%',
				scale: 0,
				opacity: 0,
				ease: _gsap.Power4.easeIn
			};

			exitTl.fromTo(ref, .4, fromParams, toParams).eventCallback('onReverseComplete', function (s) {
				_this2.props.onHide();
			});

			return exitTl;
		}
	}, {
		key: 'handleExitClick',
		value: function handleExitClick() {

			this.exitSettingAnimation.reverse(0);
		}
	}, {
		key: 'handleSettingClick',
		value: function handleSettingClick() {
			this.settingAnimation.reverse(0);
		}
	}, {
		key: 'handleExitOnRef',
		value: function handleExitOnRef(ref) {

			this.exitSettingAnimation = this.getExitAnimation(ref);
		}
	}, {
		key: 'handleSettingOnRef',
		value: function handleSettingOnRef(ref) {
			this.settingAnimation = this.getSettingsAnimation(ref);
		}
	}, {
		key: 'renderMenuButton',
		value: function renderMenuButton(show) {
			return show ? _react2.default.createElement(
				'div',
				{ className: 'exit-button', onClick: this.handleExitClick },
				_react2.default.createElement(
					'svg',
					{ ref: this.handleExitOnRef, id: 'x-button', viewBox: '0 0 192.4 192.4' },
					_react2.default.createElement('path', { d: 'M147.5 192.4l-51.3-51-51 51L0 147l51.3-50.8L0 45.2 45.3 0l51 51 51.2-51 45 45-51 51 51 51z' })
				)
			) : _react2.default.createElement(
				'div',
				{ className: 'nav-button', ref: this.handleSettingOnRef, onClick: this.handleSettingClick },
				_react2.default.createElement('div', { ref: 'div1', className: 'nav-divider' }),
				_react2.default.createElement('div', { ref: 'div2', className: 'nav-divider' }),
				_react2.default.createElement('div', { ref: 'div3', className: 'nav-divider' }),
				_react2.default.createElement('div', { ref: 'div4', className: 'nav-divider' })
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'col-sm-2 col-sm-offset-5 nav-button-container' },
				this.renderMenuButton(this.props.show)
			);
		}
	}]);

	return NavButton;
}(_react2.default.Component);

exports.default = NavButton;

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function Server(_onClick) {
	return _react2.default.createElement(
		'g',
		{ id: 'server', onClick: function onClick() {
				return _onClick('back-end');
			} },
		_react2.default.createElement('rect', { fill: 'rgba(0,0,0,0)', x: '195', width: '80', height: '65' }),
		_react2.default.createElement('path', { d: 'M270 5.5V15h4.7V5.6zm3.7 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.6zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.4zm0-2.8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.3.5zM195.5 5.5V15h4.8V5.6zm1 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.6zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.4zm0-2.8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.5.5z', className: 'server-hinge' }),
		_react2.default.createElement('path', { d: 'M271.6 3H199a1 1 0 0 0-1 1v12.6a1 1 0 0 0 1 1h72.6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM235 14a3.3 3.3 0 1 1 3.3-3.3 3.3 3.3 0 0 1-3.3 3.3zm21.4 1.3h-.4V5.6h.4zm1 0h-.5V5.6h.3zm.8 0h-.4V5.6h.4zm1 0h-.5V5.6h.4zm.8 0h-.4V5.6h.4zm1 0h-.5V5.6h.4zm.8 0h-.5V5.6h.5zm1 0h-.6V5.6h.5zm.8 0h-.5V5.5h.6zm.8 0h-.4V5.6h.4z' }),
		_react2.default.createElement('circle', { cx: '267.8', cy: '6.2', r: '.8', className: 'power-button' }),
		_react2.default.createElement('path', { d: 'M267.4 8.3h.8v7h-.8z', className: 'line-light' }),
		_react2.default.createElement('path', { d: 'M270 20.7v9.6h4.7v-9.6zm3.7 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.5zm0-2.8a.4.4 0 1 1 .4-.5.4.4 0 0 1-.3.4zm0-3a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.5zM195.5 20.7v9.6h4.8v-9.6zm1 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.5zm0-2.8a.4.4 0 1 1 .4-.5.4.4 0 0 1-.5.4zm0-3a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.5z', className: 'server-hinge' }),
		_react2.default.createElement('path', { d: 'M271.6 18.3H199a1 1 0 0 0-1 1v12.5a1 1 0 0 0 1 1h72.6a1 1 0 0 0 1-1V19.3a1 1 0 0 0-1-1zM235 29a3.3 3.3 0 1 1 3.3-3.3A3.3 3.3 0 0 1 235 29zm21.4 1.4h-.4v-9.7h.4zm1 0h-.5v-9.7h.3zm.8 0h-.4v-9.7h.4zm1 0h-.5v-9.7h.4zm.8 0h-.4v-9.7h.4zm1 0h-.5v-9.7h.4zm.8 0h-.5v-9.7h.5zm1 0h-.6v-9.7h.5zm.8 0h-.5v-9.8h.6zm.8 0h-.4v-9.7h.4z' }),
		_react2.default.createElement('circle', { cx: '267.8', cy: '21.3', r: '.8', className: 'power-button' }),
		_react2.default.createElement('path', { d: 'M267.4 23.5h.8v7h-.8z', className: 'line-light' }),
		_react2.default.createElement('path', { d: 'M195.5 36v9.5h4.8V36zm1 8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.5.5zm0-3a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.5zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.4zM270 36v9.5h4.7V36zm3.7 8a.4.4 0 1 1 .4-.6.4.4 0 0 1-.3.5zm0-3a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.5zm0-2.8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.4z', className: 'server-hinge' }),
		_react2.default.createElement('path', { d: 'M271.6 33.4H199a1 1 0 0 0-1 1V47a1 1 0 0 0 1 1h72.6a1 1 0 0 0 1-1V34.3a1 1 0 0 0-1-1zM235 44a3.3 3.3 0 1 1 3.3-3.2A3.3 3.3 0 0 1 235 44zm21.4 1.5h-.4V36h.4zm1 0h-.5V36h.3zm.8 0h-.4V36h.4zm1 0h-.5v-9.7h.4zm.8 0h-.4v-9.7h.4zm1 0h-.5v-9.7h.4zm.8 0h-.5v-9.7h.5zm1 0h-.6v-9.7h.5zm.8 0h-.5v-9.7h.6zm.8 0h-.4v-9.7h.4z' }),
		_react2.default.createElement('circle', { cx: '267.8', cy: '36.5', r: '.8', className: 'power-button' }),
		_react2.default.createElement('path', { d: 'M267.4 38.6h.8v7h-.8z', className: 'line-light' }),
		_react2.default.createElement('path', { d: 'M270 51v9.6h4.7V51zm3.7 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.3.4zm0-2.8a.4.4 0 1 1 .4-.5.4.4 0 0 1-.3.5zm0-3a.4.4 0 1 1 .4-.3.4.4 0 0 1-.3.4zM195.5 51v9.6h4.8V51zm1 8a.4.4 0 1 1 .4-.4.4.4 0 0 1-.5.4zm0-2.8a.4.4 0 1 1 .4-.5.4.4 0 0 1-.5.5zm0-3a.4.4 0 1 1 .4-.3.4.4 0 0 1-.5.4z', className: 'server-hinge' }),
		_react2.default.createElement('path', { d: 'M271.6 48.5H199a1 1 0 0 0-1 1V62a1 1 0 0 0 1 1h72.6a1 1 0 0 0 1-1V49.6a1 1 0 0 0-1-1zM235 59.3a3.3 3.3 0 1 1 3.2-3.2 3.3 3.3 0 0 1-3.2 3.2zm21.4 1.4h-.4V51h.4zm1 0h-.5V51h.3zm.8 0h-.4V51h.4zm1 0h-.5V51h.4zm.8 0h-.4V51h.4zm1 0h-.5V51h.4zm.8 0h-.5V51h.5zm1 0h-.6V51h.5zm.8 0h-.5V51h.6zm.8 0h-.4V51h.4z' }),
		_react2.default.createElement('circle', { cx: '267.8', cy: '51.6', r: '.8', className: 'power-button' }),
		_react2.default.createElement('path', { d: 'M267.4 53.8h.8v7h-.8z', className: 'line-light' })
	);
};
var Laptop = function Laptop(_onClick2) {
	return _react2.default.createElement(
		'g',
		{ id: 'laptop', onClick: function onClick() {
				return _onClick2('front-end');
			} },
		_react2.default.createElement('rect', { fill: 'rgba(0,0,0,0)', x: '3', width: '105', height: '65' }),
		_react2.default.createElement('path', { d: 'M94.2 4.4H15.8A3.5 3.5 0 0 0 12.3 8v53a3.5 3.5 0 0 0 3.5 3.4h78.4a3.5 3.5 0 0 0 3.5-3.5V8a3.5 3.5 0 0 0-3.5-3.6zM94 57.6H16v-49H94z', className: 'd' }),
		_react2.default.createElement('path', { d: 'M0 60.8V64a9.4 9.4 0 0 0 1.3 0h107.4a9.5 9.5 0 0 0 1.3 0v-3.2z' }),
		_react2.default.createElement('path', { d: 'M55.5 6.8a.5.5 0 0 1-.5.5.5.5 0 1 1 0-1 .5.5 0 0 1 .5.5z' }),
		_react2.default.createElement('path', { d: 'M45.8 60.8a1.4 1.4 0 0 0 1.3 1.7h16a1.4 1.4 0 0 0 1.3-1.4 1.2 1.2 0 0 0 0-.2z', className: 'inset' })
	);
};

var Gears = function Gears(_onClick3) {
	return _react2.default.createElement(
		'g',
		{ id: 'gears', onClick: function onClick() {
				return _onClick3('dev-ops');
			} },
		_react2.default.createElement('rect', { fill: 'rgba(0,0,0,0)', x: '390', width: '75', height: '65' }),
		_react2.default.createElement('path', { d: 'M394.2 55.4l2.5-1.4a1 1 0 0 0 .6-1 14.4 14.4 0 0 1 0-1.8.7.7 0 0 0-.4-.7l-2.3-1.3a.5.5 0 0 1-.3-.7c.4-1 1-2.2 1.2-3.4 0-.3.4-.3.7-.3l2.5.4a.7.7 0 0 0 .8-.2c.3-.6.8-1 1.2-1.7a.8.8 0 0 0 0-.5c-.2-.8-.5-1.7-1-2.5 0-.3 0-.5.3-.7l3-2a.5.5 0 0 1 .8 0l1.8 1.8a.7.7 0 0 0 .8.3 15 15 0 0 1 2-.5.7.7 0 0 0 .5-.7c0-.7.3-1.6.5-2.5a.4.4 0 0 1 .5-.3h3.6c.4 0 .5 0 .6.5 0 .8.3 1.7.4 2.5a.7.7 0 0 0 .6.7 11.4 11.4 0 0 1 1.7.5.8.8 0 0 0 1 0c.6-.8 1.4-1.4 2.2-2l3.6 2.6-1.3 2.8a.8.8 0 0 0 0 1c.5.5.8 1 1 1.6a1 1 0 0 0 .8.3c1 0 1.8 0 2.7-.2a.5.5 0 0 1 .6.4l1 3.4c0 .3 0 .5-.3.6l-2.3 1.3a.7.7 0 0 0-.5.7v2a.7.7 0 0 0 .4.6L428 56a.4.4 0 0 1 .2.7l-1.2 3.3a.5.5 0 0 1-.6.5L424 60a.7.7 0 0 0-.7.4c-.4.6-1 1-1.2 1.6a1 1 0 0 0 0 .8l1 2.5a.5.5 0 0 1-.2.6l-3 2a.5.5 0 0 1-.7 0l-1.8-2a.7.7 0 0 0-.8 0l-1.8.5c-.3 0-.5.2-.6.5l-.6 2.5a.6.6 0 0 1-.8.6h-3.3c-.4 0-.5 0-.6-.6 0-.8-.3-1.7-.5-2.5a1 1 0 0 0-.5-.7 17.8 17.8 0 0 0-2-.7.8.8 0 0 0-.6 0l-2 2a.5.5 0 0 1-.7 0l-2.8-2.2a.5.5 0 0 1-.2-.8l1-2.3a.7.7 0 0 0 0-1l-1-1.5a.8.8 0 0 0-.7-.3H396a.6.6 0 0 1-.7-.3l-1-3.8zm27-2.6a9.7 9.7 0 1 0-10.2 9.5 9.7 9.7 0 0 0 10-9.5z', className: 'd' }),
		_react2.default.createElement('path', { d: 'M415 31.8l2.8-2.5a1.3 1.3 0 0 0 .5-1.6 19 19 0 0 1-.5-2.2.8.8 0 0 0-.7-.8l-3.2-1a.6.6 0 0 1-.5-.8l.5-5c0-.3.3-.5.7-.5l3.3-.3a1 1 0 0 0 1-.6l1-2.6a1 1 0 0 0 0-.8l-2-3c-.3-.2-.4-.5 0-1 1-1 2-2 3-3.3a.7.7 0 0 1 1-.2l3 1.6a1 1 0 0 0 1 0 19.7 19.7 0 0 1 2.2-1.2 1 1 0 0 0 .6-1V1.7c0-.4.2-.6.6-.7l4.6-1a.6.6 0 0 1 .8.4c.5 1 1 2 1.4 3.2a1 1 0 0 0 1 .7 15 15 0 0 1 2.3.2 1 1 0 0 0 1.2-.4l2.4-3L448 3l-.8 3.7a1 1 0 0 0 .5 1.4l1.7 1.6a1.2 1.2 0 0 0 1 .2l3.3-1a.7.7 0 0 1 1 .4c.6 1.3 1.4 2.7 2.2 4a.6.6 0 0 1-.2 1l-2.6 2.3a1 1 0 0 0-.3 1c.3.7.5 1.5.6 2.3a1 1 0 0 0 .7.8c1.2.5 2.3 1 3.4 1.2a.6.6 0 0 1 .4.8c0 1.5-.2 3-.4 4.6a.7.7 0 0 1-.7.8c-1.2 0-2.3.2-3.4.3a1 1 0 0 0-1 .7c-.2.8-.7 1.5-1 2.4a1.3 1.3 0 0 0 0 1l2 2.8a.6.6 0 0 1 0 1l-3 3.4a.7.7 0 0 1-1 0l-3-1.6a1 1 0 0 0-1 0l-2.2 1.3a1 1 0 0 0-.6 1v3.2c0 .5-.2.8-.8 1-1.5 0-3 .4-4.3.8a.7.7 0 0 1-1-.6c-.4-1-.8-2-1.4-3a1.2 1.2 0 0 0-.7-.6 23.4 23.4 0 0 0-2.7-.3 1 1 0 0 0-1 .3l-2 3a.6.6 0 0 1-1 .2l-4.2-2a.7.7 0 0 1-.5-1l.8-3.2a1 1 0 0 0-.3-1l-2-1.8a1 1 0 0 0-.8-.2l-3.4 1a.7.7 0 0 1-1-.4l-2.6-4.4zm33.7-11.5a12.7 12.7 0 1 0-10 15.2 12.8 12.8 0 0 0 10-15.2z', className: 'd' })
	);
};

var SkillButtons = function SkillButtons(_ref) {
	var handleClick = _ref.handleClick;


	return _react2.default.createElement(
		'div',
		{ className: 'row skill-buttons' },
		_react2.default.createElement(
			'div',
			{ className: 'col-sm-10 col-sm-offset-1 skill-button-content' },
			_react2.default.createElement(
				'svg',
				{ id: 'skill-icons-item-svg', viewBox: '0 0 459.2 70' },
				Laptop(handleClick),
				Server(handleClick),
				Gears(handleClick)
			)
		)
	);
};

SkillButtons.propTypes = {
	handleClick: _react2.default.PropTypes.func
};

exports.default = SkillButtons;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TopNavIcon = __webpack_require__(225);

var _TopNavIcon2 = _interopRequireDefault(_TopNavIcon);

var _reactRouterDom = __webpack_require__(30);

var _reactTransitionGroup = __webpack_require__(24);

var _nodeUuid = __webpack_require__(39);

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _Glasses = __webpack_require__(54);

var _Glasses2 = _interopRequireDefault(_Glasses);

var _gsap = __webpack_require__(22);

var _NavButton = __webpack_require__(222);

var _NavButton2 = _interopRequireDefault(_NavButton);

var _MobileNav = __webpack_require__(221);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNav = function (_React$Component) {
	_inherits(TopNav, _React$Component);

	function TopNav(props) {
		_classCallCheck(this, TopNav);

		var _this = _possibleConstructorReturn(this, (TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call(this, props));

		_this.colors = ['#259073', '#7FDA89', '#C8E98E', '#E6F99D'];

		_this.state = {
			show: false
		};
		return _this;
	}

	_createClass(TopNav, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'handleShowSlideIn',
		value: function handleShowSlideIn(_ref) {
			var _this2 = this;

			var currentTarget = _ref.currentTarget;


			var arr = [].concat(_toConsumableArray(currentTarget.firstChild.children));

			var complete = this.handleShow.bind(this);

			this.tlArr = arr.map(function (item, i, a) {
				var tl = new _gsap.TimelineMax();
				var completeProp = i === a.length - 1 ? complete : function () {};

				return tl.to(item, .4, {
					transformOrigin: '50% 50%',
					x: -5,
					opacity: 0,
					repeat: 0,
					delay: .05 * i,
					backgroundColor: _this2.colors[i],
					ease: _gsap.Back.easeOut,
					onComplete: completeProp
				});
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			console.log('receiving');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'handleClick',
		value: function handleClick() {
			this.setState(_extends({}, this.state, {
				show: false
			}));
		}
	}, {
		key: 'handleShow',
		value: function handleShow() {
			console.log('handling Show');
			this.setState(_extends({}, this.state, {
				show: true
			}));
		}
	}, {
		key: 'handleHide',
		value: function handleHide() {
			console.log('handling hide');
			this.setState(_extends({}, this.state, {
				show: false
			}));
		}
	}, {
		key: 'renderSlideIn',
		value: function renderSlideIn(show) {
			var slide = show ? _react2.default.createElement(
				'div',
				{ onClick: this.handleHide.bind(this) },
				_react2.default.createElement(_MobileNav.SlideNav, null)
			) : '';
			return _react2.default.createElement(
				_reactTransitionGroup.CSSTransitionGroup,
				{ component: 'span', transitionAppear: true, transitionAppearTimeout: 300, transitionName: 'example', transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
				slide
			);
		}
	}, {
		key: 'render',
		value: function render() {

			/* TODO: DRY out render */

			return _react2.default.createElement(
				'div',
				{ className: 'row top-nav click-through-child' },
				_react2.default.createElement(
					'div',
					{ className: 'middle-line hidden-sm' },
					_react2.default.createElement('hr', null)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-6 col-sm-offset-3 nav hidden-sm ' },
					_react2.default.createElement(
						'div',
						{ className: 'nav-item about hvr-pulse-shrink' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/about', className: '' },
							_react2.default.createElement(
								'h5',
								null,
								'About Me'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'nav-item blog hvr-pulse-shrink' },
						_react2.default.createElement(
							'a',
							{ href: 'http://blog.viera.io' },
							_react2.default.createElement(
								'h5',
								null,
								'Blog'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'nav-item home' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/' },
							_react2.default.createElement(_TopNavIcon2.default, null)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'nav-item work hvr-pulse-shrink' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/work' },
							_react2.default.createElement(
								'h5',
								null,
								'Works'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'nav-item contact hvr-pulse-shrink' },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: '/contact' },
							_react2.default.createElement(
								'h5',
								null,
								'Contact'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-12 hidden-md hidden-lg nav-mobile-container' },
					_react2.default.createElement(
						'div',
						{ className: 'row nav-mobile' },
						this.renderSlideIn(this.state.show),
						_react2.default.createElement(_MobileNav.LogoButton, null),
						_react2.default.createElement(_MobileNav.LogoSubTitle, { show: this.state.show }),
						_react2.default.createElement(_NavButton2.default, { ref: 'navButton', show: this.state.show, onShow: this.handleShow.bind(this), onHide: this.handleHide.bind(this) })
					)
				)
			);
		}
	}]);

	return TopNav;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(TopNav);

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Glasses = __webpack_require__(54);

var _Glasses2 = _interopRequireDefault(_Glasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopNavIcon = function TopNavIcon() {

	return _react2.default.createElement(
		'svg',
		{ id: 'top-nav-icon', viewBox: '0 0 80.4 91.5' },
		_react2.default.createElement('path', { d: 'M78.2 69.7a3.8 3.8 0 0 0 1.7-3v-42a3.8 3.8 0 0 0-1.8-3L42 1a3.8 3.8 0 0 0-3.5 0L2.2 21.7a3.8 3.8 0 0 0-1.7 3v42a3.8 3.8 0 0 0 1.7 3l36.3 20.8a3.8 3.8 0 0 0 3.4 0z', className: 'icon-hexagon' }),
		_react2.default.createElement('path', { d: 'M59.3 18.5l13.6 8a1.4 1.4 0 0 1 .5 1v19.8l1.3-.8v-19a2.7 2.7 0 0 0-1.2-2.3l-13.3-7.7zM7 47.2V27.4a1.4 1.4 0 0 1 .5-1l13-7.6-1-.8L6.7 25a2.7 2.7 0 0 0-1.2 2.2v20.8z', className: 'white-arrow' }),
		_react2.default.createElement('path', { d: 'M25 16.2l14.6-8.4a1.4 1.4 0 0 1 1.2 0L55 16l1-1-14.6-8.3a2.7 2.7 0 0 0-2.4 0l-15 8.7zM73.5 53v11.5a1.4 1.4 0 0 1-.6 1L59.6 73l.3 1.4 13.6-7.8a2.7 2.7 0 0 0 1.2-2V52z', className: 'colored-arrow' }),
		_react2.default.createElement('path', { d: 'M55.4 75.6L40.8 84a1.4 1.4 0 0 1-1.2 0l-15.4-9 .3 1.8L39 85a2.7 2.7 0 0 0 2.5 0l14.2-8z', className: 'white-arrow' }),
		_react2.default.createElement('path', { d: 'M18.7 72L7.5 65.4a1.4 1.4 0 0 1-.6-1V53l-1.4 1v10.5a2.7 2.7 0 0 0 1.3 2l12 7z', className: 'colored-arrow' })
	);
};

exports.default = TopNavIcon;

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(30);

var _WorkContent = __webpack_require__(227);

var _WorkContent2 = _interopRequireDefault(_WorkContent);

var _reactTransitionGroup = __webpack_require__(24);

var _NotifySwipe = __webpack_require__(55);

var _NotifySwipe2 = _interopRequireDefault(_NotifySwipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* TODO: Cleanup SVG transforms/tags.
*/

var SVG = function SVG(_ref) {
	var location = _ref.location,
	    match = _ref.match;

	return _react2.default.createElement(
		'div',
		{ className: 'col-sm work-content' },
		_react2.default.createElement(
			'svg',
			{ id: 'work-item-svg', viewBox: '0 0 707.8 483.1' },
			_react2.default.createElement(
				'defs',
				null,
				_react2.default.createElement(
					'clipPath',
					{ id: 'a' },
					_react2.default.createElement('path', { d: 'M588 405.7V272.2l-115.5-66.8-115.7 66.8v133.5l115.7 66.8L588 405.7z', className: 'a' })
				)
			),
			_react2.default.createElement('path', _defineProperty({ id: 'blank', className: 'click-through-child', d: 'M346.5 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z' }, 'className', 'b')),
			_react2.default.createElement(
				_reactRouterDom.NavLink,
				{ className: 'click-through-child', to: match.url + '/deepspace' },
				_react2.default.createElement(
					'g',
					{ id: 'deep-space', className: 'c' },
					_react2.default.createElement('path', { id: 'deep-space-border', d: 'M583.8 408.2a9.6 9.6 0 0 0 4.3-7.5V277.2a9.6 9.6 0 0 0-4.2-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0l-107 61.7a9.6 9.6 0 0 0-4.2 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5L468 470a9.6 9.6 0 0 0 8.8 0z', className: 'b' }),
					_react2.default.createElement('circle', { cx: '351.4', cy: '354.1', r: '128.5', className: 'b' }),
					_react2.default.createElement('circle', { cx: '401.9', cy: '307.6', r: '5.8', className: 'b' }),
					_react2.default.createElement('ellipse', { cx: '407.1', cy: '291.2', className: 'b', rx: '8.7', ry: '10.3', transform: 'rotate(-54.91 407.06 291.2)' }),
					_react2.default.createElement('ellipse', { cx: '417.7', cy: '324.1', className: 'b', rx: '5.4', ry: '7.3', transform: 'rotate(-2.73 417.23 323.82)' }),
					_react2.default.createElement('ellipse', { cx: '382.9', cy: '317.4', className: 'b', rx: '9', ry: '9.3' }),
					_react2.default.createElement('ellipse', { cx: '445', cy: '322.2', className: 'b', rx: '1.3', ry: '1.9', transform: 'rotate(-22.61 445.05 322.24)' }),
					_react2.default.createElement('ellipse', { cx: '441', cy: '313.1', className: 'b', rx: '1.7', ry: '2.9', transform: 'rotate(-31.79 444.69 312.65)' }),
					_react2.default.createElement('ellipse', { cx: '454', cy: '324.5', className: 'b', rx: '1.7', ry: '2.9', transform: 'rotate(-13.2 454.02 324.53)' }),
					_react2.default.createElement('ellipse', { cx: '467.3', cy: '312.6', className: 'b', rx: '.9', ry: '2.9', transform: 'rotate(-17.43 467.46 312.69)' }),
					_react2.default.createElement('ellipse', { cx: '461.1', cy: '314.1', className: 'b', rx: '.5', ry: '1.5', transform: 'rotate(-17.43 461.18 314.2)' }),
					_react2.default.createElement('ellipse', { cx: '456.1', cy: '313.4', className: 'b', rx: '1.2', ry: '2', transform: 'rotate(-22.61 456.17 313.46)' }),
					_react2.default.createElement('ellipse', { cx: '445.8', cy: '300.4', className: 'b', rx: '1.8', ry: '3.5', transform: 'rotate(-30 445.8 300.43)' }),
					_react2.default.createElement('ellipse', { cx: '465.1', cy: '308', className: 'b', rx: '.3', ry: '1.1', transform: 'rotate(-17.43 465.3 308.05)' }),
					_react2.default.createElement('ellipse', { cx: '458.5', cy: '332.3', className: 'b', rx: '1.7', ry: '3.7', transform: 'rotate(-10.18 458.25 332.15)' }),
					_react2.default.createElement('circle', { cx: '366.3', cy: '385.9', r: '6.1', className: 'b' }),
					_react2.default.createElement('ellipse', { cx: '387.3', cy: '395.8', className: 'b', rx: '10.8', ry: '11.3' }),
					_react2.default.createElement('ellipse', { cx: '401.6', cy: '411.6', className: 'b', rx: '4.8', ry: '5.4' }),
					_react2.default.createElement('ellipse', { cx: '421.9', cy: '409.7', className: 'b', rx: '4.6', ry: '4', transform: 'rotate(-54.91 421.87 409.72)' }),
					_react2.default.createElement('ellipse', { cx: '369.7', cy: '431.8', className: 'b', rx: '5.1', ry: '4.3' }),
					_react2.default.createElement('ellipse', { cx: '383.3', cy: '439.3', className: 'b', rx: '8.5', ry: '6.5' }),
					_react2.default.createElement('ellipse', { cx: '405.2', cy: '434.8', className: 'b', rx: '4.2', ry: '2.4', transform: 'rotate(-30 405.22 434.8)' }),
					_react2.default.createElement('ellipse', { cx: '443.4', cy: '342.3', className: 'b', rx: '8.8', ry: '11.4' }),
					_react2.default.createElement('ellipse', { cx: '446.9', cy: '391', className: 'b', rx: '7.2', ry: '5.3', transform: 'rotate(-60 446.89 391.01)' }),
					_react2.default.createElement('ellipse', { cx: '459.8', cy: '358.1', className: 'b', rx: '1.3', ry: '2.7' }),
					_react2.default.createElement('ellipse', { cx: '477.5', cy: '359.9', className: 'b', rx: '.5', ry: '2.2' }),
					_react2.default.createElement('ellipse', { cx: '393.2', cy: '356.9', className: 'b', rx: '4.8', ry: '5.2' }),
					_react2.default.createElement('circle', { cx: '411.9', cy: '365.6', r: '3.4', className: 'b' }),
					_react2.default.createElement('ellipse', { cx: '372.7', cy: '288.4', className: 'b', rx: '3.8', ry: '5.2' }),
					_react2.default.createElement('ellipse', { cx: '380.8', cy: '246.2', className: 'b', rx: '1.2', ry: '3.1', transform: 'rotate(-80.66 380.85 246.16)' }),
					_react2.default.createElement('ellipse', { cx: '372.8', cy: '237.2', className: 'b', rx: '2.7', ry: '5.2', transform: 'rotate(-73.51 372.78 237.2)' }),
					_react2.default.createElement('ellipse', { cx: '430.3', cy: '272.2', className: 'b', rx: '4.6', ry: '7', transform: 'rotate(-40.44 430.34 272.22)' }),
					_react2.default.createElement('ellipse', { cx: '381.9', cy: '269.2', className: 'b', rx: '5.4', ry: '4.1' }),
					_react2.default.createElement('ellipse', { cx: '371.4', cy: '268.7', className: 'b', rx: '4', ry: '2.4' }),
					_react2.default.createElement('circle', { cx: '414.8', cy: '351.9', r: '1.8', className: 'b' }),
					_react2.default.createElement('circle', { cx: '421.1', cy: '395.3', r: '3.3', className: 'b' }),
					_react2.default.createElement('circle', { cx: '426.7', cy: '302', r: '3.6', className: 'b' }),
					_react2.default.createElement('circle', { cx: '430.7', cy: '290.9', r: '2.6', className: 'b' }),
					_react2.default.createElement('ellipse', { cx: '444.2', cy: '279', className: 'b', rx: '1', ry: '2.2', transform: 'matrix(.87 -.5 .5 .87 -79.99 259.49)' }),
					_react2.default.createElement('ellipse', { cx: '453.3', cy: '420.6', className: 'b', rx: '9.2', ry: '2.6', transform: 'rotate(-54.91 453.22 420.6)' }),
					_react2.default.createElement('ellipse', { cx: '437', cy: '423.6', className: 'b', rx: '11.3', ry: '5.5', transform: 'rotate(-54.91 436.98 423.53)' }),
					_react2.default.createElement('ellipse', { cx: '541.9', cy: '267.4', className: 'd', rx: '53.6', ry: '66.7' }),
					_react2.default.createElement('path', { d: 'M511 407l-.8-2.4-2.3 1 1-2.3-2.5-1 2.5-.8-1-2.4 2.2 1.3 1-2.5.8 2.5 2.4-1.2-1 2.5 2.4 1-2.5.8 1 2.4-2.3-1-1 2.3', className: 'd' }),
					_react2.default.createElement('path', { d: 'M493 375l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5', className: 'd' }),
					_react2.default.createElement('path', { d: 'M472 278l-1-2.6-2.3 1.2 1-2.4-2.4-1 2.5-.8-1-2.4 2.3 1 1-2.4 1 2.5 2.3-1-1.2 2.4 2.6 1-2.5.8 1.3 2.4-2.4-1.2-1 2.5', className: 'd' }),
					_react2.default.createElement('path', { d: 'M524.3 364.8l-.5-1.5-1.4.7.6-1.4-1.4-.5 1.4-.4-.6-1.4 1.4.7.5-1.5.5 1.4 1.3-.8-.5 1.4 1.4.5-1.5.6.6 1.4-1.2-.7-.5 1.5', className: 'd' }),
					_react2.default.createElement('path', { d: 'M474.6 248.8l-.5-1.4-1.3.6.7-1.3-1.4-.5 1.4-.5-.7-1.4 1.4.6.6-1.5.5 1.4 1.5-.7-.7 1.4 1.5.5-1.5.5.7 1.3-1.4-.6-.4 1.4', className: 'd' }),
					_react2.default.createElement('path', { d: 'M415.3 218.2l-.5-1.4-1.3.7.6-1.4-1.3-.4 1.4-.5-.5-1.3 1.3.7.5-1.5.5 1.4 1.4-.7-.6 1.4 1.4.6-1.4.5.6 1.5-1.4-.7-.5 1.4', className: 'd' }),
					_react2.default.createElement('path', { d: 'M511 335l-.4-1.5-1.3.6.6-1.2-1.5-.5 1.4-.5-.7-1.4 1.3.6.5-1.4.6 1.4 1.4-.6-.6 1.4 1.4.5-1.4.5.6 1.3-1.4-.5-.5 1.4', className: 'd' }),
					_react2.default.createElement('path', { d: 'M509 428.8l-.7-1.4-1.3.7.6-1.3-1.4-.5 1.4-.5-.6-1.4 1.3.7.6-1.4.4 1.4 1.3-.7-.6 1.4 1.5.5-1.4.5.7 1.4-1.3-.6-.5 1.4', className: 'd' }),
					_react2.default.createElement('path', { d: 'M502.5 388.4l-.7-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .7 2 2-1-1 2 2 .7-2 .7 1 2-2-1-.7 2', className: 'd' }),
					_react2.default.createElement('path', { d: 'M511 479.3l-.6-2-2 1 1-2-2-.7 2-.7-1-2 2 1 .7-2 .8 2 2-1-1 2 2 .6-2 .7 1 2-2-1-.7 2', className: 'd' }),
					_react2.default.createElement('path', { d: 'M518.5 387l-.3-.6-.8.3.4-.7-.8-.3.8-.3-.4-.8.8.4.3-.8.2.8.8-.4-.4.8 1 .3-1 .3.5.7-.8-.3-.2.7', className: 'd' }),
					_react2.default.createElement('path', { d: 'M453.3 254l-.3-.7-.8.4.4-.8-.8-.3.8-.3-.4-.8.8.4.3-.8.3.8.7-.4-.3.8.8.3-.8.2.3.7-.7-.4-.3.8', className: 'd' }),
					_react2.default.createElement('path', { d: 'M498.6 400.7l-.3-.8-.8.3.4-.8-1-.3 1-.3-.5-.8.8.4.3-.8.2.8.8-.4-.4.7.8.2-.8.3.4.8-.8-.4-.2.7', className: 'd' }),
					_react2.default.createElement('path', { d: 'M484 215.5l-.3-.8-.8.4.3-.7-.8-.2.8-.2-.4-.8.7.4.3-.8.2.8.8-.4-.4.8.8.3-.8.3.4.8-.8-.3-.2.8', className: 'd' }),
					_react2.default.createElement('path', { d: 'M543.4 420.6l-.3-.8-.6.4.3-.8-.8-.3h.7l-.3-1 .7.4.4-.7.3.7.8-.3-.4 1h1l-1 .4.5.8-.8-.4-.3.8', className: 'd' }),
					_react2.default.createElement('path', { d: 'M493 326l-.3-.8-.8.4.3-.8-.8-.3.8-.3-.4-.7.7.3.3-.8.3.8.7-.3-.3.7.7.3-.7.3.3.8-.7-.4-.3.8', className: 'd' }),
					_react2.default.createElement('path', { d: 'M519.2 413.3l-.2-.5-.5.3.2-.4-.5-.2.5-.2-.2-.5.5.2.2-.6.2.5.5-.3-.4.5.5.2-.4.2.3.5-.6-.2-.2.5', className: 'd' }),
					_react2.default.createElement('path', { d: 'M498 348.2l-.2-.5-.5.2.2-.6-.5-.2.5-.2-.2-.5.5.3.2-.6.2.6.5-.3-.3.5.6.2-.6.2.3.5-.5-.3-.2.5', className: 'd' }),
					_react2.default.createElement('path', { d: 'M398 222.8l-.2-.6-.5.3.3-.6-.6-.2.6-.2-.3-.6.5.3.2-.6.2.6.6-.3-.3.6.6.2h-.5l.3.7-.6-.3-.2.6', className: 'd' }),
					_react2.default.createElement('path', { d: 'M489.4 355l-.2-.6-.6.2.3-.5h-.7l.6-.3-.4-.5.6.2.2-.5.2.4.5-.2-.2.5.6.2h-.6l.3.6-.4-.2-.2.5', className: 'd' })
				)
			),
			_react2.default.createElement(
				_reactRouterDom.NavLink,
				{ className: 'click-through-child', to: match.url + '/pressinggame' },
				_react2.default.createElement(
					'g',
					{ id: 'pressing-game' },
					_react2.default.createElement('path', { id: 'pressing-game-border', d: 'M227.5 202a9.6 9.6 0 0 0 4.3-7.5V71a9.6 9.6 0 0 0-4.3-7.5l-107-61.8a9.6 9.6 0 0 0-8.7 0L4.8 63.5A9.6 9.6 0 0 0 .5 71v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z', className: 'b' }),
					_react2.default.createElement('path', { d: 'M17.5 164.5l184 32.4', className: 'e' }),
					_react2.default.createElement('path', { d: 'M121 211.4L97.5 128', className: 'e' }),
					_react2.default.createElement('path', { d: 'M82.2 171l15.3-43', className: 'e' }),
					_react2.default.createElement('path', { d: 'M131 153l-33.5-25', className: 'e' }),
					_react2.default.createElement('path', { d: 'M50 147.6L97.4 128', className: 'e' }),
					_react2.default.createElement('path', { d: 'M70.6 95L50 147.6', className: 'e' }),
					_react2.default.createElement('path', { d: 'M82.2 171L70.6 95', className: 'e' }),
					_react2.default.createElement('path', { d: 'M74.2 74.4l115-12.8', className: 'e' }),
					_react2.default.createElement('path', { d: 'M201.6 197L189.3 61.5', className: 'e' }),
					_react2.default.createElement('path', { d: 'M97.5 128l91.8-66.4', className: 'e' }),
					_react2.default.createElement('path', { d: 'M74.2 74.4L97.5 128', className: 'e' }),
					_react2.default.createElement('circle', { cx: '17.5', cy: '164.5', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '82.2', cy: '170.9', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '97.5', cy: '127.9', r: '12.8', className: 'd' }),
					_react2.default.createElement('circle', { cx: '74.2', cy: '74.4', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '70.6', cy: '95', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '131.1', cy: '153', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '49.9', cy: '147.6', r: '12.8', className: 'd' }),
					_react2.default.createElement('circle', { cx: '121', cy: '211.4', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '189.3', cy: '61.6', r: '11.9', className: 'f' }),
					_react2.default.createElement('circle', { cx: '201.6', cy: '196.9', r: '11.9', className: 'f' })
				)
			),
			_react2.default.createElement(
				_reactRouterDom.NavLink,
				{ className: 'click-through-child', to: match.url + '/musicplayer' },
				_react2.default.createElement(
					'g',
					{ id: 'music-player' },
					_react2.default.createElement('path', { id: 'music-player-border', d: 'M703 201.8a9.6 9.6 0 0 0 4.3-7.5V70.8a9.6 9.6 0 0 0-4.3-7.5L596 1.5a9.6 9.6 0 0 0-8.7 0l-107 61.8a9.6 9.6 0 0 0-4.3 7.5v123.5a9.6 9.6 0 0 0 4.3 7.5l107 61.8a9.6 9.6 0 0 0 8.7 0z', className: 'b' }),
					_react2.default.createElement('circle', { cx: '588.1', cy: '134.8', r: '75.7', className: 'b' }),
					_react2.default.createElement('path', { d: 'M574.3 117.3H585v38.3h-10.7z', className: 'd' }),
					_react2.default.createElement('path', { d: 'M590.8 117.3h10.8v38.3h-10.8z', className: 'd' }),
					_react2.default.createElement('path', { d: 'M588.4 51.3A83.2 83.2 0 0 1 650.6 79l8.6-8.7a95.4 95.4 0 0 0-71-31.2v12.3z', className: 'd' }),
					_react2.default.createElement('circle', { cx: '588.1', cy: '134.8', r: '83.5', className: 'b' }),
					_react2.default.createElement('circle', { cx: '588.1', cy: '134.8', r: '95.7', className: 'b' })
				)
			),
			_react2.default.createElement(
				_reactRouterDom.NavLink,
				{ className: 'click-through-child', to: match.url + '/hmce' },
				_react2.default.createElement(
					'g',
					{ id: 'hcme' },
					_react2.default.createElement('path', { id: 'hcme-border', d: 'M465 201.8a9.6 9.6 0 0 0 4.5-7.5V70.8a9.6 9.6 0 0 0-4.4-7.5L358 1.5a9.6 9.6 0 0 0-8.5 0l-107 61.8a9.6 9.6 0 0 0-4.4 7.5v123.5a9.6 9.6 0 0 0 4.5 7.5l107 61.8a9.6 9.6 0 0 0 8.6 0z', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 53.4h159.4v159.4H274.2z', className: 'a' }),
					_react2.default.createElement('path', { d: 'M274.2 53.4h159.4v159.4H274.2z', className: 'b' }),
					_react2.default.createElement('path', { d: 'M315 94h78v78.2h-78z', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 212.8l40.7-40.6', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 53.4L315 94', className: 'b' }),
					_react2.default.createElement('path', { d: 'M433.6 53.4L393 94', className: 'b' }),
					_react2.default.createElement('path', { d: 'M393 172.2l40.6 40.6', className: 'b' }),
					_react2.default.createElement('path', { d: 'M309.6 88.8v89', className: 'g' }),
					_react2.default.createElement('path', { d: 'M304 83v101', className: 'g' }),
					_react2.default.createElement('path', { d: 'M297.2 76.4v113', className: 'g' }),
					_react2.default.createElement('path', { d: 'M290.4 69.5V197', className: 'g' }),
					_react2.default.createElement('path', { d: 'M281 60.3v146.2', className: 'g' }),
					_react2.default.createElement('path', { d: 'M309.6 177.8h89', className: 'g' }),
					_react2.default.createElement('path', { d: 'M304 184h100.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M297.2 189.3h113.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M290.4 197h128.4', className: 'g' }),
					_react2.default.createElement('path', { d: 'M281 206.5H427', className: 'g' }),
					_react2.default.createElement('path', { d: 'M398.5 177.8v-89', className: 'g' }),
					_react2.default.createElement('path', { d: 'M309.6 88.8h89', className: 'g' }),
					_react2.default.createElement('path', { d: 'M304 83h100.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M297.2 76.4h113.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M290.4 69.5H417', className: 'g' }),
					_react2.default.createElement('path', { d: 'M281 60.3H427', className: 'g' }),
					_react2.default.createElement('path', { d: 'M404.7 83v100', className: 'g' }),
					_react2.default.createElement('path', { d: 'M410.7 76.4v113', className: 'g' }),
					_react2.default.createElement('path', { d: 'M418.8 197V69.4', className: 'g' }),
					_react2.default.createElement('path', { d: 'M426.8 60.3v145', className: 'g' }),
					_react2.default.createElement('path', { d: 'M322 172.2l-32.8 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M329 172.2l-14 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M340.3 172.2l-5.7 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M385.2 172.2l33 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M378.5 172.2l14 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M367 172.2l5.8 40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M351 172.2v40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M322 93.7L289.3 53', className: 'g' }),
					_react2.default.createElement('path', { d: 'M329 93.7L315 53', className: 'g' }),
					_react2.default.createElement('path', { d: 'M340.3 93.7L334.6 53', className: 'g' }),
					_react2.default.createElement('path', { d: 'M385.2 93.7l33-40.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M378.5 93.7l14-40.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M367 93.7L373 53', className: 'g' }),
					_react2.default.createElement('path', { d: 'M351 93.7V53', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 165l40.7 32.8', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 158l40.7 14', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 146.7l40.7 5.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 101.8l40.7-33', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 108.5l40.7-14', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 120l40.7-5.8', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 136H434', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 165l-40.6 32.8', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 158l-40.6 14', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 146.7l-40.6 5.7', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 101.8l-40.6-33', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 108.5l-40.6-14', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 120l-40.6-5.8', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 136h-40.6', className: 'g' }),
					_react2.default.createElement('path', { d: 'M322 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M329 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M340.3 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M351 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M367 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M378.5 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M385.2 93.7v78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 101.8h78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 108.5h-78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 120H393', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 136h-78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 146.7h78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M393.3 158h-78.5', className: 'g' }),
					_react2.default.createElement('path', { d: 'M314.8 165H393', className: 'g' }),
					_react2.default.createElement('path', { d: 'M289.2 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M315 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M334.6 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M351 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M372.8 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M392.5 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M418.2 53v159.8', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 68.8H434', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 94.5h159.4', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 114.2h159.4', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 136H434', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 152.4H434', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 172h159.3', className: 'b' }),
					_react2.default.createElement('path', { d: 'M274.2 197.8H434', className: 'b' })
				)
			)
		)
	);
};

var Work = function (_React$Component) {
	_inherits(Work, _React$Component);

	function Work(props) {
		_classCallCheck(this, Work);

		return _possibleConstructorReturn(this, (Work.__proto__ || Object.getPrototypeOf(Work)).call(this, props));
	}

	_createClass(Work, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onUnSwipeable();
		}
	}, {
		key: 'renderWork',
		value: function renderWork(props) {
			return _react2.default.createElement(_WorkContent2.default, { location: props.location, workId: props.match.params.workId });
		}
	}, {
		key: 'renderSvg',
		value: function renderSvg(props) {
			return _react2.default.createElement(
				_reactTransitionGroup.CSSTransitionGroup,
				{ component: 'span', transitionAppear: true, transitionAppearTimeout: 300, transitionName: 'slide-up', transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
				_react2.default.createElement(
					'div',
					{ key: location.key, className: 'row work-page' },
					_react2.default.createElement(SVG, props)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(_reactRouterDom.Route, { render: function render(_ref2) {
					var location = _ref2.location,
					    history = _ref2.history,
					    match = _ref2.match;

					return _react2.default.createElement(
						_reactRouterDom.Switch,
						null,
						_react2.default.createElement(_reactRouterDom.Route, { path: match.url + '/:workId', component: _this2.renderWork }),
						_react2.default.createElement(_reactRouterDom.Route, { path: match.url, component: _this2.renderSvg.bind(_this2) })
					);
				} });
		}
	}]);

	return Work;
}(_react2.default.Component);

exports.default = Work;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactImageGallery = __webpack_require__(115);

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _nodeUuid = __webpack_require__(39);

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _ContentApi = __webpack_require__(210);

var _ContentApi2 = _interopRequireDefault(_ContentApi);

var _WorkControls = __webpack_require__(121);

var _WorkControls2 = _interopRequireDefault(_WorkControls);

var _reactTransitionGroup = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchAnimation = function SwitchAnimation(_ref) {
	var children = _ref.children,
	    location = _ref.location,
	    beenHere = _ref.beenHere;

	var cssTransitionProps = beenHere ? {
		transitionName: 'example',
		transitionEnter: false,
		transitionLeave: false
	} : {
		transitionName: 'slide-up',
		transitionAppear: true,
		transitionAppearTimeout: 300,
		transitionEnterTimeout: 300,
		transitionLeaveTimeout: 300
	};

	return _react2.default.createElement(
		_reactTransitionGroup.CSSTransitionGroup,
		cssTransitionProps,
		children
	);
};

var WorkContent = function (_React$Component) {
	_inherits(WorkContent, _React$Component);

	function WorkContent(props) {
		_classCallCheck(this, WorkContent);

		var _this = _possibleConstructorReturn(this, (WorkContent.__proto__ || Object.getPrototypeOf(WorkContent)).call(this, props));

		_this.state = _extends({}, _ContentApi2.default.getEverything(props.workId), {
			currentPage: _this.props.workId,
			alreadyBeenHere: false,
			direction: 'example'
		});
		return _this;
	}

	_createClass(WorkContent, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(a, b) {
			if (this.props.location.pathname !== a.location.pathname) {
				this.setState(_extends({}, _ContentApi2.default.getEverything(a.workId), {
					currentPage: a.workId,
					alreadyBeenHere: true
				}));
			}
		}
	}, {
		key: 'renderImgs',
		value: function renderImgs() {
			var arr = this.state.images;
			return arr.map(function (filename, index) {
				return { original: '/assets/' + filename + '.png', sizes: '507x900' };
			});
		}
	}, {
		key: 'renderRightNav',
		value: function renderRightNav(onClick, disabled) {
			return _react2.default.createElement('button', { className: 'image-gallery-right-nav hvr-forward', disabled: disabled, onClick: onClick });
		}
	}, {
		key: 'renderLeftNav',
		value: function renderLeftNav(onClick, disabled) {

			return _react2.default.createElement('button', { className: 'image-gallery-left-nav hvr-backward', disabled: disabled, onClick: onClick });
		}
	}, {
		key: 'nextOrPrev',
		value: function nextOrPrev(dir) {
			this.setState(_extends({}, this.state, {
				direction: dir
			}));
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(a) {
			return this.props.location.pathname !== a.location.pathname;
		}
	}, {
		key: 'renderGallery',
		value: function renderGallery(beenHere, settings, dir) {

			return !beenHere ? _react2.default.createElement(
				'div',
				{ className: 'row image-gallery-container' },
				_react2.default.createElement(
					'div',
					{ className: 'col-sm-12 col-md-8 col-md-offset-2' },
					_react2.default.createElement(_reactImageGallery2.default, settings)
				)
			) : _react2.default.createElement(
				_reactTransitionGroup.CSSTransitionGroup,
				{ transitionName: dir, transitionAppear: true, transitionAppearTimeout: 300, transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
				_react2.default.createElement(
					'div',
					{ key: (0, _nodeUuid2.default)('key'), className: 'row image-gallery-container' },
					_react2.default.createElement(
						'div',
						{ className: 'col-sm-12 col-md-8 col-md-offset-2' },
						_react2.default.createElement(_reactImageGallery2.default, settings)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {

			var settings = {
				showThumbnails: true,
				items: this.renderImgs(),
				slideInterval: 2000,
				renderLeftNav: this.renderLeftNav,
				renderRightNav: this.renderRightNav
			};

			return _react2.default.createElement(
				SwitchAnimation,
				_extends({}, this.props, { beenHere: this.state.alreadyBeenHere }),
				_react2.default.createElement(
					'div',
					{ key: this.props.location.key, className: 'col-sm-12 work-content-page' },
					_react2.default.createElement(
						'div',
						{ className: 'row page-title' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-12' },
							_react2.default.createElement(
								'h2',
								null,
								this.state.title
							),
							_react2.default.createElement(
								'p',
								{ className: 'title-divider' },
								'\u25A0 \u25A0 \u25A0 \u25A0'
							)
						)
					),
					this.renderGallery(this.state.alreadyBeenHere, settings, this.state.direction),
					_react2.default.createElement(
						'div',
						{ className: 'row project-descriptor responsive-padding' },
						_react2.default.createElement(
							'div',
							{ className: 'col-sm-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4' },
							_react2.default.createElement(
								'p',
								null,
								this.state.description
							)
						)
					),
					_react2.default.createElement(_WorkControls2.default, { onNextOrPrev: this.nextOrPrev.bind(this), currentPage: this.state.currentPage })
				)
			);
		}
	}]);

	return WorkContent;
}(_react2.default.Component);

exports.default = WorkContent;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(40);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(197);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//application scss
__webpack_require__(201);

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CSSTransitionGroup = __webpack_require__(420);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _TransitionGroup = __webpack_require__(182);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  TransitionGroup: _TransitionGroup2.default,
  CSSTransitionGroup: _CSSTransitionGroup2.default
};

/***/ }),

/***/ 241:
/***/ (function(module, exports) {


module.exports = function chain(){
  var len = arguments.length
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i]

  args = args.filter(function(fn){ return fn != null })

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
}


/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventOptionsKey = __webpack_require__(245);

var _eventOptionsKey2 = _interopRequireDefault(_eventOptionsKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TargetEventHandlers = function () {
  function TargetEventHandlers(target) {
    _classCallCheck(this, TargetEventHandlers);

    this.target = target;
    this.events = {};
  }

  _createClass(TargetEventHandlers, [{
    key: 'getEventHandlers',
    value: function () {
      function getEventHandlers(eventName, options) {
        var key = String(eventName) + ' ' + String((0, _eventOptionsKey2['default'])(options));

        if (!this.events[key]) {
          this.events[key] = {
            handlers: [],
            handleEvent: undefined
          };
        }

        return this.events[key];
      }

      return getEventHandlers;
    }()
  }, {
    key: 'handleEvent',
    value: function () {
      function handleEvent(eventName, options, event) {
        var _getEventHandlers = this.getEventHandlers(eventName, options),
            handlers = _getEventHandlers.handlers;

        handlers.forEach(function (handler) {
          if (handler) {
            // We need to check for presence here because a handler function may
            // cause later handlers to get removed. This can happen if you for
            // instance have a waypoint that unmounts another waypoint as part of an
            // onEnter/onLeave handler.
            handler(event);
          }
        });
      }

      return handleEvent;
    }()
  }, {
    key: 'add',
    value: function () {
      function add(eventName, listener, options) {
        var _this = this;

        // options has already been normalized at this point.
        var eventHandlers = this.getEventHandlers(eventName, options);

        if (eventHandlers.handlers.length === 0) {
          eventHandlers.handleEvent = this.handleEvent.bind(this, eventName, options);

          this.target.addEventListener(eventName, eventHandlers.handleEvent, options);
        }

        eventHandlers.handlers.push(listener);

        var isSubscribed = true;
        var unsubscribe = function () {
          function unsubscribe() {
            if (!isSubscribed) {
              return;
            }

            isSubscribed = false;

            var index = eventHandlers.handlers.indexOf(listener);
            eventHandlers.handlers.splice(index, 1);

            if (eventHandlers.handlers.length === 0) {
              // All event handlers have been removed, so we want to remove the event
              // listener from the target node.

              if (_this.target) {
                // There can be a race condition where the target may no longer exist
                // when this function is called, e.g. when a React component is
                // unmounting. Guarding against this prevents the following error:
                //
                //   Cannot read property 'removeEventListener' of undefined
                _this.target.removeEventListener(eventName, eventHandlers.handleEvent, options);
              }

              eventHandlers.handleEvent = undefined;
            }
          }

          return unsubscribe;
        }();
        return unsubscribe;
      }

      return add;
    }()
  }]);

  return TargetEventHandlers;
}();

exports['default'] = TargetEventHandlers;

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CAN_USE_DOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports['default'] = CAN_USE_DOM;

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = canUsePassiveEventListeners;

var _canUseDOM = __webpack_require__(243);

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Adapted from Modernizr
// https://github.com/Modernizr/Modernizr/blob/5eea7e2a/feature-detects/dom/passiveeventlisteners.js#L26-L35
function testPassiveEventListeners() {
  if (!_canUseDOM2['default']) {
    return false;
  }

  if (!window.addEventListener || !window.removeEventListener || !Object.defineProperty) {
    return false;
  }

  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function () {
        function get() {
          supportsPassiveOption = true;
        }

        return get;
      }()
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    // do nothing
  }

  return supportsPassiveOption;
}

var memoized = void 0;

function canUsePassiveEventListeners() {
  if (memoized === undefined) {
    memoized = testPassiveEventListeners();
  }
  return memoized;
}

/***/ }),

/***/ 245:
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = eventOptionsKey;
/* eslint-disable no-bitwise */

/**
 * Generate a unique key for any set of event options
 */
function eventOptionsKey(normalizedEventOptions) {
  if (!normalizedEventOptions) {
    return 0;
  }

  // If the browser does not support passive event listeners, the normalized
  // event options will be a boolean.
  if (normalizedEventOptions === true) {
    return 100;
  }

  // At this point, the browser supports passive event listeners, so we expect
  // the event options to be an object with possible properties of capture,
  // passive, and once.
  //
  // We want to consistently return the same value, regardless of the order of
  // these properties, so let's use binary maths to assign each property to a
  // bit, and then add those together (with an offset to account for the
  // booleans at the beginning of this function).
  var capture = normalizedEventOptions.capture << 0;
  var passive = normalizedEventOptions.passive << 1;
  var once = normalizedEventOptions.once << 2;
  return capture + passive + once;
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_HANDLERS_KEY = undefined;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;

var _normalizeEventOptions = __webpack_require__(247);

var _normalizeEventOptions2 = _interopRequireDefault(_normalizeEventOptions);

var _TargetEventHandlers = __webpack_require__(242);

var _TargetEventHandlers2 = _interopRequireDefault(_TargetEventHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Export to make testing possible.
var EVENT_HANDLERS_KEY = exports.EVENT_HANDLERS_KEY = '__consolidated_events_handlers__';

function addEventListener(target, eventName, listener, options) {
  if (!target[EVENT_HANDLERS_KEY]) {
    // eslint-disable-next-line no-param-reassign
    target[EVENT_HANDLERS_KEY] = new _TargetEventHandlers2['default'](target);
  }
  var normalizedEventOptions = (0, _normalizeEventOptions2['default'])(options);
  return target[EVENT_HANDLERS_KEY].add(eventName, listener, normalizedEventOptions);
}

// Deprecated
function removeEventListener(unsubscribeFn) {
  unsubscribeFn();
}

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = normalizeEventOptions;

var _canUsePassiveEventListeners = __webpack_require__(244);

var _canUsePassiveEventListeners2 = _interopRequireDefault(_canUsePassiveEventListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalizeEventOptions(eventOptions) {
  if (!eventOptions) {
    return undefined;
  }

  if (!(0, _canUsePassiveEventListeners2['default'])()) {
    // If the browser does not support the passive option, then it is expecting
    // a boolean for the options argument to specify whether it should use
    // capture or not. In more modern browsers, this is passed via the `capture`
    // option, so let's just hoist that value up.
    return !!eventOptions.capture;
  }

  return eventOptions;
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(135)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n@font-face {\n  font-family: 'lekton_bold';\n  src: url(\"/fonts/Lekton-Bold.ttf\") format(\"truetype\"); }\n\n@font-face {\n  font-family: 'lekton_italic';\n  src: url(\"/fonts/Lekton-Italic.ttf\") format(\"truetype\"); }\n\n@font-face {\n  font-family: 'lekton_regular';\n  src: url(\"/fonts/Lekton-Regular.ttf\") format(\"truetype\"); }\n\n/* == COLORS == */\n/* == MEDIA BREAKPOINTS == */\n/* == IMAGE GALLERY SIZING == */\n@font-face {\n  font-family: 'lekton_bold';\n  src: url(\"/fonts/Lekton-Bold.ttf\") format(\"truetype\"); }\n\n@font-face {\n  font-family: 'lekton_italic';\n  src: url(\"/fonts/Lekton-Italic.ttf\") format(\"truetype\"); }\n\n@font-face {\n  font-family: 'lekton_regular';\n  src: url(\"/fonts/Lekton-Regular.ttf\") format(\"truetype\"); }\n\n/* == COLORS == */\n/* == MEDIA BREAKPOINTS == */\n/* == IMAGE GALLERY SIZING == */\n/*\n  Flavor name: Default (mini-default)\n  Author: Angelos Chalaris (chalarangelo@gmail.com)\n  Maintainers: Angelos Chalaris\n  mini.css version: v2.3.1\n*/\n/*\n  Browsers resets and base typography.\n*/\nhtml {\n  font-size: 14px; }\n\n@media screen and (min-width: 1600px) {\n  html {\n    font-size: 18px; } }\n\nhtml {\n  font-family: lekton_regular,-apple-system, BlinkMacSystemFont,\"Segoe UI\",\"Roboto\", \"Droid Sans\",\"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1rem;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0;\n  color: #FFF;\n  background: #030E19; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nmain,\nmenu,\nsection {\n  display: block; }\n\nsummary {\n  display: list-item; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline; }\n\naudio,\nvideo {\n  display: inline-block; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\ninput {\n  overflow: visible; }\n\nimg {\n  max-width: 100%;\n  height: auto; }\n\ndfn {\n  font-style: italic; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  line-height: 1.2em;\n  margin: 0.75rem 0.5rem;\n  font-weight: 500; }\n\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small {\n  color: #E6F99D;\n  display: block;\n  margin-top: -0.25rem; }\n\nh1 {\n  font-size: 2rem; }\n\nh2 {\n  font-size: 1.6875rem; }\n\nh3 {\n  font-size: 1.4375rem; }\n\nh4 {\n  font-size: 1.1875rem; }\n\nh5 {\n  font-size: 1rem; }\n\nh6 {\n  font-size: 0.8125rem; }\n\np {\n  margin: 0.5rem; }\n\nol,\nul {\n  margin: 0.5rem;\n  padding-left: 1rem; }\n\nb,\nstrong {\n  font-weight: 700; }\n\nhr {\n  box-sizing: content-box;\n  border: 0;\n  overflow: visible;\n  line-height: 1.25em;\n  margin: 0.5rem;\n  height: 0.0625rem;\n  background: linear-gradient(to right, #7FDA89, #C8E98E, #E6F99D); }\n\nblockquote {\n  display: block;\n  position: relative;\n  font-style: italic;\n  background: transparent;\n  margin: 0.5rem;\n  padding: 0.5rem 0.5rem 1.5rem;\n  border-left: 0.25rem solid transparent;\n  border-radius: 0 0.125rem 0.125rem 0; }\n\nblockquote:after {\n  position: absolute;\n  font-style: normal;\n  font-size: 0.875rem;\n  color: #E0E0E0;\n  left: 0.625rem;\n  bottom: 0;\n  content: \"\\2014\\2009\" attr(cite); }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; }\n\ncode {\n  border-radius: 0.125rem;\n  background: #e6e6e6;\n  padding: 0.125rem 0.25rem; }\n\npre {\n  overflow: auto;\n  border-radius: 0 0.125rem 0.125rem 0;\n  background: #e6e6e6;\n  padding: 0.75rem;\n  margin: 0.5rem;\n  border-left: 0.25rem solid transparent; }\n\nkbd {\n  border-radius: 0.125rem;\n  background: #041122;\n  padding: 0.125rem 0.25rem; }\n\nsmall,\nsub,\nsup {\n  font-size: 0.75em; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nsub,\nsup {\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\na {\n  color: #FFF;\n  text-decoration: none; }\n\na:visited {\n  color: #FFF; }\n\na:focus, a:hover {\n  color: #E6F99D; }\n\n/*\r\n  Definitions for the grid system.\r\n*/\n.container {\n  margin: 0 auto;\n  padding: 0 0.75rem; }\n\n.row {\n  box-sizing: border-box;\n  display: -webkit-box;\n  -webkit-box-flex: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex: 0 1 auto;\n  flex: 0 1 auto;\n  -webkit-flex-flow: row wrap;\n  flex-flow: row wrap; }\n\n.col-sm,\n[class^='col-sm-'],\n[class^='col-sm-offset-'],\n.row[class*='cols-sm-'] > * {\n  box-sizing: border-box;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n  flex: 0 0 auto;\n  padding: 0 0.25rem; }\n\n.col-sm,\n.row.cols-sm > * {\n  -webkit-box-flex: 1;\n  max-width: 100%;\n  -webkit-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-basis: 0;\n  flex-basis: 0; }\n\n.col-sm-1,\n.row.cols-sm-1 > * {\n  max-width: 8.33333%;\n  -webkit-flex-basis: 8.33333%;\n  flex-basis: 8.33333%; }\n\n.col-sm-2,\n.row.cols-sm-2 > * {\n  max-width: 16.66667%;\n  -webkit-flex-basis: 16.66667%;\n  flex-basis: 16.66667%; }\n\n.col-sm-3,\n.row.cols-sm-3 > * {\n  max-width: 25%;\n  -webkit-flex-basis: 25%;\n  flex-basis: 25%; }\n\n.col-sm-4,\n.row.cols-sm-4 > * {\n  max-width: 33.33333%;\n  -webkit-flex-basis: 33.33333%;\n  flex-basis: 33.33333%; }\n\n.col-sm-5,\n.row.cols-sm-5 > * {\n  max-width: 41.66667%;\n  -webkit-flex-basis: 41.66667%;\n  flex-basis: 41.66667%; }\n\n.col-sm-6,\n.row.cols-sm-6 > * {\n  max-width: 50%;\n  -webkit-flex-basis: 50%;\n  flex-basis: 50%; }\n\n.col-sm-7,\n.row.cols-sm-7 > * {\n  max-width: 58.33333%;\n  -webkit-flex-basis: 58.33333%;\n  flex-basis: 58.33333%; }\n\n.col-sm-8,\n.row.cols-sm-8 > * {\n  max-width: 66.66667%;\n  -webkit-flex-basis: 66.66667%;\n  flex-basis: 66.66667%; }\n\n.col-sm-9,\n.row.cols-sm-9 > * {\n  max-width: 75%;\n  -webkit-flex-basis: 75%;\n  flex-basis: 75%; }\n\n.col-sm-10,\n.row.cols-sm-10 > * {\n  max-width: 83.33333%;\n  -webkit-flex-basis: 83.33333%;\n  flex-basis: 83.33333%; }\n\n.col-sm-11,\n.row.cols-sm-11 > * {\n  max-width: 91.66667%;\n  -webkit-flex-basis: 91.66667%;\n  flex-basis: 91.66667%; }\n\n.col-sm-12,\n.row.cols-sm-12 > * {\n  max-width: 100%;\n  -webkit-flex-basis: 100%;\n  flex-basis: 100%; }\n\n.col-sm-offset-0 {\n  margin-left: 0; }\n\n.col-sm-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-sm-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-sm-offset-3 {\n  margin-left: 25%; }\n\n.col-sm-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-sm-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-sm-offset-6 {\n  margin-left: 50%; }\n\n.col-sm-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-sm-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-sm-offset-9 {\n  margin-left: 75%; }\n\n.col-sm-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-sm-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-sm-normal {\n  -webkit-order: initial;\n  order: initial; }\n\n.col-sm-first {\n  -webkit-order: -999;\n  order: -999; }\n\n.col-sm-last {\n  -webkit-order: 999;\n  order: 999; }\n\n@media screen and (min-width: 768px) {\n  .col-md,\n  [class^='col-md-'],\n  [class^='col-md-offset-'], .row[class*='cols-md-'] > * {\n    box-sizing: border-box;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    flex: 0 0 auto;\n    padding: 0 0.25rem; }\n  .col-md,\n  .row.cols-md > * {\n    -webkit-box-flex: 1;\n    max-width: 100%;\n    -webkit-flex-grow: 1;\n    flex-grow: 1;\n    -webkit-flex-basis: 0;\n    flex-basis: 0; }\n  .col-md-1,\n  .row.cols-md-1 > * {\n    max-width: 8.33333%;\n    -webkit-flex-basis: 8.33333%;\n    flex-basis: 8.33333%; }\n  .col-md-2,\n  .row.cols-md-2 > * {\n    max-width: 16.66667%;\n    -webkit-flex-basis: 16.66667%;\n    flex-basis: 16.66667%; }\n  .col-md-3,\n  .row.cols-md-3 > * {\n    max-width: 25%;\n    -webkit-flex-basis: 25%;\n    flex-basis: 25%; }\n  .col-md-4,\n  .row.cols-md-4 > * {\n    max-width: 33.33333%;\n    -webkit-flex-basis: 33.33333%;\n    flex-basis: 33.33333%; }\n  .col-md-5,\n  .row.cols-md-5 > * {\n    max-width: 41.66667%;\n    -webkit-flex-basis: 41.66667%;\n    flex-basis: 41.66667%; }\n  .col-md-6,\n  .row.cols-md-6 > * {\n    max-width: 50%;\n    -webkit-flex-basis: 50%;\n    flex-basis: 50%; }\n  .col-md-7,\n  .row.cols-md-7 > * {\n    max-width: 58.33333%;\n    -webkit-flex-basis: 58.33333%;\n    flex-basis: 58.33333%; }\n  .col-md-8,\n  .row.cols-md-8 > * {\n    max-width: 66.66667%;\n    -webkit-flex-basis: 66.66667%;\n    flex-basis: 66.66667%; }\n  .col-md-9,\n  .row.cols-md-9 > * {\n    max-width: 75%;\n    -webkit-flex-basis: 75%;\n    flex-basis: 75%; }\n  .col-md-10,\n  .row.cols-md-10 > * {\n    max-width: 83.33333%;\n    -webkit-flex-basis: 83.33333%;\n    flex-basis: 83.33333%; }\n  .col-md-11,\n  .row.cols-md-11 > * {\n    max-width: 91.66667%;\n    -webkit-flex-basis: 91.66667%;\n    flex-basis: 91.66667%; }\n  .col-md-12,\n  .row.cols-md-12 > * {\n    max-width: 100%;\n    -webkit-flex-basis: 100%;\n    flex-basis: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-normal {\n    -webkit-order: initial;\n    order: initial; }\n  .col-md-first {\n    -webkit-order: -999;\n    order: -999; }\n  .col-md-last {\n    -webkit-order: 999;\n    order: 999; } }\n\n@media screen and (min-width: 1280px) {\n  .col-lg,\n  [class^='col-lg-'],\n  [class^='col-lg-offset-'],\n  .row[class*='cols-lg-'] > * {\n    box-sizing: border-box;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n    flex: 0 0 auto;\n    padding: 0 0.25rem; }\n  .col-lg,\n  .row.cols-lg > * {\n    -webkit-box-flex: 1;\n    max-width: 100%;\n    -webkit-flex-grow: 1;\n    flex-grow: 1;\n    -webkit-flex-basis: 0;\n    flex-basis: 0; }\n  .col-lg-1,\n  .row.cols-lg-1 > * {\n    max-width: 8.33333%;\n    -webkit-flex-basis: 8.33333%;\n    flex-basis: 8.33333%; }\n  .col-lg-2,\n  .row.cols-lg-2 > * {\n    max-width: 16.66667%;\n    -webkit-flex-basis: 16.66667%;\n    flex-basis: 16.66667%; }\n  .col-lg-3,\n  .row.cols-lg-3 > * {\n    max-width: 25%;\n    -webkit-flex-basis: 25%;\n    flex-basis: 25%; }\n  .col-lg-4,\n  .row.cols-lg-4 > * {\n    max-width: 33.33333%;\n    -webkit-flex-basis: 33.33333%;\n    flex-basis: 33.33333%; }\n  .col-lg-5,\n  .row.cols-lg-5 > * {\n    max-width: 41.66667%;\n    -webkit-flex-basis: 41.66667%;\n    flex-basis: 41.66667%; }\n  .col-lg-6,\n  .row.cols-lg-6 > * {\n    max-width: 50%;\n    -webkit-flex-basis: 50%;\n    flex-basis: 50%; }\n  .col-lg-7,\n  .row.cols-lg-7 > * {\n    max-width: 58.33333%;\n    -webkit-flex-basis: 58.33333%;\n    flex-basis: 58.33333%; }\n  .col-lg-8,\n  .row.cols-lg-8 > * {\n    max-width: 66.66667%;\n    -webkit-flex-basis: 66.66667%;\n    flex-basis: 66.66667%; }\n  .col-lg-9,\n  .row.cols-lg-9 > * {\n    max-width: 75%;\n    -webkit-flex-basis: 75%;\n    flex-basis: 75%; }\n  .col-lg-10,\n  .row.cols-lg-10 > * {\n    max-width: 83.33333%;\n    -webkit-flex-basis: 83.33333%;\n    flex-basis: 83.33333%; }\n  .col-lg-11,\n  .row.cols-lg-11 > * {\n    max-width: 91.66667%;\n    -webkit-flex-basis: 91.66667%;\n    flex-basis: 91.66667%; }\n  .col-lg-12,\n  .row.cols-lg-12 > * {\n    max-width: 100%;\n    -webkit-flex-basis: 100%;\n    flex-basis: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-normal {\n    -webkit-order: initial;\n    order: initial; }\n  .col-lg-first {\n    -webkit-order: -999;\n    order: -999; }\n  .col-lg-last {\n    -webkit-order: 999;\n    order: 999; } }\n\n/*\r\n  Definitions for forms and input elements.\r\n*/\nform {\n  background: transparent;\n  border: 0.0625rem solid #C8E98E;\n  margin: 0.5rem;\n  padding: 0.75rem 0.5rem 1.125rem; }\n\nfieldset {\n  border: 0.0625rem solid #d0d0d0;\n  border-radius: 0.125rem;\n  margin: 0.125rem;\n  padding: 0.5rem; }\n\nlegend {\n  box-sizing: border-box;\n  display: table;\n  max-width: 100%;\n  white-space: normal;\n  font-weight: 700;\n  font-size: 0.875rem;\n  padding: 0.125rem 0.25rem; }\n\nlabel {\n  padding: 0.25rem 0.5rem; }\n\n.input-group {\n  display: inline-block; }\n\n.input-group.fluid {\n  display: -webkit-box;\n  -webkit-box-pack: justify;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-justify-content: center;\n  justify-content: center; }\n\n.input-group.fluid > input {\n  -webkit-box-flex: 1;\n  max-width: 100%;\n  -webkit-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-basis: 0px;\n  flex-basis: 0px; }\n\n@media screen and (max-width: 767px) {\n  .input-group.fluid {\n    -webkit-box-orient: vertical;\n    -webkit-align-items: stretch;\n    align-items: stretch;\n    -webkit-flex-direction: column;\n    flex-direction: column; } }\n\n.input-group.vertical {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-box-pack: justify;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  -webkit-justify-content: center;\n  justify-content: center; }\n\n.input-group.vertical > input {\n  -webkit-box-flex: 1;\n  max-width: 100%;\n  -webkit-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-basis: 0px;\n  flex-basis: 0px; }\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\ninput:not([type]), [type=\"text\"], [type=\"email\"], [type=\"number\"], [type=\"search\"],\n[type=\"password\"], [type=\"url\"], [type=\"tel\"], textarea, select {\n  box-sizing: border-box;\n  background: #fafafa;\n  color: #FFF;\n  border: 0.0625rem solid #c9c9c9;\n  border-radius: 0.125rem;\n  margin: 0.25rem;\n  padding: 0.5rem 0.75rem; }\n\ninput:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):hover, input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):focus, textarea:hover, textarea:focus, select:hover, select:focus {\n  border-color: #259073;\n  box-shadow: none; }\n\ninput:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):invalid, input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):focus:invalid, textarea:invalid, textarea:focus:invalid, select:invalid, select:focus:invalid {\n  border-color: #E0E0E0;\n  box-shadow: none; }\n\ninput:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"])[readonly], textarea[readonly], select[readonly] {\n  background: #e5e5e5;\n  border-color: #c9c9c9; }\n\nselect {\n  padding-right: 1.5rem;\n  background-image: url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1.5\"><path fill=\"%23FFF\" d=\"M.25.75h.5L.5 1\"/></svg>'), url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" style=\"background:%23fafafa\"/>');\n  background-position: right, left;\n  background-repeat: no-repeat, repeat;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  appearance: none; }\n\nselect[readonly] {\n  background-image: url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1.5\"><path fill=\"%23FFF\" d=\"M.25.75h.5L.5 1\"/></svg>'), url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" style=\"background:%23e5e5e5\"/>'); }\n\n::-webkit-input-placeholder {\n  opacity: 1;\n  color: #616161; }\n\n::-moz-placeholder {\n  opacity: 1;\n  color: #616161; }\n\n::-ms-placeholder {\n  opacity: 1;\n  color: #616161; }\n\n::placeholder {\n  opacity: 1;\n  color: #616161; }\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton, html [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton {\n  overflow: visible;\n  text-transform: none; }\n\nbutton, [type=\"button\"], [type=\"submit\"], [type=\"reset\"],\na.button, label.button, .button,\na[role=\"button\"], label[role=\"button\"], [role=\"button\"] {\n  display: inline-block;\n  background: transparent;\n  color: transparent;\n  border: 0;\n  border-radius: 0.125rem;\n  padding: 0.5rem 0.75rem;\n  margin: 0.5rem;\n  transition: background 0.3s;\n  cursor: pointer; }\n\nbutton:hover, button:focus, [type=\"button\"]:hover, [type=\"button\"]:focus, [type=\"submit\"]:hover, [type=\"submit\"]:focus, [type=\"reset\"]:hover, [type=\"reset\"]:focus,\na.button:hover,\na.button:focus, label.button:hover, label.button:focus, .button:hover, .button:focus,\na[role=\"button\"]:hover,\na[role=\"button\"]:focus, label[role=\"button\"]:hover, label[role=\"button\"]:focus, [role=\"button\"]:hover, [role=\"button\"]:focus {\n  background: transparent; }\n\ninput:disabled, input[disabled], textarea:disabled, textarea[disabled], select:disabled, select[disabled], button:disabled, button[disabled], .button:disabled, .button[disabled], [role=\"button\"]:disabled, [role=\"button\"][disabled] {\n  cursor: not-allowed;\n  opacity: 0.75; }\n\ninput[type=\"file\"] {\n  border: 0;\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  clip: rect(0 0 0 0);\n  -webkit-clip-path: inset(100%);\n  clip-path: inset(100%); }\n\n.button-group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  border: 0.0625rem solid #bdbdbd;\n  border-radius: 0.125rem;\n  margin: 0.5rem; }\n\n.button-group > button, .button-group [type=\"button\"], .button-group > [type=\"submit\"], .button-group > [type=\"reset\"],\n.button-group > .button, .button-group > [role=\"button\"] {\n  margin: 0;\n  -webkit-box-flex: 1;\n  max-width: 100%;\n  -webkit-flex: 1 1 auto;\n  flex: 1 1 auto;\n  text-align: center;\n  border: 0;\n  border-radius: 0; }\n\n.button-group > :not(:first-child) {\n  border-left: 0.0625rem solid #bdbdbd; }\n\n@media screen and (max-width: 767px) {\n  .button-group {\n    -webkit-box-orient: vertical;\n    -webkit-flex-direction: column;\n    flex-direction: column; }\n  .button-group > :not(:first-child) {\n    border: 0;\n    border-top: 0.0625rem solid #bdbdbd; } }\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  height: 1px;\n  width: 1px;\n  margin: -1px;\n  overflow: hidden;\n  position: absolute;\n  clip: rect(0 0 0 0);\n  -webkit-clip-path: inset(100%);\n  clip-path: inset(100%); }\n\n.input-group [type=\"checkbox\"] + label, .input-group [type=\"radio\"] + label {\n  position: relative;\n  margin-left: 1.25rem;\n  cursor: pointer; }\n\n.input-group [type=\"checkbox\"] + label:before, .input-group [type=\"radio\"] + label:before {\n  display: inline-block;\n  position: absolute;\n  bottom: 0.375rem;\n  left: 0;\n  width: 1rem;\n  height: 1rem;\n  content: '';\n  border: 0.0625rem solid #bdbdbd;\n  border-radius: 0.125rem;\n  background: #fafafa;\n  color: #FFF;\n  margin-left: -1.25rem; }\n\n.input-group [type=\"checkbox\"] + label:hover:before, .input-group [type=\"checkbox\"] + label:focus:before, .input-group [type=\"radio\"] + label:hover:before, .input-group [type=\"radio\"] + label:focus:before {\n  border-color: #259073; }\n\n.input-group [type=\"checkbox\"]:focus + label:before, .input-group [type=\"radio\"]:focus + label:before {\n  border-color: #259073; }\n\n.input-group [type=\"radio\"] + label:before, .input-group [type=\"radio\"] + label:after {\n  border-radius: 50%; }\n\n.input-group [type=\"checkbox\"][disabled] + label, .input-group [type=\"radio\"][disabled] + label,\n.input-group [type=\"checkbox\"]:disabled + label, .input-group [type=\"radio\"]:disabled + label {\n  cursor: not-allowed; }\n\n.input-group [type=\"checkbox\"][disabled] + label:before, .input-group [type=\"checkbox\"][disabled] + label:after, .input-group [type=\"radio\"][disabled] + label:before, .input-group [type=\"radio\"][disabled] + label:after,\n.input-group [type=\"checkbox\"]:disabled + label:before,\n.input-group [type=\"checkbox\"]:disabled + label:after, .input-group [type=\"radio\"]:disabled + label:before, .input-group [type=\"radio\"]:disabled + label:after {\n  opacity: 0.75; }\n\n.input-group [type=\"checkbox\"]:checked + label:after, .input-group [type=\"radio\"]:checked + label:after {\n  position: absolute;\n  background: #FFF;\n  content: '';\n  margin-left: -1.25rem;\n  bottom: 0.625rem;\n  left: 0.25rem;\n  width: 0.625rem;\n  height: 0.625rem; }\n\n.input-group [type=\"checkbox\"] + label.switch:before, .input-group [type=\"radio\"] + label.switch:before {\n  bottom: 0.5rem;\n  width: 1.75rem;\n  height: 0.875rem;\n  border: 0;\n  border-radius: 0.5rem;\n  background: #c9c9c9;\n  margin-left: -2.375rem; }\n\n.input-group [type=\"checkbox\"] + label.switch:after, .input-group [type=\"radio\"] + label.switch:after {\n  display: inline-block;\n  content: '';\n  position: absolute;\n  left: 0;\n  width: 1.25rem;\n  height: 1.25rem;\n  background: #e0e0e0;\n  border-radius: 100%;\n  bottom: 0.3125rem;\n  margin-left: -3rem;\n  transition: left 0.3s; }\n\n.input-group [type=\"checkbox\"]:checked + label.switch:before, .input-group [type=\"radio\"]:checked + label.switch:before {\n  background: #dcdcdc; }\n\n.input-group [type=\"checkbox\"]:checked + label.switch:after, .input-group [type=\"radio\"]:checked + label.switch:after {\n  left: 1.75rem;\n  width: 1.25rem;\n  height: 1.25rem;\n  bottom: 0.3125rem;\n  margin-left: -3rem;\n  background: #0277bd; }\n\n/*\n  Custom elements for forms and input elements.\n*/\n/*\n  Custom elements for cards and containers.\n*/\n/*\n  Custom contextual background elements and alerts.\n*/\n/*\n  Custom elements for progress elements and spinners.\n*/\n/*\r\n  Definitions for utilities and helper classes.\r\n*/\n.hidden {\n  display: none !important; }\n\n.visually-hidden {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  margin: -1px !important;\n  border: 0 !important;\n  padding: 0 !important;\n  clip: rect(0 0 0 0) !important;\n  -webkit-clip-path: inset(100%) !important;\n  clip-path: inset(100%) !important;\n  overflow: hidden !important; }\n\nul.breadcrumbs {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  list-style: none;\n  margin: 0.5rem;\n  padding: 0; }\n\nul.breadcrumbs li {\n  -webkit-box-flex: 1;\n  max-width: 100%;\n  -webkit-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-basis: 0;\n  flex-basis: 0;\n  position: relative;\n  text-align: center;\n  background: #e6e6e6;\n  height: 2rem;\n  line-height: 2rem;\n  margin-right: 1.125rem; }\n\nul.breadcrumbs li:before, ul.breadcrumbs li:after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  width: 0;\n  height: 0;\n  border: 0 solid #e6e6e6;\n  border-width: 1rem 1rem; }\n\nul.breadcrumbs li:before {\n  left: -1rem;\n  border-left-color: transparent; }\n\nul.breadcrumbs li:after {\n  left: 100%;\n  border-color: transparent;\n  border-left-color: #e6e6e6; }\n\nul.breadcrumbs li:first-child:before {\n  border: 0; }\n\nul.breadcrumbs li:last-child {\n  margin-right: 0; }\n\nul.breadcrumbs li:last-child:after {\n  border: 0; }\n\n.close {\n  display: inline-block;\n  width: 1.5rem;\n  font-family: sans-serif;\n  font-size: 1.5rem;\n  line-height: 1;\n  font-weight: 700;\n  border-radius: 2rem;\n  background: rgba(230, 230, 230, 0);\n  vertical-align: top;\n  cursor: pointer;\n  transition: background 0.3s; }\n\n.close:hover, .close:focus {\n  background: #e6e6e6; }\n\n.close:before {\n  content: \"\\D7\";\n  display: block;\n  text-align: center; }\n\n/*\n  Custom elements for utilities and helper classes.\n*/\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.25) !important; }\n\n.rounded {\n  border-radius: 0.125rem !important; }\n\n.circular {\n  border-radius: 50% !important; }\n\n.responsive-margin {\n  margin: 0.25rem !important; }\n\n@media screen and (min-width: 768px) {\n  .responsive-margin {\n    margin: 0.375rem !important; } }\n\n@media screen and (min-width: 1280px) {\n  .responsive-margin {\n    margin: 0.5rem !important; } }\n\n.responsive-padding {\n  padding: 0.125rem 0.25rem !important; }\n\n@media screen and (min-width: 768px) {\n  .responsive-padding {\n    padding: 0.25rem 0.375rem !important; } }\n\n@media screen and (min-width: 1280px) {\n  .responsive-padding {\n    padding: 0.375rem 0.5rem !important; } }\n\n.shadowed {\n  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.125), 0 0.125rem 0.125rem -0.125rem rgba(0, 0, 0, 0.25) !important; }\n\n@media screen and (max-width: 767px) {\n  .hidden-sm {\n    display: none !important; } }\n\n@media screen and (min-width: 768px) and (max-width: 1279px) {\n  .hidden-md {\n    display: none !important; } }\n\n@media screen and (min-width: 1280px) {\n  .hidden-lg {\n    display: none !important; } }\n\n@media screen and (max-width: 767px) {\n  .visually-hidden-sm {\n    position: absolute !important;\n    width: 1px !important;\n    height: 1px !important;\n    margin: -1px !important;\n    border: 0 !important;\n    padding: 0 !important;\n    clip: rect(0 0 0 0) !important;\n    -webkit-clip-path: inset(100%) !important;\n    clip-path: inset(100%) !important;\n    overflow: hidden !important; } }\n\n@media screen and (min-width: 768px) and (max-width: 1279px) {\n  .visually-hidden-md {\n    position: absolute !important;\n    width: 1px !important;\n    height: 1px !important;\n    margin: -1px !important;\n    border: 0 !important;\n    padding: 0 !important;\n    clip: rect(0 0 0 0) !important;\n    -webkit-clip-path: inset(100%) !important;\n    clip-path: inset(100%) !important;\n    overflow: hidden !important; } }\n\n@media screen and (min-width: 1280px) {\n  .visually-hidden-lg {\n    position: absolute !important;\n    width: 1px !important;\n    height: 1px !important;\n    margin: -1px !important;\n    border: 0 !important;\n    padding: 0 !important;\n    clip: rect(0 0 0 0) !important;\n    -webkit-clip-path: inset(100%) !important;\n    clip-path: inset(100%) !important;\n    overflow: hidden !important; } }\n\n.image-gallery {\n  -webkit-tap-highlight-color: transparent; }\n\n.image-gallery.fullscreen-modal {\n  background: #000;\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: fixed;\n  right: 0;\n  top: 0;\n  width: 100%;\n  z-index: 5; }\n\n.image-gallery.fullscreen-modal .image-gallery-content {\n  top: 50%;\n  transform: translateY(-50%); }\n\n.image-gallery-content {\n  position: relative;\n  line-height: 0;\n  top: 0; }\n\n.image-gallery-content.fullscreen {\n  background: #000; }\n\n.image-gallery-content.fullscreen .image-gallery-slide {\n  background: #000; }\n\n.image-gallery-slide-wrapper {\n  position: relative; }\n\n.image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {\n  display: inline-block;\n  width: calc(100% - 113px); }\n\n@media (max-width: 768px) {\n  .image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {\n    width: calc(100% - 84px); } }\n\n.image-gallery-fullscreen-button,\n.image-gallery-left-nav,\n.image-gallery-play-button,\n.image-gallery-right-nav {\n  appearance: none;\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  outline: none;\n  position: absolute;\n  z-index: 4; }\n\n.image-gallery-fullscreen-button,\n.image-gallery-play-button {\n  bottom: 0; }\n\n.image-gallery-fullscreen-button {\n  right: 0; }\n\n.image-gallery-play-button {\n  left: 0; }\n\n.image-gallery-left-nav,\n.image-gallery-right-nav {\n  color: #fff;\n  font-size: 5em;\n  padding: 50px 15px;\n  top: 45%; }\n\n.image-gallery-left-nav[disabled],\n.image-gallery-right-nav[disabled] {\n  cursor: disabled;\n  opacity: 0.6;\n  pointer-events: none; }\n\n@media (max-width: 768px) {\n  .image-gallery-left-nav,\n  .image-gallery-right-nav {\n    font-size: 3.4em;\n    padding: 20px 15px; } }\n\n@media (max-width: 480px) {\n  .image-gallery-left-nav,\n  .image-gallery-right-nav {\n    font-size: 2.4em;\n    padding: 0 15px; } }\n\n.image-gallery-left-nav {\n  left: 0; }\n\n.image-gallery-right-nav {\n  right: 0; }\n\n.image-gallery-slides {\n  border-radius: 0.5rem;\n  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n  white-space: nowrap; }\n\n.image-gallery-slide {\n  background: transparent;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%; }\n\n.image-gallery-slide.center {\n  position: relative; }\n\n.image-gallery-slide img {\n  width: 100%; }\n\n.image-gallery-slide .image-gallery-description {\n  background: rgba(0, 0, 0, 0.4);\n  bottom: 70px;\n  color: #fff;\n  left: 0;\n  line-height: 1;\n  padding: 10px 20px;\n  position: absolute;\n  white-space: normal; }\n\n@media (max-width: 768px) {\n  .image-gallery-slide .image-gallery-description {\n    bottom: 45px;\n    font-size: 0.8em;\n    padding: 8px 15px; } }\n\n.image-gallery-bullets {\n  bottom: 20px;\n  left: 0;\n  margin: 0 auto;\n  position: absolute;\n  right: 0;\n  width: 80%;\n  z-index: 4; }\n\n.image-gallery-bullets .image-gallery-bullets-container {\n  margin: 0;\n  padding: 0;\n  text-align: center; }\n\n.image-gallery-bullets .image-gallery-bullet {\n  appearance: none;\n  background-color: transparent;\n  border: 1px solid #fff;\n  border-radius: 50%;\n  box-shadow: 0 1px 0 #1a1a1a;\n  cursor: pointer;\n  display: inline-block;\n  margin: 0 5px;\n  outline: none;\n  padding: 5px; }\n\n@media (max-width: 768px) {\n  .image-gallery-bullets .image-gallery-bullet {\n    margin: 0 3px;\n    padding: 3px; } }\n\n@media (max-width: 480px) {\n  .image-gallery-bullets .image-gallery-bullet {\n    padding: 2.7px; } }\n\n.image-gallery-bullets .image-gallery-bullet.active {\n  background: #fff; }\n\n.image-gallery-thumbnails-wrapper {\n  position: relative; }\n\n.image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {\n  display: inline-block;\n  vertical-align: top;\n  width: 108px; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {\n    width: 81px; } }\n\n.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails {\n  height: 100%;\n  width: 100%;\n  left: 0;\n  padding: 0;\n  position: absolute;\n  top: 0; }\n\n.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail {\n  display: block;\n  margin-right: 0;\n  padding: 0; }\n\n.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail + .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail + .image-gallery-thumbnail {\n  margin-left: 0; }\n\n.image-gallery-thumbnails-wrapper.left {\n  margin-right: 5px; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnails-wrapper.left {\n    margin-right: 3px; } }\n\n.image-gallery-thumbnails-wrapper.right {\n  margin-left: 5px; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnails-wrapper.right {\n    margin-left: 3px; } }\n\n.image-gallery-thumbnails {\n  overflow: hidden;\n  padding: 5px 0; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnails {\n    padding: 3px 0; } }\n\n.image-gallery-thumbnails .image-gallery-thumbnails-container {\n  cursor: pointer;\n  text-align: center;\n  transition: transform 0.45s ease-out;\n  white-space: nowrap; }\n\n.image-gallery-thumbnail {\n  display: inline-block;\n  border: 4px solid transparent;\n  transition: border 0.3s ease-out;\n  width: 100px; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnail {\n    border: 3px solid transparent;\n    width: 75px; } }\n\n.image-gallery-thumbnail + .image-gallery-thumbnail {\n  margin-left: 2px; }\n\n.image-gallery-thumbnail img {\n  vertical-align: middle;\n  width: 100%; }\n\n.image-gallery-thumbnail.active {\n  border: 4px solid #337ab7; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnail.active {\n    border: 3px solid #337ab7; } }\n\n.image-gallery-thumbnail-label {\n  color: #1a1a1a;\n  font-size: 1em; }\n\n@media (max-width: 768px) {\n  .image-gallery-thumbnail-label {\n    font-size: 0.8em; } }\n\n.image-gallery-index {\n  background: rgba(0, 0, 0, 0.4);\n  color: #fff;\n  line-height: 1;\n  padding: 10px 20px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 4; }\n\n@media (max-width: 768px) {\n  .image-gallery-index {\n    font-size: 0.8em;\n    padding: 5px 10px; } }\n\n.app-container {\n  z-index: 3;\n  margin: 0;\n  padding: 0; }\n\n.page-title {\n  text-align: center;\n  margin-top: 15px; }\n\n.page-title h2 {\n  font-size: 3.5rem;\n  padding: 0;\n  margin-bottom: 0; }\n\n.page-title .title-divider {\n  color: #259073;\n  font-size: 6px;\n  margin: 0;\n  padding: 0;\n  margin-bottom: 10px; }\n\n/* Put your CSS code in the left column, instead of example, to put or remove unnecessary prefixes. */\n.example {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-transition: all 0.5s;\n  -o-transition: all 0.5s;\n  transition: all 0.5s;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background: -webkit-gradient(linear, left top, left bottom, from(white), to(black));\n  background: -webkit-linear-gradient(top, white, black);\n  background: -o-linear-gradient(top, white, black);\n  background: linear-gradient(to bottom, white, black); }\n\n#top-nav-icon {\n  width: 91px;\n  height: 84px;\n  position: relative;\n  z-index: 99; }\n\n#top-nav-icon .icon-hexagon {\n  fill: #041122;\n  stroke: #259073;\n  stroke-miterlimit: 10; }\n\n#top-nav-icon .colored-arrow {\n  fill: #C8E98E; }\n\n#top-nav-icon .white-arrow {\n  fill: #FFF; }\n\n.mobile-logo-button-container {\n  height: 8vh;\n  margin: 0;\n  padding: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.mobile-logo-button-container .mobile-logo-button {\n  padding: 0;\n  margin-right: 4px;\n  width: 50px;\n  height: 50px; }\n\n.logo-subtitle {\n  padding-left: 10px;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 8vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  white-space: nowrap;\n  background: -webkit-gradient(linear, left top, left bottom, from(#041122), color-stop(#259073), to(#041122)) left #041122 no-repeat;\n  background: -webkit-linear-gradient(top, #041122, #259073, #041122) left #041122 no-repeat;\n  background: -o-linear-gradient(top, #041122, #259073, #041122) left #041122 no-repeat;\n  background: linear-gradient(to bottom, #041122, #259073, #041122) left #041122 no-repeat;\n  background-size: 1px 60%; }\n\n.logo-subtitle h5 small {\n  font-size: 0.8rem;\n  color: #FFF; }\n\n.exit-button {\n  padding-left: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-align: center;\n  width: 30px;\n  height: 8vh; }\n\n#x-button {\n  margin: 0;\n  width: 1rem;\n  height: 1rem;\n  fill: #FFF; }\n\n.nav-mobile {\n  -webkit-box-shadow: 0 3px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 3px rgba(0, 0, 0, 0.3);\n  height: 8.2vh;\n  width: 100vw;\n  padding: 0 0 5px;\n  /* gradient can be an image */\n  background: -webkit-gradient(linear, right top, left top, from(#041122), color-stop(#E6F99D), color-stop(#7FDA89), color-stop(#259073), color-stop(#7FDA89), color-stop(#E6F99D), to(#041122)) left bottom #041122 no-repeat;\n  background: -webkit-linear-gradient(right, #041122, #E6F99D, #7FDA89, #259073, #7FDA89, #E6F99D, #041122) left bottom #041122 no-repeat;\n  background: -o-linear-gradient(right, #041122, #E6F99D, #7FDA89, #259073, #7FDA89, #E6F99D, #041122) left bottom #041122 no-repeat;\n  background: linear-gradient(to left, #041122, #E6F99D, #7FDA89, #259073, #7FDA89, #E6F99D, #041122) left bottom #041122 no-repeat;\n  background-size: 100% 1px;\n  /* if linear-gradient, we need to resize it */ }\n\n.nav-mobile .nav-button-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.nav-mobile .nav-button-container .nav-button {\n  padding-left: 10px;\n  width: 40px;\n  height: 40px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.nav-mobile .nav-button-container .nav-button .nav-divider {\n  margin-top: 2px;\n  margin-bottom: 2px;\n  width: 25px;\n  height: 2px;\n  background-color: #FFF; }\n\n.slide-nav {\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  left: 20vw;\n  height: 8vh; }\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding: 15px 15%;\n  height: auto;\n  text-align: center; }\n\n.nav .nav-item {\n  margin: auto;\n  width: auto;\n  display: inline-block; }\n\n.nav .nav-item h5 {\n  font-weight: 100;\n  text-align: center; }\n\n.nav .about,\n.nav .blog,\n.nav .contact,\n.nav .work {\n  white-space: nowrap; }\n\n.middle-line {\n  top: 62px;\n  padding: 0;\n  margin: 0;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  z-index: 10;\n  position: absolute; }\n\n.middle-line hr {\n  width: 600px;\n  height: 1px;\n  border: 0;\n  background-image: -webkit-linear-gradient(left, #041122, #E6F99D, #7FDA89, #259073, #7FDA89, #E6F99D, #041122);\n  background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0); }\n\n.nav-mobile-container {\n  margin: 0;\n  padding: 0; }\n\n.hexagon {\n  fill: #041122; }\n\n.refresh-pane-container {\n  visibility: hidden; }\n\n.refresh-pane {\n  width: 0;\n  height: 100%;\n  fill: #259073; }\n\n.glasses .frame {\n  fill: #FFF; }\n\n.glasses .shadow {\n  fill: #E0E0E0; }\n\n.home-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 90vh;\n  width: 100vw;\n  overflow-y: scroll; }\n\n.center-logo .center-logo-content {\n  width: 100vw;\n  display: flex;\n  justify-content: center; }\n\n.center-logo .center-logo-content #center-logo-svg {\n  width: 200px;\n  height: 250px; }\n\n.center-logo .center-logo-content #center-logo-svg .colored-outlines {\n  fill: #C8E98E; }\n\n.center-logo .center-logo-content #center-logo-svg .white-outlines {\n  fill: #E0E0E0; }\n\n.center-logo .center-logo-content #center-logo-svg .other-outlines {\n  fill: #7FDA89; }\n\n.center-logo .center-logo-content #center-logo-svg .logo-name {\n  fill: #FFF;\n  font-size: 1.5rem;\n  font-family: 'lekton_regular';\n  stroke: #FFF;\n  stroke-miterlimit: 10;\n  stroke-width: 0.5px;\n  font-size: 35px; }\n\n.center-logo .center-logo-content #center-logo-svg .logo-text {\n  font-size: 40px;\n  fill: #259073; }\n\n.social-media-icons {\n  width: 100vw; }\n\n.social-media-icons .social-media-icons-content {\n  margin-top: 1.5rem;\n  display: flex;\n  justify-content: center;\n  width: 100px;\n  height: 30px; }\n\n.social-media-icons .social-media-icons-content #social-media-icons-item-svg {\n  width: 100px;\n  height: 30px; }\n\n.social-media-icons .social-media-icons-content #social-media-icons-item-svg .icon-border {\n  fill: none;\n  stroke: #FFF;\n  stroke-miterlimit: 10; }\n\n.social-media-icons .social-media-icons-content #social-media-icons-item-svg .icon {\n  fill: #FFF; }\n\n.about-me-content {\n  padding: 0;\n  overflow-y: scroll;\n  height: 92vh;\n  pointer-events: all; }\n\n.about-me-content .code-arrows {\n  color: #C8E98E;\n  font-size: 1rem;\n  margin: 1px; }\n\n.about-me-content .empty-border-button {\n  border: solid 1px #259073;\n  height: 33px;\n  padding: 0; }\n\n.about-me-content .empty-border-button h5 {\n  line-height: 33px;\n  margin: 0;\n  font-size: 0.9rem;\n  text-align: center;\n  padding: 0; }\n\n.about-me-content .about-total {\n  pointer-events: none; }\n\n.about-me-content .about-total .skill-content {\n  padding-top: 10px; }\n\n.about-me-content .about-total .skill-content .skill-selectors {\n  display: flex;\n  justify-content: center;\n  padding-left: 15px; }\n\n.about-me-content .about-total .skill-content .skill-selectors .skill-selectors-content-back-end,\n.about-me-content .about-total .skill-content .skill-selectors .skill-selectors-content-dev-ops,\n.about-me-content .about-total .skill-content .skill-selectors .skill-selectors-content-front-end {\n  max-width: 100px;\n  margin: 0 auto; }\n\n.about-me-content .about-total .bio-content .text-content {\n  text-align: justify;\n  text-justify: inter-word; }\n\n.about-me-content .about-total .bio-content .text-content p {\n  font-size: 0.8rem; }\n\n.browser .browser-content #browser-item-svg .a {\n  fill: none;\n  stroke: #259073;\n  stroke-miterlimit: 10; }\n\n.browser .browser-content #browser-item-svg .b {\n  fill: #259073; }\n\n#skill-icons-item-svg {\n  fill: #259073; }\n\n#skill-icons-item-svg #server .power-button {\n  fill: red; }\n\n#skill-icons-item-svg #server .line-light {\n  fill: #E6F99D; }\n\n#skill-icons-item-svg #server .server-hinge {\n  fill: #E0E0E0; }\n\n#skill-icons-item-svg #laptop .inset {\n  fill: #041122; }\n\n.work-page {\n  margin: 0;\n  padding: 0;\n  overflow-y: scroll;\n  height: 85vh;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.work-page .work-content {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.work-page .work-content .a,\n.work-page .work-content .b,\n.work-page .work-content .e,\n.work-page .work-content .g {\n  fill: none; }\n\n.work-page .work-content .b,\n.work-page .work-content .e,\n.work-page .work-content .f,\n.work-page .work-content .g {\n  stroke: #7fda89;\n  stroke-miterlimit: 10; }\n\n.work-page .work-content .c {\n  clip-path: url(\"#a\"); }\n\n.work-page .work-content .d {\n  fill: #7fda89; }\n\n.work-page .work-content .e,\n.work-page .work-content .f {\n  stroke-width: 2px; }\n\n.work-page .work-content .f {\n  fill: #061221; }\n\n.work-page .work-content .g {\n  stroke-width: 0.5px; }\n\n.work-page .work-content #work-item-svg {\n  width: 708px;\n  height: 484px; }\n\n.work-page .work-content #work-item-svg #deep-space-border,\n.work-page .work-content #work-item-svg #hcme-border,\n.work-page .work-content #work-item-svg #music-player-border,\n.work-page .work-content #work-item-svg #pressing-game-border {\n  fill: rgba(124, 240, 10, 0); }\n\n.work-content-page .image-gallery-container {\n  display: flex;\n  align-items: center; }\n\n.work-content-page .image-gallery-container .image-gallery {\n  margin: auto; }\n\n.work-content-page .image-gallery-container .image-gallery .image-gallery-left-nav,\n.work-content-page .image-gallery-container .image-gallery .image-gallery-right-nav {\n  padding: 0;\n  height: 2.5rem;\n  width: 2.5rem; }\n\n.work-content-page .image-gallery-container .image-gallery .image-gallery-right-nav {\n  background-image: url(\"/assets/right-arrow.svg\"); }\n\n.work-content-page .image-gallery-container .image-gallery .image-gallery-left-nav {\n  background-image: url(\"/assets/left-arrow.svg\"); }\n\n.work-content-page .project-descriptor p {\n  text-align: justify;\n  text-justify: inter-word;\n  padding: 1rem 0;\n  font-size: 0.9rem; }\n\n.work-controls-partial .work-controls-content {\n  display: flex;\n  justify-content: center; }\n\n.work-controls-partial .work-controls-content #work-controls {\n  fill: transparent;\n  height: 40px;\n  width: 165px;\n  stroke: #7FDA89; }\n\n.work-controls-partial .work-controls-content #work-controls #exit,\n.work-controls-partial .work-controls-content #work-controls #next,\n.work-controls-partial .work-controls-content #work-controls #prev {\n  stroke: #7FDA89; }\n\n@-webkit-keyframes hvr-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n@keyframes hvr-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n.hvr-pulse-shrink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  -webkit-box-shadow: 0 0 1px transparent;\n  box-shadow: 0 0 1px transparent; }\n\n.hvr-pulse-shrink:active,\n.hvr-pulse-shrink:focus,\n.hvr-pulse-shrink:hover {\n  -webkit-animation-name: hvr-pulse-shrink;\n  animation-name: hvr-pulse-shrink;\n  -webkit-animation-duration: 0.5s;\n  animation-duration: 0.5;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n  -webkit-animation-iteration-count: 2;\n  animation-iteration-count: 2;\n  -webkit-animation-direction: alternate;\n  animation-direction: alternate;\n  color: green; }\n\n.hvr-forward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px transparent;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n\n.hvr-forward:active,\n.hvr-forward:focus,\n.hvr-forward:hover {\n  -webkit-transform: translateX(8px);\n  transform: translateX(8px); }\n\n/* Backward */\n.hvr-backward {\n  box-shadow: 0 0 1px transparent;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n\n.hvr-backward:active {\n  -webkit-transform: translateX(0);\n  transform: translateX(0); }\n\n.hvr-backward:focus,\n.hvr-backward:hover {\n  -webkit-transform: translateX(-8px);\n  transform: translateX(-8px); }\n\n.fade-slower-enter {\n  opacity: 0.01; }\n\n.fade-slower-enter.fade-slower-enter-active {\n  opacity: 1;\n  transition: opacity 0.8s ease-in; }\n\n.fade-slower-leave {\n  opacity: 0; }\n\n.fade-slower-leave.fade-slower-leave-active {\n  opacity: 0.01;\n  transition: opacity 1s ease-in; }\n\n.fade-slower-appear {\n  opacity: 0.01; }\n\n.fade-slower-appear.fade-slower-appear-active {\n  opacity: 1;\n  transition: opacity 0.8s ease-in; }\n\n.example-enter {\n  opacity: 0.01; }\n\n.example-enter.example-enter-active {\n  opacity: 1;\n  transition: opacity 500ms ease-in; }\n\n.example-leave {\n  opacity: 1; }\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n  transition: opacity 300ms ease-in; }\n\n.example-appear {\n  opacity: 0.01; }\n\n.example-appear.example-appear-active {\n  opacity: 1;\n  transition: opacity 0.5s ease-in; }\n\n/* Slide Down */\n.slide-down-enter {\n  opacity: 0;\n  transform: translateY(-1000px);\n  transition: all 0.3s ease; }\n\n.slide-down-enter.slide-down-enter-active {\n  opacity: 1;\n  transform: translateY(0px); }\n\n.slide-down-leave {\n  opacity: 0.01;\n  transition: all 0.3s ease-in; }\n\n.slide-down-leave.slide-down-leave-active {\n  opacity: 0.01;\n  transform: translateY(-1000px);\n  transition: all 0.3s ease-in; }\n\n.slide-down-appear {\n  opacity: 0;\n  transform: translateY(-100px);\n  transition: all 0.3s ease; }\n\n.slide-down-appear.slide-down-appear-active {\n  opacity: 1;\n  transform: translateY(0px); }\n\n/* Slide Up */\n.slide-up-enter {\n  opacity: 0;\n  transform: translateY(100px);\n  transition: all 0.3s ease; }\n\n.slide-up-enter.slide-up-enter-active {\n  opacity: 1;\n  transform: translateY(0px); }\n\n.slide-up-leave {\n  opacity: 0; }\n\n.slide-up-leave.slide-up-leave-active {\n  opacity: 0.01;\n  transition: opacity 0.3s ease-in; }\n\n.slide-up-appear {\n  opacity: 0;\n  transform: translateY(100px);\n  transition: all 0.3s ease; }\n\n.slide-up-appear.slide-up-appear-active {\n  opacity: 1;\n  transform: translateY(0px); }\n\n/* Slide Left */\n.slide-left-enter {\n  opacity: 0;\n  transform: translateX(100px);\n  transition: all 0.3s ease; }\n\n.slide-left-enter.slide-left-enter-active {\n  opacity: 1;\n  transform: translateX(0px); }\n\n.slide-left-leave {\n  opacity: 1; }\n\n.slide-left-leave.slide-left-leave-active {\n  opacity: 0.01;\n  transition: opacity 0.3s ease-in; }\n\n.slide-left-appear {\n  opacity: 0;\n  transform: translateX(100px);\n  transition: all 0.3s ease; }\n\n.slide-left-appear.slide-left-appear-active {\n  opacity: 1;\n  transform: translateX(0px); }\n\n/* Slide Right */\n.slide-right-enter {\n  opacity: 0;\n  transform: translateX(-100px);\n  transition: all 0.3s ease; }\n\n.slide-left-eright.slide-left-eright-active {\n  opacity: 1;\n  transform: translateX(0px); }\n\n.slide-right-leave {\n  opacity: 0; }\n\n.slide-right-leave.slide-right-leave-active {\n  opacity: 0.01;\n  transition: opacity 0.3ms ease-in; }\n\n.slide-right-appear {\n  opacity: 0;\n  transform: translateX(-100px);\n  transition: all 0.3s ease; }\n\n.slide-right-appear.slide-right-appear-active {\n  opacity: 1;\n  transform: translateX(0px); }\n\n.slide-left-nav-enter {\n  opacity: 0;\n  transform: translateX(1000px);\n  transition: all 0.3s ease; }\n\n.slide-left-nav-enter.slide-left-nav-enter-active {\n  opacity: 1;\n  transform: translateX(60vw); }\n\n.slide-left-nav-leave {\n  opacity: 0.01;\n  transition: all 0.3s ease-in; }\n\n.slide-left-nav-leave.slide-left-nav-leave-active {\n  opacity: 0.01;\n  transform: translateX(1000px);\n  transition: all 0.3s ease-in; }\n\n.slide-left-nav-appear {\n  opacity: 0;\n  transform: translateX(1000px);\n  transition: all 0.3s ease; }\n\n.slide-left-nav-appear.slide-left-nav-appear-active {\n  opacity: 1;\n  transform: translateX(60vw); }\n\n.boom {\n  height: 30vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%; }\n\n.boom .swipe {\n  visibility: hidden;\n  fill: none;\n  stroke: #FFF;\n  stroke-miterlimit: 10;\n  width: 2rem;\n  height: 3.7rem; }\n\n.boom .scroll {\n  visibility: hidden;\n  width: 2rem;\n  height: 3.7rem;\n  stroke-miterlimit: 10; }\n\n.boom .scroll rect {\n  fill: none;\n  stroke: #FFF; }\n\n.boom .scroll circle {\n  fill: #FFF; }\n\n#huge {\n  width: 500px;\n  height: 500px;\n  background-color: #7FDA89; }\n\n::-webkit-scrollbar {\n  display: none; }\n\n.html {\n  background-color: #030E19; }\n\nbody {\n  height: 100vh;\n  font-size: 12px;\n  background-color: #030E19;\n  margin: 0;\n  overflow: hidden; }\n\nsvg#main {\n  background-color: #030E19;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 0;\n  z-index: -1;\n  width: 100vw;\n  height: 100vh; }\n\nh1 {\n  color: #FFF; }\n\n.end-page {\n  height: 1rem;\n  width: 1rem; }\n", ""]);

// exports


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;

var _hasClass = __webpack_require__(263);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass2.default)(element)) element.className = element.className + ' ' + className;
}
module.exports = exports['default'];

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
}
module.exports = exports["default"];

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
};

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(137);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(137);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf = void 0;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM2.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}

/* https://github.com/component/raf */
var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);

  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};
compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};
exports.default = compatRaf;
module.exports = exports['default'];

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(6);

function getInitialState() {
  return {
    x: null,
    y: null,
    swiping: false,
    start: 0
  };
}

function getMovingPosition(e) {
  return 'changedTouches' in e ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function getPosition(e) {
  return 'touches' in e ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
}

function calculatePos(e, state) {
  var _getMovingPosition = getMovingPosition(e),
      x = _getMovingPosition.x,
      y = _getMovingPosition.y;

  var deltaX = state.x - x;
  var deltaY = state.y - y;

  var absX = Math.abs(deltaX);
  var absY = Math.abs(deltaY);

  var time = Date.now() - state.start;
  var velocity = Math.sqrt(absX * absX + absY * absY) / time;

  return { deltaX: deltaX, deltaY: deltaY, absX: absX, absY: absY, velocity: velocity };
}

var Swipeable = function (_React$Component) {
  _inherits(Swipeable, _React$Component);

  function Swipeable(props, context) {
    _classCallCheck(this, Swipeable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.eventStart = _this.eventStart.bind(_this);
    _this.eventMove = _this.eventMove.bind(_this);
    _this.eventEnd = _this.eventEnd.bind(_this);
    _this.mouseDown = _this.mouseDown.bind(_this);
    _this.mouseMove = _this.mouseMove.bind(_this);
    _this.mouseUp = _this.mouseUp.bind(_this);
    return _this;
  }

  Swipeable.prototype.componentWillMount = function componentWillMount() {
    this.swipeable = getInitialState();
  };

  Swipeable.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.trackMouse) {
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mouseup', this.mouseUp);
    }
  };

  Swipeable.prototype.mouseDown = function mouseDown(e) {
    if (!this.props.trackMouse || e.type !== 'mousedown') {
      return;
    }

    if (typeof this.props.onMouseDown === 'function') this.props.onMouseDown(e);

    this.eventStart(e);

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  Swipeable.prototype.mouseMove = function mouseMove(e) {
    this.eventMove(e);
  };

  Swipeable.prototype.mouseUp = function mouseUp(e) {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);

    this.eventEnd(e);
  };

  Swipeable.prototype.eventStart = function eventStart(e) {
    if (e.touches && e.touches.length > 1) return;

    var _getPosition = getPosition(e),
        x = _getPosition.x,
        y = _getPosition.y;

    if (this.props.stopPropagation) e.stopPropagation();

    this.swipeable = { start: Date.now(), x: x, y: y, swiping: false };
  };

  Swipeable.prototype.eventMove = function eventMove(e) {
    var _props = this.props,
        stopPropagation = _props.stopPropagation,
        delta = _props.delta,
        onSwiping = _props.onSwiping,
        onSwipingLeft = _props.onSwipingLeft,
        onSwipedLeft = _props.onSwipedLeft,
        onSwipingRight = _props.onSwipingRight,
        onSwipedRight = _props.onSwipedRight,
        onSwipingUp = _props.onSwipingUp,
        onSwipedUp = _props.onSwipedUp,
        onSwipingDown = _props.onSwipingDown,
        onSwipedDown = _props.onSwipedDown,
        preventDefaultTouchmoveEvent = _props.preventDefaultTouchmoveEvent;


    if (!this.swipeable.x || !this.swipeable.y || e.touches && e.touches.length > 1) {
      return;
    }

    var pos = calculatePos(e, this.swipeable);

    if (pos.absX < delta && pos.absY < delta && !this.swipeable.swiping) return;

    if (stopPropagation) e.stopPropagation();

    if (onSwiping) {
      onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
    }

    var cancelablePageSwipe = false;
    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (onSwipingLeft || onSwipedLeft) {
          onSwipingLeft && onSwipingLeft(e, pos.absX);
          cancelablePageSwipe = true;
        }
      } else if (onSwipingRight || onSwipedRight) {
        onSwipingRight && onSwipingRight(e, pos.absX);
        cancelablePageSwipe = true;
      }
    } else if (pos.deltaY > 0) {
      if (onSwipingUp || onSwipedUp) {
        onSwipingUp && onSwipingUp(e, pos.absY);
        cancelablePageSwipe = true;
      }
    } else if (onSwipingDown || onSwipedDown) {
      onSwipingDown && onSwipingDown(e, pos.absY);
      cancelablePageSwipe = true;
    }

    this.swipeable.swiping = true;

    if (cancelablePageSwipe && preventDefaultTouchmoveEvent) e.preventDefault();
  };

  Swipeable.prototype.eventEnd = function eventEnd(e) {
    var _props2 = this.props,
        stopPropagation = _props2.stopPropagation,
        flickThreshold = _props2.flickThreshold,
        onSwiped = _props2.onSwiped,
        onSwipedLeft = _props2.onSwipedLeft,
        onSwipedRight = _props2.onSwipedRight,
        onSwipedUp = _props2.onSwipedUp,
        onSwipedDown = _props2.onSwipedDown,
        onTap = _props2.onTap;


    if (this.swipeable.swiping) {
      var pos = calculatePos(e, this.swipeable);

      if (stopPropagation) e.stopPropagation();

      var isFlick = pos.velocity > flickThreshold;

      onSwiped && onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);

      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          onSwipedLeft && onSwipedLeft(e, pos.deltaX, isFlick);
        } else {
          onSwipedRight && onSwipedRight(e, pos.deltaX, isFlick);
        }
      } else if (pos.deltaY > 0) {
        onSwipedUp && onSwipedUp(e, pos.deltaY, isFlick);
      } else {
        onSwipedDown && onSwipedDown(e, pos.deltaY, isFlick);
      }
    } else {
      onTap && onTap(e);
    }

    this.swipeable = getInitialState();
  };

  Swipeable.prototype.render = function render() {
    var newProps = _extends({}, this.props, {
      onTouchStart: this.eventStart,
      onTouchMove: this.eventMove,
      onTouchEnd: this.eventEnd,
      onMouseDown: this.mouseDown
    });

    delete newProps.onSwiped;
    delete newProps.onSwiping;
    delete newProps.onSwipingUp;
    delete newProps.onSwipingRight;
    delete newProps.onSwipingDown;
    delete newProps.onSwipingLeft;
    delete newProps.onSwipedUp;
    delete newProps.onSwipedRight;
    delete newProps.onSwipedDown;
    delete newProps.onSwipedLeft;
    delete newProps.onTap;
    delete newProps.flickThreshold;
    delete newProps.delta;
    delete newProps.preventDefaultTouchmoveEvent;
    delete newProps.stopPropagation;
    delete newProps.nodeName;
    delete newProps.children;
    delete newProps.trackMouse;

    return React.createElement(this.props.nodeName, newProps, this.props.children);
  };

  return Swipeable;
}(React.Component);

Swipeable.propTypes = {
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedDown: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onTap: PropTypes.func,
  flickThreshold: PropTypes.number,
  delta: PropTypes.number,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  nodeName: PropTypes.string,
  trackMouse: PropTypes.bool,
  children: PropTypes.node
};

Swipeable.defaultProps = {
  flickThreshold: 0.6,
  delta: 10,
  preventDefaultTouchmoveEvent: false,
  stopPropagation: false,
  nodeName: 'div'
};

module.exports = Swipeable;

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(182);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransitionGroupChild = __webpack_require__(421);

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _PropTypes = __webpack_require__(183);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionName: _PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, _PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, _PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, _PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes = undefined !== "production" ? propTypes : {};
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addClass = __webpack_require__(262);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(264);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _requestAnimationFrame = __webpack_require__(266);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _properties = __webpack_require__(265);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(40);

var _PropTypes = __webpack_require__(183);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (_properties.transitionEnd) events.push(_properties.transitionEnd);
if (_properties.animationEnd) events.push(_properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes2.default.node,
  name: _PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (_properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes = undefined !== "production" ? propTypes : {};

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeOffsetPixels;

var _parseOffsetAsPercentage = __webpack_require__(429);

var _parseOffsetAsPercentage2 = _interopRequireDefault(_parseOffsetAsPercentage);

var _parseOffsetAsPixels = __webpack_require__(430);

var _parseOffsetAsPixels2 = _interopRequireDefault(_parseOffsetAsPixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string|number} offset
 * @param {number} contextHeight
 * @return {number} A number representing `offset` converted into pixels.
 */
function computeOffsetPixels(offset, contextHeight) {
  var pixelOffset = (0, _parseOffsetAsPixels2.default)(offset);

  if (typeof pixelOffset === 'number') {
    return pixelOffset;
  }

  var percentOffset = (0, _parseOffsetAsPercentage2.default)(offset);
  if (typeof percentOffset === 'number') {
    return percentOffset * contextHeight;
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debugLog;
function debugLog() {
  if (undefined !== 'production') {
    console.log(arguments); // eslint-disable-line no-console
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureChildrenIsSingleDOMElement;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _isDOMElement = __webpack_require__(427);

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Raise an error if "children" isn't a single DOM Element
 *
 * @param {React.element|null} children
 * @return {undefined}
 */
function ensureChildrenIsSingleDOMElement(children) {
  if (children) {
    _react2.default.Children.only(children);

    if (!(0, _isDOMElement2.default)(children)) {
      throw new Error('You must wrap any Component Elements passed to Waypoint in a DOM Element (eg; a <div>).');
    }
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCurrentPosition;

var _constants = __webpack_require__(184);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {object} bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @return {string} The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent. One of `constants.above`,
 *   `constants.below`, or `constants.inside`.
 */
function getCurrentPosition(bounds) {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return _constants2.default.invisible;
  }

  // top is within the viewport
  if (bounds.viewportTop <= bounds.waypointTop && bounds.waypointTop <= bounds.viewportBottom) {
    return _constants2.default.inside;
  }

  // bottom is within the viewport
  if (bounds.viewportTop <= bounds.waypointBottom && bounds.waypointBottom <= bounds.viewportBottom) {
    return _constants2.default.inside;
  }

  // top is above the viewport and bottom is below the viewport
  if (bounds.waypointTop <= bounds.viewportTop && bounds.viewportBottom <= bounds.waypointBottom) {
    return _constants2.default.inside;
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return _constants2.default.below;
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return _constants2.default.above;
  }

  return _constants2.default.invisible;
}
module.exports = exports['default'];

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMElement;
/**
 * When an element's type is a string, it represents a DOM node with that tag name
 * https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements
 *
 * @param {React.element} Component
 * @return {bool} Whether the component is a DOM Element
 */
function isDOMElement(Component) {
  return typeof Component.type === 'string';
}
module.exports = exports['default'];

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onNextTick;
var timeout = void 0;
var timeoutQueue = [];

function onNextTick(cb) {
  timeoutQueue.push(cb);

  if (!timeout) {
    timeout = setTimeout(function () {
      timeout = null;

      // Drain the timeoutQueue
      var item = void 0;
      // eslint-disable-next-line no-cond-assign
      while (item = timeoutQueue.shift()) {
        item();
      }
    }, 0);
  }

  var isSubscribed = true;

  return function unsubscribe() {
    if (!isSubscribed) {
      return;
    }

    isSubscribed = false;

    var index = timeoutQueue.indexOf(cb);
    if (index === -1) {
      return;
    }

    timeoutQueue.splice(index, 1);

    if (!timeoutQueue.length && timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
}
module.exports = exports["default"];

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseOffsetAsPercentage;
/**
 * Attempts to parse the offset provided as a prop as a percentage. For
 * instance, if the component has been provided with the string "20%" as
 * a value of one of the offset props. If the value matches, then it returns
 * a numeric version of the prop. For instance, "20%" would become `0.2`.
 * If `str` isn't a percentage, then `undefined` will be returned.
 *
 * @param {string} str The value of an offset prop to be converted to a
 *   number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was not a percentage.
 */
function parseOffsetAsPercentage(str) {
  if (str.slice(-1) === '%') {
    return parseFloat(str.slice(0, -1)) / 100;
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Transition = Transition;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Transition(_ref) {
	var children = _ref.children,
	    settings = _ref.settings;

	return _react2.default.createElement(
		_reactTransitionGroup.CSSTransitionGroup,
		{ className: 'click-through-child', component: 'div', transitionAppear: true, transitionAppearTimeout: settings.time, transitionName: settings.transition, transitionEnterTimeout: settings.time, transitionLeaveTimeout: settings.time },
		children
	);
}

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseOffsetAsPixels;
/**
 * Attempts to parse the offset provided as a prop as a pixel value. If
 * parsing fails, then `undefined` is returned. Three examples of values that
 * will be successfully parsed are:
 * `20`
 * "20px"
 * "20"
 *
 * @param {string|number} str A string of the form "{number}" or "{number}px",
 *   or just a number.
 * @return {number|undefined} The numeric version of `str`. Undefined if `str`
 *   was neither a number nor string ending in "px".
 */
function parseOffsetAsPixels(str) {
  if (!isNaN(parseFloat(str)) && isFinite(str)) {
    return parseFloat(str);
  } else if (str.slice(-2) === 'px') {
    return parseFloat(str.slice(0, -2));
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveScrollableAncestorProp;
function resolveScrollableAncestorProp(scrollableAncestor) {
  // When Waypoint is rendered on the server, `window` is not available.
  // To make Waypoint easier to work with, we allow this to be specified in
  // string form and safely convert to `window` here.
  if (scrollableAncestor === 'window') {
    return global.window;
  }

  return scrollableAncestor;
}
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefineGlasses = function DefineGlasses(_ref) {
	var position = _ref.position,
	    transformation = _ref.transformation;


	var Front = function Front() {
		return _react2.default.createElement(
			"g",
			{ id: "front", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M12 21.6c2.3 0 9.4.6 10.7 1.2S39.3 49 40.4 49a4 4 0 0 0 3-.5c.3-.5 2.2-3.7 1.7-5.6S26.8 19.4 26.8 19.4l-14.6-7z", className: "frame" }),
			_react2.default.createElement("path", { d: "M19.4 16L12 12.6v9c1.4 0 5 .3 7.5.6a45.6 45.6 0 0 1 0-6M45 43c-.5-2-18.4-23.5-18.4-23.5l-2-1c5.6 7.5 15 21.4 12.2 21.3-1 0-3-1.4-5-3.2C36 43 40 49 40.4 49a4 4 0 0 0 3-.6c.3-.5 2.3-3.7 1.7-5.6", className: "frame" }),
			_react2.default.createElement("path", { d: "M40.4 49a4 4 0 0 0 2.8-.7c.4-.4 2.4-3.6 2-5.5a22.6 22.6 0 0 0-2.6-3.6c.3 3.8-.7 7.3-4 7.5a9 9 0 0 0 1.8 2.3M183.8 21.4c-2.2 0-9.3.6-10.6 1.2s-16.6 26.2-17.7 26.3a4 4 0 0 1-3-.7c-.3-.5-2.3-3.7-1.7-5.6s18.4-23.4 18.4-23.4l14.6-7z", className: "frame" }),
			_react2.default.createElement("path", { d: "M176.5 16l7.5-3.7v9c-1.5 0-5 .3-7.6.6a45.6 45.6 0 0 0 0-6M151 42.6c.4-1.8 18.3-23.3 18.3-23.3l2-1c-5.7 7.5-15 21.4-12.2 21.2 1.2 0 3-1.3 5-3-4 6.2-8 12.3-8.4 12.3a4 4 0 0 1-3-.6c-.3-.5-2.3-3.7-1.7-5.6", className: "frame" }),
			_react2.default.createElement("path", { d: "M155.5 48.8a4 4 0 0 1-2.8-.6c-.5-.5-2.4-3.7-2-5.6a22.6 22.6 0 0 1 2.6-3.6c-.4 3.8.7 7.3 4 7.6a9 9 0 0 1-1.8 2.2", className: "frame" }),
			_react2.default.createElement("path", { d: "M194.7 5.8s-2-2-7.2-2.7c-14-2-39.2-3.7-49.3-2.7-25.5 2.5-25 8.4-29.2 10.6s-19.7.8-19.7.8A10.4 10.4 0 0 1 86 11C82 8.8 82.4 3 57 .4 46.7-.6 21.4 1 7.5 3.2 2.6 4 .4 6 .4 6 0 6.5-.2 16 0 16s4 1.2 6.5 7c3 8 4.4 19 12 26.8C25 56.4 52 61.4 70.7 51c1.8-1 2.3-2 6-6 4-4.6 10.2-19.2 11.2-20 0-.4 3-5 7.7-5 8.3-.3 11 4.5 11.2 4.7 1 1 7.3 15.5 11.4 20.2 3.6 4 4.2 5 6 6 18.8 10.3 45.7 5.3 52-1 7.8-7.8 9-19 12-26.8 2.5-6 6.2-7 6.5-7s0-9.7-.3-10.4M71 46c-3.3 2.5-9.6 9-28.3 8.8s-26-11-28.3-21.6c-2-9.6-2-12.8-1-16.3.2-1.2 2.2-9.2 14-10.4s38.5-2.8 49 6-2 30.6-5.6 33.4M181 33.2c-2.3 10.5-9.6 21.5-28.3 21.6s-25-6.3-28-8.8c-3.8-2.8-16-24.7-5.6-33.4s37-7 49-6S181.8 16 182 17c1 3.4 1 6.6-1 16.2", className: "frame" }),
			_react2.default.createElement("path", { d: "M188 3.3C173.6 1 148-.5 137.7.5 111.8 3 112.2 9 108 11a11.3 11.3 0 0 1-3.4 1 52.6 52.6 0 0 1-7 .3c-3.3 0-6.5-.2-7-.3a10.8 10.8 0 0 1-3.3-1C83 9 83.5 3 57.6.6c-10.3-1-36 .6-50 2.8-1.7 6-1.6 14-1 15 .8 1.5 1 5.6 2.3 6s4 3 4 4.3S16 41.3 16.5 42a25.6 25.6 0 0 0 14.7 11.4c2.3.6 28 6.6 41.8-7.7 1.3-1.2 10.6-16 12-18.8 1-2 2.8-8.8 4-9.5 2-1 5.2-1.7 8.7-1.7s6.7.6 8.6 1.7c1.3.7 3 7.4 4 9.5 1.5 2.6 10.8 17.5 12 18.7C136 60 161.8 54 164 53.4A25.6 25.6 0 0 0 178.8 42c.4-.6 3.8-12 3.7-13.3s2.6-3.8 4-4.3 1.5-4.6 2.3-6c.6-1.3.6-9-1-15M71 46c-3.2 2.4-8.7 9-27.8 8.8s-26.5-11-29-21.5c-2-9.6-2-12.8-1-16.3.4-1 2.4-9 14.4-10.3s38-3 49 6C86.5 21 74.5 43 71 46m110-12.8c-2.4 10.6-9.8 21.5-28.8 21.6s-24.5-6.2-27.7-8.7c-3.7-2.8-16-24.7-5.4-33.5s36.6-7 48.7-5.8S181.7 16 182 17c1 3.5 1 6.7-1 16.2", className: "shadow" })
		);
	};

	var TopOne = function TopOne() {
		return _react2.default.createElement(
			"g",
			{ id: "top-one", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M192.5 19.7l-20 55s-3.4 16.2-3 17.6-1.2 2.8-1.2 2.8-2-.5-2-1.3-1.2-3.4-1.2-4.3 3.2-21.6 4.4-24.4l19.8-46.4z", className: "frame" }),
			_react2.default.createElement("path", { d: "M168.8 92.6c-1.4.3-1.8-2-2-2.8s2-10.2 2.3-14c2-6 22.2-56.5 22.2-56.5l1.3.4-19.4 53c-.6 2-3.3 16.8-3.4 17.6a10.4 10.4 0 0 1-.8 2.3z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M3.2 19.7l20 55s3.3 16.2 3 17.6 1 2.8 1 2.8 2-.5 2-1.3 1.3-3.4 1.3-4.3-3-21.6-4.3-24.4L6.4 18.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M27 92.6c1.2.3 1.7-2 2-2.8s-2-10.2-2.5-14c-1.8-6-22-56.5-22-56.5l-1.3.4 19.3 53c.8 2 3.5 16.8 3.5 17.6a10.4 10.4 0 0 0 1 2.3zM12.4 15.4c1-1 5-6.8 12-9C35.2 3 51 3 59.5 3.4c13 1 24.6 5 25.3 10 3.7-1 0-7 0-7S31-10.3 11 13.3c-4.2 5 1.4 2 1.4 2zM183.2 15.4c-.8-1-5-6.8-12-9-10.7-3.3-26.4-3.5-35-3-13 1-24.6 5-25.3 10-3.8-1 0-7 0-7s53.8-16.7 73.7 7c4 5-1.5 2-1.5 2z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M192 13l-10.6-.6a19.3 19.3 0 0 1 2.4 6.3c1.2 6.4-.3 15.6-1 17-.3 1-2.4 7-8.3 9.7S157 48 152.5 48c-10 0-20-2.2-26.7-6-7.4-4.4-16-18-15.3-27a8.3 8.3 0 0 1 2-4.7 125.5 125.5 0 0 0-15.2 1 121.3 121.3 0 0 0-14.3-1 8 8 0 0 1 2 4.7c.6 8.8-8 22.6-15.2 27C63 45.6 53 48 43 48c-4.5 0-15.8 0-22-2.7a18.5 18.5 0 0 1-9-8.7c-.7-1.4-2.6-11.6-1.3-18a20 20 0 0 1 2-6.2l-10 .6L0 15.8l1.5 4c2.2-.6 4-1.2 4-.5S5 37 10.2 43s15 9.4 31 10c19.5.4 25.8-4 29-5.6a41 41 0 0 0 14.8-14.8c4.5-8 6.4-11 7.8-13.4h.2a6.6 6.6 0 0 1 4.6-3c1.6 0 3.2 1 4.7 3h.2c1.4 2.3 3.4 5.6 7.8 13.4a42 42 0 0 0 15 14.8c3 1.6 9.3 6 29 5.5 15.8-.6 25.7-3.8 30.7-10s4.4-23 4.5-23.6 2 0 4 .5l1.6-4z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M193.4 5.4c-5.5-1.2-58-10.8-85.3-1a12.2 12.2 0 0 1-1.3.3h-.5a44.4 44.4 0 0 1-17.6 0H88a14.2 14.2 0 0 1-1.3-.4C59.5-5.4 7 4.3 1.4 5.3 2 7.8 0 15.4 0 16s4.5 0 4.5 0a8.4 8.4 0 0 1 1 2.8c0 1 0 18.6 6.5 24 12.3 10.3 49.7 12 63.5-1.8 7-6.8 13.4-18.3 15.4-22a9.2 9.2 0 0 0 .7-1 6.6 6.6 0 0 1 11.5 0l.7 1c2 3.7 8.5 15.2 15.3 22 13.8 13.7 51.2 12 63.5 1.8 6.4-5.4 6.4-23 6.4-24a8.7 8.7 0 0 1 1-2.8s4.4.4 4.6 0-2-8-1.4-10.4zm-124 36.4c-6.6 4-16.6 6-26.7 6-4.5 0-15.8 0-22-2.6s-8-8.8-8.3-9.6c-.7-1.4-2.2-10.7-1-17s5.5-10.3 7-11c10-6 37.2-7.5 53.3-3.6 4 1 12.6 4.5 13 11 .6 8.8-8 22.5-15.2 26.8zM183 35.6c-.5 1-2.6 7-8.4 9.7s-17.5 2.5-22 2.5c-10 0-20-2-26.8-6-7.3-4.3-15.8-18-15.2-26.8.4-6.4 9-10 13-11C139.6.3 167 1.6 177 7.6c1.4.8 5.5 4.5 6.8 11.2s-.2 15.6-1 17z", className: "frame" })
		);
	};

	var TopTwo = function TopTwo() {
		return _react2.default.createElement(
			"g",
			{ id: "top-two", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M193.5 20l-6.2-1.2s-19.6 70-20 71.7S165 116 165 116s.7 4.5 1 5 2.7 1 2.7 1 2-28.2 3.4-32c.8-1.8 21.5-70 21.5-70z", className: "frame" }),
			_react2.default.createElement("path", { d: "M172.6 90.8c-.3 1-3.8 30.6-3.8 30.6s-1.7.3-2.2 0 3-31.5 3-31.5S191 20 191 19.2s3.5.7 3.5.7-21.4 68.7-22 70.8zM0 14.5L1.8 20l5-1.3-3.4-5-3.4.8", className: "shadow" }),
			_react2.default.createElement("path", { d: "M2.7 20L9 18.7S28.4 89 28.7 90.5s2.4 25.6 2.4 25.6-.7 4.4-1 5-2.7 1-2.7 1-2-28.3-3.4-32L2.8 20z", className: "frame" }),
			_react2.default.createElement("path", { d: "M191 19.5s-3.7 10.2-6.4 16.6-25.3 5-31.2 5.6-20.2-3-21.6-3.2-14.2-9-14.2-9L107 14.6l-.4-.3-.8-9-7.6 4.3-7.6-4.3-.8 9-.5.3-10.6 14.8s-12.8 8.8-14.2 9S48.8 42 43 41.6s-28.5 1-31.3-5.4-6.4-16.7-6.4-16.7c0 3-.6 15.3 3 18.4s14 9.5 35.7 8.2c14.7-1 26.4-4.8 35.5-11.3 6.4-4.7 11.7-18.4 18.7-18.4s12 13.6 18.6 18.3c9.2 6.3 20.8 10.3 35.6 11.2 21.5 1.3 32.3-5.3 35.8-8.4s3-15.4 2.8-18.3z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M23.7 90.8c.3 1 3.8 30.6 3.8 30.6s1.7.3 2 0-3-31.5-3-31.5S5.3 20 5.2 19.2 2 20 2 20s21.3 68.7 22 70.8zM196.2 14.5l-1.7 5.5-5-1.3 3.3-5 3.4.8M40.8 3.8C68 1.3 78 5.4 82.2 8.4s3.6 4.8 2.8 7.2 2-7.2 2-7.2l-10-5L49 1 29.6 3 14.3 8.7l-5.7 7v11l5.7 9.7a26 26 0 0 1-2.5-7.3 38.7 38.7 0 0 1 0-11c.8-5.2 4.7-12 29-14.4zM155.4 3.8c-27.3-2.5-37 1.6-41.4 4.6s-3.6 4.8-2.8 7.2-1.8-7.2-1.8-7.2l9.7-5L147.4 1l19.2 2L182 8.7l5.5 7v11l-5.6 9.7a26 26 0 0 0 2.4-7.3 38.7 38.7 0 0 0 0-11c-.8-5.2-4.7-12-29-14.4z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M194 6a27 27 0 0 1-9.5-.3c-1.4-.3-3-1.4-9.7-3-3.6-.8-30-3.8-45-2.2-4.5.4-9.2.5-15.8 2.7a60.2 60.2 0 0 1-16.2 2.6 54.4 54.4 0 0 1-15.6-2.6C75.6 1 71 1 66.6.5 51.4-1 25 1.8 21.6 2.7c-7 1.6-8.4 2.8-9.8 3a27 27 0 0 1-9.5.3L0 14.5a4.6 4.6 0 0 1 2.2 0c1 .3 3 2.6 3 4.8s0 10 .3 11.2c.6 2 4.3 8 11 10.2a77.5 77.5 0 0 0 23 3.3c10.7 0 22.3-2.7 29.8-6.4 13-6.3 19.3-18 22.5-22 5-5.3 8.4-5.8 12.6 0 3.2 4 9.5 15.6 22.6 22 8.3 4 22.5 6.5 34 6.4a61 61 0 0 0 18.6-3.3c7-2.3 10.6-8 11-10.2.5-1.3.5-9 .5-11s2-4.6 3-5a4.6 4.6 0 0 1 2.2 0zM75.2 31a38.5 38.5 0 0 1-15 7.6c-12.4 2.4-37.8 4.2-46.2-4-4.6-4.5-4-7-4.2-10.4 0-2.2-1-10.4 6.7-14.7A54.4 54.4 0 0 1 31.2 4C46.6 1 69 .7 81.4 6.5c6 2.7 5 15-6.2 24.4zM186 24c0 3.5.5 6-4.2 10.4-8.4 8.2-33.7 6.4-46.2 4a38.8 38.8 0 0 1-15-7.6c-11-9.6-12.2-21.7-6.2-24.5C126.8.5 149.2.8 164.6 4a54 54 0 0 1 14.7 5.5c7.6 4.3 6.8 12.5 6.7 14.7z", className: "frame" })
		);
	};

	var TopThree = function TopThree() {
		return _react2.default.createElement(
			"g",
			{ id: "top-three", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M2.4 16l7.4-.3 15.4 83s2 11.2 2 16.6.7 14.5.3 16a35.5 35.5 0 0 1-2.3 5.6 19.3 19.3 0 0 1-2.5-.2l-1-23L2.5 16z", className: "frame" }),
			_react2.default.createElement("path", { d: "M22.7 137H25l-1.3-23.6C23.7 111.4 5 16 5 16H2.3s19.3 97 19.3 97.6c.2 2 1 23.3 1 23.3z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M193.7 16l-7.5-.3-15.3 83s-2 11.2-2 16.6-.8 14.5-.4 16a35.5 35.5 0 0 0 2.3 5.6 19.3 19.3 0 0 0 2.3-.2l1-23L193.6 16z", className: "frame" }),
			_react2.default.createElement("path", { d: "M173.4 137H171l1.3-23.7c.2-2 19-97.3 19-97.3h2.4s-19.3 96.8-19.4 97.5l-1 23.4z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M189.3 16.3l5-.3.7-3.8-5.5-.6-.2 4.7M5.7 16.3l-5-.3-.7-3.8 5.5-.6.2 4.7M189.3 21.3c-1 3-3.8 7-5 7.6-2 1-9.5 4-20.3 4-6 .2-19.2 0-29.6-2a53.5 53.5 0 0 1-16.4-6.4c-4-2.4-14.5-13.3-15.8-14.5a6.7 6.7 0 0 0-4.7-1.7 8.3 8.3 0 0 0-4.3 1.3c-1.5 1-12.2 12.6-16.2 15A53.5 53.5 0 0 1 60.5 31C50.2 33 37 33.2 31 33c-10.8 0-18.3-3-20.4-4-1-.6-4.8-6.4-4.8-6.4-.6-1.6-.5 3.8 0 5.5a9.3 9.3 0 0 0 5 5c2 1 9.4 4 20 4.2 6.2.2 19.4 0 29.7-2A53.5 53.5 0 0 0 77 28.7c4-2.4 14.5-15 16.2-16.2a7.7 7.7 0 0 1 4.3-1.3 7.3 7.3 0 0 1 4.7 1.8c1 1 11.7 13.3 15.8 15.7a53.5 53.5 0 0 0 16.4 6.5c10.4 2 23.6 2.2 29.6 2 10.8-.2 18.2-3 20.3-4a9.3 9.3 0 0 0 4.8-5c.6-1.8 1-8.6.3-7z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M192 4.8S164.7.8 150.5 0c-18-.6-37 1.6-41.5 2.6a102 102 0 0 1-11.5 1.7c-3.3 0-10-1.4-11.5-1.7-4.4-1-23.4-3.2-41.5-2.5C30.5.8 2.8 5 2.8 5L0 12l4 .2s1 1 1 3.7.3 7 1 8.7a9.3 9.3 0 0 0 4.6 5c2 1 9.5 4 20.3 4 6 .3 19.2 0 29.5-2A53.5 53.5 0 0 0 77 25.4c4-2.4 14.5-13.8 16.2-15A7.5 7.5 0 0 1 97.4 9a7.3 7.3 0 0 1 4.8 1.8c1 1 11.7 12 15.7 14.5a53.5 53.5 0 0 0 16.4 6.4c10.3 2.2 23.5 2.3 29.6 2 10.7 0 18.2-3 20.3-4a9.3 9.3 0 0 0 4.7-5c.6-1.6.5-5.8.7-8.8s1.4-4 1.5-4h3.6L192 5zM85.5 11.2c-8.7 20.5-37.3 20.5-43.2 21-11.3 1-26.2.5-30.7-6.3-1.2-2-3.7-15.6 6.4-19.6C38.5-2 90.2-.2 85.3 11.2zM184 26c-4.5 6.6-19.4 7.3-30.7 6.2-6-.5-34.5-.5-43.2-21-4.7-11.4 47-13 67.7-4.8 10 4 7.5 17.7 6.3 19.5z", className: "frame" }),
			_react2.default.createElement("path", { d: "M18 5.6a11.4 11.4 0 0 0-6.7 7.8 11 11 0 0 1 6-5.8c20.2-8 69.6-6.7 68 4l.3-1C90.6-1 38.8-2.8 18 5.5zM177.4 5.6a11.4 11.4 0 0 1 7 7.8 11 11 0 0 0-6.2-5.8c-20.2-8-69.6-6.7-67.8 4l-.5-1c-5-11.6 46.7-13.3 67.4-5z", className: "shadow" })
		);
	};

	var BottomOne = function BottomOne() {
		return _react2.default.createElement(
			"g",
			{ id: "bottom-one", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M4 31.3S28.5 2 29.6 1.6A5.5 5.5 0 0 1 34 2a26.4 26.4 0 0 1 4 4.7c.6.8.5-2.8.5-2.8S32-1 29.5 0 0 32.4 0 32.4z", className: "frame" }),
			_react2.default.createElement("path", { d: "M12 29.5s17-23 18-24.2 3-3 4.3-1S35.8 7 36 7s2.5.2 2.5-.4a8.2 8.2 0 0 0-.7-2.2S33.6 0 30.3 1c-1.6.3-27 29.3-27.2 30s9-1.5 9-1.5z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M194.3 31.3S169.5 2 168.5 1.6a5.5 5.5 0 0 0-4.4.4 26.4 26.4 0 0 0-4 4.7c-.5.8-.4-2.8-.4-2.8s6.5-5 9.2-3.8S198 32.4 198 32.4z", className: "frame" }),
			_react2.default.createElement("path", { d: "M186.3 29.5S169 6.5 168 5.3s-2.7-3-4-1-1.6 2.7-2 2.7-2.3.2-2.3-.4a8.2 8.2 0 0 1 .6-2.2S164.6 0 168 1c1.5.3 27 29.3 27 30s-8.7-1.5-8.7-1.5z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M196.3 29.7s-32-3-40.7-3c-17 0-31.5 3.2-45.6 8-1.3.5-2.5.8-3.7 1l-.5.2-1 .2a26 26 0 0 1-11.5 0l-1-.3-.5-.2-3.7-1c-14-5-28.5-8.2-45.4-8.2-9 0-40.8 3-40.8 3L0 32.5S2 36 9.8 34c27.6-7.5 65.8-.5 68.5.4s14.6 4.4 16 5.3c.6.3 2.5.2 4.8 0 2.3.2 4.2.3 4.8 0 1.5-1 13.3-4.5 16-5.3s41-8 68.5-.5c8 2 10-1.6 10-1.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M194.3 32c-8-1-28.8-3.3-39-3.3-23.5 0-36.2 6.7-52.4 10a25 25 0 0 1-8.5 0c-16.2-3.4-28.8-10-52.3-10C32 28.7 11 31 3.2 32l-3.2.4v10.2s4.2-1.3 6.3-.2 5.7 18.8 8.2 23S24.5 77 40.8 78s34.5-1.8 40-8.6c5.4-6.5 11.5-18.5 12.3-20V49a1.4 1.4 0 0 0 .4-.4 6.5 6.5 0 0 1 5.3-3.5c2 0 4 1.3 5.2 3.5a1.4 1.4 0 0 0 .2.4c.8 1.7 7 13.8 12.2 20.2 5.7 6.8 24 9.7 40.2 8.6s23.8-8.5 26.2-12.5 6-22 8.2-23 6.3.2 6.3.2V32.4zm-116 34.7C65.2 81.7 26 76 20 66c-1.8-3-8.3-12.8-6.4-23.2.4-2.4 3-8.3 9-9.5s38-5.5 56.8 4.7c3.2 1.8 12.8 13.2-1 28.7zm98.8-.8c-5.7 10-45 15.7-58.3.7-13.8-15.5-4.3-27-1-28.7 18.8-10.2 50.8-6 56.7-4.8s8.7 7.2 9 9.6c2 10.4-4.6 20-6.3 23z", className: "shadow" })
		);
	};

	var BottomTwo = function BottomTwo() {
		return _react2.default.createElement(
			"g",
			{ id: "bottom-two", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M198.6 71L173.4 8c-1.5-4-7.8-7.5-12-8-1.6-.2-.6 4 .2 4s5.3 2 6 3.6 22.7 64.7 22.7 64.7z", className: "frame" }),
			_react2.default.createElement("path", { d: "M160.6 1c2.3.4 7.7 3.2 10 6S196 71 196 71l2.5.2S181.2 24 173 7.2c-1-1.7-3-3.5-5.4-5a16.6 16.6 0 0 0-6-2c-1-.5-1 1-1 1z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M.4 71l25-63c1.6-4 8-7.5 12.2-8 1.5-.2.5 4-.3 4s-5.3 2-6 3.6S8.6 72.3 8.6 72.3z", className: "frame" }),
			_react2.default.createElement("path", { d: "M38.4 1c-2.4.4-7.7 3.2-10 6S2.8 71 2.8 71l-2.4.4S17.8 24 26 7.2c.8-1.7 3-3.5 5.3-5a16.6 16.6 0 0 1 6-2c1-.5 1 1 1 1z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M197.2 69.6c-1 0-22.8-4.4-44.2-3.3-16.8 1-35.2 7-39.8 8.5s-11.3 2-15.3 2a43.8 43.8 0 0 1-12.5-2c-4.6-1.4-23-7.5-40-8.4-21.3-1-43.3 3-44.2 3L0 71s38.5-1.5 51.7.4c19 2.8 42.5 9 47.8 9a71.8 71.8 0 0 0 19-2.7 170.3 170.3 0 0 1 30-6.8c11.8-1.4 50.2 0 50.2 0zM14.2 79.5c.3 4.3-.4 22 19.7 29.2 9.7 3.6 29.6 4 39.6-.3 9.6-4.2 12.6-15.7 12.6-18.5.2-6-3-8.7-3-8.7s5.2 6.3 4 12c-1.3 7.3-8.2 14.8-13.5 17-12.2 5-30.7 3-38.4.5-7.2-2.3-16.7-9-20.3-17.2-2.6-6-.8-14-.8-14zM184.5 79.6c-.3 4.4 1 21.5-19 29-10.2 3.5-30 4-39.7 0-9-4-12.4-14.7-12.5-17.4a23 23 0 0 1 1.4-9.5s-4 6-2.8 11.8c1.2 7 8 14.6 13.4 16.8 12.3 5 30.8 3 38.4.5 7.3-2.3 16.8-9 20.3-17.2 2.8-6 .5-14 .5-14z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M153 69c-16.8.8-35.2 7-39.8 8.4a56 56 0 0 1-14 2 47 47 0 0 1-13.7-2c-4.7-1.5-23-7.6-40-8.5C24.3 67.8 1 71 0 71l2 9.6a7 7 0 0 1 3.6.5c1.3.8 2.6 3 3 4s9.3 18 14.6 21.6c9 6 35 14.4 57 1.6 4.3-2.6 13.5-17.5 14.3-19a2.5 2.5 0 0 1 .3-.3 7 7 0 0 1 4.5-1.8 6.7 6.7 0 0 1 4.5 1.7 2.5 2.5 0 0 1 .3.3c1 1.4 10 16.3 14.4 19 22 12.7 48 4.2 57-1.7 5.4-3.5 14-21 14.6-21.7s1.8-3.2 3-4a7 7 0 0 1 3.6-.4l2-9.5c-.8 0-24.2-3.2-45.5-2zm-77.6 39.3c-8.6 4.8-30.6 5.2-41.3 1.4-3-1-9.3-5-12.2-8-4-4-6-10.4-6.5-11.3a19 19 0 0 1-1-10.3c.6-1.4 1-5.4 10.7-7.6 3.7-.8 24.3-.8 35 1.3s20.4 4.8 24.7 10c6.4 7.6-3.7 21.4-9.3 24.5zm108.4-18c-.3 1-2.4 7.3-6.5 11.5-3 3-9.3 6.5-12.3 7.6-10.7 3.8-32.7 3.7-41.3-1-5.6-3.3-15.8-17-9.3-24.7 4.3-5 13.8-8 24.6-10s31.4-2 35-1.3c10 2.2 10.2 6.2 10.6 7.7a18.7 18.7 0 0 1-.8 10.4z", className: "frame" })
		);
	};

	var BottomThree = function BottomThree() {
		return _react2.default.createElement(
			"g",
			{ id: "bottom-three", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M89.8 129.3c-.5 2.3-3.4 7.2-9.3 9.2-19 6.4-44.8.2-50.8-1.6-3.3-1.2-11-5.4-13-10.6a17.2 17.2 0 0 1-1.6-5c0 1.5.2 3.5 1.6 6.5 2.2 5 9.8 9.3 13 10.3 6 2 32 8 51 1.7a14.6 14.6 0 0 0 9.2-9.2 3.6 3.6 0 0 0 0-1.6zM113.6 129.3c.6 2.3 3.4 7.2 9.4 9.2 19 6.4 44.8.2 50.8-1.6 3.3-1.2 10.8-5.4 13-10.6a17.2 17.2 0 0 0 1.6-5c.2 1.5 0 3.5-1.5 6.5-2.4 5-10 9.3-13.2 10.3-6 2-32 8-50.8 1.7a14.6 14.6 0 0 1-9.4-9.2 3.6 3.6 0 0 1 0-1.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M.5 115.7c.8-3.2 21-101.3 21.3-102s1.5-6.2 5.3-9.5 6-4 6-4 1 2.7.5 3.3-5.3 5-6 6.2-3.3 8.8-3.4 10.6S8 115 8 115z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M.5 115.7S21.2 15.3 21.7 14.4 23.5 7 27 4a41 41 0 0 1 6-4l.2.8s-6 4.4-7 6.3-2.5 5.8-3 8L2 115.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M201.7 115.7c-1-3.2-21-101.3-21.3-102S179 7.6 175 4.3s-5.8-4-5.8-4-1 2.7-.5 3.3 5.3 5 6 6.2 3.3 8.8 3.4 10.6 16 94.7 16 94.7z", className: "shadow" }),
			_react2.default.createElement("path", { d: "M201.6 115.7S181 15.3 180.6 14.4 178.5 7 175 4a41 41 0 0 0-5.7-4l-.3.8s6 4.4 7 6.3 2.5 5.8 3 8l21 100.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M88.3 123c2.7 1 7.7 1.3 12.7 1.4s10-.4 12.7-1.4c17.2-6.4 80.2-8.5 88.4-6.6l-.3-2c-8.2-2-70.8-1.2-88 5-2.7 1-7.6 1.5-12.7 1.5s-10-.5-12.7-1.5C71.3 113 8.7 112 .5 114c-.3 2.3-.5 2.3-.5 2.3 8.2-2 71.2.3 88.3 6.7z", className: "frame" }),
			_react2.default.createElement("path", { d: "M113.7 122.8c-2.6 1-7.6 1.3-12.7 1.3s-10-.2-12.6-1.2C71.2 116.4 8.2 114.2 0 116l2.3 5.6s4.5 0 5 1 11.5 12.6 12 13c5 4.5 33.2 11.8 54.2 8.3 1-.2 11.2-3 14.6-6.7 3-2.4 5.6-5.2 6.4-6a10 10 0 0 1 13.4 0c.8.8 3.4 3.5 6.3 6 3.5 3.8 13.8 6.5 14.7 6.6 21 3.4 49.2-4 54-8.3.7-.5 11.5-12 12-13s5.2-1 5.2-1l2.2-5.6c-8.3-1.8-71.3.4-88.5 6.8zm-24.3 8c-.6 2.2-3.4 7-9.2 9-18.7 6.2-44.4 0-50.4-1.7-3.3-1-10.7-5-13-10-3-7-1-8.5 1.3-9 16-3.3 46.5.4 55.2 2.4 8.3 1.8 17.4 4.4 16.2 9.4zm97.3-2.8c-2.2 5-9.7 9.2-13 10.2-6 1.8-31.6 7.8-50.3 1.6-5.8-2-8.6-6.7-9.2-9-1.2-5 8-7.5 16.2-9.4 8.7-2 39-5.6 55-2.3 2.3.6 4.4 2.2 1.3 9z", className: "shadow" })
		);
	};

	var LeftOne = function LeftOne() {
		return _react2.default.createElement(
			"g",
			{ id: "left-one", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M215.6 24c-.7-1.4-6-4-8.2-3.8s-8.7-1.8-11-3c-2-5-1.8-13-1.8-13s17 5 21.2 10-.2 9.7-.2 9.7zM7 18.7c6.3.7 12.3 2.3 20.8 3 14 1 30 1 32.4 2.2 4 1.6 23 24 24 24.3s3 1 3.2.3 3.8-4.2 3-6-25-22.2-25.7-22.5-53-13-53-13z", className: "frame" }),
			_react2.default.createElement("path", { d: "M216.3 22c-1.2 3.4-11.6 27.7-12.3 28a6.3 6.3 0 0 1-3-.6c-.3-.3-1.6-3.4-1.3-4.5a139.4 139.4 0 0 1 6.7-13.7c1-1.4 5-9.7 4.5-11s5.3 1.6 5.3 1.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M0 18c2.4 1.3 4.4 5 4.7 7S7 38.5 11.3 46c5.4 9.3 29 13 42.3 9.3 12-3.2 20.2-14.5 20.7-15s8-16.5 9.8-17.8a11.8 11.8 0 0 1 12.8-.8c3 1.6 3.7 7.2 11.3 20.3S140 60 157 57.8s23-10 24.6-12.2c.7-1.2 8.2-22.8 8.5-24s7.2-5 7.2-5 1.6-11-.2-11.6C181.2-1 146.2-.3 131.2.6c-16.5 1-24 5.6-29.3 10.6-2.3 2.2-11.4 2-17.5 1.6-5.3-.2-7-3-13.8-6.6C54.7-2.6 10 2.2.4 7.4 0 7.4 0 16.4 0 18zm115.4-7.7c11-5.5 33.7-4.5 47-4.2s17.3 7.2 18.2 9c3 6.2 1 18-4 30s-45.5 16-58.2 2c-16-17.2-14-31.2-3-36.7zm-103 1.3C28 2.3 66 6.6 71.4 16c2.2 3.5 1.8 20.2-8.3 31S28 55.5 19.2 49 6.2 15 12.3 11.5z", className: "shadow" })
		);
	};

	var LeftTwo = function LeftTwo() {
		return _react2.default.createElement(
			"g",
			{ id: "left-two", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M52.7 23c-3-.5-50.4-5.2-50.4-5.2l5.2-9L52 13.5l20.5 4.4s13.5 2 14.5 2.5 30.7 22.2 30.7 23.3-2 5.6-4 5.4-26-23.5-28.4-24-25.8-4-27.4-3.5L52.6 23z", className: "frame" }),
			_react2.default.createElement("path", { d: "M84 13.2c-1 2-1.3 34 11.4 39.2-9.4-4.3-14.8-14.7-16-16S77.2 18 77.4 16s10-9.6 10-9.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M0 18.8A26.2 26.2 0 0 1 1.8 21C3.8 22.6 4 39 9 47.6s20.5 10 25.8 9.2c3-.6 11.7-7 15.5-9.2 4.2-2.7 12.3-23 14-24.7S72 21 73 23c2 4.3 3.5 14.2 12.6 25.2 6 7.3 21.2 12.5 39.8 10.6s22.2-17 22.4-18.5 5.8-16.8 9-20 10-5.2 12.8-3.8 43 5 45.4 5a5 5 0 0 1 4.3 3c.3.7-2.3 17.7-2.5 18.6a42.4 42.4 0 0 0 .2 7.8c.3.8 2.7 1.2 3.4 0s2.2-30.7 1.8-33c-3.7-3.8-48.6-11.3-49-11.7s-5.4-.5-5.4-.5a67 67 0 0 1-7-1.8C150.4 0 107-3 85 5c-3.3 1.2-5 4.3-9.3 6.4a21.8 21.8 0 0 1-6.8 2c-10 1.5-11.3-2.8-13-4-22-15.2-55-2-55-2zM84.2 13c2.4-3.8 26.6-11 45-7.7S144.8 20 145 21.8c.4 21-8.8 30-10 30.6a19 19 0 0 1-6.5 3c-7.4 1.4-26.8 3-38-7-7-6.2-10-15.8-10-22-.2-7.6 2.3-11.2 3.7-13.3zm-77 .7c12.2-12.7 42-4.3 44.3 3 0 0 3.8 11.2-4.5 25.5-9 15.7-21.7 12.6-30.5 8S4 17 7.2 13.7z", className: "shadow" })
		);
	};

	var LeftThree = function LeftThree() {
		return _react2.default.createElement(
			"g",
			{ id: "left-three", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M97.4 21.7c-3.4-1.2-45.7-2.5-45.7-2.5l-22.5-.6a48.6 48.6 0 0 0-6.6-1L2.8 16l2.5-8.6 14.6.8 82 9.7s29.3 21 29 21.8-2 5-3 5.7a2.3 2.3 0 0 1-2.3.2c-.5-.3-25-23-28.3-24z", className: "frame" }),
			_react2.default.createElement("path", { d: "M12.2 6.8c-3 2.4-10.7 18.6-4.6 35.7-2.4-2-3.8-7.4-3.8-7.4S1.5 12.7 2.5 10.8s9.7-4 9.7-4zM65 5.2c-4.3 1.5-13 6.3-13 11.5 0 2.5 2 5 2.5 7.3.2.6 1.7 10 1.4 11.2s2.4 9.3 3 10.6-2 .5-2.3.4-5-7-5.3-8-3.8-17-3.8-18.6 1.2-8 2.6-9.2S65 5.2 65 5.2z", className: "frame" }),
			_react2.default.createElement("path", { d: "M2.7 38.2c3.2 6.2 7.2 13 11 13 1.6 0 9.7.3 13-3S41.2 30.7 40 20c2.6.4 5-.3 7.2 8.4s2.4 16 16 24.2c15 8.8 33.4-4 34.8-5.7s6.2-15.7 6.7-20.3 2.8-13.5 17.3-12.3l41.4 3.5s41.4 2 42 3l.8 1s5.4 20.2 5.3 21 0 6 1.6 6.5 2.5 0 2.6-.3 2-7 1.6-7.8-6.6-23.7-7.2-24c-2.3-1.8-72.6-13-79-12.6-2.4.2-8 0-8 0a132.3 132.3 0 0 1-17-3.3c-1.7-.6-43-3.5-50.3 1s-9 9.8-11 9.8-7.7.5-8 .2-5-6-7.3-7c-6.6-2.3-12.7-3-20.8-1.4S0 10 0 10s-.6 21.8 2.7 28.2zM57 8.2c18-8 36.4-3 40.2 5.3s-2.6 29-4.7 31.6c-7.5 9.4-25 10-32.8 1.8s-8.3-13.4-10.2-21S52 10.4 57 8zM5 11.4c5.6-7.3 20-4.7 24 2.6s-.7 20-1.3 22c0 0-4.6 15.6-13.6 13S-.4 19 5 11.6z", className: "shadow" })
		);
	};

	var RightOne = function RightOne() {
		return _react2.default.createElement(
			"g",
			{ id: "right-one", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M2 14.2c4-5 21-10 21-10s.3 8-1.7 13c-2.3 1.2-9 3-11 3S2.6 22.6 2 24c0 0-4.4-5 0-9.8zM206 7S153.5 20 153 20s-25.3 21-26 22.7 3 5 3.2 6 2.3 0 3.2-.4 20-22.8 24-24.4c2.4-1 18.5-1.3 32.4-2.4 8.4-.6 14.5-2.2 21-3z", className: "frame" }),
			_react2.default.createElement("path", { d: "M6.7 20.4c-.4 1.2 3.5 9.5 4.5 11A139.4 139.4 0 0 1 18 44.8c.3 1-1 4-1.4 4.4a6.3 6.3 0 0 1-3 .5c-.7-.3-11-24.6-12.2-28 0 0 5.7-2.8 5.3-1.6z", className: "frame" }),
			_react2.default.createElement("path", { d: "M217.2 7.4c-9.7-5.2-54.4-10-70.3-1.2-6.8 3.7-8.6 6.4-14 6.6-6 .3-15 .6-17.3-1.6-5.2-5-12.8-9.5-29.3-10.6-15-1-50-1.6-65.8 4.4-1.8.7-.2 11.5-.2 11.5s7 4.2 7.3 5.2 7.8 22.7 8.6 24c1.4 2.2 7.5 10 24.5 12S102 55.2 109.6 42s8.4-18.7 11.2-20.3a11.8 11.8 0 0 1 12.7.7c2 1.3 9.3 17.2 9.8 17.8s8.7 12 20.7 15c13.2 3.6 37 0 42.3-9.2 4.4-7.4 6.2-19.3 6.5-21s2.3-5.7 4.8-7c0-1.6 0-10.5-.4-10.6zm-115 3c11 5.4 13 19.4-3 36.7-12.7 14-52.8 9.7-58-2S33.8 21 36.8 15c1-2 4.6-8.5 18-9s36.2-1.2 47.2 4.3zm103 1.2c6 3.6 2.3 31-6.6 37.5s-34.2 8.4-44.2-2.2-10.4-27.3-8.3-31c5.7-9.3 43.7-13.5 59.2-4.3z", className: "shadow" })
		);
	};

	var RightTwo = function RightTwo() {
		return _react2.default.createElement(
			"g",
			{ id: "right-two", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M164.3 21.5c-1.5-.6-25 2.8-27.4 3.4s-26.3 24-28.3 24-4.2-4.4-4.2-5.5 29.8-22.8 30.8-23.2 14.5-2.5 14.5-2.5l20.3-4.4L215 9l5 8.8s-47 4.7-50.3 5.3l-5.2-1.5z", className: "frame" }),
			_react2.default.createElement("path", { d: "M135 6.4s9.8 7.6 10 9.7-1 19-2 20.3-6.8 11.8-16.2 16c12.7-5.2 12.4-37.2 11.4-39z", className: "frame" }),
			_react2.default.createElement("path", { d: "M221.6 7.5s-33-13.3-55 2c-1.7 1-3 5.4-13 4a21.8 21.8 0 0 1-7-2c-4.2-2.2-6-5.3-9.2-6.5-22-8-65.5-5-76-1.3a67 67 0 0 1-7 1.8s-5 .3-5.3.6S4 14 0 18c-.3 2.3 1 32 1.8 33s3 .8 3.4 0a42.4 42.4 0 0 0 .2-7.7C5.2 42 2.6 25.3 3 24.5a5 5 0 0 1 4.2-3c2.5 0 42.6-3.4 45.5-5s9.8.6 13 3.8 8.5 18.4 8.8 20 3.8 16.6 22.3 18.6 33.8-3.3 39.8-10.6c9-11 10.8-21 12.8-25 1-2 6.7-2 8.5-.4s9.8 22 14 24.7c3.7 2.4 12.3 8.7 15.5 9.3 5.2.8 21-.7 25.8-9.3s5.2-25 7-26.5a26.2 26.2 0 0 1 2-2.2zm-80 19c0 6-3 15.7-10 22-11 9.7-30.5 8.3-38 6.8a19 19 0 0 1-6.5-3C86 52 77 43 77.5 22 77.4 20 74.6 8.5 93 5.3s42.6 4 45 7.8c1.4 2.2 4 5.8 3.7 13.5zm73.5-12.8c3.2 3.3-.3 32-9.2 36.5s-21.5 7.8-30.6-8c-8.3-14.3-4.4-25.5-4.4-25.5 2.3-7.3 32-15.7 44.2-3z", className: "shadow" })
		);
	};

	var RightThree = function RightThree() {
		return _react2.default.createElement(
			"g",
			{ id: "right-three", className: "glasses", transform: transformation },
			_react2.default.createElement("path", { d: "M91.5 45.8a2.3 2.3 0 0 1-2.4-.3c-1-.6-2.7-5-3-5.7s29.3-22 29.3-22l82-9.6 14.6-.8s3.6 8.7 2.4 8.7-18.5 1.7-19.8 1.6a48.6 48.6 0 0 0-6.6 1l-22.5.6s-42.3 1.2-45.7 2.4-27.8 23.8-28.3 24z", className: "frame" }),
			_react2.default.createElement("path", { d: "M214.7 10.7c1 2-1.2 24.4-1.2 24.4s-1.5 5.5-4 7.5c6.2-17-1.4-33.3-4.4-35.7 0 0 8.8 2 9.7 4zM167 10.4c1.5 1.3 2.6 7.5 2.6 9.2s-3.5 17.8-3.8 18.7-5 7.7-5.3 8-2.5 1-2-.5 3-9.5 2.8-10.6 1.2-10.6 1.4-11.2c.6-2.2 2.7-4.8 2.7-7.3 0-5.2-9-10-13-11.6 0 .2 13 4 14.6 5.4z", className: "frame" }),
			_react2.default.createElement("path", { d: "M217.2 10s-.4-4.4-8.5-6-14.2-.8-20.8 1.6c-2.6 1-6.8 6.6-7.3 7s-6-.2-8-.2-4-5.3-11-10S113 1 111 1.5a132.3 132.3 0 0 1-17 3.3s-5.5.3-8 0c-6.4-.5-76.6 11-79 12.6-.6.4-6.7 23.3-7.2 24s1.6 7.4 1.7 8 1 .7 2.5.2S6 44 5.8 43 11 22 11 22l.8-1c.7-1 42-3 42-3l41.5-3.6S112 22 112.5 26.7 118 45 119.3 47 139 61.3 154 52.5c13.6-8 14-15.6 16-24.2s4.6-8 7.3-8.4c-1.2 10.7 9.8 25 13.2 28.2s11.4 3 13 3c3.8 0 7.8-6.8 11-13s2.7-28.2 2.7-28.2zm-49.5 15.8c-1.8 7.6-2.3 13-10 21s-25.5 7.5-33-1.7c-2-2.6-8.5-23.2-4.7-31.5S142 0 160.2 8c5.2 2.4 9.4 10 7.5 17.8zM203 49c-9 2.6-13.5-13-13.5-13-.6-2-5.3-14.5-1.4-22s18.6-9.8 24-2.5 0 35-9 37.6z", className: "shadow" })
		);
	};

	var glasses = {
		Front: Front,
		TopOne: TopOne,
		TopTwo: TopTwo,
		TopThree: TopThree,
		BottomOne: BottomOne,
		BottomTwo: BottomTwo,
		BottomThree: BottomThree,
		LeftOne: LeftOne,
		LeftTwo: LeftTwo,
		LeftThree: LeftThree,
		RightOne: RightOne,
		RightTwo: RightTwo,
		RightThree: RightThree
	};

	var Choice = function Choice(pos) {
		var c = glasses[pos];
		return c();
	};

	return Choice(position);
};

DefineGlasses.propTypes = {
	position: _react2.default.PropTypes.string.isRequired,
	transformation: _react2.default.PropTypes.string.isRequired
};

exports.default = DefineGlasses;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(56);

var _reactWaypoint = __webpack_require__(108);

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

var _gsap = __webpack_require__(22);

var _DrawSVGPlugin = __webpack_require__(57);

var _DrawSVGPlugin2 = _interopRequireDefault(_DrawSVGPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NofiySwipe = function (_React$Component) {
	_inherits(NofiySwipe, _React$Component);

	function NofiySwipe(props) {
		_classCallCheck(this, NofiySwipe);

		var _this = _possibleConstructorReturn(this, (NofiySwipe.__proto__ || Object.getPrototypeOf(NofiySwipe)).call(this, props));

		_this.state = {
			swipe: window.mobileCheck()

		};
		_this.swipeAnimation = new _gsap.TimelineMax();
		_this.mouseScrollAnimation = new _gsap.TimelineMax();

		return _this;
	}

	_createClass(NofiySwipe, [{
		key: 'handleSwiperEnter',
		value: function handleSwiperEnter() {
			this.props.onSwipeable();
			this.swipeAnimation.restart();
			this.state.swipe ? '' : this.mouseScrollAnimation.restart();
		}
	}, {
		key: 'animateSwipe',
		value: function animateSwipe() {
			var swiper = this.refs.swiper,
			    phone = this.refs.swipePhone;

			TweenMax.to([swiper, phone], 0, {
				opacity: 0,
				drawSVG: '0%'
			});

			this.swipeAnimation.to([swiper, phone], 2, {
				visibility: 'visible',
				transformOrigin: '50%, 50%',
				opacity: 1,
				drawSVG: '100%'
			}).to(swiper, 1, {
				transformOrigin: '50%, 50%',
				scale: 1.2,
				y: -60,
				opacity: 0,
				repeat: 4
			}).to([swiper, phone], 1, {
				opacity: 0,
				drawSVG: '0'
			});
		}
	}, {
		key: 'animateScroll',
		value: function animateScroll() {

			var mouse = this.refs.mouse;
			var circle1 = this.refs.circle1;
			var circle2 = this.refs.circle2;
			var circle3 = this.refs.circle3;

			TweenMax.to(mouse, 0, {
				transformOrigin: '50%, 50%',
				visibility: 'visible',
				opacity: 0,
				drawSVG: '0%'
			});

			TweenMax.to([circle1, circle2, circle3], 0, {
				visibility: 'visible',
				opacity: 0
			});

			this.swipeAnimation.to(mouse, 1, {
				opacity: 1,
				drawSVG: '100%'
			});

			this.mouseScrollAnimation.to(circle1, .2, {
				transformOrigin: '50%, 50%',
				opacity: 1,
				scale: 1.2,
				repeat: 1,
				yoyo: true
			}).to(circle2, .2, {
				transformOrigin: '50%, 50%',
				opacity: 1,
				scale: 1.2,
				repeat: 1,
				yoyo: true
			}).to(circle3, .2, {
				transformOrigin: '50%, 50%',
				opacity: 1,
				scale: 1.2,
				repeat: 1,
				yoyo: true
			}).repeat(3).eventCallback('onComplete', function () {
				TweenMax.to(mouse, 1, {
					drawSVG: '0%',
					opacity: 0
				});
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			this.state.swipe ? setTimeout(this.animateSwipe.bind(this), 300) : setTimeout(this.animateScroll.bind(this), 300);
		}
	}, {
		key: 'handleSwipeLeave',
		value: function handleSwipeLeave() {
			this.props.onUnSwipeable();
			console.log('leaving');
		}
	}, {
		key: 'renderNotification',
		value: function renderNotification(scroll) {
			var _React$createElement, _React$createElement2;

			return scroll ? _react2.default.createElement(
				'svg',
				(_React$createElement = { className: 'click-through-child' }, _defineProperty(_React$createElement, 'className', 'swipe'), _defineProperty(_React$createElement, 'viewBox', '0 0 43 75'), _React$createElement),
				_react2.default.createElement('circle', { ref: 'swiper', cx: '21.5', cy: '60.5', r: '9.5' }),
				_react2.default.createElement('rect', { ref: 'swipePhone', width: '42', height: '74', x: '.5', y: '.5', rx: '5', ry: '5' })
			) : _react2.default.createElement(
				'svg',
				(_React$createElement2 = { className: 'click-through-child' }, _defineProperty(_React$createElement2, 'className', 'scroll'), _defineProperty(_React$createElement2, 'viewBox', '0 0 42.73 70.49'), _React$createElement2),
				_react2.default.createElement('rect', { ref: 'mouse', width: '42.23', height: '69.99', x: '.25', y: '.25', rx: '17.5', ry: '17.5' }),
				_react2.default.createElement(
					'g',
					null,
					_react2.default.createElement('circle', { ref: 'circle1', cx: '21.37', cy: '20.74', r: '1.63' }),
					_react2.default.createElement('circle', { ref: 'circle2', cx: '21.37', cy: '26.9', r: '1.63' }),
					_react2.default.createElement('circle', { ref: 'circle3', cx: '21.37', cy: '33.06', r: '1.63' })
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'boom' },
				_react2.default.createElement(
					_reactWaypoint2.default,
					{ className: 'click-through-child', onEnter: this.handleSwiperEnter.bind(this), onLeave: this.handleSwipeLeave.bind(this) },
					this.renderNotification(this.state.swipe)
				)
			);
		}
	}]);

	return NofiySwipe;
}(_react2.default.Component);

exports.default = NofiySwipe;

NofiySwipe.propTypes = {};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handleSwipeUp = handleSwipeUp;
exports.handleSwipeDown = handleSwipeDown;
exports.pad = pad;
exports.mobileCheck = mobileCheck;
exports.polarToRectangular = polarToRectangular;
exports.shuffle = shuffle;
exports.transpose = transpose;
exports.getRandomFloat = getRandomFloat;
exports.getRandomInt = getRandomInt;
exports.importTemplates = importTemplates;
exports.addPressEventListener = addPressEventListener;
exports.addSwipeEventListener = addSwipeEventListener;
exports.addDblTapEventListener = addDblTapEventListener;
exports.randomColor = randomColor;
exports.endAll = endAll;

var _d3Selection = __webpack_require__(29);

function handleSwipeUp(props, possible) {
	var urls = ['/', '/about', '/work', '/contact'],
	    index = urls.indexOf(props.location.pathname),
	    next = index + 1;

	if (next > urls.length - 1 || possible == false) return;
	props.history.push(urls[next]);
}

function handleSwipeDown(props, possible) {
	var urls = ['/', '/about', '/work', '/contact'],
	    index = urls.indexOf(props.location.pathname),
	    previous = index - 1;

	if (previous < 0 || possible == false) {
		return;
	}

	props.history.push(urls[previous]);
}

function pad(num, size) {
	var s = num + "";
	while (s.length < size) {
		s = "0" + s;
	}return s;
}

function mobileCheck() {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

function polarToRectangular(radius, degrees) {
	var theta = degrees * (Math.PI / 180);

	return {
		x: radius * Math.cos(theta),
		y: radius * Math.sin(theta),
		degrees: degrees
	};
}

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function transpose(matrix) {
	return Object.keys(matrix[0]).map(function (colNumber) {
		return matrix.map(function (rowNumber) {
			return rowNumber[colNumber];
		});
	});
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function importTemplates(idArray) {
	var obj = {};

	idArray.forEach(function (identifier) {
		var s = (0, _d3Selection.select)('#' + identifier);

		obj[identifier] = s.html();
	});

	return obj;
}

function addPressEventListener(d, that, callback) {
	var mc = new Hammer(that);
	mc.on('press', function () {
		callback(d, that);
	});
}
function addSwipeEventListener(d, that, callback) {
	var mc = new Hammer(that);
	mc.on('swipe', function () {
		callback(d, that);
	});
}

function addDblTapEventListener(d, that, callback) {
	var mc = new Hammer(that);
	mc.on('doubletap', function () {
		callback(d, that);
	});
}

function randomColor(colors) {
	var originalColor = node.selector.select('#overlay').style('fill');

	return colors[getRandomInt(0, colors.length)];
}

function endAll(transition, callback) {
	var n = 0;

	if (transition.empty()) {
		callback();
	} else {
		n = transition.size();

		transition.on("end", function () {
			n--;
			if (n === 0) {
				callback();
			}
		});
	}
}

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/*!
 * VERSION: 0.1.4
 * DATE: 2017-06-19
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : undefined || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {

	"use strict";

	var _doc = _gsScope.document,
	    _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function () {},
	    _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
	    _isEdge = ((_gsScope.navigator || {}).userAgent || "").indexOf("Edge") !== -1,
	    //Microsoft Edge has a bug that causes it not to redraw the path correctly if the stroke-linecap is anything other than "butt" (like "round") and it doesn't match the stroke-linejoin. A way to trigger it is to change the stroke-miterlimit, so we'll only do that if/when we have to (to maximize performance)
	DrawSVGPlugin;

	function getDistance(x1, y1, x2, y2, scaleX, scaleY) {
		x2 = (parseFloat(x2 || 0) - parseFloat(x1 || 0)) * scaleX;
		y2 = (parseFloat(y2 || 0) - parseFloat(y1 || 0)) * scaleY;
		return Math.sqrt(x2 * x2 + y2 * y2);
	}

	function unwrap(element) {
		if (typeof element === "string" || !element.nodeType) {
			element = _gsScope.TweenLite.selector(element);
			if (element.length) {
				element = element[0];
			}
		}
		return element;
	}

	//accepts values like "100%" or "20% 80%" or "20 50" and parses it into an absolute start and end position on the line/stroke based on its length. Returns an an array with the start and end values, like [0, 243]
	function parse(value, length, defaultStart) {
		var i = value.indexOf(" "),
		    s,
		    e;
		if (i === -1) {
			s = defaultStart !== undefined ? defaultStart + "" : value;
			e = value;
		} else {
			s = value.substr(0, i);
			e = value.substr(i + 1);
		}
		s = s.indexOf("%") !== -1 ? parseFloat(s) / 100 * length : parseFloat(s);
		e = e.indexOf("%") !== -1 ? parseFloat(e) / 100 * length : parseFloat(e);
		return s > e ? [e, s] : [s, e];
	}

	function getLength(element) {
		if (!element) {
			return 0;
		}
		element = unwrap(element);
		var type = element.tagName.toLowerCase(),
		    scaleX = 1,
		    scaleY = 1,
		    length,
		    bbox,
		    points,
		    prevPoint,
		    i,
		    rx,
		    ry;
		if (element.getAttribute("vector-effect") === "non-scaling-stroke") {
			//non-scaling-stroke basically scales the shape and then strokes it at the screen-level (after transforms), thus we need to adjust the length accordingly.
			scaleY = element.getScreenCTM();
			scaleX = scaleY.a;
			scaleY = scaleY.d;
		}
		try {
			//IE bug: calling <path>.getTotalLength() locks the repaint area of the stroke to whatever its current dimensions are on that frame/tick. To work around that, we must call getBBox() to force IE to recalculate things.
			bbox = element.getBBox(); //solely for fixing bug in IE - we don't actually use the bbox.
		} catch (e) {
			//firefox has a bug that throws an error if the element isn't visible.
		}
		if ((!bbox || !bbox.width && !bbox.height) && (type === "rect" || type === "circle" || type === "ellipse")) {
			//if the element isn't visible, try to discern width/height using its attributes.
			bbox = {
				width: parseFloat(element.getAttribute(type === "rect" ? "width" : type === "circle" ? "r" : "rx")),
				height: parseFloat(element.getAttribute(type === "rect" ? "height" : type === "circle" ? "r" : "ry"))
			};
			if (type !== "rect") {
				bbox.width *= 2;
				bbox.height *= 2;
			}
		}
		if (type === "path") {
			prevPoint = element.style.strokeDasharray;
			element.style.strokeDasharray = "none";
			length = element.getTotalLength() || 0;
			if (scaleX !== scaleY) {
				console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.");
			}
			length *= (scaleX + scaleY) / 2;
			element.style.strokeDasharray = prevPoint;
		} else if (type === "rect") {
			length = bbox.width * 2 * scaleX + bbox.height * 2 * scaleY;
		} else if (type === "line") {
			length = getDistance(element.getAttribute("x1"), element.getAttribute("y1"), element.getAttribute("x2"), element.getAttribute("y2"), scaleX, scaleY);
		} else if (type === "polyline" || type === "polygon") {
			points = element.getAttribute("points").match(_numbersExp) || [];
			if (type === "polygon") {
				points.push(points[0], points[1]);
			}
			length = 0;
			for (i = 2; i < points.length; i += 2) {
				length += getDistance(points[i - 2], points[i - 1], points[i], points[i + 1], scaleX, scaleY) || 0;
			}
		} else if (type === "circle" || type === "ellipse") {
			rx = bbox.width / 2 * scaleX;
			ry = bbox.height / 2 * scaleY;
			length = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
		}
		return length || 0;
	}

	function getPosition(element, length) {
		if (!element) {
			return [0, 0];
		}
		element = unwrap(element);
		length = length || getLength(element) + 1;
		var cs = _getComputedStyle(element),
		    dash = cs.strokeDasharray || "",
		    offset = parseFloat(cs.strokeDashoffset),
		    i = dash.indexOf(",");
		if (i < 0) {
			i = dash.indexOf(" ");
		}
		dash = i < 0 ? length : parseFloat(dash.substr(0, i)) || 0.00001;
		if (dash > length) {
			dash = length;
		}
		return [Math.max(0, -offset), Math.max(0, dash - offset)];
	}

	DrawSVGPlugin = _gsScope._gsDefine.plugin({
		propName: "drawSVG",
		API: 2,
		version: "0.1.4",
		global: true,
		overwriteProps: ["drawSVG"],

		init: function init(target, value, tween, index) {
			if (!target.getBBox) {
				return false;
			}
			var length = getLength(target) + 1,
			    start,
			    end,
			    overage,
			    cs;
			this._style = target.style;
			if (typeof value === "function") {
				value = value(index, target);
			}
			if (value === true || value === "true") {
				value = "0 100%";
			} else if (!value) {
				value = "0 0";
			} else if ((value + "").indexOf(" ") === -1) {
				value = "0 " + value;
			}
			start = getPosition(target, length);
			end = parse(value, length, start[0]);
			this._length = length + 10;
			if (start[0] === 0 && end[0] === 0) {
				overage = Math.max(0.00001, end[1] - length); //allow people to go past the end, like values of 105% because for some paths, Firefox doesn't return an accurate getTotalLength(), so it could end up coming up short.
				this._dash = length + overage;
				this._offset = length - start[1] + overage;
				this._addTween(this, "_offset", this._offset, length - end[1] + overage, "drawSVG");
			} else {
				this._dash = start[1] - start[0] || 0.000001; //some browsers render artifacts if dash is 0, so we use a very small number in that case.
				this._offset = -start[0];
				this._addTween(this, "_dash", this._dash, end[1] - end[0] || 0.00001, "drawSVG");
				this._addTween(this, "_offset", this._offset, -end[0], "drawSVG");
			}
			if (_isEdge) {
				//to work around a bug in Microsoft Edge, animate the stroke-miterlimit by 0.0001 just to trigger the repaint (only necessary if stroke-linecap isn't "butt"; also unnecessary if it's "round" and stroke-linejoin is also "round"). Imperceptible, relatively high-performance, and effective. Another option was to set the "d" <path> attribute to its current value on every tick, but that seems like it'd be much less performant.
				cs = _getComputedStyle(target);
				end = cs.strokeLinecap;
				if (end !== "butt" && end !== cs.strokeLinejoin) {
					end = parseFloat(cs.strokeMiterlimit);
					this._addTween(target.style, "strokeMiterlimit", end, end + 0.0001, "strokeMiterlimit");
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function set(ratio) {
			if (this._firstPT) {
				this._super.setRatio.call(this, ratio);
				this._style.strokeDashoffset = this._offset;
				if (ratio === 1 || ratio === 0) {
					this._style.strokeDasharray = this._offset < 0.001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px";
				} else {
					this._style.strokeDasharray = this._dash + "px," + this._length + "px";
				}
			}
		}

	});

	DrawSVGPlugin.getLength = getLength;
	DrawSVGPlugin.getPosition = getPosition;
});if (_gsScope._gsDefine) {
	_gsScope._gsQueue.pop()();
}
//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof module !== "undefined" && module.exports) {
		//node
		__webpack_require__(141);
		module.exports = getGlobal();
	} else if (true) {
		//AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(141)], __WEBPACK_AMD_DEFINE_FACTORY__ = (getGlobal),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})("DrawSVGPlugin");
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ })

},[228]);