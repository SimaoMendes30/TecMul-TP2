function mostrarVitoriaCena(scene) {
    scene.gameOver = true;

    const largura = scene.sys.game.config.width;
    const altura = scene.sys.game.config.height;

    const fundo = scene.add.image(0, 0, "vitoria").setOrigin(0, 0);
    fundo.setDisplaySize(largura, altura);

    scene.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.4);

    adicionarInfoFinais(scene, largura, altura, "Missão Cumprida!", "#00ff00");
    adicionarBotoesFinais(scene, largura, altura);
}

function mostrarGameOverCena(scene, score) {
    scene.gameOver = true;
    scene.blocoAtual = null;

    const largura = scene.sys.game.config.width;
    const altura = scene.sys.game.config.height;

    const fundo = scene.add.image(0, 0, "game_over_fundo").setOrigin(0, 0);
    const proporcaoX = largura / fundo.width;
    const proporcaoY = altura / fundo.height;
    const escala = Math.max(proporcaoX, proporcaoY);

    fundo.setScale(escala);
    fundo.setOrigin(0.5);
    fundo.setPosition(largura / 2, altura / 2);

    scene.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.4);

    adicionarInfoFinais(scene, largura, altura, "O Prédio Caiu!", "#ff4444");
    adicionarBotoesFinais(scene, largura, altura);
}

function adicionarInfoFinais(scene, largura, altura, mensagemTitulo, corTitulo) {

    scene.add.rectangle(largura / 2, altura / 2, largura, altura, 0x000000, 0.4);

    scene.add.text(largura / 2, altura * 0.25, mensagemTitulo, {
        fontSize: '32px',
        fill: corTitulo,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5);
 
    const score = scene.blocos.getLength() - 1;
    scene.add.text(largura / 2, altura * 0.35, `Blocos: ${score}`, {
        fontSize: '24px',
        fill: '#ffff00',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
}

function adicionarBotoesFinais(scene, largura, altura) {
    const botaoRestart = scene.add.image(largura / 2, altura * 0.5, "botao_recomecar")
        .setOrigin(0.5)
        .setScale(0.3)
        .setInteractive({ useHandCursor: true });

    botaoRestart.on("pointerdown", () => {
        scene.scene.restart();
    });

    const botaoInicio = scene.add.image(largura / 2, altura * 0.6, "botao_inicio")
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive({ useHandCursor: true });

    botaoInicio.on("pointerdown", () => {
        scene.scene.start("InicioJogo");
    });
}
