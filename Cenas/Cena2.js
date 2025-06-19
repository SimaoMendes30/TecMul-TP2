class Cena2 extends Phaser.Scene {
    constructor() {
        super("JogarJogo");
    }

    create() {
        const largura = this.sys.game.config.width;
        const altura = this.sys.game.config.height;

        this.blocoAtual = null;
        this.blocos = null;
        this.gameOver = false;
        this.colisaoAtiva = false;

        this.physics.world.setBounds(0, 0, largura, altura);
        this.cameras.main.setBounds(0, 0, largura, altura);

        const fundo = this.add.image(0, 0, "fundo").setOrigin(0, 0);
        fundo.setDisplaySize(largura, altura);

        this.blocos = this.physics.add.group();

        this.blocoBase = new Bloco(this, largura / 2, altura - 15, "bloco_inicial");
        this.blocoBase.setOrigin(0.5);
        this.blocoBase.pararMovimento();
        this.blocos.add(this.blocoBase);

        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.time.delayedCall(500, () => this.criarNovoBloco());
    }

    criarNovoBloco() {
        if (this.gameOver) return;

        this.colisaoAtiva = false;

        const ultimoBloco = this.blocos.getChildren()[this.blocos.getChildren().length - 1];
        const numBlocos = this.blocos.getLength();
        const escala = Math.max(0.6, 1 - numBlocos * 0.02);

        const largura = 100 * escala;
        const altura = 30 * escala;

        this.blocoAtual = new Bloco(this, 50, ultimoBloco.y - 60, "blocoadd");
        this.blocoAtual.setDisplaySize(largura, altura);

        const velocidade = Math.min(configuracoesJogo.velocidadeHorizontal + numBlocos * 8, 500);
        this.blocoAtual.setVelocityX(velocidade);
        this.blocoAtual.velocidadeOriginal = velocidade;

        this.blocoAtual.setCollideWorldBounds(true);
    }

    update() {
        if (this.gameOver || !this.blocoAtual) return;

        if (this.blocoAtual.body.velocity.y === 0) {
            if (this.blocoAtual.x >= 350) {
                this.blocoAtual.setVelocityX(-this.blocoAtual.velocidadeOriginal);
            } else if (this.blocoAtual.x <= 50) {
                this.blocoAtual.setVelocityX(this.blocoAtual.velocidadeOriginal);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclaEspaco)) {
            this.blocoAtual.ativarQueda();
            this.blocoAtual.setVelocityX(0);

            if (!this.colisaoAtiva) {
                this.physics.add.collider(this.blocoAtual, this.blocos, (blocoAtual, blocoBase) => {
                    if (this.gameOver || this.colisaoAtiva) return;

                    const blocosAtuais = this.blocos.getChildren();
                    const blocoAnterior = blocosAtuais[blocosAtuais.length - 1];

                    const margemErro = blocoAnterior.displayWidth * 0.35;
                    const diferenca = Math.abs(blocoAtual.x - blocoAnterior.x);

                    if (diferenca > margemErro) {
                        this.gameOver = true;
                        this.colisaoAtiva = true;
                        this.blocoAtual = null;
                        mostrarGameOverCena(this, this.blocos.getLength() - 1);
                        return;
                    }

                    blocoAtual.y = blocoAnterior.y - blocoAnterior.displayHeight;
                    blocoAtual.pararMovimento();
                    this.blocos.add(blocoAtual);

                    const efeito = this.add.sprite(blocoAtual.x + blocoAtual.displayWidth / 1.2, blocoAtual.y + blocoAtual.displayHeight / 2, "fumaca")
                    .setOrigin(0.7)
                    .setScale(0.5);

                    efeito.play("explosao_poeira");
                    efeito.once("animationcomplete", () => efeito.destroy());

                    this.blocoAtual = null;
                    this.colisaoAtiva = true;

                    if (blocoAtual.y <= 30) {
                        mostrarVitoriaCena(this);
                        return;
                    }

                    this.time.delayedCall(500, () => this.criarNovoBloco());
                });
            }
        }
    }

    mostrarGameOver() {
        const score = this.blocos.getLength() - 1;
        mostrarGameOverCena(this, score);
    }
}
