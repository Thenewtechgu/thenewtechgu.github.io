let type = '';
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
let progressing = false;

const HideAll = () => {
    contest.className = 'selbox hidden';
    format.className = 'selbox hidden';
    ielts.className = 'selbox hidden';
    main.className = 'selbox mainbox hidden';
    backButton.className = 'selector hidden';
    document.getElementById('results-outer').className = 'selbox mainbox hidden';
};
const selectIelts = () => {
    type = 'IELTS';
    HideAll();
    format.className = 'selbox';
    title.innerHTML = 'IELTS Practice';
    backButton.className = 'selector';
};
const selectToeic = () => {
    type = 'TOEIC';
    HideAll();
    format.className = 'selbox';
    title.innerHTML = 'TOEIC Practice';
    backButton.className = 'selector';
};
const goBack = () => {
    HideAll();
    contest.className = 'selbox';
};
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
            Question('Question 1: Picture', 60);
        }
        if (stage == 1) {
            Question('Question 2: Picture', 60);
        }
        if (stage == 2) {
            Question('Question 3: Picture', 60);
        }
        if (stage == 3) {
            Question('Question 4: Picture', 60);
        }
        if (stage == 4) {
            Question('Question 5: Picture', 60);
        }
        if (stage == 5) {
            Question('Question 6: Written Request', 120);
        }
        if (stage == 6) {
            Question('Question 7: Written Request', 120);
        }
        if (stage == 7) {
            Question('Question 8: Opinion Essay', 300);
        }
        if (stage == 8) {
            if (!progressing) {
                alert('Results are being processed...');
                stage = 9999;
            }
        }
    }
};
let id;
const BeginTimer = (time = 9999) => {
    progressing = true;
    cdate = Date.now() + time * 1000;
    id = setInterval(UpdateTimer, 100);
};

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
async function getAIResponseExperimentalDoNotTouchUntilISayTo(prompt = '') {
    //debugging, don't need AI *yet*
    const apiKey = 'AIzaSyACUiew2xvOhoLEQXiUtcqld7xl0BG4YwY'; // Replace with your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: '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',
                        },
                    },
                    { text: 'Describe this image in detail.' },
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

const MakeWT = (contest = 'IELTS', wanted = 'foo', id = '', prefix = '', time = 9999) => {
    cdate = 0;
    timer.innerHTML = 'Loading...';
    getAIResponse(
        `I'm practicing for ${contest}, can you generate a ${wanted} question for me? I don't want any tips, as I'd like this to be a sort of mock test.\nNotes: Please don't use photo diagrams - I heard AI's like you have a hard time drawing them. Tables are OK though.`,
    ).then((r) => {
        generationProgressing = false;
        Task = cleanGeneratedText(r);
        document.getElementById(id).innerHTML = parseAIOutput(prefix + Task);
        BeginTimer(time);
    });
};
