let type = "";
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const main = document.getElementById("mainer");
const title = document.getElementById("title");
const timer = document.getElementById("timer");
const tbwritten = document.getElementById("tbwritten");
const backer = document.getElementById("backer");
const question = document.getElementById("question");
var timerInProgress=false;
function selectIelts() {
  type = "IELTS";
  contest.className = "selbox hidden";
  format.className = "selbox";
  title.innerHTML = "IELTS Practice";
}
function selectToeic() {
  type = "TOEIC";
  contest.className = "selbox hidden";
  format.className = "selbox";
  title.innerHTML = "TOEIC Practice";
}
function goBack() {
  contest.className = "selbox";
  format.className = "selbox hidden";
}
var cdate = 0;
var time;
var second;
var minute;
var stage=0;
function selWD() {
  main.className = "selbox mainbox";
  format.className = "selbox hidden";
  backer.className = "selector hidden";
  stage=0;
  setInterval(UpdateStuffBecauseItTurnsOutYouCantWaitForConditionInJavascipt,100);

}
function UpdateStuffBecauseItTurnsOutYouCantWaitForConditionInJavascipt(){
  if(stage==0){
    question.innerHTML="Writing Task 1";
    BeginTimer(60);
    stage=1;

  }else if(stage==1){
    if(!timerInProgress){
      question.innerHTML="Writing Task 2";
      stage=2;
      BeginTimer(120);
      console.log(tbwritten.value);
      tbwritten.value=""
    }
  }else if(stage==2){
    if(!timerInProgress){
      console.log(tbwritten.value);
      tbwritten.value=""
      alert("Results are being processed...")
      stage=3;
    }
  }
}
var id;
function BeginTimer(time) {
  timerInProgress=true;
    cdate = Date.now()+time*1000;
    id=setInterval(UpdateTimer,100)
  }
  
function UpdateTimer() {
  time = Math.floor((cdate-Date.now())/1000);
  if(time<=0){
    timer.innerHTML="0:00";
        tbwritten.ariaDisabled=true;
        tbwritten.ariaReadOnly=true;
        tbwritten.disabled=true;
        tbwritten.readOnly=true;
        clearInterval(id);
      timerInProgress=false;
    return;
  }else{
    tbwritten.ariaDisabled=false;
    tbwritten.ariaReadOnly=false;
    tbwritten.disabled=false;
    tbwritten.readOnly=false;
  }
  second = time % 60;
  minute = (time - second) / 60;
  timer.innerHTML = minute + ":" + (second >= 10 ? "" : "0") + second;
}
function submit(){
  cdate=0;
}