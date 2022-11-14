# Fash Cards
## Turing Mod 3 Final Solo Project by Catalyst

![fash-cards logo](https://github.com/Catalyst4Change/fash-cards/blob/main/server/media/Screenshot%202022-11-13%20at%2011.42.42%20PM.png?raw=true)   

![fash-cards game card](https://github.com/Catalyst4Change/fash-cards/blob/main/server/media/Screenshot%202022-11-13%20at%2011.44.02%20PM.png?raw=true)

Table of Contents  
[Local Setup](#local-setup-instructions)  
[Why?](#but-why)  
[User Stories](#user-stories)  

Phases:  
[Web Scraping](#web-scraping)  
[Express API](#launching-the-api)  
[React](#building-the-react-app)  
[Testing](#testing-with-cypress)

[Wins](#wins)  
[Challenges](#challenges)   
[Thanks](#doumo-arigato-gozaimasu)

## Local Setup Instructions:
- Initialize a new repository on your local machine:
- `$ git clone git@github.com:Catalyst4Change/fash-cards.git`
- `$ cd fash-cards`
- Get newest ADL database info:
- `$ cd fash-cards/web-scraper`
- `$ npm install puppeteer`
- `$ node scraper.js` (note: this will not work if you have a VPN online.)
- Activate Hate-abase:
- `$ cd fash-cards/server`
- `$ npm install express`
- `$ node server.js` 
- Run React UI:
- `$ cd fash-cards/ui`
- `$ npm install`
- `$ npm start`  

## Instructions & Features:
Upon launching the app, the user has the option to visit an About page and discover more about the app and why it exists. To play the game - in name, but not in spirit - click 'Start' and they are presented with simple instructions. One can view a card representing a white-supremacist symbol or icon and guess which of the multiple-choice answers is correct. Clicking the blue arrows icon will flip it over so you can read about this symbol's origins. Clicking the floppy disc will save the card to be viewed later. After one minute has elapsed, the game is over and you are presented with your score. From there you can visit the ADL's website, or initiate a new game and attempt to beat your previous score. The game was designed to be played in vertical mode on a phone.

![fash-cards in action](https://github.com/Catalyst4Change/fash-cards/blob/main/server/media/fash-cards-demo.gif?raw=true)

## ...But why?
I was inspired to do this project because:  
I cannot stop myself from overcomplicating things, and  
It is obvious to me that fascism, hate, and bigotry are on the rise in America (and elsewhere round the world). It is important for anyone who cares about this country, it's people, and it's future to be aware of the threats to our safety and our democracy.  

## User Stories:
For this app I considered two hypothetical users. Both have different motivations but could benefit from interacting with the program.
### “Jazz” 
is a twenty-something, middle-class, community-college student. They are active in online debates and calling out racism and sexism when they see it in the world. They consider themselves ‘woke’ but have not taken active steps to educate themselves about the numerous hate-groups and paramilitary militias that threaten their comfortable way of life.  
A ‘Zoomer’, Jazz has a comfortable, intuitive grasp on technology and is not intimidated by bad UI. However, with an infinite ocean of digital entertainment and education options at their disposal, any interaction needs to grab and hold their attention or risk being dismissed forever.  

### “Marcia” 
is largely oblivious of the threats to peace and democracy posed by extremist groups in America. She is a white woman in her mid 60s and has a more-than-full-time-job taking care of her ailing, elderly mother without much help from the rest of the family. She thinks her openly anti-semitist brother-in-law can be a jerk, but he’s nice to her so he can’t be all bad, right?  
Marcia doesn’t have much free time and is not great with technology, so any interaction with a screen needs to be straight-forward and brief. She is not very interested in learning about skinhead prison gangs and neo-nazis, but she does enjoy quick memory challenges and facebook quizzes to share with her friends.  

## This project occurred in four phases:
### Web Scraping
For my project I wanted to use the Anti-Defamation League's [Hate Symbols Database](https://www.adl.org/resources/hate-symbols/search). I am a fan of their work combating the spread of hate-speech and anti-semitism in the US. However they do not make their database API available for the public, probably for good reason. This provided me with a challenge; I had to get the information *the hard way*.  
I found [Puppeteer](https://www.npmjs.com/package/puppeteer) which can launch a 'headless' web-browser capable of programmatically accomplishing anything one would do with a regular browser. I used this to 'scrape' the data from the ADL's website. Essentially I used `querySelectorAll()` to target the data I wanted, pushed it into an array, collated those arrays into objects, `stringify()`ed that array, and finally saved it to a .json file. I'm very happy with this process being entirely automated.  

### Launching the API  
Implementing [Express](https://www.npmjs.com/package/express) was less difficult than figuring out Puppeteer. Since I already had all the data I needed neatly json'd, I imported it and placed it within a GET response. I did have brief permissions issues because I forgot about [CORS](https://www.npmjs.com/package/cors).

### Building the React App  
Architecting this app took a lot of planning and even more trial-and-error. It is still tricky for me to figure out what data/functions need to live on what level, and how that influences the overall performance. I made a lot of breakthroughs learning new functions and reminding myself of the 'data down, actions up' process of React.  
The App component contains all the logic and data to control the 'narrative' flow. Game holds all the information and functionality relative to the deck of flash-cards and the score. Meanwhile, each card holds it's own state on whether it has been answered and/or flipped yet. That all may sound self-evident, but it took me a few permutations to get right.  
I had a lot of issues getting the cards to render right and have the generated buttons present reasonable, non-repeating answers. I learned how `useRef()` is a perfect way to hold state without refreshing the Dom every time its data is accessed.  
After several unsuccessful attempts to build my own countdown timer, I finally installed [react-countdown](https://github.com/ndresx/react-countdown). Using a [this how-to](), I was able to implement a flipping animation for the cards. Between [this video](https://www.youtube.com/watch?v=l1MYfu5YWHc&t=30s) and [this article](https://blog.bitsrc.io/simple-carousel-in-react-2aac73887243) I was able to cobble together a carousel-like function to display only one card object at a time.  

### Testing with Cypress  
Testing was easy compared to choreographing all the intricate details of this fairly complex app. I was able to capture the dom elements I wanted to test and verify their data and functions. The worst part was waiting an *entire minute* for every 'Game Over' test to pass or fail!  
I extensively tested the UI and added a test for API failure-to-fetch.

## Wins
I am extremely proud of this app. It represents a patriotic effort, a technical achievement, and an expression of my personal values. In particular, the way the scraper pulls the data, formats it, and deposits it straight into the server folder which then re-broadcasts it made me feel like a true hacker!

## Challenges
At several points along the way, I experienced significant problems with GitHub. More than once I had the error `There isn't anything to compare. Branches are entirely different commit histories.` I imagine this happened as I was combining previously separate projects into a single folder. I Googled around trying to find a solution to this problem, but ultimately settled on the tried and true tactic, "Burn it down and start over." Because of this, all of my early commits are unfortunately lost.   
At several points, I was confronted with infinite loops and memory leaks. Remember to close your `useEffect()`s, kids!    

I experienced a lot of stress and inner turmoil during the creation of this app. The heavy nature of the source material alone was kind of exhausting. On top of that was the tiered nature of a multi-step pipeline. I couldn't work on the app until the server was up and I couldn't set that up until I had scraped all the data. I didn't even get around to applying a shiny CSS coat to it, so it exists as a stark and simplistic black-on-white. Actually, I wouldn't want to make it *too* fun looking and trivialize the content.

## Doumo Arigato Gozaimasu!
Extra Big Ass thank yous to my mentor, Alia (who I'm beginning to suspect is getting sick of my incessant questions ;p); my friends Evan and Grace for your help and encouragement; my cohort-mates and instructors, for your patience and assistance; and my Lovelies, for keeping me afloat in the storm. Much Love.
