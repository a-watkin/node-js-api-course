# Set env variable via vscode - this does nothing

`set jwtPrivateKey=somekey`

Doing it from gitbash and CMD with admin privlidges results in no errors but it also does not set the variable.

`export jwtPrivateKey=somekey`

Set is the windows way to set an env variable - export is for bash somehow I got them mixed up.

Nope app still crashes because it can't find the fucking key.

OK export doesn't work from CMD as expected and export doesn't work from bash either - the command works but it still fails to find the env variable.

I think fuck this shit and use dotenv.

## To see env variables in node

`console.log(process.env);`
