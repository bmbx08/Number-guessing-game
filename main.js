//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 정답보다 작으면 유저번호 Down!!
//랜덤번호가 정답보다 크면 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다.(더 이상 추측 불가, 버튼이 disabled)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.
//(부가)값을 입력한 후 입력창을 누를 때 이전 입력값이 사라지게 한다.
//(부가)값을 맞출때도 play버튼이 비활성화되게 하기


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultText = document.querySelector(".result-text");
let resetButton = document.querySelector(".button-reset");
let resultAreaImg = document.querySelector(".main-img");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver=false;
let history=[];

chanceArea.innerHTML = `남은 기회:${chances}`;
playButton.addEventListener("click",play); //함수가 매개변수로 들어갔기 때문에 '()'가 빠진다
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){ //focus: 커서가 닿았을 때, 집중됬을 때
    userInput.value="" //이 함수는 익명의 함수(function())를 썼다. 이유는 내용이 많이 없고, 함수 선언은 오히려 메모리가 쓰이고, 그리고 한 번만 쓸거기 때문에 익명의 함수를 썼다.
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNum);
}

function play(){ 
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultText.textContent="1과 100사이 숫자를 입력해 주세요!";
        resultAreaImg.src="./image/same.gif";
        return; //함수를 바로 종료하고 싶으면 return을 쓰면 된다.
    }

    if(history.includes(userValue)){
        resultText.textContent="이미 입력한 숫자입니다!";
        resultAreaImg.src="./image/same.gif";
        return;
    }

    chances -- ;
    chanceArea.textContent=`남은 기회: ${chances}번`;
    //큰 따옴표는 정적인 값에만 쓴다.
    //동적, 정적인 값을 같이 넣고 싶으면 백틱(``)을 써야 한다.동적: 계속 바뀌는 값, 정적: 일정한 값
    console.log("chance", chances);

    history.push(userValue);
    console.log(history);

    if(userValue < computerNum){
        resultAreaImg.src="./image/up.gif"
        resultText.textContent = "Up!! 오빠 내 생일은 어떻게 기억할려고?"
    } else if(userValue > computerNum){
        resultAreaImg.src="./image/down.gif"
        resultText.textContent = "Down!! 실망이야.."
    } else {
        resultAreaImg.src="./image/success.gif"
        resultText.textContent = "맞췄습니다!!"
        gameOver = true;
    }

    

    if(chances == 0){
        gameOver=true;
        resultText.textContent = "실패! 모쏠 당첨!"<br>"우리 헤어져.."
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    // user input창이 깨끗하게 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    //결과창의 문구가 바뀐다.
    resultText.textContent="숫자를 맞추면 고백에 성공한다!"
    resultAreaImg.src="./image/confession.gif"
    gameOver=false;
    playButton.disabled = false;
    chances=5;
    chanceArea.innerHTML = `남은 기회:${chances}`;
    history=[];
}

pickRandomNum();

//UI만들 때는 반응형 사이트 만들기(사이트 사이즈에 따라 사이즈 변하는 UI들)