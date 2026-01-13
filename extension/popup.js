const goalInput = document.getElementById("goalInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

// 1. Load saved goal & Doomscroll stats with DAILY CHECK
chrome.storage.local.get(["focusGoal", "doomscrollCount", "lastResetDate"], (result) => {
    
    // --- A. Handle Goal UI State ---
    if (result.focusGoal) {
        goalInput.value = result.focusGoal;
        goalInput.disabled = true;
        saveBtn.style.display = "none";
        clearBtn.style.display = "block";
    }

    // --- B. Handle Shame Rank UI ---
    // Check Date for Daily Reset
    const today = new Date().toDateString();
    const lastDate = result.lastResetDate || today;
    let count = result.doomscrollCount || 0;

    // If date changed, reset the view to 0 (storage updates on next roast)
    if (lastDate !== today) {
        count = 0;
        chrome.storage.local.set({ "doomscrollCount": 0, "lastResetDate": today });
    }

    const countElement = document.getElementById("doomCount");
    const shameBox = document.getElementById("shameBox");
    const shameTitle = document.getElementById("shameTitle");

    countElement.innerText = count;

    // Define Ranks
    let rankText = "Safe... for now";
    let rankColor = "#f1f2f6"; // Default Grey
    let rankBorder = "none";
    let textColor = "black";
    let numColor = "#57606f";

    if (count > 0 && count <= 2) {
        rankText = "Just a Slip-up 🤏";
        rankColor = "#dff9fb"; // Light Blue
    } else if (count > 2 && count <= 5) {
        rankText = "Certified Clown 🤡";
        rankColor = "#f7f1e3"; // Beige
        rankBorder = "2px solid #ffb142";
    } else if (count > 5 && count < 10) {
        rankText = "Professional Time Waster 📉";
        rankColor = "#ffcccc"; // Light Red
        rankBorder = "2px solid #ff4757";
    } else if (count >= 10) {
        rankText = "Oxygen Thief 💀";
        rankColor = "#2f3542"; // Dark Grey
        rankBorder = "2px solid black";
        textColor = "white"; // Invert text for dark mode
        numColor = "#ff4757";
    }

    // Apply Styles
    if (shameBox) {
        shameBox.style.backgroundColor = rankColor;
        shameBox.style.border = rankBorder;
        shameBox.style.color = textColor;
        shameTitle.innerText = rankText;
        countElement.style.color = numColor;
    }
});

// 2. Lock In Logic
saveBtn.addEventListener("click", () => {
    const goal = goalInput.value;
    if (goal) {
        chrome.storage.local.set({ "focusGoal": goal }, () => {
            status.innerText = "Locked In! 🔒";
            setTimeout(() => window.close(), 700);
        });
    }
});

// 3. Walk of Shame Logic
const shameSection = document.getElementById("shameSection");
const shameInput = document.getElementById("shameInput");
const confirmShameBtn = document.getElementById("confirmShameBtn");

clearBtn.addEventListener("click", () => {
    clearBtn.style.display = "none";
    shameSection.style.display = "block";
});

confirmShameBtn.addEventListener("click", () => {
    if (shameInput.value.toLowerCase() === "i am weak and lazy") {
        chrome.storage.local.remove("focusGoal", () => {
            status.innerText = "You are free... but at what cost?";
            goalInput.value = "";
            goalInput.disabled = false;
            saveBtn.style.display = "block";
            shameSection.style.display = "none"; // Hide shame section
            shameInput.value = ""; // Clear input

            setTimeout(() => window.close(), 1500);
        });
    } else {
        // Wrong typo
        status.innerText = "Type it exactly. Own your failure.";
        status.style.color = "red";
    }
});