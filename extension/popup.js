const goalInput = document.getElementById("goalInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

// 1. Load saved goal & Doomscroll stats
chrome.storage.local.get(["focusGoal", "doomscrollCount"], (result) => {
    
    // --- A. Handle Goal UI State ---
    if (result.focusGoal) {
        goalInput.value = result.focusGoal;
        goalInput.disabled = true;
        saveBtn.style.display = "none";
        clearBtn.style.display = "block";
    }

    // --- B. Handle Shame Rank UI ---
    // This logic MUST be inside here to access 'result'
    const count = result.doomscrollCount || 0;
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

// 3. Mission Complete Logic
clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove("focusGoal", () => {
        status.innerText = "You are free! 🎉";

        goalInput.value = "";
        goalInput.disabled = false;
        saveBtn.style.display = "block";
        clearBtn.style.display = "none";
        setTimeout(() => window.close(), 1000);
    });
});