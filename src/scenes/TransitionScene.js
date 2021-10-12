const path = '../src/assets/UiScene/'
const soundsPath = 'sounds/'

import { BaseScene } from './Common/BaseScene'
import WebFontFile from './Common/WebFontFile'

export class TransitionScene extends BaseScene {


    constructor() {
        super('TransitionScene')
    }

    init(data) {
        this.content = data.text || "..."
        this.nextScene = data.nextScene
        this.textFontSize = data.textFontSize || 50
        this.textYoffset = data.textYoffset || 0
        this.title = data.title || ""
        this.titlePos = data.titlePos || { x: 0, y: -200 }

        let allSounds = this.sound.getAll()
        for (let i = 0; i < allSounds.length; i++) {
            if (allSounds[i].key != 'musicTrackLight') {
                allSounds[i].stop()
            }
        }
    }

    preload() {
        this.load.image('bkTexture', path + 'Texture.png');
        this.load.image('line', path + 'Ligne copie 3.png');
        this.load.image('uiBtn', path + 'Bouton.png');
        this.load.addFile(new WebFontFile(this.load, 'Abel'))
        this.load.audio('introSound', [path + soundsPath + 'gen_transition_feedback.mp3'])
        this.load.audio('btnSound', [path + soundsPath + 'gen_button_click.mp3'])
    }

    create() {
        this.textStyleTitle = {
            "fontFamily": "Abel",
            "fontSize": 150,
            "letterSpacing": 10,
            "lineHeight": 1,
            "lineJoin": "round",
            "miterLimit": 1,
            "padding": 1,
            "strokeThickness": 3,
            "leading": 1,
        }

        this.textStyle = {
            "fontFamily": "Abel",
            "fontSize": this.textFontSize,
            "letterSpacing": 10,
            "lineHeight": 1,
            "lineJoin": "round",
            "miterLimit": 1,
            "padding": 1,
            "strokeThickness": 1,
            "leading": 1,
        }

        this.textStyleUI = {
            "fontFamily": "Abel",
            "fontSize": 40,
            "letterSpacing": 10,
            "lineHeight": 1,
            "lineJoin": "round",
            "miterLimit": 1,
            "padding": 1,
            "strokeThickness": 3,
            "leading": 1,
            "fill": "black",
            "stroke": "black"
        }

        this.playSound('introSound')

        this.mainContainer = this.add.container()
        this.addBackground()
        this.addTitle()
        this.addText()
        this.addButtons()

        this.updatePosition()

        if (!this.debug) {
            this.changeVolume('musicTrackLight', 0, 0)

            this.time.delayedCall(5000, () => {
                this.changeVolume('musicTrackLight', 1, 10000)
            })
        }

    }

    update() {

    }

    addBackground() {
        this.lights.enable();
        this.lights.setAmbientColor(0x808080);
        let bk = this.physics.add.sprite(0, 0, 'bkTexture').setAlpha(0.25).setPipeline('Light2D').setAlpha(0.5);
        bk.setScale(1.1)
        let spotlight = this.lights.addLight(960, 500, 1600).setIntensity(4);
        this.mainContainer.add(bk)


        let line1 = this.physics.add.sprite(-100, -100, 'line')
        this.mainContainer.add(line1)

        let line2 = this.physics.add.sprite(100, -100, 'line')
        line2.flipX = true
        this.mainContainer.add(line2)
    }

    addButtons() {
        let graphics = this.add.graphics()
        graphics.fillRoundedRect(-150, -37.5 + this.text.y + this.text.height + 150, 300, 75, 30);
        graphics.fillStyle(0xffffff, 1);
        this.mainContainer.add(graphics)

        let btnText = this.add.text(0, this.text.y + this.text.height + 150, 'continuer', this.textStyleUI);
        btnText.setOrigin(0.5)
        this.mainContainer.add(btnText)
        btnText.setInteractive({ cursor: 'pointer' })
        btnText.on('pointerdown', (target) => {
            this.playSound('btnSound')
            this.time.delayedCall(100, () => {
                this.scene.start(this.nextScene);
            })
        })

        let uiBtn = this.physics.add.sprite(850, -425, 'uiBtn')
        uiBtn.setOrigin(0.5)
        this.mainContainer.add(uiBtn)

        uiBtn.setInteractive({ cursor: 'pointer' });
        uiBtn.on('pointerdown', () => {

        })
    }

    addTitle() {
        this.bigText = this.add.text(this.titlePos.x, this.titlePos.y, this.title, this.textStyleTitle)
        this.bigText.setOrigin(0.5)
        this.mainContainer.add(this.bigText)
    }

    addText() {
        this.text = this.add.text(0, 0, this.content, this.textStyle);
        this.text.y += this.text.height / 2
        this.text.setOrigin(0.5)
        this.mainContainer.add(this.text)
    }
}