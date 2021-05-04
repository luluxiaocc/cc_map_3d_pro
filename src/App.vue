<template>
  <div id="app">
    <cc-map id="map"></cc-map>
  </div>
</template>

<script>
import ccMap from "./components/cc_map.vue";

export default {
  name: "App",
  components: {
    ccMap,
  },
};
</script>

<style>
#app {
  overflow: hidden;
  border: 1px solid #ccc;
  width: 900px;
  height: 700px;
  margin: 6px auto;
}
</style>
