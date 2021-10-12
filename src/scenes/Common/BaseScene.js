const pathUi = '../src/assets/UiScene/'
const path = '../src/assets/Translations/'
import WebFontFile from './WebFontFile'

export class BaseScene extends Phaser.Scene {

    constructor(config) {
        super(config)

        this.yPosOffset = 0
        const urlParams = new URLSearchParams(window.location.search);
        this.debug = (urlParams.get('debug') == 1) ? true : false
        this.language = 'fr'
    }

    preload() {
        this.load.image('bkTextureUi', pathUi + 'Texture.png');
        this.load.image('uiBtn', pathUi + 'Bouton.png');
        this.load.image('shadow', pathUi + 'ombre.png');
        this.load.image('shadowTop', pathUi + 'Calque 15 copie.png');
        this.load.addFile(new WebFontFile(this.load, 'Abel'))
        this.load.json('titlesText', path + 'titlesText.json')
        this.load.json('feedbackText', path + 'feedbackText.json')
        this.load.json('uiText', path + 'uiText.json')
    }

    create() {
        this.titlesText = this.cache.json.get('titlesText');
        this.feedbackText = this.cache.json.get('feedbackText');
        this.uiText = this.cache.json.get('uiText');
        if(!this.debug){
            this.changeVolume('musicTrackLight', 0.25, 100)
        }
    }

    update() {
    }


    updatePosition(yPosOffset = 0) {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width * 0.5;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height * 0.5;
        this.mainContainer.x = screenCenterX
        this.mainContainer.y = screenCenterY + yPosOffset
    }

    createContainers() {
        this.mainContainer = this.add.container()
        this.backgroundContainer = this.add.container()
        this.overgroundContainer = this.add.container()
        this.charactersContainer = this.add.container()

        this.physics.world.enableBody(this.backgroundContainer)
        this.physics.world.enableBody(this.charactersContainer)
        this.physics.world.enableBody(this.overgroundContainer)
    }

    addUI(uiTextContent, fontSize = 50, shadowScale = 1, shadowAlpha = 1, textOffestY = 0, addBKTexture = false) {
        if (addBKTexture) {
            let texture = this.physics.add.sprite(0, 0, 'bkTextureUi')
            texture.setAlpha(0.25)
            this.backgroundContainer.add(texture)
        }

        this.uiTextStyle = {
            fill: "white",
            fontFamily: '"Abel"',
            fontSize: fontSize,
            letterSpacing: 1,
            lineHeight: 1,
            miterLimit: 0,
            padding: 2,
            leading: 1
        }

        let shadow = this.physics.add.sprite(960, 575, 'shadow')
        shadow.setScale(shadowScale)
        shadow.setAlpha(shadowAlpha)
        let shadowTop = this.physics.add.sprite(960, 475, 'shadowTop')
        shadowTop.setScale(shadowScale)
        shadowTop.setAlpha(shadowAlpha)


        let graphics = this.add.graphics()
        graphics.fillRect(0, this.cameras.main.height - 150, this.cameras.main.width, 150);
        graphics.fillStyle(0x000000, 1);

        this.text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 150, uiTextContent, this.uiTextStyle);
        this.text.y += this.text.height + textOffestY
        this.text.setOrigin(0.5)

        if (this.debug) {
            let uiBtn = this.physics.add.sprite(this.cameras.main.width, 0, 'uiBtn')
            uiBtn.x -= uiBtn.width
            uiBtn.y += uiBtn.height
            uiBtn.setInteractive({ cursor: 'pointer' });
            uiBtn.on('pointerdown', () => {
                this.sceneIsPlaying = false
                this.scene.transition({ target: 'MainMenuScene', duration: 0 });
            })
        }


    }

    addStar(x, y, scale, isTwinkle, alpha, scene, frame, addToBk = true) {
        let star = this.physics.add.sprite(x, y, scene, frame)
        star.setAlpha(alpha)
        star.setScale(scale)
        if (isTwinkle) {
            this.tweens.add({
                targets: star,
                alpha: { value: 1, duration: 100, ease: 'Power1' },
                yoyo: true,
                loop: -1
            });
        }
        this.backgroundContainer.add(star)
        return star
    }

    getRandomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomNumber(max, min) {
        return Math.random() * (max - min) + min
    }

    drawTileBK(startX, startY, scene, frame, container, xStep, yStep, xDidive, yDivide) {
        let tileNumberW = Math.ceil(this.cameras.main.width / xDidive)
        let tileNumberH = Math.ceil(this.cameras.main.height / yDivide)

        for (let i = 0; i < tileNumberW + 10; i++) {
            startY = -350
            for (let j = 0; j < tileNumberH; j++) {
                let tileBk = this.physics.add.sprite(startX, startY, scene, frame)
                container.add(tileBk)
                startY += xStep
            }
            startX += yStep
        }
    }

    drawSliceBK(scene, frames, container, divide, y) {
        let tileNumberW = Math.ceil(this.cameras.main.width / divide)
        let startX = 0
        for (let j = 0; j < tileNumberW; j++) {
            let tileBk = this.physics.add.sprite(startX, y, scene, frames[0])
            container.add(tileBk)
            startX += 10
        }
    }

    addSpine(x, y, spineName, container, alpha = 1, animIndex = 0) {
        let spine = this.add.spine(x, y, spineName);
        let anims = spine.getAnimationList();
        spine.play(anims[animIndex], true);
        spine.setAlpha(alpha)
        container.add(spine)
        return spine
    }

    playSound(soundName, volume = 1, loop = false, fadeIn = 0) {
        let sound = this.addSound(soundName)
        sound.setLoop(loop);
        sound.play({ volume: 0 })
        if (fadeIn > 0) {
            this.changeVolume(soundName, 1, fadeIn)
        }
        else {
            this.changeVolume(soundName, volume, 0)
        }
        return sound
    }

    stopSound(soundName) {
        let sound = this.sound.get(soundName)
        sound.stop()
    }

    addSound(soundName) {
        let sound = this.sound.get(soundName)

        if (!sound) {
            sound = this.sound.add(soundName)
        }

        return sound
    }

    changeVolume(soundName, volume = 1, duration = 0) {
        let sound = this.sound.get(soundName)

        this.tweens.add({
            targets: sound,
            volume: { value: volume, duration: duration }
        })
    }

}