(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('polymorph-js'), require('@tweenjs/tween.js'), require('funnel-graph-js'), require('funnel-graph-js/src/js/number'), require('funnel-graph-js/src/js/graph'), require('funnel-graph-js/src/scss/main.scss'), require('funnel-graph-js/src/scss/theme.scss')) :
    typeof define === 'function' && define.amd ? define(['exports', 'polymorph-js', '@tweenjs/tween.js', 'funnel-graph-js', 'funnel-graph-js/src/js/number', 'funnel-graph-js/src/js/graph', 'funnel-graph-js/src/scss/main.scss', 'funnel-graph-js/src/scss/theme.scss'], factory) :
    (global = global || self, factory(global.VueFunnelGraph = {}, global.interpolate, global.TWEEN, global.FunnelGraph, global.formatNumber, global.getDefaultColors));
}(this, function (exports, polymorphJs, TWEEN, FunnelGraph, number, graph) { 'use strict';

    TWEEN = TWEEN && TWEEN.hasOwnProperty('default') ? TWEEN['default'] : TWEEN;
    FunnelGraph = FunnelGraph && FunnelGraph.hasOwnProperty('default') ? FunnelGraph['default'] : FunnelGraph;

    //

    var script = {
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
                animationRunning: false,
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
            },
            leaveTransition: function leaveTransition(el, done) {
                if (!this.animated) { done(); }
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
            offsetColor: function offsetColor(index, length) {
                return ((Math.round(100 * index / (length - 1))) + "%");
            },
            makeAnimations: function makeAnimations() {
                var this$1 = this;

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
                    var oldPath = this$1.prevPaths[index] || this$1.graph.getPathMedian(index);
                    if (dimensionChanged) { oldPath = this$1.graph.getPathMedian(index); }
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
                var tween = new TWEEN.Tween(position)
                    .to({ value: 1 }, 700)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .onStart(function () {
                        this$1.animationRunning = true;
                    })
                    .onUpdate(function () {
                        for (var index = 0; index < this$1.paths.length; index++) {
                            this$1.paths[index] = interpolators[index](position.value);
                            // eslint-disable-next-line no-underscore-dangle
                            this$1.paths.__ob__.dep.notify();
                        }
                    })
                    .onComplete(function () {
                        this$1.animationRunning = false;
                    });

                if (this.animationRunning === false) { tween.start(); }

                animate();
            },
            drawPaths: function drawPaths() {
                var this$1 = this;

                this.prevPaths = this.paths;
                this.paths = [];
                var definitions = this.graph.getPathDefinitions();

                definitions.forEach(function (d) {
                    this$1.paths.push(d);
                });
            }
        },
        beforeMount: function beforeMount() {
            this.graph = new FunnelGraph({
                height: this.height,
                width: this.width,
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
        }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
      return function (id, style) {
        return addStyle(id, style);
      };
    }
    var HEAD = document.head || document.getElementsByTagName('head')[0];
    var styles = {};

    function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = {
        ids: new Set(),
        styles: []
      });

      if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

          code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
        }

        if (!style.element) {
          style.element = document.createElement('style');
          style.element.type = 'text/css';
          if (css.media) { style.element.setAttribute('media', css.media); }
          HEAD.appendChild(style.element);
        }

        if ('styleSheet' in style.element) {
          style.styles.push(code);
          style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
        } else {
          var index = style.ids.size - 1;
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
        }
      }
    }

    var browser = createInjector;

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"funnel svg-funnel-js",class:{'svg-funnel-js--vertical': _vm.direction === 'vertical'}},[_c('div',{staticClass:"svg-funnel-js__container"},[_c('svg',{attrs:{"width":_vm.width,"height":_vm.height}},[_c('defs',_vm._l((_vm.gradientSet),function(colors,index){return _c('linearGradient',{key:index,attrs:{"id":("funnelGradient-" + ((index+1))),"gradientTransform":_vm.gradientAngle}},_vm._l((colors.values),function(color,index){return _c('stop',{key:index,attrs:{"stop-color":color,"offset":_vm.offsetColor(index, colors.values.length)}})}),1)}),1),_vm._v(" "),_vm._l((_vm.paths),function(path,index){return _c('path',{key:index,attrs:{"fill":_vm.colorSet[index].fill,"stroke":_vm.colorSet[index].fill,"d":path}})})],2)]),_vm._v(" "),_c('transition-group',{staticClass:"svg-funnel-js__labels",attrs:{"name":"appear","tag":"div"},on:{"enter":_vm.enterTransition,"leave":_vm.leaveTransition}},_vm._l((_vm.valuesFormatted),function(value,index){return _c('div',{key:_vm.labels[index].toLowerCase().replace(' ', '-'),staticClass:"svg-funnel-js__label",class:("label-" + ((index+1)))},[_c('div',{staticClass:"label__value"},[_vm._v(_vm._s(value))]),_vm._v(" "),(_vm.labels)?_c('div',{staticClass:"label__title"},[_vm._v(_vm._s(_vm.labels[index]))]):_vm._e(),_vm._v(" "),(_vm.displayPercentage && _vm.percentages()[index] !== 100)?_c('div',{staticClass:"label__percentage"},[_vm._v("\n                "+_vm._s(_vm.percentages()[index])+"%\n            ")]):_vm._e(),_vm._v(" "),(_vm.is2d())?_c('div',{staticClass:"label__segment-percentages"},[_c('ul',{staticClass:"segment-percentage__list"},_vm._l((_vm.subLabels),function(subLabel,j){return _c('li',{key:j},[_vm._v("\n                        "+_vm._s(subLabel)+":\n                        "),_c('span',{staticClass:"percentage__list-label"},[_vm._v(_vm._s(_vm.twoDimPercentages()[index][j])+"%")])])}),0)]):_vm._e()])}),0)],1)};
    var __vue_staticRenderFns__ = [];

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-629a3016_0", { source: ".appear-enter-active[data-v-629a3016],.appear-leave-active[data-v-629a3016]{transition:all .7s ease-in-out}.appear-enter-to[data-v-629a3016],.appear-leave[data-v-629a3016]{max-width:100%;max-height:100%;opacity:1}.appear-enter[data-v-629a3016],.appear-leave-to[data-v-629a3016]{max-width:0;max-height:0;opacity:0}", map: undefined, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-629a3016";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      

      
      var vueFunnelGraph = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        browser,
        undefined
      );

    /* eslint-disable import/prefer-default-export */

    var components = /*#__PURE__*/Object.freeze({
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
      install: install,
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

    exports.default = plugin;
    exports.VueFunnelGraph = vueFunnelGraph;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
