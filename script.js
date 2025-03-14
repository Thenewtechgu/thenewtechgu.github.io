let type = "";
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const main = document.getElementById("mainer");
const title = document.getElementById("title");
const timer = document.getElementById("timer");
const tbwritten = document.getElementById("tbwritten");
const backer = document.getElementById("backer");
const question = document.getElementById("question");
const ielts = document.getElementById("ielts");
const filer = document.getElementById("filer");
var timerInProgress = false;
function HideAll() {
  contest.className = "selbox hidden";
  format.className = "selbox hidden";
  ielts.className = "selbox hidden";
  main.className = "selbox mainbox hidden";
  backer.className = "selector hidden";
}
function selectIelts() {
  type = "IELTS";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "IELTS Practice";
  backer.className = "selector";
}
function selectToeic() {
  type = "TOEIC";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "TOEIC Practice";
  backer.className = "selector";
}
function goBack() {
  HideAll();
  contest.className = "selbox";
  backer.className = "selector";
}
const fr=new FileReader();
fr.onload = function(e) {
  const text = e.target.result; // File contents as text
  console.log(text); // Log to console
};
filer.addEventListener("change", function (event) {
  console.log(fr.readAsText(event.target.files[0]));


});
var cdate = 0;
var time;
var second;
var minute;
var stage = 0;
function selWD() {
  HideAll();
  if (type == "IELTS") {
    ielts.className = "selbox";
    backer.className = "selector";
  } else {
    main.className = "selbox mainbox";
    stage = 0;
    setInterval(UpdateStuff, 100);
  }
}
function UpdateWD() {
  HideAll();
  main.className = "selbox mainbox";
  stage = 0;
  setInterval(UpdateStuff, 100);
}
function Question(content, timer) {
  if (!timerInProgress) {
    console.log(tbwritten.value);
    tbwritten.value = "";
    question.innerHTML = content;
    BeginTimer(timer);
    stage++;
  }
}
function UpdateStuff() {
  if (type == "IELTS") {
    if (stage == 0) {
      if (mode != "2") {
        Question("Writing Task 1", 60);
      } else {
        stage++;
      }
    } else if (stage == 1) {
      if (mode != "1") {
        Question("Writing Task 2", 120);
      } else {
        stage++;
      }
    } else if (stage == 2) {
      if (!timerInProgress) {
        console.log(tbwritten.value);
        tbwritten.value = "";
        alert("Results are being processed...");
        stage = 9999;
      }
    }
  } else {
    if (stage == 0) {
      Question("Task 1 - write task based on pic", 60);
    }
    if (stage == 1) {
      Question("Task 2 - write task based on pic", 60);
    }
    if (stage == 2) {
      Question("Task 3 - write task based on pic", 60);
    }
    if (stage == 3) {
      Question("Task 4 - write task based on pic", 60);
    }
    if (stage == 4) {
      Question("Task 5 - write task based on pic", 60);
    }
    if (stage == 5) {
      Question("Task 6 - Respond", 120);
    }
    if (stage == 6) {
      Question("Task 7 - Respond", 120);
    }
    if (stage == 7) {
      Question("Task 8 - Essay", 300);
    }
    if (stage == 8) {
      if (!timerInProgress) {
        alert("Results are being processed...");
        stage = 9999;
      }
    }
  }
}
var id;
function BeginTimer(time) {
  timerInProgress = true;
  cdate = Date.now() + time * 1000;
  id = setInterval(UpdateTimer, 100);
}

function UpdateTimer() {
  time = Math.floor((cdate - Date.now()) / 1000);
  if (time <= 0) {
    timer.innerHTML = "0:00";
    tbwritten.ariaDisabled = true;
    tbwritten.ariaReadOnly = true;
    tbwritten.disabled = true;
    tbwritten.readOnly = true;
    clearInterval(id);
    timerInProgress = false;
    return;
  } else {
    tbwritten.ariaDisabled = false;
    tbwritten.ariaReadOnly = false;
    tbwritten.disabled = false;
    tbwritten.readOnly = false;
  }
  second = time % 60;
  minute = (time - second) / 60;
  timer.innerHTML = minute + ":" + (second >= 10 ? "" : "0") + second;
}
function submit() {
  cdate = 0;
}
