
var cmMenuBar1 =
{
   mainFolderLeft: '',
   mainFolderRight: '',
   mainItemLeft: '',
   mainItemRight: '',
   folderLeft: '',
   folderRight: '<div style="width:16px;height:16px" class="MenuBar1SpacerDiv" />',
   itemLeft: '',
   itemRight: '<div style="width:16px;height:16px" class="MenuBar1SpacerDiv" />',
   mainSpacing: 0,
   subSpacing: 0,
   delay: 100,
   offsetHMainAdjust: [0, 0],
   offsetSubAdjust: [0, 0]
};
var cmMenuBar1HSplit = [_cmNoClick, '<td class="MenuBar1MenuSplitLeft"><div></div></td>' +
                                       '<td class="MenuBar1MenuSplitText"><div></div></td>' +
                                       '<td class="MenuBar1MenuSplitRight"><div></div></td>'];
var cmMenuBar1MainVSplit = [_cmNoClick, '<div><table width="17" cellspacing="0"><tr><td class="MenuBar1HorizontalSplit">|</td></tr></table></div>'];
var cmMenuBar1MainHSplit = [_cmNoClick, '<td colspan="3" class="MenuBar1MainSplitText"><div></div></td>'];
cmDrawFromText('MenuBar1', 'hbr', cmMenuBar1, 'MenuBar1');
