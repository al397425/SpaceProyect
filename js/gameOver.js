
let gameOverState = {
    preload: preloadgameOver,
    create: creategameOver
};

function preloadgameOver() {
    game.load.image('craft', 'assets/imgs/craft.png');
    game.load.image('ufo', 'assets/imgs/ufo.png');
}

function creategameOver() {
    let textI = 'Game Over,\n';
    textI += 'Game Over 2.\n';
    textI += 'Game Over 3.';
    textI += '\n\nGame Over.';
    let styleI = {
        font: '20px Arial',
        fill: '#FFFFFF'
    };
     instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);

    let textC = 'Credits:\n';
    textC += '* Original craft pic created by "Fran" (Desarrollo XNA).\n';
    textC += '* Original UFO pic created by "0melapics" (Freepik.com).\n';
    textC += '* Original laser pic from Phaser tutorial "Invaders".\n';
    textC += '* Blast animation from Phaser tutorial "Invaders".\n';
    textC += '* Blast sound created by "dklon" (OpenGameArt.Com).\n';
    textC += '* Laser sound created by "dklon" (OpenGameArt.Com).';
    let styleC = {
        font: '16px Arial',
        fill: '#FF0000'
    };
     credits = game.add.text(TEXT_OFFSET_HOR, game.world.height - TEXT_OFFSET_VER, textC, styleC);
    credits.anchor.setTo(0, 1);

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;
    btnStart = game.add.button(posX, posY, 'craft', startInit);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(2.0);
    ///////////////////////////
    btnStart = game.add.button(
        posX, posY, 'craft', clickStart);
    btnStart.checkWorldBounds = true;
    btnStart.events.onOutOfBounds.add(
        startInit, this);
    ///////////////////////////

    posY = game.world.centerY;
    imgUfo = game.add.image(posX, posY, 'ufo');
    imgUfo.anchor.setTo(0.5, 0.5);
    imgUfo.scale.setTo(2.0);
}

function startInit() {
    game.state.start('init');
}



function clickStart() {
    btnStart.inputEnabled = false;
    game.time.events.loop(
        FREQUENCY, moveButtonAndImage, this);
}


function moveButtonAndImage() {
    btnStart.y -= DECREASE_Y;
    imgUfo.x -= DECREASE_X;
}