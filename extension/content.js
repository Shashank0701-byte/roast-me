// Check if user has a goal set AND handle Daily Reset
chrome.storage.local.get(["focusGoal", "doomscrollCount", "lastResetDate"], async (result) => {
    const goal = result.focusGoal;
    
    // If no goal is set, let them scroll in peace.
    if (!goal) return;

    // 🗓️ DAILY RESET LOGIC
    const today = new Date().toDateString(); // e.g., "Wed Jan 14 2026"
    const lastDate = result.lastResetDate || today;
    let count = result.doomscrollCount || 0;

    if (lastDate !== today) {
        // It's a new day! Reset the shame counter.
        count = 1; 
    } else {
        // Same day, keep stacking the shame.
        count++;
    }

    // Save the new count AND the date
    chrome.storage.local.set({ 
        "doomscrollCount": count, 
        "lastResetDate": today 
    });

    // UI: Immediately hide the page content to prevent "doomscrolling" while we fetch
    document.body.innerHTML = `<div style="background:black; height:100vh; display:flex; justify-content:center; align-items:center; color:white; font-family:sans-serif;"><h1>Judging you... 👀</h1></div>`;

    const currentSite = window.location.hostname;

    try {
        // Call the Backend
        const response = await fetch("http://127.0.0.1:8000/roast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goal: goal, site: currentSite })
        });

        const data = await response.json();
        const roast = data.roast;

        // 🔊 THE VOICE OF JUDGMENT (Audio Guilt)
        // This makes the browser speak the roast text out loud
        const speech = new SpeechSynthesisUtterance(roast);
        speech.lang = "en-US";
        speech.rate = 0.9;  // Slightly slower for dramatic effect
        speech.pitch = 0.8; // Deeper, more judgmental voice
        window.speechSynthesis.speak(speech);

        // Replace the WHOLE page with the Roast UI
        document.body.innerHTML = `
            <div class="roast-overlay">
                <div class="roast-container">
                    <h1>🛑 STOP.</h1>
                    <p class="goal-text">You said you would: <b>${goal}</b></p>
                    <div class="roast-box">
                        "${roast}"
                    </div>
                    <button onclick="window.close()">I'll go back to work 😔</button>
                </div>
            </div>
        `;
        
        // Inject styles dynamically (since we wiped the head)
        const style = document.createElement('style');
        style.textContent = `
            body { margin: 0; background-color: #1a1a1a; color: white; font-family: 'Arial', sans-serif; }
            .roast-overlay { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; }
            .roast-container { max-width: 600px; padding: 40px; border: 4px solid #ff4757; border-radius: 20px; background: #000; box-shadow: 0 0 50px rgba(255, 71, 87, 0.5); }
            h1 { font-size: 4rem; margin: 0 0 20px 0; color: #ff4757; text-transform: uppercase; letter-spacing: 5px; }
            .goal-text { font-size: 1.2rem; color: #aaa; margin-bottom: 30px; }
            .roast-box { font-size: 2rem; font-weight: bold; line-height: 1.4; margin-bottom: 40px; color: #fff; font-style: italic; }
            
            /* Button Styling - Updated for visibility */
            button { 
                padding: 15px 30px; 
                font-size: 1.2rem; 
                cursor: pointer; 
                background: white; 
                color: black; /* Force black text */
                border: none; 
                border-radius: 50px; 
                font-weight: bold; 
                transition: transform 0.2s; 
                display: inline-block;
            }
            button:hover { transform: scale(1.05); background-color: #f1f2f6; }
        `;
        document.head.appendChild(style);

    } catch (err) {
        console.error("Roast failed:", err);
        document.body.innerHTML = "<h1>Backend not running. You got lucky this time.</h1>";
    }
});