// app.js
import "./modules/display.js";
import { getLocalTime } from "./modules/backgroundDisplay.js";

getLocalTime();

// FOR TESTING WEATHER ANIMATIONS
import * as Background from "./modules/background.js";
window.Background = Background;

import * as BackgroundDisplay from "./modules/backgroundDisplay.js";
window.BackgroundDisplay = BackgroundDisplay;

import * as Display from "./modules/display.js";
window.Display = Display;