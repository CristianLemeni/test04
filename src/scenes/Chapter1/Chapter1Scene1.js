import { BaseScene } from "../Common/BaseScene";

const path = '../src/assets/Chapter1/scene1/'
const animPath = 'anims/'
const soundsPath = 'sounds/'

export class Chapter1Scene1 extends BaseScene {

    constructor() {
        super('Chapter1Scene1')
    }

    preload() {
        super.preload()
        this.load.image('bkChp1Sc1', path + 'Fond.png');
        this.load.image('overgroundChp1Sc1', path + 'Ville.png');
        this.load.spine('persRight1Chp1Sc1', path + animPath + 'Plan_01_Attente_01_Mec_Droite.json', [path + animPath + 'Plan_01_Attente_01_Mec_Droite.atlas'], true);
        this.load.spine('persLeft1Chp1Sc1', path + animPath + 'Plan_01_Attente_01_Mec_Gauche.json', [path + animPath + 'Plan_01_Attente_01_Mec_Gauche.atlas'], true);
        this.load.spine('persRight2Chp1Sc1', path + animPath + 'Plan_01_Attente_02_Mec_Droite.json', [path + animPath + 'Plan_01_Attente_02_Mec_Droite.atlas'], true);
        this.load.spine('persLeft2Chp1Sc1', path + animPath + 'Plan_01_Attente_02_Mec_Gauche.json', [path + animPath + 'Plan_01_Attente_02_Mec_Gauche.atlas'], true);
        this.load.atlas('Chp1Sc1', path + 'scene1.png', path + 'scene1.json');
    }

    create() {
        super.create()

        this.atlasTexture = this.textures.get('Chp1Sc1');
        this.frames = this.atlasTexture.getFrameNames();

        this.overgroundParallaxContainer = this.add.container()
        this.physics.world.enableBody(this.overgroundParallaxContainer);

        this.createContainers()

        this.sceneIsPlaying = true
        this.animPlay = true
        this.addBackground()
        this.addParallax()
        this.addCharacters()


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.children.bringToTop(this.overgroundParallaxContainer);
        this.children.bringToTop(this.charactersContainer);

        this.updatePosition(-40)
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter1Scene1[this.language], 50, 1.1)
    }

    update() {
        if (this.charactersContainer && this.sceneIsPlaying) {
            if (!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this.charactersContainer.getBounds())) {
                this.charactersContainer.body.stop()
            }
        }
    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp1Sc1')
        this.backgroundContainer.add(bk)

        let starsPos = [
            { x: 50, y: -400, scale: 1, isTwinkle: true, alpha: 0.5 },
            { x: -175, y: -200, scale: 1, isTwinkle: false, alpha: 0.5 },
            { x: -150, y: -220, scale: 0.5, isTwinkle: false, alpha: 0.5 },
            { x: -115, y: -180, scale: 0.8, isTwinkle: true, alpha: 0.5 },
            { x: -170, y: -385, scale: 1, isTwinkle: false, alpha: 0.5 },
            { x: -250, y: -285, scale: 0.6, isTwinkle: false, alpha: 0.5 },
            { x: -525, y: -100, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -500, y: -75, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -450, y: -120, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -490, y: -160, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -570, y: -190, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -585, y: -275, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -650, y: -250, scale: 0.75, isTwinkle: false, alpha: 0.5 },
            { x: -800, y: -100, scale: 0.75, isTwinkle: true, alpha: 0.5 }
        ]

        for (let i = 0; i < starsPos.length; i++) {
            this.addStar(starsPos[i].x, starsPos[i].y, starsPos[i].scale, starsPos[i].isTwinkle, starsPos[i].alpha, 'Chp1Sc1', this.frames[9])
        }

        let overground = this.physics.add.sprite(-89, 200, 'overgroundChp1Sc1')
        this.backgroundContainer.add(overground)

        let overground2 = this.physics.add.sprite(-89, 200, 'overgroundChp1Sc1')
        overground2.setAlpha(0.1);
        this.backgroundContainer.add(overground2)

        let moon = this.physics.add.sprite(750, -300, 'Chp1Sc1', this.frames[5])
        this.backgroundContainer.add(moon)

        let lampRight = this.physics.add.sprite(480, 145, 'Chp1Sc1', this.frames[3])
        let lampLeft = this.physics.add.sprite(-650, 145, 'Chp1Sc1', this.frames[3])
        this.overgroundContainer.add(lampLeft)
        this.overgroundContainer.add(lampRight)

        this.mainContainer.add(this.backgroundContainer)

        this.mainContainer.add(this.overgroundContainer)
    }

    addParallax() {
        let rightTree = this.physics.add.sprite(620, -50, 'Chp1Sc1', this.frames[1])
        rightTree.setScale(1.1)
        let leftTree = this.physics.add.sprite(-580, -50, 'Chp1Sc1', this.frames[0])
        leftTree.setScale(1.1)
        this.overgroundParallaxContainer.add(rightTree)
        this.overgroundParallaxContainer.add(leftTree)

        this.mainContainer.add(this.overgroundParallaxContainer)
    }

    addCharacters() {
        this.group1 = this.physics.add.group()
        this.group1.add(this.addSpine(150, 600, 'persRight1Chp1Sc1', this.charactersContainer))

        this.group2 = this.physics.add.group()
        this.group2.add(this.addSpine(-320, 600, 'persLeft1Chp1Sc1', this.charactersContainer))


        this.addSpine(-150, 600, 'persRight2Chp1Sc1', this.charactersContainer, 0)
        this.addSpine(-420, 600, 'persLeft2Chp1Sc1', this.charactersContainer, 0)

        this.mainContainer.add(this.charactersContainer)
    }

    addInput() {
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.input.setDraggable(this.charactersContainer.list[0]);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            this.overgroundParallaxContainer.x = (dragX / 100) * -1
        });
    }

    addVictoryConditions() {
        this.physics.add.overlap(this.group1, this.group2, () => {
            if (this.animPlay) {
                this.kiss()
            }
        });

        this.events.on("endOfSecondAnim", () => {
            this.sceneIsPlaying = false

            this.time.delayedCall(3000, () => {
                this.scene.transition({
                    target: 'TransitionScene',
                    duration: 0,
                    data: {
                        text: this.feedbackText.Chapter1Scene1[this.language],
                        nextScene: "Chapter1Scene2",
                        title: this.titlesText.TitleChapter1[this.language]
                    }
                });
            })
        })
    }

    kiss() {
        this.tweens.add({
            targets: this.charactersContainer.list[0],
            alpha: { value: 0, duration: 100, ease: 'Power1' },
            loop: 0
        });
        this.tweens.add({
            targets: this.charactersContainer.list[1],
            alpha: { value: 0, duration: 100, ease: 'Power1' },
            loop: 0
        });

        this.tweens.add({
            targets: this.charactersContainer.list[2],
            alpha: { value: 1, duration: 100, ease: 'Power1' },
        });
        this.tweens.add({
            targets: this.charactersContainer.list[3],
            alpha: { value: 1, duration: 100, ease: 'Power1' },
            onComplete: () => {
                this.events.emit('endOfSecondAnim');
                this.animPlay = false
            }
        });



    }
}