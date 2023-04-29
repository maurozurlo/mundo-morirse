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
    
    const sB = new SpeechBubble(this);
    sB.Preload();

    this.speechBubbles.push(sB);
  }

  create() {
    this.player.Setup();
    this.speechBubbles[0].Create(this.player.getCharacter(), this.player.getSprite());
  }

  update() {
   this.player.Movement(this.canvas!);
  }
}
