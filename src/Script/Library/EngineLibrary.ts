// DanielWebsite Game Framework

// Written By: Daniel

//░██████╗░░█████╗░███╗░░░███╗███████╗  ███████╗██████╗░░█████╗░███╗░░░███╗███████╗░██╗░░░░░░░██╗░█████╗░██████╗░██╗░░██╗
//██╔════╝░██╔══██╗████╗░████║██╔════╝  ██╔════╝██╔══██╗██╔══██╗████╗░████║██╔════╝░██║░░██╗░░██║██╔══██╗██╔══██╗██║░██╔╝
//██║░░██╗░███████║██╔████╔██║█████╗░░  █████╗░░██████╔╝███████║██╔████╔██║█████╗░░░╚██╗████╗██╔╝██║░░██║██████╔╝█████═╝░
//██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░  ██╔══╝░░██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝░░░░████╔═████║░██║░░██║██╔══██╗██╔═██╗░
//╚██████╔╝██║░░██║██║░╚═╝░██║███████╗  ██║░░░░░██║░░██║██║░░██║██║░╚═╝░██║███████╗░░╚██╔╝░╚██╔╝░╚█████╔╝██║░░██║██║░╚██╗
//░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝  ╚═╝░░░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝░░░╚═╝░░░╚═╝░░░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝

// A Game class is required for the framework to function
// If you like to change file location of Game class you must change the import here:
import{Game}from"../GameObjects/Game";

// It is recommended that you do not change anything beyond this point

export enum Direction{LEFT,RIGHT,UP,DOWN,};
export let getRender:()=>RenderObj;
export let getGame:()=>Game;
export let getController:()=>ControllerObj;
export let getEngine:()=>EngineObj;
export let getLoader:()=>LoaderObj;
export enum ScreenPlaces {randomPosition, center};
export class LoaderObj{
    #images:[string,HTMLImageElement][];
    #assetsToLoad: number;
    constructor(){
        this.#images=[];
        this.#assetsToLoad=0;
    };
    loadImage(id:string,src:string){
        let image=new Image();
        image.src=src;
        this.#images.push([id,image]);
        image.onload=()=>this.#assetsToLoad--;
        this.#assetsToLoad++;
    };
    getLoadedImageById(id:string){
        let toReturn:HTMLImageElement=null;
        this.#images.forEach(item=>{
            if(item[0]===id)
                toReturn=item[1];
        });
        return toReturn;
    };
    getNumberOfAssetsToLoad(){return this.#assetsToLoad};
};
export class EventObj{
    constructor(){
    };
    onClick(event:KeyboardEvent):void{};
    offClick(event:KeyboardEvent):void{};
    
    mouseDown(event:MouseEvent):void{};
    mouseMove(event:MouseEvent):void{};
};
export class ControllerObj{
    #keysDown:{};
    #mouseX:number;
    #mouseY:number;
    #active: boolean;
    #event:EventObj;
    constructor(render:RenderObj, event:EventObj){
        this.#keysDown={};
        this.#mouseX=null;
        this.#mouseY=null;
        this.#active;
        this.#active=false;
        this.#event=event;
        document.onkeydown=(event)=>{
            this.#keysDown[event.key]=true;
            switch(event.key){
                case`F2`:
                    render.changeShowInfo();
                    break;
            };
            this.#event.onClick(event);
        };
        document.onkeyup=(event)=>{
            this.#keysDown[event.key]=false;
            switch(event.key){
                case``:
                    break;
            };
            this.#event.offClick(event);
        };
        document.addEventListener("visibilitychange",event=>{
            if(document.visibilityState==="visible"){
                this.#active=true;
            }else{
                this.#active=false;
                for(var key in this.#keysDown)
                    this.#keysDown[key]=false;
            };
        });
        render.getCanvas().addEventListener("mousedown",(event)=>{
            this.#event.mouseDown(event);
        });
        render.getCanvas().addEventListener("mousemove",(event)=>{
            const boundings=render.getCanvas().getBoundingClientRect();
            const x=event.clientX-boundings.left;
            const y=event.clientY-boundings.top;
            this.setMouseX(x);
            this.setMouseY(y);
            this.#event.mouseMove(event);
        });
    };
    public getKey(key:string){
        if(this.#keysDown[key]===undefined)return false;
        return this.#keysDown[key];
    };
    public getMouseX(){return this.#mouseX};
    public getMouseY(){return this.#mouseY};
    private setMouseX(x:number){this.#mouseX=x};
    private setMouseY(y:number){this.#mouseY=y};
};
export class EngineObj{
    #tps:number;
    #update:()=>void;
    #draw:()=>void;
    #runOnSameEngine:boolean;
    #fpsChecker:number;
    #tpsChecker:number;
    #realFps:number;
    #realTps:number;
    #stop:boolean;
    #didInit:boolean;
    #initFunc:()=>void;
    #stopForInit: boolean;
    #maxFPS: number;
    constructor(update:()=>void,draw:()=>void,tps:number){
        this.#runOnSameEngine=false;
        this.#tps=tps;
        this.#update=update;
        this.#draw=draw;
        this.#initFunc=null;
        this.#fpsChecker=0;
        this.#tpsChecker=0;
        this.#realFps=0;
        this.#realTps=0;
        this.#stop=false;
        this.#didInit=false;
        this.#stopForInit=false;
        this.#maxFPS=null;
    };
    #startRender=()=>{
        if(!this.#stop&&(this.#fpsChecker<this.#maxFPS||this.#maxFPS===null)){
            if(!this.#stopForInit){
                if(!this.#didInit){
                    this.#initFunc();
                    this.#didInit=true;
                };
                this.#fpsChecker++;
                if(this.#runOnSameEngine)this.#update();
                this.#draw();
            }
            else{
                if(getLoader().getNumberOfAssetsToLoad()===0)
                    this.#stopForInit=false;
                getLoader().getNumberOfAssetsToLoad()
            };
        };
        window.requestAnimationFrame(this.#startRender);
    };
    #startUpdate=()=>{
        setInterval(()=>{
            if(!this.#stop&&this.#tpsChecker<this.#tps){
                this.#tpsChecker++;
                if(!this.#runOnSameEngine)this.#update();
            };
        },1000/this.#tps);
    };
    #startCheckFPS=()=>{
        setInterval(()=>{
            this.#realFps=this.#fpsChecker;
            this.#realTps=this.#tpsChecker;
            this.#fpsChecker=0;
            this.#tpsChecker=0;
        },1000);
    };
    public init(render:RenderObj,game:Game,controller:ControllerObj,loader:LoaderObj,init:()=>void,load:()=>void){
        getRender=()=>{return render};
        getGame=()=>{return game};
        getController=()=>{return controller};
        getEngine=()=>{return this};
        getLoader=()=>{return loader};
        load();
        if(getLoader().getNumberOfAssetsToLoad()!==0)
            this.#stopForInit=true;
        this.#initFunc=init;
        this.#startRender();
        this.#startUpdate();
        this.#startCheckFPS();
    };
    public getFps(){return this.#realFps};
    public getTps(){return this.#realTps};
    public stop(){this.#stop=true};
    public reStart(){this.#stop=false};
    public setRunOnUpdateOnRenderLoop(set:boolean){this.#runOnSameEngine=set};
    public setMaxFPS(_maxFPS:number){this.#maxFPS=_maxFPS};
};
export class RenderObj{
    #showingInfo:boolean;
    #canvas:HTMLCanvasElement;
    #draw:()=>void;
    #ctx:CanvasRenderingContext2D;
    #zoom: number;
    constructor(canvas:HTMLCanvasElement,draw:()=>void){
        this.#canvas=canvas;
        this.#draw=draw;
        this.#ctx=this.setupCanvas(canvas);
        this.#showingInfo=false;
        this.#zoom=1;
    };
    public setCanvasZoom(zoom:number){
        let resetValue=this.getWidth()/(this.getWidth()*this.#zoom)
        this.getCtx().scale(resetValue,resetValue);
        this.#zoom=zoom/100;
        this.getCtx().scale(this.#zoom,this.#zoom);
    };
    public getCanvasZoom(){return this.#zoom*100};
    private setupCanvas=(canvas:HTMLCanvasElement)=>{
        const dpr=window.devicePixelRatio||1;
        const rect=canvas.getBoundingClientRect();
        canvas.width=rect.width*dpr;
        canvas.height=rect.height*dpr;
        const ctx=canvas.getContext('2d');
        ctx.scale(dpr,dpr);
        return ctx;
    };
    public getFullDrawFunction(){
        return this.getFullDrawFunctionPrivate().bind(this);
    };
    private getFullDrawFunctionPrivate=()=>{
        return()=>{
            this.#ctx.save();
            if(getGame().getBackgroundImage()===null){
                this.#ctx.fillStyle=`black`;
                this.#ctx.fillRect(0,0,this.getWidth(),this.getHeight());
            }
            else{
                this.#ctx.drawImage(getGame().getBackgroundImage(),0,0,this.getWidth(),this.getHeight())
            }
            let maxLevel=0;
            getGame().getAllSprites().forEach((obj:SpriteObj)=>{
                if(obj.getStageLevel()>maxLevel)
                    maxLevel=obj.getStageLevel();
            });
            for(let i=0;i<maxLevel+1;i++){
                getGame().getAllSprites().forEach((obj:SpriteObj)=>{
                    if(obj.getStageLevel()==i) {
                        if (obj.getCostumeImage()[1]==null) {
                            this.drawSprite(obj);
                        }
                        else {
                            this.drawSpriteImage(obj, obj.getCostumeImage()[1]);
                        };
                    };
                });
            };
            this.#draw();
            if(this.#showingInfo){
                this.#ctx.fillStyle=`white`;
                this.#ctx.font='24px serif';
                this.#ctx.fillText(`FPS: ${getEngine().getFps()}`,20,40);
                this.#ctx.fillText(`TPS: ${getEngine().getTps()}`,20,80);
            };
            this.#ctx.restore();
        };
    };
    public makeCanvasCoverFullScreen(xRatio:number,yRatio:number){
        this.#canvas
        if(window.innerHeight>window.innerWidth*(yRatio/xRatio)) {
            this.#canvas.style.width=window.innerWidth+"px";
            this.#canvas.style.height=window.innerWidth*(yRatio/xRatio)+"px";
        }
        else{
            this.#canvas.style.width=window.innerHeight*(xRatio/yRatio)+"px";
            this.#canvas.style.height=window.innerHeight+"px";
        }
    };
    public getCanvas(){return this.#canvas};
    public drawSprite(object:SpriteObj){
        if (!object.getEffect().getHidden()) {
            this.#ctx.globalAlpha=1-(object.getEffect().getTransparency()/10);
            this.#ctx.fillStyle=object.getColor();
            this.#ctx.fillRect(object.getX()-getGame().getCamera().getX(),object.getY()-getGame().getCamera().getY(),object.getWidth(),object.getHeight());
        };
    };
    public drawSpriteImage(object:SpriteObj,image:HTMLImageElement){
        if (!object.getEffect().getHidden()) {
            this.#ctx.globalAlpha=1-(object.getEffect().getTransparency()/10);
            this.#ctx.fillStyle=object.getColor();
            this.#ctx.drawImage(image,object.getX()-getGame().getCamera().getX(),object.getY()-getGame().getCamera().getY(),object.getWidth(),object.getHeight());
        };
    };
    public drawSpriteWithInputs(x:number,y:number,width:number,height:number,color:string){
        this.#ctx.fillStyle=color;
        this.#ctx.fillRect(x,y,width,height);
    };
    public getWidth(){return this.#canvas.width/(this.getCanvasZoom()/100)};
    public getHeight(){return this.#canvas.height/(this.getCanvasZoom()/100)};
    public getShowInfo(){return this.#showingInfo};
    public changeShowInfo(){this.#showingInfo=!this.#showingInfo};
    public getCtx() {return this.#ctx};
};
export class AdvancedDetails{
    #owidth: number;
    #oheight: number;
    
    constructor(owidth:number,oheight:number){
        this.#owidth=owidth;
        this.#oheight=oheight;
    };

    public getOrignalWidth(){return this.#owidth};
    public getOrignalHeight(){return this.#oheight};
};
export class SpriteObj{
    #x:number;
    #y:number;
    #width:number;
    #height:number;
    #color:string;
    #id:string;
    #stageLevel:number;
    #effects: EffectObj;
    #costumes: [String, HTMLImageElement][];
    #costumeSetIndex: number;
    #sounds: [String, HTMLAudioElement][];
    #advancedSettings: AdvancedDetails;
    constructor(id:string,x:number,y:number,width:number,height:number,color:string,stageLevel:number){
        this.#x=x;
        this.#y=y;
        this.#width=width;
        this.#height=height;
        this.#color=color;
        this.#id=id;
        this.#stageLevel=stageLevel;
        this.#effects=new EffectObj(false,0,100,this);
        this.#costumes=[[null, null]];
        this.#costumeSetIndex=0;
        this.#sounds=[[null, null]];
        this.#advancedSettings=new AdvancedDetails(width, height);
    };
    public getX(){return this.#x};
    public setX(_x:number){
        this.#x=_x;
        this.#x=Number(this.#x.toFixed(1));
    };
    public changeX(_x:number){
        this.#x+=_x;
        this.#x=Number(this.#x.toFixed(1));
    };

    public getY(){return this.#y};
    public setY(_y:number){
        this.#y=_y;
        this.#y=Number(this.#y.toFixed(1));
    };
    public changeY(_y:number){
        this.#y+=_y;
        this.#y=Number(this.#y.toFixed(1));
    };

    public getWidth(){return this.#width};
    public setWidth(_width:number){
        this.#width=_width;
        this.#width=Number(this.#width.toFixed(1));
    };
    public changeWidth(_width:number){
        this.#width+=_width;
        this.#width=Number(this.#width.toFixed(1));
    };

    public getHeight(){return this.#height};
    public setHeight(_height:number){
        this.#height=_height;
        this.#height=Number(this.#height.toFixed(1));
    };
    public changeHeight(_height:number){
        this.#height+=_height;
        this.#height=Number(this.#height.toFixed(1));
    };

    public getColor(){return this.#color};
    public setColor(_color:string){this.#color=_color};

    public getId(){return this.#id};
    public setId(_id:string){this.#id=_id};

    public getEffect(){return this.#effects};
    public setEffect(_effect:EffectObj){this.#effects=_effect};

    public getStageLevel(){return this.#stageLevel};
    public setStageLevel(_stageLevel:number){this.#stageLevel=_stageLevel};
    public changeStageLevel(_stageLevel:number){this.#stageLevel+=_stageLevel};

    public getKey(key:string){return getController().getKey(key)};

    public getMouseX(){return getController().getMouseX()};
    public getMouseY(){return getController().getMouseY()};

    public getScreenWidth(){return getRender().getWidth()};
    public getScreenHeight(){return getRender().getHeight()};

    public getAdvancedDetails() {
        return this.#advancedSettings;
    };

    public isOnScreen(){
        if (this.getX()+this.getWidth()>=getGame().getCamera().getX() && 
        this.getX()<=getGame().getCamera().getX()+getRender().getWidth() &&
        this.getY()+this.getHeight()>=getGame().getCamera().getY() && 
        this.getY()<=getGame().getCamera().getY()+getRender().getHeight()) 
            return true;
        return false;
    };

    public goTo(_x:number,_y:number){this.#x=_x;this.#y=_y};

    public to(place:ScreenPlaces){
        switch(place){
            case ScreenPlaces.center:
                this.goTo(getRender().getWidth()/2-this.getWidth()/2,getRender().getHeight()/2-this.getHeight()/2);
                break;
            case ScreenPlaces.randomPosition:
                this.goTo(Math.floor(Math.random()*getRender().getWidth()),Math.floor(Math.random()*getRender().getHeight()));
                break;
        };
    };
    public touching(b:SpriteObj){
        if (this.getX()<b.getX()+b.getWidth()&&
        this.getX()+this.getWidth()>b.getX()&&
        this.getY()<b.getY()+b.getHeight()&&
        this.getY()+this.getHeight()>b.getY()) {
            return true;
        };
        return false;
    };
    public isTouchingPhsyicsSprite(){
        let toReturn=false;
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(obj.touching(this))
                toReturn=true;
        });
        return toReturn;
    };
    public getTouchingPhsyicsSprite():Physics2dPlatformer{
        let toReturn:Physics2dPlatformer=null;
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(obj.touching(this))
                toReturn=obj;
        });
        return toReturn;
    };
    public isTouchingSprite(){
        let toReturn=false;
        getGame().getAllSprites().forEach(obj=>{
            if(obj.touching(this))
                toReturn=true;
        });
        return toReturn;
    };
    public getTouchingSprite():SpriteObj{
        let toReturn:SpriteObj=null;
        getGame().getAllSprites().forEach(obj=>{
            if(obj.touching(this))
                toReturn=obj;
        });
        return toReturn;
    };
    public getCostumeImage(){return this.#costumes[this.#costumeSetIndex]};
    public getCostumeNumber(){return this.#costumeSetIndex};
    public addCostume(id:string,image:HTMLImageElement){
        this.#costumes.push([id,image]);
    };
    public setCostumeById(id:string){
        if(id.toUpperCase()=="NONE"){
            this.#costumeSetIndex=0;
        }
        else{
            for(let i=0;i<this.#costumes.length;i++){
                if(id==this.#costumes[i][0]){
                    this.#costumeSetIndex=i;
                    return;
                };
            };
        };
    };
    public nextCostume(){
        if (this.#costumes.length-1>0){
            if (this.#costumeSetIndex<this.#costumes.length-1){
                this.#costumeSetIndex++;
            }
            else{
                this.#costumeSetIndex=1;
            };
        };
    };
    public addSound(id:string,src:string){
        let audio=new Audio(src);
        audio.preload="auto";
        this.#sounds.push([id,audio]);
    };
    public playSoundById(id:string){
        for(let i=0;i<this.#sounds.length;i++){
            if(id==this.#sounds[i][0]){
                this.#sounds[i][1].play();
                return;
            };
        };
    };
    public setSoundVolumeById(id:string,volume:number){
        for(let i=0;i<this.#sounds.length;i++){
            if(id==this.#sounds[i][0]){
                this.#sounds[i][1].volume=volume/100;
            };
        };
    };
    public stopSoundById(id:string){
        for(let i=0;i<this.#sounds.length;i++){
            if(id==this.#sounds[i][0]){
                this.#sounds[i][1].pause();
                this.#sounds[i][1].currentTime=0;
            };
        };
    };
    public pauseSoundById(id:string){
        for(let i=0;i<this.#sounds.length;i++){
            if(id==this.#sounds[i][0]){
                this.#sounds[i][1].pause();
            };
        };
    };
};
export class GameObj{
    #gameSprites:SpriteObj[];
    #background:HTMLImageElement;
    #camera:Camera;
    #mapReaderImage: HTMLImageElement;
    #mapReaderCanvas: HTMLCanvasElement;
    constructor(){
        this.#background=null;
        this.#gameSprites=[];
        this.#camera=new Camera();
        this.#mapReaderImage=null;
        this.#mapReaderCanvas=document.createElement('canvas');
    };
    public setAndUseImageMap(image:HTMLImageElement, func:(data:Uint8ClampedArray,x:number,y:number)=>void){
        this.#mapReaderImage=image;
        this.loadCanvas();
        this.useImageMap(func);
        getEngine().reStart();
    };
    private loadCanvas(){
        this.#mapReaderCanvas.width=this.#mapReaderImage.width;
        this.#mapReaderCanvas.height=this.#mapReaderImage.height;
        this.#mapReaderCanvas.getContext('2d').drawImage(this.#mapReaderImage, 0, 0, this.#mapReaderImage.width, this.#mapReaderImage.height);
    }
    private useImageMap(func:(data:Uint8ClampedArray,x:number,y:number)=>void){
        if(this.#mapReaderImage===null){
            throw new Error("Cannot use image map without setting image!");
        }
        else{
            for(let h=0;h<this.#mapReaderCanvas.height*1;h+=1){
                for(let w=0;w<this.#mapReaderCanvas.width*1;w+=1){
                    const data=this.#mapReaderCanvas.getContext("2d").getImageData(w,h,1,1).data;
                    func(data,w,h);
                };
            };       
        };
    };
    public getLocationOnImageMap(x:number,y:number){
        if(this.#mapReaderImage===null){
            throw new Error("Cannot get location on map when map is not set!");
        }
        else{
            return this.#mapReaderCanvas.getContext("2d").getImageData(x,y,1,1);
        };
    };
    public setCamera(camera:Camera){
        this.#camera=camera;
    };
    public getCamera(){
        return this.#camera;
    };
    public addNewSprite(object:SpriteObj){
        this.#gameSprites.push(object);
    };
    public getAllSprites(){
        return this.#gameSprites;
    };
    public getSpritesByClass(objectClass:any):any[]{
        let returnList=[];
        this.getAllSprites().forEach((sprite) => {
            if (sprite instanceof objectClass)
                returnList.push(sprite);
        });
        return returnList;
    };
    public getSpriteById(id:string):SpriteObj{
        let found=null;
        this.#gameSprites.forEach((sprite)=>{
            if(sprite.getId()==id){
                found=sprite;
                return;
            };
        });
        if(found!==null)
            return found;
        throw new Error("Sprite not found!");
    };
    public deleteSpriteById(id:string){
        let found=false;
        this.#gameSprites.forEach((sprite,index)=>{
            if(sprite.getId()==id){
                this.#gameSprites.splice(index,1);
                found=true;
                return;
            };
        });
        if(found)
            return;
        throw new Error("Sprite not found!");
    };
    public deleteSpritesByType(type:any){
        let end=true;
        while(end){
            end=false;
            this.#gameSprites.forEach((sprite,index)=>{
                if(sprite instanceof type){
                    this.#gameSprites.splice(index,1);
                    end=true;
                    return;
                };
            });
        };
    };
    public getPhysics2dPlatformerSprites(){
        let sprites:Physics2dPlatformer[]=[];
        this.#gameSprites.forEach(sprite=>{
            if(sprite instanceof Physics2dPlatformer){
                sprites.push(sprite);
            };
        });
        return sprites;
    };
    public deleteAllSprites(){
        this.#gameSprites=[];
    };
    public setStaticBackgroundImage(image:HTMLImageElement){
        this.#background=image;
    };
    public setDynamicBackgroundImage(image:HTMLImageElement,x:number,y:number,width:number,height:number){
        const background=new SpriteObj("background",x,y,width,height,"white",0);
        background.addCostume("set",image);
        background.setCostumeById("set");
        this.addNewSprite(background);
    };
    public getBackgroundImage(){
        return this.#background;
    };
};
export class EffectObj{
    #hidden:boolean;
    #transparency:number;
    #size: number;
    #objBinded: SpriteObj;
    constructor(hidden:boolean,transparency:number,size:number,objBinded:SpriteObj){
        this.#hidden=hidden;
        this.#transparency=transparency;
        this.#size=size;
        this.#objBinded=objBinded;
    }
    public getHidden(){return this.#hidden};
    public setHidden(_hidden:boolean){this.#hidden=_hidden};
    public changeHidden(){this.#hidden=!this.#hidden};

    public getTransparency(){return this.#transparency};
    public setTransparency(_transparency:number){this.#transparency=_transparency};
    public changeTransparency(){this.#transparency+=this.#transparency};

    public getSize(){this.fixSize(); return this.#size};
    public setSize(_size:number){this.#size=_size; this.fixSize();};
    public changeSize(_size:number){this.#size+=_size; this.fixSize();};

    private fixSize(){
        this.#objBinded.setWidth(this.#objBinded.getAdvancedDetails().getOrignalWidth()*this.#size/100);
        this.#objBinded.setHeight(this.#objBinded.getAdvancedDetails().getOrignalHeight()*this.#size/100);
    };

    public clearEffects(){this.#hidden=false;this.#transparency=0};
};
export class Physics2dPlatformer extends SpriteObj {
    #vy:number;
    #gravityAcc:number;
    #lastPlatformTouched:SpriteObj;
    #direction:Direction;
    #moveXInfo:[boolean,Physics2dPlatformer];
    #moveYInfo:[boolean,Physics2dPlatformer];
    #vx:number;
    #vxSpeed:number;
    #maxVX: number;
    #vySpeed: any;
    #maxVY: number;
    #hasBlockBelow:boolean;
    #physicsObjectsToCheckCollision:Physics2dPlatformer[];
    #normalPhysicsCheckCollision: boolean;
    constructor(id:string,x:number,y:number,width:number,height:number,color:string,stageLevel:number) {
        super(id,x,y,width,height,color,stageLevel);
        this.#gravityAcc=0.2;
        this.#hasBlockBelow=false;
        this.#lastPlatformTouched=null;
        this.#direction=Direction.LEFT;
        this.#moveXInfo=[false,null];
        this.#moveYInfo=[false,null];
        this.#vx=0;
        this.#vxSpeed=0.5;
        this.#maxVX=null;
        this.#vy=0;
        this.#vySpeed=0.5;
        this.#maxVY=null;
        this.#physicsObjectsToCheckCollision=getGame().getPhysics2dPlatformerSprites();
        this.#normalPhysicsCheckCollision=true;
    };
    public setPhysics2dPlatformerSpritesToCheckCollision(set:Physics2dPlatformer[]){
        if(set!==getGame().getPhysics2dPlatformerSprites())
            this.#normalPhysicsCheckCollision=false;
        this.#physicsObjectsToCheckCollision=set;
    };
    public getPhysics2dPlatformerSpritesToCheckCollision(){return this.#physicsObjectsToCheckCollision};
    public doGravity():void{
        this.#hasBlockBelow=false;
        this.changeY(this.getVY())
        if(this.#normalPhysicsCheckCollision)
            this.#physicsObjectsToCheckCollision=getGame().getPhysics2dPlatformerSprites();
        this.#physicsObjectsToCheckCollision.forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                if(this.getVY()<0){
                    this.setY(obj.getY()+obj.getHeight());
                    if(this.touching(obj))
                        this.changeY(0.1);
                    this.setVY(0);
                }
                else{
                    this.setY(obj.getY()-this.getHeight())
                    if(this.touching(obj))
                        this.changeY(-0.1);
                        this.#hasBlockBelow=true;
                    this.#lastPlatformTouched=obj;
                    this.setVY(0);
                };
            };
        });
        if(!this.hasPhysicsPlatformBelow()){this.changeVY(this.getGravityAcc())}
        else{this.setVY(0)};
    };
    public moveX(_move:number){
        this.#moveXInfo[0]=false;
        this.#moveXInfo[1]=null;
        if (_move!==0) {
            this.changeX(_move)
            if(this.#normalPhysicsCheckCollision)
                this.#physicsObjectsToCheckCollision=getGame().getPhysics2dPlatformerSprites();
            this.#physicsObjectsToCheckCollision.forEach((obj:Physics2dPlatformer)=>{
                if(this.touching(obj)&&this!==obj){
                    if(_move>0){
                        this.setX(obj.getX()-this.getWidth())}
                    else{
                        this.setX(obj.getX()+obj.getWidth())}
                    this.#moveXInfo[0]=true;
                    this.#moveXInfo[1]=obj;
                    return;
                };
            });
        };
    };
    public moveY(_move:number){
        this.#moveYInfo[0]=false;
        this.#moveYInfo[1]=null;
        if (_move!==0) {
            this.changeY(_move);
            if(this.#normalPhysicsCheckCollision)
                this.#physicsObjectsToCheckCollision=getGame().getPhysics2dPlatformerSprites();
            this.#physicsObjectsToCheckCollision.forEach((obj:Physics2dPlatformer)=>{
                if(this.touching(obj)&&this!==obj){
                    if(_move>0){
                        this.setY(obj.getY()-this.getHeight())}
                    else{
                        this.setY(obj.getY()+obj.getHeight())}
                    this.#moveYInfo[0]=true;
                    this.#moveYInfo[1]=obj;
                    return;
                };
            });
        };
    };
    public doJump(_jumpHeight:number){
        if(this.hasPhysicsPlatformBelow()){
            this.setVY(-_jumpHeight);
        };
    };

    public hasSpriteBelow(){
        let toReturn=false;
        this.changeY(1);
        getGame().getAllSprites().forEach(sprite=>{
            if (this.touching(sprite)&&this!==sprite)
                toReturn=true;
        });
        this.changeY(-1);
        return toReturn;
    };

    public hasPhysicsPlatformBelow(){
        let toReturn=false;
        this.changeY(1);
        getGame().getPhysics2dPlatformerSprites().forEach(sprite=>{
            if (this.touching(sprite)&&this!==sprite)
                toReturn=true;
        });
        this.changeY(-1);
        return toReturn;
    };
    
    public getSpriteBelow(){
        let toReturn=null;
        this.changeY(1);
        getGame().getAllSprites().forEach(sprite=>{
            if (this.touching(sprite)&&this!==sprite)
                toReturn=sprite;
        });
        this.changeY(-1);
        return toReturn;
    };

    public getPhysicsPlatformBelow(){
        let toReturn=null;
        this.changeY(1);
        getGame().getPhysics2dPlatformerSprites().forEach(sprite=>{
            if (this.touching(sprite)&&this!==sprite)
                toReturn=sprite;
        });
        this.changeY(-1);
        return toReturn;
    };

    public isNextToSprite(){
        let toReturn=false;
        let direction:Direction=null;
        this.changeX(0.1);
        getGame().getAllSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.RIGHT;
            };
        });
        this.changeX(-0.2);
        getGame().getAllSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.LEFT;
            };
        });
        this.changeX(0.1);
        return new isNextToSpriteObj(toReturn,direction);
    };

    public isNextToPhysicsPlatform(){
        let toReturn=false;
        let direction:Direction=null;
        this.changeX(0.1);
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.RIGHT;
            };
        });
        this.changeX(-0.2);
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.LEFT;
            };
        });
        this.changeX(0.1);
        return new isNextToSpriteObj(toReturn,direction);
    };

    public getSpriteNextTo(){
        let toReturn=false;
        let direction:Direction=null;
        let returnObj:SpriteObj=null;
        this.changeX(0.1);
        getGame().getAllSprites().forEach((obj:SpriteObj)=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.RIGHT;
                returnObj=obj;
            };
        });
        this.changeX(-0.2);
        getGame().getAllSprites().forEach((obj:SpriteObj)=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.LEFT;
                returnObj=obj;
            };
        });
        this.changeX(0.1)
        return new getSpriteNextToObj(returnObj,direction);
    };

    public getPhysicsPlatformNextTo(){
        let toReturn=false;
        let direction:Direction=null;
        let returnObj:SpriteObj=null;
        this.changeX(0.1);
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.RIGHT;
                returnObj=obj;
            };
        });
        this.changeX(-0.2);
        getGame().getPhysics2dPlatformerSprites().forEach(obj=>{
            if(this.touching(obj)&&this!==obj){
                toReturn=true;
                direction=Direction.LEFT;
                returnObj=obj;
            };
        });
        this.changeX(0.1)
        return new getSpriteNextToObj(returnObj,direction);
    };

    // VX
    public getVX(){return this.#vx};
    public setVX(_vx:number){
        this.#vx=_vx;
        this.#vx=Number(this.#vx.toFixed(1));
        if(this.#vx>this.#maxVX&&!(this.#maxVX===null)){
            this.#vx=this.#maxVX;
        }
        else if(this.#vx<-this.#maxVX&&!(this.#maxVX===null)){
            this.#vx=-this.#maxVX;
        };
    };
    public changeVX(_vx:number){
        this.#vx+=_vx;
        this.#vx=Number(this.#vx.toFixed(1));
        if(this.#vx>this.#maxVX&&!(this.#maxVX===null)){
            this.#vx=this.#maxVX;
        }
        else if(this.#vx<-this.#maxVX&&!(this.#maxVX===null)){
            this.#vx=-this.#maxVX;
        };
    };

    // VY
    public getVY(){
        return this.#vy};
    public setVY(vy:number){
        this.#vy=vy;
        this.#vy=Number(this.#vy.toFixed(1));
        if(this.#vy>this.#maxVY&&!(this.#maxVY===null)){
            this.#vy=this.#maxVY;
        }
        else if(this.#vy<-this.#maxVY&&!this.#maxVY===null){
            this.#vy=-this.#maxVY;
        };
    };
    public changeVY(vy:number){
        this.#vy+=vy;
        this.#vy=Number(this.#vy.toFixed(1));
        if(this.#vy>this.#maxVY&&!(this.#maxVY===null)){
            this.#vy=this.#maxVY;
        }
        else if(this.#vy<-this.#maxVY&&!(this.#maxVY===null)){
            this.#vy=-this.#maxVY;
        };
    };

    // VX Speed
    public getVXSpeed(){return this.#vxSpeed};
    public setVXSpeed(_vxSpeed:number){
        this.#vxSpeed=_vxSpeed;
        this.#vxSpeed=Number(this.#vxSpeed.toFixed(1));
    };
    public changeVXSpeed(_vxSpeed:number){
        this.#vxSpeed+=_vxSpeed;
        this.#vxSpeed=Number(this.#vxSpeed.toFixed(1));
    };

    // VY Speed
    public getVYSpeed(){return this.#vySpeed};
    public setVYSpeed(_vySpeed:number){
        this.#vySpeed=_vySpeed;
        this.#vySpeed=Number(this.#vySpeed.toFixed(1));
    };
    public changeVYSpeed(_vySpeed:number){
        this.#vySpeed+=_vySpeed;
        this.#vySpeed=Number(this.#vySpeed.toFixed(1));
    };

    // VX Speed
    public getMaxVX(){return this.#maxVX};
    public setMaxVX(_maxVX:number){
        this.#maxVX=_maxVX;
    };
    public changeMaxVX(_maxVelocity:number){
        this.#maxVX+=_maxVelocity;
    };


    public getMaxVY(){return this.#maxVY};
    public setMaxVY(_maxVY:number){
        this.#maxVY=_maxVY;
    };
    public changeMaxVY(_maxVY:number){
        this.#maxVY+=_maxVY;
    };

    public addFrictionX(_friction:number){
        this.#vx=this.#vx*_friction;
        this.#vx=parseInt(''+(this.#vx * 10)) / 10;
    };
    public addFrictionY(_friction:number){
        this.#vy=this.#vy*_friction;
        this.#vy=parseInt(''+(this.#vy * 10)) / 10;
    };

    public getMoveXInfo(){return new MoveInfoObj(this.#moveXInfo[0],this.#moveXInfo[1])};

    public getMoveYInfo(){return new MoveInfoObj(this.#moveYInfo[0],this.#moveYInfo[1])};

    public getDirection(){return this.#direction};
    public setDirection(_direction:Direction){this.#direction=_direction};

    public getGravityAcc(){return this.#gravityAcc};
    public setGravityAcc(_gravityAcc:number){this.#gravityAcc=_gravityAcc};
    public changeGravityAcc(_gravityAcc:number){this.#gravityAcc+=_gravityAcc};

    public getLastTouchedSpriteFromGravity(){return this.#lastPlatformTouched};
};
export class MoveInfoObj{
    #didTouch:boolean;
    #spriteCollided: Physics2dPlatformer;
    constructor(didTouch:boolean,spriteCollided:Physics2dPlatformer){
        this.#didTouch=didTouch;
        this.#spriteCollided=spriteCollided;
    };
    didCollide(){return this.#didTouch};
    getPhysicsSpriteCollidedWith(){return this.#spriteCollided};
};
export class isNextToSpriteObj{
    #isNextToSprite:boolean;
    #direction:Direction;
    constructor(isNextToSprite:boolean,direction:Direction){
        this.#isNextToSprite=isNextToSprite;
        this.#direction=direction;
    };
    isNextToSprite(){
        return this.#isNextToSprite;
    };
    getDirection(){
        return this.#direction;
    };
};
export class getSpriteNextToObj{
    #obj: SpriteObj;
    #direction: Direction;
    constructor(obj:SpriteObj,direction:Direction){
        this.#obj=obj;
        this.#direction=direction;
    };
    getSprite(){
        return this.#obj;
    };
    getDirection(){
        return this.#direction;
    };
};
export class Camera{
    #x:number;
    #y:number;

    constructor(){
        this.#x=0;
        this.#y=0;
    };

    public getX(){return this.#x};
    public setX(_x:number){this.#x=Number(_x.toFixed(1))};
    public changeX(_x:number){this.#x+=Number(_x.toFixed(1))};

    public getY(){return this.#y};
    public setY(_y:number){this.#y=Number(_y.toFixed(1))};
    public changeY(_y:number){this.#y+=Number(_y.toFixed(1))};

    public getWidth(){return getRender().getWidth()};
    public getHeight(){return getRender().getHeight()};

    public goTo(_x:number,_y:number){this.setX(_x);this.setY(_y)};
};