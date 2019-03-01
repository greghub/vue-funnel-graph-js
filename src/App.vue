<template>
  <div id="app">
    <div class="funnels">
      <funnel-graph :width="width" :height="height" :labels="labels"
                    :values="values" :colors="colors" :subLabels="subLabels" :direction="direction"
                    :gradient-direction="gradientDirection"
                    :animated="true" :display-percentage="true"
      ></funnel-graph>
    </div>
    <div class="fields">
      <button @click="makeData1">Make One Dim</button>
      <button @click="makeData3">Make One Dim 3</button>
      <button @click="makeData4">Make One Dim 4</button>
      <button @click="makeData2">Make Two Dim</button>
      <button @click="makeData5">Make Two Dim 5</button>
      <button @click="makeData6">Make Two Dim 6</button>
      <button @click="makeData7">Make Two Dim 7</button>
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
    makeData3() {
      this.values = [12000, 8700, 3330];
      this.colors = ['#FFB178', '#FF3C8E'];
    },
    makeData4() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy', 'More'];
      this.colors = ['#FFB178', '#FF3C8E'];
      this.values = [12000, 8700, 3330, 400];
    },
    makeData5() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy'];
      this.subLabels = ['Direct', 'Social Media', 'Ads'];
      this.values = [
        [3000, 2500, 6500, 3000],
        [3000, 1700, 1000, 500],
        [600, 200, 130, 75]
      ];
      this.colors = [
        ['#FFB178', '#FF78B1', '#FF3C8E'],
        ['#A0BBFF', '#EC77FF'],
        ['#A0F9FF', '#7795FF']
      ];
    },
    makeData6() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy', 'Review'];
      this.subLabels = ['Direct', 'Social Media', 'Ads', 'Other'];
      this.values = [
        [2000, 1500, 3500, 5000],
        [4000, 2700, 5000, 700],
        [700, 200, 130, 75]
      ];
      this.colors = [
        ['#FFB178', '#FF78B1', '#FF3C8E'],
        ['#A0BBFF', '#EC77FF'],
        ['#A0F9FF', '#7795FF'],
        'red'
      ];
    },
    makeData7() {
      this.labels = ['Impressions', 'Add To Cart', 'Buy', 'Review'];
      this.subLabels = ['Direct', 'Social Media', 'Ads', 'Other'];
      this.values = [
        [2000, 1500, 3500, 5000],
        [4000, 2700, 5000, 700],
        [700, 200, 130, 75],
        [100, 70, 80, 25]
      ];
      this.colors = [
        ['#FFB178', '#FF78B1', '#FF3C8E'],
        ['#A0BBFF', '#EC77FF'],
        ['#A0F9FF', '#7795FF'],
        'red'
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
