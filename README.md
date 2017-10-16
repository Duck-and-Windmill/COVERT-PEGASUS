# COVERT-PEGASUS

Duck and Windmill's PennApps XVI submission.

# PROJECT: VIOLET UNICORN (aka Delphi)

Duck and Windmill's HackRU Fall 2017 submission.

## Inspiration

As computer science students, we're not the best investors; we pull out when crashes happen instead of buying in, and buy on the hype before people dump for profit. We thought there must be some way to help other poor, unsuspecting CS students make better decisions with their money and make a few bucks on the side. So, with the help of the Aladdin API from Blackrock, we invented our chatbot: Genie.

## What it does

Genie securely accesses investment portfolios to provide its users with information and relevant advice about their finances. It displays user account information, graphs real-time security prices, and offers a powerful, persistent, and user-friendly chatbot. Genie’s chatbot provides information about investment options, securities, and risk analyses, in response to user queries made in natural language.

## How We built it

We built Genie in React Native and Node.js using the Expo XDE. We also built a server for Genie to gather information through called Lamp. Lamp is hosted on Amazon Web Services, communicates with Blackrock’s Aladdin API in order to perform portfolio analysis, and communicates with api.ai’s NLP API to parse natural language requests.

## Challenges We ran into

On the morning of project submission when we connected all of Genie’s individually-working parts together, we discovered that our chatbot library was flawed beyond usability. The library required that all chat responses be sent immediately after receiving messages; this meant that the fraction of a second required for Genie to query its APIs between texts was too long. With less than 2 hours remaining before our submission deadline, we removed our library and replaced it with a completely new one.

## Accomplishments that We're proud of

All 4 members of our team were first-time programmers in the parts of the tech stack we worked with.

## What We learned

We learned how to develop in React Native and Expo, as well as Node.js with the Express framework. Before Genie, our team members had no experience using React and little experience programming in JavaScript.

## What's next for Genie

We developed Genie in response to the lack of intuitive user interfaces in fintech apps. While Genie’s analytical tools fall short compared to competing apps, we believe that its natural user interface places it unusually close to market viability, and a step in the right direction for fintech apps.
