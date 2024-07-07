Welcome to my Repository! Dopamine | One of the Best Krunker.io Gaming Chair's of 2024<br>
This will contain my Private Krunker.io Gaming Chair, along with a Bypass.
<br>
## How Does the Anti-Cheat used by Krunker Work?
The Game "Krunker.io" uses a Custom JS Based Anti-Cheat System, that's pretty bad tbh. As far as i know, it works by detecting the following:
1. **External Tampering of Native JS Functions**:
   The Anti-Cheat system detects Tampered Native JS Functions both used and unused by the Game itself. The Anti-Cheat System can detect this if a
   UserScript (Cheat) is injected into the Game (Website) using a tool such as Tampermonkey, while not having a AntiCheat Bypass implemented.

2. **Altered Native JS Functions and Prototypes**:
   The Anti-Cheat system also detects altered versions of native JavaScript functions and prototypes, whether they are used by the game or not.
   Injecting a UserScript cheat that modifies these functions or prototypes will almost always trigger detection, especially if the cheat lacks an effective bypass.
<br>
<br>
<br>

# TODO

## Working Anti-Cheat Bypass Script
The Bypass should allow us to use altered/tampered Native JS functions and prototypes, all while staying undetected from the Game's Anti-Cheat System.

## Canvas Based Overlay for Drawing ESP
Using a canvas HTML element, we can create a sort of game overlay that is transparent and does not block the user from playing the game. With a working canvas, the job of drawing ESP features like health bars, distance, names, and ESP rectangles will become so much easier.


The Patcher should allow us to Use Tampered Native Functions and Prototypes while staying undetected.

The game in question is "Krunker.io," a web-based game that utilizes the THREE.JS library for its 3D WebGL game engine. The game's anti-cheat system is relatively weak and is based on JavaScript. It detects cheats by monitoring the following:

1. **Tampering with Native JavaScript Functions:** The anti-cheat system detects modifications to both used and unused native JavaScript functions. For example, if a JavaScript UserScript cheat is injected into the game using tools like Tampermonkey without a proper bypass, it is likely to be detected.

2. **Altered Native JavaScript Functions and Prototypes:** The anti-cheat system also detects altered versions of native JavaScript functions and prototypes, whether they are used by the game or not. Injecting a UserScript cheat that modifies these functions or prototypes will almost always trigger detection, especially if the cheat lacks an effective bypass.

---
### Quick introduction to the Game
The game is called **Krunker.IO**, a web-based game coded using Javascript. It was built using the JS Library **Three.js** as the **3D WebGL Game Engine**.
The **Three.js** library is also used by the game for graphical purposes. `The game has a custom anti-cheat, which isn't the best.`

