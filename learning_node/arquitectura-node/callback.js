const asyncCallback = (callback) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      return callback(null, "hello word");
    } else {
      return callback(new Error("hello error"));
    }
  }, 2000);
};

asyncCallback((err, message) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("message: ", message);
  }
});
