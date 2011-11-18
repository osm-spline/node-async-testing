if (module == require.main) {
  return require('../lib/async_testing').run(process.argv);
}

throw new Error();
