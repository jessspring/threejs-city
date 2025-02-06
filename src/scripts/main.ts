import * as THREE from 'three';
import * as Buildings from "./buildings";
import { getImage } from './images';
import { randomInt } from './functions';
import { drawCanvasTexture } from './canvas';

const planeTexture = await createPlaneTexture();
const backgroundColor = new THREE.Color().setHex(0x882266).multiplyScalar(0.2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

const scene = createScene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const player = new THREE.CylinderGeometry(1, 1, 1);
const playerMesh = new THREE.Mesh(player, undefined);
playerMesh.position.z = 5;
playerMesh.position.y = 1;
playerMesh.add(camera);
scene.add(playerMesh);

scene.add(new THREE.AmbientLight(backgroundColor, 10));

scene.add(createLight(-8, 5, -8, 0xdddddd, 100, 20));
scene.add(createLight(-8, 5, 16, 0xdddddd, 100, 20));
scene.add(createLight(16, 5, -8, 0xdddddd, 100, 20));
scene.add(createLight(16, 5, 16, 0xdddddd, 100, 20));

const buildingFunctions = [
    Buildings.createBuilding11,
    Buildings.createBuilding12,
    Buildings.createBuilding21,
    Buildings.createBuilding22,
    Buildings.createBuilding31,
    Buildings.createBuilding32,
];

const citySize = 3;

for (let x = -citySize; x < citySize + 1; x++)
    for (let z = -citySize; z < citySize + 1; z++) {
        scene.add(createPavement(x * 24 + 4, z * 24 + 4));
        scene.add(createPlane(x * 24, z * 24));

        if (x == 0 && z == 0)
            continue;

        // if (randomInt(0, 9) == 0)
        //     continue;

        scene.add(buildingFunctions[randomInt(0, buildingFunctions.length - 1)](x * 24 + 4, z * 24 + 4));
    }

function animate() {
    movement();

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

document.body.addEventListener("mousemove", onMouseMove, false);
document.body.addEventListener("click", async () => {
    await document.body.requestPointerLock();
});

function movement() {
    const speed = keysDown["ShiftLeft"] ? 0.2 : 0.02;

    if (keysDown["KeyW"])
        playerMesh.translateZ(-speed);
    if (keysDown["KeyS"])
        playerMesh.translateZ(speed);
    if (keysDown["KeyA"])
        playerMesh.translateX(-speed);
    if (keysDown["KeyD"])
        playerMesh.translateX(speed);
    if (keysDown["Space"])
        playerMesh.translateY(speed);
    if (keysDown["ControlLeft"])
        playerMesh.translateY(-speed);
}

function onMouseMove(event: MouseEvent) {
    if (document.pointerLockElement != document.body)
        return;

    playerMesh.rotateY(-event.movementX / 250);
    camera.rotateX(-event.movementY / 250);
}

const keysDown = {} as Record<string, boolean>;
function recordKeyDown(event: KeyboardEvent) {
    keysDown[event.code] = true;
}
function recordKeyUp(event: KeyboardEvent) {
    keysDown[event.code] = false;
}

document.body.addEventListener("keydown", recordKeyDown);
document.body.addEventListener("keyup", recordKeyUp);

function createPavement(x: number, z: number) {
    const geometry = new THREE.BoxGeometry(20, 1, 20);
    const material = new THREE.MeshPhongMaterial({
        color: 0x444444
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, -0.25, z);

    return mesh;
}

function createLight(x: number, y: number, z: number, color: THREE.ColorRepresentation, intensity: number, decay: number) {
    const light = new THREE.PointLight(color, intensity, decay);
    light.position.set(x, y, z);
    light.castShadow = true;
    light.shadow.mapSize = new THREE.Vector2(4096, 4096);

    return light;
}


function createScene() {
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(backgroundColor, 0, 100);
    // scene.background = backgroundColor;
    scene.background = createSkyboxTextures();

    return scene;
}

function createPlane(x: number, z: number) {
    const material = new THREE.MeshPhongMaterial({
        map: planeTexture,
        side: THREE.FrontSide
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), material);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.position.set(x, 0, z)
    plane.rotateX(Math.PI * 1.5);

    return plane;
}

async function createPlaneTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;

    const road1 = await getImage("road1");
    const road2 = await getImage("road2");
    const road3 = await getImage("road3");
    const road4 = await getImage("road4");

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    context.drawImage(road3, 0, 0, 32, 32);
    context.drawImage(road1, 0, 32, 32, 32);
    context.drawImage(road1, 0, 64, 32, 32);
    context.drawImage(road2, 32, 0, 32, 32);
    context.drawImage(road2, 64, 0, 32, 32);
    context.drawImage(road4, 32, 32, 32, 32);
    context.drawImage(road4, 32, 64, 32, 32);
    context.drawImage(road4, 64, 32, 32, 32);
    context.drawImage(road4, 64, 64, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

function createSkyboxTextures() {
    const topColor = "#000077";
    const middleColor1 = "#7700ff";
    const middleColor2 = "#ff77ff";
    const bottomColor = "#ffff00";

    const topTexture = drawCanvasTexture(128, 128, context => {
        context.fillStyle = topColor;
        context.fillRect(0, 0, 128, 128);
    });
    const bottomTexture = drawCanvasTexture(128, 128, context => {
        context.fillStyle = bottomColor;
        context.fillRect(0, 0, 128, 128);
    });
    const middleTexture = drawCanvasTexture(128, 128, context => {
        const grad1 = context.createLinearGradient(0, 0, 0, 21);
        grad1.addColorStop(0, topColor);
        grad1.addColorStop(1, middleColor1);
        context.fillStyle = grad1;
        context.fillRect(0, 0, 128, 21);

        const grad2 = context.createLinearGradient(0, 21, 0, 42);
        grad2.addColorStop(0, middleColor1);
        grad2.addColorStop(1, middleColor2);
        context.fillStyle = grad2;
        context.fillRect(0, 21, 128, 21);

        const grad3 = context.createLinearGradient(0, 42, 0, 64);
        grad3.addColorStop(0, middleColor2);
        grad3.addColorStop(1, bottomColor);
        context.fillStyle = grad3;
        context.fillRect(0, 42, 128, 22);

        context.fillStyle = bottomColor;
        context.fillRect(0, 64, 128, 64);
    });

    const textures = [
        middleTexture,
        middleTexture,
        topTexture,
        bottomTexture,
        middleTexture,
        middleTexture
    ].map(x => x.image);

    const cubeTexture = new THREE.CubeTexture(textures);
    cubeTexture.needsUpdate = true;
    cubeTexture.magFilter = THREE.NearestFilter;

    return cubeTexture;
}
