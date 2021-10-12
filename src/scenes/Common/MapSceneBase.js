import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene3/'
const animPath = 'anims/'

export class MapSceneBase extends BaseScene {

    constructor(config) {
        super(config)
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Scene3', path + 'map.png');
        this.load.atlas('scene3', path + 'scene3.png', path + 'scene3.json');
        this.load.spine('pers1Chapter2Scene3', path + animPath + 'ch2p3-migrant-fixed.json', [path + animPath + 'ch2p3-migrant-fixed.atlas'], true);
        this.load.spine('pers2Chapter2Scene3', path + animPath + 'ch2p3-smuggler-multi-fixed.json', [path + animPath + 'ch2p3-smuggler-multi-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('scene3');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        // this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        // this.addInput()


        this.updatePosition()
        // this.addVictoryConditions()
    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp2Scene3')
        this.backgroundContainer.add(bk)


        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters(pers1Pos, pers2Pos) {
        if (pers1Pos) {
            this.addSpine(pers1Pos.x, pers1Pos.y, 'pers1Chapter2Scene3', this.charactersContainer)
        }

        if (pers2Pos) {
            this.addSpine(pers2Pos.x, pers2Pos.y, 'pers2Chapter2Scene3', this.charactersContainer, 0, 1)
            this.addSpine(pers2Pos.x, pers2Pos.y, 'pers2Chapter2Scene3', this.charactersContainer, 0)
        }

        this.mainContainer.add(this.charactersContainer)
    }

    addDryLand(x, y) {
        let dryLand = this.physics.add.sprite(x, y, 'scene3', this.frames[0])
        this.backgroundContainer.add(dryLand)
    }

    addWater(x, y, scale = 1) {
        let sea = this.physics.add.sprite(x, y, 'scene3', this.frames[1])
        sea.setScale(scale)
        this.backgroundContainer.add(sea)
    }

    addTank(startX, startY, endX, endY, duration) {
        let tank = this.physics.add.sprite(startX, startY, 'scene3', this.frames[2])
        this.backgroundContainer.add(tank)

        this.tweens.add({
            targets: tank,
            x: { value: endX, duration: duration },
            y: { value: endY, duration: duration }
        })
    }

}