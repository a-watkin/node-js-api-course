# What is middleware?

Middleware is a pipeline that changes input in some way.

For example converting body to a json object as in:

`app.use(express.json());`

Middleware alters input in some way and produces output.

Technically almost everything in express is middleware.
