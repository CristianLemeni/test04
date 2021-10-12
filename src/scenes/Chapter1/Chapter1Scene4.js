import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene4/'
const soundsPath = 'sounds/'


export class Chapter1Scene4 extends BaseScene {


    constructor() {
        super('Chapter1Scene4')
    }

    preload() {
        super.preload()
        this.load.image('bkChp1Sc4', path + 'fond.png');
        this.load.atlas('Chp1Sc4', path + 'scene4.png', path + 'scene4.json');
        this.load.audio('ambienceChp1Sc4', [path + soundsPath + 'ch1_sc04_amb_airport.mp3'])
        this.load.audio('airplaneTakeOf', [path + soundsPath + 'ch1_sc04_decollage.mp3'])
        this.load.audio('airplaneClick', [path + soundsPath + 'ch1_sc04_plane_click.mp3'])
    }

    create() {
        super.create()

        this.playSound('ambienceChp1Sc4', 1, true)

        this.atlasTexture = this.textures.get('Chp1Sc4');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.addInput()
        this.addUI(this.uiText.Chapter1Scene4[this.language], 50, 1.1)

        this.children.bringToTop(this.charactersContainer);

        this.addVictoryConditions()

        this.updatePosition(-350)
    }

    update() {
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp1Sc4')
        this.backgroundContainer.add(bk)

        this.starsPos = [
            { x: 81, y: 109, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 169, y: 161, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 160, y: 300, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 142, y: 482, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 220, y: 25, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 287, y: 1, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 313, y: 43, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 300, y: 228, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 278, y: 391, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 312, y: 363, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 343, y: 369, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 369, y: 412, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 355, y: 118, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 393, y: 59, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 427, y: 101, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 387, y: 146, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 443, y: 519, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 464, y: 255, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 525, y: 232, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 576, y: 8, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 706, y: 78, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 723, y: 63, scale: this.getRandomNumber(0.5, 0.1), isTwinkle: false, alpha: 1 },
            { x: 750, y: 96, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 704, y: 268, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 633, y: 378, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 760, y: 443, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 784, y: 424, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 809, y: 465, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 945, y: 420, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 909, y: 214, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 929, y: 32, scale: this.getRandomNumber(0.9, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1046, y: 122, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1043, y: 373, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1081, y: 92, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1114, y: 101, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1136, y: 144, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1180, y: 223, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1209, y: 250, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1218, y: 159, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1257, y: 204, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1403, y: 109, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1473, y: 8, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1534, y: 177, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1552, y: 161, scale: this.getRandomNumber(0.8, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1575, y: 200, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1712, y: 149, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1756, y: 2, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1810, y: 368, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1769, y: 517, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
        ]

        for (let i = 0; i < this.starsPos.length; i++) {
            this.addStar(this.starsPos[i].x - this.cameras.main.width / 2, this.starsPos[i].y, this.starsPos[i].scale, this.starsPos[i].isTwinkle, this.starsPos[i].alpha, 'Chp1Sc4', this.frames[4])
        }

        let pass = this.physics.add.sprite(300, 700, 'Chp1Sc4', this.frames[0])
        this.overgroundContainer.add(pass)

        let airport = this.physics.add.sprite(-750, 375, 'Chp1Sc4', this.frames[1])
        this.overgroundContainer.add(airport)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addCharacters() {
        let airplane = this.physics.add.sprite(0, 670, 'Chp1Sc4', this.frames[2])
        this.charactersContainer.add(airplane)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.charactersContainer.list[0]);

        let takeof = true
        let planeSound = true
        this.playSound('airplaneTakeOf')
        this.input.on('pointerdown', (pointer) => {
            this.org = pointer.x
        })

        this.charactersContainer.list[0].on('pointerdown', () => {
            if (planeSound) {
                this.playSound('airplaneClick', 0.25, false)
                this.time.delayedCall(1000, () => {
                    planeSound = true
                })
                planeSound = false
            }
        })

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (dragX > 0 && this.org < pointer.x) {
                this.overgroundContainer.list[0].x -= pointer.x - this.org
                this.overgroundContainer.list[1].x -= pointer.x - this.org
                gameObject.y -= (pointer.x - this.org) / 10
                if (gameObject.rotation <= -0.2) {
                    takeof = false
                }
                if (takeof) {
                    gameObject.rotation -= 0.002
                }
                if (!takeof) {
                    for (let i = 0; i < this.backgroundContainer.list.length; i++) {
                        this.backgroundContainer.list[i].y += (pointer.x - this.org) / 10
                    }
                    this.events.emit("planeMove", gameObject)
                }
                this.org = pointer.x
            }
        })
    }

    addVictoryConditions() {
        this.events.on("planeMove", (plane) => {
            if (plane.y <= 250) {
                this.scene.transition({
                    target: 'TransitionScene', duration: 0,
                    data: {
                        text: this.feedbackText.Chapter1Scene4[this.language],
                        nextScene: 'Chapter1Scene5',
                        title: this.titlesText.TitleChapter1[this.language]
                    }
                });
            }
        })
    }
}