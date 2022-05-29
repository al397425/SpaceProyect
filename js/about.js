
let aboutState = {
    preload: preloadAbout,
    create: createAbout,
    update: updateAbout
};

function preloadAbout() {
    game.load.image('startbtn', 'assets/imgs/button_start-screen.png');
    game.load.image('stars',
    'assets/imgs/stars.png');
    
}

function createAbout() {
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
        let textI = 'In this game you have to destroy spaceships,\n';
        textI += 'You have to write the words that appear in the screen\n';
        textI += '\n\nGood Luck my friend.';
        let styleI = {
            font: '20px Arial',
            fill: '#FFFF00'
        };
         instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);

     

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;
    btnStart = game.add.button(posX-350, posY-200, 'startbtn', startInit);
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
function updateAbout(){
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