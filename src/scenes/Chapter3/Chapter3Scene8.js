import { MapSceneBase } from "../Common/MapSceneBase";

const path = '../src/assets/Chapter3/scene8/'

export class Chapter3Scene8 extends MapSceneBase {

    constructor() {
        super('Chapter3Scene8')
    }

    preload() {
        super.preload()
        this.load.image('chp3Sc8Boat', path + 'boat.png');
    }

    create() {
        super.create()
        this.addBackground()
        this.addWater(425, 235, 1.25)
        this.addCharacters({ x: -400, y: -100 })
        this.mapClicked = false
        this.children.bringToTop(this.charactersContainer);

        this.addInput()
        this.addVictoryConditions()
        this.addUI([this.uiText.Chapter3Scene8[this.language]], 50, 1.1, 0.85)
    }

    update() {

    }

    addBoat() {
        let boat = this.physics.add.sprite(650, 125, 'chp3Sc8Boat')
        this.backgroundContainer.add(boat)
    }

    addInput() {
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

        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Geom.Polygon.ContainsPoint(this.hitTest, pointer) && !this.mapClicked) {
                this.mapClicked = true

                this.tweens.add({
                    targets: this.charactersContainer.list[0],
                    x: { value: 0, duration: 1000 },
                    y: { value: 100, duration: 1000 },
                    onComplete: () => {
                        this.time.delayedCall(500, () => {
                            this.events.emit("countryMoved")
                        })
                    }
                })
            }
        })
    }

    addVictoryConditions() {
        this.events.on("countryMoved", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter3Scene8[this.language],
                    nextScene: "Chapter3Scene9",
                    title: this.titlesText.TitleChapter3[this.language]
                }
            });
        })
    }



}