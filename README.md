# README

This is a redo on [this
tutorial](https://www.youtube.com/playlist?list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60),
which I had previously worked on before all my work got lost by a
computer crash before committing (RIP).

ToDo --> add links to documentation when relevant

## Video 1: Basic REST API

Using [`pipenv`](https://docs.pipenv.org/en/latest/) instead of
`virtualenv` for this project for a change of pace. [Apparently it
combines a couple of
things](https://stackoverflow.com/questions/41573587/what-is-the-difference-between-venv-pyvenv-pyenv-virtualenv-virtualenvwrappe).

To use, we hit `pipenv shell` in the folder you care about and it will
automatically build pip files if it needs. You will need to install
files with `pipenv install <package>` install of `pip`. This will also
install the correct dependencies within your `Pipfile` at the root
directory.

We'll need to install a few dependencies

```shell
pipenv install django djangorestframework django-rest-knox
```

Then we'll generate a new django project: `django-admin startproject
leadmanager`, followed by a `leads` app with `python manage.py
startapp leads` and then add both to our settings file.

We'll create a model for a lead to use the ORM. These will be via
`leads` app. To put these models into use, we'll need to create and
run migrations with `python manage.py makemigrations leads` and
`python manage.py migrate` to add it to our database. This will
include default tables Django uses.

To utilize django rest framework, we need to create serializers. These
will be used to expose access to our models. To make our life easier,
we'll use `serializers.ModelSerializer`, which needs a `Meta`
subclass.

After the model is created, we'll add an `api.py`. This will allow for
actual access to our model via the serializer. This will utilize
ViewSets, which are sort of like CBVs under Django.

Then we'll add in our URLs. Unlike in normal django, we'll use the
router that is provided by django rest framework. 

Order of Operations: Model => serializer => api => urls

We'll use Postman to do APIs. We can POST a new entry and GET all (at
the base root or `/`) or get a specific post by specifiy ID (at
`/<id>`).

As this is fully compliant REST, we can delete entries -- be sure to
add the trailing slash!

This is a fully working API which is pretty neat. 


## Tutorial \#2

Here we'll start to implement React into our app. Because we're
integrating it directly into Django, we will add it as its own app and
will _not_ use any fancy scripts like `create-react-app` (phew).

First, we'll start our app called `frontend` which will hold all of
our react js work. After creating it, we'll need to add directories
for the app.

```shell
# tree view of `leadmanager/frontend`
.
├── admin.py
├── apps.py
├── __init__.py
├── migrations
│   └── __init__.py
├── models.py
├── src
│   └── components
├── static
│   └── frontend
├── templates
│   └── frontend
├── tests.py
└── views.py
```

From the root directory, above django, we'll initialize our npm
project with `npm init -y` and install `webpack` and `webpack-cli` in
addition to `@babel/core`, `babel-loader`, `@babel/preset-env`,
`@babel/peset-react`, and
`babel-plugin-transform-class-properties`. Then we'll do react
libraries (see below). 

```shell
# from my shell directly
$ npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react `babel-plugin-transform-class-properties`
$ npm i -D react react-dom prop-types     
```

All these dependencies will pop up in our `package.json` file.

To get using babel, we'll need a `.babelrc` file to hold all of our
babel transforms (lints?).Then we'll create our webpack config file to
hold all of our webpack info inside of `webpack.config.js`, which can
be separated out for different dev/qa/prod environments. Finally,
we'll make sure that `package.json` knows the entry point for react
inside of the `frontend` folder and output that to the `static` folder
within `frontend`. This will get the two environments separated as
well.

As is typical with React JS projects, we have an `index.js` at the
root directory that is our entrypoint into the project while
`components/App.js` really holds the bulk of our default homepage. As
for Django, an `index.html` will be needed. We'll also pull down
bootstrap info from bootswatch and associated libraries.

__Finally__, we need to add the index load function in our frontend
and a URL to access it via `urls.py`. This will necesitate having the
frontend urls being loaded as well. Also add frontend app to
`leadmanager/settings.py` file. 

Finally we can run everything!

### Layouts of Components

Our homepage will consist of two components (to start):

  - `Header` -- sits inside of `layouts`
  - `Dashboard` -- sits inside of `leads`

True to React style, `Dashboard` will be composed of two separate
components called `Leads` and `Form`, both within that folder. Doing
this will require using react's `Fragment` class, importable at the
top level from react. These will be very simple for now -- we'll fill
them out later. 




