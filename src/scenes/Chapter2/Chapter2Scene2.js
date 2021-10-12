import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter2/scene2/'
const animPath = 'anims/'

export class Chapter2Scene2 extends BaseScene {

    constructor() {
        super('Chapter2Scene2')
    }

    preload() {
        super.preload()
        this.load.image('bkChp2Sc2', path + 'bg.png');
        this.load.image('ruinedCityChp2Sc2', path + 'city-background.png');
        this.load.atlas('Chp2Sc2', path + 'scene2.png', path + 'scene2.json');
        this.load.spine('persChp2Sc2', path + animPath + 'ch2p2-character-fixed.json', [path + animPath + 'ch2p2-character-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp2Sc2');
        this.frames = this.atlasTexture.getFrameNames();

        this.createContainers()

        this.addBackground()
        this.addOverground()

        this.children.bringToTop(this.charactersContainer);
        this.addInput()


        this.updatePosition()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter2Scene2[this.language], 50, 1.1, 0.85)

    }

    update() {

    }

    addBackground() {
        this.addBkSlide()

        this.mainContainer.add(this.backgroundContainer)
    }

    addOverground() {

        let rubble = this.physics.add.sprite(-550, 275, 'Chp2Sc2', this.frames[6])
        this.overgroundContainer.add(rubble)

        let body1 = this.physics.add.sprite(-1275, 275, 'Chp2Sc2', this.frames[11])
        this.backgroundContainer.add(body1)

        let body2 = this.physics.add.sprite(-1275, 275, 'Chp2Sc2', this.frames[5])
        this.backgroundContainer.add(body2)

        let body3 = this.physics.add.sprite(-1275, 275, 'Chp2Sc2', this.frames[12])
        this.backgroundContainer.add(body3)

        let body4 = this.physics.add.sprite(-1275, 275, 'Chp2Sc2', this.frames[10])
        this.backgroundContainer.add(body4)

        this.addSpine(600, 400, 'persChp2Sc2', this.overgroundContainer)

        let tank = this.add.sprite(-1000, 250, 'Chp2Sc2', this.frames[7])
        this.overgroundContainer.add(tank)

        this.mainContainer.add(this.overgroundContainer)
    }

    addInput() {
        this.backgroundContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.backgroundContainer.list[0]);
        this.backgroundContainer.list[1].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.backgroundContainer.list[1]);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            let startX = gameObject.x
            if (dragX > gameObject.x && this.backgroundContainer.list[0].x < 900) {
                gameObject.x = dragX

                for (let i = 0; i < this.backgroundContainer.list.length; i++) {
                    this.backgroundContainer.list[i].x += gameObject.x - startX
                }
            }
            else if (this.backgroundContainer.list[0].x >= 850) {
                this.events.emit("startTank")
            }

        });
    }

    addVictoryConditions() {
        this.events.on("startTank", () => {
            this.tweens.add({
                targets: this.overgroundContainer.list[this.overgroundContainer.list.length - 1],
                x: { value: -600, duration: 2000, ease: Phaser.Math.Easing.Quadratic.Out },
                onComplete: () => {
                    this.time.delayedCall(500, () => {
                        this.scene.transition({
                            target: 'TransitionScene',
                            duration: 0,
                            data: {
                                text: this.feedbackText.Chapter2Scene2[this.language],
                                nextScene: "Chapter2Scene3",
                                title: this.titlesText.TitleChapter2[this.language]
                            }
                        });
                    })
                }
            })
        })
    }

    addBkSlide() {
        let bk = this.physics.add.sprite(0, -185, 'bkChp2Sc2')
        bk.setScale(1.25)
        this.backgroundContainer.add(bk)
        let bk2 = this.physics.add.sprite(0, -185, 'bkChp2Sc2')
        bk2.setScale(1.25)
        bk2.x = bk.x - bk2.width
        this.backgroundContainer.add(bk2)

        let ground = this.physics.add.sprite(0, 325, 'Chp2Sc2', this.frames[3])
        this.backgroundContainer.add(ground)
        let ground2 = this.physics.add.sprite(0, 325, 'Chp2Sc2', this.frames[3])
        ground2.x = ground.x - ground2.width
        this.backgroundContainer.add(ground2)

        let dustCloud1 = this.physics.add.sprite(0, -50, 'Chp2Sc2', this.frames[0])
        this.backgroundContainer.add(dustCloud1)
        let dustCloud1_2 = this.physics.add.sprite(0, -50, 'Chp2Sc2', this.frames[0])
        dustCloud1_2.x = dustCloud1.x - dustCloud1_2.width
        this.backgroundContainer.add(dustCloud1_2)

        let dustCloud2 = this.physics.add.sprite(0, -100, 'Chp2Sc2', this.frames[1])
        this.backgroundContainer.add(dustCloud2)
        let dustCloud2_2 = this.physics.add.sprite(0, -100, 'Chp2Sc2', this.frames[1])
        dustCloud2_2.x = dustCloud2.x - dustCloud2_2.width
        this.backgroundContainer.add(dustCloud2_2)

        let cloud = this.physics.add.sprite(-450, -450, 'Chp2Sc2', this.frames[8])
        this.backgroundContainer.add(cloud)
        let cloud2 = this.physics.add.sprite(-450, -450, 'Chp2Sc2', this.frames[8])
        cloud2.x = cloud.x - 1500
        this.backgroundContainer.add(cloud2)

        let ruinedCity = this.physics.add.sprite(0, 0, 'ruinedCityChp2Sc2')
        this.backgroundContainer.add(ruinedCity)
        let ruinedCity_2 = this.physics.add.sprite(0, 0, 'ruinedCityChp2Sc2')
        ruinedCity_2.x = ruinedCity.x - ruinedCity_2.width
        this.backgroundContainer.add(ruinedCity_2)

        let ruinedCity2 = this.physics.add.sprite(-550, 85, 'Chp2Sc2', this.frames[2])
        this.backgroundContainer.add(ruinedCity2)
        let ruinedCity2_2 = this.physics.add.sprite(-550, 85, 'Chp2Sc2', this.frames[2])
        ruinedCity2_2.x = ruinedCity2.x - ruinedCity2_2.width
        this.backgroundContainer.add(ruinedCity2_2)

        let ruinedCityBuilding = this.physics.add.sprite(1500, 85, 'Chp2Sc2', this.frames[9])
        this.backgroundContainer.add(ruinedCityBuilding)
        let ruinedCityBuilding_2 = this.physics.add.sprite(1500, 85, 'Chp2Sc2', this.frames[9])
        ruinedCityBuilding_2.x = ruinedCityBuilding.x - ruinedCityBuilding_2.width
        this.backgroundContainer.add(ruinedCityBuilding_2)

        let ruinedCityBuilding2 = this.physics.add.sprite(1000, 105, 'Chp2Sc2', this.frames[4])
        this.backgroundContainer.add(ruinedCityBuilding2)
        let ruinedCityBuilding2_2 = this.physics.add.sprite(1000, 105, 'Chp2Sc2', this.frames[4])
        ruinedCityBuilding2_2.x = ruinedCityBuilding2.x - ruinedCityBuilding2_2.width
        this.backgroundContainer.add(ruinedCityBuilding2_2)
    }

}