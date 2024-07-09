const DopamineGUI_StyleSheet_Minified = `@keyframes KF-topLineAnim{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}@keyframes msg{from{transform:translate(-120%, 0)}to{transform:none}}@keyframes KF-titleAnim{from{filter: hue-rotate(0deg)}to{filter: hue-rotate(-360deg)}}.DaGUI-MainBGBox{border:2px solid #000;color:#fff;display:flex;flex-direction:column;font-family:monospace;font-size:14px;background:#000;position:fixed;right:50px;top:20px;user-select:none;min-width:fit-content;height:500px;padding:10px;z-index:999;box-sizing:border-box}.DaGUI-MainBox{border:2px solid #000;color:#fff;display:flex;flex-direction:column;font-family:monospace;font-size:14px;background:#282828;position:relative;width:100%;height:100%;user-select:none;z-index:999;box-sizing:border-box}.DaGUI-ColorLine{background:linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);background-size:400% 400%;animation:KF-topLineAnim 15s ease infinite;height:4px}.DaGUI-TitleBox{font-size:16px;cursor:pointer;padding:10px;background:#000;display:flex;align-items:center;justify-content:space-between}.DaGUI-Title{font-family:Impact;font-weight:100;letter-spacing:2px;color:#f35626;background-image:linear-gradient(92deg, #f35626, #feab3a);background-clip:text;-webkit-text-fill-color:transparent;animation:KF-titleAnim 10s infinite linear}.DaGUI-content-wrapper{display:flex;flex-direction:row;flex-grow:1;overflow-y:auto;gap:10px}.DaGUI-content{display:flex;flex-direction:column;flex-grow:1;overflow-y:auto;padding:10px;background:#222;border:1px solid #444;box-sizing:border-box}.DaGUI-Option{align-items:center;background:#222;cursor:pointer;display:flex;justify-content:space-between;padding:5px 8px}.DaGUI-Option.text{background:#333;cursor:unset;justify-content:center;text-align:center}.DaGUI-Option:hover{background:#333}.DaGUI-Option span{color:#fff;font-family:monospace;font-size:14px}.DaGUI-OptionVal{font-size:0.8em}.DaGUI-content.DaGUI-OptionVal{font-weight:bolder}.DaGUI-Close{cursor:pointer;height:20px;opacity:0.5;position:absolute;right:5px;top:5px;width:20px}.DaGUI-Close:after,.DaGUI-Close:before{background:#fff;content:" ";height:20%;left:5px;position:absolute;top:5px;transform:translate(-50%, -50%) rotate(-45deg);width:20%}.DaGUI-Close:after{transform:translate(-50%, -50%) rotate(45deg)}.btn{background:red;border:3px solid #0003;cursor:pointer;padding:0.5em}.btng{background:green;border:3px solid #0003;cursor:pointer;padding:0.5em}.btn:active,.btng:active{transform:scale(0.8)}.msg{animation:msg 0.5s forwards, msg 0.5s reverse forwards 3s;background:#0009;bottom:10px;color:#fff;font-weight:bolder;left:10px;padding:15px;pointer-events:none;position:absolute;z-index:999999}.DaGUI-footer{text-align:center;padding-top:10px;margin-top:auto;border-top:1px solid #444;background:transparent;box-sizing:border-box}.DaGUI-checkbox{display:flex;align-items:center;background:#222;padding:5px 8px}.DaGUI-checkbox input[type="checkbox"]{display:none}.DaGUI-checkbox label{display:flex;align-items:center;cursor:pointer;position:relative}.DaGUI-checkbox label::before{content:'';width:40px;height:20px;background:red;border-radius:10px;margin-left:auto;transition:background 0.3s;position:relative}.DaGUI-checkbox label::after{content:'';width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:2px;left:2px;transition:left 0.3s}.DaGUI-checkbox input[type="checkbox"]:checked + label::before{background:green}.DaGUI-checkbox input[type="checkbox"]:checked + label::after{left:22px}.DaGUI-dropdown,.DaGUI-slider{display:flex;align-items:center;background:#222;padding:5px 8px}.DaGUI-dropdown select,.DaGUI-slider input[type="range"]{margin-left:auto;cursor:pointer;background:#333;border:1px solid #555;color:#fff}.DaGUI-slider input[type="range"]{width:100px}`;

// Helper function to create a new menu item
function createElement(label, enabled, htmlCode) {
  return {
    label: label,
    isEnabled: enabled,
    html: htmlCode
  };
}

class DopamineGUI {
  constructor() {
    // Menu Related Variables
    this.menuX = 0;
    this.menuY = 0;
    this.menuW = 0;
    this.menuH = 0;

    // HTML structure of the built menu
    this.menuHTML = "";

    // Container for menu items
    this.itemContainerID = "DaGUI-FeatureContain";
    this.itemContainerElm = null;

    // Main window ID
    this.menuWindowID = "DaGUI-MainWindow";

    // Collection of menu items
    this.menuItemsCollection = [];
    this.checkboxStates = [];
    this.checkboxIdx = 0;
  }

  // Method to initialize a new menu window
  beginWindow(x, y, w, h) {
    // Set menu coordinates and dimensions
    this.menuX = x;
    this.menuY = y;
    this.menuW = w;
    this.menuH = h;
    // First we append the menu stylesheet
    this.menuHTML = `
      <style>
        .DaGUIMenuLocation {position:absolute; top:${y}px; left:${x}px; z-index:1000;}
        ${DopamineGUI_StyleSheet_Minified}
      </style>`;

    // Then we Create the initial HTML structure for the menu
    this.menuHTML += `
      <div id="${this.menuWindowID}" class="DaGUI-MainBGBox DaGUIMenuLocation">
        <div class="DaGUI-MainBox">
          <div class="DaGUI-ColorLine"></div>
          <div class="DaGUI-TitleBox">
            <span class="DaGUI-Title">DOPAMINE</span>
            <span class="DaGUI-OptionVal">By KHALID</span>
          </div>
          <div class="DaGUI-content-wrapper">
            <div class="DaGUI-content" id="${this.itemContainerID}"></div>
          </div>
        </div>
      </div>`;

    // Add menu HTML to the page if not already present
    if (!document.querySelector(`#${this.menuWindowID}`)) {
      let newDiv = document.createElement("div");
      newDiv.innerHTML = this.menuHTML;
      document.body.appendChild(newDiv);
      this.itemContainerElm = document.querySelector(
        `#${this.itemContainerID}`
      );
    }
  }

  onTick() {
    if (this.itemContainerElm) {
      let fragment = document.createDocumentFragment();
      this.menuItemsCollection.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = item.html;
        fragment.appendChild(div);
      });
      this.itemContainerElm.innerHTML = "";
      this.itemContainerElm.appendChild(fragment);
      this.updateCheckboxStates();
    }
  }

  // Method to add a checkbox
  checkbox(label, settingsProp) {
    let currentIdx = `checkbox${++this.checkboxIdx}`;
    const checkboxHTML = `
      <div class="DaGUI-Option DaGUI-checkbox">
        <span>${label}</span>
        <input type="checkbox" id="${currentIdx}" ${
      settingsProp.value ? "checked" : ""
    } 
        onclick="DopamineGUI.toggleCheckboxState('${currentIdx}', '${label}')"/>
        <label for="${currentIdx}"></label>
      </div>`;
    this.menuItemsCollection.push(
      createElement(label, settingsProp.value, checkboxHTML)
    );
    this.checkboxStates[currentIdx] = settingsProp;
  }

  // Method to finalize the menu HTML and return it
  finalizeMenu() {
    this.menuHTML += "</div>";
    return this.menuHTML;
  }

  // Static method to toggle checkbox state
  static toggleCheckboxState(checkboxId, label) {
    const checkboxElement = document.getElementById(checkboxId);
    if (checkboxElement) {
      const setting = cheatMenu.checkboxStates[checkboxId];
      setting.value = checkboxElement.checked;
    }
  }

  // Method to update checkbox states in the DOM
  updateCheckboxStates() {
    Object.keys(this.checkboxStates).forEach((checkboxId) => {
      const checkboxElement = document.getElementById(checkboxId);
      const setting = this.checkboxStates[checkboxId];
      if (checkboxElement) {
        checkboxElement.checked = setting.value;
      }
    });
  }
}

// Usage Example

const cheatMenu = new DopamineGUI();
let settings = {
  aimbot: { value: false },
  esp: { value: true }
};

cheatMenu.beginWindow(10, 10, 300, 400);
cheatMenu.checkbox("Enable God Mode", settings.aimbot);
cheatMenu.checkbox("Enable ESP", settings.esp);

setInterval(() => cheatMenu.onTick(), 500);

// Debugging to show state changes
setInterval(() => console.log(settings), 1000);
