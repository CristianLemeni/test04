import { MapSceneBase } from "../Common/MapSceneBase";

export class Chapter3Scene6 extends MapSceneBase {

    constructor() {
        super('Chapter3Scene6')
    }

    preload() {
        super.preload()
    }

    create() {
        super.create()

        this.addBackground()
        this.addDryLand(-335, 0)
        this.addWater(510, 180, 1.1)
        this.addCharacters({x: -300, y: -75}, {x: 50, y: 50})


        this.children.bringToTop(this.charactersContainer);
        this.addUI([this.uiText.Chapter3Scene6[this.language]], 50, 1.1, 0.85)

    }

    update() {

    }
    
}