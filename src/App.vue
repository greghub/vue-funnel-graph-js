<template>
  <div id="app">
    <funnel-graph></funnel-graph>
  </div>
</template>

<script>
import FunnelGraph from './components/FunnelGraph.vue';

export default {
  name: 'app',
  components: {
    FunnelGraph,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
