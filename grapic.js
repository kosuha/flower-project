import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75; // field of view(시야각)
const aspect = 2; // canvas의 가로 세로 비율
const near = 0.1; // 카메라 앞에 렌더링되는 공간 범위 (near에서 far까지 렌더링)
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // 카메라 생성

camera.position.z = 3; // 카메라 포지션 조정 (기본: xyz가 0이며 -z를 바라본다)

const scene = new THREE.Scene(); // 장면 생성
scene.background = new THREE.Color(0xAAAAAA);
setLight(); // 광원 생성

function setLight() {
    const color = 0xFFFFFF; // 색
    const intensity = 1; // 강도
    const light = new THREE.DirectionalLight(color, intensity); // 광원 생성
    light.position.set(-1, 2, 4); // 위치 설정
    scene.add(light); // 장면에 추가
}

const boxWidth = 1; // 가로 세로 높이 지정
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); // 기하학 객체 생성

// 큐브를 만드는 함수
function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

// 큐브의 배열
const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
];

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

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera); // 렌더링

    requestAnimationFrame(render);
}

requestAnimationFrame(render); // 루프 시작