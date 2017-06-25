const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiString = require('chai-string');
const chaiEnzyme = require('chai-enzyme');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');
const fetch = require('node-fetch');
const { jsdom } = require('jsdom');

global.fetch = fetch;
global.Response = fetch.Response;
global.window = global;

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiString);
chai.use(chaiEnzyme);
chai.should();

sinonStubPromise(sinon);

require('css-modules-require-hook')({
  generateScopedName: '[local]',
  camelCase: true
});

before(() => {
  global.document = jsdom('<html><body></body></html>');
});

beforeEach(() => {
  global.sandbox = sinon.sandbox.create();
  global.fetch = global.sandbox.stub();
  global.confirm = global.sandbox.stub();
});

afterEach(() => {
  global.sandbox.restore();
});
