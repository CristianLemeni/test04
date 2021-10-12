import { FallingPapersBase } from "../Common/FallingPapersBase";

const path = '../src/assets/Chapter3/scene10/'
const animPath = 'anims/'

export class Chapter3Scene11 extends FallingPapersBase {


    constructor() {
        super('Chapter3Scene11')
        this.pagePos = {
            x: 440,
            y: 155
        }
    }

    preload() {
        super.preload()
        this.load.spine('migrant3Chp3Sc10', path + animPath + 'ch3p10-char3-fixed.json', [path + animPath + 'ch3p10-char3-fixed.atlas'], true);
    }

    create() {
        super.create()
        this.nextScene = "Chapter3Scene12"
        this.text = this.feedbackText.Chapter3Scene11[this.language]
        this.title = this.titlesText.TitleChapter3[this.language]
        this.addUI(this.uiText.Chapter3Scene11[this.language], 50, 1.1)
    }

    update() {

    }

    addCharacters() {
        super.addCharacters()
        this.persGroup.add(this.addSpine(600, 900, 'migrant3Chp3Sc10', this.charactersContainer))

        let arm = this.add.sprite(550, 200, 'Chp1Sc7', this.frames[1])
        arm.setAlpha(0)
        this.charactersContainer.add(arm)
        this.persGroup.add(arm)
    }

    sceneTransition() {
        this.scene.transition({
            target: 'TransitionScene',
             duration: 0,
              data: {
                text: this.feedbackText.Chapter3Scene11[this.language],
                nextScene: "Chapter3Scene12",
                title: this.titlesText.TitleChapter3[this.language]
            }
        });
    }

}