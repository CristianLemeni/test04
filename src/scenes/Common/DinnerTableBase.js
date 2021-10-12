import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene2/'
const animPath = 'anims/'

export class DinnerTableBase extends BaseScene {

    constructor(config) {
        super(config)
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc2', path + 'table.png');
        this.load.atlas('dinnerTableScene', path + 'scene2.png', path + 'scene2.json');
    }

    create() {
        super.create()
        this.atlasTextureBase = this.textures.get('dinnerTableScene');
        this.frames = this.atlasTextureBase.getFrameNames();
        this.createContainers()

        this.addBackground()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()
    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp3Sc2')
        this.backgroundContainer.add(bk)

        let napkin = this.physics.add.sprite(-550, -25, 'dinnerTableScene', this.frames[1])
        this.backgroundContainer.add(napkin)


        let fork = this.physics.add.sprite(700, 425, 'dinnerTableScene', this.frames[7])
        this.backgroundContainer.add(fork)

        let knife = this.physics.add.sprite(500, 325, 'dinnerTableScene', this.frames[5])
        this.backgroundContainer.add(knife)

        let plate = this.physics.add.sprite(0, 50, 'dinnerTableScene', this.frames[0])
        this.backgroundContainer.add(plate)
        
        this.mainContainer.add(this.backgroundContainer)
    }

    addFood(){
        let sauce = this.physics.add.sprite(-750, -425, 'dinnerTableScene', this.frames[3])
        this.backgroundContainer.add(sauce)

        let glass = this.physics.add.sprite(650, -425, 'dinnerTableScene', this.frames[6])
        this.backgroundContainer.add(glass)

        let salad = this.physics.add.sprite(-150, -150, 'dinnerTableScene', this.frames[2])
        this.backgroundContainer.add(salad)

        let food = this.physics.add.sprite(0, 50, 'dinnerTableScene', this.frames[4])
        this.backgroundContainer.add(food)
    }
    
}