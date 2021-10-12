import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene7/'
const animPath = 'anims/'
const soundsPath = 'sounds/'

export class FallingPapersBase extends BaseScene {


    constructor(config, pagePos) {
        super(config)
        this.pagePos = pagePos
    }



    preload() {
        super.preload()
        this.load.image('bk1Chp1Sc7', path + 'fond (2).png');
        this.load.image('bk2Chp1Sc7', path + 'ville (2).png');
        this.load.spine('persChp1Sc7', path + animPath + 'ch1p7-character-fixed.json', [path + animPath + 'ch1p7-character-fixed.atlas'], true);
        this.load.spritesheet('paper1Chp1Sc7', path + animPath + 'paper_sheet1.png', {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.spritesheet('paper2Chp1Sc7', path + animPath + 'paper_sheet2.png', {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.spritesheet('paper3Chp1Sc7', path + animPath + 'paper_sheet3.png', {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.atlas('Chp1Sc7', path + 'scene7.png', path + 'scene7.json');
        this.load.audio('paperFall', [path + soundsPath + 'ch1_sc07_papiers_tombants.mp3'])
        this.load.audio('paperCollect', [path + soundsPath + 'ch1_sc07_papiers_attrape.mp3'])
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('Chp1Sc7');
        this.frames = this.atlasTexture.getFrameNames();

        this.playSound('paperFall', 1, true)

        this.pageGroup = this.physics.add.group();

        this.first = {
            one: true,
            second: true,
            three: true
        }

        this.createContainers()

        this.addBackground()
        this.addCharacters()

        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.updatePosition()
        this.collectedPapers = 0
        this.selectedPage
        this.pointerOverPers = false
        this.addVictoryConditions()

        this.events.on('shutdown', () => clearInterval(this.pageInterval))
        this.events.on('pause', () => clearInterval(this.pageInterval))
        this.events.on('resume', () => this.pageInterval = this.setSpawnInterval())

    }

    update() {

    }

    addBackground() {
        let bk1 = this.physics.add.sprite(0, -250, 'bk1Chp1Sc7')
        bk1.setScale(1.2)
        this.backgroundContainer.add(bk1)

        let bk2 = this.physics.add.sprite(900, 100, 'bk2Chp1Sc7')
        this.backgroundContainer.add(bk2)

        let building = this.physics.add.sprite(-475, 0, 'Chp1Sc7', this.frames[3])
        this.overgroundContainer.add(building)

        this.hitTest = new Phaser.Geom.Polygon([
            1519.1649269311065, 272.5678496868476,
            1507.1398747390397, 340.7098121085595,
            1489.1022964509393, 426.8893528183716,
            1471.0647181628392, 511.06471816283926,
            1443.0062630480168, 577.2025052192066,
            1402.9227557411273, 637.3277661795407,
            1394.9060542797495, 791.6492693110647,
            1418.9561586638831, 909.8956158663883,
            1683.5073068893528, 927.9331941544885,
            1711.5657620041754, 811.6910229645093,
            1727.599164926931, 679.4154488517745,
            1719.5824634655532, 521.0855949895616,
            1683.5073068893528, 400.8350730688935,
            1707.5574112734864, 316.65970772442586,
            1683.5073068893528, 246.5135699373695,
            1573.277661795407, 240.50104384133613,
            1505.1356993736952, 278.580375782881,
            1489.1022964509393, 328.6847599164927,
        ]);

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addCharacters() {
        this.persGroup = this.physics.add.group();

        this.page1 = this.add.sprite(this.pagePos.x, this.pagePos.y, 'Chp1Sc7', this.frames[2])
        this.page1.setAlpha(0)
        this.charactersContainer.add(this.page1)
        this.page2 = this.add.sprite(this.pagePos.x, this.pagePos.y + 5, 'Chp1Sc7', this.frames[2])
        this.page2.setAlpha(0)
        this.charactersContainer.add(this.page2)
        this.page3 = this.add.sprite(this.pagePos.x, this.pagePos.y + 5, 'Chp1Sc7', this.frames[2])
        this.page3.setAlpha(0)
        this.charactersContainer.add(this.page3)

        this.mainContainer.add(this.charactersContainer)
    }

    addPage(animName, textureName, onScreen) {
        let fall1 = {
            key: animName,
            frames: this.anims.generateFrameNumbers(textureName),
            frameRate: 10,
            repeat: -1
        };
        this.anims.create(fall1);

        let fallPaper
        if (onScreen) {
            fallPaper = this.add.sprite(this.getRandomInt(-900, 300), this.getRandomInt(300, -800), textureName)
        } else {
            fallPaper = this.add.sprite(this.getRandomInt(-900, 300), this.getRandomInt(-600, -2000), textureName)
        }
        this.time.delayedCall(this.getRandomInt(1000, 0), () => {
            fallPaper.play(animName);
        })
        fallPaper.setScale(this.getRandomNumber(1.25, 0.5))
        fallPaper.setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(fallPaper);
        fallPaper.setRotation(this.getRandomNumber(3, 0.15))

        let container = this.add.container()
        this.physics.world.enableBody(container);
        container.add(fallPaper)
        container.body.setVelocity(this.getRandomInt(15, -15), 10 * (fallPaper.scale * 10));

        container.list[0].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(container.list[0]);

        this.pageGroup.add(fallPaper)
        this.overgroundContainer.add(container)

        fallPaper.on('pointerdown', () => {
            this.overlapTrigger = true
        })
    }

    spawnPage(id, onScreen) {
        switch (id) {
            case 0:
                this.addPage('fall1', "paper1Chp1Sc7", onScreen)
                break
            case 1:
                this.addPage('fall2', "paper2Chp1Sc7", onScreen)
                break
            case 2:
                this.addPage('fall3', "paper3Chp1Sc7", onScreen)
                break
            default:
                break
        }
    }

    addInput() {
        this.falling = true
        for (let i = 0; i < 10; i++) {
            this.spawnPage(i % 3, true)

        }
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
            this.selectedPage = gameObject

            gameObject.parentContainer.body.moves = false;
            if (Phaser.Geom.Polygon.ContainsPoint(this.hitTest, pointer)) {
                this.pointerOverPers = true
            }
            else {
                this.pointerOverPers = false
            }
        });

        this.input.on('dragend', () => {
            this.selectedPage.parentContainer.body.moves = true;
        })

        this.pageInterval = this.setSpawnInterval()
    }

    setSpawnInterval() {
        return setInterval(() => this.spawnPage(Math.floor(Math.random() * 3)), 500)
    }

    addVictoryConditions() {
        this.physics.add.overlap(this.persGroup, this.pageGroup, () => {
            if (this.overlapTrigger && this.pointerOverPers) {
                this.checkPages()
                this.overlapTrigger = false
                this.selectedPage.destroy()
            }
        });
    }

    checkPages() {
        this.collectedPapers++
        if (this.collectedPapers > 2) {
            this.time.delayedCall(500, () => {
                this.sceneTransition()
            })
        } else {
            if (this.page1.alpha == 0) {
                this.playSound('paperCollect')
                this.tweens.add({
                    targets: this.charactersContainer.list[4],
                    alpha: { value: 1, duration: 500 }
                })
                this.tweens.add({
                    targets: this.page1,
                    alpha: { value: 1, duration: 1000 },
                    delay: 500
                })
            } else if (this.page2.alpha == 0) {
                this.playSound('paperCollect')
                this.tweens.add({
                    targets: this.page2,
                    alpha: { value: 1, duration: 1000 }
                })
            } else if (this.page3.alpha == 0) {
                this.playSound('paperCollect')
                this.tweens.add({
                    targets: this.page3,
                    alpha: { value: 1, duration: 1000 }
                })
            }
        }
    }

    sceneTransition() {

    }
}