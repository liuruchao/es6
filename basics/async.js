// 1. await 后面跟的promise对象必须resolved后，才能继续执行后续代码

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log("timeout resolve");
      resolve();
    }, ms);
  });
}

async function timeout2(ms) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(function() {
  //       console.log("timeout2 resolve");
  //       resolve();
  //     }, ms);
  //   });
}
async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(timeout2(ms));

  console.log(value);
}

asyncPrint("hello wolrd", 1000);
