// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in

// Return 400 if customerId is not provided

// Return 400 if movieId is not provided

// Return 404 no rental found

// Return 400 if rental already returned

// Return 200 if return is ok
// Set return date
// Calculate fee
// Increase stock
// Return summary of rental
