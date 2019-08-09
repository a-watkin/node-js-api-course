const bcrypt = require("bcrypt");

// use genSalt to avoid thread blocking - node is single thread
async function run(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(password, salt, hashedPassword);
}

run("kitties");
