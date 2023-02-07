import Phaser from 'phaser'

export default class Demo extends Phaser.Scene {
  private player!: Phaser.GameObjects.Container
  private playerSprite!: Phaser.GameObjects.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private playerSpeed = 1

  constructor() {
    super('GameScene')
  }

  preload() {
    this.load.spritesheet('playerSpritesheet', 'assets/PlayerWalk.png', {
      frameWidth: 16,
      frameHeight: 24,
    })
    this.load.image('speechBubble', 'assets/speechbubble.png')
  }

  getAnimFrames(firstFrame: number) {
    return [firstFrame, firstFrame + 8, firstFrame + 16]
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(6),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(2),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(0),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: [4],
      }),
      frameRate: 1,
      repeat: -1,
    })

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(4),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'up-left',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(7),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'up-right',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(1),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'down-left',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(5),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'down-right',
      frames: this.anims.generateFrameNumbers('playerSpritesheet', {
        frames: this.getAnimFrames(3),
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.player = this.add.container(400, 300)

    this.playerSprite = this.add.sprite(0, 0, 'playerSpritesheet')

    this.player.add(this.playerSprite)

    this.playerSprite.play('up')

    //create a container for the bubble and the text
    const speechBubble = this.add.sprite(
      0,
      0 - this.playerSprite.height,
      'speechBubble',
    )
    speechBubble.setScale(1)
    this.player.add(speechBubble)
    //create a text object for the message and add it to the container
    const bubbleText = this.add.text(0,0 - this.playerSprite.height - 3, 'Hello World!', {
      fontSize: '8px',
      color: '#000',
    })
    bubbleText.setOrigin(0.5, 0.5)
    this.player.add(bubbleText)
  }

  update() {
    let prevX = this.player.x
    let prevY = this.player.y

    if (this.cursors.left.isDown) {
      this.player.x -= this.playerSpeed
    } else if (this.cursors.right.isDown) {
      this.player.x += this.playerSpeed
    }

    if (this.cursors.up.isDown) {
      this.player.y -= this.playerSpeed
    } else if (this.cursors.down.isDown) {
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
      //this.player.anims.stop();
    }
  }
}
