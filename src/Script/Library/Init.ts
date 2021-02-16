import { Events } from "../GameObjects/Events/Events.js";
import { Game } from "../GameObjects/Game.js";
import { draw, init, load, update } from "../Main.js";
import { ControllerObj, EngineObj, LoaderObj, RenderObj } from "./EngineLibrary.js";

(() => {
    // Setting objects
    const loader = new LoaderObj;
    const event = new Events();
    const render = new RenderObj(document.querySelector("canvas"), draw);
    const game = new Game();
    const controller = new ControllerObj(render, event);
    const engine = new EngineObj(update, render.getFullDrawFunction(), 70);
    // Init Stuff Inside Objects
    engine.init(render, game, controller, loader, init, load);
})();