let type = "";
let TOEICS_USED = [];
let TOEICS = `AtBreathtaking
BookshelfLibrary
BreakfastToast
BroomAutumn
CashierItems
CheckupX-ray
ChefKitchen
ColleaguesBrainstorm
FallBlock
FamilyBackyard
GuitarPark
LaptopCoffee shop
LaptopOffice
PaintbrushCanvas
StudentLaboratory
StudentsHomework
SuitcaseAirport
UmbrellaRainy`.split("\n");
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const main = document.getElementById("main");
const title = document.getElementById("title");
const timer = document.getElementById("timer");
const tbWrite = document.getElementById("tbWrite");
const backButton = document.getElementById("back");
const question = document.getElementById("question");
const ielts = document.getElementById("ielts");
const header = document.getElementById("header");
//const checkbox = document.getElementById("toggle");
//let enableAI=true;
/*
function CheckForBox(){
  enableAI=checkbox.checked;
}
  */
//setInterval(CheckForBox,1000)
const HideAll = () => {
  contest.className = "selbox hidden";
  format.className = "selbox hidden";
  ielts.className = "selbox hidden";
  main.className = "selbox mainbox hidden";
  backButton.className = "selector hidden";
  document.getElementById("results-outer").className = "selbox mainbox hidden";
  //cbd();
};
const selectIelts = () => {
  type = "IELTS";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "IELTS Practice";
  backButton.className = "selector";
  selWD();
};
const selectToeic = () => {
  type = "TOEIC";
  HideAll();
  format.className = "selbox";
  title.innerHTML = "TOEIC Practice";
  backButton.className = "selector";
  selWD();
};
const goBack = () => {
  HideAll();
  contest.className = "selbox";
};
function getBase64FromImageUrl(url, callback) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => callback(reader.result);
      reader.onerror = (error) => console.error("Error: ", error);
    })
    .catch((error) => console.error("Fetch error: ", error));
}
let curr = "";

function MakeTOEICQuestion(task, result) {
  let question = TOEICS[Math.floor(TOEICS.length * (Math.random() * 0.99))];
  while (TOEICS_USED.includes(question)) {
    question = TOEICS[Math.floor(TOEICS.length * (Math.random() * 0.99))];
  }
  TOEICS_USED = TOEICS_USED.concat([question]);
  curr = question
    .split(/(?=[A-Z])/)
    .join(", ")
    .toLowerCase();
  getBase64FromImageUrl(
    `Questions/TOEIC/Part 1 (Questions 1-5)/${question}.png`,
    (r) => {
      document.getElementById(
        result
      ).innerHTML = /*html*/ `<span style="font-weight:bolder">Question ${task}:</span>Describe the following image using the given words<br><img src="${r}"><br><h3>${curr}</h3>`;
      Task = [
        `Question ${task}:Describe the following image in one sentence using the following words: ${curr}.`,
        r.split(",")[1],
        task,
      ];
      questions = questions.concat([Task]);
    }
  );
}
goBack();

let cdate = 0,
  time,
  minute,
  second,
  stage = 0;
const exam = document.getElementById("exam");
const UploadBar = (
  i
) => /*html*/ `<div class="fullwidth"><button class="selector" onclick="uploadf('${i}')"><span class="material-symbols-outlined">upload_file
</span></button></div>`;

const selWD = () => {
  HideAll();
  if (type === "IELTS") {
    ielts.className = "selbox";
    backButton.className = "selector";
  } else {
    main.className = "selbox mainbox";
    setTimeout(resizeButtonText, 100);
    stage = 0;
    header.className = "hidden";
    TestForMarked();
    //make toeic questions
    BeginTimer(60 * 60); //1 hour
    exam.innerHTML = /*html*/ `
    
    <div id="question1"><span class="loader"><br></div>
    
    <textarea id="answer1"></textarea><br>
    <div id="question2"><span class="loader"><br></div>
    
    <textarea id="answer2"></textarea><br>
    <div id="question3"><span class="loader"><br></div>
    
    <textarea id="answer3"></textarea><br>
    <div id="question4"><span class="loader"><br></div>
    
    <textarea id="answer4"></textarea><br>
    <div id="question5"><span class="loader"><br></div>
    
    <textarea id="answer5"></textarea><br>
    <div id="question6"><span class="loader"><br></div>
    ${UploadBar("answer6")}
    <textarea id="answer6" class="big"></textarea><br>
    <div id="question7"><span class="loader"><br></div>
    ${UploadBar("answer7")}
    <textarea id="answer7" class="big"></textarea><br>
    <div id="question8"><span class="loader"><br></div>
    ${UploadBar("answer8")}
    <textarea id="answer8" class="big"></textarea><br>
    `;
    MakeTOEICQuestion("1", "question1");
    /*workaround for race conditions */
    setTimeout(() => {
      MakeTOEICQuestion("2", "question2");
    }, 1000);

    setTimeout(() => {
      MakeTOEICQuestion("3", "question3");
    }, 1500);
    setTimeout(() => {
      MakeTOEICQuestion("4", "question4");
    }, 2000);
    setTimeout(() => {
      MakeTOEICQuestion("5", "question5");
    }, 2500);

    MakeWT(
      "TOEIC",
      "Question 6 (Write a reply to a written request)",
      "question6",
      "Question 6:\n",
      6,
      "Try to match real tests as closely as possible."
    );

    MakeWT(
      "TOEIC",
      "Question 7 (Write a reply to a written request)",
      "question7",
      "Question 7:\n",
      7,
      "Try to match real tests as closely as possible."
    );

    MakeWT(
      "TOEIC",
      "Question 8 (Express your opinions in the form of an essay)",
      "question8",
      "Question 8:\n",
      8,
      "Try to match real tests as closely as possible."
    );
  }
};
const UpdateWD = () => {
  HideAll();
  main.className = "selbox mainbox";
  setTimeout(resizeButtonText, 100);
  stage = 0;
  header.className = "hidden";
  // make IELTS questions
  exam.innerHTML = "";
  if (mode == "1") {
    BeginTimer(20 * 60);
  }
  if (mode == "2") {
    BeginTimer(40 * 60);
  }
  if (mode == "both") {
    BeginTimer(60 * 60);
  }

  if (mode != "2") {
    exam.innerHTML += /*html*/ `
    <div id="question1"><span class="loader"><br></div>
    ${UploadBar("answer1")}
    <textarea id="answer1" class="big"></textarea><br>`;
    MakeWT("IELTS", "Writing Task 1", "question1", "Writing Task 1:\n", 1);
  }
  if (mode != "1") {
    exam.innerHTML += /*html*/ `
      <div id="question2"><span class="loader"><br></div>
      ${UploadBar("answer2")}
      <textarea id="answer2" class="big"></textarea><br>`;
    MakeWT("IELTS", "Writing Task 2", "question2", "Writing Task 2:\n", 2);
  }
};
function TestForMarked() {
  try {
    marked.parse("test :)");
  } catch (e) {
    alert(
      "The markdown parser cannot load. Your experience might not be good as intended."
    );
    console.error(`For those who asked, the error is ${e}.`);
  }
}
TestForMarked();
let generationProgressing = false;
let Task;
let questions = [];
let answers = [];

let id;
const BeginTimer = (time = 9999) => {
  cdate = Date.now() + time * 1000;
  id = setInterval(UpdateTimer, 100);
};
function HideTabs() {
  document.getElementById("tab1").className = "tab";
  document.getElementById("tab2").className = "tab";
  document.getElementById("tab3").className = "tab";
  document.getElementById("tab4").className = "tab";
  document.getElementById("tab5").className = "tab";
  document.getElementById("tab6").className = "tab";
  document.getElementById("tab7").className = "tab";
  document.getElementById("tab8").className = "tab";
  document.getElementById("toeic1").className = "toeic hidden";
  document.getElementById("toeic2").className = "toeic hidden";
  document.getElementById("toeic3").className = "toeic hidden";
  document.getElementById("toeic4").className = "toeic hidden";
  document.getElementById("toeic5").className = "toeic hidden";
  document.getElementById("toeic6").className = "toeic hidden";
  document.getElementById("toeic7").className = "toeic hidden";
  document.getElementById("toeic8").className = "toeic hidden";
}
function uploadf(i) {
  let target = document.getElementById(i);

  // Create and configure file input
  let fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "*/*";

  fileInput.onchange = async function () {
    let file = fileInput.files[0];
    if (!file) return;

    if (file.type === "text/plain") {
      // Handle plain text files directly
      let reader = new FileReader();
      reader.onload = function (e) {
        target.value = e.target.result;
      };
      reader.readAsText(file);
    } else {
      // Handle other file types (e.g., images)
      let reader = new FileReader();
      reader.onload = async function (e) {
        let dataURL = e.target.result;

        // Extract base64 data and image format
        let matches = dataURL.match(/^data:image\/(\w+);base64,(.*)$/);
        if (!matches) {
          console.error("File format invalid.");
          target.value =
            "File does not match specified file format. Please try again.";
          return;
        }

        let imgType = matches[1]; // e.g., "png", "jpeg"
        let rawBase64 = matches[2]; // base64 string without prefix

        try {
          target.disabled = true;
          target.value = "Processing file...";

          // Adjusted prompt to explicitly ask for a check on whether text is present
          let prompt =
            "Extract all text as plaintext from this image. If no text is found, respond with 'No text found in image.'";

          let text = await getAIResponseWithImage(prompt, rawBase64, imgType);

          // Check if the response contains an error message indicating no text
          if (text.trim().toLowerCase() === "no text found in image") {
            target.value = "Error: No text found in the image.";
          } else {
            target.value = text;
          }
        } catch (err) {
          console.error("AI processing failed:", err);
          target.value = "Failed to extract text from the image.";
        } finally {
          target.disabled = false;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  fileInput.click();
}

const UpdateTimer = () => {
  time = Math.floor((cdate - Date.now()) / 1000);
  if (time <= 0) {
    timer.innerHTML = "0:00";
    clearInterval(id);
    submit(true);
    return;
  }
  second = time % 60;
  minute = (time - second) / 60;
  timer.innerHTML = `${minute.toString().padStart(2, "0")}:${second
    .toString()
    .padStart(2, "0")}`;
};
const submit = (force = false) => {
  if (!force) {
    if (!confirm("Do you really want to submit?")) {
      return;
    }
  }

  if (type == "TOEIC") {
    questions.forEach((element) => {
      if (element.length == 3) {
        getAIResponseWithImage(
          `I'm practicing for TOEIC, can you review my answers?\nQuestion:${
            element[0]
          }\nMy answer:${
            document.getElementById("answer" + element[2]).value
          }\nNote: one thing that is required is the overall Level from 1-9 along with a Scale Score from 0-200. Only when you have provided that, you could explain your scoring.`,
          element[1]
        ).then((r) => {
          document.getElementById("toeic" + element[2]).innerHTML =
            parseAIOutput(r);
        });
      } else {
        getAIResponse(
          `I'm practicing for TOEIC, can you review my answers?\nQuestion:${
            element[0]
          }\nMy answer:${
            document.getElementById("answer" + element[1]).value
          }\nOne thing that is required is the overall Level from 1-9 along with a Scale Score from 0-200. Only when you have provided that, you could explain your scoring.`
        ).then((r) => {
          document.getElementById("toeic" + element[1]).innerHTML =
            parseAIOutput(r);
        });
      }
    });
    HideAll();
    HideTabs();
    document.getElementById("tab1").className = "tab selected";
    document.getElementById("toeic1").className = "toeic";
    document.getElementById("results-outer-toeic").className = "selbox mainbox";
  } else {
    questions.forEach((element) => {
      document.getElementById(
        "ielts" + element[1]
      ).innerHTML = /*html*/ `<span class="loader"></span>`;
      getAIResponse(
        `I'm practicing for IELTS, can you review my answers?\nQuestion:${
          element[0]
        }\nMy answer:${
          document.getElementById("answer" + element[1]).value
        }\nA requirement that I need to have is a table with 4 criteria of an IELTS Writing Task: TA, CC, LR, Grammar, each with a band from 1-9, and the overall band. Only when it has already been provided, explain your bands.`
      ).then((r) => {
        document.getElementById(
          "ielts" + element[1]
        ).innerHTML = /*html*/ `<h3>Writing Task ${
          element[1]
        }</h3>${parseAIOutput(r)}`;
      });
    });
    HideAll();
    document.getElementById("results-outer").className = "selbox mainbox";
  }
};

const parseAIOutput = (s) => {
  try {
    return marked.parse(s);
  } catch {
    console.warn("Marked does not work. The UI might not be good as expected.");
    return s;
  }
};
let ENABLE_AI = false;
async function getAIResponse(prompt = "") {
  if (!ENABLE_AI) {
    return Promise.resolve("AI has been disabled. you asked " + prompt);
  }
  const apiKey = "AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY"; // Replace with your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
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
async function getAIResponseWithImage(prompt = "", picture = "", type = "png") {
  if (!ENABLE_AI) {
    return Promise.resolve(
      "AI has been disabled. you asked " +
        prompt +
        "including a " +
        Math.round(picture.length / 1024) +
        "KB image"
    );
  }

  const apiKey = "AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY"; // Replace with your actual API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: `image/${type}`,
              data: picture,
            },
          },
          { text: prompt },
        ],
      },
    ],
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
};

const MakeWT = (
  contest = "IELTS",
  wanted = "foo",
  id = "",
  prefix = "",
  windex = 0,
  suffix = "Notes: Please don't use photo diagrams - I heard AI's like you have a hard time drawing them. Tables are OK though."
) => {
  //cdate = 0;
  //timer.innerHTML = /*html*/ `<span class='loader'></span>`;
  getAIResponse(
    `I'm practicing for ${contest}, can you generate a ${wanted} question for me? I don't want any tips/directions, as I'd like this to be a sort of mock test.\n ${suffix}`
  ).then((r) => {
    Task = [cleanGeneratedText(r), windex];
    questions = questions.concat([Task]);
    document.getElementById(id).innerHTML = parseAIOutput(
      prefix + cleanGeneratedText(r)
    );
    //BeginTimer(time);
  });
};
console.log(":)");
let SCALING_FACTOR = 0.15; // adjust for preferred scale

function resizeButtonText() {
  const btn = document.getElementById("submit-btn");
  const text = btn.querySelector("small");
  if (!btn) return;
  const icon = btn.querySelector(".material-symbols-outlined");

  // Use the parent container's width, subtract padding (10px on both sides = 20px)
  const parentWidth = btn.parentElement.offsetWidth - 20;

  // Calculate font size based on stable container width
  const fontSize = Math.max(10, parentWidth * SCALING_FACTOR);

  text.style.fontSize = `${fontSize}px`;
  icon.style.fontSize = `${fontSize}px`;
}
// Resize on load and on window resize

window.addEventListener("resize", resizeButtonText);
