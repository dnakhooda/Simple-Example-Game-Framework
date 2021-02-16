import { Platform } from "./GameObjects/Platform.js";
import { Player } from "./GameObjects/Player.js";
import { Camera, getGame, getRender } from "./Library/EngineLibrary.js";

export function draw() { 
    
};


export function update() {
    // Set Referance to Player
    const players:Player[] = getGame().getSpritesByClass(Player);
    const camera:Camera = getGame().getCamera();

    // Player
    players.forEach(player => {
        player.doMovement();
        player.doGravity();
        player.doFriction();

        camera.goTo(player.getX() - getRender().getWidth()/2 + player.getWidth()/2, player.getY() - getRender().getHeight()/1.5 + player.getHeight()/2);
    });

    // Camera
    if (camera.getX() < 1)
        camera.setX(0);
    if (camera.getY() < 1)
        camera.setY(0);
};


export function init() {
    // Make Canvas Cover Full Screen
    getRender().makeCanvasCoverFullScreen(16, 9);
    window.addEventListener('resize', () => getRender().makeCanvasCoverFullScreen(16, 9));

    // Create Player Sprite
    getGame().addNewSprite(new Player(0,0));
    getGame().addNewSprite(new Platform("platform1", 0, 610, 1800, 1000));
    getGame().addNewSprite(new Platform("platform2", 350, 550, 130, 30));
    getGame().addNewSprite(new Platform("platform3", 600, 580, 30, 30));
    getGame().addNewSprite(new Platform("platform4", 630, 550, 30, 60));
    getGame().addNewSprite(new Platform("platform5", 660, 520, 30, 90));
    getGame().addNewSprite(new Platform("platform6", 0, 510, 100, 300));

    // Set Reverance to Player and Set Player Location
    const player:Player = getGame().getSpritesByClass(Player)[0];
    player.goTo(425, 500);
};


export function load() {
    
};