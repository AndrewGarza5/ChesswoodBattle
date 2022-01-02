const team1PlayersDOM = document.getElementById('team-1-players')
const btn = document.getElementById('tst-btn')

btn.addEventListener("click", async (e) => {
    var newBubble = this.createPlayerBubble()
    team1PlayersDOM.appendChild(newBubble)
    this.moveBubble()

})

function createPlayerBubble(){
    var newBubble = document.createElement("div")
    newBubble.className = "player-bubble"
    //newBubble.id = ""
    newBubble.style.height = '100px'
    newBubble.style.width = '100px'

    return newBubble
}

class PlayerBubble{

    constructor(IDnum){
        
        this.heightBubble = '75px';
        this.widthBubble = '75px';
        this.YLocation = 0; //Y coordinate
        this.XLocation = 0; // X coordinate
        this.startingSide = ""; //whether it spawns on left or right side
        this.speedBubble = "";
        this.IDnum = IDnum
        this.setBubbleProperties();
    }

    setBubbleProperties(){
        
        //sets height and width of bubble
        var randHeight = Math.floor(Math.random() * (9 - 6) + 6);
        var randWidth = Math.floor(Math.random() * (7 - 4) + 4);
        this.heightBubble = randHeight;
        this.widthBubble = randWidth;

        //sets X starting location of bubble
        var leftOrRight = Math.floor(Math.random() * 2) + 0;
        if(leftOrRight == 0){
            this.XLocation = 0;
            this.startingSide = "left";
        }
        else if(leftOrRight == 1){
            this.XLocation = 95;
            this.startingSide = "right";
        }

        //sets Y starting location
        var randTop = Math.floor(Math.random() * (95 - 0) + 0);
        this.YLocation = randTop;

        //sets interval speed
        var randSpeed = Math.floor(Math.random() * (95 - 0) + 0);
        this.speedBubble = randSpeed;

    }

    moveBubble(element){
            
        var interval = null;
        var position = 0;

        clearInterval(interval);
        //determines which way bubbles need to go
        if(this.startingSide == "left"){
            position = 0;
            var stopPosition = 100 - this.widthBubble;
            
            interval = setInterval(moveRight, 20, stopPosition); 
        }
        else if(this.startingSide == "right"){
            position = 100 - this.widthBubble;
            interval = setInterval(moveLeft, 1); 
        }
        //moves bubbles r to l
        function moveLeft(){
            if(position <= 0){
                
                clearInterval(interval);
            }
            else{
                position -= 0.05;
                element.style.left = position + "%";

            }
        }
        //moves bubbles l to r
        function moveRight(stop){

            
            if(position >= stop){
                
                clearInterval(interval);
            }
            else{
                position+=0.05;
                element.style.left = position + "%";

            }
        }
    }

    deleteThisBubble(){
        
    }

    getHeight(){
        return this.heightBubble;
    }

    getWidth(){
        return this.widthBubble;
    }

    getY(){
        return this.YLocation;
    }

    getX(){
        return this.XLocation;
    }

    getSpeed(){
        return this.speedBubble;
    }

    changeOnHover(){
        return null;
    }
}

