# Mikki blog - Frontend Project

This project is a microblogging frontend web application named "Mikki Blog". The app allows users to create and view posts, utilizing a mock backend API.

## How to run

1. Install dependencies with `npm i`
2. Run locally with `npm start`

## Tech Stack

- React with Typescript
- Material UI: I chose this because I think their components have a modern look and are easy to use, with great documentation and examples.

## Features Implemented

- User Pages: Users can access a page displaying a list of their posts. They can also visit other user's pages by changing the user id in the URL.
- Post Creation: Authenticated users can create posts on their own page. Creating a new post triggers a re-render of the Profile.
- Deleting posts: A user can delete their posts, which also triggers a re-render.
- Registration and Authentication: Users can register and properly authenticate. This feature was implemented using a React Context.

## Future work

- Implement E2E test with Cypress
- Deploy app with Firebase hosting

  Note: There will be a mixed content error because the backend is not hosted with SSL.

- Add a top bar for the logo and a sign out button. I would like the top bar to be sticky, so that the logo is visible even when the user scrolls down.

- Add loading state in Profile. Currently, the 404 message is flashed before the posts are loaded. We would need an enum with three states (error, loading, success) which determines what should be displayed. In the 'loading' state, it would display a loading animation.
