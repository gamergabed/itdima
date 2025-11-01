/*
Codepointers:
- SetPos        (X, Y)
- ChangePos     (X, Y)
- SetVel        (X, Y)
- ChangeVel     (X, Y)
- SetAcl        (X, Y)
- ChangeAcl     (X, Y)
- SetFct        (X, Y)
- ChangeFct     (X, Y)
- Dash          (Speed, Direction): Sets velocity to [Speed] and [Direction] provided (Uses Radians)
- Search        (Distance, Type): Sets target to closest of [Type] spesified
- FaceTarget    (): Sets velocity to face target
- Jump          (Chance, State): Jumps to [State] if the random number generated is less then [Chance]
- JumpIfCloser  (Distance, State): Jumps to [State] if target is less then [Distance]
- JumpIfButtons (Buttons, State): Jumps to [State] if buttons provided are all pressed (Only checks buttons from player provided in sprite)
- JumpIfHitWall (Direction, State): Jumps to [State] if hitting wall in [Direction]
- JumpIfFlag    (Flag, State): Jumps to [State] if flag is set
- JumpIfTarget  (State): Jumps to [State] if target exists
- Fire          (Projectile Type, Direction): Creates a projectile facing [Direction] (Uses radians)
- ForceTarget   (Distance, Direction): Sets the position of the target to a certain [Distance] and [Direction] away
- Explode       (Damage, Distance): Deal [Damage] to sprites in [Distance]
- SetFlag       (Flag, Boolean): Turns On or Off a [Flag]
- End           (): Destroy itself
Flags:
- SpriteGhost: Ignore sprite collisions
- WallGhost: Ignore wall collisions
- Invis: Stops being rendered
- Missile: Moves at a constant speed | Starts with the spesified speed
- NoTarget: Cannot become a target
- Harmable: Can be dealt Damage
- Extra1: Does nothing
- Extra2: Does nothing
- Extra3: Does nothing
- Extra4: Does nothing
- Extra5: Does nothing
- Extra6: Does nothing
*/

enum Flags {
    SPRITEGHOST=1,
    WALLGHOST=2,
    INVIS=4,
    MISSILE=8,
    NOTARGET=16,
    HARMABLE=32,
    EXTRA1=64,
    EXTRA2=128,
    EXTRA3=256,
    EXTRA4=512
}

// [Image name]:[Length]:[Next state]:[Codepointer]:[Arg 1]:[Arg 2];
let currentStates: any = null
let currentActors = [] // [100,0,0]

/**
 * State blocks
 */
//% weight=100 color=#f2c11d icon="⚙"
namespace ITDIMA {

    /**
     * Load State code (I recommend using it at the beginning)
     * @param code describe parameter here, eg: '''PlayRWalk:5:0:0;'''
     */
    //% block
    export function LoadStates(code: string) {
        currentStates = code
        console.log("-- ITDIMA -- : Loaded states!")
    }

    /**
     * Load Actor code (I recommend using it at the beginning)
     * @param code describe parameter here, eg: '''PlayRWalk:5:0:0;'''
     */
    //% block
    export function LoadActors(code: any[]) {
        currentActors = code
        console.log("-- ITDIMA -- : Loaded actors!")
    }

    /**
     * Initualisizes a sprite for ITDIMA
     * @param sprite Sprite to handle
     */
    //% block
    export function InitSprite(sprite: Sprite) {
        sprites.setDataNumber(sprite, "StateDelay", 0)
        sprites.setDataNumber(sprite, "StatePointer", 0)
        sprites.setDataNumber(sprite, "StateFlags", 0)
        sprites.setDataNumber(sprite, "HP", 100)
    }

    /**
     * Handle states for sprite until delay is reached (I recommend calling during game ticks)
     * @param sprite Sprite to handle
     * @param pointer Pointer to states
     */
    //% block
    export function DoState(sprite: Sprite, pointer: number) {
        if (currentStates == null) { game.splash("ITDIMA", "States aren't loaded :(")
        } else if (sprites.readDataNumber(sprite, "StateDelay") > 0) {sprites.changeDataNumberBy(sprite, "StateDelay", -1); return}

        let argus: any[] = []
        let point: number = pointer
        for (let count = 255; count>0; count--) {
            argus = GetLine(currentStates,point).split(':')
            sprite.setImage(assets.image(argus[0]))
            sprites.setDataNumber(sprite, "StateDelay", argus[1])
            point = argus[2]
            if (argus[1] > 0) {break}
        }
    }
}

/* // this is useless :)
function split(input: string, seperator: string) {
    let output: string[] = []
    let currentItem: string = ''
    for (let x=0; x<input.length; x++) {
        if (input.charAt(x) == seperator) {output.push(currentItem); currentItem=''}
        else {currentItem.concat(input.charAt(x))}
    }
    return output
}
*/

function GetLine(states: string, line: number) {
    let count = 0
    let begin = 0
    for (let x=0; x<states.length; x++) {
        if (states.charAt(x) == ';') {count++}
        if (count == line-1) {begin = x}
        if (count == line) {
            return states.substr(begin,x-begin)
        }
    }
    return null
}