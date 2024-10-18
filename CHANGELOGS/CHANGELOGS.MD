<center><h1>CHANGELOGS</h1></center>

## [1.2.8]

🆙Big Update!

- ✨ Updated updater timing and improved AppNavbar structure
- ✨ Added delay for update checks.
- 🛠️ Enhanced transition durations for smoother UI experience
- ✨ Pass install/uninstall functions to AddonModal.
- 🛠️ Refactor handling of addon actions
- ✨ Added modal state management.
- 🛠️ Improved styles and layout for addon details
- 👠 stylized second Card ui
- 🖼️ add more backgrounds
- 😊 change grid 3 to 6 on lg windows still 3 on md windows
- 😊 two styles are implemented, simple and compact
- 📸 Some logos are optimized
- 🏜️ New fuction to implemented new UIX
- 🍫 Titlebar litle change
- 🔗 Modal to view more addon info are implemented

## [1.2.7]

- 🐛 Fixed several bugs when trying to use the menu items and it bucle on Loading page..

## [1.2.6]

- 🔃 Loading page...
- 🛠️ Refactor: Move useWowPath logic to its own hook for - better structure.
- 🐛 Fix: Ensure handleWowPathChange properly triggers addon refresh.
- 🧹 Cleanup: Simplify path selection logic in handleMenuItemClick.
- ✨ Feature: Add success/error handling in Wow path selection with modals.
- ⚡ Optimization: Use modal context for error and success messages during path selection.
- 🗂️ Config: Add openFileDialog handler in the main process for Wow expansions.
- 📂 Enhancement: Validate selected WoW paths for Interface and WTF directories.
- 📝 Docs: Update get-config and path handlers to return detailed error messages.

## [1.2.5]

- 🔃 Loading page...
- 🛠️ Refactor: Move useWowPath logic to its own hook for better structure.
- 🐛 Fix: Ensure handleWowPathChange properly triggers addon refresh.
- 🧹 Cleanup: Simplify path selection logic in handleMenuItemClick.
- ✨ Feature: Add success/error handling in Wow path selection with modals.
- ⚡ Optimization: Use modal context for error and success messages during path selection.
- 🗂️ Config: Add openFileDialog handler in the main process for Wow expansions.
- 📂 Enhancement: Validate selected WoW paths for Interface and WTF directories.
- 📝 Docs: Update get-config and path handlers to return detailed error messages.

## [1.2.4] 

## 🚀 Patch Notes for Electron App Update

### 🔧 Refactor & Code Improvement
- Complete refactor of the app's codebase to make it cleaner, more maintainable, and scalable.
### 📊 Dynamic Addon Types

- The Select component now dynamically pulls all addon types directly from the API's JSON files. These will now auto-update without manual intervention! 🎉

### 🔢 Multiple Selection Support

- The Select component now supports multiple selections! You can easily filter addons by multiple types, making addon management more flexible and efficient.

## [1.2.4] 

Howdy, for this new update we fixed a few problems in the installation of the addons.

### 🪲BUG FIXED

- fixed the problem with the addon names when installing them is fixed.
- fixed the problem with the loading button being removed when there was a concurrent installation
- fixed the problem with the progress bar being removed during simultaneous installation

### 🛠️IMPROVED

- added a class to handle multiple downloads, now all downloads are queued and start when the previous one finishes.

## [1.2.3] 
 In this update... 🔥

###  🛠️ Corrections
- fixes the unpacking and copying process of the addons folders for a better optimization in the process. this will make the addon names more stylized.
- Change name to Maddons Manager.

## [1.2.2] 
###  🛠️ Corrections

🛠️ Fixeeees moment.

fixes the process of how the app recognized the installed
addons and now only deleting specific folders that are
written in the API no longer makes splits.

## [1.2.1] 
### 🆕 New Features and 🛠️ Corrections

Hello everyone in this update we bring

New custom TitleBar.
New clean logo.
Cards in contentaddon is now fixed
some UI issue is now fixed

## [1.2.0] 
### 🆕 New Features and 🛠️ Corrections
**🛠️IMPROVED**
- About content modal added
- Control toggle menu to close on click any item
- 
**🪲BUG FIXED**

- some translates fixed
- parse html fixed
- remove shadowscroll from modals, we need fix the new scroll

## [1.1.9]
### 🆕 New Features and 🛠️ Corrections
Hello, new factures and important bug fixes.

**🛠️Improved**

- Progress bar to install/uninstall addon

**🪲 Bug Fixes**

- Fixed update notifications
- Fixed visual uninstall button on install addons.

## [1.1.8]
### 🆕 New Features and 🛠️ Corrections
- Fixed backend issues.
- Rename Window to Master Addon Manager

## [1.1.7]
### 🆕 New Features and 🛠️ Corrections
- New version based on react.
- This version is on Dev
- it will be constantly updated and will receive several upgrades


## [1.1.6]

### 🆕 New Features and 🛠️ Corrections

- Scaffolding all files
- Fixed windows when open any URL
- Move Addons.json path
- Move changelogs.md path

  [Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.1.5...v1.1.6)

## [1.1.5]

### 🛠️ Corrections

- Fixed some folders were not deleted
  [Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.1.4...v1.1.5)

## [1.1.4]

### 🛠️ Corrections

- Fixed some error when try update addons. (not at all)
- Fixed and Added alerts on update addon.
- Fixed and Added alerts on Deleted addon.
- Fixed some emojis on modal
  [Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.1.3...v1.1.4)

## [1.1.3]

### 🛠️ Corrections

- Fixed some error when try update addons. (not at all)
- Added alerts on update addon.
  [Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.1.0...v1.1.3)

## [1.1.2]

### 🆕 New Features

- New emojis in Menu logo
- New emojis in Filter utility
- New Three modals added
  - Warning modal
  - Error modal
  - Success modal
- all errors are now directed at modal.
- update modal now is the correct.
- add request addon in Menu logo.
- Fixed a bug that caused the menu to close automatically when opening it
- Fixed the modal when searching wow.exe
- Fixed error when you try select wow patch on first screen

## [1.1.1]

### 🆕 Testing incoming update

- Testing incoming update

## [1.1.0] - Lasted Version

### 🆕 New Features

- New Logo

## [1.0.9]

### 🆕 New Features

- added an option in the logo menu to choose again the location of wow.exe
- added About me modal to see the version and some other things about the app

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.8...v1.0.9)

## [1.0.8]

### 🛠️ Corrections

- Fixed error when trying to update addons split with `_` or `-`
- Fixed Spanish words

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.7...v1.0.8)

## [1.0.7]

### 🛠️ Corrections

- Fixed error when trying to update addons split with `_` or `-`

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.6...v1.0.7)

## [1.0.6]

### 🆕 New Features

- Added filter by Installed addons and NonInstalled addons

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.5...v1.0.6)

## [1.0.5]

### 🛠️ Corrections

- Fix the window manager icons (Minimize, Maximize, Close) to stick in the same position
- Added scrollbar into addon-container
- Addon-container setup to 50 from 10

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.4...v1.0.5)

## [1.0.4]

### 🛠️ Correcciones

- Fixed a critical bug that caused it to not iterate correctly from main to master

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.3...v1.0.4)

## [1.0.3]

### 🆕 Updates

- Updated Navbar
- Updated Scrollbar
- Updated motion when installing/uninstalling
- Updated `index.html`
- Updated some alerts

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.2...v1.0.3)

## [1.0.2]

### 🆕 New Feactures

- Added some features
- Added autoUpdater

[Full Changelog](https://github.com/PentSec/MasterAddonManager/compare/v1.0.1...v1.0.2)

## [1.0.0]

### ✅ RELEASE
