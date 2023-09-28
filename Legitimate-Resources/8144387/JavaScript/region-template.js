
  <!-- ko if: $data.hasOwnProperty('structure') && $data.structure() == 101 -->
  <div  data-bind="css: widthClass, attr: {id: 'region-'+name()}">
    <div data-bind="template: { name: 'stack-template' }"></div>
  </div>
  <!-- /ko -->
  <!-- ko ifnot: $data.hasOwnProperty('structure') && $data.structure() == 101 -->
  <!-- ko if: $data.widgets() && $data.widgets().length && !$data.globalWidgetsOnly() -->
  <div  data-bind="css: widthClass, attr: {id: 'region-'+name()}">
    <!-- ko foreach: $data.widgets  -->
    <!-- ko ifnot: global  -->
    <!-- ko if: initialized  -->
    <!-- ko if: $data.elementsSrc -->
    <!-- ko addTemplate: elementsSrc() --><!-- /ko -->
    <!-- /ko -->
    <!-- ko if: isPreview -->
    <div class="sf-display-error">
      <span class="sf-error-title" data-bind="text: $root.displayErrorMessage"></span>:
      <span class="sf-error-msg"></span>
    </div>
    <!-- /ko -->
    <!-- ko ifnot: $data.templateSrc -->
    <!-- ko if: templateUrl() -->
    <div data-bind='template: {name: templateUrl(), templateUrl: ""}, attr: {id: typeId()+"-"+id()}, visible:($masterViewModel.storeConfiguration.enablePrioritizedLoading) ? (occPrioritizedDisplay ? occPrioritizedDisplay : true):true' ></div>
    <!-- /ko -->
    <!-- /ko -->
    <!-- ko if: $data.templateSrc -->
    <div data-bind='template: {name: templateUrl(),templateSrc: templateSrc()}, attr: {id: typeId()+"-"+id()}, visible:($masterViewModel.storeConfiguration.enablePrioritizedLoading) ? (occPrioritizedDisplay ? occPrioritizedDisplay : true):true' ></div>
    <!-- /ko -->
    <!-- /ko -->
    <!-- /ko -->
    <!-- /ko -->
  </div>
  <!-- /ko -->
  <!-- /ko -->
