# Guide to React, Redux, Thunk

The outline of a basic react-redux project looks like this:

```
.
├── index.js                 // the entry point for the app
├── constants.js             // to store environmental constants
|── store.js                 // generally boiler plate
├── actions                  // where functions that modify state are stored
│   ├── bookrecords.js       
│   └── types.js             // list of exported constants
├── components               // what actually gets displayed
│   ├── App.js               // stores the routing 
│   ├── BookEntry.js         // stores a subcomponent
│   ├── Download.js
│   ├── FrontPage.js
│   ├── layout               // it's helpful to put static components in a separate folder
│   │   ├── FormExplainer.js
│   │   ├── HeaderAbout.js
│   │   └── Title.js
│   └── Processing.js
├── reducers
│   ├── bookrecords.js       // each reducer gets its own name, usually lowercase and to match the equivelant in actions
│   └── index.js             // Where 
```


# Config Files

Don't forget babel in `.babelrc`:

```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["transform-class-properties"]
}
```

For `webpack.config.js`:

```javascript
// `process` is automatically imported FYI
const webpack = require("webpack");   // notice the old fashioned import

module.exports = {
  // these have to be included to run
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    // maps { internal_react_name : local_machine_name } in React itself
    new webpack.DefinePlugin({
      "process.env.react_api_domain_name": JSON.stringify(
        process.env.REACT_APP_API_DOMAIN_NAME
      ),
      "process.env.react_frontend_domain_name": JSON.stringify(
        process.env.REACT_APP_FRONTEND_DOMAIN_NAME
      )
    })
  ]
};
```

For `package.json`:

Notice that constants are added at the script run in addition to a
"main" field. 

```javascript
{
    "name": "url-to-ebook-frontend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "REACT_APP_API_DOMAIN_NAME='http://localhost:8000/' REACT_APP_FRONTEND_DOMAIN_NAME='http://localhost:8001/' webpack --mode development --watch ./src/index.js --output ./build/main.js",
        "prod": "REACT_APP_API_DOMAIN_NAME='http://api.ebookframer.com/' REACT_APP_FRONTEND_DOMAIN_NAME='http://ebookframer.com/' webpack --mode production --config webpack.prod.js ./src/index.js --output ./prod/main.js"
    },
    "keywords": [
        "test"
    ],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/core": "^7.4.5",
        "@babel/preset-env": "^7.4.5",
        "@babel/preset-react": "^7.0.0",
        "axios": "^0.18.0",
        "babel-loader": "^8.0.6",
      "babel-plugin-transform-class-properties": "^6.24.1",
        "bloomer": "^0.6.5",
        "bulma": "^0.7.5",
        "compression-webpack-plugin": "^2.0.0",
        "css-loader": "^2.1.1",
        "dedupe": "^3.0.1",
        "prop-types": "^15.7.2",
        "react": "^16.8.6",
        "react-dom": "^16.8.6",
        "react-redux": "^7.0.3",
        "react-router-dom": "^5.0.0",
        "redux": "^4.0.1",
        "redux-devtools-extension": "^2.13.8",
        "redux-thunk": "^2.3.0",
        "style-loader": "^0.23.1",
        "thunk": "0.0.1",
        "uglify-js": "^3.5.15",
        "uglifyjs-webpack-plugin": "^2.1.3",
        "webpack": "^4.32.2",
        "webpack-cli": "^3.3.2"
    },
    "dependencies": {
        "sass-loader": "^7.1.0"
    }
}
```


# `./index.js`

Boiler plate

```javascript
import ReactDOM from "react-dom";
import React from "react";

import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"))
```


# Reducers

`./store.js`: oiler plate

```javascript
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];   // important for async requests like axios!

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
```

For `reducers/index.js`:

```javascript
import { combineReducers } from "redux";
import bookrecords from "./bookrecords";

export default combineReducers({
  bookrecords  // you can add others here with commas
});
```

For bookrecords as a "substate" (nobody uses this term except for me) as an example:

```javascript
import {
  // list of constants to import from actions
} from "../actions/types.js";

const initialState = {
  // your initial state
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAME_OF_REDUX_ACTION
      return {
        ...state,                     // good practice to include this
        some_details: action.payload  // this will get accessed in the component
      };
    default:                          // always have a default!
      return state;
  }
}
```




# Actions

```javascript
import axios from "axios";   // basic imports

import {
   // list of constants to get from types
} from "./types";

export const name_of_function = (param1, param2) => (dispatch, getState) => {
  dispatch({ type: NAME_OF_REDUX_CONSTANT_LIKE_LOADING });

  axios
    .get(`http://someurl.com/api/${param1}`)
    .then(res => {
      const data = { ...res.data, status: res.status };
      dispatch({
        type: NAME_OF_REDUX_STATE,
        payload: data
      });
    })
    .catch(err => console.log(err));
```

And for `types.js`...

```javascript
export const NAME_OF_REDUX_STATE = "NAME_OF_REDUX_STATE";
//... other constants exported
```


# Components

Some basic boiler plate:

```javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  // sp[ecific components
} from "bloomer"; // don't foget bloomer.min.js in index.html
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { addBookJob } from "../actions/<lowercasefunctions>";

// Taken from <https://redux.js.org/basics/usage-with-react> 
const propTypes = {
  addBookJob: PropTypes.func.isRequired,
  sending_now: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

// default values if desired
const defaultProps = {
  text: '',
  email: ''
};

class BookEntryForm extends Component {
  constructor(props) {
    super(props);
  }

  // this is needed to modify forms in React JS
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { text, email } = this.state;
    this.props.addBookJob(text, email);
  };

  render() {
    // considered good practice to pull out variables of interest
    const { text, email } = this.state;

    // helps to do a conditional check, though I can get errors sometimes :/
    if (this.props.exists) {
      const url = `/p/${this.props.job_id}`;
      return <Redirect to={url} />;
    }

    // whatever your component is to look like
    // usually tied to a library like `bloomer`
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            onChange={this.onChange}
          />
          <textarea
            type="text"
            name="text"
            value={text}
            onChange={this.onChange}
          />
          <button
            type="submit"
            isColor="primary"
            isLoading={this.props.sending_now}
          >
            Submit
          </button>
        </form>
      </div>   
    );
  }
}

BookEntryForm.propTypes = propTypes;
BookEntryForm.defaultProps = defaultProps;

const mapStateToProps = state => ({
  errors: state.<substate>.errors
  job_id: state.<substate>.book_details.job_id,
  exists: state.<substate>.exists,
  sending_now: state.<substate>.sending_now
});

export default connect(
  mapStateToProps,
  { addBookJob }       // functions are added here
)(BookEntryForm);
```


## Function based components

These are simpler and ideal for static (read: non-dynamic) components. 

```javascript
import React from "react";
import PropTypes from "prop-types";
import { Title, Container, Section, Subtitle } from "bloomer";

const propTypes = {};

const defaultProps = {};

const HeaderTitle = props => {
  const stylings = { color: "#010B23" };
  return (
    <Section isSize="medium" style={stylings}>
      <Container>
        <Title>eBook Framer</Title>
        <Subtitle>Enter Your URLs and create your own ebook!</Subtitle>
      </Container>
    </Section>
  );
};

HeaderTitle.propTypes = propTypes;
HeaderTitle.defaultProps = defaultProps;

export default HeaderTitle;
```

## Shortcuts

Using emacs, you can use `yasnippets` and `react-snippets`, you can
quickly rattle off with shorcuts:

  * `rcc TAB` for react class-based component
  * `fc TAB` for react function-based component


# Syncing to Spaces or s3

```python
#! /usr/bin/env python3
import glob, os
import boto3
from botocore.client import Config

SPACES_LOCATION = "https://nyc3.digitaloceanspaces.com/"
SPACE_NAME = "vs2657"

if "DO_SPACES_KEY" not in os.environ and "DO_SPACES_SECRET" not in os.environ:
    raise KeyError("Missing Spaces information in environment")

# Initialize a session using DigitalOcean Spaces.
# Key generation: https://cloud.digitalocean.com/settings/api/tokens
session = boto3.session.Session()
client = session.client(
    "s3",
    region_name="nyc3",
    endpoint_url=SPACES_LOCATION,
    aws_access_key_id=os.environ.get("DO_SPACES_KEY", None),
    aws_secret_access_key=os.environ.get("DO_SPACES_SECRET", None),
)


for f in glob.glob("./prod/*.js") + glob.glob("./prod/*.html"):
    print("Uploading %s" % f)
    client.upload_file(
        f, SPACE_NAME, f.split("/")[-1], ExtraArgs={"ACL": "public-read"}
    )
```
