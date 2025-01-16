# Screen Distance Detection

## Overview
This webapp warns users if they are sitting too close to their screen. Using the device's camera and AI-based face detection powered by the [Human.js](https://github.com/vladmandic/human) library, the app measures the user's proximity to the screen and provides an audible and visual warning if they are too close.

---

## Features
- Detects the user's face and calculates the distance from the screen.
- Displays a visual warning and plays an audio alert when the user is too close.
- User-friendly interface with start and stop controls for the camera.

---

## Prerequisites
- A modern web browser with WebRTC support (e.g., Chrome, Firefox, Edge).
- Access to the device's camera.

---

## Usage

1. Open the app in your browser.
2. Click **Enable Camera** to start face detection.
3. If you move too close to the screen, a warning will:
   - Display a red message: "You are too close to the screen!"
   - Play an audio alert.
4. Click **Disable Camera** to stop detection and turn off the camera.

---

## How It Works
1. **Face Detection**: The app uses Human.js to detect the user's face and measure its dimensions.
2. **Distance Calculation**: Based on the width of the detected face in pixels, the app calculates an approximate distance.
3. **Warning Threshold**: If the calculated distance is below a predefined threshold, the app triggers a warning.

---

## Customization
### Adjust Warning Threshold
To modify the distance sensitivity, update the following line in `app.js`:

```javascript
if (distance < 0.0035) {
  warnUser();
}
```

Replace `0.0035` with your desired threshold value.

---

## Work Locally

### 1. Clone or Download the Repository
```bash
git clone https://github.com/SammriddhGupta/Screen-Sentry.git
```

### 2. Install a Local Server (if needed)
The app requires a server to serve the files. You can use a lightweight server like `http-server`:
Note: using `-g` installs it globally in your system

```bash
npm install -g http-server
```

### 3. Start the Server
Navigate to the project folder and start the server:

```bash
http-server
```

The app will be available at `http://localhost:8080` by default.


---



## Credits
- **Human.js**: AI-powered face detection library ([GitHub](https://github.com/vladmandic/human)).
- **Audio Credit**: Sound Effect by [Otto](https://pixabay.com/users/voicebosch-30143949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=175692) from [Pixabay](https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=175692).

---

