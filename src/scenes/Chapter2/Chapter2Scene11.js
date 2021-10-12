import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene11/'
const oldPath = '../src/assets/Chapter1/scene5/'

export class Chapter2Scene11 extends BaseScene {

    constructor() {
        super('Chapter2Scene11')
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Sc11', path + 'Fond.png');
        this.load.image('bk_2Chp2Sc11', path + 'cloud-bottom.png');
        this.load.image('cloudFadedChp2Sc11', path + 'cloud-faded.png')
        this.load.atlas('Chp1Sc5', oldPath + 'scene5.png', oldPath + 'scene5.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp1Sc5');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition(-70)
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene11[this.language], 50, 1.1, 0.85)

    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp2Sc11')
        bk.setScale(1.1)
        this.backgroundContainer.add(bk)

        let clouds = this.physics.add.sprite(100, 300, 'bk_2Chp2Sc11')
        this.backgroundContainer.add(clouds)

        let fadedCloud = this.physics.add.sprite(700, -100, 'cloudFadedChp2Sc11')
        this.backgroundContainer.add(fadedCloud)

        let cloud1 = this.physics.add.sprite(-600, -350, 'Chp1Sc5', this.frames[0])
        cloud1.setScale(1.25)
        this.backgroundContainer.add(cloud1)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {
        let airplane = this.physics.add.sprite(-150, -100, 'Chp1Sc5', this.frames[2])
        airplane.flipX = true
        airplane.setScale(0.85)
        this.charactersContainer.add(airplane)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[0].on("pointerdown", () => {
            this.tweens.add({
                targets: this.charactersContainer.list[0],
                x: { value: -1000, duration: 2000 },
                onComplete: () => {
                    this.events.emit("planeFly")
                }
            })
        })
    }

    addVictoryConditions() {
        this.events.on("planeFly", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter2Scene11[this.language],
                    nextScene: 'MainMenuScene',
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })
    }


}