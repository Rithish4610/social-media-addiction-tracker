let timeSpent = 0;
let tabSwitches = 0;
let focusScore = 100;
let addictionScore = 0;

let active = true;

// Load streak from localStorage
let streak = localStorage.getItem("streak") || 0;
let lastDate = localStorage.getItem("lastDate") || null;

// Check if new day
const today = new Date().toDateString();
if (lastDate !== today) {
  streak++;
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastDate", today);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("streak").innerText = streak;
  updateUI();
});

// ⏱️ Time Tracker
setInterval(() => {
  if (active) {
    timeSpent++;
    updateUI();
  }
}, 1000);

// 👁️ Tab Visibility Detection
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    active = false;
    tabSwitches++;
    focusScore -= 5;
  } else {
    active = true;
  }
});

// 🧠 Addiction Calculation
function calculateAddiction() {
  addictionScore = Math.min(
    100,
    Math.floor((tabSwitches * 10) + (timeSpent / 6))
  );

  if (addictionScore >= 70) {
    alert("⚠️ Warning: Your addiction score is high!");
  }
}

// 🔄 Update UI
function updateUI() {
    calculateAddiction();

    document.getElementById("time").innerText = timeSpent;
    document.getElementById("switches").innerText = tabSwitches;
    document.getElementById("focus").innerText = Math.max(focusScore, 0);
    document.getElementById("addiction").innerText = addictionScore;
    document.getElementById("streak").innerText = streak;

    // Graph bars
    document.getElementById("barTime").style.height = (timeSpent*2) + "px";
    document.getElementById("barSwitch").style.height = (tabSwitches*20) + "px";
    document.getElementById("barAddiction").style.height = (addictionScore*2) + "px";

    // Addiction message
    const message = document.getElementById("message");
    if (addictionScore >= 80) {
      message.innerText = "You are addicted 😬";
    } else if (addictionScore >= 50) {
      message.innerText = "Be careful ⚠️";
    } else {
      message.innerText = "Good job! 👍";
    }
}

// 🔁 Reset
function resetTracker() {
  saveSession();
  timeSpent = 0;
  tabSwitches = 0;
  focusScore = 100;
  addictionScore = 0;
  updateUI();
}

// Save session history to localStorage
function saveSession() {
    let sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    sessions.push({
        date: new Date().toLocaleString(),
        time: timeSpent,
        switches: tabSwitches,
        addiction: addictionScore
    });
    localStorage.setItem("sessions", JSON.stringify(sessions));
}
