var ValidatePaymentGateways = {
  isPaymentTotalZero: function() {
    return parseFloat(JotForm.paymentTotal) === 0;
  },
  validate: function(type) {
    if (this.isPaymentTotalZero()) { return Promise.resolve(true); }
    switch (type) {
      case 'stripe':
        return this.validateStripe();
        break;
      default:
        return Promise.resolve(true);
        break;
    }
  },
	validateStripe: function() {
    if (!JotForm.stripe) { return Promise.resolve(true); }
    return JotForm.stripe.createPaymentMethodForPE(null, function (paymentMethod, error) {
      if (error) {
          JotForm.stripe.correctErrors();
          return JotForm.stripe.handleErrors(error);
      }
    });
  }
};