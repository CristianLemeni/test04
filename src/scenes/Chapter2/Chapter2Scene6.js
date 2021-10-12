import { EarthSceneBase } from "../Common/EarthSceneBase";

const path = '../src/assets/Chapter2/scene6/'
const animPath = 'anims/'

export class Chapter2Scene6 extends EarthSceneBase {

    constructor() {
        super('Chapter2Scene6')
    }

    preload() {
        super.preload()
        this.load.image('boatCph2Sc6', path + 'boat.png');
        this.startRotation = false
    }

    create() {
        super.create()
        this.audioPlaying = true //debug
        this.nextScene = "Chapter2Scene7"
        this.feedbackText = this.feedbackText.Chapter2Scene6[this.language]
        this.transitionTitle = this.titlesText.TitleChapter2[this.language]
        this.titlePos = { x: 600, y: 150 }
        this.speed = 0.02
        this.createContainers()

        this.addBackground()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.input.on('pointerdown', () => {
            this.startRotation = true
        })


        this.updatePosition(-70)
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene6[this.language], 50, 1.1, 0.85)

    }

    update() {
        if (this.startRotation) {
            super.update()
        }
    }

    addCharacters() {
        let boat = this.physics.add.sprite(-25, -300, 'boatCph2Sc6')
        this.overgroundContainer.add(boat)

        this.mainContainer.add(this.charactersContainer)
    }

}