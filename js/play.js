let craft;
let flag = true;
let flag2 = false;
let c = 0;
const HUD_HEIGHT = 50;
let cursors;
const CRAFT_VELOCITY = 150;
let w1 = 0;
let w2 = 0; //arrayposition of chword
let w4 = 0; //arrayposition of text show in screen (textwords)
let w3 = 0;
let textwords = [];
let textwordsR = [];
let textwordsF = [];
let textwordsFch = [];
let textoTemporal = [];
let textoTemporalR = [];
let textoTemporalF = [];
let textoTemporalFch = [];
let rates = [];
let fireButton;
const ENEMIES_GROUP_SIZE = 3;
const ENEMIES_GROUP_SIZE_REPLICATOR = 1;
const ENEMIES_GROUP_SIZE_CHILDREN = 1;
const ENEMIES_GROUP_SIZE_CHILDREN_FAN = 4;
let waves = 3;
let actualWave = 0;
let WaveConfig;
let actualrate;
let actualspeed;
let WavesData = ['assets/levels/WavesPartA.json'];
let texto;
let words;
let wordsR;
let wordsF;
let wordsFch;
let enemies;
let enemiesR;
let enemiesF;
let enemiesFch;
let image;
let styleI;
let styleIR
let random;
let enemy;
let enemyR;
let enemyF;
let enemyFch;
let killcount = 0;
let killcountTotal = 0;
let treshold = 15;
let chartyped; //gameover screen
let chartotal; //gameover screen
let PartA = 0;
let PartB = 1;
let CompletedGame = 0;
styleI = {
    font: '20px Arial',
    fill: '#FFFF00'
};

styleIR = {
    font: '20px Arial',
    fill: '#FF0000'
};


let word = [];
let wordCh = ['a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'o', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z'
];

let wordFan = ["accompany", "example", "zenat", "banish", "withdraw",
    "negotiation", "responsibility", "communication",
    "judicial", "qualification", "fascinate",
    "liberty", "kitchen", "goalkeeper", "transform",
    "orientation", "opposition", "island", "xenoblade",
    "syndrome", "horseshoe", "uncertainty", "nationalism",
    "objective", "dressing", "misplace", "zap"
];

var correct = [];

let currentEnemiesNum = 0;
let currentEnemiesNumFan = 0;
let currentEnemiesNumChF = 0;
let currentEnemiesNumCh = 0;
let currentEnemiesNumReplicator = 0;
let lockedWord = -1; //para que una vez empiezas una palabra no te deje otras
let lockedWordR = -1; //para que una vez empiezas una palabra no te deje otras 
let numeroIter = 0;
let numeroIterR = 0;
let numeroIterch = 0;
let numeroIterF = 0;
let numeroIterchF = 0;
let instructions;
let screenText;


//Random appearences
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
let currentUfoProbability;
let currentUfoVelocity;

let playState = {
    preload: preloadPlay,
    create: createPlay,
    update: updatePlay
};

var timer;
var timerR;
var timerch;
var timerchF;
var timerF;
var timetimerch;
var totaltime = 2;
var totaltimeR = 2;
var totaltimeF = 2;
let timeTimer = 0;
let timeTimerR = 0;
let timeTimerF = 0;
let timetimerchF = 0;


function preloadPlay() {
    game.load.image('stars',
        'assets/imgs/stars.png');
    game.load.image('craft',
        'assets/imgs/craft.png');
    game.load.image('enemies',
        'assets/imgs/ufo.png');
    game.load.image('replicator',
        'assets/imgs/Bigufo.png');
    game.load.image('Fan',
        'assets/imgs/Fan.png');
    game.load.image('FanCh',
        'assets/imgs/FanCH.png');
    game.load.image('laser',
        'assets/imgs/laser.png');
    game.load.audio('sndlaser',
        'assets/snds/laser.mp3');
    game.load.audio('stage',
        'assets/snds/stage.mp3');
    loadWaves(WavesToPlay);

}

function loadWaves(Wave) {
    game.load.text('WavesPartA', ' assets/levels/WavesPartA.json');
}

function createPlay() {
    createSounds();
    stageMusic.play();
    stageMusic.volume = 0.6;
    if (CompletedGame == 1) {
        let enemies;
        enemies = game.add.group();
        enemies.enableBody = true;
    }
    //reset variables to play again
    chartotal = 0; //game over screen
    chartyped = 0; //game over screen
    totaltime = 0;
    totaltimeR = 0;
    killcount = 0;
    killcountTotal = 0;
    timeTimer = 0;
    timetimerch = 0;
    numeroIter = 0;
    numeroIterch = 0;
    numeroIterR = 0;
    numeroIter = 0;
    numeroIterchF = 0;
    random = Math.floor(Math.random() * 27);
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    createCraft();
    createKeyControls();

    createkeyboard();

    levelData = JSON.parse(game.cache.getText('WavesPartA'));
    if (CompletedGame == 0) {

        enemies = game.add.group();

        enemies.enableBody = true;
    }
    if (gamestate == PartB) {
        if (CompletedGame == 1) {
            let enemiesR;
            let enemiesF;
            let enemiesFch;

        }
        enemiesR = game.add.group();
        enemiesR.enableBody = true;
        wordsR = game.add.group();

        enemiesF = game.add.group();
        enemiesF.enableBody = true;
        wordsF = game.add.group();

        enemiesFch = game.add.group();
        enemiesFch.enableBody = true;
        wordsFch = game.add.group();
    }
    words = game.add.group();

    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    timerTotal = game.time.create(false);
    timerTotal.loop(1000, updateCounterTotal, this);
    if (gamestate == PartB) {
        timerR = game.time.create(false);
        timerR.loop(1000, updateCounterCh, this);
        timerch = game.time.create(false);
        timerch.loop(1000, updateCounterCh, this);
        //Fan
        timerF = game.time.create(false);
        timerF.loop(1000, updateCounterF, this);
        timerchF = game.time.create(false);
        timerchF.loop(1000, updateCounterF, this);
    }

    createWaves();
    game.input.keyboard.addCallbacks(this, null, null, keypressed);

    textI = "Score: " + killcountTotal + "\n Time: " + totaltime + "\n Wave: " + actualWave + "\n";

    screenText = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER + 150, textI, styleI);

}

function updateCounter() {
    timeTimer++;
    timeTimerR++;
    timeTimerF++;

}

function updateCounterTotal() {
    totaltime++;
}

function updateCounterCh() {
    timetimerch++;
}


function updateCounterF() {
    timetimerchF++;
}

function createEnemies(i) {

    if (CompletedGame == 1) {
        let enemy;
    }
    random = Math.floor(Math.random() * 27);
    enemy = game.add.sprite(50 * i, 50, 'ufo');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.enableBody = true;
    enemy.exists = true;
    enemy.body.bounce.set(0.8);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemies[i] = enemy;
    textwords[i] = (word[w1][random]);
    textoTemporal[i] = game.add.text(enemy.x + treshold, enemy.y + treshold, textwords[i], styleI);
    words[i] = textoTemporal[i];
}

function createEnemiesReplicator(i) {

    random = Math.floor(Math.random() * 27);
    enemyR = game.add.sprite(50 * i, 50, 'Bigufo');
    game.physics.enable(enemyR, Phaser.Physics.ARCADE);
    enemyR.enableBody = true;
    enemyR.exists = true;
    enemyR.body.bounce.set(0.8);
    enemyR.body.collideWorldBounds = true;
    enemyR.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemiesR[i] = enemyR;
    textwordsR[i] = (word[w1][random]);

    textoTemporalR[i] = game.add.text(enemyR.x + treshold, enemyR.y + treshold, textwordsR[i], styleIR);
    wordsR[i] = textoTemporalR[i];

}

function createEnemiesFan(i) {

    random = Math.floor(Math.random() * 27);
    enemyF = game.add.sprite(20 * i, 20, 'Fan');
    enemyF.scale.setTo(0.15, 0.15);
    game.physics.enable(enemyF, Phaser.Physics.ARCADE);
    enemyF.enableBody = true;
    enemyF.exists = true;
    enemyF.body.bounce.set(0.8);
    enemyF.body.collideWorldBounds = true;
    enemyF.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemiesF[i] = enemyF;
    textwordsF[i] = (wordFan[random]);
    textoTemporalF[i] = game.add.text(enemyF.x + treshold, enemyF.y + treshold, textwordsF[i], styleIR);
    wordsF[i] = textoTemporalF[i];
}

function createEnemiesFanCh(i) {

    random = Math.floor(Math.random() * 27);
    enemyFch = game.add.sprite(50 * i, 50, 'FanCh');
    enemyFch.scale.setTo(0.1, 0.1);
    game.physics.enable(enemyFch, Phaser.Physics.ARCADE);
    enemyFch.enableBody = true;
    enemyFch.exists = true;
    enemyFch.body.bounce.set(0.8);
    enemyFch.body.collideWorldBounds = true;
    enemyFch.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemiesFch[i] = enemyFch;
    textwordsFch[i] = (wordCh[random]);
    textoTemporalFch[i] = game.add.text(enemyFch.x + treshold, enemyFch.y + treshold, textwordsFch[i], styleIR);
    wordsFch[i] = textoTemporalFch[i];

}


function moveText() {

    for (var i = 0; i <= currentEnemiesNum - 1; i++) {
        if (enemies[i] != undefined && enemies[i].body != null) {

            words[i].x = Math.floor(enemies[i].body.x - treshold - treshold / 4);
            words[i].y = Math.floor(enemies[i].body.y - treshold - treshold / 4);
            game.physics.arcade.overlap(
                craft, enemies[i], enemyHitsCraft, null, this);
        }
    }

    for (var i = 0; i <= currentEnemiesNumReplicator - 1; i++) {
        if (gamestate == PartB) {

            if (enemiesR[i] != undefined && enemiesR[i].body != null) {

                for (var i = 0; i <= currentEnemiesNumReplicator - 1; i++) {
                    wordsR[i].x = Math.floor(enemiesR[i].body.x + treshold);
                    wordsR[i].y = Math.floor(enemiesR[i].body.y + treshold);
                    game.physics.arcade.overlap(
                        craft, enemiesR[i], enemyHitsCraft, null, this);


                }
            }
        }
    }
    for (var i = 0; i <= currentEnemiesNumFan - 1; i++) {
        if (gamestate == PartB) {

            if (enemiesF[i] != undefined && enemiesF[i].body != null) {

                for (var i = 0; i <= currentEnemiesNumFan - 1; i++) {
                    wordsF[i].x = Math.floor(enemiesF[i].body.x + treshold);
                    wordsF[i].y = Math.floor(enemiesF[i].body.y + treshold);
                    game.physics.arcade.overlap(
                        craft, enemiesF[i], enemyHitsCraft, null, this);


                }
            }
        }
    }
    for (var i = 0; i <= currentEnemiesNumChF - 1; i++) {
        if (gamestate == PartB) {

            if (enemiesFch[i] != undefined && enemiesFch[i].body != null) {

                for (var i = 0; i <= currentEnemiesNumChF - 1; i++) {
                    wordsFch[i].x = Math.floor(enemiesFch[i].body.x + treshold);
                    wordsFch[i].y = Math.floor(enemiesFch[i].body.y + treshold);
                    game.physics.arcade.overlap(
                        craft, enemiesFch[i], enemyHitsCraft, null, this);


                }
            }
        }
    }
}

function createWaves() {

    random = Math.floor(Math.random() * 27);
    console.log(levelData.WavesData[0]);
    console.log(levelData.WavesData[0].rate); //rate
    console.log(levelData.WavesData[0].speed); //speed
    console.log(levelData.WavesData[0].words[0]); //palabra 0
    /*
        for (let i = 0, c = 0, max2, max1 = levelData.WavesData.length; i < max1; i++) {

            for (c = 0, max2 = levelData.WavesData[i].words.length; c < max2; c++) {
                word[i] = levelData.WavesData[i].words;

            }
            if (i > max1) {
                break;
            }
        }


        for (let i = 0, max = 4; i <= max; i++) {
            rates.push(levelData.WavesData[i].rate);
            if (i = max) {
                break;
            }
        }

        //levelData.WavesData.forEach(createWave, this);
        */
}

function createWave(element) {

    //Wave = Wave.create(element.D, element.S, 'WaveConfig');

    for (let i = 0, max = element.WavesData[0].rate.length; i < max; i++)
        setupRate(element.WavesData[0].rate);

    for (let i = 0, max = element.WavesData[0].speed.length; i < max; i++)
        setupSpeed(element.WavesData[0].speed);
    for (let i = 0, max = levelData.WavesData[i].words.length; i < max; i++)

        word.push(levelData.WavesData[i].words);

    //for (let i = 0, max = element.WavesData[i].words.length; i < max; i++)
    // CreateWordList(element.WavesData[i].words[i]);
    word = element.WavesData[0].words[0]
}

/////////////

function setupRate(rate) {
    actualrate = rate;
}

function setupSpeed(speed) {
    actualspeed = speed;
}

function createSounds() {
    soundLaser = game.add.audio('sndlaser');
    stageMusic = game.add.audio('stage');
}

function updatePlay() {
    timerTotal.start();
    if (CompletedGame == 1) {
        if (gamestate == PartB) {
            timerR.resume();
        }

        timerTotal.resume();
    }

    if (gamestate == PartB) {
        ////////////////////////////////////////////////////////
        //Spawn Replicators
        ///////////////////////////////////////////////////////
        if (currentEnemiesNumReplicator < ENEMIES_GROUP_SIZE_REPLICATOR) {
            timerR.start();
            timerR.resume();
            if (numeroIterR <= ENEMIES_GROUP_SIZE_REPLICATOR) {
                if (timeTimerR >= levelData.WavesData[actualWave].rate + 5) {

                    createEnemiesReplicator(numeroIterR);

                    numeroIterR++;
                    timeTimerR = 0;
                    currentEnemiesNumReplicator++;
                }
            }
            if (numeroIterR >= ENEMIES_GROUP_SIZE_REPLICATOR) {
                //console.log("pause");
                //timerR.pause();
            }
        }
        if (currentEnemiesNumReplicator == 0) {

            flag = true;
        }
        ////////////////////////////////////////////////////
        //Spawn Childrens of Replicators
        ///////////////////////////////////////////////////
        if (currentEnemiesNumReplicator >= 1) {
            if (currentEnemiesNumCh < ENEMIES_GROUP_SIZE_CHILDREN && currentEnemiesNum < ENEMIES_GROUP_SIZE_CHILDREN) {
                timerch.start();
                timerch.resume();
                if (numeroIterch <= ENEMIES_GROUP_SIZE_CHILDREN) {
                    if (timetimerch - 5 >= levelData.WavesData[actualWave].rate + 5) {
                        createEnemies(numeroIterch);
                        numeroIterch++;
                        timetimerch = 0
                        currentEnemiesNumCh++;
                        currentEnemiesNum++;
                    }
                }
                if (numeroIterch >= ENEMIES_GROUP_SIZE_CHILDREN) {
                    console.log("pause");
                    timerch.pause();
                }
            }
            if (currentEnemiesNumCh == 0) {
                flag = true;
            }
        }
        ////////////////////////////////////////////////////////
        //Spawn Fan Generator
        ///////////////////////////////////////////////////////
        if (currentEnemiesNumFan < ENEMIES_GROUP_SIZE_REPLICATOR) {
            timerF.start();
            timerF.resume();
            if (numeroIterF <= ENEMIES_GROUP_SIZE_REPLICATOR) {
                if (timeTimerF >= levelData.WavesData[actualWave].rate + 8) {
                    createEnemiesFan(numeroIterF);
                    numeroIterF++;
                    timeTimerF = 0;
                    currentEnemiesNumFan++;
                }
            }
            if (numeroIterF >= ENEMIES_GROUP_SIZE_REPLICATOR) {
                //console.log("pause");
                //timerR.pause();
            }
        }
        if (currentEnemiesNumFan == 0) {
            flag = true;
        }
        ////////////////////////////////////////////////////
        //Spawn Childrens of Fan
        ///////////////////////////////////////////////////
        if (currentEnemiesNumFan >= 1) {
            if (currentEnemiesNumChF < ENEMIES_GROUP_SIZE_CHILDREN_FAN && currentEnemiesNum < ENEMIES_GROUP_SIZE_CHILDREN_FAN) {
                timerchF.start();
                timerchF.resume();
                if (numeroIterchF <= ENEMIES_GROUP_SIZE_CHILDREN_FAN) {

                    if (timetimerchF >= levelData.WavesData[actualWave].rate + 5) {
                        createEnemiesFanCh(numeroIterchF);
                        numeroIterchF++;
                        timetimerchF = 0
                        currentEnemiesNumChF++;
                    }
                }
                if (numeroIterchF >= ENEMIES_GROUP_SIZE_CHILDREN_FAN) {
                    console.log("pause");
                    timerchF.pause();
                }
            }
            if (currentEnemiesNumChF == 0) {

                flag = true;
            }
        }
        //if (currentEnemiesNumReplicator == 1) {

        //}
    }

    ///////////
    //Part B código de arriba
    //////////////////////
    if (currentEnemiesNum >= 1) {
        manageDirection();
    }
    manageUpdateWave();

    ///////////////////////////////////////////
    //Spawn Part A and normal Ufo of the Part B
    ///////////////////////////////////////////

    if (currentEnemiesNum < ENEMIES_GROUP_SIZE) {
        timer.start();
        timer.resume();
        if (numeroIter <= ENEMIES_GROUP_SIZE) {
            if (totaltime >= levelData.WavesData[actualWave].rate) {
                createEnemies(numeroIter);
                numeroIter++;
                totaltime = 0
                currentEnemiesNum++;
            }
        }
        if (numeroIter >= ENEMIES_GROUP_SIZE) {
            console.log("pause");
            timer.pause();
        }
    }
    if (currentEnemiesNum == 0) {
        flag = true;
    }
    textI = "Score: " + killcountTotal + "\n Time: " + timeTimer + "\n Wave: " + actualWave + "\n";;
    screenText.setText(textI);
    manageCraftMovements();
    moveText();
    stars.tilePosition.y += 1;
    keypressed();
}

function manageColision() {
    for (let i = 0; i <= enemies.length; i++) {
        console.log(enemies[i]);
        game.physics.arcade.overlap(
            craft, enemies[i], enemyHitsCraft(), null, this);
    }

}

function enemyHitsCraft(craft, enemy) {
    if (gamestate == PartB) {
        enemyR.kill();
        //enemyF.kill();//no borrar
        //enemyFch.kill();
        currentEnemiesNumReplicator = 0;
        currentEnemiesNumFan = 0;
        currentEnemiesNumChF = 0;
    }
    enemy.kill();
    craft.kill();
    CompletedGame = 1;
    currentEnemiesNum = 0;
    stageMusic.stop();
    game.state.start('gameOver');
}

function createkeyboard() {
    AButton = game.input.keyboard.addKey(
        Phaser.Keyboard.A);
    BButton = game.input.keyboard.addKey(
        Phaser.Keyboard.B);
    CButton = game.input.keyboard.addKey(
        Phaser.Keyboard.C);
    DButton = game.input.keyboard.addKey(
        Phaser.Keyboard.D);
    EButton = game.input.keyboard.addKey(
        Phaser.Keyboard.E);
    FButton = game.input.keyboard.addKey(
        Phaser.Keyboard.F);
    GButton = game.input.keyboard.addKey(
        Phaser.Keyboard.G);
    HButton = game.input.keyboard.addKey(
        Phaser.Keyboard.H);
    IButton = game.input.keyboard.addKey(
        Phaser.Keyboard.I);
    JButton = game.input.keyboard.addKey(
        Phaser.Keyboard.J);
    KButton = game.input.keyboard.addKey(
        Phaser.Keyboard.K);
    LButton = game.input.keyboard.addKey(
        Phaser.Keyboard.L);
    MButton = game.input.keyboard.addKey(
        Phaser.Keyboard.M);
    NButton = game.input.keyboard.addKey(
        Phaser.Keyboard.N);
    OButton = game.input.keyboard.addKey(
        Phaser.Keyboard.O);
    PButton = game.input.keyboard.addKey(
        Phaser.Keyboard.P);
    QButton = game.input.keyboard.addKey(
        Phaser.Keyboard.Q);
    RButton = game.input.keyboard.addKey(
        Phaser.Keyboard.R);
    SButton = game.input.keyboard.addKey(
        Phaser.Keyboard.S);
    TButton = game.input.keyboard.addKey(
        Phaser.Keyboard.T);
    UButton = game.input.keyboard.addKey(
        Phaser.Keyboard.U);
    VButton = game.input.keyboard.addKey(
        Phaser.Keyboard.V);
    WButton = game.input.keyboard.addKey(
        Phaser.Keyboard.W);
    XButton = game.input.keyboard.addKey(
        Phaser.Keyboard.X);
    YButton = game.input.keyboard.addKey(
        Phaser.Keyboard.Y);
    ZButton = game.input.keyboard.addKey(
        Phaser.Keyboard.Z);
}

function keypressed() {
    if (AButton.justDown) {
        manageWords('a');
        manageWordsR('a');
        manageWordsF('a');
        manageWordsFCh('a');
    }
    if (BButton.justDown) {
        manageWords('b');
        manageWordsR('b');
        manageWordsF('b');
        manageWordsFCh('b');
    }
    if (CButton.justDown) {
        manageWords('c');
        manageWordsR('c');
        manageWordsF('c');
        manageWordsFCh('c');
    }
    if (DButton.justDown) {}
    manageWords('d');
    manageWordsR('d');
    manageWordsF('d');
    manageWordsFCh('d');
    if (EButton.justDown) {
        manageWords('e');
        manageWordsR('e');
        manageWordsF('e');
        manageWordsFCh('e');
    }
    if (FButton.justDown) {
        manageWords('f');
        manageWordsR('f');
        manageWordsF('f');
        manageWordsFCh('f');
    }
    if (GButton.justDown) {
        manageWords('g');
        manageWordsR('g');
        manageWordsF('g');
        manageWordsFCh('g');
    }
    if (HButton.justDown) {
        manageWords('h');
        manageWordsR('h');
        manageWordsF('h');
        manageWordsFCh('h');
    }
    if (IButton.justDown) {
        manageWords('i');
        manageWordsR('i');
        manageWordsF('i');
        manageWordsFCh('i');
    }
    if (JButton.justDown) {
        manageWords('j');
        manageWordsR('j');
        manageWordsF('j');
        manageWordsFCh('j');
    }
    if (KButton.justDown) {
        manageWords('k');
        manageWordsR('k');
        manageWordsF('k');
        manageWordsFCh('k');
    }
    if (LButton.justDown) {
        manageWords('l');
        manageWordsR('l');
        manageWordsF('l');
        manageWordsFCh('l');
    }
    if (MButton.justDown) {
        manageWords('m');
        manageWordsR('m');
        manageWordsF('m');
        manageWordsFCh('m');
    }
    if (NButton.justDown) {
        manageWords('n');
        manageWordsR('n');
        manageWordsF('n');
        manageWordsFCh('n');
    }
    if (OButton.justDown) {
        manageWords('o');
        manageWordsR('o');
        manageWordsF('o');
        manageWordsFCh('o');
    }
    if (PButton.justDown) {
        manageWords('p');
        manageWordsR('p');
        manageWordsF('p');
        manageWordsFCh('p');
    }
    if (QButton.justDown) {
        manageWords('q');
        manageWordsR('q');
        manageWordsF('q');
        manageWordsFCh('q');
    }
    if (RButton.justDown) {
        manageWords('r');
        manageWordsR('r');
        manageWordsF('r');
        manageWordsFCh('r');
    }
    if (SButton.justDown) {
        manageWords('s');
        manageWordsR('s');
        manageWordsF('s');
        manageWordsFCh('s');
    }
    if (TButton.justDown) {
        manageWords('t');
        manageWordsR('t');
        manageWordsF('t');
        manageWordsFCh('t');
    }
    if (UButton.justDown) {
        manageWords('u');
        manageWordsR('u');
        manageWordsF('u');
        manageWordsFCh('u');
    }
    if (VButton.justDown) {
        manageWords('v');
        manageWordsR('v');
        manageWordsF('v');
        manageWordsFCh('v');
    }
    if (WButton.justDown) {
        manageWords('w');
        manageWordsR('w');
        manageWordsF('w');
        manageWordsFCh('w');
    }
    if (XButton.justDown) {
        manageWords('x');
        manageWordsR('x');
        manageWordsF('x');
        manageWordsFCh('x');
    }
    if (YButton.justDown) {
        manageWords('y');
        manageWordsR('y');
        manageWordsF('y');
        manageWordsFCh('y');
    }
    if (ZButton.justDown) {
        manageWords('z');
        manageWordsR('z');
        manageWordsF('z');
        manageWordsFCh('z');
    }
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

function manageWords(char) {

    chartotal++;

    for (var i = 0; i < textoTemporal.length; i++) {

        if (lockedWord == i) {
            if (char == textoTemporal[i].text.substring(0, 1)) {
                chartyped++;
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1, largo);

                if (textoTemporal[i].text.length == 0) {
                    textoTemporal.slice(0, 1).concat(textoTemporal.slice(1 + 1));
                    console.log("KILL " + textoTemporal[i].text + " i era " + i);
                    lockedWord = -1;
                    currentEnemiesNum--;
                    killcount++;
                    killcountTotal++;
                    soundLaser.play();
                    numeroIter--;
                    enemies[i].kill();
                    //si i es 0 todas necesitan irse a la izq (words[i]=words[i+1]). si era la ultima no se hace nada. 
                    //si era intermedia las de antes de ese i no se tocan pero a partor de ahí es como si fuese el 0
                    if (currentEnemiesNum > 1) {
                        if (i == 0) {
                            console.log("era la palabra 0, lenght es " + currentEnemiesNum);
                            for (var j = 0; j <= currentEnemiesNum - 1; j++) {

                                console.log("palabra [" + j + "] " + words[j].text + " pasa a ser " + words[j + 1].text);
                                words[j].text = words[j + 1].text;
                                enemies[j] = enemies[j + 1];
                                console.log("ahora palabra " + j + " es " + words[j].text);

                            }
                        } else if (i != currentEnemiesNum) {
                            for (var j = i; j < currentEnemiesNum; j++) {
                                console.log("palabra [" + j + "] " + words[j].text + " pasa a ser " + words[j + 1].text);
                                words[j].text = words[j + 1].text;
                                enemies[j] = enemies[j + 1];
                            }
                        }

                        words[currentEnemiesNum].text = "";
                    } else {
                        if (i == 0) {
                            console.log("ELSE SOLO QUEDA 1");
                            if (words[1] != undefined) {
                                words[0].text = words[1].text;
                                words[1].text = "";
                                enemies[0] = enemies[1];
                            }
                        }
                    }

                }

            }
        } else if (lockedWord == -1) {


            if (char == textoTemporal[i].text.substring(0, 1)) {
                lockedWord = i;
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1, largo);
            }
        }

    }
}

function manageWordsR(char) {
    chartotal++;
    for (var i = 0; i < textoTemporalR.length; i++) {

        if (lockedWord == i) {
            if (char == textoTemporalR[i].text.substring(0, 1)) {
                chartyped++;
                let largoR = textoTemporalR[i].text.length;
                textoTemporalR[i].text = textoTemporalR[i].text.substring(1, largoR);
                if (textoTemporalR[i].text.length == 0) {
                    textoTemporalR.slice(0, 1).concat(textoTemporalR.slice(1 + 1));
                    console.log("KILL " + textoTemporalR[i].text + " i era " + i);
                    lockedWord = -1;
                    currentEnemiesNumReplicator--;
                    killcount++;
                    killcountTotal++;
                    numeroIterR--;
                    enemiesR[i].kill();
                    //si i es 0 todas necesitan irse a la izq (words[i]=words[i+1]). si era la ultima no se hace nada. 
                    //si era intermedia las de antes de ese i no se tocan pero a partor de ahí es como si fuese el 0
                    if (currentEnemiesNumReplicator > 1) {
                        if (i == 0) {
                            console.log("era la palabra 0, lenght es " + currentEnemiesNumReplicator);
                            for (var j = 0; j <= currentEnemiesNumReplicator - 1; j++) {

                                console.log("palabra [" + j + "] " + wordsR[j].text + " pasa a ser " + wordsR[j + 1].text);
                                wordsR[j].text = wordsR[j + 1].text;
                                enemiesR[j] = enemiesR[j + 1];
                                console.log("ahora palabra " + j + " es " + wordsR[j].text);

                            }
                        } else if (i != currentEnemiesNumReplicator) {
                            for (var j = i; j < currentEnemiesNumReplicator; j++) {
                                console.log("palabra [" + j + "] " + wordsR[j].text + " pasa a ser " + wordsR[j + 1].text);
                                wordsR[j].text = wordsR[j + 1].text;
                                enemiesR[j] = enemiesR[j + 1];
                            }
                        }

                        wordsR[currentEnemiesNumReplicator].text = "";
                    } else {
                        if (i == 0) {
                            console.log("ELSE SOLO QUEDA 1");

                            if (wordsR[1] != undefined) {
                                wordsR[0].text = wordsR[1].text;
                                wordsR[1].text = "";
                                enemiesR[0] = enemiesR[1];
                            }
                        }
                    }

                }

            }
        } else if (lockedWord == -1) {


            if (char == textoTemporalR[i].text.substring(0, 1)) {
                lockedWord = i;
                let largoR = textoTemporalR[i].text.length;
                textoTemporalR[i].text = textoTemporalR[i].text.substring(1, largoR);
            }
        }

    }
}

function manageWordsF(char) {
    chartotal++;
    for (var i = 0; i < textoTemporalF.length; i++) {
        if (lockedWord == i) {
            if (char == textoTemporalF[i].text.substring(0, 1)) {
                chartyped++;
                let largoF = textoTemporalF[i].text.length;
                textoTemporalF[i].text = textoTemporalF[i].text.substring(1, largoF);
                if (textoTemporalF[i].text.length == 0) {
                    textoTemporalF.slice(0, 1).concat(textoTemporalF.slice(1 + 1));
                    lockedWord = -1;
                    currentEnemiesNumFan--;
                    killcount++;
                    killcountTotal++;
                    numeroIterF--;
                    enemiesF[i].kill();
                    //si i es 0 todas necesitan irse a la izq (words[i]=words[i+1]). si era la ultima no se hace nada. 
                    //si era intermedia las de antes de ese i no se tocan pero a partor de ahí es como si fuese el 0
                    if (currentEnemiesNumFan > 1) {
                        if (i == 0) {
                            for (var j = 0; j <= currentEnemiesNumFan - 1; j++) {
                                wordsF[j].text = wordsF[j + 1].text;
                                enemiesF[j] = enemiesF[j + 1];
                            }
                        } else if (i != currentEnemiesNumFan) {
                            for (var j = i; j < currentEnemiesNumFan; j++) {
                                wordsF[j].text = wordsF[j + 1].text;
                                enemiesF[j] = enemiesF[j + 1];
                            }
                        }
                        wordsR[currentEnemiesNumFan].text = "";
                    } else {
                        if (i == 0) {
                            console.log("ELSE SOLO QUEDA 1");
                            if (wordsF[1] != undefined) {
                                wordsF[0].text = wordsF[1].text;
                                wordsF[1].text = "";
                                enemiesF[0] = enemiesF[1];
                            }
                        }
                    }
                }
            }
        } else if (lockedWord == -1) {

            if (char == textoTemporalF[i].text.substring(0, 1)) {
                lockedWord = i;
                let largoF = textoTemporalF[i].text.length;
                textoTemporalF[i].text = textoTemporalF[i].text.substring(1, largoF);
            }
        }
    }
}

function manageWordsFCh(char) {
    chartotal++;
    for (var i = 0; i < textoTemporalFch.length; i++) {
        if (lockedWord == i) {
            if (char == textoTemporalFch[i].text.substring(0, 1)) {
                chartyped++;
                let largoFch = textoTemporalFch[i].text.length;
                textoTemporalFch[i].text = textoTemporalFch[i].text.substring(1, largoFch);
                if (textoTemporalFch[i].text.length == 0) {
                    textoTemporalFch.slice(0, 1).concat(textoTemporalFch.slice(1 + 1));
                    lockedWord = -1;
                    currentEnemiesNumChF--;
                    killcount++;
                    killcountTotal++;
                    numeroIterchF--;
                    enemiesFch[i].kill();
                    //si i es 0 todas necesitan irse a la izq (words[i]=words[i+1]). si era la ultima no se hace nada. 
                    //si era intermedia las de antes de ese i no se tocan pero a partor de ahí es como si fuese el 0
                    if (currentEnemiesNumChF > 1) {
                        if (i == 0) {
                            for (var j = 0; j <= currentEnemiesNumChF - 1; j++) {
                                wordsFch[j].text = wordsFch[j + 1].text;
                                enemiesFch[j] = enemiesFch[j + 1];
                            }
                        } else if (i != currentEnemiesNumChF) {
                            for (var j = i; j < currentEnemiesNumChF; j++) {
                                wordFch[j].text = wordsFch[j + 1].text;
                                enemiesFch[j] = enemiesFch[j + 1];
                            }
                        }
                        wordsFch[currentEnemiesNumChF].text = "";
                    } else {
                        if (i == 0) {
                            console.log("ELSE SOLO QUEDA 1");
                            if (wordsFch[1] != undefined) {
                                wordsFch[0].text = wordsFch[1].text;
                                wordsFch[1].text = "";
                                enemiesFchR[0] = enemiesFch[1];
                            }
                        }
                    }

                }

            }
        } else if (lockedWord == -1) {
            if (char == textoTemporalFch[i].text.substring(0, 1)) {
                lockedWord = i;
                let largoFch = textoTemporalFch[i].text.length;
                textoTemporalFch[i].text = textoTemporalFch[i].text.substring(1, largoFch);
            }
        }

    }
}

function manageDirection() {
    //let speed = levelData.WavesData[actualWave].speed;
    /*console.log("enemies.length " + enemies[0].length);
    for (let i = 0; i < currentEnemiesNum; i++) {

        if (craft.body.x > enemies[i].body.x) {
            enemies[i].body.x = enemies[i].body.x + 1;
        }
        if (craft.body.y > enemies[i].body.y) {
            enemies[i].body.x = enemies[i].body.x + 1;
        }
        if (craft.body.x < enemies[i].body.x) {
            enemies[i].body.x = enemies[i].body.x - 1;
        }
        if (craft.body.y < enemies[i].body.y) {
            enemies[i].body.x = enemies[i].body.x - 1;
        }
    }*/
}

function createCraft() {
    let x = game.world.centerX;
    let y = game.world.height - HUD_HEIGHT;
    craft = game.add.sprite(x, y, 'craft');
    craft.anchor.setTo(0.5, 0.5);
    craft.scale.setTo(0.2, 0.2);
    game.physics.arcade.enable(craft);
    craft.body.collideWorldBounds = true;
}

function createKeyControls() {
    cursors =
        game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(
        Phaser.Keyboard.SPACEBAR);
}

function resetMember(item) {
    item.kill();
}

function manageUpdateWave() {
    if (killcount > 2 /*word[w1].length*/ ) { //Cambiar esto antes de entregar
        killcount = 0
        w2 = 0;
        console.log("--->NEXTWAVE<---");
        console.log(levelData.WavesData.length + " waves data length");
        console.log(WavesToPlay + "actualwave");
        nextWave();
    }
}

function nextWave() {
    //clearLevel();
    WavesToPlay += 1;
    w1++;
    actualWave++;
    console.log(actualWave);
    if (actualWave == levelData.WavesData.length) {
        stageMusic.stop();
        w1 = 0;
        actualWave = 0;
        WavesToPlay = 0;
        currentEnemiesNum = 0;
        currentEnemiesNumReplicator = 0;
        currentEnemiesNumFan = 0;
        flag = true;
        CompletedGame = 1;
        game.state.start('win');
    } else {
        game.input.enabled = true;

    }
}