importScripts(['https://solc-bin.ethereum.org/emscripten-wasm32/solc-emscripten-wasm32-latest.js'])

let version = Module.cwrap('solidity_version', 'string', []);
postMessage({version: version()});
let compile = Module.cwrap('solidity_compile', 'string', ['string', 'number', 'number']);

addEventListener('message', (event) => {
    postMessage({result: compile(event.data, 0, 0)})
})
