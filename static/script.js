const recordBtn = document.getElementById("recordBtn");
const statusText = document.getElementById("status");

const journalText = document.getElementById("journalText");
const titleInput = document.getElementById("title");

const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

const entriesContainer = document.getElementById("entriesContainer");
const searchInput = document.getElementById("searchInput");

const wordCount = document.getElementById("wordCount");
const timerDisplay = document.getElementById("timer");

const dateDisplay = document.getElementById("date");


/* Date */

dateDisplay.textContent = new Date().toLocaleDateString(
    "en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }
);


/* Speech Recognition */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.lang = "en-IN";

} else {

    recordBtn.disabled = true;

    statusText.textContent =
        "Speech recognition is not supported in this browser.";
}


/* Recording */

let isRecording = false;

let seconds = 0;
let timerInterval;


recordBtn.addEventListener("click", () => {

    if (!recognition) {
        return;
    }

    if (!isRecording) {

        recognition.start();

        isRecording = true;

        recordBtn.classList.add("recording");

        recordBtn.textContent =
            "⏹ Stop Recording";

        statusText.textContent =
            "Listening... Speak now";

        startTimer();

    } else {

        recognition.stop();

        isRecording = false;

        recordBtn.classList.remove("recording");

        recordBtn.textContent =
            "🎙️ Start Recording";

        statusText.textContent =
            "Recording stopped";

        stopTimer();
    }
});


/* Speech Result */

recognition &&
    recognition.addEventListener("result", (event) => {

        let transcript = "";

        for (
            let i = event.resultIndex; i < event.results.length; i++
        ) {

            transcript +=
                event.results[i][0].transcript;
        }

        journalText.value = transcript;

        updateWordCount();
    });


/* Recognition End */

recognition &&
    recognition.addEventListener("end", () => {

        if (isRecording) {

            recognition.start();

        }

    });


/* Timer */

function startTimer() {

    seconds = 0;

    timerInterval = setInterval(() => {

        seconds++;

        let minutes =
            Math.floor(seconds / 60);

        let secs =
            seconds % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    }, 1000);
}


function stopTimer() {

    clearInterval(timerInterval);
}


/* Word Count */

journalText.addEventListener(
    "input",
    updateWordCount
);


function updateWordCount() {

    const text =
        journalText.value.trim();

    const words =
        text ? text.split(/\s+/).length : 0;

    wordCount.textContent =
        `${words} words`;
}


/* Save Entry */

saveBtn.addEventListener("click", () => {

    const title =
        titleInput.value.trim();

    const content =
        journalText.value.trim();

    if (!content) {

        alert("Please write or record something first.");

        return;
    }

    const entry = {

        id: Date.now(),

        title: title || "My Journal Entry",

        content: content,

        date: new Date().toLocaleString()
    };


    const entries =
        JSON.parse(
            localStorage.getItem("voiceJournalEntries")
        ) || [];


    entries.unshift(entry);


    localStorage.setItem(
        "voiceJournalEntries",
        JSON.stringify(entries)
    );


    titleInput.value = "";

    journalText.value = "";

    updateWordCount();

    loadEntries();

    alert("Journal entry saved successfully!");
});


/* Load Entries */

function loadEntries(search = "") {

    const entries =
        JSON.parse(
            localStorage.getItem("voiceJournalEntries")
        ) || [];


    const filteredEntries =
        entries.filter(entry =>

            entry.title
            .toLowerCase()
            .includes(search.toLowerCase())

            ||

            entry.content
            .toLowerCase()
            .includes(search.toLowerCase())
        );


    entriesContainer.innerHTML = "";


    if (filteredEntries.length === 0) {

        entriesContainer.innerHTML =
            "<p>No journal entries found.</p>";

        return;
    }


    filteredEntries.forEach(entry => {

        const div =
            document.createElement("div");

        div.className = "entry";

        div.innerHTML = `

            <h3>${escapeHTML(entry.title)}</h3>

            <div class="entry-date">
                ${entry.date}
            </div>

            <p class="entry-content">
                ${escapeHTML(entry.content)}
            </p>

            <button
                class="delete-btn"
                onclick="deleteEntry(${entry.id})">

                Delete

            </button>
        `;

        entriesContainer.appendChild(div);

    });
}


/* Delete */

function deleteEntry(id) {

    let entries =
        JSON.parse(
            localStorage.getItem("voiceJournalEntries")
        ) || [];


    entries =
        entries.filter(
            entry => entry.id !== id
        );


    localStorage.setItem(
        "voiceJournalEntries",
        JSON.stringify(entries)
    );


    loadEntries(searchInput.value);
}


/* Search */

searchInput.addEventListener(
    "input",
    () => {

        loadEntries(
            searchInput.value
        );

    }
);


/* Security */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* Initial Load */

loadEntries();