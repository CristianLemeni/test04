import { BaseScene } from "../Common/BaseScene";
import WebFontFile from '../Common/WebFontFile'

const path = '../src/assets/Chapter1/scene3/'
const animPath = 'anims/'
const soundsPath = 'sounds/'

export class Chapter1Scene3 extends BaseScene {


    constructor() {
        super('Chapter1Scene3')
    }

    preload() {
        super.preload()
        this.load.atlas('Chp1Sc3', path + 'scene3.png', path + 'scene3.json');
        this.load.image('bkChp1Sc3', path + 'mur.png');
        this.load.spine('persChp1Sc3', path + animPath + 'ch1p3_character.json', [path + animPath + 'ch1p3_character.atlas'], true);
        this.load.addFile(new WebFontFile(this.load, 'Abel'))
        this.load.audio('ambienceChp1Sc3', [path + soundsPath + 'ch1_sc03_amb_matin.mp3'])
        this.load.audio('telephone', [path + soundsPath + 'ch1_sc03_notif_tel.mp3'])
        this.load.audio('letter', [path + soundsPath + 'ch1_sc03_lettre.mp3'])
        this.load.audio('laptop', [path + soundsPath + 'ch1_sc03_notif_pc.mp3'])
    }

    create() {
        super.create()

        this.playSound('ambienceChp1Sc3', 1, true)

        this.atlasTexture = this.textures.get('Chp1Sc3');
        this.frames = this.atlasTexture.getFrameNames();

        this.objectsActive = {
            pers: false,
            phone: false,
            window: false,
            laptop: false
        }

        this.suitCaseTest = new Phaser.Geom.Rectangle(800, 700, 175, 175)

        this.createContainers()

        this.addBackground()
        this.addCharacters()
        this.addVictoryConditions()

        this.addUI(this.uiText.Chapter1Scene3[this.language], 50, 1.1)


        this.children.bringToTop(this.charactersContainer);
        this.addInput()

        this.updatePosition(-90)
    }

    update() {

    }

    addBackground() {
        let bk = this.physics.add.sprite(0, 0, 'bkChp1Sc3')
        bk.setScale(1.1)
        this.backgroundContainer.add(bk)

        let furniture = this.physics.add.sprite(-25, 185, 'Chp1Sc3', this.frames[0])
        this.backgroundContainer.add(furniture)

        let portrait = this.physics.add.sprite(425, 50, 'Chp1Sc3', this.frames[5])
        this.backgroundContainer.add(portrait)

        let shelf = this.physics.add.sprite(400, 50, 'Chp1Sc3', this.frames[11])
        this.backgroundContainer.add(shelf)

        this.mainContainer.add(this.backgroundContainer)
        this.mainContainer.add(this.overgroundContainer)

    }

    addCharacters() {
        let window = this.physics.add.sprite(-385, 50, 'Chp1Sc3', this.frames[2])
        this.backgroundContainer.add(window)
        let windowCollisionContainer = this.add.container(-700, -235, []);
        windowCollisionContainer.setSize(560, 350)
        this.charactersContainer.add(windowCollisionContainer)

        let windowCrack1 = this.physics.add.sprite(-500, -150, 'Chp1Sc3', this.frames[6])
        windowCrack1.setAlpha(0)
        this.charactersContainer.add(windowCrack1)

        let windowCrack2 = this.physics.add.sprite(-700, -175, 'Chp1Sc3', this.frames[6])
        windowCrack2.setScale(0.75)
        windowCrack2.setAlpha(0)
        this.charactersContainer.add(windowCrack2)

        this.addSpine(150, 440, 'persChp1Sc3', this.charactersContainer)

        let whiteSpeech = this.physics.add.sprite(-85, 100, 'Chp1Sc3', this.frames[10])
        whiteSpeech.setAlpha(0)
        this.charactersContainer.add(whiteSpeech)
        let whiteSpeechContent = [
            "Ton petit ami est en prison...",
            "",
            "C'est bientot ton tour"
        ];
        let whiteSpeechStyle = {
            color: 'red',
            fontSize: 40,
            fontFamily: "Abel",
        }
        let whiteSpeechText = this.add.text(-300, 50, whiteSpeechContent, whiteSpeechStyle);
        whiteSpeechText.setAlpha(0)
        this.charactersContainer.add(whiteSpeechText)

        this.mainContainer.add(this.charactersContainer)

        let phone = this.physics.add.sprite(-135, 15, 'Chp1Sc3', this.frames[9])
        phone.flipX = true
        this.backgroundContainer.add(phone)

        let phoneCollisionContainer = this.add.container(525, 50, []);
        phoneCollisionContainer.setSize(50, 100)
        this.charactersContainer.add(phoneCollisionContainer)


        let redSpeechContentPhone = [
            "On va te crever...",
        ];
        let redSpeechStyle = {
            color: 'white',
            fontSize: 40,
            fontFamily: "Abel",
        }
        let AvatarPhoneName = [
            "INCONNU",
        ];
        let redSpeechStyleAvatar = {
            color: 'black',
            fontSize: 40,
            fontFamily: "Abel",
        }
        let redSpeechPhone = this.physics.add.sprite(650, -100, 'Chp1Sc3', this.frames[8])
        redSpeechPhone.setAlpha(0)
        this.charactersContainer.add(redSpeechPhone)
        let redSpeechPhoneAvatar = this.physics.add.sprite(800, -125, 'Chp1Sc3', this.frames[1])
        redSpeechPhoneAvatar.setAlpha(0)
        this.charactersContainer.add(redSpeechPhoneAvatar)
        let redSpeechPhoneAvatarName = this.add.text(735, -85, AvatarPhoneName, redSpeechStyleAvatar);
        redSpeechPhoneAvatarName.setAlpha(0)
        this.charactersContainer.add(redSpeechPhoneAvatarName)
        let redSpeechTextPhone = this.add.text(435, -135, redSpeechContentPhone, redSpeechStyle);
        redSpeechTextPhone.setAlpha(0)
        this.charactersContainer.add(redSpeechTextPhone)

        let laptop = this.physics.add.sprite(-400, 25, 'Chp1Sc3', this.frames[3])
        this.backgroundContainer.add(laptop)

        let laptopCollisionContainer = this.add.container(-800, 300, []);
        laptopCollisionContainer.setSize(500, 300)
        this.charactersContainer.add(laptopCollisionContainer)

        let redSpeechContentLaptop = [
            "On n'a plus de fils!",
        ];
        let AvatarLaptopName = [
            "PAPA",
        ];
        let redSpeechLaptop = this.physics.add.sprite(-600, 50, 'Chp1Sc3', this.frames[8])
        redSpeechLaptop.setAlpha(0)
        this.charactersContainer.add(redSpeechLaptop)
        let redSpeechLaptopAvatar = this.physics.add.sprite(-425, 25, 'Chp1Sc3', this.frames[1])
        redSpeechLaptopAvatar.setAlpha(0)
        this.charactersContainer.add(redSpeechLaptopAvatar)
        let redSpeechLaptopAvatarName = this.add.text(-465, 65, AvatarLaptopName, redSpeechStyleAvatar);
        redSpeechLaptopAvatarName.setAlpha(0)
        this.charactersContainer.add(redSpeechLaptopAvatarName)
        let redSpeechTextLaptop = this.add.text(-820, 15, redSpeechContentLaptop, redSpeechStyle);
        redSpeechTextLaptop.setAlpha(0)
        this.charactersContainer.add(redSpeechTextLaptop)

        let suitcase = this.physics.add.sprite(-415, 25, 'Chp1Sc3', this.frames[4])
        suitcase.setAlpha(0)
        this.charactersContainer.add(suitcase)

        this.mainContainer.add(this.charactersContainer)

    }

    addInput() {
        //window
        this.charactersContainer.list[0].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[0].on('pointerdown', (pointer) => {
            this.tweens.add({
                targets: [this.charactersContainer.list[1], this.charactersContainer.list[2]],
                alpha: { value: 1, duration: 1000 }
            })
            this.objectsActive.window = true
            if (Object.values(this.objectsActive).every(Boolean)) {
                this.events.emit('revealSuitcase');
            }
        })
        //person
        this.charactersContainer.list[3].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[3].on('pointerdown', (pointer) => {
            this.tweens.add({
                targets: [this.charactersContainer.list[4], this.charactersContainer.list[5]],
                alpha: { value: 1, duration: 1000 }
            })
            this.objectsActive.pers = true
            this.playSound('letter')
            if (Object.values(this.objectsActive).every(Boolean)) {
                this.events.emit('revealSuitcase');
            }
        })
        //phone
        this.charactersContainer.list[6].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[6].on('pointerdown', (pointer) => {
            this.tweens.add({
                targets: [this.charactersContainer.list[7], this.charactersContainer.list[8], this.charactersContainer.list[9], this.charactersContainer.list[10]],
                alpha: { value: 1, duration: 1000 }
            })
            this.objectsActive.phone = true
            this.playSound('telephone')
            if (Object.values(this.objectsActive).every(Boolean)) {
                this.events.emit('revealSuitcase');
            }
        })
        //laptop
        this.charactersContainer.list[11].setInteractive({ cursor: 'pointer' });
        this.charactersContainer.list[11].on('pointerdown', (pointer) => {
            this.tweens.add({
                targets: [this.charactersContainer.list[12], this.charactersContainer.list[13], this.charactersContainer.list[14], this.charactersContainer.list[15]],
                alpha: { value: 1, duration: 1000 }
            })
            this.objectsActive.laptop = true
            this.playSound('laptop')
            if (Object.values(this.objectsActive).every(Boolean)) {
                this.events.emit('revealSuitcase');
            }
        })
    }

    addVictoryConditions() {
        this.events.on("revealSuitcase", () => {
            this.tweens.add({
                targets: [this.charactersContainer.list[this.charactersContainer.list.length - 1]],
                alpha: { value: 1, duration: 1000 },
                onComplete: () => {
                    this.charactersContainer.list[this.charactersContainer.list.length - 1].setInteractive({ cursor: 'pointer' })
                    this.input.on("pointerdown", (pointer) => {
                        if (Phaser.Geom.Rectangle.ContainsPoint(this.suitCaseTest, pointer)) {
                            this.tweens.add({
                                targets: [this.charactersContainer.list[this.charactersContainer.list.length - 1], this.charactersContainer.list[3], this.charactersContainer.list[4], this.charactersContainer.list[5]],
                                alpha: { value: 0, duration: 1000 },
                                onComplete: () => {
                                    this.scene.transition({
                                        target: 'TransitionScene', duration: 0,
                                        data: {
                                            text: this.feedbackText.Chapter1Scene3[this.language],
                                            nextScene: 'Chapter1Scene4',
                                            title: this.titlesText.TitleChapter1[this.language]
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            })

        })
    }
}