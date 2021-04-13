let selectorToStyle = {};
let summary, currentPage;

function starEvaluation() {
    window.qwPage = new Module.QWPage(document, window, true);
    window.DomUtils = Utility.DomUtils;
    window.AccessibilityUtils = Utility.AccessibilityUtils;
    summary = { passed: 0, failed: 0, warning: 0, inapplicable: 0, title: document.title };
}

function evaluateACT() {
    let actResult, result;
    window.act = new ACT.ACTRules();
    //window.act.validateFirstFocusableElementIsLinkToNonRepeatedContent();
    window.act.executeAtomicRules();
    window.act.executeCompositeRules();
    actResult = window.act.getReport();
    addValuesToSummary(summary, actResult);
    result = actResult.assertions;
    return result;
}

function evaluateWCAG() {
    let html, htmlResult, result;
    html = new WCAG.WCAGTechniques();
    htmlResult = html.execute(false);
    addValuesToSummary(summary, htmlResult);
    result = htmlResult.assertions;
    return result;
}

function endingEvaluation() {
    window.qwPage.cleanAllElements();
    return summary;
}
function addValuesToSummary(summary, report) {
    window.console.log("report:", report);
    summary.passed += report.metadata.passed;
    summary.failed += report.metadata.failed;
    summary.warning += report.metadata.warning;
    summary.inapplicable += report.metadata.inapplicable;
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

