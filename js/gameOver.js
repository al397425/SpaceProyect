
let gameOverState = {
    preload: preloadgameOver,
    create: creategameOver,
    update: updategameOver
};

function preloadgameOver() {
    game.load.image('startbtn', 'assets/imgs/button_start-screen.png');
    game.load.image('stars',
    'assets/imgs/stars.png');
}

function creategameOver() {
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    let textI = 'Game Over,\n';

    textI += '\n\n Try again.';
    let styleI = {
        font: '30px Arial',
        fill: '#FFFF00'
    };
     instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);

     let textC = ' Accuracy: \n' +Math.floor(chartyped*100/chartotal);
    /*textC += ' 100 * number of correctly typed characters / number\n';
    textC += 'of typed characters\n';*/

    let styleC = {
        font: '30px Arial',
        fill: '#FF0000'
    };
     credits = game.add.text(TEXT_OFFSET_HOR, game.world.height - TEXT_OFFSET_VER, textC, styleC);
    credits.anchor.setTo(0, 1);

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;
    btnStart = game.add.button(posX-350, posY-300, 'startbtn', startInit);
    btnStart.anchor.setTo(0.25, 0.25);
    btnStart.scale.setTo(2.0);
    ///////////////////////////
    /*btnStart = game.add.button(
        posX, posY, 'craft', clickStart);
    btnStart.checkWorldBounds = true;
    btnStart.events.onOutOfBounds.add(
        startInit, this);
   */ ///////////////////////////

    posY = game.world.centerY;
}
function updategameOver(){
    stars.tilePosition.y += 1;
}
function startInit() {
    game.state.start('init');
}



function clickStart() {
    btnStart.inputEnabled = false;
    game.time.events.loop(
        FREQUENCY, moveButtonAndImage, this);
}


/*function moveButtonAndImage() {
    btnStart.y -= DECREASE_Y;
    imgUfo.x -= DECREASE_X;
}*/