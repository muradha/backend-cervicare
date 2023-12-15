import web from './application/web.js';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const port = 3000;

web.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
