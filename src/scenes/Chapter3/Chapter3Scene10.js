import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter3/scene10/'
const animPath = 'anims/'

export class Chapter3Scene10 extends BaseScene {

    constructor() {
        super('Chapter3Scene10')
    }

    preload() {
        super.preload()
        this.load.image('bkChp3Sc10', path + 'background.png');
        this.load.spine('migrant1Chp3Sc10', path + animPath + 'ch3p10-char1-fixed.json', [path + animPath + 'ch3p10-char1-fixed.atlas'], true);
        this.load.spine('migrant2Chp3Sc10', path + animPath + 'ch3p10-char2-fixed.json', [path + animPath + 'ch3p10-char2-fixed.atlas'], true);
        this.load.spine('migrant3Chp3Sc10', path + animPath + 'ch3p10-char3-fixed.json', [path + animPath + 'ch3p10-char3-fixed.atlas'], true);
        this.load.atlas("Chp3Sc10", path + 'scene10.png', path + 'scene10.json')
    }

    create() {
        super.create()
        this.createContainers()
        this.startRotation = false
        this.atlasTexture = this.textures.get('Chp3Sc10');
        this.frames = this.atlasTexture.getFrameNames();
        this.rotIndex = 1
        this.addBackground()
        this.addCharacters()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()

        this.addUI([this.uiText.Chapter3Scene10[this.language]], 50, 1.1, 0.85)
        this.addInput()
        this.addVictoryConditions()
    }

    update() {
        super.update()
        if (this.startRotation) {
            Phaser.Actions.RotateAroundDistance([this.boat], this.planet, 0.01, 10);
            const angleDeg = Math.atan2(this.boat.y - this.planet.y, this.boat.x - this.planet.x) * 180 / Math.PI;
            this.boat.angle = angleDeg
            this.events.emit('boatRotation')
        }
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp3Sc10')
        this.backgroundContainer.add(bk)


        this.boat = this.add.container()
        this.boat.add(this.physics.add.sprite(0, -125, 'Chp3Sc10', this.frames[1]))
        this.boat.setPosition(-700, -300)
        this.backgroundContainer.add(this.boat)
        this.planet = this.physics.add.sprite(-700, -300, 'Chp3Sc10', this.frames[0])
        this.overgroundContainer.add(this.planet)


        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)
    }

    addCharacters() {
        this.spines = []
        //end state
        this.addMigrant1(-500, 600)
        this.addMigrant2(0, 600)
        this.addMigrant3(400, 975)

        for (let i = 0; i < 7; i++) {
            let s1 = this.addMigrant1(this.getRandomInt(900, -800), 600)
            let s2 = this.addMigrant2(this.getRandomInt(900, -800), 600)
            let s3 = this.addMigrant3(this.getRandomInt(900, -800), 975)
            this.spines.push(s1, s2, s3)
        }

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.planet.setInteractive({ cursor: 'pointer' });

        this.planet.on('pointerdown', () => {
            this.startRotation = true
        })

        this.input.on('pointerup', () => {
            this.startRotation = false
        })

    }

    addMigrant1(x, y) {
        let s = this.addSpine(x, y, 'migrant1Chp3Sc10', this.charactersContainer)
        return s
    }

    addMigrant2(x, y) {
        let s = this.addSpine(x, y, 'migrant2Chp3Sc10', this.charactersContainer)
        return s
    }

    addMigrant3(x, y) {
        let s = this.addSpine(x, y, 'migrant3Chp3Sc10', this.charactersContainer)
        return s
    }

    addVictoryConditions() {
        this.events.on("boatRotation", () => {
            if(Math.ceil(this.boat.angle) >= 30 * this.rotIndex){
                this.rotIndex += 0.25
                let s = this.spines.pop()
                this.events.emit("dissapear", s)
                if(this.spines.length == 0){
                    this.scene.transition({
                        target: 'TransitionScene',
                        duration: 0,
                        data: {
                            text: this.feedbackText.Chapter3Scene9[this.language],
                            nextScene: "Chapter3Scene11",
                            title: this.titlesText.TitleChapter3[this.language]
                        }
                    });
                }
            }
           
        })

        this.events.on("dissapear", (s) => {
           this.tweens.add({
               targets:  s,
               alpha: {value: 0, duration: 1000},
           })
        })
    }



}