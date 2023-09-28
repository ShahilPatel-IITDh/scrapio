
    ;(function() { window.Aura = window.Aura || {}; window.Aura.beforeFrameworkInit = Aura.beforeFrameworkInit || []; window.Aura.beforeFrameworkInit.push(function() { /*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
var ContentAssetGlobalValueProvider=function(a,b){this.orgId=a;this.contentDomainUrl=b};ContentAssetGlobalValueProvider.prototype.merge=function(){};ContentAssetGlobalValueProvider.prototype.isStorable=function(){return!1};ContentAssetGlobalValueProvider.prototype.get=function(a){var b="";if(!a||0===a.length)return null;b=a+"?oid\x3d"+this.orgId+"\x26";a="/file-asset/"+b;var b=$A.get("$SfdcSite.pathPrefix"),c=$A.get("$Absolute.url");return b?[c||b||"",a].join(""):[this.contentDomainUrl||"",a].join("")};

//# sourceMappingURL=/javascript/1689538708572/ui-sfdc-javascript-impl/source/ContentAssetGVP.js.map

$A.addValueProvider('$ContentAsset', new ContentAssetGlobalValueProvider('00D300000000bS4',''))
 ; }); window.Aura.beforeFrameworkInit.push(function() { /*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
var RecordGlobalValueProvider=function(a,b,c,d,e){this._cmp=null;this.configs={refresh:1E3*a,expiration:1E3*b,maxSize:c,version:d,previousVersion:e,minSaveToStorageInterval:3E3,expirationMobile:2628E6};Object.freeze(this.configs)};RecordGlobalValueProvider.prototype.getValues=function(){return{}};RecordGlobalValueProvider.prototype.merge=function(a){$A.util.isEmpty(a)||(this._createCmp(),this._cmp.helper.recordLib.records._receiveFrom$RecordGvp(a))};
RecordGlobalValueProvider.prototype.get=function(a,b){if("configs"===a)return this.configs;this._requestFromServer(a)};RecordGlobalValueProvider.prototype._requestFromServer=function(a){if(this._createCmp()){var b=this._cmp.get("c.getRecord");b.setParams({recordDescriptor:a});b.setCallback(this,$A.getCallback(function(b){"INCOMPLETE"===b.getState()&&this._cmp.helper.handleIncomplete.call(this._cmp.helper,a)}));$A.enqueueAction(b);$A.run(function(){},"RecordGlobalValueProvider._requestFromServer")}};
RecordGlobalValueProvider.prototype._createCmp=function(){this._cmp||(this._cmp=$A.createComponentFromConfig({descriptor:"markup://force:recordGlobalValueProvider",attributes:null}));return!$A.util.isUndefinedOrNull(this._cmp)};

//# sourceMappingURL=/javascript/1689538708572/ui-sfdc-javascript-impl/source/RecordGVP.js.map

$A.addValueProvider('$Record', new RecordGlobalValueProvider(30, 1800, 5120, '58.0', '57.0')) ; });  }());
        (function() {
            if (!navigator.cookieEnabled) {
                var cookieMessage = document.createElement("div");
                cookieMessage.innerHTML = "<section role='alertdialog' tabindex='-1' aria-labelledby='prompt-heading-id' aria-describedby='prompt-message-wrapper'         class='slds-modal slds-fade-in-open slds-modal_prompt' aria-modal='true' style='color: rgb(62, 62, 60);'>   <div class='slds-modal__container'>       <header class='slds-modal__header slds-theme_info slds-theme_alert-texture'>           <h2 class='slds-text-heading_medium' id='prompt-heading-id'>{0}</h2>       </header>       <div class='slds-modal__content slds-p-around_medium' id='prompt-message-wrapper'>           <p>{1}</p>       </div>   </div></section><div class='slds-backdrop slds-backdrop_open'></div>".replace("{0}", "Technical Stuff").replace("{1}", "To view this site, enable cookies in your browser.");
                document.body.appendChild(cookieMessage);
            }
        }());
    
        (function() {
            var templateType = "home";
            var showUnsupportedBrowserModal = false;
            
            if (templateType === "login") {
                return;
            }
                        
            if (showUnsupportedBrowserModal) {
                var browserNotSupportedMessage = document.createElement("div");
                browserNotSupportedMessage.id = "community-browser-not-support-message";
                browserNotSupportedMessage.innerHTML = "<section role='alertdialog' tabindex='-1' aria-labelledby='prompt-heading-id' aria-describedby='prompt-message-wrapper'         class='slds-modal slds-fade-in-open slds-modal_prompt' aria-modal='true' style='color: rgb(62, 62, 60);'>   <div class='slds-modal__container'>       <header class='slds-modal__header slds-theme_info slds-theme_alert-texture'>           <h2 class='slds-text-heading_medium' id='prompt-heading-id'>{0}</h2>       </header>       <div class='slds-modal__content slds-p-around_medium' id='prompt-message-wrapper'>           <p>{1}</p>       </div>   <footer class='slds-modal__footer slds-theme_default'>               <button class='slds-button slds-button_neutral'>{GOT_IT_LABEL}</button>           </footer></div></section><div class='slds-backdrop slds-backdrop_open'></div>".replace("{0}", "Your browser isn't supported")
                                                                                              .replace("{1}", "Your browser doesn’t support some features on this site. For the best experience, update your browser to the latest version, or switch to another browser.")
                                                                                              .replace("{GOT_IT_LABEL}", "Got It");
                document.body.appendChild(browserNotSupportedMessage);
                var okButton = document.querySelector("#community-browser-not-support-message .slds-modal__footer .slds-button");
                okButton.addEventListener("click", function() {
                    closeModal();
                });
            }
            
            function closeModal() {
                var modal = document.getElementById("community-browser-not-support-message");
                if (modal) {
                    document.body.removeChild(modal);   
                }                
            }
        }());
    
        // keep this variable here, because users do window.picassoSPA in order to check if in PSSC.
        var picassoSPA = {};
        var comm__attrVariationKey = "11FxOYiYfpMxmANj4kGJzg";
    
(function () {
window.pageStartTime = (new Date()).getTime();
window.Aura || (window.Aura = {});
window.Aura.bootstrap || (window.Aura.bootstrap = {});


var time = window.performance && window.performance.now ? window.performance.now.bind(performance) : function(){return Date.now();};
window.Aura.bootstrap.execInlineJs = time();

window.Aura.inlineJsLoaded = true;

var auraConfig = {"disableAuraBundling":false,"deftype":"APPLICATION","ns":{"internal":["SearchCopilot","adminsuccess","adminui","aloha_sales_forecasting","aloha_sales_opptysplit","aloha_sales_tm2","analytics","analyticsHome","analytics_data_manager","analyzer_framework","app_flexipage","appbuilder_actions_bridge","appexUi","assistantFramework","assistantFrameworkModules","assistant_builder","aura","auraStorage","auradev","auradocs","auraplat","b2b_buyer_builder","b2b_buyer_cart","b2b_buyer_coupons","b2b_buyer_data","b2b_buyer_einstein_activities","b2b_buyer_error_states","b2b_buyer_navigation","b2b_buyer_orders","b2b_buyer_pricing","b2b_buyer_product_category","b2b_buyer_product_details","b2b_buyer_product_images","b2b_buyer_promotions","b2b_buyer_quick_order","b2b_buyer_styling","b2b_buyer_wishlists","b2b_search_api","b2b_search_builder","b2b_search_facets","b2b_search_management","b2b_search_product_card","b2b_search_results","b2b_search_results_tiles","b2b_search_settings","b2b_search_suggestions","b2b_storefront","b2c_lite_commerce","backToWork","briefcase","builder_communities_nba","builder_e360_journeys","builder_framework","builder_industries_arcgraph","builder_industries_dataprocessingengine","builder_industries_fsc","builder_industries_healthcare","builder_industries_insurance","builder_industries_integrationconfiguration","builder_industries_interaction_rule","builder_industries_publicsector","builder_industries_serviceprocess","builder_industries_survey","builder_industries_utilizationmanagement","builder_industries_visit","builder_interaction_externalservices","builder_payments","builder_platform_interaction","builder_platform_process","builder_platform_usage","builder_record_flexipage","builder_service_chatbots","calendar","calendar_view","cg_retail","chatbots","chatterui","ci_player","clients","clients_chatapp","cmsAuthor","commerce","commerce_admin_displayable_fields","commerce_assistant","commerce_builder","commerce_cart","commerce_catalog","commerce_checkout","commerce_console","commerce_data_provider","commerce_management","commerce_market","commerce_my_account","commerce_product_details","commerce_product_information","commerce_search","commerce_store_integrations","commerce_troubleshooting","commerce_unified_checkout","commerce_unified_coupons","commerce_unified_promotions","comms_msm","communitySetup","community_article","community_builder","community_byo","community_byo_uem","community_case","community_content","community_dam","community_deflection","community_hierarchy","community_layout","community_login","community_navigation","community_reputation","community_runtime","community_setup","community_styling","community_topic","community_user","community_utils","componentReference","console","contentbuilder","contentpage","conversation","cooper","cordaDashboards","cxm","dashboards","dataImporter","ddcProspector","designtime_cdp","designtime_journeys","designtime_p13n","desktopDashboards","dxp","dxp_action","dxp_base","dxp_builder","dxp_content_layout","dxp_crm_search","dxp_data_provider","dxp_flow","dxp_flowruntime","dxp_form","dxp_icon","dxp_layout","dxp_page_layout","dxp_records","dxp_search","dxp_service","dxp_styling","dxp_util","eamobile","eduadmissions","educationcloud","eduscheduler","einstein_assistant","einstein_discovery","einsteinbuilder","einsteinconduit","emailStream","emailui","embeddedMessaging","embeddedService","embedded_service","embedded_service_iframe","entityinterface","environmenthub","erb","es_base_components","es_block_builder","es_property_editors","escBuilder","essentials_trialassistant","exp_builder","experience","experience_availability","experience_einstein","experience_incident_mgmt","experience_messaging","explainability_setup","externalServicesSetup","feeds_answer_badging","feeds_autocomplete","feeds_best_answer","feeds_caching","feeds_cases","feeds_compact","feeds_discussion_threading","feeds_emoji","feeds_liking","feeds_metrics","feeds_paging","feeds_placeholding","feeds_post_body_content","feeds_replying","feeds_sorter","feeds_timestamping","feeds_translation","feeds_voting","fieldservicemobile","flexipage","flexipageEditor","flow_object_linking","flowruntime","flowtrigger","folder","force","forceChatter","forceChatterApi","forceCommunity","forceContent","forceDiscovery","forceHelp","forceKnowledge","forceSearch","forceTopic","formula","googleConnector","group_industries_publicsector","guardrails","hammerSetup","healthcloud","hello","home","hvcc","hybrid","hyperforce_assistant","industries_automotive","industries_cds_common","industries_cib","industries_common","industries_loyalty_engine","industries_loyalty_promo","industries_manufacturing","industries_mfg_adv_forecast","industries_mfg_common","industries_mfg_forecast","industries_mfg_program","industries_mfg_rebates","industries_mfg_service","industries_mfg_targets","industries_sales_excellence","industries_service_excellence","instrumentation","interaction_explorer","interaction_orchestrator","interop","iot","isotope","journey","jsonxform","knowledge_lightning","knowledgeone","knowledgeui","komaci","komaci_test","komaci_test_components","laf","lbpm","lcwizard","ldsdebug","learning_search","lightning","lightningInbox","lightningcommunity","lightningcomponentdemo","lightningdocs","lightningmobileruntime","lightningsnapin","liveAgent","lst","ltng","ltngtools","lwr","macros","marketing_microsite","mcontent_channel","mcontent_content","mcontent_content_detail","mcontent_content_picker","mcontent_content_preview","mcontent_content_translate","mcontent_editor","mcontent_interaction_builder","mcontent_jobs","mcontent_shared","mcontent_workspace","mfa_assistant","mobileBuilder","mobile_setup","mulesoft_citizen","myday","native","navex","notes","o11y","o11y_schema","objectManager","offline","omni","onboarding","onboardingTest","one","onesetup","onlinesales","opencti","packagingSetupUI","platformencryption","private_industries_common","process_home","process_migration","processui","processuiappr","processuicommon","processuimgnt","processuirule","processuitest","record_flexipage","records","reports","rulepage","runtime_actions_data","runtime_agent_engagement","runtime_all_walkthroughs","runtime_all_walkthroughsTest","runtime_analytics_dataplatform","runtime_appointmentbooking","runtime_approval_process","runtime_associationengine","runtime_automated_actions","runtime_branch_management","runtime_calendar","runtime_cdp","runtime_citizen_flow","runtime_commerce_entitlements","runtime_commerce_oci","runtime_commerce_oms","runtime_commerce_os","runtime_commerce_pricing","runtime_commerce_store","runtime_communities_nba","runtime_compliantsharing","runtime_conversation","runtime_declarative_card","runtime_digital_wallet","runtime_einstein_campaign","runtime_einstein_discovery","runtime_enablement","runtime_enablement_coaching","runtime_essential_checkout","runtime_essentials_common","runtime_growth_intelligence","runtime_hcc_performanceassistant","runtime_hcc_scalecenter","runtime_hello_studio","runtime_hybrid_capabilities","runtime_iag_base","runtime_iag_core","runtime_industries_actionablelist","runtime_industries_actionplan","runtime_industries_aiaccelerator","runtime_industries_aisentimentresult","runtime_industries_arcgraph","runtime_industries_assessment","runtime_industries_budget","runtime_industries_churn_ED","runtime_industries_clause_library","runtime_industries_clm","runtime_industries_clm_addin","runtime_industries_cpq","runtime_industries_documentreader","runtime_industries_epc","runtime_industries_eri","runtime_industries_frops","runtime_industries_fsc","runtime_industries_fundraising","runtime_industries_gdf","runtime_industries_healthcare","runtime_industries_insurance","runtime_industries_integrationconfiguration","runtime_industries_interaction_decisionmatrix","runtime_industries_interesttagging","runtime_industries_lending","runtime_industries_loyalty","runtime_industries_orderforecasting","runtime_industries_ordermanagement","runtime_industries_pricing","runtime_industries_program_mgmt","runtime_industries_publicsector","runtime_industries_recurrence","runtime_industries_referral_management","runtime_industries_referralscoring","runtime_industries_retailexecution","runtime_industries_serviceprocess","runtime_industries_smartselling","runtime_industries_smarttags","runtime_industries_sustainability","runtime_industries_tearsheet","runtime_industries_utilizationmanagement","runtime_industries_visit","runtime_learning_essentials_welcome","runtime_marketing_btobma","runtime_marketing_litmuspreview","runtime_marketing_unifiedmarketing","runtime_mc2","runtime_media_adsales","runtime_mobilesapp","runtime_omnistudio","runtime_omnistudio_common","runtime_omnistudio_flexcards","runtime_omnistudio_omniscript","runtime_online_sales","runtime_payments","runtime_pipeline_inspector","runtime_platformServices_eventMonitoring","runtime_platform_actions","runtime_platform_backgroundoperation","runtime_platform_employee","runtime_platform_leap","runtime_platform_leap_authoring","runtime_platform_notifications","runtime_platform_optimizer","runtime_platform_prefcenter","runtime_platform_privacy_analytics","runtime_platform_privacycenter","runtime_platform_salesforcehub","runtime_platform_sfdx","runtime_platform_testhistory","runtime_platform_unified_notifications","runtime_platformservices_condBuilder","runtime_platformservices_transactionSecurity","runtime_process_exception","runtime_qtc_assetmanagement","runtime_quip","runtime_retail_runtime","runtime_revenue_admin_console","runtime_revenue_billingbatchinvoices","runtime_revenue_billingbatchpayments","runtime_revenue_billingbatchschedulers","runtime_revenue_configurator","runtime_revenue_custom_field_mapping","runtime_revenue_foundation","runtime_revenue_insights","runtime_revenue_products","runtime_revenue_rules","runtime_rtc","runtime_rtc_spark","runtime_sales_activities","runtime_sales_ade","runtime_sales_billingpayments","runtime_sales_cadence","runtime_sales_cadencebuilder","runtime_sales_campaign","runtime_sales_commerce","runtime_sales_corebiz","runtime_sales_dedupe","runtime_sales_easy","runtime_sales_emailtemplateui","runtime_sales_engagement","runtime_sales_forecasting","runtime_sales_hvs","runtime_sales_insights","runtime_sales_lead","runtime_sales_leadiq","runtime_sales_linkedin","runtime_sales_merge","runtime_sales_multiaddedit","runtime_sales_opportunitysplit","runtime_sales_pathassistant","runtime_sales_pipelineboard","runtime_sales_quotes","runtime_sales_salesAIForEveryone","runtime_sales_skype","runtime_sales_social","runtime_sales_todo_list","runtime_sales_video","runtime_sales_xclean","runtime_search_federated","runtime_service_easy","runtime_service_fieldservice","runtime_service_incident_mgmt","runtime_service_knowledge_generation","runtime_service_liveagent","runtime_service_livemessage","runtime_service_objectlinking","runtime_service_omnichannel","runtime_service_predictions","runtime_service_scs","runtime_service_servicecatalog","runtime_service_suggested_articles","runtime_service_swarming","runtime_service_trials","runtime_service_workforce_engagement_config","runtime_ses_base","runtime_ses_ext","runtime_thp_builder","runtime_thp_cms","runtime_thp_learning","runtime_video_platform","runtime_web3","runtime_workdotcom_broadcast","runtime_workdotcom_qmgmt","runtime_workdotcom_scheduling","runtime_workdotcom_trust_cards","s1wizard","sales_bots","sales_einstein","salesforceIdentity","sass_service_catalog","scrt","scrt_setup","search_dialog","search_filters","search_instrumentation","search_lightning","search_navigation","search_nls","search_results","search_setup","securityHealth","securityHub","securitycentral","selfService","serviceCommunity","service_cloud_voice","servicecatalogbuilder","setup","setupAssistant","setup_analytics_datamanager","setup_analytics_pardot","setup_appexchange_appAnalytics","setup_automated_actions","setup_batch_management","setup_cdp","setup_citizen_journey","setup_clients_chatapp","setup_content_collections","setup_data_translation","setup_document_checklist","setup_einstein_assistant","setup_einstein_doccapture","setup_einstein_shared","setup_exploration_consent","setup_gpt_summarization","setup_industries_accounting_subledger","setup_industries_advancedforecast","setup_industries_aiaccelerator","setup_industries_automotive_foundation","setup_industries_byoa","setup_industries_churnprediction","setup_industries_clm","setup_industries_common","setup_industries_comprehend","setup_industries_context","setup_industries_cpq","setup_industries_dataprocessingengine","setup_industries_decisiontable","setup_industries_docgen","setup_industries_documentreader","setup_industries_educationcloud","setup_industries_grantmaking","setup_industries_insurance","setup_industries_mfg_common","setup_industries_mfg_service","setup_industries_mfgprogram","setup_industries_objectdetection","setup_industries_pricing","setup_industries_publicsector","setup_industries_referralscoring","setup_industries_rfm","setup_industries_scoringframework","setup_industries_smartselling","setup_industries_smarttags","setup_industries_tpm","setup_industries_vertical_integration","setup_integration_services","setup_lightning_visualforce","setup_marketing_unifiedmarketing","setup_mc2","setup_mobile_appclone","setup_mobile_security","setup_motivation","setup_osl","setup_osl_actions","setup_payments","setup_platformServices_eventManager","setup_platformServices_eventMonitoring","setup_platform_a2","setup_platform_adoptionapps","setup_platform_api_wsdl","setup_platform_cdc","setup_platform_dsar","setup_platform_dynamodbsetupwizard","setup_platform_eventrelay","setup_platform_externalconnection","setup_platform_externaldatasource","setup_platform_integration","setup_platform_ltngbolt","setup_platform_namedcredential","setup_platform_notifications","setup_platform_optimizer","setup_platform_perms","setup_platform_sfdx","setup_platformservices_customplatform","setup_platformservices_customschema","setup_prototyping_consent","setup_release_update","setup_revenue_insights","setup_revenue_intelligence","setup_sales_ai4m","setup_sales_einstein","setup_sales_einsteinForecasting","setup_sales_forecasting","setup_sales_insights","setup_sales_leadiq","setup_sales_linkedin","setup_sales_opportunity_score","setup_sales_pardot","setup_sales_pathassistant","setup_sales_spark","setup_service","setup_service_entityarchiving","setup_service_experience","setup_service_fieldservice","setup_service_flowobjectlinking","setup_service_folmessaging","setup_service_folvoice","setup_service_intents","setup_service_knowledge_generation","setup_service_livemessage","setup_service_messenger","setup_service_objectlinking","setup_service_omnichannel","setup_service_predictions","setup_service_scs","setup_service_smb","setup_service_swarming","setup_service_usecaseexplorer","setup_service_voice","setup_suggested_articles","setup_suggested_response","setup_user_access_policies","setup_value_center","setupnav","setupwizard","sfa","sfdc_cms","sfdc_fieldservice","sfdc_gantt","sfdc_payments_console","sfdc_tableau_viz","siteforce","siteforceBuilder","slack_invocable_actions","slds","spcm_industries_publicsector","subledger_flow","support","survey","sustainability","templatesetup","today","transformEditor","ui","uiExamples","uns","usage_app","userProvisioningUI","visualEditor","voice","wave","waveapps","wfm","wfm_adherence","wfm_agentengagement","wfm_analytics","wfm_intraday_management","wfm_scheduling","wits","work","workAloha","forceGenerated"],"privileged":["DEVOPSIMPKG1","DEVOPSIMPKG10","DEVOPSIMPKG2","DEVOPSIMPKG3","DEVOPSIMPKG4","DEVOPSIMPKG5","DEVOPSIMPKG6","DEVOPSIMPKG7","DEVOPSIMPKG8","DEVOPSIMPKG9","einsteinservice","et4ae5","FinServ","FinServ_WM","FinServ_RB","FinServ_CB","FinServ_SB","FinServ_WM_SB","FinServ_RB_SB","FinServ_INS_SB","FinServ_CB_SB","FinServ_RB_Pre","FinServ_INS_Pre","FinServ_CB_Pre","FinServWaveExt","FSC","FSC1","FSC10","FSC10gs0","FSC11","FSC12","FSC13","FSC14","FSC15","FSC2","FSC3","FSC4","FSC5","FSC6","FSC6gs0","FSC7","FSC7gs0","FSC8","FSC8gs0","FSC9","FSC9gs0","FSC_RB","fscprerelease","fsc1_r1","fsc2_r1","fsc3_r1","fscwealth","fscwealthE","fscwealthpatch","fscwealthfuture","fscfma","fscwmmain","FSL","FSLMPDEV","FSLQA","HealthCloud_SB","HealthCloudGA","hc1_r1","hc2_r1","hc3_r1","HC10gs0","HC11","HC12","HC13","HC14","HC15","HC16","HC17","HC18","HC19","HC20","HC21","HC22","HC23","HC24","HC25","HC4","HC4a","HC5","HC6","HC6gs0","HC7","HC7gs0","HC8","HC8gs0","HC9","HC9gs0","hcfma","hcperf","iqinbox","mcdm_3","mcdm_8","mcdm_15","mcdm_21","mcdm_22","mcdm_23","mcdm_24","mcdm_25","mcdm_26","mcdm_27","mcdm_28","mcdm_29","mcdm_30","mcsocsel","mcsocsel_1","mcsocsel_2","mcsocsel_3","mcsocsel_4","mcsocsel_5","mcsocsel_6","mcsocsel_7","mcsocsel_8","mcsocsel_9","mcsocsel_10","relateiq","wealthone","wealthoneblitz","wealthonep","fscmainstguat","hcmainstguat","fscmainstgpu","hcmainstgpu","fscsbuat","hcsbuat","fscsbpu","hcsbpu","fscr1uat","hcr1uat","fscr1pu","hcr1pu","wkcc","vlocity_lwc27","vlocity_lwc26","vlocity_lwc18","vlocity_lwc28","vlocity_lwc30","vlocity_lwc3","vlocity_lwc5","devopsimpkg01","devopsimpkg11","devopsimpkg12","devopsimpkg13","devopsimpkg14","devopsimpkg15","devopsimpkg16","devopsimpkg17","devopsimpkg18","devopsimpkg19","devopsimpkg20","devopsimpkg21","devopsimpkg22","instest12","omnistudio","perf_dc230","scalpel","stmpahins01","vlocityins1","vlocityins2","vlocityins3","vlocityins4","vlocityins5","vlocityins6","vlocityins7","vlocityins8","vlocityins9","vlocityins10","vlocityins11","vlocityins12","vlocityins13","vlocityins2_fsc","vlocity_bmk","vlocity_clmperf","vlocity_cmt","vlocity_dc","vlocity_digital","vlocity_erg","vlocity_ins","vlocity_ins_fsc","vlocity_lwc1","vlocity_lwc2","vlocity_lwc4","vlocity_lwc6","vlocity_lwc7","vlocity_lwc8","vlocity_lwc9","vlocity_lwc10","vlocity_lwc11","vlocity_lwc12","vlocity_lwc13","vlocity_lwc14","vlocity_lwc15","vlocity_lwc16","vlocity_lwc17","vlocity_lwc19","vlocity_lwc20","vlocity_lwc21","vlocity_lwc22","vlocity_lwc23","vlocity_lwc24","vlocity_lwc25","vlocity_lwc29","vlocity_lwctest","vlocity_perf","vlocity_ps","vlocity_upc","cgcloud","cgcloud_dev","cg_cloud_gs0","cgcloud_gs0_stg","cgcloud_r1","cgcloud_stg","cgc_sync","cgc_sync_dev","cgc_sync_gs0","cgcsync_gs0_stg","cgc_sync_r1","cgc_sync_stg","cgc_exc","cgc_exc_stg","devops001gs0","devops002gs0","devops003gs0","devops004gs0","devops005gs0","devops006r1","devops007r1","devops008r1","devops009r1","devops010r1","devopsimpkg27","devopsimpkg28","devopsimpkg29","devopsimpkg30","devopsimpkg31","devopsimpkg32","devopsimpkg33","devopsimpkg34","devopsimpkg35","devopsimpkg36","devopsimpkg37","devopsimpkg38","devopsimpkg39","devopsimpkg40","DEVOPSIMPKG51","DEVOPSIMPKG52","DEVOPSIMPKG53","DEVOPSIMPKG54","DEVOPSIMPKG55","DEVOPSIMPKG56","DEVOPSIMPKG57","DEVOPSIMPKG58","DEVOPSIMPKG59","DEVOPSIMPKG60","DEVOPSIMPKG61","DEVOPSIMPKG62","DEVOPSIMPKG41","DEVOPSIMPKG42","DEVOPSIMPKG43","DEVOPSIMPKG44","DEVOPSIMPKG45","DEVOPSIMPKG46","DEVOPSIMPKG47","DEVOPSIMPKG48","DEVOPSIMPKG49","DEVOPSIMPKG50","DEVOPSIMPKG64","DEVOPSIMPKG65","DEVOPSIMPKG66","DEVOPSIMPKG67","DEVOPSIMPKG68","DEVOPSIMPKG69","DEVOPSIMPKG70","DEVOPSIMPKG71","DEVOPSIMPKG72","ins_fsc04_gs0","vlocity_fsc_gs0","wkdw"]},"bootstrapInlined":false,"LabelsFromStorage":true,"descriptor":"markup://siteforce:communityApp","pathPrefix":"","staticResourceDomain":"","initializers":{"gates":{"komaciInLexRecordLayout.lasr.ltng":[0,0],"rrh.useLWCRelatedLists.__test__":[0,1],"enableRuntimeReportingService.lwc.ltng":[0,0],"com.salesforce.listview.drl.viewAll":[1,0],"com.salesforce.scalecenter.isStelePdfGenerationEnabled":[0,0],"createReport.ecm.einstein":[1,0],"komaciInLexAction.lasr.ltng":[0,0],"scenarioTrackerEnabled.instrumentation.ltng":[0,1],"clientTelemetry.instrumentation.ltng":[1,0],"com.salesforce.scalecenter.isOptInFeatureEnabled":[1,0],"browserIdleTime.instrumentation.ltng":[0,0],"componentProfiler.instrumentation.ltng":[0,1],"progressiveContainerInTab.lasr.ltng":[0,0],"lookups.lookupMobilev2":[0,1],"lasr.refreshViewAPI":[1,0],"relatedList.lwcDrillin":[0,1],"versionedFlexipagesDescriptor.lwcFlexipages.uip":[0,0],"o11yEnabled.instrumentation.ltng":[1,0],"lds.useNewTrackedFieldBehavior":[1,0],"o11yAuraActionsEnabled.instrumentation.ltng":[0,0],"ui.services.PageScopedCache.enabled":[1,0],"quickFiltersViewAll.drl.expSvc":[1,0],"com.salesforce.scalecenter.shouldSendMetricsRequestsToBackend":[1,0],"lwc.objectHome.expSvc":[0,1],"komaciInLexFlexipage.lasr.ltng":[0,1],"komaciInLex.lasr.ltng":[0,0],"limitPerfTrxMarks.instrumentation.ltng":[1,0],"tableau.auth.jwt":[0,1],"scenarioTrackerMarksEnabled.instrumentation.ltng":[0,1]},"featureFlag":{"MapsApi.org.allowAddressAutoComplete":false,"Networks.org.siteHasGenerativeAnswers":false},"accessChecks":{"Insights.userCanViewUsage":true,"ActionCadence.orgHasAccessToCadenceInFolders":false,"HealthCloud.userCanAccessOrAdminHealthCloud":false,"EinsteinBuilder.orgHasEpbJoins":false,"Insights.orgHasWaveTimeZoneEnabled":true,"EngagementAlertsPlatform.orgHasAlertsWebPushNotificationsAccess":true,"InteractionCalculation.orgHasBREandDESAccess":false,"Support.orgHasLightningQuickText":true,"HighVelocitySales.userCanCreateStandardCadence":false,"Support.userHasLightningOpenCtiSettings":false,"PublicSector.userHasPscLpiAccess":false,"Interaction.userCanViewInteraction":false,"Voice.userHasVoiceOutbound":false,"Insights.canScheduleWorkflow":false,"EinsteinSearch.orgCanHaveEinsteinSearchCSPilot":true,"Learning.userHasGuidanceCenterDefaultPinned":false,"Records.StateCountryPicklistEnabled":false,"PipelineInspector.userCanAccessOpportunityIntelligencePanel":true,"OmniChannel.orgHasOmniSkillsRouting":true,"Voice.orgHasCallDispositionEnabled":false,"CommercePricing.userCanAccessPriceSheetMappingEntities":false,"Insights.userCanViewEdgeMarts":false,"Insights.orgHasLwcInsightsEnabled":false,"AppointmentBooking.orgHasTopicOrTemplate":false,"MailApp.orgHasNewIFTEnabled":true,"Insights.userHasInsightsAdmin":false,"Learning.userHasLearningPaths":false,"Insights.userHasSonic":false,"SalesExcellence.orgHasAccessToSalesExcellenceEngagement":false,"Messaging.orgEnabledEmailToCase":true,"DocGen.orgHasDocGenBulkProcessing":false,"InteractionCalculation.userHasBREandDESAccess":false,"EinsteinDataDiscovery.userCanViewEDUIStory":false,"Insights.userCanAccessDataTemplates":false,"Cpq.userIsCollectionUser":false,"Visualforce.isVFRecordDataInvalidationEnabled":true,"InteractionUdd.orgHasEnhancedFlowListView":true,"CommercePricing.userCanAccessFieldMappingEntities":false,"ClauseMgmt.isClauseDesigner":false,"HealthCloud.orgHasHealthCloudStarter":false,"FieldService.orgHasUsageBasedPreventiveMaintenance":false,"Workflow.orgCanCreateProcesses":false,"AutomatedActions.userCanAccessAutomatedActions":false,"Interaction.orgHasReactiveScreens":false,"Interaction.userCanEditOrchestration":false,"EmbeddedService.userHasEmbeddedMessagingAgent":false,"ServiceCloudVoice.userIsCCAdminOrAgentBYOT":false,"OrgPreferences.OptimizerAppEnabled":true,"Interaction.userCanEditDesigner":false,"RevProduct.userCanAccessBundles":false,"OrgPermissions.SubscriptionsEnabled":false,"Insights.orgCanScheduleSubHourly":true,"LiveMessage.userHasLiveMessageAgent":false,"Admin.userCanCustomizeApplication":false,"Insights.orgHasWaveNullMeaEnabled":true,"HealthCloud.orgHasHealthCloud":false,"Flexipage.orgCanHaveFieldInstancesOnMobile":true,"ServiceVoice.orgHasCallCollaboration":true,"Voice.orgHasDoNotCall":false,"VideoConference.userCanUseVideoConferenceZoom":false,"ManagedContent.orgHasCMSSpaceV2Translation":true,"RuleEngine.userHasPricingRuleReadAccess":false,"Interaction.userCanViewFlowOrJourneyBuilder":false,"ServiceCloudVoice.orgHasServiceCloudVoiceEnabled":false,"Insights.orgCanUseWaveIframeDashboard":false,"Learning.userCanEditInAppLearning":false,"Navigation.DisablePPR":false,"Scheduling.orgHasShiftView":false,"AppointmentBooking.orgHasMultipleTopicsForShifts":false,"Cpq.userCanAccessSubscriptionManagement":false,"Interaction.userCanRunInteraction":true,"Insights.orgHasWaveSharing":true,"Insights.userCanUseConnections":false,"HelloStudio.orgHasMeetingPrepEnabled":false,"Interaction.orgHasFlowAutoFieldsUseRecComp":true,"MailApp.orgHasSalesforceEverywhereEnabled":true,"ServiceCloudVoice.userIsContactCenterSupervisor":false,"ConsoleNavigation.orgLazyLoadsDetailsTabContent":false,"MailApp.orgHasDisplayNotificationsEnabled":true,"ServiceCloudVoice.orgHasTranscriptionToggleEnabled":false,"AdminSuccess.guidanceCenterForAllUsers":false,"Insights.userCanManagePrivateAssets":false,"Enablement.userHasEnablementAdminAccess":false,"Learning.orgHasAdvancedLearningContent":true,"FieldService.orgHasShiftManagement":false,"Interaction.orgHasFlowRuntimeV2LwcRollbackSwitchOn":false,"HighVelocitySales.orgHasAutoSendEmailEnabled":false,"Sales.orgHasOppTeamSellingOn":true,"Support.orgHasSwarmingAccess":true,"Insights.canCreateEdgemart":false,"EmailStream.userHasSIQProductivityFeaturesEnabledInLex":false,"Insights.orgHasLiveConnectors":true,"S1Desktop.userHasActivitiesRelatedListsOnRecordHome":false,"TrailheadOnLightning.canShowNewSidePanel":true,"Flexipage.orgHasFieldInstancesOnMobileEnabled":false,"Cpq.userCanAccessProductImport":false,"EmailStream.userHasEmailStreamEnabled":false,"OmniChannel.orgHasOmniChannelScrt2BotRouting":true,"Interaction.orgHasFlowRuntimeV3":true,"Interaction.orgHasFlowRuntimeV2":true,"ContractMgmt.ContractMgmtAdmin":false,"Support.userCanCreateLightningQuickText":false,"Insights.orgHasSalesforceWriteConnector":false,"UnifiedMarketing.unifiedMarketingEnabled":false,"HighVelocitySales.userHasAnyAttributionEnabled":false,"BluetailWits.hasCompanySuggestions":false,"LightningWebRuntime.orgHasLightningWebRuntimeEnabled":false,"Voice.orgHasSCVConversationIntelligencePilot":false,"IndustriesCib.orgHasCallReports":false,"PublicLoggingLib.allowJSPublicLoggingLib":true,"Insights.canUseDataPrep":false,"Support.isQuickTextUiInLtngHidden":false,"Insights.orgHasS3WriteConnector":false,"ContractMgmt.userHasContractMgmt":false,"Interaction.orgHasFlowRuntimeForceLwcBody":false,"EinsteinBuilder.orgHasEpbWithCdpDataPilot":false,"Etlo.orgHasEtlOrchestrationPermEnabled":false,"Insights.userCanUseRecipeEditor":false,"S1Desktop.orgHasSimpleRecordHome":false,"Interaction.orgHasOrchSharing":true,"Insights.orgHasReplicationEnabled":false,"InteractionCalculation.userHasInteractionCalculationAdminAccess":false,"Insights.orgCanUseIntelligentTemplatedApps":false,"Interaction.userCanEditInteraction":false,"AdminSuccess.guidanceCenterEnabled":false,"HighVelocitySales.orgHasLegacySnoozeStateBehavior":false,"InteractionCalculation.orgHasInteractionCalculationPilot":false,"LiveAgent.orgHasLiveAgent":true,"EnablementCoaching.orgHasCoaching":false,"Social.hasSocialObjectsPilot":false,"Learning.orgCanPinGuidanceCenter":true,"HealthCloud.orgHasHealthCloudIntegratedCareManagement":false,"ServiceCloudVoice.userCanToggleCallRecordings":false,"Chatapp.orgCanUseTeamsIntegration":false,"EinsteinBuilder.orgHasEpbOneToOneJoinsEnabled":false,"Insights.orgHasSnowflakeWriteConnector":false,"Insights.userHasInsights":false,"AdminSuccess.onboardingAppUserAccess":false,"Insights.userHasDataPipelinesApp":false,"HighVelocitySales.orgHasAutoSendEmailEnabledForQuickCadence":false,"Insights.userHasMulesoftDataPath":false,"HighVelocitySales.orgHasLinkedInIntegrationForHVSEnabled":false,"ManagedContent.orgHasMContentEnhancedSearch":false,"SecurityHub.orgHasSecurityHub":false,"HealthCloudUtilizationMgmt.orgHasUtilizationManagement":false,"BluetailWits.isSocialInsightsLogoAdmin":false,"EssentialsTrialSignup.IsResellerTrialOrg":false,"Insights.canUploadExternalData":false,"Insights.orgHasSyncOut":false,"EinsteinDataDiscovery.userCanCreateStoryEDUIStory":false,"EinsteinBot.canUseEmailChannelOnECM":false,"ServiceCatalog.orgHasCustomerCatalogAccess":true,"EinsteinBuilder.orgHasEpbOnHawkingEnabled":true,"EngagementAlertsPlatform.userHasEngagementAlertsAccess":false,"EinsteinAgent.orgHasSuggestedResponse":false,"RuleEngine.userHasPricingRuleModifyAccess":false,"Interaction.orgHasFlowSectionsAndColumns":true,"DocGen.userHasDocGenDesigner":false,"Cpq.orgHasCpqPreview":false,"Insights.orgHasCDPDirectPilot":false,"Learning.orgHasLearningSearch":false,"HighVelocitySales.orgHasMultipleCadences":false,"Interaction.orgHasLwcRuntimeV3":true,"RuleEngine.orgHasPricingRuleEnabled":false,"DocGen.orgHasMS365Integration":false,"Insights.canViewWorkflowAndNodes":false,"SceFreemium.orgHasFreeScoresEnabled":true,"RuleEngine.userHasRuleEnginePlatformAccess":false,"Records.isRRHVersionIndicatorEnabled":false,"Insights.userCanEditEdgeMarts":false,"Knowledge.useLwcFlexipage":false,"OrgPermissions.PaymentPlatform":false,"Insights.orgHasTableauHyperWriteConnector":false,"CommercePricing.orgHasPriceSheetsPricingEnabled":false,"PipelineInspector.userCanAccessIntelligenceOverview":false,"EinsteinAgent.userHasSuggestedResponse":false,"AdminSuccess.onboardingAppIsSysAdmin":false,"AdminSuccess.simplifiedGuidanceContent":false}},"cdnForLatestDef":false,"host":"/s/sfsites","auraCmpDefBaseURI":"/auraCmpDef?_au=px8N56mPBZchFBRlTl_6MQ&_c=false&_density=VIEW_ONE&_ff=DESKTOP&_l=true&_l10n=en_US&_lrmc=618546923&_style=153859635&aura.app=markup://siteforce:communityApp&aura.mode=PROD","context":{"mode":"PROD","app":"siteforce:communityApp","fwuid":"YlFCb0tteDV4aGhQNENwMlB3WlU0ZzE0VDFFNVRwUjllNDRPNDJ3WDdmcWcyNDQuMjAuMS0yLjQxLjQ","loaded":{"APPLICATION@markup://siteforce:communityApp":"px8N56mPBZchFBRlTl_6MQ"},"apce":1,"apck":"JHt0aW1lc3RhbXB9MDAwMDAwMDcwNTBlbl9VUw","mlr":1,"contextPath":"/s/sfsites","pathPrefix":"","dns":"c","ls":1,"lrmc":"618546923","mna":{"lightning":"interop"},"lav":"58","lff":{"ENABLE_MIXED_SHADOW_MODE":false,"ENABLE_LIGHT_GET_ROOT_NODE_PATCH":true,"DISABLE_LIGHT_DOM_UNSCOPED_CSS":false}},"attributes":{"ac":"","authenticated":"false","brandingSetId":"52bff5e6-866e-4e63-8c44-d79144c0db18","formFactor":"LARGE","isHybrid":"false","language":"en_US","pageId":"bfd6e0ae-cd7e-4358-90c8-87f8de2344ca","publishedChangelistNum":"164","schema":"Published","themeLayoutType":"Home","uds":"false","viewType":"Published"},"MaxParallelXHRCount":6,"XHRExclusivity":false,"applyCssVarPolyfill":false},
    cn = auraConfig["eikoocnekot"];
if (cn) {
    // Read cookie and convert it to the token config value. This is being done early so the cookie is deleted and reduces the chance the cookie unnecessarily sent to the server with subsequent requests.
    var cookies = "; " + document.cookie + ";",
        value,
        key = "; " + cn + "=",
        begin = cookies.indexOf(key);
    if (begin !== -1) {
        var end = cookies.indexOf(";", begin + key.length);
        value = cookies.substring(begin + key.length, end);
    }
    if (!value) {
        throw new Error("Unable to read the Aura token from the response.");
    }
    auraConfig["token"] = value;
    // Delete cookie
    var cookie = cn + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    if ((cn.indexOf("__Host-") === 0)) {
        cookie += "; secure";
    }
    document.cookie = cookie;
    delete auraConfig["eikoocnekot"]
}
auraConfig.context.styleContext = null;

function auraPreInitBlock () {
	
            $A.storageService.setIsolation("00D300000000bS40DB400000008P1U00540000003TkR3en_US52bff5e6-866e-4e63-8c44-d79144c0db18BLM164875979000000000007050");
            $A.storageService.setVersion("58.0");
            $A.storageService.setPartition("communityApp ~ /s ~ 0DB400000008P1U");
        (function(debug, key){
function setCryptoKey(key) {
    var buffer, view;
    if (Array.isArray(key) && (key.length === 32 || key.length === 16)) {
        try {
            buffer = new ArrayBuffer(key.length);
            view = new Uint8Array(buffer);
            view.set(key);
        } catch (ignored) {}
    }
    CryptoAdapter.setKey(buffer);
}
debug && $A.log('CryptoAdapter registering');
var CryptoAdapter = $A.storageService.CryptoAdapter;
CryptoAdapter.register();
if (!$A.storageService.isRegisteredAdapter(CryptoAdapter.NAME)) {
    $A.log('CryptoAdapter was not registered');
    return;
}
setCryptoKey(key);

}(true,[-15, 21, 71, 12, -62, -68, 67, -28, -13, 118, -128, 47, -116, -28, 112, -107, 112, -40, 38, 6, -103, -37, 65, -64, -112, 111, -83, 41, 49, -75, -17, 121]));$A.storageService.initStorage({name: 'actions', persistent: true, secure: true, maxSize: 157286400, expiration: 900, autoRefreshInterval: 30, debugLogging: false, clearOnInit: false, version: ''});
$A.storageService.initStorage({name: 'ComponentDefStorage', persistent: true, secure: false, maxSize: 104857600, expiration: 900, autoRefreshInterval: 900, debugLogging: false, clearOnInit: false, version: ''});

}

function initFramework () {
	window.Aura = window.Aura || {};
	window.Aura.app = auraConfig["context"]["app"];
	window.Aura.beforeFrameworkInit = Aura.beforeFrameworkInit || [];
	window.Aura.beforeFrameworkInit.push(auraPreInitBlock);
	window.Aura.inlineJsReady = time();

	;

	if (!window.Aura.frameworkJsReady) {
		window.Aura.initConfig = auraConfig;
	} else {
		if (auraConfig.context) {
			if (auraConfig.context.dpbp) {
				// Set a data attribute on document.body to signal engine to bypass global patching
				document.body.setAttribute("data-global-patching-bypass", "temporary-bypass");
			}
			$A.componentService.initLwcFeatureFlags(auraConfig.context);
		}

		// LockerService must be initialized before scripts can be executed.
		$A.lockerService.initialize(auraConfig.context);

		// scripts inside custom templates with Locker active are stored
		// until now since we need LockerService before running

		var scripts = window.Aura.inlineJsLocker;
		if (scripts) {
			for (var i = 0; i < scripts.length; i++) {
				$A.lockerService.runScript(scripts[i]["callback"], scripts[i]["namespace"]);
			}

			delete window.Aura.inlineJsLocker;
		}

		if (true) {
			$A.initAsync(auraConfig);
		} else if (false) {
			$A.initConfig(auraConfig);
		}
	}
}

// Error msg
var x = document.getElementById("dismissError");
if (x) {
	x.addEventListener("click", function () {
		var auraErrorMask = document.getElementById("auraErrorMask");
		if (window["$A"]) {
			$A.util.removeClass(auraErrorMask, "auraForcedErrorBox");
			$A.util.removeClass($A.util.getElement("auraErrorReload"), "show");
		} else {
			document.body.removeChild(auraErrorMask);
		}
	});
}

setTimeout(initFramework, 0); // ensure async



var appCssLoadingCount = 0;
function onLoadStyleSheets(event) {
	if(event){
		var element = event.target;
		element.removeEventListener("load",onLoadStyleSheets);
		element.removeEventListener("error",onLoadStyleSheetsError);
	}
	window.Aura.bootstrap.appCssLoading = (--appCssLoadingCount) > 0;
	if (!window.Aura.bootstrap.appCssLoading) {
		if (typeof window.Aura.bootstrap.appCssLoadedCallback === "function") {
			window.Aura.bootstrap.appCssLoadedCallback();
			window.Aura.bootstrap.appCssLoadedCallback = undefined;
		}
	}
}
function onLoadStyleSheetsError(event) {
	window.Aura.bootstrap.hasCssLoadError = true;
	onLoadStyleSheets(event);
}

var auraCss = document.getElementsByClassName("auraCss");
var current;
window.Aura.bootstrap.appCssLoading = auraCss.length > 0;
for (var c=0,length=auraCss.length;c<length;c++) {
	current = auraCss[c];
	appCssLoadingCount++;
	if(auraConfig.applyCssVarPolyfill) {
		loadViaAjax(current, auraConfig.cssVariables);
	} else {
		current.addEventListener("load",onLoadStyleSheets);
		current.addEventListener("error",onLoadStyleSheetsError);
		current.href = current.getAttribute("data-href");
	}
}

function rewriteCssVars(css, varLookup) {
	var VAR_BEGINNING = "var(--",
		VAR_PATTERN = /var\(--[^-]+-(.*?)\)/g,
		startIndex = 0,
		output = [],
		result;

	function processInContext(css, start, delimiter) {
		while( start++ && start < css.length) {
			if(css[start] === delimiter) {

				return start;
			}
		}
	}

	function processParenthesesInContext(css, start) {
		var opens = 0; var closes = 0;
		while(start < css.length) {
			// This allows us to support nested variables.
			// Count "open" and "close" parentheses. These must match before we return.
			// Note: this assumes parentheses formatting is valid.
			if (css[start] === "(") { opens++; }
			else if (css[start] === ")") { closes++; }
			if(opens === closes) {
				return start;
			}
			start++;
		}
	}

	function findVarEnd(css) {
		for(var idx = VAR_BEGINNING.length; idx < css.length; idx++) {
			switch(css[idx]) {
				case "'":
					idx = processInContext(css, idx, "'");
					break;
				case '"':
					idx = processInContext(css, idx, '"');
					break;
				case "(":
					// we process parentheses differently because open/close must match
					idx = processParenthesesInContext(css, idx);
					break;
				case ")":
					//end of var
					return idx + 1;
				default:
				//continue
			}
		}
	}

	function extractValue(declaration, lookup) {
		var parts = declaration.split(",");
		// try to get value from the lookup
		if(lookup) {
			var match = /var\(--(.*)(?:$|\))/.exec(parts[0]);
			if(match && match.length > 1) {
				var value = lookup[match[1]];
				if(value) {
					return value;
				}
			}
		}
		// get hard coded fallback value
		if(parts.length > 1) {
			var val = declaration.substring(declaration.indexOf(",") + 1);
			var fallback = val.substring(0, val.length-1);

			// if the fallback is another variable, resolve the value recursively
			if (fallback.indexOf("var(") != -1) {
				return extractValue(fallback, lookup);
			}
			return fallback;
		}
	}

	function replaceBlobUrlSubresources(css) {
		var anchor = document.createElement("a");
		return css.replace(/\b(url\s*\(\s*['"]?)([^)"']+)(['"]?\))/g, function (match, left, url, right) {
			anchor.href = url;
			return left + anchor.href + right;
		});
	}

	while ( (result = VAR_PATTERN.exec(css)) ) {

		output.push(css.substring(startIndex, result.index));
		startIndex = result.index;

		var endIndex = startIndex + findVarEnd(css.substring(startIndex));
		var declaration = css.substring(startIndex, endIndex);
		var value = extractValue(declaration, varLookup);

		if(value) {
			output.push(value);
		} else {
			output.push(declaration);
		}
		startIndex = endIndex;
	}

	if(startIndex === 0) {
		return replaceBlobUrlSubresources(css);
	}

	output.push(css.substring(startIndex));

	return replaceBlobUrlSubresources(output.join(""));
}

function injectStyles(linkEl,css){
	var cssEl;
	
	if(auraConfig.applyCssVarPolyfillViaBlob) {
		var blob=new Blob([css],{type:"text/css"});
		cssEl=document.createElement("link");
		cssEl.addEventListener("load",onLoadStyleSheets);
		cssEl.addEventListener("error",onLoadStyleSheetsError);
		cssEl.setAttribute("rel","stylesheet");
		cssEl.setAttribute("href",URL.createObjectURL(blob));
		linkEl.parentElement.insertBefore(cssEl,linkEl);
	}else{
		cssEl=document.createElement("style");
		cssEl.textContent=css;
		linkEl.parentElement.insertBefore(cssEl,linkEl);
		onLoadStyleSheets();
	}
}

function rewriteAndInjectCss(linkEl, source, varLookup) {
	var css = rewriteCssVars(source, varLookup);
	injectStyles(linkEl, css);
}

function loadViaAjax(linkEl, cssVariables) {
	var url = linkEl.getAttribute("data-href");
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("error", onLoadStyleSheetsError);
	xhr.addEventListener("load", function (e) {
		if (this.status === 200) {
			rewriteAndInjectCss(linkEl, xhr.responseText, cssVariables);
		} else {
			onLoadStyleSheets(e);
		}
	});
	xhr.open("GET", url);
	xhr.withCredentials = true;
	xhr.send();
}

window.Aura.rewriteCssVars = rewriteCssVars;
}());
    