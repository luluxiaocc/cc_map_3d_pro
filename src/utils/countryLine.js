import * as THREE from 'three';
import lon2xyz from './lon2xyz'
function countryLine(R, polygonArr) {
  const group = new THREE.Group();
  polygonArr.forEach(polygon => {
    const pointArr = [];
    polygon[0].forEach(elem => {
      const coord = lon2xyz(R, elem[0], elem[1])
      pointArr.push(coord.x, coord.y, coord.z);
    });
    group.add(line(pointArr));
  });
  return group;
}
function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color: 0x00aaaa,
  });
  const line = new THREE.LineLoop(geometry, material);
  return line;
}



export default countryLine;