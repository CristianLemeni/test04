import Phaser from 'phaser';
import { Chapter1Scene1 } from './scenes/Chapter1/Chapter1Scene1';
import { Chapter1Scene2 } from './scenes/Chapter1/Chapter1Scene2';
import { Chapter1Scene3 } from './scenes/Chapter1/Chapter1Scene3';
import { Chapter1Scene4 } from './scenes/Chapter1/Chapter1Scene4';
import { Chapter1Scene5 } from './scenes/Chapter1/Chapter1Scene5';
import { Chapter1Scene6 } from './scenes/Chapter1/Chapter1Scene6';
import { Chapter1Scene7 } from './scenes/Chapter1/Chapter1Scene7';
import { Chapter1Scene8 } from './scenes/Chapter1/Chapter1Scene8';
import { Chapter1Scene9 } from './scenes/Chapter1/Chapter1Scene9';
import { Chapter1Scene10 } from './scenes/Chapter1/Chapter1Scene10';

import { Chapter2Scene1 } from './scenes/Chapter2/Chapter2Scene1';
import { Chapter2Scene2 } from './scenes/Chapter2/Chapter2Scene2';
import { Chapter2Scene3 } from './scenes/Chapter2/Chapter2Scene3';
import { Chapter2Scene4 } from './scenes/Chapter2/Chapter2Scene4';
import { Chapter2Scene5 } from './scenes/Chapter2/Chapter2Scene5';
import { Chapter2Scene6 } from './scenes/Chapter2/Chapter2Scene6';
import { Chapter2Scene7 } from './scenes/Chapter2/Chapter2Scene7';
import { Chapter2Scene8 } from './scenes/Chapter2/Chapter2Scene8';
import { Chapter2Scene9 } from './scenes/Chapter2/Chapter2Scene9';
import { Chapter2Scene10 } from './scenes/Chapter2/Chapter2Scene10';
import { Chapter2Scene11 } from './scenes/Chapter2/Chapter2Scene11';

import { Chapter3Scene1 } from './scenes/Chapter3/Chapter3Scene1';
import { Chapter3Scene2 } from './scenes/Chapter3/Chapter3Scene2';
import { Chapter3Scene3 } from './scenes/Chapter3/Chapter3Scene3';
import { Chapter3Scene4 } from './scenes/Chapter3/Chapter3Scene4';
import { Chapter3Scene5 } from './scenes/Chapter3/Chapter3Scene5';
import { Chapter3Scene6 } from './scenes/Chapter3/Chapter3Scene6';
import { Chapter3Scene7 } from './scenes/Chapter3/Chapter3Scene7';
import { Chapter3Scene8 } from './scenes/Chapter3/Chapter3Scene8';
import { Chapter3Scene9 } from './scenes/Chapter3/Chapter3Scene9';
import { Chapter3Scene10 } from './scenes/Chapter3/Chapter3Scene10';
import { Chapter3Scene11 } from './scenes/Chapter3/Chapter3Scene11';
import { Chapter3Scene12 } from './scenes/Chapter3/Chapter3Scene12';



import { TransitionScene } from './scenes/TransitionScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import * as SpinePlugin from '../node_modules/phaser/plugins/spine/dist/SpinePlugin';


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
        ]
    },
    scene: [
        MainMenuScene,
        TransitionScene,
        Chapter1Scene1,
        Chapter1Scene2,
        Chapter1Scene3,
        Chapter1Scene4,
        Chapter1Scene5,
        Chapter1Scene6,
        Chapter1Scene7,
        Chapter1Scene8,
        Chapter1Scene9,
        Chapter1Scene10,
        Chapter2Scene1,
        Chapter2Scene2,
        Chapter2Scene3,
        Chapter2Scene4,
        Chapter2Scene5,
        Chapter2Scene6,
        Chapter2Scene7,
        Chapter2Scene8,
        Chapter2Scene9,
        Chapter2Scene10,
        Chapter2Scene11,
        Chapter3Scene1,
        Chapter3Scene2,
        Chapter3Scene3,
        Chapter3Scene4,
        Chapter3Scene5,
        Chapter3Scene6,
        Chapter3Scene7,
        Chapter3Scene8,
        Chapter3Scene9,
        Chapter3Scene10,
        Chapter3Scene11,
        Chapter3Scene12
    ]
};

const game = new Phaser.Game(config);

