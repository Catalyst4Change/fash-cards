# Fash Cards
## Turing Mod 3 Final Solo Project by Catalyst

Table of Contents  
[Phases](#this-project-occurred-in-four-phases)  

 ## but why?

## This project occurred in four phases:
### Web Scraping
For my project I wanted to use the Anti-Defamation League's [Hate Symbols Database](https://www.adl.org/resources/hate-symbols/search). I am a fan of their work combating the spread of hate-speach and anti-sematism in the US. However they do not make their database API available for the public, probably for good reason. This provided me with a challenge; I had to get the information *the hard way*.  
I found [Puppeteer](https://www.npmjs.com/package/puppeteer) which can launch a 'headless' web-browser capable of programatically accomplishing anything one would do with a regular browser. I used this to 'scrape' the data from the ADL's website. Essentially I used `querySlectorAll()` to target the data I wanted, pushed it into an array, collated those arrays into objects, `strigify()`ed that array, and finally saved it to a .json file. I'm very happy with this process being entirely automated.  

### Launching the API  

### Building the React App  

### Testing with Cypress  

## also:
2 user personas
user stories that articulate how the app should perform

## Problems
At several points along the way, I experienced significant problems with GitHub. More than once I had the error `There isn't anything to compare. Branches are entirely different commit histories.` I imagine this happened as I was combining previously seperate projects into a single folder. I Googled around trying to find a solution to this problem, but ultimately settled on the tried and true tactic, "Burn it down and start over." Because of this, all of my early commits are unfortunately lost. 

images
wins and challenges
goals
local set up instructions
link to deployment
team member credits and links