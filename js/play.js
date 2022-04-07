let craft;
const HUD_HEIGHT = 50;
let cursors;
const CRAFT_VELOCITY = 150;
let stars;
const LASERS_GROUP_SIZE = 40;
let lasers;
const LEFT_LASER_OFFSET_X = 11;
const RIGHT_LASER_OFFSET_X = 12;
const LASERS_OFFSET_Y = 10;
const LASERS_VELOCITY = 500;
let fireButton;
let soundLaser;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
};

function preloadPlay() {

    game.load.image('craft',
        'assets/imgs/craft.png');
    game.load.image('stars',
        'assets/imgs/stars.png');
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

}

function createSounds() {
    soundLaser = game.add.audio('sndlaser');
}

function updatePlay() {
    manageCraftMovements();
    stars.tilePosition.y += 1;
    manageCraftShots();
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