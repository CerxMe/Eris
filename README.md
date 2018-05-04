# Eris
The ultimate automation, fun and housekeeping maid of [Elkia](https://elkia.life).

Eris is just an interface for manipulating and displaying some of the Elkia data from Atlas.  She won't be useful just by her own. [Search my repositories for ElkiaEssentials](https://github.com/CerxMe?tab=repositories&q=ElkiaEssentials) to see the complete set!

**If you're looking for the code of Eris's treasury hunt**, *A text-based, "Duck Hunt" type minigame* - **the 2018 Elkia April Fools prank** which occured on our Discord server, it's up on [pastebin](https://pastebin.com/PD2mhZni).
Note: this was written literally last minute, I didn't set up git, everything is rushed and the code got edited on-the-fly. Some parts might be missing.

---

## About this project

This project is dependent upon [Hephaestus](https://github.com/CerxMe/Hephaestus)
>ES6, MongoDB, no schemas, no tests - fuck that shit, ain't nobody got time for that.

### Current Features

- Sync guild members with Atlas
    - Posts a notification about important changes in #logs channel
    
    ![Logging Example](https://i.imgur.com/ebJUfTB.png)
    - Keep a record in database after a member leaves to help identify returning members.
    
    ![Database Record](https://i.imgur.com/DeFUBnq.png)
- TODO: Account creation
    - TODO: Link a Minecraft account with your Discord
    - TODO: Whitelist members on Elkia
- Separate lastseen tracking for Discord activity
    - TODO: based off online status
    - last message

### Running

Requires Node 8 and a MongoDB server.

- Navigate into the root folder, run `npm install` to get dependencies.
- While that's going on, edit the *config.example.json*
- Remove all the comments in *config.example.json* telling you what goes where - as json doesn't support comments. If you're using any semi-decent IDE it should've been screaming at you ever since you opened it.
- Rename *config.example.json* to *config.json*
- Run with `npm start` (Updates [Hephaestus](https://github.com/CerxMe/Hephaestus) and runs index.js)

### Contributing

As this is a personal project quite heavily targeted at very specific audience, I don't really feel like fucking with other people's code.
Unless I told you to add some shit, consider your commit rejected.

### File structure
Should be pretty self-explanatory

**commands/**
Commands that get executed upon user input

**messages/**
Includes json files containing shit Eris says

### License

I'm not a fan on licenses, so there's none. All of this is released into the public domain. Use this code as you please, fork it, print it, sell it, burn it - I don't care.

### Forking

This project is dependent upon [Hephaestus](https://github.com/CerxMe/Hephaestus) - a toolset I'm developing to ease the development, maintain clean code and avoid repeating myself.
If you don't want to deal with that getting updated, I'd suggest forking that repository as well and editing dependencies in *package.json* to point towards your copy.

----
*Contact Cerx#2986 on Discord for any additional info, or - you know - just [create an issue](https://github.com/CerxMe/Eris/issues).*
