ï»¿PcsIamClient.StringUtil = (() => {

    const toNumeric = ((stringInput) => {
        if (!stringInput) return;

        return stringInput.replace(/[^0-9]/gi, '')
    });

    const init = ((options) => {
        console.log("PcsIamClient.StringUtil init options", options);
    });

    return {
        init,
        toNumeric
    }
})();