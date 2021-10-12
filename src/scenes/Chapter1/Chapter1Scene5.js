import { EarthSceneBase } from "../Common/EarthSceneBase";

const pathUi = '../src/assets/UiScene/'
const soundsPath = '../src/assets/Chapter1/scene5/sounds/'


export class Chapter1Scene5 extends EarthSceneBase {


    constructor() {
        super('Chapter1Scene5')
    }

    preload() {
        super.preload()
        this.load.audio('arrivalChp1Sc5', [soundsPath + 'ch1_sc05_arrival.mp3'])
        this.load.audio('airplaneChp1Sc5', [soundsPath + 'ch1_sc05_avion.mp3'])
    }

    create() {
        super.create()
        
        this.nextScene = "Chapter1Scene6"
        this.feedbackText = this.feedbackText.Chapter1Scene5[this.language]
        this.transitionTitle = this.titlesText.TitleChapter1[this.language]
        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.addUI(this.uiText.Chapter1Scene5[this.language], 50, 1.1)

        this.speed = 0.01
        this.addInput()
        this.addVictoryConditions()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()
        this.arrivalSound = this.sound.add('arrivalChp1Sc5')
        this.airplaneSound = this.sound.add('airplaneChp1Sc5')
    }

    update() {
        super.update()
    }

    addCharacters() {
        let airplane = this.physics.add.sprite(-25, -325, 'earthScene', this.frames[2])
        airplane.setScale(0.5)
        this.overgroundContainer.add(airplane)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput(){
        super.addInput()
        this.planet.on('pointerdown', () => {
            this.airplaneSound.play({volume: 0.5})
        })
        this.planet.on('pointerup', () => {
            this.airplaneSound.pause()
        })
    }
}