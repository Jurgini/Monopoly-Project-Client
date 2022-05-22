# Monopoly web project group [18]

This is the client-repo for the Monopoly Student Edition.

## Known bugs

| Bug behaviour                                                                                                                                                                              | How to reproduce  | Why it hasn't been fixed                                                                    |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---------------------------------------------------------------------------------------------|
| When the automatic bankrupt check, detects a bankrupt person AND if there's still one player left, both of the players get the winning screen instead of one them getting the bankrupt screen. | Go bankrupt in a game with 2 players remaining (you included) while rolling the dice instead of pressing "Go bankrupt" | Time management, prior first. (the core of the check does its job.)                         |
| When a player is rolling the dice and their money or properties change.. it's only visible after an other "turn"                                                                           | Pay rent/Buy property/...  | We don't know the exact reason, it's somewhere in the reloadgame functionality after turns. |
|                                                                                                                                                                                            |   |                                                                                             |

## Need to know

We had some issues with the validator of HTML because we are using a new method of pop-ups.
Please find prove underneath.
![](https://i.gyazo.com/ad940eb8ee842556ddd87ace6ab03918.png)

We also removed the following code from .gitlab-ci.yml with permission to let the deployment of your client-repo succeed.
```
(in stages:)
    - QA
validateHTML:
  stage: QA
  script:
    - npm install
    - npm run validate-html

sonar:
  stage: QA
  script:
    - npm install
    - npm run validate-sonar
```