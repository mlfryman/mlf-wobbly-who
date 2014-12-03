var game = new Phaser.Game(800, 480, Phaser.AUTO, 'wobblyWho');

/*  MISC VARS  */
var background,
    button,
    title,
    instruct,
    instructions,
    tardis;

/* AUDIO */
var menuMusic,
    gameMusic,
    tardisSound,
    jumpSound,
    killSound,
    gameOver;

/* SCORE & TIMER */
var timer,
    txtScore,
    score;

/* BADDIES */
var dalek,
    daleks,
    exdalek;
