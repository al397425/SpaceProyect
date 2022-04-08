let craft;
const HUD_HEIGHT = 50;
let cursors;
const CRAFT_VELOCITY = 150;

const LASERS_GROUP_SIZE = 40;
//let lasers;
const LEFT_LASER_OFFSET_X = 11;
const RIGHT_LASER_OFFSET_X = 12;
const LASERS_OFFSET_Y = 10;
const LASERS_VELOCITY = 500;
let fireButton;
let soundLaser;
const ENEMIES_GROUP_SIZE = 5;
let enemies
let waves = 3;
let actualWave = 0;

//Random appearences
const TIMER_RHYTHM=0.1*Phaser.Timer.SECOND;
let currentUfoProbability;
let currentUfoVelocity;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
};

function preloadPlay() {
    game.load.image('stars',
    'assets/imgs/stars.png');
    game.load.image('craft',
        'assets/imgs/craft.png');
    game.load.image('enemies',
        'assets/imgs/ufo.png');
    game.load.image('laser',
        'assets/imgs/laser.png');
    game.load.audio('sndlaser',
        'assets/snds/laser.wav');
}

function createPlay() {
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    createCraft();
    createKeyControls();
    createLasers(LASERS_GROUP_SIZE);
    createSounds();
    createEnemies(ENEMIES_GROUP_SIZE);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    image = game.add.sprite(400, 200, 'ufo');

    game.physics.enable(image, Phaser.Physics.ARCADE);
    /*
    //  This gets it moving
    image.body.velocity.setTo(200, 200);
    */
    //  This makes the game world bounce-able
    image.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    image.body.bounce.set(0.8);

    image.body.gravity.set(0, 180);

}

function createEnemies(number) {
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.createMultiple(number, 'ufo');
    currentEnemyProbability = 0.2;
    currentEnemyVelocity = 50;
    game.time.events.loop(
    TIMER_RHYTHM, activateEnemy, this);
}

function activateEnemy() {
if (Math.random() <
currentEnemyProbability) {
let enemy = enemies.getFirstExists(false);
if (enemy) {
let gw = game.world.width;
let uw = enemy.body.width;
let w = gw - uw;
let x = Math.floor(Math.random()*w);
let z = uw / 2 + x;
enemy.reset(z, 0);
enemy.body.velocity.x = 0;
enemy.body.velocity.y =
currentEnemyVelocity;

//Physics
/*
    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    image = game.add.sprite(400, 200, 'ufo');
*/
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    /*
    //  This gets it moving
    image.body.velocity.setTo(200, 200);
    */
    //  This makes the game world bounce-able
    enemy.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    enemy.body.bounce.set(0.8);

    enemy.body.gravity.set(0, 180);

}
}
}

function createSounds() {
    soundLaser = game.add.audio('sndlaser');
}

function updatePlay() {
    manageCraftMovements();
    stars.tilePosition.y += 1;
    manageCraftShots();
    manageColision();
    manageCompleteWaves();
}

function manageColision(){
    /*game.physics.arcade.overlap(
        lasers,enemies,laserHitsUfo,null,this);*/
    game.physics.arcade.overlap(
        craft,enemies,enemyHitsCraft,null,this);

}

function manageCompleteWaves(){
    if (actualWave > waves){
        enemy.kill(); //falta hacer que se generen los enemigos
        craft.kill();
        console.log("Colision");
        game.state.start('win');
    }
}

function enemyHitsCraft(craft, enemy) {
    enemy.kill(); //falta hacer que se generen los enemigos
    craft.kill();
    console.log("Colision");
    game.state.start('gameOver');
    }
    
function manageCraftShots() {
    if (fireButton.justDown ||
        game.input.mousePointer.leftButton.justPressed(30))
        fireLasers();
}

function fireLasers() {
    let lx = craft.x - LEFT_LASER_OFFSET_X;
    let rx = craft.x + RIGHT_LASER_OFFSET_X;
    let y = craft.y - LASERS_OFFSET_Y;
    let vy = -LASERS_VELOCITY;
    let laserLeft = shootLaser(lx, y, vy);
    let laserRight = shootLaser(rx, y, vy);
    if (laserLeft || laserRight)
        soundLaser.play();
}

function shootLaser(x, y, vy) {
    let shot = lasers.getFirstExists(false);
    if (shot) {
        shot.reset(x, y);
        shot.body.velocity.y = vy;
    }
    return shot;
}

function manageCraftMovements() {
    craft.body.velocity.x = 0;
    if (cursors.left.isDown ||
        game.input.speed.x < 0)
        craft.body.velocity.x = -CRAFT_VELOCITY;
    else if (cursors.right.isDown ||
        game.input.speed.x > 0)
        craft.body.velocity.x = CRAFT_VELOCITY;
}

function startHOF() {
    game.state.start('hof');
}

function createCraft() {
    let x = game.world.centerX;
    let y = game.world.height - HUD_HEIGHT;
    craft = game.add.sprite(x, y, 'craft');
    craft.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(craft);
    craft.body.collideWorldBounds = true;
}


function createKeyControls() {
    cursors =
        game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
}

function createLasers(number) {
    lasers = game.add.group();
    lasers.enableBody = true;
    lasers.createMultiple(number, 'laser');
    lasers.callAll('events.onOutOfBounds.add',
        'events.onOutOfBounds', resetMember);
    lasers.callAll(
        'anchor.setTo', 'anchor', 0.5, 1.0);
    lasers.setAll('checkWorldBounds', true);
}

function resetMember(item) {
    item.kill();
}