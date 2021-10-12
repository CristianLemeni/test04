import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene12/'
const animPath = 'anims/'

export class Chapter3Scene12 extends BaseScene {

    constructor() {
        super('Chapter3Scene12')
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc12', path + 'background.png');
        this.load.atlas('Chp3Sc12', path + 'scene12.png', path + 'scene12.json');

    }

    create() {
        super.create()

        this.atlasTexture = this.textures.get('Chp3Sc12');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.children.bringToTop(this.charactersContainer);
        // this.addInput()


        this.updatePosition()
        // this.addVictoryConditions()

        this.addUI([this.uiText.Chapter3Scene12[this.language]], 50, 1.1, 0.85)

    }

    update() {
        super.update()
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp3Sc12')
        this.backgroundContainer.add(bk)

        let foreground = this.physics.add.sprite(-800, 170, 'Chp3Sc12', this.frames[1])
        foreground.setScale(1.1)
        this.backgroundContainer.add(foreground)

        let table = this.physics.add.sprite(170, -10, 'Chp3Sc12', this.frames[0])
        table.setScale(1.1)
        this.backgroundContainer.add(table)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters(){

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
    
    }

    
}