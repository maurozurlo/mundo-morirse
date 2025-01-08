import Phaser from 'phaser'
import { Player } from '../chars/Player';
import { SpeechBubble } from '../props/Speechbubble';

export default class Demo extends Phaser.Scene {
  player = new Player(this);
  canvas: HTMLCanvasElement | null = null;
  speechBubbles: Array<SpeechBubble> = []

  constructor() {
    super('GameScene')
  }

  preload() {
    this.player.Preload();
    this.canvas = this.sys.game.canvas;

    const sB = new SpeechBubble(this, 32, 256, 32, 64);
    sB.Preload();

    this.speechBubbles.push(sB);
  }

  create() {
    this.player.Setup();
    this.speechBubbles[0].Create(this.player.getCharacter(), this.player.getSprite(), -8);
    this.input.keyboard.removeCapture('SPACE')
  }

  update() {
    this.player.Movement(this.canvas!);
  }
}
