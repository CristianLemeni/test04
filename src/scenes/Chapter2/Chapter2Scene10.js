import { CitySceneBase } from "../Common/CitySceneBase"

const path = '../src/assets/Chapter2/scene10/'

export class Chapter2Scene10 extends CitySceneBase {


    constructor() {
        super('Chapter2Scene10')
    }

    preload() {
        super.preload()
        this.load.atlas('Chp2Sc10', path + 'scene10.png', path + 'scene10.json');
    }

    create() {
        super.create()

        this.atlasTexture10 = this.textures.get('Chp2Sc10');
        this.frames10 = this.atlasTexture10.getFrameNames();

        this.addBubbles()
        this.addInput()
        this.addVictoryConditions()
        this.addUI(this.uiText.Chapter2Scene10[this.language], 50, 1.1)
    }

    update() {
        super.update()
    }


    addInput() {
        for (let i = 0; i < this.overgroundContainer.list.length; i++) {
            this.overgroundContainer.list[i].setInteractive({ cursor: 'pointer' });

            this.overgroundContainer.list[i].on('pointerdown', () => {
                let timeline = this.tweens.createTimeline();

                timeline.add({
                    targets: this.overgroundContainer.list[i],
                    alpha: 0,
                    duration: 1000
                });

                if (i + 1 < this.overgroundContainer.list.length) {
                    timeline.add({
                        targets: this.overgroundContainer.list[i + 1],
                        alpha: 1,
                        duration: 1000
                    });
                }
                else {
                    this.time.delayedCall(1100, () => {
                        this.events.emit("bubblesCleared")
                    })
                }
                timeline.play()
            });
        }
    }

    addBubbles() {
        let bubble1 = this.physics.add.sprite(-500, -350, 'Chp2Sc10', this.frames10[0])
        this.overgroundContainer.add(bubble1)

        let bubble2 = this.physics.add.sprite(500, -250, 'Chp2Sc10', this.frames10[1])
        bubble2.setAlpha(0)
        this.overgroundContainer.add(bubble2)

        let bubble3 = this.physics.add.sprite(-600, 150, 'Chp2Sc10', this.frames10[2])
        bubble3.setAlpha(0)
        this.overgroundContainer.add(bubble3)

        let bubble4 = this.physics.add.sprite(-600, -300, 'Chp2Sc10', this.frames10[3])
        bubble4.setAlpha(0)
        this.overgroundContainer.add(bubble4)

        let bubble5 = this.physics.add.sprite(625, 185, 'Chp2Sc10', this.frames10[4])
        bubble5.setAlpha(0)
        this.overgroundContainer.add(bubble5)

        let bubble6 = this.physics.add.sprite(-500, -300, 'Chp2Sc10', this.frames10[5])
        bubble6.setAlpha(0)
        this.overgroundContainer.add(bubble6)
    }

    addVictoryConditions() {
        this.events.on("bubblesCleared", () => {
            this.scene.transition({
                target: 'TransitionScene', duration: 0, data: {
                    text: this.feedbackText.Chapter2Scene10[this.language],
                    nextScene: "Chapter2Scene11",
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })
    }

}