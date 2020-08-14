import * as types from './mutation-types'

export default {
  [types.SETACT](state, payload) {
    state.act = payload
  },
  [types.SETEVAL](state, payload) {
    state.evaluated[payload.module] = payload.value;
  },
  [types.SETBP](state, payload) {
    state.bp = payload
  },
  [types.SETHTML](state, payload) {
    state.html = payload
  },
  [types.SETCSS](state, payload) {
    state.css = payload
  },
  [types.SETSUMMARY](state, payload) {

    state.summary = payload;
  },
  [types.SETALLFILTER](state, payload) {
    state.filter = payload;
    console.log(state.filter)
  },
  [types.SETFILTER](state, payload) {
    state.filter[payload.key] = payload.value;
  },
  [types.SETALLRESULTFILTER](state, payload) {
    state.resultFilter = payload;
  },
  [types.SETRESULTFILTER](state, payload) {
    state.resultFilter[payload.key] = payload.value;
  },
  [types.SETCURRENTRULE](state, payload) {
    state.currentRule = payload;
  },[types.SETCURRENTRULERESULTS](state, payload) {
    state.currentRuleResults = payload;
  },
  [types.RESET](state) {
    state.evaluated = { act: false, bp: false, css: false, html: false };
    state.act = {};
    state.bp = {};
    state.html = {};
    state.css = {};
    state.summary = {};
    state.filter = {};
    state.resultFilter = { passed: false, failed: false, warning: false, inapplicable: false };
  }
}
