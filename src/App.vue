<template>
  <div id="app">
    <div class="funnels">
      <funnel-graph :width="width" :height="height" :labels="labels"
                    :values="values" :colors="colors" :subLabels="subLabels" :direction="direction"
                    :gradient-direction="gradientDirection"
      ></funnel-graph>
    </div>
    <div class="fields">
      <button @click="makeData1">Make One Dim</button>
      <button @click="makeData2">Make Two Dim</button>
      <button @click="(direction === 'horizontal') ? makeVertical() : makeHorizontal()">Rotate</button>
      <button @click="(gradientDirection === 'horizontal') ? gradientV() : gradientH()">Rotate Gradient</button>
    </div>
  </div>
</template>

<script>
import FunnelGraph from './components/FunnelGraph.vue';

export default {
  name: 'app',
  components: {
    FunnelGraph
  },
  data() {
    return {
      labels: ['Impressions', 'Add To Cart', 'Buy'],
      subLabels: [],
      values: [12000, 5700, 930],
      colors: ['#FFB178', '#FF3C8E'],
      direction: 'horizontal',
      gradientDirection: 'horizontal',
      height: 300,
      width: 800
    };
  },
  methods: {
    makeData1() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy'];
      this.subLabels = [];
      this.values = [12000, 5700, 930];
      this.colors = ['#FFB178', '#FF3C8E'];
    },
    makeData2() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy'];
      this.subLabels = ['Direct', 'Social Media', 'Ads'];
      this.values = [
        [3000, 2500, 6500],
        [3000, 1700, 1000],
        [600, 200, 130]
      ];
      this.colors = [
        ['#FFB178', '#FF78B1', '#FF3C8E'],
        ['#A0BBFF', '#EC77FF'],
        ['#A0F9FF', '#7795FF']
      ];
    },
    makeVertical() {
      this.direction = 'vertical';
      this.height = 500;
      this.width = 400;
    },
    makeHorizontal() {
      this.direction = 'horizontal';
      this.height = 300;
      this.width = 800;
    },
    gradientV() {
      this.gradientDirection = 'vertical';
    },
    gradientH() {
      this.gradientDirection = 'horizontal';
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.funnels {
  display: flex;
}

.fields {
  display: flex;
  flex-direction: column;
  width: 400px;
}
</style>
