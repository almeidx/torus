import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector<HTMLCanvasElement>('#background')!,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(20, 20, -10);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 16, 100),
  new THREE.MeshStandardMaterial({
    color: 0x32af60,
    // wireframe: true,
  })
);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(
  torus,
  pointLight,
  new THREE.PointLightHelper(pointLight),
  new THREE.GridHelper(200, 50)
);

function addStar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  const [x, y, z] = Array(3)
    .fill(void 0)
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

for (let i = 0; i < 200; i++) addStar();

scene.background = new THREE.TextureLoader().load('assets/nebula.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('assets/moon.jpg'),
    normalMap: new THREE.TextureLoader().load('assets/normal.jpg'),
  })
);

scene.add(moon);

(function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
})();
