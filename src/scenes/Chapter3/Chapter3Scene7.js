import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene7/'
const animPath = 'anims/'

export class Chapter3Scene7 extends BaseScene {

    constructor() {
        super('Chapter3Scene7')
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc7', path + 'background.png');
        this.load.image('sewingMachinesChp3Sc7', path + 'sewing-machines.png');
        this.load.atlas('Chp3Sc7', path + 'scene7.png', path + 'scene7.json');
        this.load.spine('pers1Chp3Sc7', path + animPath + 'ch3p7-foreman-fixed.json', [path + animPath + 'ch3p7-foreman-fixed.atlas'], true);
        this.load.spine('pers2Chp3Sc7', path + animPath + 'ch3p7-migrant-left1-fixed.json', [path + animPath + 'ch3p7-migrant-left1-fixed.atlas'], true);
        this.load.spine('pers3Chp3Sc7', path + animPath + 'ch3p7-migrant-left2-fixed.json', [path + animPath + 'ch3p7-migrant-left2-fixed.atlas'], true);
        this.load.spine('pers4Chp3Sc7', path + animPath + 'ch3p7-migrant-middle-fixed.json', [path + animPath + 'ch3p7-migrant-middle-fixed.atlas'], true);
        this.load.spine('pers5Chp3Scene7', path + animPath + 'ch3p7-migrant-right-fixed.json', [path + animPath + 'ch3p7-migrant-right-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp3Sc7');
        this.frames = this.atlasTexture.getFrameNames();

        this.backLimit = {
            x: 0,
            direction: 1
        }

        this.characters = []

        this.createContainers()

        this.addBackground()
        this.addCharacters()
        this.addOverground()

        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()
        this.addPatrolEvents()
        this.addUI([this.uiText.Chapter3Scene7[this.language]], 50, 1.1, 0.85)

    }

    update() {
        super.update()
    }

    addBackground() {
        let bk = this.physics.add.sprite(37.5, 0, 'bkChp3Sc7')
        this.backgroundContainer.add(bk)

        let cables1 = this.physics.add.sprite(50, 0, 'Chp3Sc7', this.frames[1])
        this.overgroundContainer.add(cables1)
        let cables2 = this.physics.add.sprite(0, 0, 'Chp3Sc7', this.frames[2])
        this.overgroundContainer.add(cables2)

        this.foreman = this.addSpine(1100, 700, 'pers1Chp3Sc7', this.backgroundContainer)
        this.backLimit.x = this.foreman.x.valueOf()

        let pers1 = this.add.container()
        pers1.add(this.addSpine(-400, 400, 'pers3Chp3Sc7', pers1))
        this.characters.push(pers1)
        this.backgroundContainer.add(pers1)
        let pers2 = this.add.container()
        pers2.add(this.addSpine(450, 400, 'pers5Chp3Scene7', pers2))
        this.characters.push(pers2)
        this.backgroundContainer.add(pers2)

        let sew = this.physics.add.sprite(50, 350, 'sewingMachinesChp3Sc7')
        this.backgroundContainer.add(sew)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {

        let pers3 = this.add.container()
        pers3.add(this.addSpine(-800, 450, 'pers2Chp3Sc7', pers3))
        this.characters.push(pers3)
        this.backgroundContainer.add(pers3)
        let pers4 = this.add.container()
        pers4.add(this.addSpine(100, 450, 'pers4Chp3Sc7', pers4))
        this.characters.push(pers4)
        this.backgroundContainer.add(pers4)
        let pers5 = this.add.container()
        pers5.add(this.addSpine(1000, 450, 'pers2Chp3Sc7', pers5))
        this.characters.push(pers5)
        this.backgroundContainer.add(pers5)
        this.mainContainer.add(this.charactersContainer)
    }

    addOverground() {
        let foreground = this.physics.add.sprite(50, 0, 'Chp3Sc7', this.frames[0])
        this.overgroundContainer.add(foreground)

        this.mainContainer.add(this.overgroundContainer)
    }

    addInput() {
        let patrol = this.tweens.timeline({ loop: -1 })

        patrol.add({
            targets: [this.foreman, this.backLimit],
            x: { value: -1100, duration: 10000 },
            onComplete: () => {
                this.events.emit("flipForeman", true)
            }
        })
        patrol.add({
            targets: [this.foreman, this.backLimit],
            x: { value: 1100, duration: 10000 },
            onComplete: () => {
                this.events.emit("flipForeman", false)
            }
        })

        patrol.play()

        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].list[0].setInteractive({ cursor: 'pointer' });
            this.input.setDraggable(this.characters[i].list[0]);
        }

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject.x * this.backLimit.direction > this.backLimit.x * this.backLimit.direction) {
                gameObject.x = dragX
                if (gameObject.x <= -900) {
                    gameObject.disableInteractive()
                    this.tweens.add({
                        targets: gameObject,
                        x: { value: -1200, duration: 1000 },
                        onComplete: () => {
                            this.events.emit("runAway")
                        }
                    })

                }
                else if (gameObject.x >= 900) {
                    gameObject.disableInteractive()
                    this.tweens.add({
                        targets: gameObject,
                        x: { value: 1200, duration: 1000 },
                        onComplete: () => {
                            this.events.emit("runAway")
                        }
                    })
                }
            }
        });
    }

    addPatrolEvents() {
        this.events.on("flipForeman", (flip) => {
            this.foreman.scaleX = flip ? -1 : 1
            this.backLimit.direction = flip ? -1 : 1
        })
    }

    addVictoryConditions() {
        this.events.on("runAway", () => {
            let r = 0
            for (let i = 0; i < this.characters.length; i++) {
                if (this.characters[i].list[0].x == -1200 || this.characters[i].list[0].x == 1200) {
                    r++
                }
            }

            if (r > 4) {
                this.events.emit("runAwayAll")
            }
            console.log(r)
        })

        this.events.on("runAwayAll", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter3Scene7[this.language],
                    nextScene: "Chapter3Scene8",
                    title: this.titlesText.TitleChapter3[this.language]
                }
            });
        })
    }
}