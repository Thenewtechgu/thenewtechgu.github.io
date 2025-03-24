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
const results = document.getElementById("results");
let progressing = false;

const HideAll = () => {
  contest.className = "selbox hidden";
  format.className = "selbox hidden";
  ielts.className = "selbox hidden";
  main.className = "selbox mainbox hidden";
  backButton.className = "selector hidden";
  document.getElementById("results-outer").className = "selbox mainbox hidden";
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
fileInput.addEventListener("change", (e) => {
  console.log(fr.readAsText(e.target.files[0]));
});

let cdate = 0,
  time,
  minute,
  second,
  stage = 0;
const selWD = () => {
  HideAll();
  if (type === "IELTS") {
    ielts.className = "selbox";
    backButton.className = "selector";
  } else {
    main.className = "selbox mainbox";
    stage = 0;
    TestForMarked()
    setInterval(timerProgression, 100);
  }
};
UpdateWD = () => {
  HideAll();
  main.className = "selbox mainbox";
  stage = 0;
  progressing = false;
  TestForMarked()
  setInterval(timerProgression, 100);
};
function TestForMarked() {
  try {
    marked.parse("test :)");
  } catch {
    alert(
      "The markdown parser cannot load. Your experience might not be good as intended."
    );
  }
}
let Task = "";
let questions = [];
let answers = [];
const Question = (content = "", timer = 0) => {
  if (!progressing) {
    console.log(tbWrite.value);
    questions = questions.concat([Task]);
    answers = answers.concat([tbWrite.value]);

    tbWrite.value = "";
    question.innerHTML = content;
    BeginTimer(timer);
    stage++;
  }
};

const timerProgression = () => {
  if (type == "IELTS") {
    if (stage == 0) {
      if (!progressing) {
        if (mode == "2") {
          stage++;
        } else {
          Question(/*html*/ `Please wait...<br><span class='loader'>`, 20 * 60);
          MakeWT("IELTS", "Writing Task 1", "question", "Writing Task 1:\n");
        }
      }
    } else if (stage == 1) {
      if (!progressing) {
        if (mode == "1") {
          stage++;
        } else {
          Question(/*html*/ `Please wait...<br><span class='loader'>`, 40 * 60);
          MakeWT("IELTS", "Writing Task 2", "question", "Writing Task 2:\n");
        }
      }
    } else if (stage == 2) {
      if (!progressing) {
        alert("Results are being processed...");
        questions = questions.concat([Task]);
        answers = answers.concat([tbWrite.value]);
        stage = 3;
        questions.shift();
        answers.shift();
        HideAll();
        document.getElementById("results-outer").className = "selbox mainbox";
        for (let i = 0; i < questions.length; i++) {
          getAIResponse(
            `I'm currently practicing for IELTS, can you review my answer? Please provide detailed feedback, and potential places for improvement.
            Question:${questions[i]}
            My answer:
            ${answers[i]}`
          ).then((r) => {
            results.innerHTML += parseAIOutput(r + "\n\n\n");
          });
        }
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
      if (!progressing) {
        alert("Results are being processed...");
        stage = 9999;
      }
    }
  }
};
let id;
const BeginTimer = (time = 0) => {
  progressing = true;
  cdate = Date.now() + time * 1000;
  id = setInterval(UpdateTimer, 100);
};

const UpdateTimer = () => {
  time = Math.floor((cdate - Date.now()) / 1000);
  if (time <= 0) {
    timer.innerHTML = "0:00";
    tbWrite.ariaDisabled = true;
    tbWrite.ariaReadOnly = true;
    tbWrite.disabled = true;
    tbWrite.readOnly = true;
    clearInterval(id);
    progressing = false;
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
const submit = () => {
  cdate = 0;
  progressing = false;
}
function parseAIOutput(s) {
  try {
    return marked.parse(s);
  } catch {
    console.warn("Marked does not work. The UI might not be good as expected.");
    return s;
  }
}
let lastCall = 0; // Stores the last time the function was called
const RATE_LIMIT = 60000; // 60 seconds in milliseconds
let ENABLE_AI = false;
async function getAIResponse(prompt = "") {
  //debugging, don't need AI *yet*
  if (!ENABLE_AI) {
    return Promise.resolve(
      `This is a test response from \`\`${prompt.replace(/[*`]/gm, '"')}\`\``
    );
  }
  const now = Date.now(); // Current timestamp

  if (now - lastCall < RATE_LIMIT) {
    console.warn(
      `AI request is on cooldown from "${prompt}". Please wait before making another request.`
    );
    return Promise.resolve(
      `AI request is on cooldown from "${prompt}". Please wait before making another request.`
    ); // Return a resolved promise to prevent breaking async code
  }

  lastCall = now; // Update the last call time
  const apiKey = "AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY"; // Replace with your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

const cleanGeneratedText = (text = "") => {
  // Define common leading phrases using regex
  const leadingPhrasesRegex = /^(Okay,|Sure! H|Here|Try a).*$/gim;
  const encouragementRegex = /(Good luck!|Remember to)/gim;

  // Remove leading phrases
  text = text.replace(leadingPhrasesRegex, "").trim();

  // Remove extra encouragement sentences
  text = text.replace(encouragementRegex, "").trim();

  return text;
}

const MakeWT = (contest = "IELTS", wanted = "foo", id = "", prefix = "") => {
  getAIResponse(
    `I'm practicing for ${contest}, can you generate a ${wanted} question for me? I don't want any tips, as I'd like this to be a sort of mock test.\nNotes: Please don't use photo diagrams - I heard AI's like you have a hard time drawing them. Tables are OK though.`
  ).then((r) => {
    Task = cleanGeneratedText(r);
    document.getElementById(id).innerHTML = parseAIOutput(prefix + Task);
  });
};
