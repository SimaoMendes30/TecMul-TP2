class Bloco extends Phaser.Physics.Arcade.Sprite {
    constructor(cena, x, y, textura) {
        super(cena, x, y, textura);

        cena.add.existing(this);
        cena.physics.add.existing(this);

        this.setDisplaySize(100, 30);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    ativarQueda() {
        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        this.body.moves = true;

        this.scene.time.delayedCall(1000, () => {
            if (
                this.scene.blocoAtual === this &&
                !this.scene.colisaoAtiva &&
                !this.scene.gameOver
            ) {
                this.scene.mostrarGameOver();
            }
        });
    }

    pararMovimento() {
        this.setVelocity(0, 0);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.moves = false;
    }
}
