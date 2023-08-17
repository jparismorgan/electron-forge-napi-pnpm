// Doesn't work (Uncaught TypeError: Cannot read properties of undefined (reading 'indexOf'))
// module.exports = require("bindings")("llm");
module.exports = require("./build/Release/llm.node");

