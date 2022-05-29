
let winState = {
    preload: preloadWin,
    create: createWin,
    update: updateWin
};

function preloadWin() {
    game.load.image('startbtn', 'assets/imgs/button_start-screen.png');
    game.load.image('stars',
    'assets/imgs/stars.png');
    
}

function createWin() {
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    let textI = 'win,\n';
    textI += 'win 2.\n';
    textI += 'win 3.';
    textI += '\n\nwin.';
    let styleI = {
        font: '20px Arial',
        fill: '#FFFF00'
    };
     instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER-600, textI, styleI);

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
   /* ///////////////////////////
    btnStart = game.add.button(
        posX, posY, 'craft', clickStart);
    btnStart.checkWorldBounds = true;
    btnStart.events.onOutOfBounds.add(
        startInit, this);*/
    ///////////////////////////

    posY = game.world.centerY;
}
function updateWin(){
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

/*
function moveButtonAndImage() {
    btnStart.y -= DECREASE_Y;
    imgUfo.x -= DECREASE_X;
}*/