import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene9/'

export class Chapter1Scene9 extends BaseScene {


    constructor() {
        super('Chapter1Scene9')
    }

    preload() {
        super.preload()
        this.load.image('bkChp1Sc9', path + 'Calque 4.png');
        this.load.image('writing', path + 'gibberish.png');
        this.load.atlas('Chp1Sc9', path + 'scene9.png', path + 'scene9.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp1Sc9');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()

        this.addUI(this.uiText.Chapter1Scene9[this.language], 50, 1.1, 1, -50)


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.updatePosition()

    }

    update() {

    }

    addBackground() {
        this.drawTileBK(-750, -350, 'Chp1Sc9', this.frames[3], this.backgroundContainer, 24, 28, 30, 26)

        let bk = this.physics.add.sprite(0, 25, 'bkChp1Sc9')
        this.backgroundContainer.add(bk)

        let handPart1 = this.physics.add.sprite(400, 200, 'Chp1Sc9', this.frames[1])
        this.backgroundContainer.add(handPart1)

        this.paper = this.physics.add.sprite(0, -100, 'Chp1Sc9', this.frames[0])
        this.backgroundContainer.add(this.paper)

        let letterText = this.add.sprite(0, -100, 'writing');
        this.backgroundContainer.add(letterText)


        let handPart2 = this.physics.add.sprite(175, 80, 'Chp1Sc9', this.frames[2])
        this.backgroundContainer.add(handPart2)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addInput() {
        this.paper.setInteractive({ cursor: 'pointer' });

        this.paper.on('pointerdown', () => {
            this.tweens.add({
                targets: this.mainContainer,
                alpha: { value: 0, duration: 1000 },
                onComplete: () => {
                    this.scene.transition({
                        target: 'TransitionScene',
                        duration: 0,
                        data: {
                            text: this.feedbackText.Chapter1Scene9[this.language],
                            nextScene: "Chapter1Scene10",
                            title: this.titlesText.TitleChapter1[this.language]
                        }
                    });
                }
            })
        });
    }
}