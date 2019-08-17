# Unit tests

Tests on a function or small part of code, for a given input the tests check the output is correct.

Each logical execution path should have a test. The total number of tests for a unit of code should be either equal to logical execution paths or about one greater than that number.

Tests should neither be too specific or to general.

# Integration test

Tests an application or some code using an external resource like a database.

Also called end to end testing - since this will test an endpoint being called and it getting data from the db.

# Packages used:

Testing packages are usually installed as dev dependencies only for example:

`npm i jest --save-dev`

1. Jest - for unit testing
2. supertests - for intergration testing
