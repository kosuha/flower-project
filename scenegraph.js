import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75; // field of view(시야각)
const aspect = 2; // canvas의 가로 세로 비율
const near = 0.1; // 카메라 앞에 렌더링되는 공간 범위 (near에서 far까지 렌더링)
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // 카메라 생성

camera.position.set(0, 50, 0); // 카메라 포지션 조정
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene(); // 장면 생성
setLight();

// 회전값을 업데이트할 객체들
const objects = [];

// 하나의 geometry로 모든 태양, 지구, 달을 생성
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // 태양의 크기를 키움
scene.add(sunMesh);
objects.push(sunMesh);

renderer.render(scene, camera); // 렌더링

// 빛 설정하는 함수
function setLight() {
    const color = 0xFFFFFF; // 색
    const intensity = 3; // 강도
    const light = new THREE.PointLight(color, intensity); // 광원 생성
    scene.add(light); // 장면에 추가
}

// 렌더링한 사이즈에 변경이 필요한지(canvas의 크기에 변화가 있는지) 검사하는 함수
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio; // 픽셀 비율을 사이즈에 곱하여 성능 개선
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

// 회전 반복
function render(time) {
    time *= 0.001;  // 정육면체의 X, Y축 회전값을 현재 시간값으로 설정

    // canvas의 크기에 따라 카메라 비율을 변경
    if (resizeRendererToDisplaySize(renderer)) {
        const renderCanvas = renderer.domElement;
        camera.aspect = renderCanvas.clientWidth / renderCanvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
        obj.rotation.y = time;
    });

    renderer.render(scene, camera); // 렌더링

    requestAnimationFrame(render);
}

requestAnimationFrame(render); // 루프 시작