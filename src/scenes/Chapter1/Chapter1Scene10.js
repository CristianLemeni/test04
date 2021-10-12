import { BaseScene } from "../Common/BaseScene"

const path = '../src/assets/Chapter1/scene10/'
const pathOld = '../src/assets/Chapter1/scene9/'
const pathOldAnim = '../src/assets/Chapter1/scene7/'
const animPath = 'anims/'
const soundsPath = 'sounds/'

export class Chapter1Scene10 extends BaseScene {


    constructor() {
        super('Chapter1Scene10')
    }

    preload() {
        super.preload()
        this.load.image('Chp1Sc10', path + 'décor.png');
        this.load.image('birouChp1Sc10', path + 'Elements Bureau.png');
        this.load.image('bk1Chp1Sc10', path + 'fond (4).png');
        this.load.image('bk2Chp1Sc10', path + 'fond (5).png');
        this.load.image('bk3Chp1Sc10', path + 'fond (6).png');
        this.load.image('bk4Chp1Sc10', path + 'ciel.png');
        this.load.image('cloudsChp1Sc10', path + 'Nuages.png');
        this.load.image('town1Chp1Sc10', path + 'Ville (1).png');
        this.load.image('town2Chp1Sc10', path + 'ville (2).png');
        this.load.image('town3Chp1Sc10', path + 'Ville.png');
        this.load.atlas('Chp1Sc10_2', path + 'scene10.png', path + 'scene10.json');
        this.load.atlas('Chp1Sc10_3', pathOld + 'scene9.png', pathOld + 'scene9.json');
        this.load.spine('teacherChp1Sc10', path + animPath + 'ch1p10-teacher-fixed.json', [path + animPath + 'ch1p10-teacher-fixed.atlas'], true);
        this.load.spine('pers1Chp1Sc10', path + animPath + 'ch1p10-girl.json', [path + animPath + 'ch1p10-girl.atlas'], true);
        this.load.spine('pers2Chp1Sc10', path + animPath + 'ch1p10-boy-fixed.json', [path + animPath + 'ch1p10-boy-fixed.atlas'], true);
        this.load.spine('pers3Chp1Sc10', pathOldAnim + animPath + 'ch1p7-character-fixed.json', [pathOldAnim + animPath + 'ch1p7-character-fixed.atlas'], true);
        this.load.image('summerBkChp1Sc10', path + 'fond (7).png');
        this.load.image('autumnBkChp1Sc10', path + 'fond (8).png');
        this.load.image('winterBkChp1Sc10', path + 'fond (9).png');
        this.load.image('springBkChp1Sc10', path + 'fond (10).png');
        this.load.image('autumnHillChp1Sc10', path + 'sol (1).png');
        this.load.image('winterHillChp1Sc10', path + 'sol (2).png');
        this.load.image('springHillChp1Sc10', path + 'sol (3).png');
        this.load.atlas('Chp1Sc10_1', path + 'scene11.png', path + 'scene11.json');
        this.load.image('writing', pathOld + 'gibberish.png');
        this.load.audio('tick', [path + soundsPath + 'ch1_sc10_tiktak.mp3'])
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp1Sc10_2');
        this.frames = this.atlasTexture.getFrameNames();

        this.atlasTexture2 = this.textures.get('Chp1Sc10_1');
        this.frames2 = this.atlasTexture2.getFrameNames();

        this.atlasTextureOld = this.textures.get('Chp1Sc10_3');
        this.framesOld = this.atlasTextureOld.getFrameNames();

        this.containerArr = []
        this.hasStarted = false
        this.lastBk = false
        this.createContainers()

        this.addBackground()
        // this.addCharacters()
        this.addVictoryConditions()
        this.addUI(this.uiText.Chapter1Scene10.Part1[this.language], 50, 1.1)


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.updatePosition()
    }

    update() {
        if (this.hasStarted) {
            this.rotateLongArm(0, 0, 15)
            this.rotateShortArm(0, 0, 0.025)
        }
    }

    addBackground() {

        this.addMiniScene1()
        this.addMiniScene2()
        this.addMiniScene3()
        this.addMiniScene4()
        this.addMiniScene5()
        this.addMiniScene6()
        this.addMiniScene7()
        this.addMiniScene8()
        this.addMiniScene9()


        for (let i = 0; i < this.containerArr.length; i++) {
            this.mainContainer.add(this.containerArr[i])
            if (i > 0) {
                this.containerArr[i].setAlpha(0)
            }
        }

        this.currentScene = this.containerArr[0]

        this.clockContainer = this.add.container()
        this.clock = this.physics.add.sprite(0, 0, 'Chp1Sc10_2', this.frames[6])
        this.clockContainer.add(this.clock)
        this.clockTongue1 = this.physics.add.sprite(this.clock.x, this.clock.y, 'Chp1Sc10_2', this.frames[8])
        this.clockContainer.add(this.clockTongue1)
        this.clockTongue1.setOrigin(0.5, 1)
        this.clockTongue2 = this.physics.add.sprite(this.clock.x, this.clock.y, 'Chp1Sc10_2', this.frames[9])
        this.clockContainer.add(this.clockTongue2)
        this.clockTongue2.setOrigin(0.5, 1)

        this.rotateLongArm(0, 0, 0.1)
        this.rotateShortArm(0, 0, 0.025)

        this.clockContainer.x = -800
        this.clockContainer.y = -400

        this.backgroundContainer.add(this.clockContainer)

        let pers3 = this.add.spine(600, 550, 'pers3Chp1Sc10');
        let pers3Anims = pers3.getAnimationList();
        pers3.play(pers3Anims[0], true);
        this.charactersContainer.add(pers3)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)
        this.mainContainer.add(this.charactersContainer)
    }

    addMiniScene1() {
        let container = this.add.container()

        let bk1 = this.physics.add.sprite(0, -100, 'bk1Chp1Sc10')
        container.add(bk1)

        let sun = this.physics.add.sprite(700, -200, 'Chp1Sc10_2', this.frames[7])
        container.add(sun)

        let bk2 = this.physics.add.sprite(0, 100, 'cloudsChp1Sc10')
        container.add(bk2)

        let bk3 = this.physics.add.sprite(0, 150, 'town3Chp1Sc10')
        container.add(bk3)

        let bk4 = this.physics.add.sprite(0, 300, 'town1Chp1Sc10')
        container.add(bk4)

        this.containerArr.push(container)
    }

    addMiniScene2() {
        let container = this.add.container()

        let bk5 = this.physics.add.sprite(0, -75, 'bk2Chp1Sc10')
        bk5.setScale(1.1)
        container.add(bk5)

        let window = this.physics.add.sprite(850, -500, 'Chp1Sc10_2', this.frames[4])
        container.add(window)

        let deskElements = this.physics.add.sprite(-365, 100, 'birouChp1Sc10')
        container.add(deskElements)

        this.addSpine(-200, 550, 'teacherChp1Sc10', container, 0)

        this.containerArr.push(container)
    }

    addMiniScene3() {
        let container = this.add.container()

        let bk6 = this.physics.add.sprite(0, -75, 'bk4Chp1Sc10')
        bk6.setScale(1.1)
        container.add(bk6)

        let clouds = this.physics.add.sprite(675, -350, 'Chp1Sc10_2', this.frames[5])
        container.add(clouds)

        let decor = this.physics.add.sprite(100, 290, 'Chp1Sc10')
        container.add(decor)

        this.addSpine(-400, 550, 'pers1Chp1Sc10', container, 0)
        this.addSpine(-50, 550, 'pers2Chp1Sc10', container, 0)

        this.containerArr.push(container)
    }

    addMiniScene4() {
        let container = this.add.container()

        let bkSummer = this.physics.add.sprite(0, -100, 'summerBkChp1Sc10')
        bkSummer.setScale(1.1)
        container.add(bkSummer)

        let summerSol = this.physics.add.sprite(200, 250, 'Chp1Sc10_1', this.frames2[0])
        container.add(summerSol)

        let summerTree = this.add.sprite(-475, 0, 'Chp1Sc10_1', this.frames2[3]);
        container.add(summerTree)

        this.containerArr.push(container)
    }

    addMiniScene5() {
        let container = this.add.container()

        let bkAutumn = this.physics.add.sprite(0, -100, 'autumnBkChp1Sc10')
        bkAutumn.setScale(1.1)
        container.add(bkAutumn)

        let autumnSol = this.physics.add.sprite(-25, 200, 'autumnHillChp1Sc10')
        container.add(autumnSol)

        let autumnTree = this.add.sprite(-655, -25, 'Chp1Sc10_1', this.frames2[5]);
        container.add(autumnTree)

        this.containerArr.push(container)
    }

    addMiniScene6() {
        let container = this.add.container()

        let bkWinter = this.physics.add.sprite(0, -100, 'winterBkChp1Sc10')
        bkWinter.setScale(1.1)
        container.add(bkWinter)

        let winterSol = this.physics.add.sprite(0, 200, 'winterHillChp1Sc10')
        container.add(winterSol)

        let winterTree = this.add.sprite(-655, 50, 'Chp1Sc10_1', this.frames2[4]);
        container.add(winterTree)

        this.containerArr.push(container)
    }

    addMiniScene7() {
        let container = this.add.container()

        let bkSpring = this.physics.add.sprite(0, -100, 'springBkChp1Sc10')
        container.add(bkSpring)

        let springSol = this.physics.add.sprite(50, 200, 'springHillChp1Sc10')
        container.add(springSol)

        let springTree = this.add.sprite(-655, 50, 'Chp1Sc10_1', this.frames2[6]);
        container.add(springTree)

        this.containerArr.push(container)
    }

    addMiniScene8() {
        let container = this.add.container()

        let bk7 = this.physics.add.sprite(15, -250, 'bk3Chp1Sc10')
        bk7.setScale(1.15)
        container.add(bk7)

        let city = this.physics.add.sprite(905, 100, 'town2Chp1Sc10')
        city.setScale(1.1)
        container.add(city)

        this.building = this.physics.add.sprite(-475, 0, 'Chp1Sc10_2', this.frames[2])
        container.add(this.building)

        this.containerArr.push(container)
    }

    addMiniScene9() {
        let container = this.add.container()

        this.drawTileBK(-750, -350, 'Chp1Sc10_3', this.framesOld[3], container, 24, 28, 30, 26)


        let handPart1 = this.physics.add.sprite(400, 200, 'Chp1Sc10_3', this.framesOld[1])
        container.add(handPart1)

        this.paper = this.physics.add.sprite(0, -100, 'Chp1Sc10_3', this.framesOld[0])
        container.add(this.paper)

        let letterText = this.add.sprite(0, -100, 'writing');
        container.add(letterText)

        let handPart2 = this.physics.add.sprite(175, 80, 'Chp1Sc10_3', this.framesOld[2])
        container.add(handPart2)

        this.containerArr.push(container)
    }

    addInput() {
        this.clockContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.containerArr[this.containerArr.length - 1].list[this.containerArr[this.containerArr.length - 1].list.length - 3].setInteractive({ cursor: 'pointer' });
        this.containerArr[this.containerArr.length - 2].list[2].setInteractive({ cursor: 'pointer' });

        this.clockContainer.list[0].on('pointerdown', () => {
            if (!this.lastBk) {
                this.hasStarted = true
            }
            this.events.emit("startFade")
        });
        this.input.on('pointerup', () => {
            this.hasStarted = false
            if (!this.lastBk) {
                this.events.emit("stopFade")
            }
        });

    }

    addVictoryConditions() {
        let i = 0
        let soundOn = true
        this.events.on("fadeFinished", () => {
            this.hasStarted = false
            this.lastBk = true
            soundOn = false
            this.paper.on('pointerdown', () => {
                this.tweens.add({
                    targets: this.mainContainer,
                    alpha: { value: 0, duration: 1000 },
                    onComplete: () => {
                        this.scene.transition({
                            target: 'TransitionScene', duration: 0, data: {
                                text: this.feedbackText.Chapter1Scene10[this.language],
                                nextScene: "MainMenuScene",
                                textFontSize: 32,
                                title: this.titlesText.TitleChapter1[this.language]
                            }
                        });
                    }
                })
            })

            this.building.on('pointerdown', () => {
                this.tweens.add({
                    targets: this.charactersContainer.list[0],
                    alpha: { value: 0, duration: 1000 }
                })
                this.tweens.add({
                    targets: this.containerArr[7],
                    alpha: { value: 0, duration: 1000 }
                })
                this.tweens.add({
                    targets: this.containerArr[8],
                    alpha: { value: 1, duration: 1000 }
                })
            })
        })

        this.events.on("startFade", () => {
            if (soundOn) {
                this.playSound('tick', 1, false, 300)
            }
            if (this.containerArr[i].alpha > 0) {
                this.tweens.add({
                    targets: this.containerArr[i],
                    alpha: { value: 0, duration: 2000 },
                })
                if (i + 1 == 1) {
                    this.tweens.add({
                        targets: [this.containerArr[i + 1], this.containerArr[i + 1].list[3]],
                        alpha: { value: 1, duration: 2000 },
                        onComplete: () => {
                            i++
                            this.events.emit("startFade")
                        }
                    })
                }
                else if (i + 1 == 2) {
                    this.tweens.add({
                        targets: [this.containerArr[i + 1], this.containerArr[i + 1].list[3], , this.containerArr[i + 1].list[4]],
                        alpha: { value: 1, duration: 2000 },
                        onComplete: () => {
                            i++
                            this.events.emit("startFade")
                        }
                    })
                }
                else {
                    this.tweens.add({
                        targets: this.containerArr[i + 1],
                        alpha: { value: 1, duration: 2000 },
                        onComplete: () => {
                            if (i == 3) {
                                this.text.text = this.uiText.Chapter1Scene10.Part2[this.language]
                            }
                            if (i > 5) {
                                this.tweens.killAll()
                                this.events.emit("fadeFinished")
                            }
                            else {
                                i++
                                this.events.emit("startFade")
                            }
                        }
                    })
                }
            }
        })

        this.events.on("stopFade", () => {
            this.stopSound('tick')
            this.tweens.killAll()
        })
    }

    addMask(container, offsetX = 0, offsetY = 0) {
        let shape = this.add.image(offsetX, offsetY, 'bk4Chp1Sc10').setVisible(false);
        shape.setOrigin(0)
        let mask = shape.createBitmapMask();
        container.mask = mask
    }

    rotateLongArm(x, y, speed) {
        let p = new Phaser.Geom.Point(x, y);
        Phaser.Actions.RotateAroundDistance([this.clockTongue1], p, speed, 8);
        const angleDeg1 = Math.atan2(this.clockTongue1.y - p.y, this.clockTongue1.x - p.x) * 180 / Math.PI;
        this.clockTongue1.angle = angleDeg1 + 90
    }

    rotateShortArm(x, y, speed) {
        let p = new Phaser.Geom.Point(x, y);
        Phaser.Actions.RotateAroundDistance([this.clockTongue2], p, speed, 10);
        const angleDeg2 = Math.atan2(this.clockTongue2.y - p.y, this.clockTongue2.x - p.x) * 180 / Math.PI;
        this.clockTongue2.angle = angleDeg2 + 90
    }

}