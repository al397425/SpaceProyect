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
let textwords= [];
let textoTemporal = [];
let rates = [];
let fireButton;
const ENEMIES_GROUP_SIZE = 5;
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
let random;
let killcount = 0;
let treshold =200;
styleI = {
    font: '20px Arial',
    fill: '#FFFF00'
};

let word = [];
let chword = "nada";
var correct = [];

let currentEnemiesNum = 0;
let lockedWord = -1; //para que una vez empiezas una palabra no te deje otras 
let numeroIter = 0;


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
var totaltime = 2;

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

    timer = game.time.create(false);
    timer.loop(1000,updateCounter,this); 
 



   /*  createEnemies(ENEMIES_GROUP_SIZE);

    game.physics.startSystem(Phaser.Physics.ARCADE);

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
    
}

function updateCounter(){
    totaltime++;
    console.log("totaltime "+totaltime);

}

function createEnemiesPrueba(i){
    let enemy = game.add.sprite(100 * i, 200, 'ufo');
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.enableBody = true;
    enemy.exists = true;
    enemy.body.bounce.set(0.8);
    enemy.body.collideWorldBounds = true;
    enemy.body.velocity.setTo(100 * i, 200);
    enemies[i] = enemy;

    console.log("creado enemies["+i+"] es "+enemies[i]);

    console.log(word[w1]+" textword");
    textwords[i] = (word[w1][i]);
    
    console.log("textword antes de texto temporal "+ textwords[i]);
    textoTemporal[i] = game.add.text(enemy.x, enemy.y, textwords[i], styleI);
    //textoTemporal.anchor.set(0.5);
    console.log("texto temporal["+i+"] es "+textoTemporal[i].text);
    console.log("words 0 es "+words[0]);
    words[i] = textoTemporal[i];
    console.log("words["+i+"] es "+words[i].text);
        //}

}

function createEnemies(number) {
   
    for (var i = 0; i <= number; i++,random++) {
        if(random >= 37){
        random = 1;
        }
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
                console.log(random+"random");
                textwords[i] = (word[w1][random]);
                //console.log(textwords[i]+"textword tiene");
                //console.log("deberia pushear en la siguiente " +word[i]);
        
        //console.log(textwords[i]+" textword antes de texto temporal")
        textoTemporal[i] = game.add.text(enemy.x*treshold, enemy.y*treshold, textwords[i], styleI);
        //textoTemporal.anchor.set(0.5);
        //console.log(words[0]);
        words[i] = textoTemporal[i];
        //console.log(textoTemporal[0]+"texto temporal que")
            //}
    
    }
    
   
}

function moveText() {

    
    for (var i = 0; i <= currentEnemiesNum-1; i++) {
        words[i].x = Math.floor(enemies[i].body.x);
        words[i].y = Math.floor(enemies[i].body.y);
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
    //   for(let i=0;i < word[w1][i];i++){
   
       if (chword == "nada") {
           chword = word[w1][random];
       }
       if(palabradestruida == true){
           chword = "nada";
           palabradestruida = false;
       }
   //}
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

    /*
    if(flag == true){
        timer.start();
        createEnemies(ENEMIES_GROUP_SIZE);
        flag = false;
    }*/

  
    //prueba
     if(flag == true){
        timer.start();
       
         if(numeroIter<=ENEMIES_GROUP_SIZE){
           //console.log("bucle while, iteracion "+numeroIter+" , totaltime "+totaltime+", actual rate "+levelData.WavesData[actualWave].rate+", es "+(totaltime>= levelData.WavesData[actualWave].rate));
            if(totaltime>=levelData.WavesData[actualWave].rate){
                //console.log("totaltime "+totaltime);
                createEnemiesPrueba(numeroIter);
                numeroIter++;
                totaltime = 0
                currentEnemiesNum++;
            }
         
            

        }

        
        if(numeroIter>=ENEMIES_GROUP_SIZE){
            console.log("pause");
            timer.pause();
            flag = false;}

    }
    


    
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



    //  Loop through each letter of the word being entered and check them against the key that was pressed
    
    for (var i = 0; i < chword.length; i++) 
    {
        var letter = chword.charAt(i);
        //  If they pressed one of the letters in the word, flag it as correct

        if(lockedWord==i)
        {
            if (char == textoTemporal[i].text.substring(0,1)) 
            {
            
                console.log("pulsado "+textoTemporal[i].text.substring(0,1));
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1,largo);

                console.log(textoTemporal[i].text+" substring de 1 a lenght"+largo);
                if(textoTemporal[i].text.length == 0)
                {
                    lockedWord = -1;
                    enemies[i].kill();
                    killcount++;
                }

            }
        }
        else if(lockedWord==-1)
        {

            if (char == textoTemporal[i].text.substring(0,1)) 
            {
                lockedWord = i;
            
                console.log(textoTemporal[i].text.substring(0,1)+" substring");
                let largo = textoTemporal[i].text.length;
                textoTemporal[i].text = textoTemporal[i].text.substring(1,largo);

                console.log(textoTemporal[i].text+" substring de 1 a lenght"+largo);
            }
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
    if (killcount > 4 /*word[w1].length*/ ){
        killcount=0
        w2=0;
        nextWave();
}
}

function nextWave() {
    //clearLevel();
    WavesToPlay += 1;
    w1++;
    if (WavesToPlay > WavesData.length){
        w1=0;
        game.state.start('win');
        }
    else {
        game.input.enabled = true;
        //game.state.start('play');
    }
}
