<p align="center">
<a href="https://maddonsmanager.github.io/">
<img width="20%" src="https://github.com/user-attachments/assets/a2f88c6e-98df-48e3-b03a-dc8093d19706" alt="Maddons Manager" />
<h1 align="center">Maddons Manager</h1>
</a>
</p>
</br>
<p align="center">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/pentsec/MaddonsManager">
<img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/pentsec/MaddonsManager/total">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/pentsec/MaddonsManager">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PentSec/MaddonsManager">
<a href="https://github.com/PentSec/MasterAddonManager/releases">
<img alt="GitHub Release" src="https://img.shields.io/github/v/release/pentsec/MaddonsManager">
</a>
<a href="https://discord.gg/fUw5C6tcZs">
<img alt="Discord" src="https://img.shields.io/discord/381471631643639820">
</a>
</a>

> [!IMPORTANT]
> 📝This project arose with the inspiration of Masterwow.net server and now takes another way, now we focus on saving and providing you with the largest amount of addons of the 3 most played versions of wow Lichking 3.3.5, Cataclysm 4. 3.4 and Pandarian 5.4.8 from today 30 Sep 2024, a new app is born that will grow with the help of the community for now being very small and basing and creating itself from the hand of free services like github. who knows where we will 

### 🌟 if you think this App is useful for you, please give me a Star 🌟 
<a href="https://discord.gg/fUw5C6tcZs">
  <img src="https://svgl.app/library/discord.svg" alt="Join on Discord" width="50" />
</a>

Join our Discord!
</p>

## Getting Started



## 🔥 Features of [MaddonsManager](https://maddonsmanager.github.io/)

- 🔥 Addons for private server to Lichking, Cataclysm, Pandarian.
- 🔥 ElvUI profiles
- 🔥 WeakAuras profiles
- 📝 Alot of Guides
  
and many updates are coming, roadmap coming soon...

## 🤔 Need Help?

🪲 if you find a bug [please open an issue](https://github.com/PentSec/MasterAddonManager/issues)

💭 if you have any question or suggestion [please open a discussion](https://github.com/PentSec/MasterAddonManager/discussions)


## 📷 ScreenShots

![image](https://github.com/user-attachments/assets/28f84d47-d1e1-4fe5-bd4d-c617397698b6)

--- 

## 💻 PR to add a new Addon

follow this template to `include` a new Addon with pr on this repo

[Fork](https://github.com/PentSec/MaddonsManager/fork) this repository and clone it locally:
```bash
git clone https://github.com/PentSec/MaddonsManager.git
```

1. Go to the [**`API/Addons/`**](https://github.com/PentSec/MaddonsManager/tree/main/API/Addons) folder and inside select you folder expansion and create new Folder with name of addon and version `/Example3.3.5/` and `Example3.3.5.json`, then put the Example3.3.5.zip file Example3.3.5.webp and post.md. 
    - same instructions for ElvUI and WeakAuras profiles but in [API/ElvUI](https://github.com/PentSec/MaddonsManager/tree/main/API/ElvUI) and [API/WeakAuras](https://github.com/PentSec/MaddonsManager/tree/main/API/WeakAuras) and need add extra file.txt with string of profile and without .zip of course.

2. in post.md you can add Description, Guide, Screenshots, Videos, etc. all as you want and you can use [markdown](https://www.markdownguide.org/basic-syntax/) to format your text.

final estructure of Folders and files: 
```bash
├── API
│   ├── Addons
│   │   ├── Lichking/ Cataclysm/ Pandarian/ Vanilla/ TBC/
│   │   │   ├── Addon-name3.3.5.zip
│   │   │   │   ├── post.md
│   │   │   │   ├── Addon-name3.3.5.webp
│   │   │   │   └── Addon-name3.3.5.zip
│   │   │   ├── Addon-name3.3.5.json
```
```bash
├── API
│   ├── Elvui/ or WeakAuras/
│   │   ├── Lichking/ Cataclysm/ Pandarian/ Vanilla/ TBC/
│   │   │   ├── Elvui-name3.3.5.zip
│   │   │   │   ├── post.md
│   │   │   │   ├── Elvui-name3.3.5.webp
│   │   │   │   └── Elvui-name3.3.5.zip
│   │   │   ├── Elvui-name3.3.5.json
```

> [!WARNING]
>
> - The name of folder must be the same as the file_name in the json.
> - The name of the file.zip must be the same as the file_name in the json.
> - The name of the webp image must be the same as the file_name in the json.
> - The name of the json must be the same as the file_name in the json.
> - file_name cant be spaced or special characters.
> - Remember to optimize image for web to webp, you can use [squoosh](https://squoosh.app/) or my python script.
> - post.md, image.webp, .zip must be in the same folder
> - Only .webp images are supported.
> - The size limit for webp is **50kb**.

- **JSON Template**:
```json
    {
        "title": "Your Addon Title",
        "file_name": "name_of_folder",
        "description": "short descriptions of your addons",
        "author": "Addons Author",
        "pr_author": "Your Github Username",
        "avatar_pr_author": "https://avatars.githubusercontent.com/u/11955573?v=4",
        "expansion": [
            "Cataclysm"
        ],
        "tags": [
            "General",
            "PvE",
            "PvP"
        ],
        "roles": [
            "DPS",
            "TANK",
            "HEALER"
        ],
        "class": [
            "All"
        ]
    },
```

## availables expansions, tags, roles, classes
> [!WARNING]
>
> - This are cases sensitive.
> - You can obtain the avatar link from your github profile right click on your avatar and copy the link.
> - You can see the Author addons in the .toc file inside folder addons

```json
tags: ["General", "PvE", "PvP", "All Categories", "Achievements", "Action Bars", "Artwork", "Auction & Economy", "Audio & Video", "Bags & Inventory", "Boss Encounters", "Buffs & Debuffs", "Chat & Communication", "Class", "Combat", "Data Export", "Development Tools", "Guild", "Libraries", "Mail", "Map & Minimap", "Minigames", "Miscellaneous", "Professions", "Quests & Leveling", "Roleplay", "Tooltip", "Unit Frames", "Companions"], 

expansions: ["Cataclysm", "Lichking", "Pandarian"], 

roles: ["All", "DPS", "TANK", "HEALER"], 

classes: ["All", "Rogue", "Warrior", "Paladin", "Death Knight", "Druid", "Hunter", "Mage", "Monk", "Priest", "Shaman", "Warlock"]
```

## created and maintened with 💖 by [PentSec](https://jeff.is-a.dev/)

Help me with a tip.

<a href="https://www.paypal.me/Jeffreysfu/1">
  <img src="https://svgl.app/library/paypal-wordmark.svg" alt="paypal" width="200" />
</a>


## Contributors

<a href="https://github.com/PentSec/MaddonsManager/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PentSec/MaddonsManager" />
</a>
