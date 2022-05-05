const TEXT_OFFSET_HOR = 40;
const TEXT_OFFSET_VER = 40;
const SHIP_OFFSET_HOR = 150;
const SHIP_OFFSET_VER = 90;

let btnStart;
let imgUfo;
let btnAbout;
let stars;
let initState = {
    preload: preloadInit,
    create: createInit,
    update: updateInit
};

function preloadInit() {
    game.load.image('playbtn', 'assets/imgs/button_play.png');
    game.load.image('aboutbtn', 'assets/imgs/button_about.png');
    game.load.image('ufo','assets/imgs/ufo.png');
    game.load.image('stars',
    'assets/imgs/stars.png');
}

function createInit() {
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
    imgUfo = game.add.image(posX, posY, 'ufo');
    imgUfo.anchor.setTo(0.5, 0.5);
    imgUfo.scale.setTo(2.0);
}
function updateInit(){
    stars.tilePosition.y += 1;
}

function startPlay() {
    game.state.start('play');
}

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








//
//funcion para coger eventos de teclado (p4)
function getKeyboardInput(e){
    if(e.keyCode>=Phaser.Keyboard.A && e.keyCode<=Phaser.Keyboard.Z){
        //que mire la letra que has pulsado y si no hay nave activa mire si alguna empieza por esa letra
        //y la pase a activa, si ya había una activa lo que comprueba es si la siguiente letra a escribir 
        //y la escrita se corresponden y si lo hacen se mira cuál es la siguiente letra a escribir o se
        //destruye la nave si se ha escrito la palabra completa
    }

}
/*
//Crea un controlador (debe ir bajo createPlay) que crea un controlador para todas las teclas            
function createKeyControls(){
    cursor = game.input.keyboard.createCursorKeys();
}


//al final de createCraft()
game.physics.arcade.enable(craft);

//Y en el updatePlay() se pone
manageCraftMovements();

//Hay que usar 
craft.body.colliderWorldBounds = true;


*/ 

//funcion processLetter de p4. Item es lo que en p4 recibió
//el click (aquí sería la nave destruida)
function destroyOWP(item, pointer){
    item.destroy(); //libera memoria
    //kill() lo quita de la display list pero no del grupo (¿sería mejor usar esto?)
    //es decir destroy hace que no pueda volver a aparecer pero kill/revive puede hacer que se 
    //vuelva  a usar
}

//constantes que se necesitarán 

//Para que se acabe la ola de ataque x naves 
//habrán sido destruidas 
const NAVES_NIVEL = 5; //¿se podría ir cambiando esto en cada ola/nivel o para eso mejor que no sea const?


//Lo que necesitará el updateGame:
//moverNaves()
//Comprobar si has escrito algo
//Comprobar si hay naves apuntadas / apuntar y escribir hasta que sean destruidas o
//comprobar colisiones de naves con el jugador / game over
//comprobar si se ha cumplido condición de victoria

//Si se hace el overState aparte
//game.state.add('over', overState);
//let overState = {create:createOver};

//JS object
//let OWP = {};
//OWP.speed =;
//OWP.direction =;

//create timer object
//timer = game.time.create(false);
//Set the frequency and the handler ex call spawn() every 1.5s
//timer.loop(1500, spawn);
//timer.start();

//function spawn que ya esá arriba comprimida en game.time.events.repeat(1.5*Phaser.....)

//let craft; //Player
//const HUD_HEIGHT = 50;

//en preloadPlay()
//game.load.image('craft','assets/img/craft.png');

/*function creater Craft(){
    let x=game.worl.centerX;
    let y=game.world.height - HUD_HEIGHT;
    craft = game.add.sprite(x,y,'craft');
    craft.anchor.setTo(0.5,0.5);

}



Crear UFOs (p5)
Declare a global variable for a new group of sprites
and a constant for its size:
const UFOS_GROUP_SIZE = 200;
let ufos;
Next, in preloadPlay(), load the UFO image:
game.load.image('ufo',
'assets/imgs/ufo.png');
Then, at the end of createPlay(), invoke the creation function:
createUfos(UFOS_GROUP_SIZE);
And, below createPlay(), define this function:
function createUfos(number) {
ufos = game.add.group();
ufos.enableBody = true;
ufos.createMultiple(number, 'ufo');
ufos.callAll('events.onOutOfBounds.add',
'events.onOutOfBounds', resetMember);
ufos.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
ufos.setAll('checkWorldBounds', true);
}





*/