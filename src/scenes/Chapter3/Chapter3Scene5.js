import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene3/'
const pathOld = '../src/assets/Chapter3/scene1/'
const animPath = 'anims/'

export class Chapter3Scene5 extends BaseScene {

    constructor() {
        super('Chapter3Scene5')
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc3', path + 'sky-orange.png');
        this.load.atlas('Chp3Sc3', path + 'scene3.png', path + 'scene3.json');
        this.load.atlas('Chp3Sc1', pathOld + 'scene1.png', pathOld + 'scene1.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp3Sc3');
        this.frames = this.atlasTexture.getFrameNames();

        this.atlasTextureOld = this.textures.get('Chp3Sc1');
        this.framesOld = this.atlasTextureOld.getFrameNames();


        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.addBubbles()
        
        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()

        this.addUI([this.uiText.Chapter3Scene3[this.language]], 50, 1.1, 0.85)
        this.addInput()
        this.addVictoryConditions()
    }

    update() {
        super.update()
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, -100, 'bkChp3Sc3')
        this.backgroundContainer.add(bk)

        let treesLeft = this.physics.add.sprite(-835, 132, 'Chp3Sc1', this.framesOld[1])
        treesLeft.setTint(0x000000);
        this.backgroundContainer.add(treesLeft)

        let treesRight = this.physics.add.sprite(-10, 90, 'Chp3Sc1', this.framesOld[2])
        treesRight.setTint(0x000000);
        this.backgroundContainer.add(treesRight)

        let sol = this.physics.add.sprite(10, 375, 'Chp3Sc3', this.frames[3])
        sol.setScale(1.1)
        this.backgroundContainer.add(sol)

        let sun = this.physics.add.sprite(600, -350, 'Chp3Sc3', this.frames[2])
        this.backgroundContainer.add(sun)

        let cloud = this.physics.add.sprite(-500, -150, 'Chp3Sc3', this.frames[0])
        this.backgroundContainer.add(cloud)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {

        let pers = this.physics.add.sprite(0, 50, 'Chp3Sc3', this.frames[1])
        this.charactersContainer.add(pers)

        this.mainContainer.add(this.charactersContainer)
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
        // let bubble1 = this.physics.add.sprite(-500, -350, 'Chp2Sc10', this.frames10[0])
        // this.overgroundContainer.add(bubble1)

        // let bubble2 = this.physics.add.sprite(500, -250, 'Chp2Sc10', this.frames10[1])
        // bubble2.setAlpha(0)
        // this.overgroundContainer.add(bubble2)

        // let bubble3 = this.physics.add.sprite(-600, 150, 'Chp2Sc10', this.frames10[2])
        // bubble3.setAlpha(0)
        // this.overgroundContainer.add(bubble3)

        // let bubble4 = this.physics.add.sprite(-600, -300, 'Chp2Sc10', this.frames10[3])
        // bubble4.setAlpha(0)
        // this.overgroundContainer.add(bubble4)

        // let bubble5 = this.physics.add.sprite(625, 185, 'Chp2Sc10', this.frames10[4])
        // bubble5.setAlpha(0)
        // this.overgroundContainer.add(bubble5)

        // let bubble6 = this.physics.add.sprite(-500, -300, 'Chp2Sc10', this.frames10[5])
        // bubble6.setAlpha(0)
        // this.overgroundContainer.add(bubble6)
    }

    addVictoryConditions() {
        this.events.on("allCracksVisible", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter3Scene3[this.language],
                    nextScene: 'Chapter3Scene4',
                    title: this.titlesText.TitleChapter3[this.language]
                }
            });
        })
    }


}