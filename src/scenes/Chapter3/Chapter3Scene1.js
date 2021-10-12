import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene1/'
const pathOld = '../src/assets/Chapter2/scene1/'
const animPath = 'anims/'

export class Chapter3Scene1 extends BaseScene {

    constructor() {
        super('Chapter3Scene1')
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc1', path + 'Fond.png');
        this.load.atlas('Chp3Sc1', path + 'scene1.png', path + 'scene1.json');
        this.load.atlas('Chp3Sc1Old', pathOld + 'scene1.png', pathOld + 'scene1.json');
        this.load.spine('persChp3Sc1', path + animPath + 'ch3p1-woman-fixed.json', [path + animPath + 'ch3p1-woman-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp3Sc1');
        this.frames = this.atlasTexture.getFrameNames();

        this.atlasTextureOld = this.textures.get('Chp3Sc1Old');
        this.framesOld = this.atlasTextureOld.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()

        this.addUI([this.uiText.Chapter3Scene1[this.language]], 50, 1.1, 0.85)

    }

    update() {
        super.update()
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, -150, 'bkChp3Sc1')
        bk.setScale(1.1)
        this.backgroundContainer.add(bk)

        let treesLeft = this.physics.add.sprite(-835, 142, 'Chp3Sc1', this.frames[1])
        this.backgroundContainer.add(treesLeft)

        let treesRight = this.physics.add.sprite(-10, 100, 'Chp3Sc1', this.frames[2])
        this.backgroundContainer.add(treesRight)

        let sol = this.physics.add.sprite(-10, 375, 'Chp3Sc1', this.frames[5])
        this.backgroundContainer.add(sol)

        let sun = this.physics.add.sprite(600, -350, 'Chp3Sc1', this.frames[3])
        this.backgroundContainer.add(sun)

        let cloud1 = this.physics.add.sprite(100, -275, 'Chp3Sc1Old', this.framesOld[3])
        this.backgroundContainer.add(cloud1)

        let cloud2 = this.physics.add.sprite(-600, -400, 'Chp3Sc1Old', this.framesOld[10])
        this.backgroundContainer.add(cloud2)

        this.cropSmall = this.physics.add.sprite(-300, 350, 'Chp3Sc1', this.frames[0])
        this.backgroundContainer.add(this.cropSmall)

        let cropFull = this.physics.add.sprite(-250, 105, 'Chp3Sc1', this.frames[4])
        this.backgroundContainer.add(cropFull)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {
        this.addSpine(-100, 200, 'persChp3Sc1', this.charactersContainer)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.cropSmall.setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.cropSmall);
        this.scaleMod = 1.1

        this.input.on('pointerdown', (pointer) => {
            this.org = pointer.y
        })

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if(pointer.y < this.org){
                this.cropSmall.setScale(this.scaleMod)
                this.scaleMod += 0.1
                this.cropSmall.alpha -= 0.01
                this.events.emit("plantScale", this.scaleMod)
            }
            this.org = pointer.y
        });

    }

    addVictoryConditions() {
        this.events.on("plantScale", (scale) => {
            //check for plant growth to replace current plant
        })
    }


}