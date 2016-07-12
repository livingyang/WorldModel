global.chai = require 'chai'
global.expect = global.chai.expect
global.sinon = require 'sinon'
global.chai.use require 'sinon-chai'

for key, value of require '../dist/WorldModel.js'
  global[key] = value

console.log require '../dist/WorldModel.js'
