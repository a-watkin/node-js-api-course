# debug module allows for selective debuggin

You should prefer using debug messages over `console.log()`

They're shorter and can be selectively activated.

## Using it in the code

Defining a debug logger:
`const startupDebugger = require("debug")("app:startup");`

Using it:
`startupDebugger("Morgan enabled...");`

## Turn it on for startup type messages

`export DEBUG=app:startup`

## Start multiple debug loggers

You can then see the debug messages for both of these namespaces
`export DEBUG=app:startup,app:db`

## Enable all of debug messages

`export DEBUG=*.*`

## Turn off dubug logs

`export DEBUG=`

## set debugging messages without env variables

`DEBUG=app:db nodemon index.js`
