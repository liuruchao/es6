// 1. await 后面跟的promise对象必须resolved后，才能继续执行后续代码
// 2. async 函数执行返回一个promise对象，如果里面没有await,执行完后，这个promise状态resolved；如果有await，或者return promise,等到await或返回的这个promise状态resolved后，async 状态变为resolved
// 3. await 状态变为reject时，如果await后未捕获错误，则会将async函数返回的promise状态改为reject
{
  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        console.log("timeout resolve")
        resolve()
      }, ms)
    })
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
    await timeout(ms)
    console.log(timeout2(ms))

    console.log(value)
  }

  // asyncPrint("hello wolrd", 1000)
}

// 实现一个休眠效果
{
  function sleep(val, interval) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(val)
        resolve()
      }, interval)
    })
  }

  async function run() {
    for (let i = 0; i < 6; i++) {
      await sleep(i, 1000)
    }
    console.log("睡眠结束")
  }

  // run()
}

// 测试await的reject 是否被async捕获
{
  async function f() {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("开始切换reject状态")
        // reject()
        throw new Error("出错了")
      }, 1000)
    })
    await 43
  }
 
  // trye catch 可以捕获到错误
  async function f1() {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("开始切换reject状态")
          // reject()
          throw new Error("出错了")
        }, 1000)
      })
    } catch (err) {
      console.log(err)
    }

    await 43
  }

  f1().catch(e => console.log(e))
}
