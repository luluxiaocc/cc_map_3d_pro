<template>
  <div class="map" ref="map"></div>
</template>

<script>
import * as THREE from "three";
import envConifg from "../config/earth.config";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "ccMap",
  data() {
    return {
      scene: null,
      camera: null,
      mapDom: null,
      renderer: null,
      orbitControls: null,
      object: new THREE.Object3D(),
      axisHelper: new THREE.AxesHelper(120),
      textureLoader: new THREE.TextureLoader(),
    };
  },
  methods: {
    initTHREE() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.mapDom = this.$refs.map;
      this.renderer.setSize(this.mapDom.clientWidth, this.mapDom.clientHeight);
      this.renderer.setClearColor(0xffffff, 1.0);
      this.mapDom.appendChild(this.renderer.domElement);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.mapDom.clientWidth / this.mapDom.clientHeight,
        1,
        2000
      );
      this.camera.position.z = 300;
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(0, 0, 0);
    },
    initScene() {
      this.scene = new THREE.Scene();
    },
    initAxisHelper() {
      // this.object.add(this.axisHelper);
      // 文章写到再用object
      this.scene.add(this.axisHelper);
    },
    initLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);
    },
    initOrbitControls() {
      const os = new OrbitControls(this.camera, this.renderer.domElement);
      os.target = new THREE.Vector3(0, 0, 0); //控制焦点
      os.autoRotate = false; //将自动旋转关闭
      os.enablePan = false; // 不禁止鼠标平移, 可以用键盘来平移
      os.maxDistance = 1000; // 最大外移动
      os.minDistance = 100; // 向内最小外移动
      this.orbitControls = os;
    },
    initBg() {
      const texture = this.textureLoader.load(envConifg.earthBg);
      const geometry = new THREE.SphereGeometry(envConifg.r, 50, 50);
      const material = new THREE.MeshLambertMaterial({
        map: texture,
      });
      const mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);
      // this.scene.add(this.object);
    },
    glRender() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.glRender);
    },
  },
  mounted() {
    this.initTHREE();
    this.initCamera();
    this.initScene();
    this.initAxisHelper();
    this.initLight();
    this.initOrbitControls();
    this.initBg();
    this.glRender();
  },
};
</script>

<style scoped>
.map {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>