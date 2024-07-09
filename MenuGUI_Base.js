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
    this.checkboxStates  = [];
    this.checkboxIdx = 0;
  }

  // Method to initialize a new menu window
  beginWindow(x, y, w, h) {
    // Set menu coordinates and dimensions
    this.menuX = x;
    this.menuY = y;
    this.menuW = w;
    this.menuH = h;

    // Create the initial HTML structure for the menu
    this.menuHTML = `
      <style>
        .DaGUIMenuLocation {
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          z-index: 1000;
        }
      </style>
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
      this.itemContainerElm = document.querySelector(`#${this.itemContainerID}`);
    }
  }

  onTick() {
    if (this.itemContainerElm) {
      let fragment = document.createDocumentFragment();
      this.menuItemsCollection.forEach(item => {
        let div = document.createElement('div');
        div.innerHTML = item.html;
        fragment.appendChild(div);
      });
      this.itemContainerElm.innerHTML = "";
      this.itemContainerElm.appendChild(fragment);
    }
  }

  // Method to add a checkbox
  checkbox(label, settingsProp) {
    let currentIdx = `checkbox${++this.checkboxIdx}`;
    const checkboxHTML = `
      <div class="DaGUI-Option DaGUI-checkbox">
        <span>${label}</span>
        <input type="checkbox" id="${currentIdx}" ${settingsProp.value ? "checked" : ""} 
        onclick="DopamineGUI.toggleCheckboxState('${currentIdx}', '${label}')"/>
        <label for="${currentIdx}"></label>
      </div>`;
    this.menuItemsCollection.push(createElement(label, settingsProp.value, checkboxHTML));
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
