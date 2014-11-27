var game = new Phaser.Game(800, 480, Phaser.AUTO, 'wobblyWho');

var menuMusic,
    gameMusic,
    tardisSound,
    jumpSound,
    killSound,
    gameOver;

//********************  MENU STATE  **************************//

var menuState = {
  preload: function(){
    game.stage.backgroundColor = '#003366';
    game.load.image('menuBg',       'assets/img/gallifrey.jpg');
    game.load.image('play',         'assets/img/play.png');
    game.load.spritesheet('tardis', 'assets/img/tardis-sprite.png', 200, 200);
    game.load.audio('tardisSound',  'assets/audio/tardis.wav');
  },

  create: function(){
    this.background = this.game.add.sprite(0, 0, 'menuBg');
    this.background.scale.setTo(1.3);

    var button = game.add.button(400, 200, 'play', startGame, this);
    button.anchor.setTo(0.5);
    button.scale.setTo(0.5);

    tardisSound = this.game.add.audio('tardisSound', 0.5, true);
    tardisSound.play();

    this.title = game.add.text(400, 85, 'Wobbly Who', {font: "100px doctor_whoregular", fill: "#FCFCFC", align: "center" });
    this.title.anchor.setTo(0.5);

    this.instruct = game.add.text(400, 350, 'help the doctor dodge the daleks!', {font: "45px assiduoussmallcaps", fill: "#FCFCFC", align: "center" });
    this.instruct.anchor.setTo(0.5);

    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(startGame);
  }
};

function startGame(){
  tardisSound.stop();
  game.state.start('main');
}

//********************  MAIN GAME STATE  **************************//

var mainState = {
  preload: function(){
    game.stage.backgroundColor = '#003366';
    game.load.image('dalek',        'assets/img/dalek.png');
    game.load.image('bg',           'assets/img/spaceRainbows.jpg');
    game.load.spritesheet('tardis', 'assets/img/tardis-sprite.png', 200, 200);
    game.load.audio('jumpSound',    'assets/audio/jump.wav');
    game.load.audio('gameMusic',    'assets/audio/gameMusic.ogg');
    game.load.audio('killSound',    'assets/audio/exterminate.wav');
  },

  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = this.game.add.sprite(0, 0, 'bg');
    this.background.scale.setTo(0.3);

    gameMusic = this.game.add.audio('gameMusic', 0.4, true);
    gameMusic.play();
    jumpSound = this.game.add.audio('jumpSound');
    killSound = this.game.add.audio('killSound');

    this.daleks = game.add.group();
    this.daleks.enableBody = true;
    this.daleks.createMultiple(20, 'dalek');

    this.timer = this.game.time.events.loop(1500, this.addRowOfDaleks, this);

    this.tardis = this.game.add.sprite(400, 200, 'tardis');
    this.tardis.animations.add('fly', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, true);
    game.physics.arcade.enable(this.tardis);
    this.tardis.body.gravity.y = 1000;
    this.tardis.width = 50;
    this.tardis.height= 50;
    this.tardis.anchor.setTo(-0.2, 0.5);

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.score = 0;
    this.txtScore = this.game.add.text(20, 10, 'score: ' + this.score, {font: "30px assiduoussmallcaps", fill: "#FCFCFC"});
    this.instructions = this.game.add.text(400, 10, 'press START to jump', {font:"30px assiduoussmallcaps", fill: "#FCFCFC"});

  },

  update: function(){
    if(this.tardis.inWorld === false){
      this.tardis.alive = false;
      this.killTardis();
    }

    game.physics.arcade.overlap(this.tardis, this.daleks, this.hitDalek, null, this);

    if(this.tardis.angle < 5)
      this.tardis.angle += 1;
    this.tardis.animations.play('fly');
  },

  jump: function(){
    if (this.tardis.alive === false)
        return;
    this.tardis.body.velocity.y = -350;
    this.tardis.animations.play('fly');
    game.add.tween(this.tardis).to({angle: -20}, 100).start();
    jumpSound.play();
  },

  addOneDalek: function(x, y){
      var dalek = this.daleks.getFirstDead();
      dalek.reset(x, y);
      dalek.body.velocity.x = -200;
      dalek.checkWorldBounds = true;
      dalek.outOfBoundsKill = true;
      dalek.width = 45;
      dalek.height= 45;
      dalek.body.width = 45;
      dalek.body.height = 45;
  },

  addRowOfDaleks: function(){
    var hole = Math.floor(Math.random()*5)+1;
    for(var i = 0; i < 8; i++)
      if(i != hole && i != hole +1)
        this.addOneDalek(650, i*60+10);
    this.score += 1;
    this.txtScore.text = this.score;
  },

  hitDalek: function(){
    if(this.tardis.alive === false)
      return;
    this.tardis.alive = false;
    this.game.time.events.remove(this.timer);
    this.daleks.forEachAlive(function(p){
        p.body.velocity.x = 0;
    }, this);
    killSound.play();
    this.killTardis();
  },

  killTardis: function(){
    gameMusic.stop();
    game.state.start('gameover');
  }
};

//********************  GAMEOVER STATE  **************************//

var gameoverState = {
  preload: function(){
    game.stage.backgroundColor = '#003366';
    game.load.image('play',          'assets/img/play.png');
    game.load.spritesheet('exdalek', 'assets/img/exdalek.png', 102, 152);
    game.load.audio('gameOver',      'assets/audio/rant.wav');
  },
  create: function(){
    game.stage.backgroundColor = '#003366';
    this.exdalek = this.game.add.sprite(400, 250, 'exdalek');
    this.exdalek.animations.add('exterminate', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23, 24], 5, false);
    game.physics.arcade.enable(this.exdalek);
    this.exdalek.anchor.setTo(0.5);

    gameOver = this.game.add.audio('gameOver', 0.5, true);
    gameOver.play();

    this.title = game.add.text(400, 100, 'exterminated!', {font: "100px doctor_whoregular", fill: "#FCFCFC", align: "center" });
    this.title.anchor.setTo(0.5);

    var button = game.add.button(400, 410, 'play', menuScreen, this);
    button.scale.setTo(0.5);
    button.anchor.setTo(0.5);

    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(menuScreen);
  },

  update: function(){
    this.exdalek.animations.play('exterminate');
  }
};

function menuScreen(){
  gameOver.stop();
  game.state.start('menu');
}

function playAgain(){
  gameOver.stop();
  game.state.start('main');
}

game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('gameover', gameoverState);
game.state.start('menu');
