import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";

class Application {
    run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new PIXI.Application({resizeTo: window});
        document.body.appendChild(this.app.view);

        this.loader = new Loader(this.app.loader, this.config);
        this.loader.preload().then(() => this.start());

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);

        this.createPhysics();
    }

    createPhysics() {
        this.physics = Matter.Engine.create();
        this.physics.gravity.scale = 0.0005;
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }

    res(key) {
        return this.loader.resources[key].texture;
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    /*texture(key) {
        return PIXI.Texture.from("../sprites/rain");
    }*/

    tilingSprite(key) {
        const texture = PIXI.Texture.from(this.res(key));
        return new PIXI.TilingSprite({
            texture,
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    start() {
        this.scenes.start("Game");
    }
}

export const App = new Application();
