import Phaser from "phaser";


export class SpeechBubble {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene){
        this.scene = scene;
    }

    Preload(){
        this.scene.load.image('speechBubble', 'assets/speechbubble.png')
    }

    Create(Character: Phaser.GameObjects.Container, CharacterSprite: Phaser.GameObjects.Sprite) {
        const GameObjectFactory = this.scene.add;
        //create a container for the bubble and the text
        const speechBubble = GameObjectFactory.sprite(
            0,
            0 - CharacterSprite.height,
            'speechBubble',
        )
        speechBubble.setScale(1)
        Character.add(speechBubble)
        //create a text object for the message and add it to the container
        let bubbleText = GameObjectFactory.text(0, 0 - CharacterSprite.height - 3, 'Hello World!', {
            fontSize: '8px',
            color: '#000',
        })
        bubbleText.setOrigin(0.5, 0.5)
        Character.add(bubbleText)

        const ChatBtn = document.getElementById('chatBtn');
        const ChatInput: HTMLInputElement | null = document.getElementById('chatInput') as HTMLInputElement;

        ChatBtn?.addEventListener('click', () => {
            if(ChatInput?.value !== ""){
                Character.remove(bubbleText);
                const newText = GameObjectFactory.text(0, 0 - CharacterSprite.height - 3, ChatInput.value, {
                    fontSize: '8px',
                    color: '#000',
                })
                bubbleText = newText;
                Character.add(newText)
                ChatInput.value = ""
            }
        })
    }
    

}