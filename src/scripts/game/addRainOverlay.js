import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class RainOverlay {
    constructor() {
        this.speed = App.config.rainSpeed;
        this.overlay = App.tilingSprite("rain");
    }

    update(dt) {
        const offset = this.speed * dt;

        // Animate the overlay.
        this.overlay.tilePosition.x -= offset;
        this.overlay.tilePosition.y += offset;
    }

    destroy() {
        this.overlay.destroy();
    }
}