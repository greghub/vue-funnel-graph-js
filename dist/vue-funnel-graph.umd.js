(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('polymorph-js'), require('@tweenjs/tween.js'), require('funnel-graph-js'), require('funnel-graph-js/src/js/number'), require('funnel-graph-js/src/js/graph'), require('funnel-graph-js/src/scss/main.scss'), require('funnel-graph-js/src/scss/theme.scss')) :
  typeof define === 'function' && define.amd ? define(['exports', 'polymorph-js', '@tweenjs/tween.js', 'funnel-graph-js', 'funnel-graph-js/src/js/number', 'funnel-graph-js/src/js/graph', 'funnel-graph-js/src/scss/main.scss', 'funnel-graph-js/src/scss/theme.scss'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueFunnelGraph = {}, global.interpolate, global.TWEEN, global.FunnelGraph, global.formatNumber, global.getDefaultColors));
})(this, (function (exports, polymorphJs, TWEEN, FunnelGraph, number, graph) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".appear-enter-active, .appear-leave-active {\n  transition: all 0.7s ease-in-out;\n}\n\n.appear-enter-to, .appear-leave {\n  max-width: 100%;\n  max-height: 100%;\n  opacity: 1;\n}\n\n.appear-enter, .appear-leave-to {\n  max-width: 0;\n  max-height: 0;\n  opacity: 0;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: all 0.3s ease;\n}\n\n.fade-enter-to, .fade-leave {\n  opacity: 1;\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}";
  styleInject(css_248z);

  var vueFunnelGraph = {
  render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"funnel svg-funnel-js",class:{'svg-funnel-js--vertical': _vm.direction === 'vertical'}},[_c('div',{staticClass:"svg-funnel-js__container"},[_c('svg',{attrs:{"width":_vm.width,"height":_vm.height}},[_c('defs',_vm._l((_vm.gradientSet),function(colors,index){return _c('linearGradient',{key:index,attrs:{"id":("funnelGradient-" + ((index+1))),"gradientTransform":_vm.gradientAngle}},_vm._l((colors.values),function(color,index){return _c('stop',{key:index,attrs:{"stop-color":color,"offset":_vm.offsetColor(index, colors.values.length)}})}),1)}),1),_vm._v(" "),_vm._l((_vm.paths),function(path,index){return _c('path',{key:index,attrs:{"fill":_vm.colorSet[index].fill,"stroke":_vm.colorSet[index].fill,"d":path}})})],2)]),_vm._v(" "),_c('transition-group',{staticClass:"svg-funnel-js__labels",attrs:{"name":"appear","tag":"div"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},_vm._l((_vm.valuesFormatted),function(value,index){return _c('div',{key:_vm.labels[index].toLowerCase().split(' ').join('-'),staticClass:"svg-funnel-js__label",class:("label-" + ((index+1)))},[_c('div',{staticClass:"label__value"},[_vm._v(_vm._s(value))]),_vm._v(" "),(_vm.labels)?_c('div',{staticClass:"label__title"},[_vm._v(_vm._s(_vm.labels[index]))]):_vm._e(),_vm._v(" "),(_vm.displayPercentage && _vm.percentages()[index] !== 100)?_c('div',{staticClass:"label__percentage"},[_vm._v("\n                "+_vm._s(_vm.percentages()[index])+"%\n            ")]):_vm._e(),_vm._v(" "),(_vm.is2d())?_c('div',{staticClass:"label__segment-percentages"},[_c('ul',{staticClass:"segment-percentage__list"},_vm._l((_vm.subLabels),function(subLabel,j){return _c('li',{key:j},[_vm._v("\n                        "+_vm._s(subLabel)+":\n                        "),(_vm.subLabelValue === 'percent')?_c('span',{staticClass:"percentage__list-label"},[_vm._v(_vm._s(_vm.twoDimPercentages()[index][j])+"%")]):_c('span',{staticClass:"percentage__list-label"},[_vm._v(_vm._s(_vm._f("format")(_vm.values[index][j])))])])}),0)]):_vm._e()])}),0),_vm._v(" "),_c('transition',{attrs:{"name":"fade"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},[(_vm.is2d())?_c('div',{staticClass:"svg-funnel-js__subLabels"},_vm._l((_vm.subLabels),function(subLabel,index){return _c('div',{key:index,class:("svg-funnel-js__subLabel svg-funnel-js__subLabel-" + ((index + 1)))},[_c('div',{staticClass:"svg-funnel-js__subLabel--color",style:(_vm.subLabelBackgrounds(index))}),_vm._v(" "),_c('div',{staticClass:"svg-funnel-js__subLabel--title"},[_vm._v(_vm._s(subLabel))])])}),0):_vm._e()])],1)},
  staticRenderFns: [],
          name: 'VueFunnelGraph',
          props: {
              animated: {
                  type: Boolean,
                  default: false
              },
              width: [String, Number],
              height: [String, Number],
              values: Array,
              labels: Array,
              colors: {
                  type: Array,
                  default: function default$1() { return []; }
              },
              subLabels: Array,
              subLabelValue: {
                  type: String,
                  default: 'percent'
              },
              direction: {
                  type: String,
                  default: 'horizontal'
              },
              gradientDirection: {
                  type: String,
                  default: 'horizontal'
              },
              displayPercentage: {
                  type: Boolean,
                  default: true
              }
          },
          data: function data() {
              return {
                  paths: [],
                  prevPaths: [], // paths before update, used for animations
                  graph: null,
                  tween: null,
                  defaultColors: graph.getDefaultColors(10)
              };
          },
          computed: {
              valuesFormatted: function valuesFormatted() {
                  if (this.graph.is2d()) {
                      return this.graph.getValues2d().map(function (value) { return number.formatNumber(value); });
                  }
                  return this.values.map(function (value) { return number.formatNumber(value); });
              },
              colorSet: function colorSet() {
                  var colorSet = [];
                  var gradientCount = 0;

                  for (var i = 0; i < this.paths.length; i++) {
                      var values = this.graph.is2d() ? this.getColors[i] : this.getColors;
                      var fillMode = (typeof values === 'string' || values.length === 1) ? 'solid' : 'gradient';
                      if (fillMode === 'gradient') { gradientCount += 1; }
                      colorSet.push({
                          values: values,
                          fillMode: fillMode,
                          fill: fillMode === 'solid' ? values : ("url('#funnelGradient-" + gradientCount + "')")
                      });
                  }
                  return colorSet;
              },
              gradientSet: function gradientSet() {
                  var gradientSet = [];
                  this.colorSet.forEach(function (colors) {
                      if (colors.fillMode === 'gradient') {
                          gradientSet.push(colors);
                      }
                  });
                  return gradientSet;
              },
              getColors: function getColors() {
                  if (this.colors instanceof Array && this.colors.length === 0) {
                      return graph.getDefaultColors(this.is2d() ? this.values[0].length : 2);
                  }
                  if (this.colors.length < this.paths.length) {
                      return [].concat( this.colors ).concat(
                          [].concat( this.defaultColors ).splice(this.paths.length, this.paths.length - this.colors.length)
                      );
                  }
                  return this.colors;
              },
              gradientAngle: function gradientAngle() {
                  return ("rotate(" + (this.gradientDirection === 'vertical' ? 90 : 0) + ")");
              }
          },
          methods: {
              enterTransition: function enterTransition(el, done) {
                  if (!this.animated) { done(); }
                  setTimeout(function () { return done(); }, 700);
              },
              leaveTransition: function leaveTransition(el, done) {
                  if (!this.animated) { done(); }
                  setTimeout(function () { return done(); }, 700);
              },
              is2d: function is2d() {
                  return this.graph.is2d();
              },
              percentages: function percentages() {
                  return this.graph.createPercentages();
              },
              twoDimPercentages: function twoDimPercentages() {
                  if (!this.is2d()) {
                      return [];
                  }
                  return this.graph.getPercentages2d();
              },
              subLabelBackgrounds: function subLabelBackgrounds(index) {
                  if (!this.is2d()) {
                      return [];
                  }
                  return graph.generateLegendBackground(this.getColors[index], this.gradientDirection);
              },
              offsetColor: function offsetColor(index, length) {
                  return ((Math.round(100 * index / (length - 1))) + "%");
              },
              makeAnimations: function makeAnimations() {
                  var this$1$1 = this;

                  if (this.tween !== null) { this.tween.stop(); }
                  var interpolators = [];
                  var dimensionChanged = this.prevPaths.length !== this.paths.length;

                  var origin = { x: 0.5, y: 0.5 };
                  if (dimensionChanged) {
                      origin = { x: 0, y: 0.5 };
                      if (this.graph.isVertical()) {
                          origin = { x: 1, y: 1 };
                      }
                      if (!this.graph.is2d()) {
                          origin = { x: 0, y: 1 };
                      }
                  }

                  this.paths.forEach(function (path, index) {
                      var oldPath = this$1$1.prevPaths[index] || this$1$1.graph.getPathMedian(index);
                      if (dimensionChanged) { oldPath = this$1$1.graph.getPathMedian(index); }
                      var interpolator = polymorphJs.interpolate([oldPath, path], {
                          addPoints: 1,
                          origin: origin,
                          optimize: 'fill',
                          precision: 1
                      });

                      interpolators.push(interpolator);
                  });

                  function animate() {
                      if (TWEEN.update()) {
                          requestAnimationFrame(animate);
                      }
                  }

                  var position = { value: 0 };
                  this.tween = new TWEEN.Tween(position)
                      .to({ value: 1 }, 700)
                      .easing(TWEEN.Easing.Cubic.InOut)
                      .onUpdate(function () {
                          for (var index = 0; index < this$1$1.paths.length; index++) {
                              this$1$1.$set(this$1$1.paths, index, interpolators[index](position.value));
                          }
                      });

                  this.tween.start();
                  animate();
              },
              drawPaths: function drawPaths() {
                  var this$1$1 = this;

                  this.prevPaths = this.paths;
                  this.paths = [];
                  var definitions = this.graph.getPathDefinitions();

                  definitions.forEach(function (d) {
                      this$1$1.paths.push(d);
                  });
              }
          },
          created: function created() {
              this.graph = new FunnelGraph({
                  height: this.height,
                  width: this.width,
                  direction: this.direction,
                  data: {
                      labels: this.labels,
                      values: this.values
                  }
              });
              this.drawPaths();
              if (this.animated) { this.makeAnimations(); }
          },
          watch: {
              values: function values() {
                  this.graph.setValues(this.values);
                  this.drawPaths();
                  if (this.animated) { this.makeAnimations(); }
              },
              direction: function direction() {
                  this.graph.setDirection(this.direction)
                      .setWidth(this.width)
                      .setHeight(this.height);
                  this.drawPaths();
              }
          },
          filters: {
              format: function (value) {
                  return number.formatNumber(value)
              }
          }
      };

  /* eslint-disable import/prefer-default-export */

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VueFunnelGraph: vueFunnelGraph
  });

  // Import vue components

  // install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Object.keys(components).forEach(function (componentName) {
      Vue.component(componentName, components[componentName]);
    });
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install
  };

  // To auto-install when vue is found
  /* global window global */
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.VueFunnelGraph = vueFunnelGraph;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
