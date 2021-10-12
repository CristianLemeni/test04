import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene1/'
// const animPath = 'anims/'

export class Chapter2Scene1 extends BaseScene {

    constructor() {
        super('Chapter2Scene1')
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Sc1', path + 'sky.png');
        this.load.image('city1Chp2Sc1', path + 'bg-back.png');
        this.load.image('city3Chp2Sc1', path + 'bg-front.png');
        this.load.image('city2Chp2Sc1', path + 'bg-middle.png');
        this.load.atlas('Chp2Sc1', path + 'scene1.png', path + 'scene1.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp2Sc1');
        this.frames = this.atlasTexture.getFrameNames();

        this.escape = []

        this.createContainers()

        this.addBackground()
        this.addOverground()
        this.addCharacters()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene1[this.language], 50, 1.1, 0.85)

        this.startEvents()

    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, -100, 'bkChp2Sc1')
        this.backgroundContainer.add(bk)

        let city1 = this.physics.add.sprite(35, 150, 'city1Chp2Sc1')
        this.backgroundContainer.add(city1)

        let city2 = this.physics.add.sprite(50, 100, 'city2Chp2Sc1')
        this.backgroundContainer.add(city2)

        let city3 = this.physics.add.sprite(-25, 200, 'city3Chp2Sc1')
        this.backgroundContainer.add(city3)

        let trees = this.physics.add.sprite(15, 335, 'Chp2Sc1', this.frames[0])
        this.backgroundContainer.add(trees)

        let smallCloud = this.physics.add.sprite(950, -250, 'Chp2Sc1', this.frames[3])
        this.backgroundContainer.add(smallCloud)

        let bigCloud = this.physics.add.sprite(-200, -400, 'Chp2Sc1', this.frames[10])
        this.backgroundContainer.add(bigCloud)

        let sun = this.physics.add.sprite(-700, -400, 'Chp2Sc1', this.frames[13])
        this.backgroundContainer.add(sun)

        this.mainContainer.add(this.backgroundContainer)
    }

    addOverground() {
        let pers1 = this.physics.add.sprite(-145, 285, 'Chp2Sc1', this.frames[8])
        pers1.setAlpha(0)
        this.overgroundContainer.add(pers1)

        let pers2 = this.physics.add.sprite(-145, 285, 'Chp2Sc1', this.frames[2])
        pers2.setAlpha(0)
        this.overgroundContainer.add(pers2)

        let pers3 = this.physics.add.sprite(-145, 285, 'Chp2Sc1', this.frames[12])
        pers3.setAlpha(0)
        this.overgroundContainer.add(pers3)

        let pers4 = this.physics.add.sprite(150, 285, 'Chp2Sc1', this.frames[8])
        pers4.setAlpha(0)
        pers4.flipX = true
        this.overgroundContainer.add(pers4)

        let pers5 = this.physics.add.sprite(150, 285, 'Chp2Sc1', this.frames[2])
        pers5.setAlpha(0)
        pers5.flipX = true
        this.overgroundContainer.add(pers5)

        let pers6 = this.physics.add.sprite(150, 285, 'Chp2Sc1', this.frames[12])
        pers6.setAlpha(0)
        pers6.flipX = true
        this.overgroundContainer.add(pers6)

        let crowd = this.physics.add.sprite(-25, 250, 'Chp2Sc1', this.frames[1])
        crowd.setAlpha(0)
        this.overgroundContainer.add(crowd)


        this.mainContainer.add(this.overgroundContainer)
    }

    addCharacters() {
        let walkingPers1 = this.physics.add.sprite(675, 285, 'Chp2Sc1', this.frames[4])
        this.charactersContainer.add(walkingPers1)
        this.escape.push(walkingPers1)

        let walkingPers2 = this.physics.add.sprite(-750, 325, 'Chp2Sc1', this.frames[5])
        walkingPers2.setScale(0.75)
        this.charactersContainer.add(walkingPers2)
        this.escape.push(walkingPers2)

        let walkingPers3 = this.physics.add.sprite(550, 300, 'Chp2Sc1', this.frames[11])
        this.charactersContainer.add(walkingPers3)
        this.escape.push(walkingPers3)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        for (let i = 0; i < this.charactersContainer.list.length; i++) {
            this.charactersContainer.list[i].setInteractive({ cursor: 'pointer' });
            this.input.setDraggable(this.charactersContainer.list[i]);
        }

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            if (gameObject.x <= -900) {
                this.tweens.add({
                    targets: gameObject,
                    x: { value: -1200, duration: 1000 },
                    onComplete: () => {
                        this.events.emit("escape")
                    }
                })

            }
            else if (gameObject.x >= 900) {
                this.tweens.add({
                    targets: gameObject,
                    x: { value: 1200, duration: 1000 },
                    onComplete: () => {
                        this.events.emit("escape")
                    }
                })
            }
        });
    }

    addVictoryConditions() {
        this.events.on("escape", () => {
            let e = 0
            for (let i = 0; i < this.escape.length; i++) {
                if (this.escape[i].x == -1200 || this.escape[i].x == 1200) {
                    e++
                }
            }

            if (e > 2) {
                this.events.emit("escapeAll")
            }
        })

        this.events.on("escapeAll", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter2Scene1[this.language],
                    nextScene: "Chapter2Scene2",
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })
    }

    startEvents() {
        this.tweens.add({
            targets: [this.overgroundContainer.list[0], this.overgroundContainer.list[2]],
            alpha: { value: 1, duration: 1000 },
            delay: 1000
        })
        this.tweens.add({
            targets: [this.overgroundContainer.list[1], this.overgroundContainer.list[3]],
            alpha: { value: 1, duration: 1000 },
            delay: 2000
        })
        this.tweens.add({
            targets: [this.overgroundContainer.list[2], this.overgroundContainer.list[4], this.overgroundContainer.list[5]],
            alpha: { value: 1, duration: 1000 },
            delay: 3000
        })

        this.tweens.add({
            targets: this.overgroundContainer.list[6],
            y: { value: 215, duration: 2000 },
            alpha: { value: 1, duration: 1000 },
            delay: 4000,
        })

        this.time.delayedCall(10000, this.addInput())
    }
}