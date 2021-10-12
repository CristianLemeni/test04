import { EarthSceneBase } from "../Common/EarthSceneBase";

const path = '../src/assets/Chapter2/scene9/'
const animPath = 'anims/'

export class Chapter2Scene9 extends EarthSceneBase {

    constructor() {
        super('Chapter2Scene9')
    }

    preload() {
        super.preload()
        this.load.image('truckSmallChp2Sc9', path + 'truck-small.png');
        this.startRotation = false
    }

    create() {
        super.create()
        this.audioPlaying = true //debug
        this.speed = 0.02
        this.nextScene = "Chapter2Scene10"
        this.feedbackText = this.feedbackText.Chapter2Scene9[this.language]
        this.transitionTitle = this.titlesText.TitleChapter2[this.language]
        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.input.on('pointerdown', () => {
            this.startRotation = true
        })


        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition(-70)
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene9[this.language], 50, 1.1, 0.85)
    }

    update() {
        if(this.startRotation){
            super.update()
        }
    }

    addCharacters(){
        let truck = this.physics.add.sprite(-25, -300, 'truckSmallChp2Sc9')
        this.overgroundContainer.add(truck)
        this.mainContainer.add(this.charactersContainer)
    }   
    
}