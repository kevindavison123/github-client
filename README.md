This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
This project's purpose is to integrate with the Github Rest API to retrieve a list of repositories from either a user or an organization. 
This UI is a very simple form 

### Technical Choices 
I used Next.js to create this project because it is a very powerful framework that allows me to create a server-side rendered application with ease.

I decided to use the Octokit SDK to interact with the Github Rest API as it helped speed up my development time without having to create a more complicated backend. This is also why I stuck with Typescript and React and did not use another language (like Python) or another framework (like NestJS).

I used Cypress for my end-to-end tests because it is a very powerful tool that allows me to test my application in a way that is very similar to how a user would interact with it. This is important because it allows me to catch bugs that I might not have caught otherwise.

### Future Improvements 
- Adding a better table layout that supported pagination and sorting rather than using simple inputs and selects 
- I would add more API calls to get more info about repository activities from the user or organization the user searched for.
- I would work with a product designer to make the UI more user-friendly and visually appealing.


### What I would do differently if I had more time 
- I would write a unit test for the Github service to ensure that it is working as expected.
- I would write more end-to-end tests to test sad paths and other potential edge cases
- I would add more error handling to the form to ensure the user knows when something goes wrong
- I noticed a bug where the input validation does not highlight in red and give the user the feedback if the input is invalid. I would spend more time fixing this. 





## Getting Started

First, run the development server:

```bash
yarn 
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

To run the tests, run the following command:

```bash
yarn cypress:run
```

