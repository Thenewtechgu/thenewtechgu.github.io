let type = "";
const contest = document.getElementById("contest");
const format = document.getElementById("format");
const title = document.getElementById("title");
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