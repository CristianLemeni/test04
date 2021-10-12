import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene7/'
const animPath = 'anims/'
const oldPath = '../src/assets/Chapter1/scene5/'


export class Chapter2Scene7 extends BaseScene {

    constructor() {
        super('Chapter2Scene7')
    }

    preload() {
        super.preload()
        this.load.image('water1Chp2Sc7', path + 'background.png');
        this.load.image('water2Chp2Sc7', path + 'foreground.png');
        this.load.image('nightSkyChp2Sc7', path + 'nightSky.png');
        this.load.atlas('Chp1Sc5', oldPath + 'scene5.png', oldPath + 'scene5.json');
        this.load.spine('boatAnimChp2Sc7', path + animPath + 'ch2p7-boat-fixed.json', [path + animPath + 'ch2p7-boat-fixed.atlas'], true);
        this.load.atlas('Chp2Sc7', path + 'scene7.png', path + 'scene7.json');
        this.load.plugin('rexpathfollowerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js', true);
    }

    create() {
        super.create()
        this.atlasTextureSc5 = this.textures.get('Chp1Sc5');
        this.framesSc5 = this.atlasTextureSc5.getFrameNames();

        this.atlasTextureSc7 = this.textures.get('Chp2Sc7');
        this.framesSc7 = this.atlasTextureSc7.getFrameNames();

        this.movement = 0
        this.fallingTweens = []
        this.createContainers()

        this.addBackground()
        this.addCharacters()
        this.addOverground()
        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene7[this.language], 50, 1.1, 0.85)

    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'nightSkyChp2Sc7')
        bk.setScale(1.1)
        this.backgroundContainer.add(bk)

        let starsPos = [
            { x: 27, y: 66, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 71, y: 150, scale: this.getRandomNumber(0.5, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1, y: 220, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 55, y: 350, scale: this.getRandomNumber(0.2, 0.1), isTwinkle: false, alpha: 1 },
            { x: 80, y: 186, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 150, y: 118, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 231, y: 64, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 206, y: 250, scale: this.getRandomNumber(0.7, 0.1), isTwinkle: false, alpha: 1 },
            { x: 252, y: 251, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 284, y: 335, scale: this.getRandomNumber(0.3, 0.1), isTwinkle: false, alpha: 1 },
            { x: 355, y: 358, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 387, y: 393, scale: this.getRandomNumber(0.4, 0.1), isTwinkle: false, alpha: 1 },
            { x: 436, y: 337, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 408, y: 304, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 426, y: 221, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 414, y: 102, scale: this.getRandomNumber(0.4, 0.1), isTwinkle: false, alpha: 1 },
            { x: 395, y: 33, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 482, y: 77, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 562, y: 164, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 582, y: 140, scale: this.getRandomNumber(0.4, 0.1), isTwinkle: false, alpha: 1 },
            { x: 663, y: 48, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 603, y: 232, scale: this.getRandomNumber(0.55, 0.1), isTwinkle: false, alpha: 1 },
            { x: 692, y: 209, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 695, y: 296, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 780, y: 327, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 855, y: 192, scale: this.getRandomNumber(0.3, 0.1), isTwinkle: false, alpha: 1 },
            { x: 796, y: 115, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 902, y: 33, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 865, y: 218, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 901, y: 300, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 948, y: 191, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 972, y: 178, scale: this.getRandomNumber(0.65, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1058, y: 49, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1081, y: 156, scale: this.getRandomNumber(0.75, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1043, y: 320, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1071, y: 374, scale: this.getRandomNumber(0.5, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1183, y: 281, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1168, y: 244, scale: this.getRandomNumber(0.2, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1225, y: 71, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1331, y: 172, scale: this.getRandomNumber(0.3, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1265, y: 311, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1239, y: 375, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1431, y: 81, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1449, y: 150, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1440, y: 300, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1539, y: 361, scale: this.getRandomNumber(0.9, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1620, y: 270, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1639, y: 250, scale: this.getRandomNumber(0.65, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1694, y: 156, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1713, y: 97, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1916, y: 58, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1889, y: 210, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1887, y: 296, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1899, y: 360, scale: this.getRandomNumber(0.6, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1871, y: 446, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
        ]

        for (let i = 0; i < starsPos.length; i++) {
            this.addStar(starsPos[i].x - this.cameras.main.width / 2, starsPos[i].y - this.cameras.main.height / 2, starsPos[i].scale, starsPos[i].isTwinkle, starsPos[i].alpha, 'Chp1Sc5', this.framesSc5[4])
        }

        this.backWater = []
        for (let i = 0; i < 2; i++) {
            let waterBackContainer = this.add.container()

            let waterBack1 = this.physics.add.sprite(-100, 200, 'water1Chp2Sc7')
            waterBackContainer.add(waterBack1)
            waterBack1.flipX = true
            let waterBack2 = this.physics.add.sprite(1850, 200, 'water1Chp2Sc7')
            waterBackContainer.add(waterBack2)

            waterBackContainer.x = i * 1850

            this.backgroundContainer.add(waterBackContainer)
            this.backWater.push(waterBackContainer)
        }

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {
        this.people = []

        let people1 = this.physics.add.sprite(-650, 185, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people1)
        this.people.push(people1)

        let people2 = this.physics.add.sprite(-550, 175, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people2)
        this.people.push(people2)

        let people3 = this.physics.add.sprite(-645, 185, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people3)
        this.people.push(people3)

        let people4 = this.physics.add.sprite(-475, 155, 'Chp2Sc7', this.framesSc7[5])
        this.charactersContainer.add(people4)
        this.people.push(people4)

        let people5 = this.physics.add.sprite(-575, 155, 'Chp2Sc7', this.framesSc7[2])
        this.charactersContainer.add(people5)
        this.people.push(people5)

        let people6 = this.physics.add.sprite(-550, 150, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people6)
        this.people.push(people6)

        let people7 = this.physics.add.sprite(-390, 150, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people7)
        this.people.push(people7)

        let people8 = this.physics.add.sprite(-375, 155, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people8)
        this.people.push(people8)

        let people9 = this.physics.add.sprite(-405, 150, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people9)
        this.people.push(people9)

        let people10 = this.physics.add.sprite(-255, 150, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people10)
        this.people.push(people10)

        let people11 = this.physics.add.sprite(-225, 150, 'Chp2Sc7', this.framesSc7[5])
        this.charactersContainer.add(people11)
        this.people.push(people11)

        let people12 = this.physics.add.sprite(-125, 150, 'Chp2Sc7', this.framesSc7[2])
        this.charactersContainer.add(people12)
        this.people.push(people12)

        let people13 = this.physics.add.sprite(-225, 150, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people13)
        this.people.push(people13)

        let people14 = this.physics.add.sprite(-125, 150, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people14)
        this.people.push(people14)

        let people15 = this.physics.add.sprite(-225, 150, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people15)
        this.people.push(people15)

        let people16 = this.physics.add.sprite(45, 150, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people16)
        this.people.push(people16)

        let people17 = this.physics.add.sprite(-145, 150, 'Chp2Sc7', this.framesSc7[2])
        this.charactersContainer.add(people17)
        this.people.push(people17)

        let people18 = this.physics.add.sprite(-105, 175, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people18)
        this.people.push(people18)

        let people19 = this.physics.add.sprite(-105, 165, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people19)
        this.people.push(people19)

        let people20 = this.physics.add.sprite(50, 140, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people20)
        this.people.push(people20)

        let people21 = this.physics.add.sprite(30, 140, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people21)
        this.people.push(people21)

        let people22 = this.physics.add.sprite(30, 120, 'Chp2Sc7', this.framesSc7[3])
        this.charactersContainer.add(people22)
        this.people.push(people22)

        let people23 = this.physics.add.sprite(125, 120, 'Chp2Sc7', this.framesSc7[4])
        this.charactersContainer.add(people23)
        this.people.push(people23)

        let people24 = this.physics.add.sprite(150, 100, 'Chp2Sc7', this.framesSc7[1])
        this.charactersContainer.add(people24)
        this.people.push(people24)


        for (let i = 0; i < this.people.length; i++) {
            this.tweens.add({
                targets: this.people[i],
                y: { value: this.people[i].y - this.getRandomInt(10, 1), duration: 2000 },
                loop: -1,
                yoyo: true,
                delay: this.getRandomInt(10, 1)
            })
        }


        this.mainContainer.add(this.charactersContainer)
    }

    addOverground() {
        this.ship = this.addSpine(1500, 300, 'boatAnimChp2Sc7', this.backgroundContainer)

        this.peopleFloating = []

        let people1 = this.physics.add.sprite(-200, 250, 'Chp2Sc7', this.framesSc7[1])
        people1.setAlpha(0)
        this.charactersContainer.add(people1)
        this.peopleFloating.push(people1)

        let people2 = this.physics.add.sprite(-20, 250, 'Chp2Sc7', this.framesSc7[4])
        people2.setAlpha(0)
        this.charactersContainer.add(people2)
        this.peopleFloating.push(people2)

        let people3 = this.physics.add.sprite(350, 250, 'Chp2Sc7', this.framesSc7[3])
        people3.setAlpha(0)
        this.charactersContainer.add(people3)
        this.peopleFloating.push(people3)

        let people4 = this.physics.add.sprite(700, 250, 'Chp2Sc7', this.framesSc7[5])
        people4.setAlpha(0)
        this.charactersContainer.add(people4)
        this.peopleFloating.push(people4)

        let people5 = this.physics.add.sprite(1175, 250, 'Chp2Sc7', this.framesSc7[2])
        people5.setAlpha(0)
        this.charactersContainer.add(people5)
        this.peopleFloating.push(people5)

        let people6 = this.physics.add.sprite(1325, 250, 'Chp2Sc7', this.framesSc7[3])
        people6.setAlpha(0)
        this.charactersContainer.add(people6)
        this.peopleFloating.push(people6)

        let people7 = this.physics.add.sprite(1800, 250, 'Chp2Sc7', this.framesSc7[4])
        people7.setAlpha(0)
        this.charactersContainer.add(people7)
        this.peopleFloating.push(people7)

        let people8 = this.physics.add.sprite(2185, 250, 'Chp2Sc7', this.framesSc7[3])
        people8.setAlpha(0)
        this.charactersContainer.add(people8)
        this.peopleFloating.push(people8)

        let people9 = this.physics.add.sprite(2500, 250, 'Chp2Sc7', this.framesSc7[4])
        people9.setAlpha(0)
        this.charactersContainer.add(people9)
        this.peopleFloating.push(people9)

        let people10 = this.physics.add.sprite(2835, 250, 'Chp2Sc7', this.framesSc7[5])
        people10.setAlpha(0)
        this.charactersContainer.add(people10)
        this.peopleFloating.push(people10)

        let people11 = this.physics.add.sprite(3350, 250, 'Chp2Sc7', this.framesSc7[2])
        people11.setAlpha(0)
        this.charactersContainer.add(people11)
        this.peopleFloating.push(people11)

        let people12 = this.physics.add.sprite(3700, 250, 'Chp2Sc7', this.framesSc7[1])
        people12.setAlpha(0)
        this.charactersContainer.add(people12)
        this.peopleFloating.push(people12)

        let people13 = this.physics.add.sprite(4100, 250, 'Chp2Sc7', this.framesSc7[4])
        people13.setAlpha(0)
        this.charactersContainer.add(people13)
        this.peopleFloating.push(people13)

        let people14 = this.physics.add.sprite(4500, 250, 'Chp2Sc7', this.framesSc7[3])
        people14.setAlpha(0)
        this.charactersContainer.add(people14)
        this.peopleFloating.push(people14)

        for (let i = 0; i < this.peopleFloating.length; i++) {
            this.tweens.add({
                targets: this.peopleFloating[i],
                y: { value: this.peopleFloating[i].y + this.getRandomInt(25, 10), duration: 2000 },
                loop: -1,
                yoyo: true,
                delay: this.getRandomInt(10, 1)
            })
        }


        this.boat = this.physics.add.sprite(-500, 150, 'Chp2Sc7', this.framesSc7[6])
        this.boat.setOrigin(0.25)
        this.charactersContainer.add(this.boat)

        this.tweens.add({
            targets: this.boat,
            rotation: { value: 0.05, duration: 2000, ease: Phaser.Math.Easing.Sine.Out },
            loop: -1,
            yoyo: true
        })


        this.frontWater = []
        for (let i = 0; i < 3; i++) {
            let waterFrontContainer = this.add.container()

            let waterFront1 = this.physics.add.sprite(-150, 350, 'water2Chp2Sc7')
            waterFrontContainer.add(waterFront1)
            waterFront1.flipX = true
            let waterFront2 = this.physics.add.sprite(1600, 351, 'water2Chp2Sc7')
            waterFront2.flipX = true
            waterFrontContainer.add(waterFront2)

            waterFrontContainer.x = i * 3000

            this.overgroundContainer.add(waterFrontContainer)
            this.frontWater.push(waterFrontContainer)
        }
        this.mainContainer.add(this.overgroundContainer)
    }

    addInput() {
        this.boat.setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.boat);

        this.input.on('pointerdown', (pointer) => {
            this.org = pointer.x
            for (let i = 0; i < this.momentumTweens.length; i++) {
                this.momentumTweens[i].setTimeScale(10)
            }
        })

        this.forward = false
        this.momentumTweens = []
        this.boatSelected = false

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (Math.ceil(this.frontWater[0].x - (pointer.x - this.org)) <= -5) {
                this.boatSelected = true
                for (let i = 0; i < this.backWater.length; i++) {
                    this.backWater[i].x -= (pointer.x - this.org) / 20
                }
                for (let i = 0; i < this.frontWater.length; i++) {
                    this.frontWater[i].x -= (pointer.x - this.org) / 2
                }
                for (let i = 0; i < this.peopleFloating.length; i++) {
                    this.peopleFloating[i].x -= (pointer.x - this.org) / 2
                }
                if (this.movement + (pointer.x - this.org) > this.movement) {
                    this.events.emit("boatMovedForward")
                    this.forward = true
                }
                else {
                    this.events.emit("boatMovedBackward")
                    this.forward = false
                }
                this.movement += (pointer.x - this.org) / 2
                this.org = pointer.x
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (Math.ceil(this.frontWater[0].x - (pointer.x - this.org)) <= -5 && this.boatSelected) {
                let dir
                if (this.forward) {
                    dir = -1
                }
                else {
                    dir = 1
                }
                for (let i = 0; i < this.backWater.length; i++) {
                    this.backWater[i].x -= (pointer.x - this.org) / 20
                    let t = this.tweens.add({
                        targets: this.backWater[i],
                        x: { value: this.backWater[i].x + (5 * dir), duration: 1000, ease: Phaser.Math.Easing.Quadratic.Out }
                    })
                    this.momentumTweens.push(t)
                }
                for (let i = 0; i < this.frontWater.length; i++) {
                    let t = this.tweens.add({
                        targets: this.frontWater[i],
                        x: { value: this.frontWater[i].x + (50 * dir), duration: 1000, ease: Phaser.Math.Easing.Quadratic.Out }
                    })
                    this.momentumTweens.push(t)
                }
                for (let i = 0; i < this.peopleFloating.length; i++) {
                    let t = this.tweens.add({
                        targets: this.peopleFloating[i],
                        x: { value: this.peopleFloating[i].x + (50 * dir), duration: 1000, ease: Phaser.Math.Easing.Quadratic.Out },
                    })
                    this.momentumTweens.push(t)
                }
                this.time.delayedCall(1000, () => {
                    this.movement -= 50 * dir
                })
                this.org = pointer.x
                this.boatSelected = false
            }
            else {
                this.boatSelected = false
            }
        })

        this.events.on("startShip", () => {
            this.boat.disableInteractive()

            this.tweens.add({
                targets: this.ship,
                x: { value: 750, duration: 4000, ease: Phaser.Math.Easing.Quadratic.Out }
            })
            this.tweens.add({
                targets: [this.boat],
                x: { value: -300, duration: 4000, ease: Phaser.Math.Easing.Quadratic.Out },
                onComplete: () => {
                    this.events.emit('rescue')
                }
            })

            for (let i = 14; i < this.people.length; i++) {
                this.tweens.add({
                    targets: this.people[i],
                    x: { value: this.people[i].x + 200, duration: 4000, ease: Phaser.Math.Easing.Quadratic.Out },
                })
            }
        })
    }

    addVictoryConditions() {
        this.events.on('rescue', () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter2Scene7[this.language],
                    nextScene: "Chapter2Scene8",
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })

        this.events.on("boatMovedForward", () => {
            if (this.movement >= 300) {
                this.fall(this.people[0], this.peopleFloating[0])
            }
            if (this.movement >= 480) {
                this.fall(this.people[1], this.peopleFloating[1])
            }
            if (this.movement >= 850) {
                this.fall(this.people[2], this.peopleFloating[2])
            }
            if (this.movement >= 1200) {
                this.fall(this.people[3], this.peopleFloating[3])
            }
            if (this.movement >= 1675) {
                this.fall(this.people[4], this.peopleFloating[4])
            }
            if (this.movement >= 1825) {
                this.fall(this.people[5], this.peopleFloating[5])
            }
            if (this.movement >= 2300) {
                this.fall(this.people[6], this.peopleFloating[6])
            }
            if (this.movement >= 2685) {
                this.fall(this.people[7], this.peopleFloating[7])
            }
            if (this.movement >= 3000) {
                this.fall(this.people[8], this.peopleFloating[8])
            }
            if (this.movement >= 3335) {
                this.fall(this.people[9], this.peopleFloating[9])
            }
            if (this.movement >= 3850) {
                this.fall(this.people[10], this.peopleFloating[10])
            }
            if (this.movement >= 4200) {
                this.fall(this.people[11], this.peopleFloating[11])
            }
            if (this.movement >= 4600) {
                this.fall(this.people[12], this.peopleFloating[12])
            }
            if (this.movement >= 5000) {
                this.fall(this.people[13], this.peopleFloating[13])
            }
            if (this.movement >= 5500) {
                this.events.emit("startShip")
            }
        })

        this.events.on("boatMovedBackward", () => {
            if (this.movement <= 300) {
                this.fall(this.peopleFloating[0], this.people[0])
            }
            if (this.movement <= 480) {
                this.fall(this.peopleFloating[1], this.people[1])
            }
            if (this.movement <= 850) {
                this.fall(this.peopleFloating[2], this.people[2])
            }
            if (this.movement <= 1200) {
                this.fall(this.peopleFloating[3], this.people[3])
            }
            if (this.movement <= 1675) {
                this.fall(this.peopleFloating[4], this.people[4])
            }
            if (this.movement <= 1825) {
                this.fall(this.peopleFloating[5], this.people[5])
            }
            if (this.movement <= 2300) {
                this.fall(this.peopleFloating[6], this.people[6])
            }
            if (this.movement <= 2685) {
                this.fall(this.peopleFloating[7], this.people[7])
            }
            if (this.movement <= 3000) {
                this.fall(this.peopleFloating[8], this.people[8])
            }
            if (this.movement <= 3335) {
                this.fall(this.peopleFloating[9], this.people[9])
            }
            if (this.movement <= 3850) {
                this.fall(this.peopleFloating[10], this.people[10])
            }
            if (this.movement <= 4200) {
                this.fall(this.peopleFloating[11], this.people[11])
            }
            if (this.movement <= 4600) {
                this.fall(this.peopleFloating[12], this.people[12])
            }
            if (this.movement <= 5000) {
                this.fall(this.peopleFloating[13], this.people[13])
            }
        })
    }

    fall(obj, obj2) {
        this.tweens.add({
            targets: obj,
            alpha: { value: 0, duration: 500 },
        })

        this.tweens.add({
            targets: obj2,
            alpha: { value: 1, duration: 500 }
        })
    }

}