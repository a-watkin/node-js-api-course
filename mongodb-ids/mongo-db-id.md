# Mongodb id

`_id: 5d49bcbfbdcf80203c6a1807`

## Provides unique identification - in almost all casses

The above is 12 bytes

The first four are for time.

Then the following 3 are for the machine identifier.

Next 2 are the process identifier.

Next 3 are a counter.

## Cavet about uniqeness

1 byte = 8 bits
2^8 = 256

The counter has 3 bytes each byte is 3 bits, so:
2^24 = 16 million

If at the same second on the same machine in the same process more than 16 million documents are generated then there's a chance of a collision.

## How ids are generated

The mongodb driver genereates the id, it doesn't check that the id is in there already it just gets an id. This makes mongodb highly scalable.