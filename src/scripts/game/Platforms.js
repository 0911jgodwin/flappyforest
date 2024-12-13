import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";
import { Roof } from "./Roof";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.roofs = [];
        this.container = new PIXI.Container();

        
        const platform = new Platform(0, 0, 800);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
    }

    get randomData() {
        this.ranges = App.config.platforms.ranges;
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }

    
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
        const roof = new Roof(15-data.rows-4, data.cols, data.x);
        this.container.addChild(roof.container);
        this.roofs.push(roof);
    }

    update() {
        if (this.current.container.x + this.current.container.width < window.innerWidth) {
            this.createPlatform(this.randomData);
        }

        this.platforms.forEach(platform => platform.move());
        this.roofs.forEach(roof => roof.move());
    }

    destroy() {
        this.platforms.forEach(platform => platform.destroy());
        this.roofs.forEach(roof => roof.destroy());
        this.container.destroy();
    }
}