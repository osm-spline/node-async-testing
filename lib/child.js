
//this module SHOULD NOT be required as a library, it will interfere.
//must be used in a spawned process.
if (module !== require.main) {
  return
}

var testing = require('./testing');

var opts =
  { parallel: JSON.parse(process.argv[3])
  , testName: JSON.parse(process.argv[4])
  , onTestStart: function testStart(name) {
      postMessage('onTestStart', name);
    }
  , onTestDone: function testDone(status, result) {
      if (result.failure) {
        result.failure = makeErrorJsonable(result.failure);
      }

      postMessage('onTestDone', status, result);
    }
  , onSuiteDone: function suiteDone(status, results) {
      if (typeof _$jscoverage === 'object') {
          // dump coverage data into coverage.json
          var data = reformatCoverageData(_$jscoverage);
          postMessage('onCoverage', data);
      }

      postMessage('onSuiteDone', status, results);
    }
  };

var s = require(process.argv[2]);

testing.runSuite(s, opts);

function reformatCoverageData(data) {
    // reformat jscoverage data to save it with JSON.stringify
    var validData = {};
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            validData[key] = {};

            var line;
            for (line in data[key]) {
                if (data[key][line] !== null) {
                    validData[key][line] = data[key][line];
                }
            }

            for (line in data[key].source) {
                if (data[key].source.hasOwnProperty(line)) {
                    validData[key].source[line] = data[key].source[line].replace(/%/g, '&#37;');
                }
            }
        }
    }

    return validData;
}

function postMessage() {
  console.log("\n" + testing.messageEncode.apply(null, arguments)); //hack for interference problem. just prepend a newline.
  //means that output is a few newlines, and never completely clean :( but behaves better.
}

function makeErrorJsonable(err) {
  var r = new RegExp(process.cwd(),'g')
  return {
      message: err.message || null
    , stack: err.stack ? err.stack.replace(r, '.') : '[no stack trace]'
    }
}
