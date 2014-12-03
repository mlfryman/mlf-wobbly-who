(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    /* NOTE: load ALL game assets here */
    game.stage.backgroundColor = '#003060';

    // IMAGES
    game.load.image('menuBg',       'assets/img/gallifrey.jpg');
    game.load.image('play',         'assets/img/play.png');
    game.load.image('menu',         'assets/img/menu.png');
    game.load.image('dalek',        'assets/img/dalek.png');
    game.load.image('bg',           'assets/img/spaceRainbows.jpg');

    // SPRITESHEETS
    game.load.spritesheet('tardis', 'assets/img/tardis-sprite.png', 200, 200);
    game.load.spritesheet('exdalek','assets/img/exdalek.png', 102, 152);

    // AUDIO
    game.load.audio('tardisSound',  'assets/audio/tardis.wav');
    game.load.audio('jumpSound',    'assets/audio/jump.wav');
    game.load.audio('gameMusic',    'assets/audio/gameMusic.ogg');
    game.load.audio('gameOver',     'assets/audio/rant.wav');
  }

  function create(){
    tardisSound = game.add.audio('tardisSound', 0.5, true);
    tardisSound.play();

    var background = game.add.sprite(0, 0, 'menuBg');
    background.scale.setTo(1.3);

    var button = game.add.button(400, 200, 'play', start, this);
    button.anchor.setTo(0.5);
    button.scale.setTo(0.5);

    var title = game.add.text(400, 85, 'Wobbly Who', {font: "100px doctor_whoregular", fill: "#FCFCFC", align: "center" });
    title.anchor.setTo(0.5);

    var instruct = game.add.text(400, 350, 'help the doctor dodge the daleks!', {font: "45px assiduoussmallcaps", fill: "#FCFCFC", align: "center" });
    instruct.anchor.setTo(0.5);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(start);
  }

  function start(){
    tardisSound.stop();
    game.state.start('lvl1');
  }
})();
