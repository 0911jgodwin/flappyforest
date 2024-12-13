import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);

        this.dy = App.config.hero.jumpSpeed;
        this.jumpIndex = 0;
        this.score = 0;
    }

    collectDiamond(diamond) {
        ++this.score;
        this.sprite.emit("score");
        diamond.destroy();
    }

    startJump() {
        
        Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;

        if (this.sprite.y > window.innerHeight) {
            this.die();
        }
    }

    die() {
        this.sprite.emit("die");
    }

    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("wingMan1"),
            App.res("wingMan3"),
            App.res("wingMan5"),
            App.res("wingMan3")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    destroy() {
        App.app.ticker.remove(this.update, this);
        Matter.World.add(App.physics.world, this.body);
        this.sprite.destroy();
    }
}