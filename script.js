let type = "";
let TOEICS_USED=[];
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
UmbrellaRainy`.split('\n');
const contest = document.getElementById('contest');
const format = document.getElementById('format');
const main = document.getElementById('main');
const title = document.getElementById('title');
const timer = document.getElementById('timer');
const tbWrite = document.getElementById('tbWrite');
const backButton = document.getElementById('back');
const question = document.getElementById('question');
const ielts = document.getElementById('ielts');
const fileInput = document.getElementById('file');
const results = document.getElementById('results-inner');
//const checkbox = document.getElementById("toggle");
let progressing = false;
//let enableAI=true;
/*
function CheckForBox(){
  enableAI=checkbox.checked;
}
  */
//setInterval(CheckForBox,1000)
const HideAll = () => {
    contest.className = 'selbox hidden';
    format.className = 'selbox hidden';
    ielts.className = 'selbox hidden';
    main.className = 'selbox mainbox hidden';
    backButton.className = 'selector hidden';
    document.getElementById('results-outer').className = 'selbox mainbox hidden';
    //cbd();
};
const selectIelts = () => {
    type = 'IELTS';
    HideAll();
    format.className = 'selbox';
    title.innerHTML = 'IELTS Practice';
    backButton.className = 'selector';
    selWD();
};
const selectToeic = () => {
    type = 'TOEIC';
    HideAll();
    format.className = 'selbox';
    title.innerHTML = 'TOEIC Practice';
    backButton.className = 'selector';
    selWD();
};
const goBack = () => {
    HideAll();
    contest.className = 'selbox';
};
function getBase64FromImageUrl(url, callback) {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => callback(reader.result);
            reader.onerror = (error) => console.error('Error: ', error);
        })
        .catch((error) => console.error('Fetch error: ', error));
}
let curr = '';

function MakeTOEICQuestion(task, result) {
  
  let question = TOEICS[Math.floor(TOEICS.length * (Math.random() * 0.99))];
  while(TOEICS_USED.includes(question)){
    question = TOEICS[Math.floor(TOEICS.length * (Math.random() * 0.99))];
  }
  TOEICS_USED=TOEICS_USED.concat([question]);
  curr = question
    .split(/(?=[A-Z])/)
    .join(",")
    .toLowerCase();
  getBase64FromImageUrl(
    `Questions/TOEIC/Part 1 (Questions 1-5)/${question}.png`,
    (r) => {
      document.getElementById(
        result
      ).innerHTML = /*html*/ `Writing Task ${task}:<br>Describe the following image using the given words<br><img src="${r}"><br><h1>${curr}</h1>`;
      Task = [
        `Writing Task ${task}:\nDescribe the following image in one sentence using the following words: ${curr}.`,
        r.split(",")[1],
      ];
    }
  );
}
goBack();
const fr = new FileReader();
fr.onload = (e) => {
    const text = e.target.result; // File contents as text
    console.log(text); // Log to console
};
fileInput.addEventListener('change', (e) => {
    console.log(fr.readAsText(e.target.files[0]));
});

let cdate = 0,
    time,
    minute,
    second,
    stage = 0;
const selWD = () => {
    HideAll();
    if (type === 'IELTS') {
        ielts.className = 'selbox';
        backButton.className = 'selector';
    } else {
        main.className = 'selbox mainbox';
        stage = 0;
        TestForMarked();
        setInterval(timerProgression, 100);
    }
};
const UpdateWD = () => {
    HideAll();
    main.className = 'selbox mainbox';
    stage = 0;
    progressing = false;
    TestForMarked();
    setInterval(timerProgression, 100);
};
function TestForMarked() {
    try {
        marked.parse('test :)');
    } catch {
        alert('The markdown parser cannot load. Your experience might not be good as intended.');
    }
}
let generationProgressing = false;
let Task = '';
let questions = [];
let answers = [];
const Question = (content = '') => {
    if (!progressing) {
        console.log(tbWrite.value);
        questions = questions.concat([Task]);
        answers = answers.concat([tbWrite.value]);

        tbWrite.value = '';
        question.innerHTML = content;
        stage++;
        progressing = true;
    }
};

const timerProgression = () => {
    if (type == 'IELTS') {
        if (stage == 0) {
            if (!progressing) {
                if (mode == '2') {
                    stage++;
                } else {
                    generationProgressing = true;
                    Question(`Please wait...<br><span class='loader'>`);
                    MakeWT('IELTS', 'Writing Task 1', 'question', 'Writing Task 1:\n', 20 * 60);
                }
            }
        } else if (stage == 1) {
            if (!progressing) {
                if (mode == '1') {
                    stage++;
                } else {
                    generationProgressing = true;
                    Question(`Please wait...<br><span class='loader'>`);
                    MakeWT('IELTS', 'Writing Task 2', 'question', 'Writing Task 2:\n', 40 * 60);
                }
            }
        } else if (stage == 2) {
            if (!progressing) {
                alert('Results are being processed...');
                questions = questions.concat([Task]);
                answers = answers.concat([tbWrite.value]);
                stage = 3;
                questions.shift();
                answers.shift();
                HideAll();
                document.getElementById('results-outer').className = 'selbox mainbox';
                for (let i = 0; i < questions.length; i++) {
                    getAIResponse(
                        `I'm currently practicing for IELTS, can you review my answer? Please provide detailed feedback, and potential places for improvement.
            Question: ${questions[i]}
            My answer:
            ${answers[i]}`,
                    ).then((r) => {
                        results.innerHTML += parseAIOutput(r + '\n\n\n');
                    });
                }
            }
        }
    } else {
        if (stage == 0) {
            if (!progressing) {
                Question('Question 1: Picture');
                MakeTOEICQuestion('1', 'question');
                BeginTimer(60);
            }
        }
        if (stage == 1) {
            if (!progressing) {
                Question('Question 2: Picture');
                MakeTOEICQuestion('2', 'question');
                BeginTimer(60);
            }
        }
        if (stage == 2) {
            if (!progressing) {
                Question('Question 3: Picture');
                MakeTOEICQuestion('3', 'question');
                BeginTimer(60);
            }
        }
        if (stage == 3) {
            if (!progressing) {
                Question('Question 4: Picture');
                MakeTOEICQuestion('4', 'question');
                BeginTimer(60);
            }
        }
        if (stage == 4) {
            if (!progressing) {
                Question('Question 5: Picture');
                MakeTOEICQuestion('5', 'question');
                BeginTimer(60);
            }
        }
        if (stage == 5) {
            //skipped
            //stage++;
            //progressing=true;//for testing purposes
            if (!progressing) {
                generationProgressing = true;
                Question(`Please wait...<br><span class='loader'>`);
                MakeWT(
                    'TOEIC',
                    'Writing Task 6 (Reply to a written request)',
                    'question',
                    'Writing Task 6:\n',
                    40 * 60,
                    'Try to match real tests as closely as possible.',
                );
                BeginTimer(40 * 60);
            }
        }
        if (stage == 6) {
            //skipped
            //progressing=true;//for testing purposes
            //Question(`Please wait...<br><span class='loader'>`);
            if (!progressing) {
                generationProgressing = true;
                Question(`Please wait...<br><span class='loader'>`);
                MakeWT(
                    'TOEIC',
                    'Writing Task 7 (Reply to a written request)',
                    'question',
                    'Writing Task 7:\n',
                    40 * 60,
                    'Try to match real tests as closely as possible.',
                );
                BeginTimer(40 * 60);
            }
        }
        if (stage == 7) {
            //skipped
            //stage++;
            //progressing=true;//for testing purposes
            if (!progressing) {
                generationProgressing = true;
                Question(`Please wait...<br><span class='loader'>`);
                MakeWT(
                    'TOEIC',
                    'Writing Task 8 (Express your opinions in the form of an essay)',
                    'question',
                    'Writing Task 8:\n',
                    40 * 60,
                    'Try to match real tests as closely as possible.',
                );
                BeginTimer(40 * 60);
            }
        }
        if (stage == 8) {
            if (!progressing) {
                alert('Results are being processed...');
                stage = 9999;
                questions = questions.concat([Task]);
                answers = answers.concat([tbWrite.value]);
                questions.shift();
                answers.shift();
                HideAll();
                document.getElementById('results-outer-toeic').className = 'selbox mainbox';
                //handle AI stuff
                for (let i = 0; i < answers.length; i++) {
                    if (typeof questions[i] === typeof [1, 2]) {
                        getAIResponseWithImage(
                            `I'm practicing for TOEIC, can you review my answers?\nQuestion:${questions[i][0]}\nMy answer:${answers[i]}`,
                            questions[i][1],
                        ).then((r) => {
                            document.getElementById('toeic' + (i + 1)).innerHTML = parseAIOutput(r);
                        });
                    } else {
                        getAIResponse(
                            `I'm practicing for TOEIC, can you review my answers?\nQuestion:${questions[i]}\nMy answer:${answers[i]}`,
                        ).then((r) => {
                            document.getElementById('toeic' + (i + 1)).innerHTML = parseAIOutput(r);
                        });
                    }
                }
            }
        }
    }
};
alert(
    'Due to testing purposes, the AI will be temporarily disabled. It is expected to be turned back on by Friday.',
);
let id;
const BeginTimer = (time = 9999) => {
    progressing = true;
    cdate = Date.now() + time * 1000;
    id = setInterval(UpdateTimer, 100);
};
function HideTabs() {
    document.getElementById('tab1').className = 'tab';
    document.getElementById('tab2').className = 'tab';
    document.getElementById('tab3').className = 'tab';
    document.getElementById('tab4').className = 'tab';
    document.getElementById('tab5').className = 'tab';
    document.getElementById('tab6').className = 'tab';
    document.getElementById('tab7').className = 'tab';
    document.getElementById('tab8').className = 'tab';
    document.getElementById('toeic1').className = 'toeic hidden';
    document.getElementById('toeic2').className = 'toeic hidden';
    document.getElementById('toeic3').className = 'toeic hidden';
    document.getElementById('toeic4').className = 'toeic hidden';
    document.getElementById('toeic5').className = 'toeic hidden';
    document.getElementById('toeic6').className = 'toeic hidden';
    document.getElementById('toeic7').className = 'toeic hidden';
    document.getElementById('toeic8').className = 'toeic hidden';
}
const UpdateTimer = () => {
    time = Math.floor((cdate - Date.now()) / 1000);
    if (time <= 0) {
        timer.innerHTML = '0:00';
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
    timer.innerHTML = `${minute}:${second.toString().padStart(2, '0')}`;
};
const submit = () => {
    cdate = 0;
    progressing = false;
};

const parseAIOutput = (s) => {
    try {
        return marked.parse(s);
    } catch {
        console.warn('Marked does not work. The UI might not be good as expected.');
        return s;
    }
};

let lastCall = 0; // Stores the last time the function was called
const RATE_LIMIT = 100; // 60 seconds in milliseconds

async function getAIResponse(prompt = '') {
    return Promise.resolve('im sorry but ai has been disabled. you asked ' + prompt);
    const apiKey = 'AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY'; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
async function getAIResponseWithImage(prompt = '', picture = '') {
    return Promise.resolve('im sorry but ai has been disabled. you asked ' + prompt);
    const apiKey = 'AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY'; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: picture,
                        },
                    },
                    { text: prompt },
                ],
            },
        ],
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

const cleanGeneratedText = (text = '') => {
    // Define common leading phrases using regex
    const leadingPhrasesRegex = /^(Okay,|Sure! H|Here|Try a).*$/gim;
    const encouragementRegex = /(Good luck!|Remember to)/gim;

    // Remove leading phrases
    text = text.replace(leadingPhrasesRegex, '').trim();

    // Remove extra encouragement sentences
    text = text.replace(encouragementRegex, '').trim();

    return text;
};

const MakeWT = (
    contest = 'IELTS',
    wanted = 'foo',
    id = '',
    prefix = '',
    time = 9999,
    suffix = "Notes: Please don't use photo diagrams - I heard AI's like you have a hard time drawing them. Tables are OK though.",
) => {
    cdate = 0;
    timer.innerHTML = 'Loading...';
    getAIResponse(
        `I'm practicing for ${contest}, can you generate a ${wanted} question for me? I don't want any tips/directions, as I'd like this to be a sort of mock test.\n ${suffix}`,
    ).then((r) => {
        generationProgressing = false;
        Task = cleanGeneratedText(r);
        document.getElementById(id).innerHTML = parseAIOutput(prefix + Task);
        BeginTimer(time);
    });
};
