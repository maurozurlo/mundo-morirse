import Phaser from "phaser"
import { ArrowKeys } from "../types/keys";

export class Player {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    private player!: Phaser.GameObjects.Container
    private playerSprite!: Phaser.GameObjects.Sprite
    private cursors!: ArrowKeys
    private playerSpeed = 2

    private getAnimFrames(firstFrame: number) {
        return [firstFrame, firstFrame + 8, firstFrame + 16]
    }

    Preload() {
        this.scene.load.spritesheet('playerSpritesheet', 'assets/PlayerWalk.png', {
            frameWidth: 16,
            frameHeight: 24,
        })
    }

    Setup() {
        const AnimationManager = this.scene.anims;
        const InputPlugin = this.scene.input;
        const GameObjectFactory = this.scene.add;
        this.cursors = {
            up: InputPlugin.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            down: InputPlugin.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            left: InputPlugin.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: InputPlugin.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),

        };

        AnimationManager.create({
            key: 'left',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(6),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'right',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(2),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'up',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(0),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'idle',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: [4],
            }),
            frameRate: 1,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'down',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(4),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'up-left',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(7),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'up-right',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(1),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'down-left',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(5),
            }),
            frameRate: 10,
            repeat: -1,
        })

        AnimationManager.create({
            key: 'down-right',
            frames: AnimationManager.generateFrameNumbers('playerSpritesheet', {
                frames: this.getAnimFrames(3),
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.player = GameObjectFactory.container(400, 300)

        this.playerSprite = GameObjectFactory.sprite(0, 0, 'playerSpritesheet')

        this.player.add(this.playerSprite)

        this.playerSprite.play('up')

        InputPlugin.keyboard.on('keyup_1', this.Debug, this);
    }


    Movement(canvas: HTMLCanvasElement) {
        let prevX = this.player.x
        let prevY = this.player.y
        const xLimitMin = this.playerSprite.width / 2;
        const xLimitMax = canvas.width - this.playerSprite.width / 2;

        const yLimitMin = this.playerSprite.height / 3;
        const yLimitMax = canvas.height - this.playerSprite.height / 2;


        if (this.cursors.left.isDown && this.player.x > xLimitMin) {
            this.player.x -= this.playerSpeed

        } else if (this.cursors.right.isDown && this.player.x < xLimitMax) {
            this.player.x += this.playerSpeed
        }

        if (this.cursors.up.isDown && this.player.y > yLimitMin) {
            this.player.y -= this.playerSpeed
        } else if (this.cursors.down.isDown && this.player.y < yLimitMax) {
            this.player.y += this.playerSpeed
        }

        if (prevX < this.player.x) {
            this.playerSprite.anims.play('right', true)
        } else if (prevX > this.player.x) {
            this.playerSprite.anims.play('left', true)
        } else if (prevY < this.player.y) {
            this.playerSprite.anims.play('down', true)
        } else if (prevY > this.player.y) {
            this.playerSprite.anims.play('up', true)
        } else {
            this.playerSprite.anims.play('idle', true)
        }
    }


    Debug() {
        console.table({ x: this.player.x, y: this.player.y, sprite: this.playerSprite.getBounds() });
    }

    getSprite() {
        return this.playerSprite;
    }

    getCharacter() {
        return this.player;
    }
}