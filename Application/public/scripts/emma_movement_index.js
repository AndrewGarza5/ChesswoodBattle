const emmaLogoDOM = document.getElementById('emma-app-logo')

function emmaMovement(){
    console.log(32)

    var position = 35

    setInterval(increaseSize, 10)
    var growing = true

    function increaseSize(){
    
        
            if(growing){
                emmaLogoDOM.style.height = position + "vmin"
                position = position + 1
                console.log(2)
                if(position > 42){
                    growing = false
                }
            }
            else{
                emmaLogoDOM.style.height = position + "vmin"
                position = position - 1
                if(position < 38){
                    growing = true
                }
            }

        

    }
}

function emmaGrowsLarge(){
    console.log(32)
    emmaLogoDOM.style.height = '50px';
    var position = 50

    setInterval(increaseSize, 2)

    function increaseSize(){
        emmaLogoDOM.style.height = position + "px"
        position = position + 1
    }
}


emmaMovement()