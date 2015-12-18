import test from 'blue-tape';

test('timing test', (check) => {
  check.plan(2);

  check.equal(typeof Date.now, 'function');
  const start = Date.now();

  setTimeout(() => {
    check.equal(Date.now() - start, 100);
  }, 100);
});
