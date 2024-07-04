let selectorToStyle = {};
let summary, currentPage;

function starEvaluation() {
  //window.qwPage = new Module.QWPage(document, true);
  //window.DomUtils = Utility.DomUtils;
  //window.AccessibilityUtils = Utility.AccessibilityUtils;
  //window.disabledWidgets = window.AccessibilityUtils.getDisabledWidgets();
  summary = { passed: 0, failed: 0, warning: 0, inapplicable: 0, title: document.title };
  //window.console.log("start evaluation summary:", summary);
  return summary;
}

function evaluateACT() {
  let actResult, result;
  const includedRules = [
    'QW-ACT-R1', 'QW-ACT-R2', 'QW-ACT-R3', 'QW-ACT-R4', 'QW-ACT-R5', 'QW-ACT-R6', 'QW-ACT-R7', 'QW-ACT-R8'
  ];
  window.act = new ACTRules({ translate: locale_en, fallback: locale_en });
  window.act.configure({ rules: includedRules })
  //window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();
  window.act.executeAtomicRules();
  window.act.executeCompositeRules();
  actResult = window.act.getReport();
  addValuesToSummary(summary, actResult);
  //window.console.log("evaluate ACT summary:", summary);
  result = actResult.assertions;
  return result;
}

function evaluateWCAG() {
  let htmlResult, result;
  window.wcag = new WCAGTechniques({ translate: locale_en, fallback: locale_en });
  htmlResult = window.wcag.execute(false);
  addValuesToSummary(summary, htmlResult);
  result = htmlResult.assertions;
  return result;
}

function endingEvaluation() {
  //window.console.log("ending evaluation summary:", summary);
  return summary;
}

function addValuesToSummary(summary, report) {
  //window.console.log("report:", report);
  summary.passed += report.metadata.passed;
  summary.failed += report.metadata.failed;
  summary.warning += report.metadata.warning;
  summary.inapplicable += report.metadata.inapplicable;
  //window.console.log("add values to summary:", summary);
}


function highlightElement(elements) {
  for (let elementResult of elements) {
    let selector = elementResult.pointer;
    let element = document.querySelector(selector);
    element.scrollIntoView();
    let style = { border: element.style.border, outline: element.style.outline, borderRadius: element.style.borderRadius }
    selectorToStyle[selector] = style;
    element.style.border = "1px dashed white";
    element.style.borderRadius = "0px";
    element.style.outline = "1px dashed black";
  }

}

function turnOffhighlightElement(elements) {
  for (let elementResult of elements) {
    let selector = elementResult.pointer;
    let element = document.querySelector(selector);
    let style = selectorToStyle[selector];
    element.style.border = style.border;
    element.style.borderRadius = style.borderRadius;
    element.style.outline = style.outline;
    selectorToStyle[selector] = {};
  }
}