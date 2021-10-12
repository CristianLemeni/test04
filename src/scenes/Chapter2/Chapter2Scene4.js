import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene4/'
const animPath = 'anims/'

export class Chapter2Scene4 extends BaseScene {

    constructor() {
        super('Chapter2Scene4')
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Sc4', path + 'fond.png');
        this.load.atlas('Chp2Sc4', path + 'scene4.png', path + 'scene4.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp2Sc4');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene4[this.language], 50, 1.1, 0.85)

    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, -85, 'bkChp2Sc4')
        bk.setScale(1.15)
        this.backgroundContainer.add(bk)

        let page = this.physics.add.sprite(-1550, 400, 'Chp2Sc4', this.frames[0])
        this.backgroundContainer.add(page)

        let book = this.physics.add.sprite(1100, -100, 'Chp2Sc4', this.frames[2])
        this.backgroundContainer.add(book)

        let sac = this.physics.add.sprite(-800, -650, 'Chp2Sc4', this.frames[1])
        sac.setRotation(-0.05)
        this.backgroundContainer.add(sac)

        this.cashContainer = this.add.container()
        this.cashContainer.y = 50
        let cash1 = this.physics.add.sprite(-50, -50, 'Chp2Sc4', this.frames[5])
        this.cashContainer.add(cash1)
        let cash2 = this.physics.add.sprite(-5, -134, 'Chp2Sc4', this.frames[6])
        this.cashContainer.add(cash2)
        let cash3 = this.physics.add.sprite(-50, -175, 'Chp2Sc4', this.frames[5])
        this.cashContainer.add(cash3)
        let cash4 = this.physics.add.sprite(-5, -258, 'Chp2Sc4', this.frames[6])
        this.cashContainer.add(cash4)
        let cash5 = this.physics.add.sprite(-50, -298, 'Chp2Sc4', this.frames[5])
        this.cashContainer.add(cash5)
        this.backgroundContainer.add(this.cashContainer)

        let coinPos = [
            { x: -700, y: 300, scale: 1 },
            { x: 600, y: 200, scale: 1 },
            { x: 300, y: 100, scale: 0.8 },
        ]

        this.coins = []

        for (let i = 0; i < coinPos.length; i++) {
            let coin = this.physics.add.sprite(coinPos[i].x, coinPos[i].y, 'Chp2Sc4', this.frames[3])
            coin.setScale(coinPos[i].scale)
            this.backgroundContainer.add(coin)
            this.coins.push(coin)
        }

        let coin2 = this.physics.add.sprite(675, -325, 'Chp2Sc4', this.frames[4])
        this.backgroundContainer.add(coin2)
        this.coins.push(coin2)

        this.mainContainer.add(this.backgroundContainer)
    }

    addCharacters() {

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.activeLayer = this.cashContainer.list.length - 1
        this.coinCount = 0
        this.pageCount = 0
        for (let i = 0; i < this.cashContainer.list.length; i++) {
            this.cashContainer.list[i].setInteractive({ cursor: 'pointer' });
            this.cashContainer.list[i].on('pointerdown', (pointer) => {
                this.events.emit("itemClicked")
                this.tweens.add({
                    targets: this.cashContainer.list[this.activeLayer],
                    alpha: { value: 0, duration: 500 }
                })
                this.activeLayer--
                this.pageCount++
            })
        }

        for (let i = 0; i < this.coins.length; i++) {
            this.coins[i].setInteractive({ cursor: 'pointer' });
            this.coins[i].on('pointerdown', (pointer) => {
                this.events.emit("itemClicked")
                this.tweens.add({
                    targets: this.coins[i],
                    alpha: { value: 0, duration: 500 },
                })
                this.coins[i].disableInteractive()
                this.coinCount++
            })
        }
    }

    addVictoryConditions() {
        this.events.on("noMoreMoney", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter2Scene4[this.language],
                    nextScene: "Chapter2Scene5",
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })

        this.events.on("itemClicked", () => {
            if (this.pageCount >= 4 && this.coinCount >= 3) {
                this.events.emit('noMoreMoney');
            }
        })
    }


}