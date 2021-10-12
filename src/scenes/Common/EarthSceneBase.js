import { BaseScene } from "../Common/BaseScene";
const path = '../src/assets/Chapter1/scene5/'

export class EarthSceneBase extends BaseScene {


    constructor(config) {
        super(config)
    }

    preload() {
        super.preload()
        this.load.image('earthBk', path + 'Fond (1).png');
        this.load.atlas('earthScene', path + 'scene5.png', path + 'scene5.json');
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('earthScene');
        this.frames = this.atlasTexture.getFrameNames();
        this.startRotation = false
        this.audioPlaying = false
        this.sceneEnd = false
    }

    update() {
        if (this.input.activePointer.isDown) {
            Phaser.Actions.RotateAroundDistance([this.overgroundContainer], this.planet, this.rotateSpeed, 10);
            const angleDeg = Math.atan2(this.overgroundContainer.y - this.planet.y, this.overgroundContainer.x - this.planet.x) * 180 / Math.PI;
            this.overgroundContainer.angle = angleDeg
            this.events.emit('rotation')
        }
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'earthBk')
        bk.setScale(1.2)
        this.backgroundContainer.add(bk)

        let starsPos = [
            { x: 113, y: 57, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 189, y: 31, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 123, y: 91, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 47, y: 124, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 94, y: 244, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 71, y: 403, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 80, y: 511, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 94, y: 657, scale: this.getRandomNumber(0.4, 0), isTwinkle: false, alpha: 1 },
            { x: 106, y: 716, scale: this.getRandomNumber(0.75, 0), isTwinkle: false, alpha: 1 },
            { x: 74, y: 728, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 60, y: 837, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 202, y: 871, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 153, y: 745, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 183, y: 647, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 216, y: 646, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 153, y: 539, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 147, y: 452, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 145, y: 361, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 215, y: 278, scale: this.getRandomNumber(0.75, 0), isTwinkle: false, alpha: 1 },
            { x: 241, y: 149, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 284, y: 153, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 361, y: 78, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 425, y: 126, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 449, y: 61, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 429, y: 198, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 376, y: 264, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 389, y: 274, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 325, y: 321, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 252, y: 390, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 369, y: 406, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 465, y: 392, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 459, y: 508, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 471, y: 518, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 409, y: 565, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 453, y: 649, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 544, y: 641, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 328, y: 784, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 394, y: 910, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 746, y: 145, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 699, y: 60, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 1154, y: 100, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1253, y: 87, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1638, y: 64, scale: this.getRandomNumber(0.4, 0), isTwinkle: false, alpha: 1 },
            { x: 1598, y: 152, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1575, y: 168, scale: this.getRandomNumber(0.75, 0), isTwinkle: false, alpha: 1 },
            { x: 1759, y: 234, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1859, y: 203, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 1826, y: 193, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1862, y: 272, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1810, y: 330, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 1861, y: 387, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1799, y: 423, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1783, y: 416, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 1651, y: 407, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1560, y: 422, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 1736, y: 475, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1776, y: 558, scale: this.getRandomNumber(0.75, 0), isTwinkle: false, alpha: 1 },
            { x: 1874, y: 548, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1819, y: 647, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1753, y: 686, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 1853, y: 758, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1855, y: 830, scale: this.getRandomNumber(0.3, 0), isTwinkle: false, alpha: 1 },
            { x: 1815, y: 906, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1727, y: 792, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 1638, y: 801, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1578, y: 834, scale: this.getRandomNumber(0.8, 0), isTwinkle: false, alpha: 1 },
            { x: 1648, y: 818, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1683, y: 894, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1571, y: 916, scale: this.getRandomNumber(0.5, 0), isTwinkle: false, alpha: 1 },
            { x: 1489, y: 887, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
            { x: 1226, y: 907, scale: this.getRandomNumber(1, 0), isTwinkle: false, alpha: 1 },
        ]

        let circle = new Phaser.Geom.Circle(950, 475, 550)
        let circle2 = new Phaser.Geom.Circle(950, 475, 650)

        for (let i = 0; i < starsPos.length; i++) {
            let p = new Phaser.Geom.Point(starsPos[i].x ,starsPos[i].y)
            if (Phaser.Geom.Circle.ContainsPoint(circle, p)) {
                this.addStar(starsPos[i].x - this.cameras.main.width / 2, starsPos[i].y - this.cameras.main.height / 2, starsPos[i].scale, starsPos[i].isTwinkle, 0.2, 'earthScene', this.frames[4])
            }
            else if (Phaser.Geom.Circle.ContainsPoint(circle2, p)) {
                this.addStar(starsPos[i].x - this.cameras.main.width / 2, starsPos[i].y - this.cameras.main.height / 2, starsPos[i].scale, starsPos[i].isTwinkle, 0.75, 'earthScene', this.frames[4])
            }
            else{
                this.addStar(starsPos[i].x - this.cameras.main.width / 2, starsPos[i].y - this.cameras.main.height / 2, starsPos[i].scale, starsPos[i].isTwinkle, starsPos[i].alpha, 'earthScene', this.frames[4])
            }
        }
        if (this.boatBehind) {
            this.backgroundContainer.add(this.boatBehind)
        }

        this.planet = this.physics.add.sprite(0, 0, 'earthScene', this.frames[1])
        this.backgroundContainer.add(this.planet)


        let cloud1 = this.physics.add.sprite(-400, 300, 'earthScene', this.frames[0])
        this.charactersContainer.add(cloud1)

        let cloud2 = this.physics.add.sprite(200, -200, 'earthScene', this.frames[3])
        this.charactersContainer.add(cloud2)

        let cloud3 = this.physics.add.sprite(400, 200, 'earthScene', this.frames[5])
        this.charactersContainer.add(cloud3)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addInput() {
        this.planet.setInteractive({ cursor: "pointer" })
        this.planet.on('pointerdown', () => {
            this.rotateSpeed = this.speed
        })
        this.input.on('pointerup', () => {
            this.rotateSpeed = 0
        })
       
    }

    addVictoryConditions() {
        this.events.on('rotation', () => {
            if (Math.ceil(this.overgroundContainer.angle) == -23) {
                if(!this.sceneEnd){
                    this.sceneEnd = true
                    this.scene.transition({
                        target: 'TransitionScene', duration: 10,
                        data: {
                            text: [
                                this.feedbackText
                            ],
                            nextScene: this.nextScene, title: this.transitionTitle
                        }
                    });
                }
            }
            if (Math.ceil(this.overgroundContainer.angle) >= 75) {
                if(!this.audioPlaying){
                    this.arrivalSound.play()
                    this.audioPlaying = true
                }
            }
        })
    }
}