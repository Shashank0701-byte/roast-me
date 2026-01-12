const goalInput = document.getElementById("goalInput");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");

// 1. Load saved goal & Toggle Buttons
chrome.storage.local.get(["focusGoal"], (result) => {
    if (result.focusGoal) {
        goalInput.value = result.focusGoal;
        goalInput.disabled = true; // Disable editing while locked
        saveBtn.style.display = "none";
        clearBtn.style.display = "block";
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

// 3. Clear Logic
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