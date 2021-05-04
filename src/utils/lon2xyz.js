// 经纬度转坐标
function lon2xyz(R, longitude, latitude) {
    const lon = longitude * Math.PI / 180;
    const lat = latitude * Math.PI / 180;
    const x = R * Math.cos(lat) * Math.sin(lon);
    const y = R * Math.sin(lat);
    const z = R * Math.cos(lon) * Math.cos(lat);
    return { x, y, z };
}
export default lon2xyz;