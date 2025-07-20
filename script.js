let gameSeq = [];
let userSeq = 0;
let level = 0;
let highScore = 0;
let game = false;
let h2 = document.querySelector('h2');
let btns = document.querySelectorAll('.btn');
let body = document.querySelector('body');
let score = document.querySelector('.high-score');
let play = document.querySelector('i');

play.addEventListener('click', function(){
    this.style.opacity = 0.5;
    if(game == false){
        game = true;
        levelUp();
        for(btn of btns){
            btn.addEventListener('click', btnPress);
        }
    }
});

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },300);

}

function levelUp(){
    level++;
    h2.innerText = `Level ${level}`;

    let random = Math.floor(Math.random()*4);
    
    gameSeq.push(btns[random]);
    btnFlash(btns[random]);
}

function btnPress(){
    btnFlash(this);
    if (gameSeq[userSeq] == this){
        userSeq++;
        if(userSeq == gameSeq.length){
            userSeq = 0;
            setTimeout(levelUp,1000);
        }
    }else{
        for(btn of btns){
            btn.removeEventListener('click', btnPress);
        }
        play.style.opacity = 1;
        body.style.backgroundColor = 'red';
        setTimeout(function(){body.style.backgroundColor='white';},300);
        if((level-1)>highScore){
            highScore = level-1;
            score.innerText = `High Score : ${highScore}`;
            h2.innerText = `Congratulations!!! New High Score : ${level-1}`
        }else{
            h2.innerText = `Game Over! Your Score : ${level-1}`;
        }
        gameSeq = [];
        userSeq = 0;
        level = 0;
        game = false;
    }
}