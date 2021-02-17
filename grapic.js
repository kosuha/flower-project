import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75; // field of view(시야각)
const aspect = 2; // canvas의 가로 세로 비율
const near = 0.1; // 카메라 앞에 렌더링되는 공간 범위 (near에서 far까지 렌더링)
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); // 카메라 생성

camera.position.z = 2; // 카메라 포지션 조정 (기본: xyz가 0이며 -z를 바라본다)

const scene = new THREE.Scene(); // 장면 생성

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
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // 머터리얼 생성
const cube = new THREE.Mesh(geometry, material); // 기하학 객체와 머터리얼을 적용한 매쉬 생성
scene.add(cube); // 장면에 추가

// 회전
function render(time) {
    time *= 0.001;  // 정육면체의 X, Y축 회전값을 현재 시간값으로 설정

    cube.rotation.x = time; // radians
    cube.rotation.y = time;

    renderer.render(scene, camera); // 렌더링

    requestAnimationFrame(render);
}

requestAnimationFrame(render); // 루프 시작