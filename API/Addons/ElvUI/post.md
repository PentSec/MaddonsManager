# Post for ElvUI

[![Game Version](https://img.shields.io/badge/wow-3.3.5-blue.svg)](https://github.com/ElvUI-WotLK)

# ElvUI - Wrath of the Lich King (3.3.5a)

This is the backported version of ElvUI for World of Warcraft - Wrath of the Lich King (3.3.5a)
<br />
ElvUI is a full UI replacement.
It completely replaces the default Blizzard UI at every level with a new and better interface.
As such, you'll only ever have to update ElvUI and not worry too much about its individual components.
This UI will arrange your interface to be more flexible and practical.

## Screenshots:

<a href="https://user-images.githubusercontent.com/590348/77227057-4d9ec400-6b8e-11ea-8672-29789434b9fe.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227055-4bd50080-6b8e-11ea-975e-a68784d34327.jpg" align="right" width="48.5%">
</a>
<a href="https://user-images.githubusercontent.com/590348/77227304-65774780-6b90-11ea-9f64-432786d2a597.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227077-98b8d700-6b8e-11ea-9822-f30103eca56b.jpg" width="48.5%">
</a>

<a href="https://user-images.githubusercontent.com/590348/77227091-bc7c1d00-6b8e-11ea-8c4f-29029a0b750a.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227094-bdad4a00-6b8e-11ea-91a6-d134d7f01d8d.jpg" align="right" width="48.5%">
</a>
<a href="https://user-images.githubusercontent.com/590348/77227309-74f69080-6b90-11ea-9aa1-95c760340e9d.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227311-76c05400-6b90-11ea-8704-dfb0cfd1dd3c.jpg" width="48.5%">
</a>

<a href="https://user-images.githubusercontent.com/590348/77227322-9192c880-6b90-11ea-9944-b9ae42e19431.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227324-935c8c00-6b90-11ea-88ad-96f05a23b3f6.jpg" align="right" width="48.5%">
</a>
<a href="https://user-images.githubusercontent.com/590348/77227328-a53e2f00-6b90-11ea-8dd4-a8d7287185e8.jpg">
<img src="https://user-images.githubusercontent.com/590348/77227329-a707f280-6b90-11ea-9395-3bbc665a3593.jpg" width="48.5%">
</a>


## Installation:

1. Download **[Latest Version](https://github.com/ElvUI-WotLK/ElvUI/releases/latest)**
2. Unpack the Zip file
3. Open the folder "ElvUI-(#.##)"
4. Copy (or drag and drop) **ElvUI** and **ElvUI_OptionsUI** into your Wow-Directory\Interface\AddOns
5. Restart WoW

## this addons contains de following Plugins:
- ElvUI_Enhanced
- ElvUI_AddOnSkins
- ElvUI_AuraBarsMovers
- ElvUI_BagControl
- ElvUI_CastBarOverlay
- ElvUI_CustomTags
- ElvUI_CustomTweaks
- ElvUI_DTBars2
- ElvUI_DataTextColors
- ElvUI_EnhancedFriendsList
- ElvUI_ExtraActionBars
- ElvUI_LocPlus
- ElvUI_MicrobarEnhancement
- ElvUI_RaidMarkers
- ElvUI_SwingBar
- ElvUI_VisualProcs

-- Please Note: These plugins will not function without ElvUI installed.

## Commands:

    /ec or /elvui     Toggle the configuration GUI.
    /rl or /reloadui  Reload the whole UI.
    /moveui           Open the movable frames options.
    /bgstats          Toggles Battleground datatexts to display info when inside a battleground.
    /hellokitty       Enables the Hello Kitty theme (can be reverted by repeating the command).
    /hellokittyfix    Fixes any colors or borders to default after using /hellokitty. Optional Use.
    /harlemshake      Enables Harlem Shake april fools joke. (DO THE HARLEM SHAKE!)
    /egrid            Toggles visibility of the grid for helping placement of thirdparty addons.
    /farmmode         Toggles the Minimap Farmmode.
    /in               The input of how many seconds you want a command to fire.
                          usage: /in <seconds> <command>
                          example: /in 1.5 /say hi
    /enable           Enable an Addon.
                          usage: /enable <addon>
                          example: /enable AtlasLoot
    /disable          Disable an Addon.
                          usage: /disable <addon>
                          example: /disable AtlasLoot

    ---------------------------------------------------------------------------------------------------------------
    -- Development ------------------------------------------------------------------------------------------------
    ---------------------------------------------------------------------------------------------------------------
    /etrace           Toggles events window.
    /luaerror on      Enable luaerrors and disable all AddOns except ElvUI.
    /luaerror off     Disable luaerrors and re-enable all AddOns disabled within that session.
    /cpuimpact        Toggles calculations of CPU Impact. Type /cpuimpact to get results when you are ready.
    /cpuusage         Calculates and dumps CPU usage differences (module: all, showall: false, minCalls: 15, delay: 5).
    /frame            Command to grab frame information when mouseing over a frame or when inputting the name.
                          usage: /frame (when mousing over frame) or /frame <name>
                          example: /frame WorldFrame
    /framelist        Dumps frame level information with children and parents. Also places info into copy box.
    /framestack       Toggles dynamic mouseover frame displaying frame name and level information.
    /resetui          If no argument is provided it will reset all frames to their default positions.
                      If an argument is provided it will reset only that frame.
                          example: /resetui uf (resets all unitframes)


## Languages:

ElvUI supports and contains language specific code for the following gameclients:
* English (enUS)
* Korean (koKR)
* French (frFR)
* German (deDE)
* Chinese (zhCN)
* Spanish (esES)
* Russian (ruRU)

## FAQ:

### I would like to report a bug. What i need to do?
Make sure you're using the latest version of [ElvUI](https://github.com/ElvUI-WotLK/ElvUI/releases/latest)
<br />
Describe your issue in as much detail as possible.
<br />
If your issue is graphical, please take some screenshots to illustrate it.
<br />
What were you doing when the problem occurred?
<br />
Explain how people can reproduce the issue.
<br />
The more info you provide, the better and faster support you will receive.

### I would like to request a feature. Where do I go?
This repository has been created to reproduce the original ElvUI functions.
<br />
If you want to request a feature, post in the [ElvUI_Enhanced](https://github.com/ElvUI-WotLK/ElvUI_Enhanced/issues)
<br />
If you want to request for a change to an existing **ElvUI** function, post in the [ElvUI_CustomTweaks](https://github.com/ElvUI-WotLK/ElvUI_CustomTweaks/issues)

### I have a suggestion/problem with ElvUI_"PluginName". Where do I go?
Create an issue at the bug tracker of [ElvUI](https://github.com/ElvUI-WotLK)_"PluginName" repository.

### ElvUI conflicting with "AddonName".
Make sure you're using the latest available version of "AddonName" for WotLK before creating a ticket about it.

### Can you backport "AddonName" to WotLK?
The only purpose of ElvUI-WotLK is to improve the backported version of ElvUI and its plugins.
