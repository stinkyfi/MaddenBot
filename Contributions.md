# Additions

- Added types as requested.
- All files, code commented.
- Added to **README.md**.

## Minor changes

---

- Inside **eventHandlers**:

  - Changed ~~`getAllFiles`~~ to `allFiles`.
  - Line 14, changed sort to `(a, b) => (a > b ? 1 : -1)` to avoid error of type boolean/string/numbers conflicting.

- Inside **getApplicationCommands**:

  - Added `import { Client } from 'discord.js';`.
  - Line 10 added `!` `Null` check
  - Line 15 changed ~~`applicationCommands.fetch()`~~ for `applicationCommands.fetch(applicationCommands as any)` because arguments were expected and `fetch(applicationCommands as any)` gave this error

  ```
  There was an error: TypeError: Failed to parse URL from [object Object]
  ```

- Inside **getLocalCommands** :

  - Changed ~~`(\_\_dirname, ".." "etc")`~~ to `(\_\_dirname, "../etc")`.

- Inside **getAllFiles**:

  - Added `Import path from 'path'` because _`path`_ variable could not be redeclared and when simply `require('path')` not enough for the _`path`_ variable to be reused inside the code. TS does not seem to be able to recognize it and wants it redeclared, so rather than adding a different name variable imported _`path`_.

- Inside **registerCommands**:

  - Added `Import {Client} from 'discord.js'` to use Client type.
  - Line 13 _`localCommands`_ type changed to `as any[]`.
  - Line 18 _`applicationCommands`_ defined type `as ApplicationCommandManager || GuildApplicationCommandManager`.

- Inside **handleCommands**:

  - Added `import { Client, GuildMember, Interaction } from 'discord.js';`.
  - Changed ~~`(interaction.member.id)`~~ for `((interaction.member as GuildMember).id)` because _`interaction.member`_ returns either `APIInteractionGuildMember` or `GuildMember` or `Null` the first and the last not being useable by the _`.id`_ command. Did the same for line 29 and 42.

- Inside **consoleLogs**:

  - Added `import { Client } from 'discord.js';` to define client as Client.

- Inside **get-user**:

  - Added `import { Client, CommandInteraction } from 'discord.js';`.
  - Defined _`Interaction`_ as _`CommandInteraction`_ because _`.reply`_ and _`.options`_ does not exist on type _`Interaction`_ (not specific enough for TS).
  - Line 12 defined `user` type `as any` otherwise a bunch of issues arise from user not being `String | Number | Boolean | Null | Undefined` its also why the `!` was added to remove `Null` and `Undefined` types from possibilities.

- Inside **get-standings**:

  - Added `import { Client, CommandInteraction } from 'discord.js';`.
  - Line 14 defined `user` type `as any` because of type issues again.

- Inside **book-tickets**:

  - Added `import { Client, CommandInteraction } from 'discord.js';`.
  - Line 11 defined `user` type `as any` again due to type issues, cannot assign it to type `as object` or `as string` TS doesn't recognize functions/keys/values on string and it cannot read the object if it doesn't have an inherited schema for `user` to read from.
  - Line 12 defined `location` type `as string` and added a `!` to tell TS that the variable is not null.

- Inside **announce-match**:

  - Added `import { CommandInteraction, Client } from 'discord.js';`.
  - Lines 11 and 12 defined types for `user1` and `user2` `as any` again, while adding `!` to tell TS values for them aren't Null.

- Inside **add-user**:

  - Added `import { CommandInteraction, Client } from 'discord.js';`.
  - Line 15 `user` set to `as any` and together with line 16 and 17 added `!` to tell TS the values are not gonna be `Null`.

- Inside **add-results**:

  - Added `import { CommandInteraction, Client } from 'discord.js';`.
  - Lines 17, 18 and 19 added `!` to tell TS those are not gonna be `Null` values.
  - Lines 17 and 19 defined users to `as any` type .

- Inside **add-champion**:

  - Added `import { CommandInteraction, Client } from 'discord.js';`.
  - Line 14 `user` defined type `as any` and `!` for `Null`

- Inside **source**:

  - Added `import { CommandInteraction } from 'discord.js';`

- Inside **open-ticket**:

  - Added `import { CommandInteraction } from 'discord.js';`

- Inside **eventHandlers**:

  - Changed ~~`(\_\_dirname, ".." "etc")`~~ to `(\_\_dirname, "../etc")`.

### Minor Issues

---

- Inside **eventHandlers**:

  Line 25, cannot assign function type to `eventFunction` because of the way it is constructed, code would have to be refactored so unless you want to change it, it will remain as implicit any.

- Inside **areCommandsDifferent**:

  Sorry I have no idea what's happening here so I just used TS infered types. 🤷

- Inside **getLocalCommands** :

  Line 18 const `commandObj` requires a file therefore I've let it to implicit any type.

- Inside **getAllFiles**:

  Line 7 `files` cannot be defined since it includes both directories and files and even tho it retrieves paths to said things the `.isFile` and `.isDirectory` functions are not applicable to strings.

### Comments

---

> I believe the register commands thingie and delete are not yet fully fleshed out ? Because I cannot define their type and there are certain {'etcetc'} replies when executing the commands, problem is I do not find those commands in the option of available commands.
