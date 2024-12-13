import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    bgSpeed: 2,
    rainSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
    platforms: {
        moveSpeed: -1.5,
        ranges: {
            rows: {
                min: 2,
                max: 9
            },
            cols: {
                min: 2,
                max: 3
            },
            offset: {
                min: 280,
                max: 440
            }
        }
    },
    hero: {
        jumpSpeed: 7,
        position: {
            x: 350,
            y: 300
        }
    },
    scenes: {
        "Game": GameScene
    }
};