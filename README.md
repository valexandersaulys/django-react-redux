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



