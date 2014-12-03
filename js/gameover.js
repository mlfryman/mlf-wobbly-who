(function(){
  game.state.add('gameover', {create:create, update:update});

  function create(){
    game.stage.backgroundColor = '#003060';
    exdalek = game.add.sprite(400, 250, 'exdalek');
    exdalek.animations.add('exterminate', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23, 24], 5, false);
    game.physics.arcade.enable(exdalek);
    exdalek.anchor.setTo(0.5);

    gameOver = game.add.audio('gameOver', 0.5, true);
    gameOver.play();

    var title = game.add.text(400, 100, 'exterminated!', {font: "100px doctor_whoregular", fill: "#FCFCFC", align: "center" });
    title.anchor.setTo(0.5);

    var button = game.add.button(400, 410, 'menu', menuScreen, this);
    button.scale.setTo(0.5);
    button.anchor.setTo(0.5);

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(menuScreen);
  }

  function update(){
    exdalek.animations.play('exterminate');
  }

  function menuScreen(){
    gameOver.stop();
    game.state.start('menu');
  }
})();
