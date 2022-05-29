const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;
const SHIP_OFFSET_HOR = 150;
const SHIP_OFFSET_VER = 90;

let btnStart;
let btnStartB;
let imgUfo;
let btnAbout;
let stars;
let initState = {
    preload: preloadInit,
    create: createInit,
    update: updateInit
};

let WavesToPlay = 0;

function preloadInit() {
    game.load.image('playbtn', 'assets/imgs/button_play.png');
    //game.load.image('playbtnb', 'assets/imgs/button_play.png');
    game.load.image('aboutbtn', 'assets/imgs/button_about.png');
    game.load.image('ufo','assets/imgs/ufo.png');
    game.load.image('stars',
    'assets/imgs/stars.png');
    game.load.audio('menu',
    'assets/snds/menu.mp3');
}

function createInit() {
    createSoundsi();
    
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    let textI = 'Space Shooter \n';
    textI += '\n';
    textI += 'The amazing game by Susana Puig Alcaraz & Ausias Garcia Torres\n';
    
    let styleI = {
        font: '20px Arial',
        fill: '#FFFF00'
    };
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER, textI, styleI);

    

    let posX = game.world.width - SHIP_OFFSET_HOR;
    let posY = game.world.height - SHIP_OFFSET_VER;
    btnStart = game.add.button(posX-450, posY-50, 'playbtn', startPlay);
    btnStart.anchor.setTo(0.5, 0.5);
    btnStart.scale.setTo(1.1);
    //button Part B
    /*btnStartB = game.add.button(posX-650, posY-50, 'playbtnb', startPlayB);
    btnStartB.anchor.setTo(0.5, 0.5);
    btnStartB.scale.setTo(1.1);*/

    let posXAbout = game.world.width - SHIP_OFFSET_HOR;
    let posYAbout = game.world.height - SHIP_OFFSET_VER;
    btnAbout = game.add.button(posX-50, posY-50, 'aboutbtn', startAbout);
    btnAbout.anchor.setTo(0.5, 0.5);
    btnAbout.scale.setTo(1.5);
    ///////////////////////////
    /*btnStart = game.add.button(
        posX, posY, 'craft', clickStart);
    btnStart.checkWorldBounds = true;
    btnStart.events.onOutOfBounds.add(
        startPlay, this);
    *////////////////////////////

    posY = game.world.centerY;
    /*imgUfo = game.add.image(posX, posY, 'ufo');
    imgUfo.anchor.setTo(0.5, 0.5);
    imgUfo.scale.setTo(2.0);*/
    soundMenuMusic.play();
    soundMenuMusic.volume = 0.5;
}
function createSoundsi() {
    soundMenuMusic = game.add.audio('menu');
}
function updateInit(){
    stars.tilePosition.y += 1;
}

function startPlay() {
    game.state.start('play');
    soundMenuMusic.stop();
}
/*function startPlayB() {
    game.state.start('playB');
}*/

function startAbout() {
    game.state.start('about');
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