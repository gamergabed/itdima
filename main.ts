// Example code
let states: string = `
hero1:1:1:null:0:0;
hero2:1:2:null:0:0;
hero3:1:3:null:0:0;
hero4:1:0:null:0:0;`
// [Image name]:[Length]:[Next state]:[Codepointer]:[Arg 1]:[Arg 2];
ITDIMA.LoadStates(states)

scene.setBackgroundColor(1)
let mySprite = sprites.create(assets.image`hero1`,0)