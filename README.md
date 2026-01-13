# Focus-Roast 

**The meanest productivity tool on the internet.**

Most site blockers are polite. They show a nice quote or a blank screen. You just turn them off.
**Focus-Roast** is different. It uses AI to bully you into working.

![Demo](https://via.placeholder.com/800x400?text=Insert+Screenshot+of+Red+Screen)

##  Features

* **Context-Aware Roasts:** It reads your goal (e.g., "Study Calculus") and the site you are procrastinating on (e.g., "Instagram"), then generates a savage insult using **Gemini AI**.
* **Audio Guilt 🔊:** It uses Text-to-Speech to read the roast out loud. Good luck scrolling in the library.
* **Gallery of Disappointment:** Shows random GIFs of people (Gordon Ramsay, The Office) looking disappointed in you.
* **The "Walk of Shame" 🚶‍♂️:** You can't just click "Close". To unlock the site, you must type: *"I am weak and lazy"*.
* **Shame Rank System 📉:** Keeps track of how many times you failed.
    * *0-2:* Safe... for now
    * *3-5:* Certified Clown 🤡
    * *10+:* Oxygen Thief 💀

##  How to Run (Local Setup)

I built this to run locally so your browsing data stays private (and free).

### 1. The Brain (Backend) 
```bash
# Clone the repo
git clone [https://github.com/YOUR_USERNAME/focus-roast.git](https://github.com/YOUR_USERNAME/focus-roast.git)
cd focus-roast/backend

# Install dependencies
pip install -r requirements.txt

# Add your Gemini API Key (Free)
# Create a .env file: GEMINI_API_KEY=your_key
echo "GEMINI_API_KEY=AIzaSy..." > .env

# Start the roasting server
uvicorn main:app --reload

2. The Trap (Extension) 
Open Chrome -> chrome://extensions
Enable Developer Mode.
Click Load Unpacked.
Select the focus-roast/extension folder.

How to Play
Click the extension icon.
Enter a goal (e.g., "Finish my Resume").
Click Lock In 🔒.
Try to open Twitter or Instagram.
Get destroyed.


License
MIT License. Feel free to fork this and make it even meaner.
