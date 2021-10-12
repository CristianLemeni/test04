import { BaseScene } from "../Common/BaseScene"

const path = '../src/assets/Chapter1/scene6/'
const animPath = 'anims/'

export class CitySceneBase extends BaseScene {


    constructor(config) {
        super(config)
    }

    preload() {
        super.preload()
        this.load.image('bk0Chp1Sc6', path + 'fond (2).png')
        this.load.image('bk1Chp1Sc6', path + 'Ville (1).png');
        this.load.image('bk2Chp1Sc6', path + 'Ville.png');
        this.load.image('bk3Chp1Sc6', path + 'Nuages.png');
        this.load.spine('persChp1Sc6', path + animPath + 'ch1p6-character.json', [path + animPath + 'ch1p6-character.atlas'], true);
        this.load.atlas('Chp1Sc6', path + 'scene6.png', path + 'scene6.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp1Sc6');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.addInput()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()

    }

    update() {

    }

    addBackground() {
        let bk1 = this.physics.add.sprite(0, -250, 'bk0Chp1Sc6')
        this.backgroundContainer.add(bk1)

        let sun = this.physics.add.sprite(700, -200, 'Chp1Sc6', this.frames[0])
        this.backgroundContainer.add(sun)

        let bk2 = this.physics.add.sprite(0, 100, 'bk3Chp1Sc6')
        this.backgroundContainer.add(bk2)

        let bk3 = this.physics.add.sprite(-10, 150, 'bk2Chp1Sc6')
        this.backgroundContainer.add(bk3)

        let bk4 = this.physics.add.sprite(-10, 300, 'bk1Chp1Sc6')
        this.backgroundContainer.add(bk4)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }
    

    addCharacters() {
        this.addSpine(0, 0, 'persChp1Sc6', this.charactersContainer)

        this.mainContainer.add(this.charactersContainer)
    }

    createContainers() {
        this.mainContainer = this.add.container()
        this.backgroundContainer = this.add.container()
        this.overgroundContainer = this.add.container()
        this.charactersContainer = this.add.container()

        this.physics.world.enableBody(this.backgroundContainer)
        this.physics.world.enableBody(this.charactersContainer);
        this.physics.world.enableBody(this.overgroundContainer);
    }
}