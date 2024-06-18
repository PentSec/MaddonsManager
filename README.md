# MasterAddonManager

![](https://github.com/PentSec/MasterAddonManager/blob/main/images/logo.png?raw=true)

# 💻Include new Addon

follow this template to  `<include>`  a new Addon

    {
        "name": "Same name as Repo",
        "githubRepo": "https://github.com/PentSec/MasterMount", --Link repo
        "imageUrl": "https://wow.zamimg.com/images/wow/icons/large/inv_mount_spectralhorse.jpg", --a logo referent to addon
        "addonType": "Mounts/Companion", -- addonType if there are any addons that are not in the list please notify.
        "author": "Sitoz", --author or contributor of the Addons
        "description": "Addons for Searching and Viewing mount model in Masterwow.net", --Real Description of addons
        "lastCommitDate": "2024-06-11",
		"addonInfolder": true, --if it is necessary to include this line only if the adons is in a subfolder.
        "Hot": "🔥" -- dont use this xd 
    }

# 📄ToDo list

- [ ] Fix icon and logo image.
- [ ] Fix the problem that it does not stop the uninstall process when there is an error and not writing the addons name in addonsStatus.json the uninstall process can not switch to install.
- [ ] ^ The same problem but in reverse in the installation process.
- [ ] Create modal windows for any type of warnings.
- [ ] Improve the progress bar. it can be any of daisyUI but that works, that shows when it is downloading, when it is decompressing and when the installation of the addon is finished.
- [ ] verify all error handling.
- [ ] Fix the window manager icons Minimize Maximize Close to stick in the same position

### Things to know
    📁C:\Users\USER\AppData\Roaming\electron-app
> 2 files will be stored here.

📄CONFIG.Json
📄addonStatus.Json

>they will contain information about the program.
deleting them lost the program storage about the address of your
world of warcraft folder and the installed addons.

this app is oriented to https://MasterWow.net/

## Video
[![Image from Gyazo](https://i.gyazo.com/8f4377e52d50311eb4b2b73a69023dd6.gif)](https://gyazo.com/8f4377e52d50311eb4b2b73a69023dd6)
![](https://github.com/PentSec/MasterAddonManager/blob/main/images/Captura%20de%20pantalla%202024-06-16%20172554.png?raw=true)
