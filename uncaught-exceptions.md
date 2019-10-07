# Handling uncaught exception

```
process.on('uncaughtException', (ex) => {
  console.log('got an uncaught exception');
  winston.error(ex.message, ex);
});
```