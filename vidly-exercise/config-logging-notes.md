# two ways to get env variables

First way:
`console.log(app.get("env"));`

Second way:
`console.log(`NODE_ENV: \${process.env.NODE_ENV}`);`

## Setting the env variable

`export NODE_ENV=production`

---

# Using config package

Install

`sudo npm i conifg`

Create a config folder in your project.

Add .json file for production, development and 'custom-environmnet-variables'.

## Getting config values

`config.get('name')`

You can use regular Javascript syntax for working with objects.

So to access some property of name:

`config.get('name.something')`

Don't store passwords in config, instead use env variables.

---

# Message logging with debug

Install:

`npm i debug`

Create a logging namespace:

`const startupDebugger = require('debug')('app:startup')`

The namespace in the second argument can be anything you want.

## Activate a specific debugger

Name of app is a convention it should be:

app:debuggerName

Set them as env variables:

`export DEBUG=app:startup`

Start the app as usual.

## Turn debugging messages off

`export DEBUG=`

## Activate all debuggers

`export DEBUG=app:*`

## Activate debugging messages without env variables

Add the following when starting the app:

`DEBUG=app:debuggerName nodemon index.js`

If you're not using nodemon:

`DEBUG=app:info node movies.js`

## Selecting debuggers

You can comma separate debuggers:

`DEBUG=connect:bodyParser,connect:compress,connect:session`

Exclude all those starting with connect:

`DEBUG=*-connect:*`
