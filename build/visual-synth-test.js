// Generated by CoffeeScript 1.8.0
(function() {
  var $, $$, Larray, Main, empty, log, make,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  log = console.log.bind(console);

  $ = document.querySelector.bind(document);

  $$ = document.querySelectorAll.bind(document);

  make = function(tag, attr, inner) {
    var el, k, v;
    el = document.createElement(tag);
    for (k in attr) {
      v = attr[k];
      if ('_' !== k.substr(0, 1)) {
        el.setAttribute(k, v);
      }
    }
    if (inner) {
      el.innerHTML = inner;
    }
    return el;
  };

  empty = function(node) {
    var _results;
    _results = [];
    while (node.hasChildNodes()) {
      _results.push(node.removeChild(node.lastChild));
    }
    return _results;
  };

  Larray = (function(_super) {
    __extends(Larray, _super);

    function Larray(opt) {
      if (opt == null) {
        opt = {};
      }
      if (null === opt) {
        throw new Error("'opt' is null");
      }
      if ('object' !== typeof opt) {
        throw new Error("'opt' is type '" + (typeof opt) + "', not 'object'");
      }
    }

    Larray.prototype.push = function(obj) {
      var idrx;
      idrx = /^[a-z][-a-z0-9]+$/;
      if (null === obj) {
        throw new Error("'obj' is null");
      }
      if ('object' !== typeof obj) {
        throw new Error("'obj' is type '" + (typeof obj) + "', not 'object'");
      }
      if ('undefined' === typeof obj.id) {
        throw new Error("" + obj + " `id` is missing");
      }
      if ('string' !== typeof obj.id) {
        throw new Error("" + obj + " `id` is type '" + (typeof obj.id) + "', not 'string'");
      }
      if (!idrx.test(obj.id)) {
        throw new Error("" + obj + " `id` '" + obj.id + "' fails " + idrx);
      }
      if (this[obj.id]) {
        throw new Error("Duplicate " + obj + " `id` '" + obj.id + "'");
      }
      this[obj.id] = obj;
      return Larray.__super__.push.call(this, obj);
    };

    return Larray;

  })(Array);

  Main = (function() {
    function Main(opt) {
      if (opt == null) {
        opt = {};
      }
      if (null === opt) {
        throw new Error("'opt' is null");
      }
      if ('object' !== typeof opt) {
        throw new Error("'opt' is type '" + (typeof opt) + "', not 'object'");
      }
      log('Constructed a Main instance!');
    }

    return Main;

  })();

  window.VisualSynth = Main;

  Main.test = function(add) {
    var expect, fn, item, name, result, results, runner, subject, _i, _len, _ref, _ref1;
    if (this.items == null) {
      this.items = [];
    }
    results = [];
    if (add) {
      return this.items.push(add);
    } else {
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if ('string' === typeof item) {
          results.push(item + '\n-' + (new Array(item.length).join('-')) + '\n');
        } else {
          for (name in item) {
            fn = item[name];
            _ref1 = fn(new Main), runner = _ref1[0], expect = _ref1[1], subject = _ref1[2];
            result = runner(subject, expect);
            if (!result) {
              results.push("✔ " + name + "  ");
            } else {
              results.push("✘ " + name + "  ");
              results.push("    " + result + "  ");
            }
          }
          results.push('\n');
        }
      }
      return results.join('\n');
    }
  };

  Main.throws = function(subject, expect) {
    var e, err;
    err = false;
    try {
      subject();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (!err) {
      return "No exception thrown, expected...\n    " + expect;
    } else if (expect !== err) {
      return "" + err + "\n    ...was thrown, but expected...\n    " + expect;
    }
  };

  Main.eq = function(subject, expect) {
    var e, err, result;
    err = false;
    try {
      result = subject();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (err) {
      return "Unexpected exception...\n    " + err;
    } else if (expect !== result) {
      if (result + '' === expect + '') {
        return "" + result + " (" + (typeof result) + ")\n    ...was returned, but expected...\n    " + expect + " (" + (typeof expect) + ")";
      } else {
        return "" + result + "\n    ...was returned, but expected...\n    " + expect;
      }
    }
  };

  Main.is = function(subject, expect) {
    var e, err, result;
    err = false;
    try {
      result = subject();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (err) {
      return "Unexpected exception...\n    " + err;
    } else if (expect !== typeof result) {
      return "type " + (typeof result) + "\n    ...was returned, but expected...\n    type " + expect;
    }
  };

  Main.test("Constructor exceptions");

  Main.test({
    "Construct 1": function() {
      return [
        Main.throws, "'opt' is type 'number', not 'object'", function() {
          return new Main(1);
        }
      ];
    }
  });

}).call(this);
