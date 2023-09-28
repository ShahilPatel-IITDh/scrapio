
  <!-- ko if: $masterViewModel.isPreview -->
  <div class="sf-display-error">
    <span class="sf-error-title" data-bind="text: $root.displayErrorMessage"></span>:
    <span class="sf-error-msg"></span>
  </div>
  <!-- /ko -->
  <!-- ko ifnot: templateSrc -->
  <!-- ko if: templatePath() -->
  <div data-bind='template: {name: templatePath(), templateUrl: ""}, attr: {id: stackType()+"-"+id()}'
       class="stack-template "></div>
  <!-- /ko -->
  <!-- /ko -->
  <!-- ko if: templateSrc -->
  <div data-bind='template: {name: name(), templateSrc: templateSrc()}, attr: {id: stackType()+"-"+id()}'
       class="stack-template "></div>
  <!-- /ko -->
