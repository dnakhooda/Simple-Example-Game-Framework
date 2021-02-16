import { Physics2dPlatformer } from "../Library/EngineLibrary.js";

export class Platform extends Physics2dPlatformer {
    constructor(id:string, x:number, y:number, width:number, height:number) {
        super(id, x, y, width, height, "red", 2);
    };
};