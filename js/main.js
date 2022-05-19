const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;

let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage');

// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('init', initState);
    game.state.add('play', playState);
    //game.state.add('playB', playStateB);
    game.state.add('hof', hofState);
    game.state.add('gameOver', gameOverState);
    game.state.add('about', aboutState);
    game.state.add('win', winState);
    game.state.start('init');
}
