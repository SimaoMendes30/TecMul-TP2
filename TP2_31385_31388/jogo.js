window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 450,
        height: 900,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        backgroundColor: 0x000000,
        scene: [Cena1, Cena2],
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: configuracoesJogo.gravidade },
                debug: false
            }
        },
        parent: "jogo-container"
    };

    new Phaser.Game(config);
};
