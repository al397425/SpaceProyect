const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;
const SHIP_OFFSET_HOR = 150;
const SHIP_OFFSET_VER = 90;

let btnStart;
let imgUfo;

let initState = {
    preload: preloadInit,
    create: createInit
};

function preloadInit() {
    game.load.image('craft', 'assets/imgs/craft.png');
    game.load.image('ufo', 'assets/imgs/ufo.png');
}

function createInit() {
    let textI = 'Left and right cursors move the shooter,\n';
    textI += 'and also horizontal movements of the mouse.\n';
    textI += 'Spacebar and mouse clicks fire the laser cannons.';
    textI += '\n\nClick on the spacecraft to start.';
    let styleI = {
        font: '20px Arial',
        fill: '#FFFFFF'
    };
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);

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
    let credits = game.add.text(TEXT_OFFSET_HOR, game.world.height - TEXT_OFFSET_VER, textC, styleC);
    credits.anchor.setTo(0, 1);

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;
    btnStart = game.add.button(posX, posY, 'craft', startPlay);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(2.0);
    ///////////////////////////
    btnStart = game.add.button(
        posX, posY, 'craft', clickStart);
    btnStart.checkWorldBounds = true;
    btnStart.events.onOutOfBounds.add(
        startPlay, this);
    ///////////////////////////

    posY = game.world.centerY;
    imgUfo = game.add.image(posX, posY, 'ufo');
    imgUfo.anchor.setTo(0.5, 0.5);
    imgUfo.scale.setTo(2.0);
}

function startPlay() {
    game.state.start('play');
}

const FREQUENCY = 1000 / 30;

function clickStart() {
    btnStart.inputEnabled = false;
    game.time.events.loop(
        FREQUENCY, moveButtonAndImage, this);
}
const DECREASE_Y = 8;
const DECREASE_X = 10;

function moveButtonAndImage() {
    btnStart.y -= DECREASE_Y;
    imgUfo.x -= DECREASE_X;
}