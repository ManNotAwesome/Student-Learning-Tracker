/**************************************
 * CONNECT JS TO HTML
 **************************************/
const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectList = document.getElementById("subjectList");

const logsSection = document.getElementById("logsSection");
const selectedSubjectTitle = document.getElementById("selectedSubjectTitle");
const logInput = document.getElementById("logInput");
const addLogBtn = document.getElementById("addLogBtn");
const logList = document.getElementById("logList");

let selectedSubjectId = null;

function formatDate(dateStr) {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function getDayLabel(dateStr) {
    const logDate = new Date(dateStr);
    const today = new Date();

    // Remove time part for fair comparison
    logDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffDays = (today - logDate) / (1000 * 60 * 60 * 24);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    return formatDate(dateStr);
}

/**************************************
 * LOAD SUBJECTS ON PAGE LOAD
 **************************************/
window.onload = function () {
    fetchAllSubjects();
};


/**************************************
 * ADD SUBJECT BUTTON CLICK
 **************************************/
addSubjectBtn.addEventListener("click", function () {

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Please enter a subject");
        return;
    }

    addSubjectToBackend(subjectName);
});


/**************************************
 * ADD SUBJECT → BACKEND
 **************************************/
function addSubjectToBackend(name) {

    fetch("/subjects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(subject => {
        addSubjectToUI(subject);
        subjectInput.value = "";
    })
    .catch(error => {
        console.error("Error adding subject:", error);
    });
}


/**************************************
 * FETCH ALL SUBJECTS
 **************************************/
function fetchAllSubjects() {

    fetch("/subjects")
        .then(response => response.json())
        .then(subjects => {
            subjectList.innerHTML = "";
            subjects.forEach(addSubjectToUI);
        })
        .catch(error => {
            console.error("Error fetching subjects:", error);
        });
}


/**************************************
 * SHOW SUBJECT IN UI
 **************************************/
function addSubjectToUI(subject) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = subject.name;

    // Click subject → select it (needed for logs later)
    span.addEventListener("click", function () {
        selectSubject(subject);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // VERY IMPORTANT
        deleteSubject(subject.id, li);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    subjectList.appendChild(li);
}


/**************************************
 * SELECT SUBJECT (PREP FOR LOGS)
 **************************************/
function selectSubject(subject) {
    selectedSubjectId = subject.id;
    selectedSubjectTitle.textContent = "Logs for: " + subject.name;
    logsSection.classList.remove("hidden");
}


/**************************************
 * DELETE SUBJECT
 **************************************/
function deleteSubject(subjectId, listItem) {

    fetch(`/subjects/${subjectId}`, {
        method: "DELETE"
    })
    .then(() => {
        subjectList.removeChild(listItem);
        logsSection.classList.add("hidden");
        selectedSubjectId = null;
    })
    .catch(error => {
        console.error("Error deleting subject:", error);
    });
}
/**************************************
 * STUDY LOGS SECTION
 **************************************/

/*
 * When a subject is selected:
 * - selectedSubjectId is set
 * - logs section is shown
 * - logs are fetched
 */


/**************************************
 * FETCH STUDY LOGS FOR SUBJECT
 **************************************/
function fetchLogs() {

    if (selectedSubjectId === null) return;

    fetch(`/logs/${selectedSubjectId}`)
        .then(response => response.json())
        .then(logs => {

            // SORT BY DATE (newest first)
            logs.sort((a, b) => {
                return new Date(b.studyDate) - new Date(a.studyDate);
            });

            logList.innerHTML = "";
            logs.forEach(addLogToUI);
        })
        .catch(error => {
            console.error("Error fetching logs:", error);
        });
}


/**************************************
 * ADD LOG BUTTON CLICK
 **************************************/
addLogBtn.addEventListener("click", function () {

    if (selectedSubjectId === null) {
        alert("Please select a subject first");
        return;
    }

    const logText = logInput.value.trim();

    if (logText === "") {
        alert("Enter what you studied");
        return;
    }

    addLogToBackend(logText);
});


/**************************************
 * ADD STUDY LOG → BACKEND
 **************************************/
function addLogToBackend(description) {

    fetch(`/logs/${selectedSubjectId}?description=${encodeURIComponent(description)}`, {
        method: "POST"
    })
    .then(response => response.json())
    .then(log => {
        addLogToUI(log);
        logInput.value = "";
    })
    .catch(error => {
        console.error("Error adding log:", error);
    });
}


/**************************************
 * SHOW LOG IN UI
 **************************************/
function addLogToUI(log) {

    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = log.description;

    const dateSpan = document.createElement("small");
    dateSpan.textContent = " • " + getDayLabel(log.studyDate);
    dateSpan.style.color = "#777";

    textSpan.appendChild(dateSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        deleteLog(log.id, li);
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    logList.appendChild(li);
}



/**************************************
 * DELETE STUDY LOG
 **************************************/
function deleteLog(logId, listItem) {

    fetch(`/logs/${logId}`, {
        method: "DELETE"
    })
    .then(() => {
        logList.removeChild(listItem);
    })
    .catch(error => {
        console.error("Error deleting log:", error);
    });
}
