import { DinnerTableBase } from "../Common/DinnerTableBase";

const path = '../src/assets/Chapter3/scene2/'
const pathUi = '../src/assets/UiScene/'
const animPath = 'anims/'

export class Chapter3Scene2 extends DinnerTableBase {

    constructor() {
        super('Chapter3Scene2')
    }

    preload() {
        super.preload()
    }

    create() {
        super.create()
        this.addFood()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()
                
        this.addUI(this.uiText.Chapter3Scene2[this.language], 50, 1.1)

    }

    update() {

    }

    

    
}