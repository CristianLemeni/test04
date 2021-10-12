import { DinnerTableBase } from "../Common/DinnerTableBase";

const path = '../src/assets/Chapter3/scene2/'
const pathUi = '../src/assets/UiScene/'
const animPath = 'anims/'

export class Chapter3Scene4 extends DinnerTableBase {

    constructor() {
        super('Chapter3Scene4')
    }

    preload() {
        super.preload()
    }

    create() {
        super.create()
        this.atlasTexture = this.textures.get('dinnerTableScene');
        this.frames = this.atlasTexture.getFrameNames();
        
        this.createContainers()
        this.addBackground()

        this.children.bringToTop(this.charactersContainer);

        this.updatePosition()
        this.addUI(this.uiText.Chapter3Scene4[this.language], 50, 1.1)
    }

    update() {

    }

    addInput() {
        this.input.on("pointerdown", () => {
            this.events.emit("crumsGone")
        })
    }
    
    addVictoryConditions() {
        this.events.on("crumsGone", () => {
            this.scene.transition({
                target: 'TransitionScene',
                duration: 0,
                data: {
                    text: this.feedbackText.Chapter3Scene4[this.language],
                    nextScene: 'Chapter3Scene5',
                    title: this.titlesText.TitleChapter3[this.language]
                }
            });
        })
    }

    
}