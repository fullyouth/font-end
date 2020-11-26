
var __webpack_modules__ = {
  key: value
}

function __webpack_require__(moduleId) {
  // Check if module is in cache
  if (__webpack_module_cache__[moduleId]) {
    return __webpack_module_cache__[moduleId].exports;
  }
  // Create a new module (and put it into the cache)
  var module = __webpack_module_cache__[moduleId] = {
    id: moduleId,
    // no module.loaded needed
    exports: {}
  };

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  // Return the exports of the module
  return module.exports;
}

__webpack_require__.n = (module) => {
  var getter = module && module.__esModule ?
    () => module['default'] :
    () => module;
  __webpack_require__.d(getter, { a: getter });
  return getter;
};

__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
}
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
__webpack_require__.r = (exports) => {Object.defineProperty(exports, '__esModule', { value: true });}