import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.object.define-property";
import "core-js/modules/es.array.index-of";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.keys";
import "regenerator-runtime/runtime";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { put, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import merge from 'deepmerge';
import types from '../types';
import { makeRequest } from '../api';
export var generateSaga = function generateSaga(_ref2, _ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(generatedSaga);

  var typeCreator = _ref2.typeCreator,
      schema = _ref2.schema,
      dispatchActions = _ref2.dispatchActions;

  var hooks = _ref.hooks,
      tokenSelector = _ref.tokenSelector,
      extendRequest = _ref.extendRequest,
      options = _objectWithoutPropertiesLoose(_ref, ["hooks", "tokenSelector", "extendRequest"]);

  function generatedSaga(request) {
    var token, requestParams, _ref3, body, requestParts, mergedRequest, data, result, payload;

    return regeneratorRuntime.wrap(function generatedSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!tokenSelector) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return select(tokenSelector);

          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = '';

          case 7:
            token = _context.t0;
            requestParams = {};

            if (extendRequest) {
              requestParams = extendRequest(request);
            }

            _context.prev = 10;

            if (!hooks.beforeRequest) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return call(hooks.beforeRequest, request);

          case 14:
            _ref3 = request.request || {}, body = _ref3.body, requestParts = _objectWithoutPropertiesLoose(_ref3, ["body"]);
            mergedRequest = merge(requestParts, requestParams);
            _context.next = 18;
            return call(types[typeCreator.type].saga || makeRequest, _objectSpread({}, request, {
              request: body ? _objectSpread({}, merge(requestParts, requestParams), {
                body: body
              }) : mergedRequest,
              token: token
            }), options);

          case 18:
            data = _context.sent;

            if (!hooks.request) {
              _context.next = 22;
              break;
            }

            _context.next = 22;
            return call(hooks.request, request);

          case 22:
            result = data.data;
            payload = schema ? normalize(result, schema) : result;

            if (!hooks.beforeSuccess) {
              _context.next = 28;
              break;
            }

            _context.next = 27;
            return call(hooks.beforeSuccess, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 27:
            payload = _context.sent;

          case 28:
            if (!dispatchActions) {
              _context.next = 31;
              break;
            }

            _context.next = 31;
            return put({
              type: typeCreator.success,
              action: request,
              payload: payload
            });

          case 31:
            if (!hooks.success) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return call(hooks.success, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 34:
            _context.next = 47;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](10);

            if (!hooks.beforeFailure) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return call(hooks.beforeFailure, {
              error: _context.t1,
              request: request
            });

          case 41:
            if (!dispatchActions) {
              _context.next = 44;
              break;
            }

            _context.next = 44;
            return put({
              type: typeCreator.failure,
              action: request,
              errors: _context.t1
            });

          case 44:
            if (!hooks.failure) {
              _context.next = 47;
              break;
            }

            _context.next = 47;
            return call(hooks.failure, {
              error: _context.t1,
              request: request
            });

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this, [[10, 36]]);
  }

  return generatedSaga;
};

var sagaCreator = function sagaCreator(params, options) {
  var _marked2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(saga);

  var effect = params.effect,
      throttleTime = params.throttleTime,
      typeCreator = params.typeCreator;

  function saga() {
    var generatedSaga;
    return regeneratorRuntime.wrap(function saga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            generatedSaga = generateSaga(params, options);

            if (!(throttleTime > 0)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return effect(throttleTime, typeCreator.request, generatedSaga);

          case 4:
            _context2.next = 8;
            break;

          case 6:
            _context2.next = 8;
            return effect(typeCreator.request, generatedSaga);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  return saga;
};

export default sagaCreator;