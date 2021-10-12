import { CitySceneBase } from "../Common/CitySceneBase"
const soundsPath = '../src/assets/Chapter1/scene6/sounds/'

export class Chapter1Scene6 extends CitySceneBase {


    constructor() {
        super('Chapter1Scene6')
    }

    preload() {
        super.preload()
        this.load.audio('airplaneChp1Sc6', [soundsPath + 'ch1_sc06_avion_lointain.mp3'])
        this.load.audio('ambientChp1Sc6', [soundsPath + 'ch1_sc06_amb_ville.mp3'])
    }

    create() {
        super.create()

        this.playSound('ambientChp1Sc6', 1, true)

        this.addPlane()
        this.addUI(this.uiText.Chapter1Scene6[this.language], 50, 1.1)
    }

    update() {
        super.update()
    }

    addPlane() {
        let airplane = this.physics.add.sprite(-600, -325, 'Chp1Sc6', this.frames[2])
        this.charactersContainer.add(airplane)
    }

    addInput() {
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });

        this.charactersContainer.list[0].on('pointerdown', () => {
            this.planeFlyAway()
        });
    }

    planeFlyAway() {
        this.playSound('airplaneChp1Sc6').once('complete', () => {
            this.scene.transition({
                target: 'TransitionScene', duration: 10,
                data: {
                    text: this.feedbackText.Chapter1Scene6[this.language],
                    nextScene: 'Chapter1Scene7',
                    title: this.titlesText.TitleChapter1[this.language]
                }
            });
        })
        this.tweens.add({
            targets: [this.charactersContainer.list[1]],
            x: { value: -1500, duration: 4000, ease: "Power1" },
            y: { value: -500, duration: 4000, ease: "Power1" },
        })
    }
}