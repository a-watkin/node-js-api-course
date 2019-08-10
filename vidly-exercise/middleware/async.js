// factory function that returns a new function
// it kind of wraps the code you give it in this function and then returns it
module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

// the above is now handled by express-async-errors
