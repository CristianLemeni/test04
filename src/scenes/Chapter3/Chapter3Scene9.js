import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene9/'
const animPath = 'anims/'
const pathOld = '../src/assets/Chapter1/scene1/'

export class Chapter3Scene9 extends BaseScene {

    constructor() {
        super('Chapter3Scene9')
    }

    preload() {
        super.preload()
        this.load.atlas('Chp1Sc1', pathOld + 'scene1.png', pathOld + 'scene1.json');
        this.load.image('bkChp3Sc9', path + 'background.png');
        this.load.image('moonChp3Sc9', path + 'moon.png');
        this.load.spine('boatAnimChp3Sc9', path + animPath + 'ch3p9-boat-fixed.json', [path + animPath + 'ch3p9-boat-fixed.atlas'], true);
        this.load.spine('migrant1Chp3Sc9', path + animPath + 'ch3p9-migrant1-fixed.json', [path + animPath + 'ch3p9-migrant1-fixed.atlas'], true);
        this.load.spine('migrant2Chp3Sc9', path + animPath + 'ch3p9-migrant2-fixed.json', [path + animPath + 'ch3p9-migrant2-fixed.atlas'], true);
        this.load.spine('migrant3Chp3Sc9', path + animPath + 'ch3p9-migrant3-fixed.json', [path + animPath + 'ch3p9-migrant3-fixed.atlas'], true);
        this.load.spine('smugglerChp3Sc9', path + animPath + 'ch3p9-smuggler-fixed.json', [path + animPath + 'ch3p9-smuggler-fixed.atlas'], true);
    }

    create() {
        super.create()

        this.atlasTexture = this.textures.get('Chp1Sc1');
        this.frames = this.atlasTexture.getFrameNames();

        this.characters = []

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()

        this.addUI([this.uiText.Chapter3Scene9[this.language]], 50, 1.1, 0.85)

        this.addInput()
        this.addVictoryConditions()
    }

    update() {
        super.update()
    }

    addBackground() {
        let bk = this.physics.add.sprite(50, -10, 'bkChp3Sc9')
        bk.setScale(1.1)
        this.backgroundContainer.add(bk)

        let moon = this.physics.add.sprite(-800, -350, 'moonChp3Sc9')
        this.backgroundContainer.add(moon)

        let starsPos = [
            { x: 50, y: -400, scale: 1, isTwinkle: false, alpha: 1 },
            { x: -175, y: -200, scale: 1, isTwinkle: false, alpha: 1 },
            { x: -150, y: -220, scale: 0.5, isTwinkle: false, alpha: 1 },
            { x: -115, y: -180, scale: 0.8, isTwinkle: false, alpha: 1 },
            { x: -170, y: -385, scale: 1, isTwinkle: false, alpha: 1 },
            { x: -250, y: -285, scale: 0.6, isTwinkle: false, alpha: 1 },
            { x: -525, y: -100, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -500, y: -75, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -450, y: -120, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -490, y: -160, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -570, y: -190, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -585, y: -275, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -650, y: -250, scale: 0.75, isTwinkle: false, alpha: 1 },
            { x: -800, y: -100, scale: 0.75, isTwinkle: false, alpha: 1 }
        ]

        for (let i = 0; i < starsPos.length; i++) {
            let s = this.addStar(starsPos[i].x, starsPos[i].y, starsPos[i].scale, starsPos[i].isTwinkle, starsPos[i].alpha, 'Chp1Sc1', this.frames[9])
            s.setTint(0xFDFBB4)
        }


        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {
        this.persG = this.physics.add.group()

        let pers1 = this.add.container()
        let p1 = this.addSpine(-600, 390, 'migrant1Chp3Sc9', pers1)
        this.characters.push(pers1)
        this.backgroundContainer.add(pers1)
        this.persG.add(p1)

        let pers2 = this.add.container()
        let p2 = this.addSpine(-500, 390, 'migrant2Chp3Sc9', pers2)
        this.characters.push(pers2)
        this.backgroundContainer.add(pers2)
        this.persG.add(p2)

        let pers3 = this.add.container()
        let p3 = this.addSpine(-350, 390, 'migrant3Chp3Sc9', pers3)
        this.characters.push(pers3)
        this.backgroundContainer.add(pers3)
        this.persG.add(p3)

        let pers4 = this.add.container()
        this.addSpine(100, 390, 'smugglerChp3Sc9', pers4)
        this.backgroundContainer.add(pers4)

        this.boat = this.physics.add.group()
        this.boat.add(this.addSpine(700, 400, 'boatAnimChp3Sc9', this.charactersContainer))
        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {

        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].list[0].setInteractive({ cursor: 'pointer' });
            this.input.setDraggable(this.characters[i].list[0]);
        }

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            this.currentObj = gameObject
        });
    }

    addVictoryConditions() {
        this.physics.add.overlap(this.boat, this.persG, () => {
            this.currentObj.disableInteractive()
            this.persG.remove(this.currentObj)
            this.tweens.add({
                targets: this.currentObj,
                x: { value: 450, duration: 1000 },
                alpha: { value: 0, duration: 2000 },
            })
            if (this.persG.getChildren().length == 0) {
                this.time.delayedCall(1000, () => {
                    this.startBoat()
                })
            }
        });
    }

    startBoat() {
        this.tweens.add({
            targets: this.boat.getChildren()[0],
            x: { value: 1500, duration: 5000 },
            onComplete: () => {
                this.scene.transition({
                    target: 'TransitionScene',
                    duration: 0,
                    data: {
                        text: this.feedbackText.Chapter3Scene9[this.language],
                        nextScene: 'Chapter3Scene10',
                        title: this.titlesText.TitleChapter3[this.language]
                    }
                });
            }
        })
    }



}