var nfPayPalExpressErrorHandler = Marionette.Object.extend({

    initialize: function() {
        this.listenTo( nfRadio.channel( 'form' ), 'render:view', this.initPPE );
    },


    /*
     * Initialize our error handler.
     * @since 3.0
     * @param layoutView  Backbone.View  The Form view state.
     */
    initPPE: function( layoutView ) {
        var formModel = layoutView.model;
        // Listen for submitted attempts.
        Backbone.Radio.channel( 'form-' + formModel.get( 'id' ) ).reply( 'maybe:submit', this.beforeSubmit, this, formModel );
    },


    /*
     * Function to handle submission attempts.
     * @since 3.0
     * @param formModel  Backbone.Model  The Form model.
     */
    beforeSubmit: function( formModel ) {
        var formID = formModel.get( 'id' );
        // Remove any PayPal errors so that submission can be attempted.
        // TODO: Potenitally need to search for additional slugs later. For now, all errors use the same slug.
        Backbone.Radio.channel( 'form-' + formID ).request( 'remove:error', 'paypal_express' );
    }

});

jQuery( document ).ready( function( $ ) {
    new nfPayPalExpressErrorHandler();
});
