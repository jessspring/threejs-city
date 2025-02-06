import * as THREE from "three";
import { randomInt } from "./functions";
import { drawCanvasTexture } from "./canvas";

const b1Texture1 = createBuilding1Texture1(16, 48);
function createBuilding1(x: number, z: number, texture: THREE.CanvasTexture) {
    const height = 40 + randomInt(0, 5) * 10;
    const geometry = new THREE.BoxGeometry(16, height, 16);

    const material = new THREE.MeshPhongMaterial({
        map: b1Texture1,
        emissiveMap: texture,
        emissive: 0xffffff,
        side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, (height / 2) + 0.25, z);

    return mesh;
}

function createBuilding1Texture1(w: number, h: number) {
    return drawCanvasTexture(w * 16, h * 16, context => {
        context.lineWidth = 0;
        context.fillStyle = "#595959";
        context.fillRect(0, 0, w * 16, h * 16);

        context.fillStyle = "#414141";
        for (let x = 0; x < w; x++)
            for (let y = 0; y < h; y++)
                context.fillRect(x * 16 + 4, y * 16 + 2, 8, 12);

        context.fillStyle = "#595959";
        context.fillRect(0, h * 15, w * 16, h * 2);
    });
}

function createBuilding1Texture2(w: number, h: number, color: string) {
    return drawCanvasTexture(w * 16, h * 16, context => {
        context.lineWidth = 0;
        context.fillStyle = color;
        for (let i = 0; i < (w * h) / 5; i++)
            context.fillRect(randomInt(0, w - 1) * 16 + 4, randomInt(0, h - 1) * 16 + 2, 8, 12);

        context.clearRect(0, h * 15, w * 16, h * 2);
    });
}

const b1Texture21 = createBuilding1Texture2(16, 48, "#ffff00");
export function createBuilding11(x: number, z: number) {
    return createBuilding1(x, z, b1Texture21);
}

const b1Texture22 = createBuilding1Texture2(16, 48, "#ff00ff");
export function createBuilding12(x: number, z: number) {
    return createBuilding1(x, z, b1Texture22);
}

function createBuilding2Texture(color: string) {
    return drawCanvasTexture(32, 64, context => {
        context.lineWidth = 0;
        context.fillStyle = color;
        context.fillRect(3, 0, 2, 64);
        context.fillRect(11, 0, 2, 64);
        context.fillRect(19, 0, 2, 64);
        context.fillRect(27, 0, 2, 64);

        for (let i = 0; i < 10; i++)
            context.fillRect(0, i * 6, 32, 1);
    });
}

function createBuilding2(x: number, z: number, texture: THREE.CanvasTexture) {
    const geometry = new THREE.BoxGeometry(16, 64, 16);

    const material = new THREE.MeshPhongMaterial({
        color: 0x777777,
        emissiveMap: texture,
        emissive: 0xffffff,
        side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, (64 / 2) + 0.25, z);

    return mesh;
}

const b2t1 = createBuilding2Texture("#ff0000");
export function createBuilding21(x: number, z: number) {
    return createBuilding2(x, z, b2t1);
}

const b2t2 = createBuilding2Texture("#00ff00");
export function createBuilding22(x: number, z: number) {
    return createBuilding2(x, z, b2t2);
}


function createBuilding3(x: number, z: number, texture: THREE.CanvasTexture) {
    const geometry = new THREE.BoxGeometry(16, 32, 16);

    const material = new THREE.MeshPhongMaterial({
        color: 0x666666,
        emissiveMap: texture,
        emissive: 0xffffff,
        side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, (32 / 2) + 0.25, z);

    return mesh;
}

function createBuilding3Texture(color: string) {
    return drawCanvasTexture(32, 48, context => {
        context.lineWidth = 0;
        context.fillStyle = color;
        for (let i = 0; i < 7; i++)
            context.fillRect(3, i * 6 + 3, 27, 1);

        context.fillStyle = "#ffffff";
        for (let i = 0; i < 25; i++)
            context.fillRect(randomInt(0, 12) * 2 + 3, randomInt(0, 6) * 6 + 3, 2, 1);
    });
}

const b3t1 = createBuilding3Texture("#00ffff");
export function createBuilding31(x: number, z: number) {
    return createBuilding3(x, z, b3t1);
}

const b3t2 = createBuilding3Texture("#ffff00");
export function createBuilding32(x: number, z: number) {
    return createBuilding3(x, z, b3t2);
}
