const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve("hello word");
    } else {
      reject(new Error("hello error"));
    }
  }, 2000);
});
promise
  .then((msg) => msg.toUpperCase())
  .then((msg) => console.log("msg", msg))
  .catch((err) => console.log("Error", err));
