const promiseFuction = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve("hello word");
    } else {
      reject(new Error("hello error"));
    }
  }, 500);
});

async function asyncAwait() {
    try {
        const msg = await promiseFuction()
        console.log(msg)
    } catch (err) {
        console.log("Error", err)
    }
}

asyncAwait()