// getCustomer(1, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

async function emailCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer: ", customer);
    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log(topMovies);
      const sendMail = await sendEmail(customer.email, topMovies);
      console.log("Email sent...");
    }
  } catch (error) {
    console.log("error, ", error);
  }
}

emailCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email"
      });
    }, 500);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 500);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
