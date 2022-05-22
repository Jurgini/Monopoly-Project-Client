# Monopoly web project group [18]

This is the client-repo for the Monopoly Student Edition.

## Known bugs 

| Bug behaviour  | How to reproduce  | Why it hasn't been fixed    |
|---|---|---|
|  When a player goes bankrupt (= their money balance goes below 0 when buying or paying something), the actual bankruptcy screen is showed after a certain amount of turns in the game. The game status is getting edited (ended=true && player is removed out of game) (Not the "Go bankrupt" button usage!) |  Go bankrupt and keep rolling the dice when it's your turn | There is no direct link to the source of the bug. Tests and debugging is always different.  |
| When the automatic bankrupt check, detects a bankrupt person AND if there's still one player left, both of the players get the winning screen instead of one them getting the bankrupt screen.  | Go bankrupt in a game with 2 players remaining (you included) while rolling the dice instead of pressing "Go bankrupt"  | Time management, prior first. (the core of the check does its job.)  |
|  When a player is rolling the dice and their money or properties change.. it's only visible after an other "turn" | Pay rent/Buy property/...  | We don't know the exact reason, it's somewhere in the reloadgame functionality after turns.  |
|   |   |   |
