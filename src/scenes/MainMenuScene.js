import { BaseScene } from './Common/BaseScene'

const path = 'src/assets/Menu/'
const soundsPath = 'sounds/'

export class MainMenuScene extends BaseScene {


    constructor() {
        super('MainMenuScene')
    }

    preload() {
        super.preload()
        this.load.image('MainMenuBk', path + 'MainMenuBk.png');
        this.load.atlas('MaineMenu', path + 'mainMenu.png', path + 'mainMenu.json');
        this.load.audio('musicTrackLight', [path + soundsPath + 'mus_lighttrack.mp3'])
    }

    create() {
        this.atlasTexture = this.textures.get('MaineMenu');
        this.frames = this.atlasTexture.getFrameNames();
        if (this.debug) {
            this.debugMode()
        }
        else{
            this.createContainers()
            this.addBackground()
            this.addChapterBubbles()
            this.addInput()
            this.updatePosition()
            this.addUI(["Appuyez sur l'une des personnes pour connaître son histoire"], 50, 1.1)
            let sound = this.addSound('musicTrackLight')
            sound.setLoop(true);
            sound.play({volume: 1})
        }
      
    }

    update() {

    }

    debugMode() {
        let x = 0
        let y = 0
        this.add.text(x, y, "Chapter 1")
        for (let i = 1; i < 11; i++) {
            y += 50
            let btnText = this.add.text(x, y, 'Scene' + i);
            btnText.setInteractive({ cursor: 'pointer' })
            btnText.on('pointerdown', (target) => {
                this.scene.start('Chapter1Scene' + i);
            })
        }

        y = 0
        x += 200
        this.add.text(x, y, "Chapter 2")
        for (let i = 1; i < 12; i++) {
            y += 50
            let btnText = this.add.text(x, y, 'Scene' + i);
            btnText.setInteractive({ cursor: 'pointer' })
            btnText.on('pointerdown', (target) => {
                this.scene.start('Chapter2Scene' + i);
            })
        }

        y = 0
        x += 200
        this.add.text(x, y, "Chapter 3")
        for (let i = 1; i < 13; i++) {
            y += 50
            let btnText = this.add.text(x, y, 'Scene' + i);
            btnText.setInteractive({ cursor: 'pointer' })
            btnText.on('pointerdown', (target) => {
                this.scene.start('Chapter3Scene' + i);
            })
        }
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, -25, 'MainMenuBk')
        this.backgroundContainer.add(bk)

        let pers1 = this.physics.add.sprite(0, 75, 'MaineMenu', this.frames[0])
        this.backgroundContainer.add(pers1)

        let pers2 = this.physics.add.sprite(0, 75, 'MaineMenu', this.frames[3])
        this.backgroundContainer.add(pers2)

        let pers3 = this.physics.add.sprite(0, 75, 'MaineMenu', this.frames[2])
        this.backgroundContainer.add(pers3)

        let pers4 = this.physics.add.sprite(0, 75, 'MaineMenu', this.frames[1])
        this.backgroundContainer.add(pers4)

        let emptyChair = this.physics.add.sprite(0, 75, 'MaineMenu', this.frames[4])
        this.backgroundContainer.add(emptyChair)

        this.mainContainer.add(this.backgroundContainer)
    }

    addChapterBubbles() {
        let bubble1 = this.physics.add.sprite(25, -300, 'MaineMenu', this.frames[6])
        this.overgroundContainer.add(bubble1)

        let bubble2 = this.physics.add.sprite(25, -300, 'MaineMenu', this.frames[8])
        this.overgroundContainer.add(bubble2)

        let bubble3 = this.physics.add.sprite(25, -300, 'MaineMenu', this.frames[7])
        this.overgroundContainer.add(bubble3)

        let bubble4 = this.physics.add.sprite(25, -300, 'MaineMenu', this.frames[5])
        this.overgroundContainer.add(bubble4)

        this.mainContainer.add(this.overgroundContainer)
    }

    addInput() {
        let shape1 = new Phaser.Geom.Circle(1300, 250, 150);
        let shape2 = new Phaser.Geom.Circle(350, 300, 150);
        let shape3 = new Phaser.Geom.Circle(1650, 300, 150);
        let shape4 = new Phaser.Geom.Circle(840, 200, 160);

        this.overgroundContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.overgroundContainer.list[0].on("pointerdown", (pointer) => {
            if (Phaser.Geom.Circle.ContainsPoint(shape1, pointer)) {
                this.scene.transition({
                    target: 'Chapter1Scene1',
                    duration: 0,
                });
            }
            if (Phaser.Geom.Circle.ContainsPoint(shape2, pointer)) {
                this.scene.transition({
                    target: 'Chapter2Scene1',
                    duration: 0,
                });
            }
            if (Phaser.Geom.Circle.ContainsPoint(shape3, pointer)) {
                this.scene.transition({
                    target: 'Chapter3Scene1',
                    duration: 0,
                });
            }
            if (Phaser.Geom.Circle.ContainsPoint(shape4, pointer)) {

            }
        })
    }
}