// Soumission unique de formulaires
$(document).on('submit', 'form.submit-and-disable', function (submit){
    // Bloquer la soumission
    submit.preventDefault();

    // Désactiver tous les SUBMIT appartenant à ce form
    $(this).find('button[type=submit], input[type=submit]').prop('disabled',true);

    // Retirer la classe pour autoriser le SUBMIT que l'on est sur le point de déclencher
    $(this).removeClass('submit-and-disable');

    // Soumettre le FORM
    $(this).submit();
});

// À la saisie du numéro de téléphone portable
$(document).on('keyup', 'input.french-cellphone-strict', function (keyup){
    let phone = $(this).val();
    phone = phone.replace(/[^0-9]/, '');

    if (phone.startsWith('336'))
        phone = phone.replace('336', '06');

    if (phone.startsWith('337'))
        phone = phone.replace('337', '07');

    if (phone.length > 10)
        phone = phone.substring(0, 10);

    $(this).val(phone);
});