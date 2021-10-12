import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene8/'
const animPath = 'anims/'


export class Chapter2Scene8 extends BaseScene {

    constructor() {
        super('Chapter2Scene8')
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Sc8', path + 'background.png');
        this.load.atlas('Chp2Sc8', path + 'scene8.png', path + 'scene8.json');
        this.load.spine('persAnimChp2Sc8', path + animPath + 'ch2p8-character-fixed.json', [path + animPath + 'ch2p8-character-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp2Sc8');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addOverground()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene8[this.language], 50, 1.1, 0.85)

    }

    update() {

    }

    addBackground() {
        this.drawTileBK(0, 0, 'Chp2Sc8', this.frames[0], this.backgroundContainer, 24, 28, 30, 20)

        let town = this.physics.add.sprite(-100, 200, 'bkChp2Sc8')
        this.backgroundContainer.add(town)

        let cloud1 = this.physics.add.sprite(-300, -350, 'Chp2Sc8', this.frames[2])
        this.backgroundContainer.add(cloud1)
        let cloud2 = this.physics.add.sprite(800, -200, 'Chp2Sc8', this.frames[1])
        this.backgroundContainer.add(cloud2)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {
        let truck = this.physics.add.sprite(-1400, 50, 'Chp2Sc8', this.frames[3])
        this.charactersContainer.add(truck)

        this.mainContainer.add(this.charactersContainer)
    }

    addOverground() {
        this.addSpine(0, 400, 'persAnimChp2Sc8', this.overgroundContainer)

        this.mainContainer.add(this.overgroundContainer)
    }

    addInput() {
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.charactersContainer.list[0]);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (dragX > gameObject.x) {
                gameObject.x = dragX
            }
            if (gameObject.x > this.overgroundContainer.list[0].x + 250) {
                this.tweens.add({
                    targets: this.overgroundContainer.list[0],
                    alpha: { value: 0, duration: 100 }
                })
            }
            if (gameObject.x > 1200) {
                this.tweens.add({
                    targets: this.charactersContainer.list[0],
                    x: { value: 2000, duration: 1000 },
                    onComplete: () => {
                        this.events.emit("carPassed")
                    }
                })
            }
        });
    }

    addVictoryConditions() {
        this.events.on("carPassed", () => {
            this.scene.transition({
                target: 'TransitionScene', duration: 0, data: {
                    text: this.feedbackText.Chapter2Scene8[this.language],
                    nextScene: 'Chapter2Scene9',
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })
    }


}