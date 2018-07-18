# Eris
The ultimate automation, fun and housekeeping maid of [Elkia](https://elkia.life).

Eris is just an interface for manipulating and displaying some of the Elkia data from Atlas.

**If you're looking for the code of Eris's treasury hunt**, *A text-based, "Duck Hunt" type minigame* - **the 2018 Elkia April Fools prank** which occured on our Discord server, it's up on [pastebin](https://pastebin.com/PD2mhZni).
Note: this was written literally last minute, I didn't set up git, everything is rushed and the code got edited on-the-fly. Some parts might be missing.

---

## About this project

>ES6, Standard Codestyle, MongoDB, no schemas, no tests - fuck that shit, ain't nobody got time for that.

### Current Features

- Sync guild members with Atlas
    - Posts a notification about important changes in #logs channel
    
    ![Logging Example](https://i.imgur.com/ebJUfTB.png)
    - Keeps a record in database after a member leaves guild to help identify returning members.
    
    ![Database Record](https://i.imgur.com/DeFUBnq.png)
- TODO: Account creation
    - TODO: Link a Minecraft account with your Discord
    - TODO: Whitelist members on Elkia
- User activity tracking
    - ActivityScoreTM
        - Separate logs for when user is Online, Away and Offline
        - Divided by day and hour
        - Checks user's status every minute and adds score
    - Messages
        - ActivityScoreTM for messages
        - Total number of messages
        - Keeps data about user's last message
- Currently finisheda commands
    - !8ball <Will I pass my math class?>
        - Ask a question, gen an anwser
    - !mojang
        - Returns information about service availability fetched from status.mojang.com
    - !headDrop <ign>
        - A quick tool for admins to generate a command needed for the [Elkia Datapack](https://github.com/APerfectPenguin/ElkiaDatapack)
    - !playerStats <ign>
        - Name history and a 3D render of player's skin
    - !seed
        - Displays a countdown till the seed is released
        - When released, displays the Season III seed

### Running

Requires Node 8 and a MongoDB server.

- Navigate into the root folder, run `npm install` to get dependencies.
- While that's going on, edit the *config.example.json*
- Remove all the comments in *config.example.json* telling you what goes where - as json doesn't support comments. If you're using any semi-decent IDE it should've been screaming at you ever since you opened it.
- Rename *config.example.json* to *config.json*
- Run with `npm start` (runs index.js)

### Contributing

As this is a personal project quite heavily targeted at very specific audience, I don't really feel like fucking with other people's code.
I we don't know each other and I haven't told you to add some shit, consider your commit rejected unless I really like it.

### File structure
Should be pretty self-explanatory

**commands/**
commands that get executed upon user input

**messages/**
includes json files containing shit Eris says

**events/**
stuff that gets executed by something happening

**tasks/**
scheduled tasks to be run in intervals or at specific time

**utilities/**
random functions I decided to add

### License

I'm not a fan on licenses, so there's none. All of this is released into the public domain. Use this code as you please, fork it, print it, sell it, burn it - I don't care.

----
*Contact Cerx#2986 on Discord for any additional info, or - you know - just [create an issue](https://github.com/CerxMe/Eris/issues).*
