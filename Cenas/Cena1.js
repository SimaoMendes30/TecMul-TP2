class Cena1 extends Phaser.Scene {
    constructor() {
        super("InicioJogo");
    }

    preload() {
        this.load.image("titulo_jogo", "Assets/titulo.png");
        this.load.image("menu_fundo", "Assets/menu_inicial.png");
        this.load.image("fundo", "Assets/fundo.png");
        this.load.image("bloco_inicial", "Assets/bloco_inicial.png");
        this.load.image("blocoadd", "Assets/blocoadd.png");
        this.load.spritesheet("fumaca", "Assets/fumaca.png", {
        frameWidth: 170,
        frameHeight: 147
        });

        this.load.image("game_over_fundo", "Assets/game_over.png");
        this.load.image("vitoria", "Assets/vitoria.png");

        this.load.image("botao_comecar", "Assets/botao_comecar.png");
        this.load.image("botao_instrucao", "Assets/botao_instrucao.png");
        this.load.image("botao_fechar", "Assets/botao_fechar.png");

        this.load.image("botao_recomecar", "Assets/botao_recomecar.png");
        this.load.image("botao_inicio", "Assets/botao_inicio.png");
    }

    create() {
        const largura = this.sys.game.config.width;
        const altura = this.sys.game.config.height;

        const fundo = this.add.image(0, 0, "menu_fundo").setOrigin(0, 0);
        fundo.setDisplaySize(largura, altura);

        this.add.image(largura / 2, altura * 0.22, "titulo_jogo")
        .setOrigin(0.5)
        .setScale(0.4);

        const botao = this.add.image(largura / 2, altura * 0.55, "botao_comecar")
            .setOrigin(0.5)
            .setScale(0.3)
            .setInteractive({ useHandCursor: true });

        this.anims.create({
        key: "explosao_poeira",
        frames: this.anims.generateFrameNumbers("fumaca", { start: 0, end: 7 }),
        frameRate: 15,
        repeat: 0
        });

        botao.on("pointerdown", () => this.scene.start("JogarJogo"));

        const botaoInstrucao = this.add.image(largura / 2, altura * 0.65, "botao_instrucao")
            .setOrigin(0.5)
            .setScale(0.2)
            .setInteractive({ useHandCursor: true });

        botaoInstrucao.on("pointerdown", () => {
            mostrarInstrucoes(this, largura, altura);
        });
    }
}

function mostrarInstrucoes(scene, largura, altura) {

    const fundo = scene.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.7);

    const caixa = scene.add.rectangle(largura / 2, altura / 2, largura * 0.8, altura * 0.5, 0xffffff, 1)
        .setStrokeStyle(2, 0xFFC627);

    const texto = scene.add.text(largura / 2, altura / 2,
        "Estás encarregado de construir o próximo arranha-céus da cidade.\n" +
        "Bloco a bloco, tens de os largar no momento certo para manteres o equilíbrio.\n\n" +
        "Usa a tecla ESPAÇO para deixar cair cada bloco.\n" +
        "À medida que sobes, os blocos tornam-se mais pequenos e movem-se mais depressa,\n" +
        "tornando o desafio cada vez maior.\n\n" +
        "Consegues construir o prédio mais alto possível sem deixá-lo cair?",
        {
            fontSize: "20px",
            fill: "#000000",
            fontFamily: "Arial",
            wordWrap: { width: largura * 0.7 }
        }
    ).setOrigin(0.5);

    const botaoFechar = scene.add.image(largura / 2, altura * 0.75, "botao_fechar")
    .setOrigin(0.5)
    .setScale(0.15)
    .setInteractive({ useHandCursor: true });

    botaoFechar.on("pointerdown", () => {
        fundo.destroy();
        caixa.destroy();
        texto.destroy();
        botaoFechar.destroy();
    });
}
