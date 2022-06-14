# Monopoly web project group [18]

This is the client-repo for the Monopoly Student Edition.

## Functionality Table

|PRIORITY  |ENDPOINT                                                                                                  |Client                | Client           |Server                       | Server                       |
|--------|--------------------------------------------------------------------------------------------------------|----------------------|-----------------|-----------------------------|-----------------------------|
|        |                                                                                                        |Visualize ( HTML/CSS)|Consume API (JS)|Process request (API-Bridge)|Implement Game Rules (logic)|
|        |**General Game and API Info**                                                                               |100%                  |YES/NO           |YES/NO                       |100%                         |
|        |GET /                                                                                                   |    100%                  |     YES           |          YES                   |               100%              |
|MUSTHAVE|GET /tiles                                                                                              |        100%              |     YES            |             YES                |         100%                   |
|MUSTHAVE|GET /tiles /{tileId}                                                                                    |         100%             |            YES     |             YES                |         100%                    |
|        |GET /chance                                                                                             |      100%                |       YES          |       YES                      |             100%                |
|        |GET /community-chest                                                                                    |      100%                |      YES           |        YES                     |              100%               |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Managing Games**                                                                                          |                      |                 |                             |                             |
|        |DELETE /games                                                                                           |       100%               |       YES          |              YES               |                 95%            |
|MUSTHAVE|GET /games                                                                                              |       90%               |       YES          |                 YES            |      100%                       |
|        |Additional requirement: with filters                                                                    |                      |                 |                             |                             |
|MUSTHAVE|POST /games                                                                                             |          100%            |         YES        |         YES                    |                    100%         |
|MUSTHAVE|POST /games /{gameId} /players                                                                          |       100%               |        YES         |             YES                |                  100%           |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Info**                                                                                                   |                      |                 |                             |                             |
|        |GET /games /dummy                                                                                       |          0%            |       NO          |     NO                        |             0%                |
|MUSTHAVE|GET /games /{gameId}                                                                                    |         100%             |        YES         |            YES                 |             100%                |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Turn Management**                                                                                         |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /dice                                                      |            70%          |      YES           |                 YES            |                 70%            |
|        |With jail                                                                                               |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /bankruptcy                                                |              90%        |       YES          |                 YES            |                 80%            |
|        |Decent distribution of assets                                                                           |                      |                 |                             |                             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Tax Management**                                                                                          |                   |                |                          |                         |
|        |POST /games /{gameId} /players /{playerName} /tax /estimate                                             |               0%           |                NO |             NO                |                 0%         |POST /games /{gameId} /players /{playerName} /tax /compute                                              |                      |                 |                             |                             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Buying property**                                                                                        |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /properties /{propertyName}                                |        100%              |       YES          |               YES              |             100%                |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName}                              |             100%         |         YES        |             YES               |             100%                |
|        |With 1 bank auction                                                                                     |                      |                 |                             |                             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Improving property**                                                                                      |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                        |            0%          |      NO           |                 NO            |                 20%            | 
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                      |                    0%          |      NO           |                 NO            |                 20%         |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                         |           0%          |      NO           |                 NO            |                 20%               |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                       |                   0%          |      NO           |                 NO            |                 20%               |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Mortgage**                                                                                                |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage                      |             0%         |        NO         |                NO             |          10%                   |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage|                            0%         |        NO         |                NO             |          10%       |        |                                                                                                        |                      |                 |                             |                             |
|        |**Interaction with another player**                                                                         |                      |                 |                             |                             |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /visitors /{debtorName} /rent|              90%        |         YES        |               YES              |             100%                |
|        |With potential debt    |                      |                 |                             |                             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Prison**                                                                                                  |                      |                 |                             |                             |
|        |POST /games /{gameId} /prison /{playerName} /fine                                                       |             0%         |     NO            |             NO                |               5%              |
|        |POST /games /{gameId} /prison /{playerName} /free  |            0%          |       NO          |             NO                |                5%             |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Auctions**                                                                                                |                      |                 |                             |                             |
|        |GET /games /{gameId} /bank /auctions                                                                    |         0%             |       NO          |       NO                   |           0%                  |
|        |POST /games /{gameId} /bank /auctions /{propertyName} /bid                                              |            0%          |            NO     |              NO               |                 0%            |



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
