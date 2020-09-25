# Daily Planter
This app is designed for small farmers who need tools and information pertaining to creating a seeding schedule to be accessible and in one place. Planning out seeding successions is easier and automated so the farmer can plan for continuous harvest throughout the season. The app also allows the user to log plantings and harvests and archives them for the farmer's records as well and uses the data to create a visualization of crops and when they are in season. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
• From Github clone the ssh key using git clone
• Make sure that json server is downloaded on your machine
• Create a separate database.json file and run JSON server with ```json-server -p 8088 -w database.json```
• cd into the base directory of the app and run npm start

## Screenshots

<img src="/screenshots/home.png">
Home page: shows scheduled plantings for this week and overdue plantings that have not been marked completed as well as the weather based on the users location.


<img src="/screenshots/scheduleForm.png">
Scedule Form: The user can select a crop and seeding information for that crop will display to the side. A user can schedule multiple plantings at one time by choosing the number of successions and the interval between successions.


<img src="/screenshots/frostDates.png">
The frost date tables display below the schedule form so that the user can easily access average frost dates for their area to better plan seeding times. The user can select which weather station they would like to get frost date information from. 


<img src="/screenshots/logForm.png">
Plantings and harvests are logged by the user and saved in the archives where the user can view them.


<img src="/screenshots/cropList.png">
All of the crops created by the user. Clicking on a crop will bring the user to the crop detail page. 


<img src="/screenshots/cropDetail.png">
Crop details: displays all the information input by the user when creating a crop and can be edited or deleted. Pictures can be uploaded to keep a record of varieties of each crop and what they look like or for any purpose the user would want to document with pictures.


<img src="/screenshots/chart.png">
The chart uses data input by the user in the logs to create a visualization of planting and harvest times for each crop so that potential customers know when certain crops are in season. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
