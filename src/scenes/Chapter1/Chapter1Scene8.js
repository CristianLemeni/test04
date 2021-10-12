import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene8/'
const animPath = 'anims/'
const soundsPath = 'sounds/'


export class Chapter1Scene8 extends BaseScene {


    constructor() {
        super('Chapter1Scene8')
    }

    preload() {
        super.preload()
        this.load.image('bk1Chp1Sc8', path + 'Fond (3).png');
        this.load.image('bk2Chp1Sc8', path + 'av-plan.png');
        this.load.atlas('Chp1Sc8', path + 'scene8.png', path + 'scene8.json');
        this.load.spine('pers1Chp1Sc8', path + animPath + 'ch1p8-character-desk-fixed.json', [path + animPath + 'ch1p8-character-desk-fixed.atlas'], true);
        this.load.spine('pers2Chp1Sc8', path + animPath + 'ch1p8-npc1-fixed.json', [path + animPath + 'ch1p8-npc1-fixed.atlas'], true);
        this.load.spine('pers3Chp1Sc8', path + animPath + 'ch1p8-npc2-fixed.json', [path + animPath + 'ch1p8-npc2-fixed.atlas'], true);
        this.load.spine('pers4Chp1Sc8', path + animPath + 'ch1p8-npc3.json', [path + animPath + 'ch1p8-npc3.atlas'], true);
        this.load.image('maskChp1Sc8', path + 'mask.png');
        this.load.audio('ambienceChp1Sc8', [path + soundsPath + 'ch1_sc08_amb_officedesetrangers.mp3'])
    }

    create() {
        super.create()

        this.playSound('ambienceChp1Sc8', 1.5, true)

        this.atlasTexture = this.textures.get('Chp1Sc8');
        this.frames = this.atlasTexture.getFrameNames();

        this.buildingTextStyle = {
            "dropShadow": true,
            "dropShadowAngle": 1.1,
            "dropShadowBlur": 5,
            "dropShadowDistance": 3,
            "fill": "white",
            "fontFamily": "Helvetica",
            "fontSize": 50,
            "letterSpacing": 1,
            "lineHeight": 1,
            "lineJoin": "round",
            "miterLimit": 1,
            "padding": 1,
            "strokeThickness": 5,
            "trim": true,
            "leading": 1
        }

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.addUI(this.uiText.Chapter1Scene8[this.language], 50, 1.1)

        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.borderX = 0

        this.updatePosition()
    }

    update() {

    }

    addBackground() {
        let bk1 = this.physics.add.sprite(0, 50, 'bk1Chp1Sc8')
        bk1.setScale(1.1)
        this.backgroundContainer.add(bk1)

        let shape = this.add.image(885, 398, 'maskChp1Sc8').setVisible(false);
        let mask = shape.createBitmapMask();

        let persAnim1 = this.add.spine(-100, 75, 'pers1Chp1Sc8');
        let anims1 = persAnim1.getAnimationList();
        persAnim1.play(anims1[0], true);
        this.overgroundContainer.add(persAnim1)
        this.borderX = persAnim1.x

        let computer = this.physics.add.sprite(-190, -100, 'Chp1Sc8', this.frames[2])
        this.overgroundContainer.add(computer)

        this.overgroundContainer.setMask(mask)

        let bk2 = this.physics.add.sprite(-50, 0, 'bk2Chp1Sc8')
        bk2.setScale(1.1)
        this.backgroundContainer.add(bk2)

        let barrier = this.physics.add.sprite(0, 450, 'Chp1Sc8', this.frames[1])
        this.backgroundContainer.add(barrier)

        this.buildingTextContent = [
            "CENTRE D'ACCUEIL"
        ];

        let buildingLabel = this.add.text(-275, -525, this.buildingTextContent, this.buildingTextStyle);
        buildingLabel.setColor('#fbeec2')
        buildingLabel.setStroke('#fbeec2', 5)
        this.backgroundContainer.add(buildingLabel)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)
    }

    addCharacters() {
        this.addSpine(7200, 650, 'pers2Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(7200, 650, 'pers2Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(8100, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(8100, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(8100, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(8100, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(6300, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(6300, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(5400, 550, 'pers4Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(5400, 550, 'pers4Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(4500, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(4500, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(3600, 500, 'pers4Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(3600, 500, 'pers4Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(2700, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(2700, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)
       
        this.addSpine(1800, 500, 'pers4Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(1800, 500, 'pers4Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(900, 500, 'pers3Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(900, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(0, 500, 'pers4Chp1Sc8', this.charactersContainer, 0)
        this.addSpine(0, 500, 'pers4Chp1Sc8', this.charactersContainer, 1, 1)

        this.addSpine(-900, 500, 'pers3Chp1Sc8', this.charactersContainer, 1)
        this.addSpine(-900, 500, 'pers3Chp1Sc8', this.charactersContainer, 1, 1)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        let lastId = 21
        for (let i = 0; i < this.charactersContainer.list.length; i++) {
            this.charactersContainer.list[i].setInteractive({ cursor: 'pointer' });
            this.input.setDraggable(this.charactersContainer.list[i]);

            this.charactersContainer.list[i].on('drag', (pointer, dragX, dragY) => {
                if (this.charactersContainer.list[0].x > dragX) {
                    let x = this.charactersContainer.list[i].x.valueOf();
                    this.charactersContainer.list[i].x = dragX
                    for (let j = 0; j < this.charactersContainer.list.length; j++) {
                        if (i != j) {
                            this.charactersContainer.list[j].x += dragX - x
                        }
                    }
                }
                if (this.charactersContainer.list[lastId - 1].x < 0) {
                    this.tweens.add({
                        targets: this.charactersContainer.list[lastId - 1],
                        alpha: { value: 1, duration: 1000 },
                    })
                    lastId -= 2
                }
                if (this.charactersContainer.list[0].x < this.borderX) {
                    this.tweens.add({
                        targets: this.charactersContainer.list[0],
                        alpha: { value: 1, duration: 1000 },
                        onComplete: () => {
                            this.time.delayedCall(1000, () => {
                                this.scene.transition({
                                    target: 'TransitionScene',
                                    duration: 0,
                                    data: {
                                        text: this.feedbackText.Chapter1Scene8[this.language],
                                        nextScene: "Chapter1Scene9",
                                        title: this.titlesText.TitleChapter1[this.language]
                                    }
                                });
                            })
                        }
                    })
                }
            });
        }
    }
}