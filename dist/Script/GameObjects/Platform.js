import { Physics2dPlatformer } from "../Library/EngineLibrary.js";
export class Platform extends Physics2dPlatformer {
    constructor(id, x, y, width, height) {
        super(id, x, y, width, height, "red", 2);
    }
    ;
}
;
