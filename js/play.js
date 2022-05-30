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
let textoTemporal = [];
let rates = [];
let fireButton;
const ENEMIES_GROUP_SIZE = 3;
const ENEMIES_GROUP_SIZE_REPLICATOR = 1;
let enemies;
let enemiesR;
let waves = 3;
let actualWave = 0;
let WaveConfig;
let actualrate;
let actualspeed;
let WavesData = ['assets/levels/WavesPartA.json'];
let texto;
let words;
let image;
let styleI;
let random;
let enemy;
let enemyR;
let killcount = 0;
let treshold = 15;
let chartyped; //gameover screen
let chartotal; //gameover screen
let enemyIsCreated = false; //colision checker
let PartA = 0;
let PartB = 1;
styleI = {
    font: '20px Arial',
    fill: '#FFFF00'
};


let word = [];
var correct = [];

let currentEnemiesNum = 0;
let currentEnemiesNumReplicator = 0;
let lockedWord = -1; //para que una vez empiezas una palabra no te deje otras 
let numeroIter = 0;
let numeroIterR = 0;
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
var totaltime = 2;
var totaltimeR = 2;
let timeTimer = 0;
let timeTimerR = 0;

function preloadPlay() {
    game.load.image('stars',
        'assets/imgs/stars.png');
    game.load.image('craft',
        'assets/imgs/craft.png');
    game.load.image('enemies',
        'assets/imgs/ufo.png');
    game.load.image('replicator',
        'assets/imgs/Bigufo.png');
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
    //reset variables to play again
    chartotal = 0; //game over screen
    chartyped = 0; //game over screen
    totaltime = 0;
    totaltimeR = 0;
    killcount = 0;
    timeTimer = 0;
    numeroIter = 0;
    numeroIterR = 0;
    random = Math.floor(Math.random() * 27);
    let w = game.world.width;
    let h = game.world.height;
    stars = game.add.tileSprite(
        0, 0, w, h, 'stars');
    createCraft();
    createKeyControls();
    createSounds();
    createkeyboard();

    levelData = JSON.parse(game.cache.getText('WavesPartA'));

    enemies = game.add.group();

    enemies.enableBody = true;
    if (gamestate == PartB) {
        enemiesR = game.add.group();

        enemiesR.enableBody = true;

    }
    words = game.add.group();

    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    if(gamestate == PartB){
        timerR = game.time.create(false);
        timerR.loop(1000, updateCounter, this);
    }

    createWaves();
    game.input.keyboard.addCallbacks(this, null, null, keypressed);

    textI = "Score: \n Time: " + timeTimer + "\n Wave: " + actualWave + "\n";

    screenText = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER + 150, textI, styleI);
    stageMusic.play();
    stageMusic.volume = 0.6;
}

function updateCounter() {
    totaltime++;
    timeTimer++;
    totaltimeR++;
    timeTimerR++;
    console.log("totaltime " + totaltime);

}

function createEnemiesPrueba(i) {

    random = Math.floor(Math.random() * 27);
    enemy = game.add.sprite(50 * i, 50, 'ufo');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.enableBody = true;
    enemy.exists = true;
    enemy.body.bounce.set(0.8);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemies[i] = enemy;
    console.log("creado enemies[" + i + "] es " + enemies[i]);

    console.log(word[w1] + " textword");

    textwords[i] = (word[w1][random]);

    console.log("textword antes de texto temporal " + textwords[i]);
    textoTemporal[i] = game.add.text(enemy.x + treshold, enemy.y + treshold, textwords[i], styleI);
    //textoTemporal.anchor.set(0.5);
    console.log("texto temporal[" + i + "] es " + textoTemporal[i].text);
    console.log("words 0 es " + words[0]);
    words[i] = textoTemporal[i];
    enemyIsCreated = true; //colision checker

    console.log("words[" + i + "] es " + words[i].text);
    //}

}

function createEnemiesPruebaReplicator(i) {

    random = Math.floor(Math.random() * 27);
    enemyR = game.add.sprite(50 * i, 50, 'Bigufo');
    game.physics.enable(enemyR, Phaser.Physics.ARCADE);
    enemyR.enableBody = true;
    enemyR.exists = true;
    enemyR.body.bounce.set(0.8);
    enemyR.body.collideWorldBounds = true;
    enemyR.body.velocity.setTo(levelData.WavesData[actualWave].speed, levelData.WavesData[actualWave].speed);
    enemiesR[i] = enemyR;
    console.log("creado enemies[" + i + "] es " + enemiesR[i]);

    console.log(word[w1] + " textword");

    textwords[i] = (word[w1][random]);

    console.log("textword antes de texto temporal " + textwords[i]);
    textoTemporal[i] = game.add.text(enemyR.x + treshold, enemyR.y + treshold, textwords[i], styleI);
    //textoTemporal.anchor.set(0.5);
    console.log("texto temporal[" + i + "] es " + textoTemporal[i].text);
    console.log("words 0 es " + words[0]);
    words[i] = textoTemporal[i];
    enemyIsCreated = true; //colision checker

    console.log("words[" + i + "] es " + words[i].text);
    //}

}

function createEnemies(number) {

    for (var i = 0; i <= number; i++, random++) {
        if (random >= 37) {
            random = 1;
        }
        enemy = game.add.sprite(100 * i, 200, 'ufo');
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.enableBody = true;
        enemy.exists = true;
        enemy.body.bounce.set(0.8);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.setTo(100 * i, 200);
        enemies[i] = enemy;

        //for (let y = 0, max = number*2; c < max; c = c + 2) {

        // console.log("genera texto"+ i);
        //console.log(word[i][c] + " textword tiene");
        console.log(word[w1] + " textword");
        console.log(random + "random");
        textwords[i] = word[w1][random];
        //console.log(textwords[i]+"textword tiene");
        //console.log("deberia pushear en la siguiente " +word[i]);

        //console.log(textwords[i]+" textword antes de texto temporal")
        textoTemporal[i] = game.add.text(enemy.x * treshold, enemy.y * treshold, textwords[i], styleI);

        //textoTemporal.anchor.set(0.5);
        //console.log(words[0]);
        words[i] = textoTemporal[i];
        //console.log(textoTemporal[0]+"texto temporal que")
        //}

    }


}

function moveText() {



    for (var i = 0; i <= currentEnemiesNum - 1; i++) {
        //console.log("current enemies "+currentEnemiesNum+" i moveText es "+i+", word es "+words[i].text );
        words[i].x = Math.floor(enemies[i].body.x + treshold);
        words[i].y = Math.floor(enemies[i].body.y + treshold);

    }
    if (gamestate == PartB) {
        for (var i = 0; i <= currentEnemiesNumReplicator - 1; i++) {
            //console.log("current enemies "+currentEnemiesNum+" i moveText es "+i+", word es "+words[i].text );
            words[i].x = Math.floor(enemiesR[i].body.x + treshold);
            words[i].y = Math.floor(enemiesR[i].body.y + treshold);

        }
    }

}

function createWaves() {

    random = Math.floor(Math.random() * 27);
    console.log(levelData.WavesData); //waves
    console.log(levelData.WavesData[0]);
    console.log(levelData.WavesData[0].rate); //rate
    console.log(levelData.WavesData[0].speed); //speed
    console.log(levelData.WavesData[0].words[0]); //palabra 0
    // console.log("lenz"+ levelData.WavesData.length);

    for (let i = 0, c = 0, max2, max1 = levelData.WavesData.length; i < max1; i++) {
        // console.log("lenz"+ levelData.WavesData.length);

        for (c = 0, max2 = levelData.WavesData[i].words.length; c < max2; c++) {
            //   console.log("push numero"+ i);
            word[i] = levelData.WavesData[i].words;
            // console.log("word no deberia estar undefined")
            // console.log(i+"palabra");
            // console.log(word[i][c] + "linea 245");

        }
        if (i > max1) {
            break;
        }
    }


    for (let i = 0, max = 4; i <= max; i++) {
        //  console.log(levelData.WavesData[i].rate + "que tiene rates");
        rates.push(levelData.WavesData[i].rate);
        //console.log(i + "rate");
        //console.log(rates[i]);
        if (i = max) {
            break;
        }
    }

    //levelData.WavesData.forEach(createWave, this);
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


//ESTO EN VERDAD NO GUARDA EL RATE COMO TAL LOL
function setupRate(rate) {
    actualrate = rate;
}

function setupSpeed(speed) {
    actualspeed = speed;
}



function activateEnemy() {
    if (Math.random() <
        currentEnemyProbability) {
        let enemy = enemies.getFirstExists(false);
        if (enemy) {
            let gw = game.world.width;
            let uw = enemy.body.width;
            let w = gw - uw;
            let x = Math.floor(Math.random() * w);
            let z = uw / 2 + x;
            enemy.reset(z, 0);
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y =
                currentEnemyVelocity;

            //Physics

            //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
            //    image = game.add.sprite(400, 200, 'ufo');

            game.physics.enable(enemy, Phaser.Physics.ARCADE);

            //  This gets it moving
            //image.body.velocity.setTo(200, 200);

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
    stageMusic = game.add.audio('stage');
}

function updatePlay() {
    if (gamestate == PartB) {
        console.log("Parte B ")
        ////////////////////////////////////////////////////////
        //Spawn Replicators
        ///////////////////////////////////////////////////////
        if (currentEnemiesNumReplicator < ENEMIES_GROUP_SIZE_REPLICATOR) {
            timerR.start();
            timerR.resume();
            if (numeroIterR <= ENEMIES_GROUP_SIZE_REPLICATOR) {
                //console.log("bucle while, iteracion "+numeroIter+" , totaltime "+totaltime+", actual rate "+levelData.WavesData[actualWave].rate+", es "+(totaltime>= levelData.WavesData[actualWave].rate));
                if (totaltimeR >= levelData.WavesData[actualWave].rate) {
                    //console.log("totaltime "+totaltime);
                    createEnemiesPruebaReplicator(numeroIterR);
                    numeroIterR++;
                    totaltimeR = 0;
                    currentEnemiesNumReplicator++;
                }
            }
            if (numeroIterR >= ENEMIES_GROUP_SIZE_REPLICATOR) {
                console.log("pause");
                timerR.pause();

            }
        }
        if (currentEnemiesNumReplicator == 0) {

            flag = true;
        }
        ////////////////////////////////////////////////////
        //Spawn Childrens of Replicators
        ///////////////////////////////////////////////////
        if (currentEnemiesNumReplicator >= 0) {
            if (currentEnemiesNum < ENEMIES_GROUP_SIZE) {
                timer.start();
                timer.resume();
                if (numeroIter <= ENEMIES_GROUP_SIZE) {
                    //console.log("bucle while, iteracion "+numeroIter+" , totaltime "+totaltime+", actual rate "+levelData.WavesData[actualWave].rate+", es "+(totaltime>= levelData.WavesData[actualWave].rate));
                    if (totaltime >= levelData.WavesData[actualWave].rate) {
                        //console.log("totaltime "+totaltime);
                        createEnemiesPrueba(numeroIter);
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
        }
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

    //prueba
    console.log(currentEnemiesNum + " current enemies ");
    //console.log(flag+" flag")
    if (currentEnemiesNum < ENEMIES_GROUP_SIZE) {
        timer.start();
        timer.resume();
        if (numeroIter <= ENEMIES_GROUP_SIZE) {
            //console.log("bucle while, iteracion "+numeroIter+" , totaltime "+totaltime+", actual rate "+levelData.WavesData[actualWave].rate+", es "+(totaltime>= levelData.WavesData[actualWave].rate));
            if (totaltime >= levelData.WavesData[actualWave].rate) {
                //console.log("totaltime "+totaltime);
                createEnemiesPrueba(numeroIter);
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
    console.log
    textI = "Score: " + killcount + "\n Time: " + timeTimer + "\n Wave: " + actualWave + "\n";;
    screenText.setText(textI);

    manageCraftMovements();

    moveText();
    stars.tilePosition.y += 1;
    if (currentEnemiesNum == 1) { //colision checker
        //manageColision();
    }
    //manageCompleteWaves();
    keypressed();
}

function manageColision() {
    //for(let i = 0;i <= enemies.length;i++){
    console.log("////////")
    //console.log(enemies[i]);
    console.log(enemies[0] + " enemy");
    game.physics.arcade.overlap(
        craft, enemies[0], enemyHitsCraft, null, this);
    //}

}

function enemyHitsCraft(craft, enemy) {
    enemy.kill();
    craft.kill();
    console.log("Colision");
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
    if (AButton.justDown)
        manageWords('a');
    if (BButton.justDown)
        manageWords('b');
    if (CButton.justDown)
        manageWords('c');
    if (DButton.justDown)
        manageWords('d');
    if (EButton.justDown)
        manageWords('e');
    if (FButton.justDown)
        manageWords('f');
    if (GButton.justDown)
        manageWords('g');
    if (HButton.justDown)
        manageWords('h');
    if (IButton.justDown)
        manageWords('i');
    if (JButton.justDown)
        manageWords('j');
    if (KButton.justDown)
        manageWords('k');
    if (LButton.justDown)
        manageWords('l');
    if (MButton.justDown)
        manageWords('m');
    if (NButton.justDown)
        manageWords('n');
    if (OButton.justDown)
        manageWords('o');
    if (PButton.justDown)
        manageWords('p');
    if (QButton.justDown)
        manageWords('q');
    if (RButton.justDown)
        manageWords('r');
    if (SButton.justDown)
        manageWords('s');
    if (TButton.justDown)
        manageWords('t');
    if (UButton.justDown)
        manageWords('u');
    if (VButton.justDown)
        manageWords('v');
    if (WButton.justDown)
        manageWords('w');
    if (XButton.justDown)
        manageWords('x');
    if (YButton.justDown)
        manageWords('y');
    if (ZButton.justDown)
        manageWords('z');

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

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    //He cambiado el length del for que era incorecto
    for (var i = 0; i < textoTemporal.length; i++) {
        //var letter = chword.charAt(i);
        //  If they pressed one of the letters in the word, flag it as correct

        if (lockedWord == i) {
            if (char == textoTemporal[i].text.substring(0, 1)) {
                chartyped++;
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1, largo);

                //console.log(textoTemporal[i].text+" substring de 1 a lenght"+largo);
                if (textoTemporal[i].text.length == 0) {
                    textoTemporal.slice(0, 1).concat(textoTemporal.slice(1 + 1));
                    console.log("KILL " + textoTemporal[i].text + " i era " + i);
                    lockedWord = -1;
                    currentEnemiesNum--;
                    killcount++;
                    stageMusic.volume = 0.2;
                    soundLaser.play();
                    stageMusic.volume = 0.5;
                    if (enemies.length == 0)
                        enemyIsCreated = false;
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
                            enemyIsCreated = false; //colision checker
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

            if (textoTemporal[i] == undefined && killcount > 0) {
                console.log(textoTemporal[i] + " [i] = " + i + "; se ha matado " + killcount);

                //textoTemporal[i] =textoTemporal[i+1];
            }

            if (char == textoTemporal[i].text.substring(0, 1))
            //if (char == words[i].text.substring(0,1))
            {
                lockedWord = i;
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1, largo);

                console.log(textoTemporal[i].text + " substring de 1 a lenght" + largo);
            }
        }

    }
}

function manageDirection() {
    //let speed = levelData.WavesData[actualWave].speed;
    console.log("enemies.length " + enemies[0].length);
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
    }
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

function resetMember(item) {
    item.kill();
}

function manageUpdateWave() {
    if (killcount > 0 /*word[w1].length*/ ) {
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
        flag = true;
        game.state.start('win');
    } else {
        game.input.enabled = true;

    }
}
/////////////////////////////////////////////////////////////////
//////////////////////////PART B////////////////////////////////
////////////////////////////////////////////////////////////////