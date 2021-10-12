import { FallingPapersBase } from "../Common/FallingPapersBase";

export class Chapter1Scene7 extends FallingPapersBase {


    constructor() {
        super('Chapter1Scene7')
        this.pagePos = {
            x: 400, 
            y: 75
        }
    }

    preload() {
        super.preload()
    }

    create() {
        super.create()
        this.addUI(this.uiText.Chapter1Scene7[this.language], 50, 1.1)
    }

    update() {

    }

    addCharacters() {
       super.addCharacters()
       this.persGroup.add(this.addSpine(600, 500, 'persChp1Sc7', this.charactersContainer))
       
       let arm = this.add.sprite(500, 100, 'Chp1Sc7', this.frames[1])
       arm.setAlpha(0)
       this.charactersContainer.add(arm)
       this.persGroup.add(arm)
    }

    sceneTransition() {
        this.scene.transition({
            target: 'TransitionScene',
             duration: 0,
              data: {
                text: this.feedbackText.Chapter1Scene7[this.language],
                nextScene: "Chapter1Scene8",
                title: this.titlesText.TitleChapter1[this.language]
            }
        });
    }

}