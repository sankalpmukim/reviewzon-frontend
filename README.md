
# ReviewZon
ReviewZon is a ML based tool that helps users make smart decisions by analyzing amazon reviews of a product. 

## Objective
Our project’s aim is to classify reviews of a product into positive and negative sentiment groups. When using ReviewZon, the user can choose their test and train sets. For both, the test set and the train set, the user can decide if they want to use a local (pre downloaded) dataset, or a set of amazon product links from which a dataset of reviews can be built. Using the chosen datasets, a model is trained, validated, and tested. Both the flows are described below in detail.

## Flow
There is 3 key aspects to our project:
 - Training the model
 - Visualization of the data
 - Experiments on the model

### Training the model
After preprocessing the data, ...


### Visualization
Visual representation of data is a major part of data science and data mining. 
By visualizing data, one can easily determine the trends and patterns in the data. 
A lot of visualizations can be done with the data we obtained and processed in the previous steps.
We have used the following in our project:
 - Sentiment vs Helpfulness Graph
 - Year vs number of reviews (Grouped by sentiment)
 - Day vs Review Count Graph
 - Rating Distribution
 - Sentiment Polarity Distribution
 - Review Length Distribution
 - Review word count distribution
 - Frequency of words (Grouped by sentiment)
 - Word Clouds

### Experimentation
We are using cross validation to choose the best model and hyper parameters.
We will validate each classifier and it's hyper parameters using Recall, Precision, Specificity, Accuracy, and most importantly AUC-ROC curves.

## Frontend
### Flow
Flow

### Setup codebase
Note: To fully experience all the features, you need to setup the backend as well that is hound here.\

First clone the frontend, using:\
`git clone https://github.com/sankalpmukim/reviewzon-frontend.git`\
Move into project directory:\
`cd reviewzon-frontend`\
Install all dependencies:\
`npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
