# Unit tests

Tests on a function or small part of code, for a given input the tests check the output is correct.

Count how many logical execution paths a function has; the total number of tests should be equal to or one more than that number.

Tests should neither be too specific nor to general.

# Integration test

Tests an application or some code using an external resource like a database.

Also called end to end testing - since this will test an endpoint being called and it getting data from the db.

Write the test as if they are the only test (test in isolation) - insert and delete data for each test. So that you're always testing from a controlled clean state.

It's not always possible to test part of a function with just integration tests - you may need to use a unit test for part of it.

Integration and unit tests compliment each other - you need both.

# Packages used:

Testing packages are usually installed as dev dependencies only for example:

`npm i jest --save-dev`

1. Jest - for unit testing
2. supertests - for integration testing
