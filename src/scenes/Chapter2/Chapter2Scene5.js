import { MapSceneBase } from "../Common/MapSceneBase";

const path = '../src/assets/Chapter2/scene5/'

export class Chapter2Scene5 extends MapSceneBase {

    constructor() {
        super('Chapter2Scene5')
    }

    preload() {
        super.preload()
        this.load.image('car', path + 'police.png');
    }

    create() {
        super.create()
        this.mapClicked = false

        this.addCharacters({ x: -100, y: 100 }, { x: 200, y: 200 })
        this.addTank(-900, 0, -700, 85, 0)
        this.addTank(-1000, -500, -600, -300, 0)
        this.addTank(-500, -600, 75, -375, 0)
        this.addWater(510, 180)
        this.children.bringToTop(this.charactersContainer);
        this.addInput()
        this.addVictoryConditions()
        this.addUI(this.uiText.Chapter2Scene5[this.language], 50, 1.1, 0.85)


        this.hitTest = new Phaser.Geom.Polygon([
            1480.7843137254902, 577.2549019607843,
            1438.4313725490197, 467.45098039215685,
            1450.9803921568628, 362.3529411764706,
            1463.5294117647059, 327.84313725490193,
            1388.235294117647, 236.8627450980392,
            1363.1372549019607, 208.62745098039215,
            1411.764705882353, 145.88235294117646,
            1436.862745098039, 95.68627450980392,
            1427.450980392157, 65.88235294117646,
            1297.2549019607843, 94.11764705882352,
            1201.5686274509803, 122.35294117647058,
            1126.2745098039215, 163.13725490196077,
            1140.392156862745, 101.96078431372548,
            1146.6666666666667, 65.88235294117646,
            1035.2941176470588, 12.549019607843137,
            1905.8823529411764, 14.117647058823529,
            1909.0196078431372, 428.2352941176471,
            1476.078431372549, 574.1176470588235,
        ]);
        let graphics = this.add.graphics({ x: 0, y: 0 });

        graphics.lineStyle(2, 0x00aa00);

        graphics.beginPath();

        graphics.moveTo(this.hitTest.points[0].x, this.hitTest.points[0].y);

        for (let i = 1; i < this.hitTest.points.length; i++) {
            graphics.lineTo(this.hitTest.points[i].x, this.hitTest.points[i].y);
        }

        graphics.closePath();

    }

    update() {
        super.update()
    }

    addCar(startX, startY, endX, endY, duration) {
        let car = this.physics.add.sprite(startX, startY, 'car')
        this.backgroundContainer.add(car)
        this.tweens.add({
            targets: car,
            x: { value: endX, duration: duration },
            y: { value: endY, duration: duration }
        })
    }

    addInput() {
        this.input.on('pointerdown', (pointer) => {
            if (Phaser.Geom.Polygon.ContainsPoint(this.hitTest, pointer) && !this.mapClicked) {
                this.mapClicked = true
                this.addCar(1100, -385, 625, -385, 3000)
            }
        })

        let seaHitBox = new Phaser.Geom.Polygon([
            1055.686274509804, 909.8039215686274,
            1234.5098039215686, 793.7254901960785,
            1405.4901960784314, 690.1960784313725,
            1538.8235294117646, 583.5294117647059,
            1730.1960784313726, 520.7843137254902,
            1893.3333333333333, 483.1372549019608,
            1913.7254901960785, 475.29411764705884,
            1916.862745098039, 917.6470588235294,
            1057.2549019607843, 919.2156862745098,
        ])
        let graphics = this.add.graphics({ x: 0, y: 0 });

        graphics.lineStyle(2, 0x00aa00);

        graphics.beginPath();

        graphics.moveTo(seaHitBox.points[0].x, seaHitBox.points[0].y);

        for (let i = 1; i < seaHitBox.points.length; i++) {
            graphics.lineTo(seaHitBox.points[i].x, seaHitBox.points[i].y);
        }

        graphics.closePath();

        this.backgroundContainer.list[this.backgroundContainer.list.length - 1].setInteractive();
        this.backgroundContainer.list[this.backgroundContainer.list.length - 1].on("pointerdown", (pointer) => {
            if (Phaser.Geom.Polygon.ContainsPoint(seaHitBox, pointer)) {
                this.events.emit('seaClicked')
            }
        })
        this.charactersContainer.list[2].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[2].input.hitArea.setTo(
            this.charactersContainer.list[2].x,
            this.charactersContainer.list[2].y - 200,
            this.charactersContainer.list[2].width / 2,
            this.charactersContainer.list[2].height / 2,
        );

        this.charactersContainer.list[2].on("pointerdown", () => {
            this.charactersContainer.list[2].input.enabled = false
            this.scene.transition({
                target: 'TransitionScene', duration: 0, data: {
                    text: this.feedbackText.Chapter2Scene5[this.language],
                    nextScene: "Chapter2Scene6",
                    title: this.titlesText.TitleChapter2[this.language]
                }
            });
        })

    }

    addVictoryConditions() {
        this.events.on('seaClicked', () => {
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

}