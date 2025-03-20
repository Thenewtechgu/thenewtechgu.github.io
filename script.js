let type = "";
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const main = document.getElementById("main");
const title = document.getElementById("title");
const timer = document.getElementById("timer");
const tbWrite = document.getElementById("tbWrite");
const backButton = document.getElementById("back");
const question = document.getElementById("question");
const ielts = document.getElementById("ielts");
const fileInput = document.getElementById("file");
let timerInProgress = false;

const HideAll = () => {
  contest.className = "selbox hidden";
  format.className = "selbox hidden";
  ielts.className = "selbox hidden";
  main.className = "selbox mainbox hidden";
  backButton.className = "selector hidden";
};
const selectIelts = () => {
  type = "IELTS";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "IELTS Practice";
  backButton.className = "selector";
};
const selectToeic = () => {
  type = "TOEIC";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "TOEIC Practice";
  backButton.className = "selector";
};
const goBack = () => {
  HideAll();
  contest.className = "selbox";
  backButton.className = "selector";
};
const fr = new FileReader();
fr.onload = (e) => {
  const text = e.target.result; // File contents as text
  console.log(text); // Log to console
};
fileInput.addEventListener("change", (event) => {
  console.log(fr.readAsText(event.target.files[0]));
});

let cdate = 0,
  time,
  second,
  minute,
  stage = 0;
const selWD = () => {
  HideAll();
  if (type === "IELTS") {
    ielts.className = "selbox";
    backButton.className = "selector";
  } else {
    main.className = "selbox mainbox";
    stage = 0;
    setInterval(timerProgression, 1);
  }
};
UpdateWD = () => {
  HideAll();
  main.className = "selbox mainbox";
  stage = 0;
  setInterval(timerProgression, 1);
};
const Question = (content = "", timer = 0) => {
  if (!timerInProgress) {
    console.log(tbWrite.value);
    tbWrite.value = "";
    question.innerHTML = content;
    BeginTimer(timer);
    stage++;
  }
};
const timerProgression = () => {
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
        console.log(tbWrite.value);
        tbWrite.value = "";
        alert("Results are being processed...");
        stage = 9999;
      }
    }
  } else {
    if (stage == 0) {
      Question("Question 1: Picture", 60);
    }
    if (stage == 1) {
      Question("Question 2: Picture", 60);
    }
    if (stage == 2) {
      Question("Question 3: Picture", 60);
    }
    if (stage == 3) {
      Question("Question 4: Picture", 60);
    }
    if (stage == 4) {
      Question("Question 5: Picture", 60);
    }
    if (stage == 5) {
      Question("Question 6: Written Request", 120);
    }
    if (stage == 6) {
      Question("Question 7: Written Request", 120);
    }
    if (stage == 7) {
      Question("Question 8: Opinion Essay", 300);
    }
    if (stage == 8) {
      if (!timerInProgress) {
        alert("Results are being processed...");
        stage = 9999;
      }
    }
  }
};
let id;
function BeginTimer(time = 0) {
  timerInProgress = true;
  cdate = Date.now() + time * 1000;
  id = setInterval(UpdateTimer, 1);
}

function UpdateTimer() {
  time = Math.floor((cdate - Date.now()) / 1000);
  if (time <= 0) {
    timer.innerHTML = "0:00";
    tbWrite.ariaDisabled = true;
    tbWrite.ariaReadOnly = true;
    tbWrite.disabled = true;
    tbWrite.readOnly = true;
    clearInterval(id);
    timerInProgress = false;
    return;
  } else {
    tbWrite.ariaDisabled = false;
    tbWrite.ariaReadOnly = false;
    tbWrite.disabled = false;
    tbWrite.readOnly = false;
  }
  second = time % 60;
  minute = (time - second) / 60;
  timer.innerHTML = `${minute}:${second.toString().padStart(2, "0")}`;
}
function submit() {
  cdate = 0;
}
