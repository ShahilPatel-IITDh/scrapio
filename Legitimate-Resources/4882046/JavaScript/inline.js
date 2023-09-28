
        var AdFlowValidation;
        if (AF.Campaign.v == undefined) {AF.Campaign.v = {}; }
        if (AF.SubFlow.v == undefined) { AF.SubFlow.v = {}; }
        if (AF.System.v == undefined) { AF.System.v = {}; }
        if (AF.Flow.v == undefined) { AF.Flow.v = {}; }
        if (AF.Lead.v == undefined) { AF.Lead.v = {}; }
        AF.SubFlow.v.ExitOptionCode = { KO: "0", E2D: "1", S2E: "2", S2P: "3", ES2E: "12", ES2P: "13" };
        //AF.System.v.ExitStatus = { Land: "1", Skip: "2", Submit: "3", Pass: "4", Entry: "5" };
        AF.System.v.ValidationOption = { Alert: "0", Popup: "1" };
        AF.System.v.DataFormalize = { Initial: "0", Final: "1" };
        //AF.System.v.Iframe = false; //Need to be defined
        AF.System.v.AutoTabOn = true;

        _jCid = CID = GetFlowVariable(AF.Campaign.v.CampaignID);
        _jCidx = GetFlowVariable(AF.Campaign.v.cIdx);
        _jSubAtt = GetFlowVariable(AF.Campaign.v.SubmitAttempt);
        _jType = GetFlowVariable(AF.Campaign.v.Type);

        AF.Campaign.v.EventPixelMethod = { Iframe: "1", Inline: "2" };
        AF.Campaign.v.InfoLookupKey = { Zip: 1, Gender: 2, GeoIP: 4 };
        AF.Campaign.v.SubmitAttempt = 1;
        AF.Campaign.v.Submitted = true;
        AF.Campaign.v.TotalStep = 2;
        AF.Campaign.v.CurrentStep = 0;
        AF.Campaign.v.CrossSubmitOption = { ViewOnly: "0", SubmitOnly: "1", ViewAndSubmit: "2", SubmitOnlyWithcVID: "3" }
        AF.Campaign.v.SubmittedcVID = [];
        /*************************System Setting START*********************/
        AF.System.v.NameSpace = "AF.System";
        AF.Campaign.v.NameSpace = "AF.Campaign";
        AF.Flow.v.NameSpace = "AF.Flow";
        AF.SubFlow.v.NameSpace = "AF.SubFlow";
        AF.Lead.v.NameSpace = "AF.Lead";
        AF.System.v.RegFormElemID = "#RgForm";
        AF.System.v.OfferFormElemID = "#FlowSQForm";
        /*************************System Setting END*********************/
    