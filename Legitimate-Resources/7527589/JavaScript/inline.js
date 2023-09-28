
//<![CDATA[
var _spFormDigestRefreshInterval = 1440000;window.g_updateFormDigestPageLoaded = new Date(); window.g_updateFormDigestPageLoaded.setDate(window.g_updateFormDigestPageLoaded.getDate() -5);var _fV4UI = true;
function _RegisterWebPartPageCUI()
{
    var initInfo = {editable: false,isEditMode: false,allowWebPartAdder: false,listId: "{b8eaa4c6-1214-4197-b6ed-3500155fe517}",itemId: 2,recycleBinEnabled: true,enableMinorVersioning: true,enableModeration: false,forceCheckout: true,rootFolderUrl: "\u002ffr\u002fPages",itemPermissions:{High:16,Low:196673}};
    SP.Ribbon.WebPartComponent.registerWithPageManager(initInfo);
    var wpcomp = SP.Ribbon.WebPartComponent.get_instance();
    var hid;
    hid = document.getElementById("_wpSelected");
    if (hid != null)
    {
        var wpid = hid.value;
        if (wpid.length > 0)
        {
            var zc = document.getElementById(wpid);
            if (zc != null)
                wpcomp.selectWebPart(zc, false);
        }
    }
    hid = document.getElementById("_wzSelected");
    if (hid != null)
    {
        var wzid = hid.value;
        if (wzid.length > 0)
        {
            wpcomp.selectWebPartZone(null, wzid);
        }
    }
};
function __RegisterWebPartPageCUI() {
ExecuteOrDelayUntilScriptLoaded(_RegisterWebPartPageCUI, "sp.ribbon.js");}
_spBodyOnLoadFunctionNames.push("__RegisterWebPartPageCUI");var __wpmExportWarning='This Web Part Page has been personalized. As a result, one or more Web Part properties may contain confidential information. Make sure the properties contain information that is safe for others to read. After exporting this Web Part, view properties in the Web Part description file (.WebPart) by using a text editor such as Microsoft Notepad.';var __wpmCloseProviderWarning='You are about to close this Web Part.  It is currently providing data to other Web Parts, and these connections will be deleted if this Web Part is closed.  To close this Web Part, click OK.  To keep this Web Part, click Cancel.';var __wpmDeleteWarning='You are about to permanently delete this Web Part.  Are you sure you want to do this?  To delete this Web Part, click OK.  To keep this Web Part, click Cancel.';var g_clientIdDeltaPlaceHolderMain = "DeltaPlaceHolderMain";
var g_clientIdDeltaPlaceHolderUtilityContent = "DeltaPlaceHolderUtilityContent";
//]]>
