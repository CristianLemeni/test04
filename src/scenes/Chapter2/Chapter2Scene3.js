import { MapSceneBase } from "../Common/MapSceneBase";

const path = '../src/assets/Chapter2/scene3/'
const animPath = 'anims/'

export class Chapter2Scene3 extends MapSceneBase {

    constructor() {
        super('Chapter2Scene3')
    }

    preload() {
        super.preload()
    }

    create() {
        super.create()

        this.mapClicked = false

        this.addCharacters({ x: -300, y: -75 }, { x: 50, y: 50 })

        this.children.bringToTop(this.charactersContainer);
        this.addInput()
        this.addVictoryConditions()
        this.addUI(this.uiText.Chapter2Scene3[this.language], 50, 1.1, 0.85)
    }

    addBackground() {
        super.addBackground()

        this.addTank(-900, 0, -700, 85, 2000)
        this.addTank(-1000, -500, -600, -300, 2000)
        this.addTank(-500, -600, 75, -375, 2000)
        
        this.hitTest = new Phaser.Geom.Polygon([
            154.321503131524, 909.8956158663883,
            250.52192066805844, 871.8162839248434,
            320.6680584551148, 805.6784968684,
            298.6221294363257, 791.6492693110647,
            256.534446409185, 789.6450939457202,
            280.58455114822544, 749.5615866388309,
            342.71398747390396, 715.490605427975,
            384.8016701461378, 701.4613778705636,
            396.8267223382046, 613.27617954071,
            452.9436325678497, 555.15652004175,
            507.0563674321503, 523.089770354906,
            595.2400835073068, 517.0772442588726,
            689.4363256784968, 533.1106471816283,
            753.5699373695198, 531.1064718162839,
            815.6993736951983, 428.89352818371606,
            907.8914405010438, 412.86012526096033,
            986.054279749478, 370.7724425887265,
            1044.1753653444675, 336.70146137787054,
            1072.2338204592902, 284.5929018789144,
            1104.3006263048017, 252.52609603340292,
            1120.3340292275575, 206.43006263048017,
            1126.3465553235908, 148.3089770354906,
            1144.384133611691, 106.22129436325679,
            1148.39248434238, 68.1419624217119,
            1050.187891440501, 20.0417536534446,
            1012.1085594989562, 4.008350730688935,
            1915.991649269311, 8.01670146137787,
            1913.9874739039665, 913.9039665970772,
            156.32567849686848, 913.9039665970772,
        ]);
        let graphics = this.add.graphics({ x: 0, y: 0 });

        graphics.lineStyle(2, 0x00aa00);

        graphics.beginPath();

        graphics.moveTo(this.hitTest.points[0].x, this.hitTest.points[0].y);

        for (let i = 1; i < this.hitTest.points.length; i++) {
            graphics.lineTo(this.hitTest.points[i].x, this.hitTest.points[i].y);
        }

        graphics.closePath();
        // graphics.strokePath();

    }

    addInput() {
        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Geom.Polygon.ContainsPoint(this.hitTest, pointer) && !this.mapClicked) {
                this.events.emit("countryClick")
                this.mapClicked = true
            }
        })
        this.charactersContainer.list[2].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[2].input.hitArea.setTo(
            this.charactersContainer.list[2].x + 150,
            this.charactersContainer.list[2].y - 100,
            this.charactersContainer.list[2].width / 2,
            this.charactersContainer.list[2].height / 2,
        );

        this.charactersContainer.list[2].on("pointerdown", () => {
            if (this.mapClicked) {
                this.charactersContainer.list[2].input.enabled = false
                this.time.delayedCall(2000, () => {
                    this.scene.transition({
                        target: 'TransitionScene', duration: 0, data: {
                            text: this.feedbackText.Chapter2Scene3[this.language],
                            nextScene: "Chapter2Scene4",
                            title: this.titlesText.TitleChapter2[this.language]
                        }
                    });
                })
            }
        })

    }

    addVictoryConditions() {
        this.events.on("countryClick", () => {
            this.tweens.add({
                targets: this.charactersContainer.list[1],
                alpha: { value: 1, duration: 1000 },
                onComplete: () => {
                    this.charactersContainer.list[2].play(this.charactersContainer.list[1].getAnimationList()[0], false);
                    this.tweens.add({
                        targets: this.charactersContainer.list[2],
                        alpha: { value: 1, duration: 5 }
                    })
                }
            })
        })
    }

    update() {
        super.update()
    }
}