import Phaser from "phaser";

export class SpeechBubble {
    scene: Phaser.Scene;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    constructor(scene: Phaser.Scene, minWidth = 50, maxWidth = 200, minHeight = 30, maxHeight = 150) {
        this.scene = scene;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }

    Preload() {
        this.scene.load.image('bubbleBody', 'assets/bubble-body.png'); // Main bubble container
        this.scene.load.image('bubbleArrow', 'assets/bubble-arrow.png'); // Arrow at the bottom
    }

    Create(
        Character: Phaser.GameObjects.Container,
        CharacterSprite: Phaser.GameObjects.Sprite,
        verticalOffset: number = 10 // Default offset value
    ) {
        const GameObjectFactory = this.scene.add;

        const PADDING = 10;

        // Create the main bubble body using the nineslice plugin
        const bubbleBody = GameObjectFactory.nineslice(
            0,
            0,
            this.minWidth,
            this.minHeight,
            'bubbleBody',
            12, // Offset for the corner slice
            10
        );
        bubbleBody.setOrigin(0.5, 0.5); // Set origin to the center
        bubbleBody.setVisible(false); // Initially hide the bubble
        Character.add(bubbleBody);

        // Create the arrow
        const bubbleArrow = GameObjectFactory.sprite(0, 0, 'bubbleArrow');
        bubbleArrow.setOrigin(0.5, 0); // Set origin to the top-center of the arrow
        bubbleArrow.setVisible(false); // Initially hide the arrow
        Character.add(bubbleArrow);

        // Create default empty text
        const bubbleText = GameObjectFactory.text(
            0,
            0,
            '',
            {
                fontSize: '12px',
                color: '#000',
                align: 'center',
                wordWrap: { width: this.maxWidth - 2 * PADDING },
            }
        );
        bubbleText.setOrigin(0.5, 0.5); // Center the text
        Character.add(bubbleText);

        // Adjust bubble size and position to fit text
        this.updateBubbleSize(bubbleBody, bubbleArrow, bubbleText, CharacterSprite, verticalOffset);

        // Handle user input
        const ChatBtn = document.getElementById('chatBtn');
        const ChatInput = document.getElementById('chatInput') as HTMLInputElement | null;

        ChatBtn?.addEventListener('click', () => {
            this.updateText(ChatInput, bubbleText, bubbleBody, bubbleArrow, CharacterSprite, verticalOffset);
        });

        document.addEventListener('keypress', (e) => {
            if (e.key == 't') {
                if (document.activeElement !== ChatInput && ChatInput) {
                    // focus element
                    ChatInput.focus();
                    ChatInput.value = ""
                }
            }
        })

        // Add listener for the Enter key
        ChatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.updateText(ChatInput, bubbleText, bubbleBody, bubbleArrow, CharacterSprite, verticalOffset);
            }

        });
    }

    updateText(
        ChatInput: HTMLInputElement | null,
        bubbleText: Phaser.GameObjects.Text,
        bubbleBody: Phaser.GameObjects.RenderTexture,
        bubbleArrow: Phaser.GameObjects.Sprite,
        CharacterSprite: Phaser.GameObjects.Sprite,
        verticalOffset: number
    ) {
        if (ChatInput && ChatInput.value !== "") {
            const newMessage = ChatInput.value.substring(0, 250); // Enforce max 250 characters
            bubbleText.setText(newMessage ?? "");

            // Ensure the bubble and its components are visible
            bubbleBody.setVisible(true);
            bubbleArrow.setVisible(true);
            bubbleText.setVisible(true);

            // Update bubble size and position based on new text
            this.updateBubbleSize(bubbleBody, bubbleArrow, bubbleText, CharacterSprite, verticalOffset);

            ChatInput.value = "";
        } else {
            // If empty string, hide the bubble
            this.hideBubble(bubbleBody, bubbleArrow, bubbleText);
        }

        // Hide the bubble after 3 seconds
        this.scene.time.delayedCall(3000, () => {
            this.hideBubble(bubbleBody, bubbleArrow, bubbleText);
        });
    }

    hideBubble(bubbleBody: Phaser.GameObjects.RenderTexture, bubbleArrow: Phaser.GameObjects.Sprite, bubbleText: Phaser.GameObjects.Text) {
        bubbleBody.setVisible(false);
        bubbleArrow.setVisible(false);
        bubbleText.setVisible(false);
    }

    updateBubbleSize(
        bubbleBody: Phaser.GameObjects.RenderTexture,
        bubbleArrow: Phaser.GameObjects.Sprite,
        bubbleText: Phaser.GameObjects.Text,
        CharacterSprite: Phaser.GameObjects.Sprite,
        verticalOffset: number
    ) {
        const textBounds = bubbleText.getBounds();

        // Calculate new dimensions
        const newWidth = Phaser.Math.Clamp(textBounds.width + 20, this.minWidth, this.maxWidth);
        const newHeight = Phaser.Math.Clamp(textBounds.height + 20, this.minHeight, this.maxHeight);

        // Resize the bubble body
        bubbleBody.resize(newWidth, newHeight);

        // Position the bubble body above the character with the vertical offset
        bubbleBody.setPosition(0, -CharacterSprite.height - newHeight / 2 - verticalOffset);

        // Reposition the text within the bubble
        bubbleText.setPosition(0, bubbleBody.y);

        // Reposition the arrow slightly above the bottom of the bubble
        bubbleArrow.setPosition(0, bubbleBody.y + newHeight / 2 - 5);
    }
}
