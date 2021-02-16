// DanielWebsite Game Framework
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _images, _assetsToLoad, _keysDown, _mouseX, _mouseY, _active, _event, _tps, _update, _draw, _runOnSameEngine, _fpsChecker, _tpsChecker, _realFps, _realTps, _stop, _didInit, _initFunc, _stopForInit, _maxFPS_1, _startRender, _startUpdate, _startCheckFPS, _showingInfo, _canvas, _draw_1, _ctx, _zoom, _owidth, _oheight, _x_1, _y_1, _width_1, _height_1, _color_1, _id_1, _stageLevel_1, _effects, _costumes, _costumeSetIndex, _sounds, _advancedSettings, _gameSprites, _background, _camera, _mapReaderImage, _mapReaderCanvas, _hidden_1, _transparency_1, _size_1, _objBinded, _vy, _gravityAcc_1, _lastPlatformTouched, _direction_1, _moveXInfo, _moveYInfo, _vx_1, _vxSpeed_1, _maxVX_1, _vySpeed_1, _maxVY_1, _hasBlockBelow, _physicsObjectsToCheckCollision, _normalPhysicsCheckCollision, _didTouch, _spriteCollided, _isNextToSprite, _direction_2, _obj, _direction_3, _x_2, _y_2;
// It is recommended that you do not change anything beyond this point
export var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
;
export let getRender;
export let getGame;
export let getController;
export let getEngine;
export let getLoader;
export var ScreenPlaces;
(function (ScreenPlaces) {
    ScreenPlaces[ScreenPlaces["randomPosition"] = 0] = "randomPosition";
    ScreenPlaces[ScreenPlaces["center"] = 1] = "center";
})(ScreenPlaces || (ScreenPlaces = {}));
;
export class LoaderObj {
    constructor() {
        _images.set(this, void 0);
        _assetsToLoad.set(this, void 0);
        __classPrivateFieldSet(this, _images, []);
        __classPrivateFieldSet(this, _assetsToLoad, 0);
    }
    ;
    loadImage(id, src) {
        let image = new Image();
        image.src = src;
        __classPrivateFieldGet(this, _images).push([id, image]);
        image.onload = () => { var _a; return __classPrivateFieldSet(this, _assetsToLoad, (_a = +__classPrivateFieldGet(this, _assetsToLoad)) - 1), _a; };
        __classPrivateFieldSet(this, _assetsToLoad, +__classPrivateFieldGet(this, _assetsToLoad) + 1);
    }
    ;
    getLoadedImageById(id) {
        let toReturn = null;
        __classPrivateFieldGet(this, _images).forEach(item => {
            if (item[0] === id)
                toReturn = item[1];
        });
        return toReturn;
    }
    ;
    getNumberOfAssetsToLoad() { return __classPrivateFieldGet(this, _assetsToLoad); }
    ;
}
_images = new WeakMap(), _assetsToLoad = new WeakMap();
;
export class EventObj {
    constructor() {
    }
    ;
    onClick(event) { }
    ;
    offClick(event) { }
    ;
    mouseDown(event) { }
    ;
    mouseMove(event) { }
    ;
}
;
export class ControllerObj {
    constructor(render, event) {
        _keysDown.set(this, void 0);
        _mouseX.set(this, void 0);
        _mouseY.set(this, void 0);
        _active.set(this, void 0);
        _event.set(this, void 0);
        __classPrivateFieldSet(this, _keysDown, {});
        __classPrivateFieldSet(this, _mouseX, null);
        __classPrivateFieldSet(this, _mouseY, null);
        __classPrivateFieldGet(this, _active);
        __classPrivateFieldSet(this, _active, false);
        __classPrivateFieldSet(this, _event, event);
        document.onkeydown = (event) => {
            __classPrivateFieldGet(this, _keysDown)[event.key] = true;
            switch (event.key) {
                case `F2`:
                    render.changeShowInfo();
                    break;
            }
            ;
            __classPrivateFieldGet(this, _event).onClick(event);
        };
        document.onkeyup = (event) => {
            __classPrivateFieldGet(this, _keysDown)[event.key] = false;
            switch (event.key) {
                case ``:
                    break;
            }
            ;
            __classPrivateFieldGet(this, _event).offClick(event);
        };
        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState === "visible") {
                __classPrivateFieldSet(this, _active, true);
            }
            else {
                __classPrivateFieldSet(this, _active, false);
                for (var key in __classPrivateFieldGet(this, _keysDown))
                    __classPrivateFieldGet(this, _keysDown)[key] = false;
            }
            ;
        });
        render.getCanvas().addEventListener("mousedown", (event) => {
            __classPrivateFieldGet(this, _event).mouseDown(event);
        });
        render.getCanvas().addEventListener("mousemove", (event) => {
            const boundings = render.getCanvas().getBoundingClientRect();
            const x = event.clientX - boundings.left;
            const y = event.clientY - boundings.top;
            this.setMouseX(x);
            this.setMouseY(y);
            __classPrivateFieldGet(this, _event).mouseMove(event);
        });
    }
    ;
    getKey(key) {
        if (__classPrivateFieldGet(this, _keysDown)[key] === undefined)
            return false;
        return __classPrivateFieldGet(this, _keysDown)[key];
    }
    ;
    getMouseX() { return __classPrivateFieldGet(this, _mouseX); }
    ;
    getMouseY() { return __classPrivateFieldGet(this, _mouseY); }
    ;
    setMouseX(x) { __classPrivateFieldSet(this, _mouseX, x); }
    ;
    setMouseY(y) { __classPrivateFieldSet(this, _mouseY, y); }
    ;
}
_keysDown = new WeakMap(), _mouseX = new WeakMap(), _mouseY = new WeakMap(), _active = new WeakMap(), _event = new WeakMap();
;
export class EngineObj {
    constructor(update, draw, tps) {
        _tps.set(this, void 0);
        _update.set(this, void 0);
        _draw.set(this, void 0);
        _runOnSameEngine.set(this, void 0);
        _fpsChecker.set(this, void 0);
        _tpsChecker.set(this, void 0);
        _realFps.set(this, void 0);
        _realTps.set(this, void 0);
        _stop.set(this, void 0);
        _didInit.set(this, void 0);
        _initFunc.set(this, void 0);
        _stopForInit.set(this, void 0);
        _maxFPS_1.set(this, void 0);
        _startRender.set(this, () => {
            if (!__classPrivateFieldGet(this, _stop) && (__classPrivateFieldGet(this, _fpsChecker) < __classPrivateFieldGet(this, _maxFPS_1) || __classPrivateFieldGet(this, _maxFPS_1) === null)) {
                if (!__classPrivateFieldGet(this, _stopForInit)) {
                    if (!__classPrivateFieldGet(this, _didInit)) {
                        __classPrivateFieldGet(this, _initFunc).call(this);
                        __classPrivateFieldSet(this, _didInit, true);
                    }
                    ;
                    __classPrivateFieldSet(this, _fpsChecker, +__classPrivateFieldGet(this, _fpsChecker) + 1);
                    if (__classPrivateFieldGet(this, _runOnSameEngine))
                        __classPrivateFieldGet(this, _update).call(this);
                    __classPrivateFieldGet(this, _draw).call(this);
                }
                else {
                    if (getLoader().getNumberOfAssetsToLoad() === 0)
                        __classPrivateFieldSet(this, _stopForInit, false);
                    getLoader().getNumberOfAssetsToLoad();
                }
                ;
            }
            ;
            window.requestAnimationFrame(__classPrivateFieldGet(this, _startRender));
        });
        _startUpdate.set(this, () => {
            setInterval(() => {
                if (!__classPrivateFieldGet(this, _stop) && __classPrivateFieldGet(this, _tpsChecker) < __classPrivateFieldGet(this, _tps)) {
                    __classPrivateFieldSet(this, _tpsChecker, +__classPrivateFieldGet(this, _tpsChecker) + 1);
                    if (!__classPrivateFieldGet(this, _runOnSameEngine))
                        __classPrivateFieldGet(this, _update).call(this);
                }
                ;
            }, 1000 / __classPrivateFieldGet(this, _tps));
        });
        _startCheckFPS.set(this, () => {
            setInterval(() => {
                __classPrivateFieldSet(this, _realFps, __classPrivateFieldGet(this, _fpsChecker));
                __classPrivateFieldSet(this, _realTps, __classPrivateFieldGet(this, _tpsChecker));
                __classPrivateFieldSet(this, _fpsChecker, 0);
                __classPrivateFieldSet(this, _tpsChecker, 0);
            }, 1000);
        });
        __classPrivateFieldSet(this, _runOnSameEngine, false);
        __classPrivateFieldSet(this, _tps, tps);
        __classPrivateFieldSet(this, _update, update);
        __classPrivateFieldSet(this, _draw, draw);
        __classPrivateFieldSet(this, _initFunc, null);
        __classPrivateFieldSet(this, _fpsChecker, 0);
        __classPrivateFieldSet(this, _tpsChecker, 0);
        __classPrivateFieldSet(this, _realFps, 0);
        __classPrivateFieldSet(this, _realTps, 0);
        __classPrivateFieldSet(this, _stop, false);
        __classPrivateFieldSet(this, _didInit, false);
        __classPrivateFieldSet(this, _stopForInit, false);
        __classPrivateFieldSet(this, _maxFPS_1, null);
    }
    ;
    init(render, game, controller, loader, init, load) {
        getRender = () => { return render; };
        getGame = () => { return game; };
        getController = () => { return controller; };
        getEngine = () => { return this; };
        getLoader = () => { return loader; };
        load();
        if (getLoader().getNumberOfAssetsToLoad() !== 0)
            __classPrivateFieldSet(this, _stopForInit, true);
        __classPrivateFieldSet(this, _initFunc, init);
        __classPrivateFieldGet(this, _startRender).call(this);
        __classPrivateFieldGet(this, _startUpdate).call(this);
        __classPrivateFieldGet(this, _startCheckFPS).call(this);
    }
    ;
    getFps() { return __classPrivateFieldGet(this, _realFps); }
    ;
    getTps() { return __classPrivateFieldGet(this, _realTps); }
    ;
    stop() { __classPrivateFieldSet(this, _stop, true); }
    ;
    reStart() { __classPrivateFieldSet(this, _stop, false); }
    ;
    setRunOnUpdateOnRenderLoop(set) { __classPrivateFieldSet(this, _runOnSameEngine, set); }
    ;
    setMaxFPS(_maxFPS) { __classPrivateFieldSet(this, _maxFPS_1, _maxFPS); }
    ;
}
_tps = new WeakMap(), _update = new WeakMap(), _draw = new WeakMap(), _runOnSameEngine = new WeakMap(), _fpsChecker = new WeakMap(), _tpsChecker = new WeakMap(), _realFps = new WeakMap(), _realTps = new WeakMap(), _stop = new WeakMap(), _didInit = new WeakMap(), _initFunc = new WeakMap(), _stopForInit = new WeakMap(), _maxFPS_1 = new WeakMap(), _startRender = new WeakMap(), _startUpdate = new WeakMap(), _startCheckFPS = new WeakMap();
;
export class RenderObj {
    constructor(canvas, draw) {
        _showingInfo.set(this, void 0);
        _canvas.set(this, void 0);
        _draw_1.set(this, void 0);
        _ctx.set(this, void 0);
        _zoom.set(this, void 0);
        this.setupCanvas = (canvas) => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            return ctx;
        };
        this.getFullDrawFunctionPrivate = () => {
            return () => {
                __classPrivateFieldGet(this, _ctx).save();
                if (getGame().getBackgroundImage() === null) {
                    __classPrivateFieldGet(this, _ctx).fillStyle = `black`;
                    __classPrivateFieldGet(this, _ctx).fillRect(0, 0, this.getWidth(), this.getHeight());
                }
                else {
                    __classPrivateFieldGet(this, _ctx).drawImage(getGame().getBackgroundImage(), 0, 0, this.getWidth(), this.getHeight());
                }
                let maxLevel = 0;
                getGame().getAllSprites().forEach((obj) => {
                    if (obj.getStageLevel() > maxLevel)
                        maxLevel = obj.getStageLevel();
                });
                for (let i = 0; i < maxLevel + 1; i++) {
                    getGame().getAllSprites().forEach((obj) => {
                        if (obj.getStageLevel() == i) {
                            if (obj.getCostumeImage()[1] == null) {
                                this.drawSprite(obj);
                            }
                            else {
                                this.drawSpriteImage(obj, obj.getCostumeImage()[1]);
                            }
                            ;
                        }
                        ;
                    });
                }
                ;
                __classPrivateFieldGet(this, _draw_1).call(this);
                if (__classPrivateFieldGet(this, _showingInfo)) {
                    __classPrivateFieldGet(this, _ctx).fillStyle = `white`;
                    __classPrivateFieldGet(this, _ctx).font = '24px serif';
                    __classPrivateFieldGet(this, _ctx).fillText(`FPS: ${getEngine().getFps()}`, 20, 40);
                    __classPrivateFieldGet(this, _ctx).fillText(`TPS: ${getEngine().getTps()}`, 20, 80);
                }
                ;
                __classPrivateFieldGet(this, _ctx).restore();
            };
        };
        __classPrivateFieldSet(this, _canvas, canvas);
        __classPrivateFieldSet(this, _draw_1, draw);
        __classPrivateFieldSet(this, _ctx, this.setupCanvas(canvas));
        __classPrivateFieldSet(this, _showingInfo, false);
        __classPrivateFieldSet(this, _zoom, 1);
    }
    ;
    setCanvasZoom(zoom) {
        let resetValue = this.getWidth() / (this.getWidth() * __classPrivateFieldGet(this, _zoom));
        this.getCtx().scale(resetValue, resetValue);
        __classPrivateFieldSet(this, _zoom, zoom / 100);
        this.getCtx().scale(__classPrivateFieldGet(this, _zoom), __classPrivateFieldGet(this, _zoom));
    }
    ;
    getCanvasZoom() { return __classPrivateFieldGet(this, _zoom) * 100; }
    ;
    getFullDrawFunction() {
        return this.getFullDrawFunctionPrivate().bind(this);
    }
    ;
    makeCanvasCoverFullScreen(xRatio, yRatio) {
        __classPrivateFieldGet(this, _canvas);
        if (window.innerHeight > window.innerWidth * (yRatio / xRatio)) {
            __classPrivateFieldGet(this, _canvas).style.width = window.innerWidth + "px";
            __classPrivateFieldGet(this, _canvas).style.height = window.innerWidth * (yRatio / xRatio) + "px";
        }
        else {
            __classPrivateFieldGet(this, _canvas).style.width = window.innerHeight * (xRatio / yRatio) + "px";
            __classPrivateFieldGet(this, _canvas).style.height = window.innerHeight + "px";
        }
    }
    ;
    getCanvas() { return __classPrivateFieldGet(this, _canvas); }
    ;
    drawSprite(object) {
        if (!object.getEffect().getHidden()) {
            __classPrivateFieldGet(this, _ctx).globalAlpha = 1 - (object.getEffect().getTransparency() / 10);
            __classPrivateFieldGet(this, _ctx).fillStyle = object.getColor();
            __classPrivateFieldGet(this, _ctx).fillRect(object.getX() - getGame().getCamera().getX(), object.getY() - getGame().getCamera().getY(), object.getWidth(), object.getHeight());
        }
        ;
    }
    ;
    drawSpriteImage(object, image) {
        if (!object.getEffect().getHidden()) {
            __classPrivateFieldGet(this, _ctx).globalAlpha = 1 - (object.getEffect().getTransparency() / 10);
            __classPrivateFieldGet(this, _ctx).fillStyle = object.getColor();
            __classPrivateFieldGet(this, _ctx).drawImage(image, object.getX() - getGame().getCamera().getX(), object.getY() - getGame().getCamera().getY(), object.getWidth(), object.getHeight());
        }
        ;
    }
    ;
    drawSpriteWithInputs(x, y, width, height, color) {
        __classPrivateFieldGet(this, _ctx).fillStyle = color;
        __classPrivateFieldGet(this, _ctx).fillRect(x, y, width, height);
    }
    ;
    getWidth() { return __classPrivateFieldGet(this, _canvas).width / (this.getCanvasZoom() / 100); }
    ;
    getHeight() { return __classPrivateFieldGet(this, _canvas).height / (this.getCanvasZoom() / 100); }
    ;
    getShowInfo() { return __classPrivateFieldGet(this, _showingInfo); }
    ;
    changeShowInfo() { __classPrivateFieldSet(this, _showingInfo, !__classPrivateFieldGet(this, _showingInfo)); }
    ;
    getCtx() { return __classPrivateFieldGet(this, _ctx); }
    ;
}
_showingInfo = new WeakMap(), _canvas = new WeakMap(), _draw_1 = new WeakMap(), _ctx = new WeakMap(), _zoom = new WeakMap();
;
export class AdvancedDetails {
    constructor(owidth, oheight) {
        _owidth.set(this, void 0);
        _oheight.set(this, void 0);
        __classPrivateFieldSet(this, _owidth, owidth);
        __classPrivateFieldSet(this, _oheight, oheight);
    }
    ;
    getOrignalWidth() { return __classPrivateFieldGet(this, _owidth); }
    ;
    getOrignalHeight() { return __classPrivateFieldGet(this, _oheight); }
    ;
}
_owidth = new WeakMap(), _oheight = new WeakMap();
;
export class SpriteObj {
    constructor(id, x, y, width, height, color, stageLevel) {
        _x_1.set(this, void 0);
        _y_1.set(this, void 0);
        _width_1.set(this, void 0);
        _height_1.set(this, void 0);
        _color_1.set(this, void 0);
        _id_1.set(this, void 0);
        _stageLevel_1.set(this, void 0);
        _effects.set(this, void 0);
        _costumes.set(this, void 0);
        _costumeSetIndex.set(this, void 0);
        _sounds.set(this, void 0);
        _advancedSettings.set(this, void 0);
        __classPrivateFieldSet(this, _x_1, x);
        __classPrivateFieldSet(this, _y_1, y);
        __classPrivateFieldSet(this, _width_1, width);
        __classPrivateFieldSet(this, _height_1, height);
        __classPrivateFieldSet(this, _color_1, color);
        __classPrivateFieldSet(this, _id_1, id);
        __classPrivateFieldSet(this, _stageLevel_1, stageLevel);
        __classPrivateFieldSet(this, _effects, new EffectObj(false, 0, 100, this));
        __classPrivateFieldSet(this, _costumes, [[null, null]]);
        __classPrivateFieldSet(this, _costumeSetIndex, 0);
        __classPrivateFieldSet(this, _sounds, [[null, null]]);
        __classPrivateFieldSet(this, _advancedSettings, new AdvancedDetails(width, height));
    }
    ;
    getX() { return __classPrivateFieldGet(this, _x_1); }
    ;
    setX(_x) {
        __classPrivateFieldSet(this, _x_1, _x);
        __classPrivateFieldSet(this, _x_1, Number(__classPrivateFieldGet(this, _x_1).toFixed(1)));
    }
    ;
    changeX(_x) {
        __classPrivateFieldSet(this, _x_1, __classPrivateFieldGet(this, _x_1) + _x);
        __classPrivateFieldSet(this, _x_1, Number(__classPrivateFieldGet(this, _x_1).toFixed(1)));
    }
    ;
    getY() { return __classPrivateFieldGet(this, _y_1); }
    ;
    setY(_y) {
        __classPrivateFieldSet(this, _y_1, _y);
        __classPrivateFieldSet(this, _y_1, Number(__classPrivateFieldGet(this, _y_1).toFixed(1)));
    }
    ;
    changeY(_y) {
        __classPrivateFieldSet(this, _y_1, __classPrivateFieldGet(this, _y_1) + _y);
        __classPrivateFieldSet(this, _y_1, Number(__classPrivateFieldGet(this, _y_1).toFixed(1)));
    }
    ;
    getWidth() { return __classPrivateFieldGet(this, _width_1); }
    ;
    setWidth(_width) {
        __classPrivateFieldSet(this, _width_1, _width);
        __classPrivateFieldSet(this, _width_1, Number(__classPrivateFieldGet(this, _width_1).toFixed(1)));
    }
    ;
    changeWidth(_width) {
        __classPrivateFieldSet(this, _width_1, __classPrivateFieldGet(this, _width_1) + _width);
        __classPrivateFieldSet(this, _width_1, Number(__classPrivateFieldGet(this, _width_1).toFixed(1)));
    }
    ;
    getHeight() { return __classPrivateFieldGet(this, _height_1); }
    ;
    setHeight(_height) {
        __classPrivateFieldSet(this, _height_1, _height);
        __classPrivateFieldSet(this, _height_1, Number(__classPrivateFieldGet(this, _height_1).toFixed(1)));
    }
    ;
    changeHeight(_height) {
        __classPrivateFieldSet(this, _height_1, __classPrivateFieldGet(this, _height_1) + _height);
        __classPrivateFieldSet(this, _height_1, Number(__classPrivateFieldGet(this, _height_1).toFixed(1)));
    }
    ;
    getColor() { return __classPrivateFieldGet(this, _color_1); }
    ;
    setColor(_color) { __classPrivateFieldSet(this, _color_1, _color); }
    ;
    getId() { return __classPrivateFieldGet(this, _id_1); }
    ;
    setId(_id) { __classPrivateFieldSet(this, _id_1, _id); }
    ;
    getEffect() { return __classPrivateFieldGet(this, _effects); }
    ;
    setEffect(_effect) { __classPrivateFieldSet(this, _effects, _effect); }
    ;
    getStageLevel() { return __classPrivateFieldGet(this, _stageLevel_1); }
    ;
    setStageLevel(_stageLevel) { __classPrivateFieldSet(this, _stageLevel_1, _stageLevel); }
    ;
    changeStageLevel(_stageLevel) { __classPrivateFieldSet(this, _stageLevel_1, __classPrivateFieldGet(this, _stageLevel_1) + _stageLevel); }
    ;
    getKey(key) { return getController().getKey(key); }
    ;
    getMouseX() { return getController().getMouseX(); }
    ;
    getMouseY() { return getController().getMouseY(); }
    ;
    getScreenWidth() { return getRender().getWidth(); }
    ;
    getScreenHeight() { return getRender().getHeight(); }
    ;
    getAdvancedDetails() {
        return __classPrivateFieldGet(this, _advancedSettings);
    }
    ;
    isOnScreen() {
        if (this.getX() + this.getWidth() >= getGame().getCamera().getX() &&
            this.getX() <= getGame().getCamera().getX() + getRender().getWidth() &&
            this.getY() + this.getHeight() >= getGame().getCamera().getY() &&
            this.getY() <= getGame().getCamera().getY() + getRender().getHeight())
            return true;
        return false;
    }
    ;
    goTo(_x, _y) { __classPrivateFieldSet(this, _x_1, _x); __classPrivateFieldSet(this, _y_1, _y); }
    ;
    to(place) {
        switch (place) {
            case ScreenPlaces.center:
                this.goTo(getRender().getWidth() / 2 - this.getWidth() / 2, getRender().getHeight() / 2 - this.getHeight() / 2);
                break;
            case ScreenPlaces.randomPosition:
                this.goTo(Math.floor(Math.random() * getRender().getWidth()), Math.floor(Math.random() * getRender().getHeight()));
                break;
        }
        ;
    }
    ;
    touching(b) {
        if (this.getX() < b.getX() + b.getWidth() &&
            this.getX() + this.getWidth() > b.getX() &&
            this.getY() < b.getY() + b.getHeight() &&
            this.getY() + this.getHeight() > b.getY()) {
            return true;
        }
        ;
        return false;
    }
    ;
    isTouchingPhsyicsSprite() {
        let toReturn = false;
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (obj.touching(this))
                toReturn = true;
        });
        return toReturn;
    }
    ;
    getTouchingPhsyicsSprite() {
        let toReturn = null;
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (obj.touching(this))
                toReturn = obj;
        });
        return toReturn;
    }
    ;
    isTouchingSprite() {
        let toReturn = false;
        getGame().getAllSprites().forEach(obj => {
            if (obj.touching(this))
                toReturn = true;
        });
        return toReturn;
    }
    ;
    getTouchingSprite() {
        let toReturn = null;
        getGame().getAllSprites().forEach(obj => {
            if (obj.touching(this))
                toReturn = obj;
        });
        return toReturn;
    }
    ;
    getCostumeImage() { return __classPrivateFieldGet(this, _costumes)[__classPrivateFieldGet(this, _costumeSetIndex)]; }
    ;
    getCostumeNumber() { return __classPrivateFieldGet(this, _costumeSetIndex); }
    ;
    addCostume(id, image) {
        __classPrivateFieldGet(this, _costumes).push([id, image]);
    }
    ;
    setCostumeById(id) {
        if (id.toUpperCase() == "NONE") {
            __classPrivateFieldSet(this, _costumeSetIndex, 0);
        }
        else {
            for (let i = 0; i < __classPrivateFieldGet(this, _costumes).length; i++) {
                if (id == __classPrivateFieldGet(this, _costumes)[i][0]) {
                    __classPrivateFieldSet(this, _costumeSetIndex, i);
                    return;
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    nextCostume() {
        if (__classPrivateFieldGet(this, _costumes).length - 1 > 0) {
            if (__classPrivateFieldGet(this, _costumeSetIndex) < __classPrivateFieldGet(this, _costumes).length - 1) {
                __classPrivateFieldSet(this, _costumeSetIndex, +__classPrivateFieldGet(this, _costumeSetIndex) + 1);
            }
            else {
                __classPrivateFieldSet(this, _costumeSetIndex, 1);
            }
            ;
        }
        ;
    }
    ;
    addSound(id, src) {
        let audio = new Audio(src);
        audio.preload = "auto";
        __classPrivateFieldGet(this, _sounds).push([id, audio]);
    }
    ;
    playSoundById(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _sounds).length; i++) {
            if (id == __classPrivateFieldGet(this, _sounds)[i][0]) {
                __classPrivateFieldGet(this, _sounds)[i][1].play();
                return;
            }
            ;
        }
        ;
    }
    ;
    setSoundVolumeById(id, volume) {
        for (let i = 0; i < __classPrivateFieldGet(this, _sounds).length; i++) {
            if (id == __classPrivateFieldGet(this, _sounds)[i][0]) {
                __classPrivateFieldGet(this, _sounds)[i][1].volume = volume / 100;
            }
            ;
        }
        ;
    }
    ;
    stopSoundById(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _sounds).length; i++) {
            if (id == __classPrivateFieldGet(this, _sounds)[i][0]) {
                __classPrivateFieldGet(this, _sounds)[i][1].pause();
                __classPrivateFieldGet(this, _sounds)[i][1].currentTime = 0;
            }
            ;
        }
        ;
    }
    ;
    pauseSoundById(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _sounds).length; i++) {
            if (id == __classPrivateFieldGet(this, _sounds)[i][0]) {
                __classPrivateFieldGet(this, _sounds)[i][1].pause();
            }
            ;
        }
        ;
    }
    ;
}
_x_1 = new WeakMap(), _y_1 = new WeakMap(), _width_1 = new WeakMap(), _height_1 = new WeakMap(), _color_1 = new WeakMap(), _id_1 = new WeakMap(), _stageLevel_1 = new WeakMap(), _effects = new WeakMap(), _costumes = new WeakMap(), _costumeSetIndex = new WeakMap(), _sounds = new WeakMap(), _advancedSettings = new WeakMap();
;
export class GameObj {
    constructor() {
        _gameSprites.set(this, void 0);
        _background.set(this, void 0);
        _camera.set(this, void 0);
        _mapReaderImage.set(this, void 0);
        _mapReaderCanvas.set(this, void 0);
        __classPrivateFieldSet(this, _background, null);
        __classPrivateFieldSet(this, _gameSprites, []);
        __classPrivateFieldSet(this, _camera, new Camera());
        __classPrivateFieldSet(this, _mapReaderImage, null);
        __classPrivateFieldSet(this, _mapReaderCanvas, document.createElement('canvas'));
    }
    ;
    setAndUseImageMap(image, func) {
        __classPrivateFieldSet(this, _mapReaderImage, image);
        this.loadCanvas();
        this.useImageMap(func);
        getEngine().reStart();
    }
    ;
    loadCanvas() {
        __classPrivateFieldGet(this, _mapReaderCanvas).width = __classPrivateFieldGet(this, _mapReaderImage).width;
        __classPrivateFieldGet(this, _mapReaderCanvas).height = __classPrivateFieldGet(this, _mapReaderImage).height;
        __classPrivateFieldGet(this, _mapReaderCanvas).getContext('2d').drawImage(__classPrivateFieldGet(this, _mapReaderImage), 0, 0, __classPrivateFieldGet(this, _mapReaderImage).width, __classPrivateFieldGet(this, _mapReaderImage).height);
    }
    useImageMap(func) {
        if (__classPrivateFieldGet(this, _mapReaderImage) === null) {
            throw new Error("Cannot use image map without setting image!");
        }
        else {
            for (let h = 0; h < __classPrivateFieldGet(this, _mapReaderCanvas).height * 1; h += 1) {
                for (let w = 0; w < __classPrivateFieldGet(this, _mapReaderCanvas).width * 1; w += 1) {
                    const data = __classPrivateFieldGet(this, _mapReaderCanvas).getContext("2d").getImageData(w, h, 1, 1).data;
                    func(data, w, h);
                }
                ;
            }
            ;
        }
        ;
    }
    ;
    getLocationOnImageMap(x, y) {
        if (__classPrivateFieldGet(this, _mapReaderImage) === null) {
            throw new Error("Cannot get location on map when map is not set!");
        }
        else {
            return __classPrivateFieldGet(this, _mapReaderCanvas).getContext("2d").getImageData(x, y, 1, 1);
        }
        ;
    }
    ;
    setCamera(camera) {
        __classPrivateFieldSet(this, _camera, camera);
    }
    ;
    getCamera() {
        return __classPrivateFieldGet(this, _camera);
    }
    ;
    addNewSprite(object) {
        __classPrivateFieldGet(this, _gameSprites).push(object);
    }
    ;
    getAllSprites() {
        return __classPrivateFieldGet(this, _gameSprites);
    }
    ;
    getSpritesByClass(objectClass) {
        let returnList = [];
        this.getAllSprites().forEach((sprite) => {
            if (sprite instanceof objectClass)
                returnList.push(sprite);
        });
        return returnList;
    }
    ;
    getSpriteById(id) {
        let found = null;
        __classPrivateFieldGet(this, _gameSprites).forEach((sprite) => {
            if (sprite.getId() == id) {
                found = sprite;
                return;
            }
            ;
        });
        if (found !== null)
            return found;
        throw new Error("Sprite not found!");
    }
    ;
    deleteSpriteById(id) {
        let found = false;
        __classPrivateFieldGet(this, _gameSprites).forEach((sprite, index) => {
            if (sprite.getId() == id) {
                __classPrivateFieldGet(this, _gameSprites).splice(index, 1);
                found = true;
                return;
            }
            ;
        });
        if (found)
            return;
        throw new Error("Sprite not found!");
    }
    ;
    deleteSpritesByType(type) {
        let end = true;
        while (end) {
            end = false;
            __classPrivateFieldGet(this, _gameSprites).forEach((sprite, index) => {
                if (sprite instanceof type) {
                    __classPrivateFieldGet(this, _gameSprites).splice(index, 1);
                    end = true;
                    return;
                }
                ;
            });
        }
        ;
    }
    ;
    getPhysics2dPlatformerSprites() {
        let sprites = [];
        __classPrivateFieldGet(this, _gameSprites).forEach(sprite => {
            if (sprite instanceof Physics2dPlatformer) {
                sprites.push(sprite);
            }
            ;
        });
        return sprites;
    }
    ;
    deleteAllSprites() {
        __classPrivateFieldSet(this, _gameSprites, []);
    }
    ;
    setStaticBackgroundImage(image) {
        __classPrivateFieldSet(this, _background, image);
    }
    ;
    setDynamicBackgroundImage(image, x, y, width, height) {
        const background = new SpriteObj("background", x, y, width, height, "white", 0);
        background.addCostume("set", image);
        background.setCostumeById("set");
        this.addNewSprite(background);
    }
    ;
    getBackgroundImage() {
        return __classPrivateFieldGet(this, _background);
    }
    ;
}
_gameSprites = new WeakMap(), _background = new WeakMap(), _camera = new WeakMap(), _mapReaderImage = new WeakMap(), _mapReaderCanvas = new WeakMap();
;
export class EffectObj {
    constructor(hidden, transparency, size, objBinded) {
        _hidden_1.set(this, void 0);
        _transparency_1.set(this, void 0);
        _size_1.set(this, void 0);
        _objBinded.set(this, void 0);
        __classPrivateFieldSet(this, _hidden_1, hidden);
        __classPrivateFieldSet(this, _transparency_1, transparency);
        __classPrivateFieldSet(this, _size_1, size);
        __classPrivateFieldSet(this, _objBinded, objBinded);
    }
    getHidden() { return __classPrivateFieldGet(this, _hidden_1); }
    ;
    setHidden(_hidden) { __classPrivateFieldSet(this, _hidden_1, _hidden); }
    ;
    changeHidden() { __classPrivateFieldSet(this, _hidden_1, !__classPrivateFieldGet(this, _hidden_1)); }
    ;
    getTransparency() { return __classPrivateFieldGet(this, _transparency_1); }
    ;
    setTransparency(_transparency) { __classPrivateFieldSet(this, _transparency_1, _transparency); }
    ;
    changeTransparency() { __classPrivateFieldSet(this, _transparency_1, __classPrivateFieldGet(this, _transparency_1) + __classPrivateFieldGet(this, _transparency_1)); }
    ;
    getSize() { this.fixSize(); return __classPrivateFieldGet(this, _size_1); }
    ;
    setSize(_size) { __classPrivateFieldSet(this, _size_1, _size); this.fixSize(); }
    ;
    changeSize(_size) { __classPrivateFieldSet(this, _size_1, __classPrivateFieldGet(this, _size_1) + _size); this.fixSize(); }
    ;
    fixSize() {
        __classPrivateFieldGet(this, _objBinded).setWidth(__classPrivateFieldGet(this, _objBinded).getAdvancedDetails().getOrignalWidth() * __classPrivateFieldGet(this, _size_1) / 100);
        __classPrivateFieldGet(this, _objBinded).setHeight(__classPrivateFieldGet(this, _objBinded).getAdvancedDetails().getOrignalHeight() * __classPrivateFieldGet(this, _size_1) / 100);
    }
    ;
    clearEffects() { __classPrivateFieldSet(this, _hidden_1, false); __classPrivateFieldSet(this, _transparency_1, 0); }
    ;
}
_hidden_1 = new WeakMap(), _transparency_1 = new WeakMap(), _size_1 = new WeakMap(), _objBinded = new WeakMap();
;
export class Physics2dPlatformer extends SpriteObj {
    constructor(id, x, y, width, height, color, stageLevel) {
        super(id, x, y, width, height, color, stageLevel);
        _vy.set(this, void 0);
        _gravityAcc_1.set(this, void 0);
        _lastPlatformTouched.set(this, void 0);
        _direction_1.set(this, void 0);
        _moveXInfo.set(this, void 0);
        _moveYInfo.set(this, void 0);
        _vx_1.set(this, void 0);
        _vxSpeed_1.set(this, void 0);
        _maxVX_1.set(this, void 0);
        _vySpeed_1.set(this, void 0);
        _maxVY_1.set(this, void 0);
        _hasBlockBelow.set(this, void 0);
        _physicsObjectsToCheckCollision.set(this, void 0);
        _normalPhysicsCheckCollision.set(this, void 0);
        __classPrivateFieldSet(this, _gravityAcc_1, 0.2);
        __classPrivateFieldSet(this, _hasBlockBelow, false);
        __classPrivateFieldSet(this, _lastPlatformTouched, null);
        __classPrivateFieldSet(this, _direction_1, Direction.LEFT);
        __classPrivateFieldSet(this, _moveXInfo, [false, null]);
        __classPrivateFieldSet(this, _moveYInfo, [false, null]);
        __classPrivateFieldSet(this, _vx_1, 0);
        __classPrivateFieldSet(this, _vxSpeed_1, 0.5);
        __classPrivateFieldSet(this, _maxVX_1, null);
        __classPrivateFieldSet(this, _vy, 0);
        __classPrivateFieldSet(this, _vySpeed_1, 0.5);
        __classPrivateFieldSet(this, _maxVY_1, null);
        __classPrivateFieldSet(this, _physicsObjectsToCheckCollision, getGame().getPhysics2dPlatformerSprites());
        __classPrivateFieldSet(this, _normalPhysicsCheckCollision, true);
    }
    ;
    setPhysics2dPlatformerSpritesToCheckCollision(set) {
        if (set !== getGame().getPhysics2dPlatformerSprites())
            __classPrivateFieldSet(this, _normalPhysicsCheckCollision, false);
        __classPrivateFieldSet(this, _physicsObjectsToCheckCollision, set);
    }
    ;
    getPhysics2dPlatformerSpritesToCheckCollision() { return __classPrivateFieldGet(this, _physicsObjectsToCheckCollision); }
    ;
    doGravity() {
        __classPrivateFieldSet(this, _hasBlockBelow, false);
        this.changeY(this.getVY());
        if (__classPrivateFieldGet(this, _normalPhysicsCheckCollision))
            __classPrivateFieldSet(this, _physicsObjectsToCheckCollision, getGame().getPhysics2dPlatformerSprites());
        __classPrivateFieldGet(this, _physicsObjectsToCheckCollision).forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                if (this.getVY() < 0) {
                    this.setY(obj.getY() + obj.getHeight());
                    if (this.touching(obj))
                        this.changeY(0.1);
                    this.setVY(0);
                }
                else {
                    this.setY(obj.getY() - this.getHeight());
                    if (this.touching(obj))
                        this.changeY(-0.1);
                    __classPrivateFieldSet(this, _hasBlockBelow, true);
                    __classPrivateFieldSet(this, _lastPlatformTouched, obj);
                    this.setVY(0);
                }
                ;
            }
            ;
        });
        if (!this.hasPhysicsPlatformBelow()) {
            this.changeVY(this.getGravityAcc());
        }
        else {
            this.setVY(0);
        }
        ;
    }
    ;
    moveX(_move) {
        __classPrivateFieldGet(this, _moveXInfo)[0] = false;
        __classPrivateFieldGet(this, _moveXInfo)[1] = null;
        if (_move !== 0) {
            this.changeX(_move);
            if (__classPrivateFieldGet(this, _normalPhysicsCheckCollision))
                __classPrivateFieldSet(this, _physicsObjectsToCheckCollision, getGame().getPhysics2dPlatformerSprites());
            __classPrivateFieldGet(this, _physicsObjectsToCheckCollision).forEach((obj) => {
                if (this.touching(obj) && this !== obj) {
                    if (_move > 0) {
                        this.setX(obj.getX() - this.getWidth());
                    }
                    else {
                        this.setX(obj.getX() + obj.getWidth());
                    }
                    __classPrivateFieldGet(this, _moveXInfo)[0] = true;
                    __classPrivateFieldGet(this, _moveXInfo)[1] = obj;
                    return;
                }
                ;
            });
        }
        ;
    }
    ;
    moveY(_move) {
        __classPrivateFieldGet(this, _moveYInfo)[0] = false;
        __classPrivateFieldGet(this, _moveYInfo)[1] = null;
        if (_move !== 0) {
            this.changeY(_move);
            if (__classPrivateFieldGet(this, _normalPhysicsCheckCollision))
                __classPrivateFieldSet(this, _physicsObjectsToCheckCollision, getGame().getPhysics2dPlatformerSprites());
            __classPrivateFieldGet(this, _physicsObjectsToCheckCollision).forEach((obj) => {
                if (this.touching(obj) && this !== obj) {
                    if (_move > 0) {
                        this.setY(obj.getY() - this.getHeight());
                    }
                    else {
                        this.setY(obj.getY() + obj.getHeight());
                    }
                    __classPrivateFieldGet(this, _moveYInfo)[0] = true;
                    __classPrivateFieldGet(this, _moveYInfo)[1] = obj;
                    return;
                }
                ;
            });
        }
        ;
    }
    ;
    doJump(_jumpHeight) {
        if (this.hasPhysicsPlatformBelow()) {
            this.setVY(-_jumpHeight);
        }
        ;
    }
    ;
    hasSpriteBelow() {
        let toReturn = false;
        this.changeY(1);
        getGame().getAllSprites().forEach(sprite => {
            if (this.touching(sprite) && this !== sprite)
                toReturn = true;
        });
        this.changeY(-1);
        return toReturn;
    }
    ;
    hasPhysicsPlatformBelow() {
        let toReturn = false;
        this.changeY(1);
        getGame().getPhysics2dPlatformerSprites().forEach(sprite => {
            if (this.touching(sprite) && this !== sprite)
                toReturn = true;
        });
        this.changeY(-1);
        return toReturn;
    }
    ;
    getSpriteBelow() {
        let toReturn = null;
        this.changeY(1);
        getGame().getAllSprites().forEach(sprite => {
            if (this.touching(sprite) && this !== sprite)
                toReturn = sprite;
        });
        this.changeY(-1);
        return toReturn;
    }
    ;
    getPhysicsPlatformBelow() {
        let toReturn = null;
        this.changeY(1);
        getGame().getPhysics2dPlatformerSprites().forEach(sprite => {
            if (this.touching(sprite) && this !== sprite)
                toReturn = sprite;
        });
        this.changeY(-1);
        return toReturn;
    }
    ;
    isNextToSprite() {
        let toReturn = false;
        let direction = null;
        this.changeX(0.1);
        getGame().getAllSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.RIGHT;
            }
            ;
        });
        this.changeX(-0.2);
        getGame().getAllSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.LEFT;
            }
            ;
        });
        this.changeX(0.1);
        return new isNextToSpriteObj(toReturn, direction);
    }
    ;
    isNextToPhysicsPlatform() {
        let toReturn = false;
        let direction = null;
        this.changeX(0.1);
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.RIGHT;
            }
            ;
        });
        this.changeX(-0.2);
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.LEFT;
            }
            ;
        });
        this.changeX(0.1);
        return new isNextToSpriteObj(toReturn, direction);
    }
    ;
    getSpriteNextTo() {
        let toReturn = false;
        let direction = null;
        let returnObj = null;
        this.changeX(0.1);
        getGame().getAllSprites().forEach((obj) => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.RIGHT;
                returnObj = obj;
            }
            ;
        });
        this.changeX(-0.2);
        getGame().getAllSprites().forEach((obj) => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.LEFT;
                returnObj = obj;
            }
            ;
        });
        this.changeX(0.1);
        return new getSpriteNextToObj(returnObj, direction);
    }
    ;
    getPhysicsPlatformNextTo() {
        let toReturn = false;
        let direction = null;
        let returnObj = null;
        this.changeX(0.1);
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.RIGHT;
                returnObj = obj;
            }
            ;
        });
        this.changeX(-0.2);
        getGame().getPhysics2dPlatformerSprites().forEach(obj => {
            if (this.touching(obj) && this !== obj) {
                toReturn = true;
                direction = Direction.LEFT;
                returnObj = obj;
            }
            ;
        });
        this.changeX(0.1);
        return new getSpriteNextToObj(returnObj, direction);
    }
    ;
    // VX
    getVX() { return __classPrivateFieldGet(this, _vx_1); }
    ;
    setVX(_vx) {
        __classPrivateFieldSet(this, _vx_1, _vx);
        __classPrivateFieldSet(this, _vx_1, Number(__classPrivateFieldGet(this, _vx_1).toFixed(1)));
        if (__classPrivateFieldGet(this, _vx_1) > __classPrivateFieldGet(this, _maxVX_1) && !(__classPrivateFieldGet(this, _maxVX_1) === null)) {
            __classPrivateFieldSet(this, _vx_1, __classPrivateFieldGet(this, _maxVX_1));
        }
        else if (__classPrivateFieldGet(this, _vx_1) < -__classPrivateFieldGet(this, _maxVX_1) && !(__classPrivateFieldGet(this, _maxVX_1) === null)) {
            __classPrivateFieldSet(this, _vx_1, -__classPrivateFieldGet(this, _maxVX_1));
        }
        ;
    }
    ;
    changeVX(_vx) {
        __classPrivateFieldSet(this, _vx_1, __classPrivateFieldGet(this, _vx_1) + _vx);
        __classPrivateFieldSet(this, _vx_1, Number(__classPrivateFieldGet(this, _vx_1).toFixed(1)));
        if (__classPrivateFieldGet(this, _vx_1) > __classPrivateFieldGet(this, _maxVX_1) && !(__classPrivateFieldGet(this, _maxVX_1) === null)) {
            __classPrivateFieldSet(this, _vx_1, __classPrivateFieldGet(this, _maxVX_1));
        }
        else if (__classPrivateFieldGet(this, _vx_1) < -__classPrivateFieldGet(this, _maxVX_1) && !(__classPrivateFieldGet(this, _maxVX_1) === null)) {
            __classPrivateFieldSet(this, _vx_1, -__classPrivateFieldGet(this, _maxVX_1));
        }
        ;
    }
    ;
    // VY
    getVY() {
        return __classPrivateFieldGet(this, _vy);
    }
    ;
    setVY(vy) {
        __classPrivateFieldSet(this, _vy, vy);
        __classPrivateFieldSet(this, _vy, Number(__classPrivateFieldGet(this, _vy).toFixed(1)));
        if (__classPrivateFieldGet(this, _vy) > __classPrivateFieldGet(this, _maxVY_1) && !(__classPrivateFieldGet(this, _maxVY_1) === null)) {
            __classPrivateFieldSet(this, _vy, __classPrivateFieldGet(this, _maxVY_1));
        }
        else if (__classPrivateFieldGet(this, _vy) < -__classPrivateFieldGet(this, _maxVY_1) && !__classPrivateFieldGet(this, _maxVY_1) === null) {
            __classPrivateFieldSet(this, _vy, -__classPrivateFieldGet(this, _maxVY_1));
        }
        ;
    }
    ;
    changeVY(vy) {
        __classPrivateFieldSet(this, _vy, __classPrivateFieldGet(this, _vy) + vy);
        __classPrivateFieldSet(this, _vy, Number(__classPrivateFieldGet(this, _vy).toFixed(1)));
        if (__classPrivateFieldGet(this, _vy) > __classPrivateFieldGet(this, _maxVY_1) && !(__classPrivateFieldGet(this, _maxVY_1) === null)) {
            __classPrivateFieldSet(this, _vy, __classPrivateFieldGet(this, _maxVY_1));
        }
        else if (__classPrivateFieldGet(this, _vy) < -__classPrivateFieldGet(this, _maxVY_1) && !(__classPrivateFieldGet(this, _maxVY_1) === null)) {
            __classPrivateFieldSet(this, _vy, -__classPrivateFieldGet(this, _maxVY_1));
        }
        ;
    }
    ;
    // VX Speed
    getVXSpeed() { return __classPrivateFieldGet(this, _vxSpeed_1); }
    ;
    setVXSpeed(_vxSpeed) {
        __classPrivateFieldSet(this, _vxSpeed_1, _vxSpeed);
        __classPrivateFieldSet(this, _vxSpeed_1, Number(__classPrivateFieldGet(this, _vxSpeed_1).toFixed(1)));
    }
    ;
    changeVXSpeed(_vxSpeed) {
        __classPrivateFieldSet(this, _vxSpeed_1, __classPrivateFieldGet(this, _vxSpeed_1) + _vxSpeed);
        __classPrivateFieldSet(this, _vxSpeed_1, Number(__classPrivateFieldGet(this, _vxSpeed_1).toFixed(1)));
    }
    ;
    // VY Speed
    getVYSpeed() { return __classPrivateFieldGet(this, _vySpeed_1); }
    ;
    setVYSpeed(_vySpeed) {
        __classPrivateFieldSet(this, _vySpeed_1, _vySpeed);
        __classPrivateFieldSet(this, _vySpeed_1, Number(__classPrivateFieldGet(this, _vySpeed_1).toFixed(1)));
    }
    ;
    changeVYSpeed(_vySpeed) {
        __classPrivateFieldSet(this, _vySpeed_1, __classPrivateFieldGet(this, _vySpeed_1) + _vySpeed);
        __classPrivateFieldSet(this, _vySpeed_1, Number(__classPrivateFieldGet(this, _vySpeed_1).toFixed(1)));
    }
    ;
    // VX Speed
    getMaxVX() { return __classPrivateFieldGet(this, _maxVX_1); }
    ;
    setMaxVX(_maxVX) {
        __classPrivateFieldSet(this, _maxVX_1, _maxVX);
    }
    ;
    changeMaxVX(_maxVelocity) {
        __classPrivateFieldSet(this, _maxVX_1, __classPrivateFieldGet(this, _maxVX_1) + _maxVelocity);
    }
    ;
    getMaxVY() { return __classPrivateFieldGet(this, _maxVY_1); }
    ;
    setMaxVY(_maxVY) {
        __classPrivateFieldSet(this, _maxVY_1, _maxVY);
    }
    ;
    changeMaxVY(_maxVY) {
        __classPrivateFieldSet(this, _maxVY_1, __classPrivateFieldGet(this, _maxVY_1) + _maxVY);
    }
    ;
    addFrictionX(_friction) {
        __classPrivateFieldSet(this, _vx_1, __classPrivateFieldGet(this, _vx_1) * _friction);
        __classPrivateFieldSet(this, _vx_1, parseInt('' + (__classPrivateFieldGet(this, _vx_1) * 10)) / 10);
    }
    ;
    addFrictionY(_friction) {
        __classPrivateFieldSet(this, _vy, __classPrivateFieldGet(this, _vy) * _friction);
        __classPrivateFieldSet(this, _vy, parseInt('' + (__classPrivateFieldGet(this, _vy) * 10)) / 10);
    }
    ;
    getMoveXInfo() { return new MoveInfoObj(__classPrivateFieldGet(this, _moveXInfo)[0], __classPrivateFieldGet(this, _moveXInfo)[1]); }
    ;
    getMoveYInfo() { return new MoveInfoObj(__classPrivateFieldGet(this, _moveYInfo)[0], __classPrivateFieldGet(this, _moveYInfo)[1]); }
    ;
    getDirection() { return __classPrivateFieldGet(this, _direction_1); }
    ;
    setDirection(_direction) { __classPrivateFieldSet(this, _direction_1, _direction); }
    ;
    getGravityAcc() { return __classPrivateFieldGet(this, _gravityAcc_1); }
    ;
    setGravityAcc(_gravityAcc) { __classPrivateFieldSet(this, _gravityAcc_1, _gravityAcc); }
    ;
    changeGravityAcc(_gravityAcc) { __classPrivateFieldSet(this, _gravityAcc_1, __classPrivateFieldGet(this, _gravityAcc_1) + _gravityAcc); }
    ;
    getLastTouchedSpriteFromGravity() { return __classPrivateFieldGet(this, _lastPlatformTouched); }
    ;
}
_vy = new WeakMap(), _gravityAcc_1 = new WeakMap(), _lastPlatformTouched = new WeakMap(), _direction_1 = new WeakMap(), _moveXInfo = new WeakMap(), _moveYInfo = new WeakMap(), _vx_1 = new WeakMap(), _vxSpeed_1 = new WeakMap(), _maxVX_1 = new WeakMap(), _vySpeed_1 = new WeakMap(), _maxVY_1 = new WeakMap(), _hasBlockBelow = new WeakMap(), _physicsObjectsToCheckCollision = new WeakMap(), _normalPhysicsCheckCollision = new WeakMap();
;
export class MoveInfoObj {
    constructor(didTouch, spriteCollided) {
        _didTouch.set(this, void 0);
        _spriteCollided.set(this, void 0);
        __classPrivateFieldSet(this, _didTouch, didTouch);
        __classPrivateFieldSet(this, _spriteCollided, spriteCollided);
    }
    ;
    didCollide() { return __classPrivateFieldGet(this, _didTouch); }
    ;
    getPhysicsSpriteCollidedWith() { return __classPrivateFieldGet(this, _spriteCollided); }
    ;
}
_didTouch = new WeakMap(), _spriteCollided = new WeakMap();
;
export class isNextToSpriteObj {
    constructor(isNextToSprite, direction) {
        _isNextToSprite.set(this, void 0);
        _direction_2.set(this, void 0);
        __classPrivateFieldSet(this, _isNextToSprite, isNextToSprite);
        __classPrivateFieldSet(this, _direction_2, direction);
    }
    ;
    isNextToSprite() {
        return __classPrivateFieldGet(this, _isNextToSprite);
    }
    ;
    getDirection() {
        return __classPrivateFieldGet(this, _direction_2);
    }
    ;
}
_isNextToSprite = new WeakMap(), _direction_2 = new WeakMap();
;
export class getSpriteNextToObj {
    constructor(obj, direction) {
        _obj.set(this, void 0);
        _direction_3.set(this, void 0);
        __classPrivateFieldSet(this, _obj, obj);
        __classPrivateFieldSet(this, _direction_3, direction);
    }
    ;
    getSprite() {
        return __classPrivateFieldGet(this, _obj);
    }
    ;
    getDirection() {
        return __classPrivateFieldGet(this, _direction_3);
    }
    ;
}
_obj = new WeakMap(), _direction_3 = new WeakMap();
;
export class Camera {
    constructor() {
        _x_2.set(this, void 0);
        _y_2.set(this, void 0);
        __classPrivateFieldSet(this, _x_2, 0);
        __classPrivateFieldSet(this, _y_2, 0);
    }
    ;
    getX() { return __classPrivateFieldGet(this, _x_2); }
    ;
    setX(_x) { __classPrivateFieldSet(this, _x_2, Number(_x.toFixed(1))); }
    ;
    changeX(_x) { __classPrivateFieldSet(this, _x_2, __classPrivateFieldGet(this, _x_2) + Number(_x.toFixed(1))); }
    ;
    getY() { return __classPrivateFieldGet(this, _y_2); }
    ;
    setY(_y) { __classPrivateFieldSet(this, _y_2, Number(_y.toFixed(1))); }
    ;
    changeY(_y) { __classPrivateFieldSet(this, _y_2, __classPrivateFieldGet(this, _y_2) + Number(_y.toFixed(1))); }
    ;
    getWidth() { return getRender().getWidth(); }
    ;
    getHeight() { return getRender().getHeight(); }
    ;
    goTo(_x, _y) { this.setX(_x); this.setY(_y); }
    ;
}
_x_2 = new WeakMap(), _y_2 = new WeakMap();
;
