import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene2/'
const pathUi = '../src/assets/UiScene/'
const soundsPath = 'sounds/'
const oldPath = '../src/assets/Chapter1/scene1/'


export class Chapter1Scene2 extends BaseScene {


    constructor() {
        super('Chapter1Scene2')
    }

    preload() {
        super.preload()
        this.load.image('bkChp1Sc2', path + 'Fond.png');
        this.load.image('overgroundChp1Sc2', path + 'Ville.png');
        this.load.image('fenceChp1Sc2', path + 'Calque 2.png');
        this.load.atlas('Chp1Sc2', path + 'scene2.png', path + 'scene2.json');
        this.load.audio('car', [path + soundsPath + 'ch1_sc02_car.mp3'])
        this.load.audio('siren', [path + soundsPath + 'ch1_sc02_siren.mp3'])
        this.load.audio('steps', [path + soundsPath + 'ch1_sc02_steps.mp3'])
        this.load.audio('ambienceChp1Sc1', [oldPath + soundsPath + 'ch1_amb_nuit.mp3'])
    }

    create() {
        super.create()

        this.playSound('ambienceChp1Sc1', 1, true, true)

        this.atlasTexture = this.textures.get('Chp1Sc2');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.updatePosition()

        this.addUI(this.uiText.Chapter1Scene2[this.language], 50, 1.1)
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp1Sc2')
        this.backgroundContainer.add(bk)

        let starsPos = [
            { x: 155, y: 315, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 174, y: 133, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 318, y: 57, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 296, y: 227, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 329, y: 191, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 358, y: 204, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 386, y: 244, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 431, y: 323, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 458, y: 350, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 501, y: 305, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 465, y: 259, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 480, y: 91, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 544, y: 70, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 651, y: 209, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 716, y: 106, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 778, y: 282, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 798, y: 266, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 822, y: 300, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 907, y: 285, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 922, y: 102, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1010, y: 100, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1066, y: 28, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1044, y: 195, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1075, y: 163, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1108, y: 172, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1134, y: 215, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1177, y: 289, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1204, y: 320, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1249, y: 274, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1213, y: 231, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1229, y: 61, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1294, y: 39, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1398, y: 179, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1464, y: 77, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1526, y: 250, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1547, y: 233, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
            { x: 1572, y: 269, scale: this.getRandomNumber(1, 0.1), isTwinkle: false, alpha: 1 },
        ]



        for (let i = 0; i < starsPos.length; i++) {
            this.addStar(starsPos[i].x - this.cameras.main.width / 2, starsPos[i].y - this.cameras.main.height / 3, starsPos[i].scale, starsPos[i].isTwinkle, starsPos[i].alpha, 'Chp1Sc2', this.frames[5])
        }


        let overground = this.physics.add.sprite(-89, 200, 'overgroundChp1Sc2')
        this.backgroundContainer.add(overground)

        let overground2 = this.physics.add.sprite(250, 190, 'fenceChp1Sc2')
        overground2.setScale(1.25)
        this.backgroundContainer.add(overground2)

        let lampRight = this.physics.add.sprite(900, 150, 'Chp1Sc2', this.frames[2])
        let lampLeft = this.physics.add.sprite(0, 150, 'Chp1Sc2', this.frames[2])
        this.overgroundContainer.add(lampLeft)
        this.overgroundContainer.add(lampRight)

        let car = this.physics.add.sprite(1500, 200, 'Chp1Sc2', this.frames[1])
        this.charactersContainer.add(car)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addCharacters() {
        let rightPers = this.physics.add.sprite(400, 240, 'Chp1Sc2', this.frames[3])
        this.charactersContainer.add(rightPers)

        let leftPers = this.physics.add.sprite(0, 240, 'Chp1Sc2', this.frames[4])
        this.charactersContainer.add(leftPers)


        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.charactersContainer.list[2].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.charactersContainer.list[2]);

        this.input.on('pointerdown', (pointer) => {
            this.org = pointer.x
        })

        this.input.on('dragstart', () => {
            this.playSound('steps')
        })

        this.input.on('dragend', () => {
            this.stopSound('steps')
        })

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x += (pointer.x - this.org) / 2
            this.charactersContainer.list[0].x += (pointer.x - this.org) / 2
            this.org = pointer.x
            this.addVictoryConditions(this.charactersContainer.list[2])
        });


    }

    addVictoryConditions(character) {
        if (character.x < -650) {
            this.close()
        }
    }

    close() {
        this.tweens.add({
            targets: this.charactersContainer.list[2],
            alpha: { value: 0, duration: 500, ease: 'Power1' },
            onComplete: () => {
                this.playSound('car')
                this.playSound('siren', 0.85, false, 100)
                this.tweens.add({
                    targets: this.charactersContainer.list[0],
                    x: { value: this.charactersContainer.list[1].x + this.charactersContainer.list[1].width / 2, duration: 2000, ease: 'Power1' },
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.charactersContainer.list[1],
                            alpha: { value: 0, duration: 500, ease: 'Power1' },
                            onComplete: () => {
                                this.tweens.add({
                                    targets: this.charactersContainer.list[0],
                                    x: { value: -1800, duration: 5000, ease: 'Power1' },
                                    onComplete: () => {
                                        this.scene.transition({
                                            target: 'TransitionScene',
                                            duration: 0,
                                            data: {
                                                text: this.feedbackText.Chapter1Scene2[this.language],
                                                nextScene: 'Chapter1Scene3',
                                                title: this.titlesText.TitleChapter1[this.language]
                                            }
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })


    }

    update() {

    }

    addTree(x, y, flip) {
        let tree = this.physics.add.sprite(x, y, 'Chp1Sc2', this.frames[0])
        tree.flipX = flip
        this.backgroundContainer.add(tree)
    }



}