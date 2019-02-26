<template>
  <div class="funnel svg-funnel-js" :class="{'svg-funnel-js--vertical': direction === 'vertical'}">
    <div class="svg-funnel-js__container">
      <svg :width="width" :height="height">
        <defs>
          <linearGradient :id="`funnelGradient-${(index+1)}`"
                          v-for="(colors, index) in gradientSet"
                          :key="index"
                          :gradientTransform="`rotate(${gradientDirection === 'vertical' ? 90 : 0})`"
          >
            <stop :stop-color="color"
              :offset="Math.round(100 * index / (colors.colors.length - 1)) + '%'"
              v-for="(color, index) in colors.colors"
              :key="index"
            ></stop>
          </linearGradient>
        </defs>
        <path :fill="colorSet[index].fill" :stroke="colorSet[index].fill"
          :d="path" v-for="(path, index) in paths" :key="index"
        ></path>
      </svg>
    </div>
    <div class="svg-funnel-js__labels">
      <div class="svg-funnel-js__label" :class="`label-${(index+1)}`"
        v-for="(value, index) in valuesFormatted" :key="index"
      >
        <div class="label__value">{{ value }}</div>
        <div class="label__title" v-if="labels">{{ labels[index] }}</div>
        <div class="label__segment-percentages" v-if="is2d()">
          <ul class="segment-percentage__list">
            <li v-for="(subLabel, j) in subLabels" :key="j">
              {{ subLabel }}:
              <span class="percentage__list-label">{{ twoDimPercentages()[index][j] }}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FunnelGraph from 'funnel-graph-js';
import { formatNumber } from 'funnel-graph-js/src/js/number';
import { getDefaultColors } from 'funnel-graph-js/src/js/graph';

export default {
  name: 'FunnelGraph',
  props: {
    width: [String, Number],
    height: [String, Number],
    values: Array,
    labels: Array,
    colors: {
      type: Array,
      default() { return []; }
    },
    subLabels: Array,
    direction: {
      type: String,
      default: 'horizontal'
    },
    gradientDirection: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {
      paths: [],
      graph: null,
      valueSize: 0
    };
  },
  computed: {
    valuesFormatted() {
      if (this.graph.is2d()) {
        return this.graph.getValues2d().map(value => formatNumber(value));
      }
      return this.values.map(value => formatNumber(value));
    },
    colorSet() {
      const colorSet = [];
      let gradientCount = 0;

      for (let i = 0; i < this.valueSize; i++) {
        const colors = (this.graph.is2d()) ? this.getColors[i] : this.getColors;
        const fillMode = (typeof colors === 'string' || colors.length === 1) ? 'solid' : 'gradient';
        if (fillMode === 'gradient') gradientCount++;
        colorSet.push({
          colors,
          fillMode,
          fill: fillMode === 'solid' ? colors : `url('#funnelGradient-${gradientCount}')`
        });
      }
      return colorSet;
    },
    gradientSet() {
      const gradientSet = [];
      this.colorSet.forEach((colors) => {
        if (colors.fillMode === 'gradient') {
          gradientSet.push(colors);
        }
      });
      return gradientSet;
    },
    getColors() {
      if (this.colors instanceof Array && this.colors.length === 0) {
        return getDefaultColors(this.is2d() ? this.values[0].length : 2);
      }
      return this.colors;
    }
  },
  methods: {
    is2d() {
      return this.graph.is2d();
    },
    twoDimPercentages() {
      if (!this.is2d()) {
        return [];
      }
      return this.graph.getPercentages2d();
    },
    drawPaths() {
      this.paths = [];
      const definitions = this.graph.getPathDefinitions();
      this.valueSize = definitions.length;

      definitions.forEach((d) => {
        this.paths.push(d);
      });
    }
  },
  beforeMount() {
    this.graph = new FunnelGraph({
      height: this.height,
      width: this.width,
      data: {
        labels: this.labels,
        values: this.values
      }
    });
    this.drawPaths();
  },
  watch: {
    values() {
      this.graph.setValues(this.values);
      this.drawPaths();
    },
    direction() {
      this.graph.setDirection(this.direction)
        .setWidth(this.width)
        .setHeight(this.height);
      this.drawPaths();
    }
  }
};
</script>

<style scoped>
.funnel {
  position: relative;
}
</style>
