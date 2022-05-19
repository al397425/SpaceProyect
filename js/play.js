let craft;
let flag = true;
let c = 0;
const HUD_HEIGHT = 50;
let cursors;
const CRAFT_VELOCITY = 150;
let w1 = 0;
let w2 = 0; //arrayposition of chword
let w4 = 0; //arrayposition of text show in screen (textwords)
let w3 = 0;
let textwords= [];
let textoTemporal = [];
let rates = [];
let fireButton;
const ENEMIES_GROUP_SIZE = 3;
let enemies;
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
styleI = {
    font: '20px Arial',
    fill: '#FFFF00'
};

let word = [];
let chword = "nada";
var correct = [];
//var bmd=[]

let lockedWord = -1; //para que una vez empiezas una palabra no te deje otras 

let count = 0;

//Random appearences
const TIMER_RHYTHM = 0.1 * Phaser.Timer.SECOND;
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
    loadWaves(WavesToPlay);
}

function loadWaves(Wave) {
    game.load.text('WavesPartA', ' assets/levels/WavesPartA.json');
}

function createPlay() {
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

    words = game.add.group();

    //createEnemies(ENEMIES_GROUP_SIZE);

    /* game.physics.startSystem(Phaser.Physics.ARCADE);

    //  This creates a simple sprite that is using our loaded image and displays it on-screen and assign it to a variable
    image = game.add.sprite(400, 200, 'ufo');

    game.physics.enable(image, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    image.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    image.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    image.body.bounce.set(0.8);

    image.body.gravity.set(0, 180);


    texto = game.add.text(image.x,image.y,"hola", styleI);
    texto.anchor.set(0.5);
*/

    createWaves();
    game.input.keyboard.addCallbacks(this, null, null, keypressed);
    
    /*
     /////////////////////////
    //  Here we'll create a simple array where each letter of the word to enter represents one element:
    for (var i = 0; i < chword; i++)
    {
        correct[chword[i]] = false;
    }

    //  This is our BitmapData onto which we'll draw the word being entered
    for(var i = 0, x = 0; i < word[i].length ; i++){
    bmd[i] = game.make.bitmapData(800*i, 200*i);
    bmd[i].context.font = '64px Arial';
    bmd[i].context.fillStyle = '#ffffff';
    bmd[i].context.fillText(word[i][i], 64, 64);
    bmd[i].addToWorld();
}

    //  Capture all key presses
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
*/

}
function createEnemies(number) {
    /*
    console.log("fuck number "+ number);
    for(var i = 0; i<= number; i++){
        console.log("bucle for");
        let enemy = game.add.sprite(100*i, 200, 'ufo');
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.enableBody = true;
        enemy.exists = true;
        enemy.body.bounce.set(0.8);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.setTo(100*i,200);
        enemies[i] = enemy;

        let textoTemporal = game.add.text(enemy.x,enemy.y,"hola", styleI);
        textoTemporal.anchor.set(0.5);
        words[i] = textoTemporal;

    }*/

    
    for (var i = 0; i <= number; i++) {
        console.log("bucle for");
        let enemy = game.add.sprite(100 * i, 200, 'ufo');
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
                console.log(word[w1]+" textword");
                textwords[i] = (word[w1][i]);
                //console.log(textwords[i]+"textword tiene");
                //console.log("deberia pushear en la siguiente " +word[i]);
        
        console.log(textwords[i]+" textword antes de texto temporal")
        textoTemporal[i] = game.add.text(enemy.x, enemy.y, textwords[i], styleI);
        //textoTemporal.anchor.set(0.5);
        console.log(words[0]);
        words[i] = textoTemporal[i];
        console.log(textoTemporal[0]+"texto temporal que")
            //}
    
}
    


    /* enemies = game.add.group();
     enemies.enableBody = true;
     enemies.createMultiple(number, 'ufo');
     currentEnemyProbability = 0.2;
     currentEnemyVelocity = 50;
    game.time.events.loop(
     TIMER_RHYTHM, activateEnemy, this);*/
    /*  words = game.add.group();
      words.createMultiple(number,'palabra');*/

}

function moveText() {

    for (var i = 0; i <= ENEMIES_GROUP_SIZE; i++) {
        words[i].x = Math.floor(enemies[i].body.x);
        words[i].y = Math.floor(enemies[i].body.y);
    }
    /*texto.x = Math.floor(image.x);
    
    texto.y = Math.floor(image.y);*/

}

function createWaves() {
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
            console.log("word no deberia estar undefined")
            // console.log(i+"palabra");
            console.log(word[i][c] + "linea 245");

        }
        if (i > max1) {
            break;
        }
    }


    for (let i = 0, max = 4; i <= max; i++) {
        console.log(levelData.WavesData[i].rate + "que tiene rates");
        rates.push(levelData.WavesData[i].rate);
        console.log(i + "rate");
        console.log(rates[i]);
        if (i = max) {
            break;
        }
    }

    //levelData.WavesData.forEach(createWave, this);
}

function managechWord() {
    if (chword == "nada") {
        chword = word[w1][w2];
    }
    if(palabradestruida == true){
        w2++;
        chword = "nada";
        palabradestruida = false;
    }

}

function managetextwords() {
    /*console.log(rates[3] + 'rates');

    if (rates[actualWave] == 2 && actualWave == 0) {
        // console.log("genera texto");

        for (let i = 0, max = 6; c < max; c = c + 2) {

            for (let i = 0, max = 2; c < max; c++) {
                // console.log("genera texto"+ i);
                console.log(word[i][c] + " textword tiene");

                textwords[c] = (word[i][c]);
                console.log("push" + c);
                //console.log(textwords[i]+"textword tiene");
                //console.log("deberia pushear en la siguiente " +word[i]);
                let styletextwords = {
                    font: '20px Arial',
                    fill: '#FFFF00'
                };
                let textonave = game.add.text(TEXT_OFFSET_HOR + 100 * c, TEXT_OFFSET_VER,
                    textwords[c], styletextwords);

            }
            /*if(flag ==1){
            setTimeout(() => {  console.log("Jotaro stoped time"); }, 2000);
            flag =0;
        }*/
       /* }

    }*/

}
/*function createWave(element) {
    
    //Wave = Wave.create(element.D, element.S, 'WaveConfig');
/*
    for (let i = 0, max = element.WavesData[0].rate.length; i < max; i++)
        setupRate(element.WavesData[0].rate);
    
    for (let i = 0, max = element.WavesData[0].speed.length; i < max; i++)
        setupSpeed(element.WavesData[0].speed);*/
/* for (let i = 0, max = levelData.WavesData[i].words.length; i < max; i++)
        
         word.push(levelData.WavesData[i].words);

    //for (let i = 0, max = element.WavesData[i].words.length; i < max; i++)
       // CreateWordList(element.WavesData[i].words[i]);
/*        word = element.WavesData[0].words[0]*/
//}

/////////////

function setupRate(rate) {
    actualrate = rate;
}

function setupSpeed(speed) {
    actualspeed = speed;
}
/*
function setupEnemy(enemy, plat) {
    //enemies logic
    let isRight, limit;

    let theEnemy = game.add.sprite(enemy.x, plat.y - ENEMY_Y_OFFSET, 'enemy');
    theEnemy.anchor.setTo(0.5, 0.5);
    if (enemy.right === 0) {
        theEnemy.scale.x = -1;
        isRight = false;
        limit = Math.max(Math.max(0, plat.x) + ENEMY_X_OFFSET, enemy.x - ENEMY_STEP_LIMIT);
    } else {
        isRight = true;
        limit = Math.min(Math.min(plat.x + plat.width, game.world.width) - ENEMY_X_OFFSET,
            enemy.x + ENEMY_STEP_LIMIT);
    }

    let flash = game.add.tween(theEnemy).to({
            alpha: 0.0
        }, 50, Phaser.Easing.Bounce.Out)
        .to({
            alpha: 0.8
        }, 50, Phaser.Easing.Bounce.Out)
        .to({
            alpha: 1.0
        }, 50, Phaser.Easing.Circular.Out);

    game.physics.arcade.enable(theEnemy);
    theEnemy.body.immovable = true;
    theEnemy.body.collideWorldBounds = true;
    theEnemy.body.setSize(41, 43, 3, 10);

    theEnemy.animations.add('swing', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    theEnemy.animations.add('run', [8, 9, 10, 11, 12, 13, 14], 10, true);

    let newEnemy = new Enemy(theEnemy, flash, plat, isRight, limit, jumpsToKill);
    enemies.push(newEnemy);
}*/

/*function CreateWordList(words){
    //let Wordlist = new Wordlist(words);
    
}*/


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
}

function updatePlay() {

    manageUpdateWave();
    //Dependiendo de rate deberian de generarse solo x naves hasta que puedan
    //generarse más naves 
    /*
    // Esperar unos segundos
    // const myTimeout = setTimeout(myGreeting, 5000);
    // function myStopFunction() {
    //      clearTimeout(myTimeout);
    // }
    */
    if(flag == true){
    createEnemies(ENEMIES_GROUP_SIZE);
    flag = false;
    }
 
    /*console.log(count);
    console.log(word.length);*/
    /*
    if(word[0][0].length == count){
        count =0
        bmd.destroy();
    }
    console.log(word);
    */
    let textI = 'Score:  \n';
    textI = 'Time:  \n';
    textI += 'Wave: ' + actualWave + '\n';
    textI += '\n';

    let styleI = {
        font: '20px Arial',
        fill: '#FFFF00'
    };
    let instructions = game.add.text(TEXT_OFFSET_HOR, TEXT_OFFSET_VER + 150, textI, styleI);
    manageCraftMovements();

    moveText();
    stars.tilePosition.y += 1;

    manageColision();
    manageCompleteWaves();
    /* //
     console.log(wordsFound);
     palabraActual = nuevaPalabra(misPalabras);
     scorePalabras = 0;
     rectBGwords.visible = true;
     foundTxt.visible = true;
     timeTxt.visible = true;
     scoreTxt.visible = true;*/
    keypressed();
}

function manageColision() {

    game.physics.arcade.overlap(
        craft, enemies, enemyHitsCraft, null, this);

}

function manageCompleteWaves() {
    if (actualWave > waves) {
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

  //  console.log("textword[][] linea 569" + textwords[w3]);
    //console.log(w3);
    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    
    for (var i = 0; i < chword.length; i++) 
    {
        var letter = chword.charAt(i);
        //  If they pressed one of the letters in the word, flag it as correct

        console.log("locked word es num "+lockedWord);
        if(lockedWord==i)
        {
            if (char == textoTemporal[i].text.substring(0,1)) 
            {
            
                console.log(textoTemporal[i].text.substring(0,1)+" substring");
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1,largo);

                console.log(textoTemporal[i].text+" substring de count"+count+" a lenght"+largo);
                if(textoTemporal[i].text.length == 0)
                {
                    lockedWord = -1;
                    console.log("0 letras, enemies[i]"+enemies[i]);
                    enemies[i].kill();

                }

            }
        }
        else if(lockedWord==-1)
        {
            console.log("else");

            if (char == textoTemporal[i].text.substring(0,1)) 
            {
                lockedWord = i;
                console.log("nuevo locked word"+lockedWord);
            
                console.log(textoTemporal[i].text.substring(0,1)+" substring");
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1,largo);

                console.log(textoTemporal[i].text+" substring de count"+count+" a lenght"+largo);
            }
        }
    

 /*       //  Now draw the word, letter by letter, changing colour as required
        if (correct[letter])
        {
            
            //textoTemporal[i].context.fillStyle = '#00ff00';

        } 
        else 
        {
            
            //textoTemporal[i].context.fillStyle = '#ffffff';
        }
*/
        //textoTemporal[i].context.fillText(letter, x, 64);

        //x += textoTemporal[i].context.measureText(letter).width;

    }
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

function resetMember(item) {
    item.kill();
}

function manageUpdateWave() {
    if (w2 > 5 /*word[w1].length*/ ){
        w2=0
        nextWave();
}
}

function nextWave() {
    //clearLevel();
    WavesToPlay += 1;
    w1++;
    if (WavesToPlay > WavesData.length)
        game.state.start('win');
    else {
        game.input.enabled = true;
        //game.state.start('play');
    }
}

/*function removeText() {

    text.destroy();

}*/

/*
function keyPress(char) {

    //  Clear the BMD
    bmd.cls();

    //  Set the x value we'll start drawing the text from
    var x = 64;

    //  Loop through each letter of the word being entered and check them against the key that was pressed
    for (var i = 0; i < word.length; i++)
    {
        var letter = word.charAt(i);
        //  If they pressed one of the letters in the word, flag it as correct
        if (char === letter)
        {
            correct[letter] = true;
            count++;
        }

        //  Now draw the word, letter by letter, changing colour as required
        if (correct[letter])
        {
            bmd.context.fillStyle = '#00ff00';
            
        }
        else
        {
            bmd.context.fillStyle = '#ffffff';
        }
        
        bmd.context.fillText(letter, x, 64);

        x += bmd.context.measureText(letter).width;
    }
}*/