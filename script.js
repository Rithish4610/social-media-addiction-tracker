let timeSpent = 0;
let tabSwitches = 0;
let focusScore = 100;
let addictionScore = 0;

let active = true;

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
}

// 🔄 Update UI
function updateUI() {
  calculateAddiction();

  document.getElementById("time").innerText = timeSpent;
  document.getElementById("switches").innerText = tabSwitches;
  document.getElementById("focus").innerText = Math.max(focusScore, 0);
  document.getElementById("addiction").innerText = addictionScore;
}

// 🔁 Reset
function resetTracker() {
  timeSpent = 0;
  tabSwitches = 0;
  focusScore = 100;
  addictionScore = 0;
}
