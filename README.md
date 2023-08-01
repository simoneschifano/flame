# FLAME - Quiz Game

## Introduction <a name="introduction"></a>

Welcome to the FLAME project documentation! This repository houses the source code for FLAME, a responsive, UX-friendly fullstack web-based quiz game that lets users answer trivia questions from various categories and difficulties. Players can compete for high scores, join rooms with other users, and enjoy testing their knowledge.

## Table of Contents

1. [The Idea](#idea)
2. [The Team](#team)
3. [Installation](#installation)
4. [Project Overview](#project-overview)
5. [API Reference](#api-reference)
   - [Utility Functions](#utility-functions)
   - [Functions for Generating Objects](#functions-for-generating-objects)
   - [Asynchronous Functions - Fetching Data from APIs](#asynchronous-functions-fetching-data-from-apis)
   - [Asynchronous Functions - Working with Firestore Database](#asynchronous-functions-working-with-firestore-database)
   - [Reducer Function and Custom Hook](#reducer-function-and-custom-hook)
   - [Custom Hooks for Game Navigation, User Management, and URL Handling](#custom-hooks-for-game-navigation-and-url-handling)

## The Idea <a name="idea"></a>

For our final project in our frontend bootcamp, we enthusiastically selected an idea that blended excitement with a worthy challenge. After careful consideration, we settled on utilizing the [Trivia API](https://opentdb.com/api_config.php), finding it to be the perfect fit for this endeavor. Our goal was to craft a user-friendly app that would captivate and entertain users through a sleek, minimalist design.

## The Team <a name="team"></a>

Our application's logo and name were born from a unique combination of our team members' first initials, along with the common bond that unites us: Edgemony, the bootcamp that challenged us to create this project.

Thus, FLAME was formed, representing the first letters of our names: Francesco Imperiale, Lorenzo Fraterrigo Garofalo, Andrea Paracino, Marina Valenza, and Edgemony itself. FLAME is not just any quiz!

The name perfectly complements the game's dynamics, highlighting the significance of the scoring logic, which we'll discuss shortly. It also reflects our shared influences and a touch of experimental style.

FLAME is all about engaging and stimulating the mind. We drew inspiration from the knowledge and skills we gained at Edgemony's bootcamp, which fueled our excitement to embark on this project. Our collective experience shaped our approach to create a quiz that challenges users while keeping the experience enjoyable.

The FLAME logo symbolizes the unity and knowledge-seeking passion of our team. The fusion of our initials signifies not only collaboration but also the blending of diverse ideas and perspectives we bring to the table. Our goal is to spark curiosity and intellect in our users, making their quiz journey an enlightening and entertaining adventure.

## Installation <a name="installation"></a>

To kickstart FLAME using Vite, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project's root directory.
3. Install the required dependencies using your preferred package manager (`npm install` or `yarn install`).
4. Once the dependencies are installed, start the development server by running `npm run dev` in the terminal. This command will bundle the project with Vite and launch it in development mode.

**Note:** Before running the project, ensure that you have set up the required environment variables, especially the `.env` file. Proper environment configuration is necessary for the APIs to function correctly on your local machine.

## Project Overview <a name="project-overview"></a>

FLAME is an engaging full-stack web application built using ReactJS and bundled through Vite. It offers an interactive quiz experience, allowing users to answer trivia questions from various categories and difficulties. The technologies used include CSS Modules, SASS, React Context, useReducer, react-router-dom, and Firebase for the backend. The project's structure revolves around utility functions and hooks that facilitate the game's logic and enhance user interactions.

## API Reference <a name="api-reference"></a>

In this section, you'll find comprehensive information about each function and its parameters. The functions are categorized based on their scope.

### Utility Functions <a name="utility-functions"></a>

#### `decodeHtml(html)`

This function decodes HTML entities in the provided string and returns the decoded text.

- `html` (string): The HTML string containing entities to be decoded.

#### `getFlamesFromScore(score)`

This function returns a flame emoji representation based on the player's score.

- `score` (number): The player's score.

Returns a string representing the number of flame emojis corresponding to the score.

#### `generateRoomId()`

This function generates a random room ID, which can be used to create new rooms.

Returns a randomly generated six-digit room ID as a string.

#### `shuffle(array)`

This function shuffles the elements of an array in place using the Fisher-Yates algorithm.

- `array` (array): The array to be shuffled.

Returns the shuffled array.

#### `upsertById(array, newPayload)`

This function updates an object in an array by its ID or appends it if not found.

- `array` (array): The array of objects.
- `newPayload` (object): The new object to be updated or appended.

Returns the updated array.

#### `getUserFromUsername(users, username)`

This function retrieves a user object from an array of users based on the provided username.

- `users` (array): The array of user objects.
- `username` (string): The username of the user to retrieve.
  Returns the user object matching the provided username or `undefined` if not found.

### Functions for Generating Objects <a name="functions-for-generating-objects"></a>

#### `generateUser(username, avatarId)`

This function generates a user object with the given username and avatar ID, along with other default properties.

- `username` (string): The username of the user.
- `avatarId` (number): The ID of the selected avatar.

Returns a user object with the following properties:

- `id`: A unique ID for the user.
- `username`: The provided username.
- `avatarId`: The provided avatar ID.
- `highestScore`: The highest score achieved by the user.
- `preferredDifficulty`: The preferred difficulty level of the user.
- `playedGames`: An array containing game logs for previously played games.

#### `generateGameLog(score)`

This function generates a game log object with a unique ID, the current date, and the player's score.

- `score` (number): The score achieved by the player in the current game.

Returns a game log object with the following properties:

- `id`: A unique ID for the game log.
- `date`: The current date in the format "YYYY-MM-DD".
- `score`: The player's score in the game.

#### `generateRoomObject(id)`

This function creates a room object with the given ID and sets the creation date to the current date.

- `id` (string): The ID for the room.

Returns a room object with the following properties:

- `id`: The provided room ID.
- `createdAt`: The current date in the format "YYYY-MM-DD".
- `users`: An empty array to store the users who join the room.

### Asynchronous Functions - Fetching Data from APIs <a name="asynchronous-functions-fetching-data-from-apis"></a>

#### `getRandomQuestions(difficulty)`

This asynchronous function fetches random trivia questions from the Open Trivia Database API based on the specified difficulty.

- `difficulty` (string): The difficulty level of the questions to fetch (e.g., "easy," "medium," or "hard").

Returns an array of processed question objects, each with the following properties:

- `answers`: An array of answer options, each containing an ID, text, and a boolean indicating whether it's correct or not.
- `shouldShowCorrection`: A boolean indicating whether the correct answer should be displayed.
- `id`: A unique ID for the question.
- `score`: The score earned for the question.

#### `getQuestions(category, difficulty)`

This asynchronous function fetches a single trivia question from the Open Trivia Database API, based on the specified category and difficulty.

- `category` (number): The category ID of the question.
- `difficulty` (string): The difficulty level of the question (e.g., "easy," "medium," or "hard").

Returns an array containing the retrieved question object.

### Asynchronous Functions - Working with Firestore Database <a name="asynchronous-functions-working-with-firestore-database"></a>

#### `updateRoomUser(roomId, user)`

The `updateRoomUser` function is an asynchronous function that updates the user list of a room in the Firestore database. It utilizes Firestore's `runTransaction` method to perform the update as a transaction, ensuring atomicity of multiple database operations. Here's a summary of its functionality:

- `roomId` (string): The ID of the room to update.
- `user` (object): The user object to add or update in the room's user list.

**Transaction Logic**:

1. Fetches the current state of the room document using `transaction.get(roomRef)`.
2. Checks if the room document exists; if not, throws an error ("Room does not exist").
3. Uses the `upsertById` function to update the user list, ensuring the user's data is either added or updated.
4. Updates the `users` field of the room document with the updated user list.

**Transaction Benefits**: By using a transaction, it ensures data consistency and prevents conflicts when multiple users attempt to update the user list simultaneously. Transactions provide atomicity, meaning that all database operations within the transaction either succeed together or none of them are applied. This helps maintain data integrity in concurrent environments like web applications.

#### `getRoomById(id)`

This asynchronous function retrieves room data from the Firestore

database based on the given room ID.

- `id` (string): The ID of the room to retrieve.

Returns the room data as an object or `null` if the room does not exist.

#### `createNewRoom()`

This asynchronous function generates a new room ID and creates a new room object in the Firestore database. The function ensures the room ID is unique before creating the room.

Returns the ID of the newly created room or `null` if an error occurs.

### Reducer Function and Custom Hook <a name="reducer-function-and-custom-hook"></a>

#### `gameReducer(state, action)`

This reducer function handles various actions related to the game state, such as updating the user data, updating question information, advancing to the next question, and concluding the game.

- `state` (object): The current state of the game.
- `action` (object): An object containing the action type and payload.

Returns the updated state based on the action.

#### `useScoringLogic()`

This custom hook manages the scoring logic for each question, including tracking the selected answer, response time, and updating question states. The hook is used to calculate and update the score for each question based on the player's response time and the question's difficulty.

Returns an object with the following properties:

- `selectedAnswer`: The currently selected answer option for the question.
- `setSelectedAnswer`: A function to update the selected answer option.

### Custom Hooks for Game Navigation, User Management, and URL Handling <a name="custom-hooks-for-game-navigation-and-url-handling"></a>

### `useUsersAutocomplete(users, handleUserChange)`

The `useUsersAutocomplete` hook provides functionality for autocomplete and user selection in the FLAME application. It is used in scenarios where the user needs to select or create a new user using an autocomplete dropdown.

As parameters, it takes:

- `users` (array): An array of user objects representing the available users for autocomplete.
- `handleUserChange` (function): A callback function that handles changes when a user is selected or created.

The hook returns an object with the following properties and functions:

- `username` (string): The current value of the input field for the username.
- `shouldShowDropdown` (boolean): A flag indicating whether the autocomplete dropdown should be displayed.
- `setShouldShowDropdown` (function): A function to set the `shouldShowDropdown` state.
- `targetOptionIndex` (number or null): The index of the currently selected option in the autocomplete dropdown.
- `invalid` (boolean): A flag indicating whether the input field contains an invalid value.
- `filteredUsers` (array): An array of user objects filtered based on the current input value.
- `shouldShowIsFirst` (boolean): A flag indicating whether the "create new user" option should be displayed when there are no existing users and the input field is empty.
- `shouldShowCreateNew` (boolean): A flag indicating whether the "create new user" option should be displayed based on the current input value.
- `handleKeyDown` (function): A function to handle keyboard events for navigation in the autocomplete dropdown.
- `handleClickOutside` (function): A function to handle clicks outside the autocomplete dropdown, closing it if it is open.
- `handleValueChange` (function): A function to handle changes in the input field's value and update the `username` state.
- `handleUserSelection` (function): A function to handle user selection from the autocomplete dropdown. It updates the `username` state and calls the `handleUserChange` callback with the selected user.
- `handleClear` (function): A function to clear the input field and reset the autocomplete dropdown's state.
- `handleCreateNew` (function): A function to create a new user with the current input value and call the `handleUserChange` callback with the newly created user. It also closes the autocomplete dropdown.

Its functionalities are:

- The hook manages the autocomplete dropdown's state, showing or hiding it based on user input and other conditions.
- It allows users to navigate through the autocomplete options using the arrow keys and the Tab key.
- Users can select an option from the dropdown by pressing Enter or by clicking on the option.
- If the input value matches an existing user's username, the corresponding user is selected from the dropdown.
- If the input value does not match any existing user's username and is not empty, users can choose to create a new user.
- The hook handles click events outside the autocomplete dropdown, closing the dropdown when it's open.
- It also handles input validation and displays an "invalid" state if the input contains invalid characters.

The `useUsersAutocomplete` hook is an essential part of the FLAME application, enabling smooth user interactions when selecting or creating users for various game-related operations.

#### `useCurrentStep()`

This custom hook returns the current step of the game based on the URL location. It is used to determine the current user interface view and flow.

Returns the current step as a string or `null` if the step is not found.

#### `useGameContext()`

This custom hook provides access to the game state and dispatch functions. It is used to interact with the game's context and manage the state.

Returns an object with the following properties and functions:

- `gameState`: The current state of the game.
- `currentQuestion`: The current question object.
- `initRoom(roomData)`: A function to initialize the game state with room data.
- `initUser(user)`: A function to initialize the game state with user data.
- `updateUser(key, value)`: A function to update specific user data in the game state.
- `initQuestions(questions)`: A function to initialize the game state with an array of questions.
- `updateQuestionState(payload)`: A function to update the state of the current question.

### `useRoomIdInUrl(roomDataHandler)`

This custom hook retrieves the room ID from the URL and loads the room data if available. It is used for seamless navigation when joining a room through a URL.

- `roomDataHandler`: A function to handle the retrieved room data.

Returns an object with the following properties:

- `isLoadingRoomFromUrl`: A boolean indicating whether the room data is being loaded from the URL.

### `useClickOutside(ref, handler)`

This custom hook handles the click outside functionality. It executes the given handler function when a click event occurs outside the provided reference element.

- `ref`: A React ref object that represents the element.
- `handler`: A function to be executed when a click event occurs outside the element.

#### `useSyncEndGameWithDb(state, dispatch, setIsLoading)`

This custom hook synchronizes the end game state with the Firestore database when the game reaches the end. It is used to update the user data and navigate to the leaderboard after the quiz is completed.

- `state`: The current game state.
- `dispatch`: The dispatch function from the game context.
- `setIsLoading`: A function to set the loading state.

#### `useNavigation(state, dispatch)`

This custom hook handles the game's navigation logic, including reaching the next step, handling disabled navigation, and evaluating the call-to-action copy.

- `state`: The current game state.
- `dispatch`: The dispatch function from the game context.

Returns an object with the following properties and functions:

- `isLoading`: A boolean indicating whether the game is in a loading state.
- `navigateBack()`: A function to navigate to the previous step.
- `reachNextStep()`: A function to navigate to the next step or conclude the game.
- `ctaDisabledMessage`: A string message indicating why the call-to-action is disabled.
- `evaluatedCtaCopy`: A string representing the evaluated call-to-action copy.

#### `useRedirectCheck()`

This custom hook checks for proper navigation redirection based on the current step and user data. It is used to ensure that users follow the correct sequence of steps during the game.

The hook takes care of redirecting users if they try to access an invalid step or missing user data.

## Conclusion <a name="conclusion"></a>

Congratulations! You have reached the end of the FLAME documentation. We hope this comprehensive overview of the project's functions and utilities helps you understand how the game works and facilitates any future contributions or customizations you may wish to make. If you have any questions or need further assistance, feel free to reach out to the project maintainers. Happy coding and have fun playing with FLAME!
