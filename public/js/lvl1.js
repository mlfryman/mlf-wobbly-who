(function(){
  game.state.add('lvl1', {create:create, update:update});

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.sprite(0, 0, 'bg');
    background.scale.setTo(0.3);

    gameMusic = game.add.audio('gameMusic', 0.4, true);
    gameMusic.play();
    jumpSound = game.add.audio('jumpSound');

    daleks = game.add.group();
    daleks.enableBody = true;
    daleks.createMultiple(20, 'dalek');

    timer = game.time.events.loop(1500, addRowOfDaleks, this);

    tardis = game.add.sprite(400, 200, 'tardis');
    tardis.animations.add('fly', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, true);
    game.physics.arcade.enable(tardis);
    tardis.body.gravity.y = 1000;
    tardis.width = 50;
    tardis.height= 50;
    tardis.anchor.setTo(-0.2, 0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);

    score = 0;
    txtScore = game.add.text(20, 20, 'score: ' + score, {font: "30px assiduoussmallcaps", fill: "#FCFCFC"});
    instructions = game.add.text(200, 20, 'press space to jump', {font:"30px assiduoussmallcaps", fill: "#FCFCFC"});
  }

  function update(){
    if(tardis.inWorld === false){
      tardis.alive = false;
      killTardis();
    }

    game.physics.arcade.overlap(tardis, daleks, hitDalek, null, this);

    if(tardis.angle < 5)
      tardis.angle += 1;
    tardis.animations.play('fly');
  }

  function jump(){
    if(tardis.alive === false)
        return;
    tardis.body.velocity.y = -350;
    tardis.animations.play('fly');
    game.add.tween(tardis).to({angle: -20}, 100).start();
    jumpSound.play();
  }

  function addOneDalek(x, y){
      var dalek = daleks.getFirstDead();
      dalek.reset(x, y);
      dalek.body.velocity.x = -200;
      dalek.checkWorldBounds = true;
      dalek.outOfBoundsKill = true;
      dalek.width = 45;
      dalek.height= 45;
      dalek.body.width = 45;
      dalek.body.height = 45;
  }

  function addRowOfDaleks(){
    var hole = Math.floor(Math.random()*5)+1;
    for(var i = 0; i < 8; i++)
      if(i != hole && i != hole +1)
        addOneDalek(650, i*60+10);
    score += 1;
    txtScore.text = score;
  }

  function hitDalek(){
    if(tardis.alive === false)
      return;
    tardis.alive = false;
    game.time.events.remove(timer);
    daleks.forEachAlive(function(p){
        p.body.velocity.x = 0;
    }, this);
    killTardis();
  }

  function killTardis(){
    gameMusic.stop();
    game.state.start('gameover');
  }
})();
