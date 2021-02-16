import { Physics2dPlatformer } from "../Library/EngineLibrary.js";
import { Platform } from "./Platform.js";
export class Player extends Physics2dPlatformer {
    constructor(x, y) {
        super("player", x, y, 30, 30, "blue", 10);
    }
    ;
    doMovement() {
        if (this.getKey("a"))
            this.changeVX(-this.getVXSpeed());
        if (this.getKey("d"))
            this.changeVX(this.getVXSpeed());
        if (this.getKey(" "))
            this.doJump(6);
        if (this.getMoveXInfo().didCollide())
            this.setVX(0);
        if (this.getMoveYInfo().didCollide())
            this.setVY(0);
        if (this.getX() < 0) {
            this.setX(0);
            this.setVX(0);
        }
        ;
        if (this.getY() < 0) {
            this.setY(0);
            this.setVY(0);
        }
        ;
        this.moveX(this.getVX());
    }
    ;
    doFriction() {
        if (this.getSpriteBelow() instanceof Platform) {
            this.addFrictionX(0.9);
        }
        else {
            this.addFrictionX(0.92);
        }
        ;
    }
    ;
}
;
