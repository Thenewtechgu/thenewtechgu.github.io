let type = "";
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const main = document.getElementById("mainer");
const title = document.getElementById("title");
const timer = document.getElementById("timer");
const tbwritten = document.getElementById("tbwritten");
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

function selWD() {
  main.className = "selbox mainbox";
  format.className = "selbox hidden";
  BeginTimer()
}
function BeginTimer() {
    cdate = Date.now();
    setInterval(UpdateTimer,100)
  }
function UpdateTimer() {
  time = Math.floor(10 - (Date.now() - cdate) / 1000);
  if(time<=0){
    timer.innerHTML="TIME IS UP";
        tbwritten.ariaDisabled=true;
        tbwritten.ariaReadOnly=true;
        tbwritten.disabled=true;
        tbwritten.readOnly=true;
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
