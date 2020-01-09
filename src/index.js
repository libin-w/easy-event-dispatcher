export default class EventDispatcher {
  constructor(eventList = []) {
    if (Array.isArray(eventList)) {
      this.eventList = eventList;
    } else {
      this.eventList = [];
    }
    this.eventSink = {};
  }
  /**
   * 检验事件名称合法性
   * @param {*} name - 事件名称
   */
  verifyEventName(name) {
    if (typeof name !== "string") {
      throw Error("Invalid event");
    }
    if (this.eventList.indexOf(name) === -1) {
      throw Error("Invalid event");
    }
  }
  trigger(eventName) {
    this.verifyEventName(eventName);
    const callbackList = Array.isArray(this.eventSink[eventName])
      ? this.eventSink[eventName]
      : [];
    callbackList.forEach(fun => {
      typeof fun === "function" && fun();
    });
  }
  /**
   * 注册事件
   * @param {*} eventName - 事件名称
   * @param {*} func - 回调函数
   */
  on(eventName, func) {
    this.verifyEventName(eventName);
    if (Array.isArray(this.eventSink[eventName])) {
      this.eventSink[eventName].push(func);
    } else {
      this.eventSink[eventName] = [func];
    }
  }
  /**
   * 移除事件
   * @param {*} eventName - 事件名称
   * @param {*} func - 回调函数
   */
  off(eventName, func) {
    this.verifyEventName(eventName);
    if (typeof func === "function") {
      const callbackList = this.eventSink[eventName];
      for (let i = callbackList.length - 1; i > -1; i--) {
        if (callbackList[i].name === func.name) {
          callbackList.splice(i, 1);
        }
      }
    } else if (typeof func === "undefined") {
      delete this.eventSink[eventName];
    }
  }
}
