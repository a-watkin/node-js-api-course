# debug module allows for selective debuggin

Defining a debug logger:
`const startupDebugger = require("debug")("app:startup");`

## Using it in the code

`startupDebugger("Morgan enabled...");`

## Turn it on for startup type messages

`export DEBUG=app:startup`
