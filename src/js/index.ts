import '~/css/index.scss';
import * as Controls from "three/examples/jsm/controls/OrbitControls";
import * as Stats from "three/examples/jsm/libs/stats.module";
import test from "@/test.png";

window.onload = () => {
    const renderer = new THREE.WebGLRenderer({
        canvas: <HTMLCanvasElement>document.querySelector("#webgl-canvas"),
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xD3D3D3);

    const camera = new THREE.PerspectiveCamera(45.0, window.innerWidth / window.innerHeight, 1.0, 1000.0);
    camera.position.set(0.0, 50.0, 50.0);

    const controls = new Controls.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    const ambientLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0.3, 0.6);
    scene.add(hemisphereLight);

    const grid = new THREE.GridHelper(100.0, 100.0);
    scene.add(grid);

    const axes = new THREE.AxesHelper(camera.far);
    scene.add(axes);

    const stats = Stats.default();
    document.body.appendChild(stats.dom);

    window.onresize = () => {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    const tick = () => {
        requestAnimationFrame(tick);
        controls.update();
        renderer.render(scene, camera);
        stats.update();
    }
    tick();
}
