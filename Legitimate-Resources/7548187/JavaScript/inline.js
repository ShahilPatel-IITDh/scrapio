
            const URL = {
                user_is_authenticated: "/user_is_authenticated/",
                city_profile_type: "/catalogo/city-logistic-type",
                load_cities: "/geography/cities-by-state/",
                lazyuser_edit: "/lazyusers/edit/",
                get_suppliers: "/dashboard/categories/api/all-distributors/"
            }

            var isLogged = "False"
            var isLazy = ""
            var CITY_ID = '';
            var PROFILE_TYPE = 'CNPJ';
            var GET_ALL_CATEGORIES_MENU = "/dashboard/categories/api/all-available-categories/";
            var MY_LIST_ADD_PRODUCT_ENDPOINT = "/my-list/add-product-to-favorite/";
            var MY_LIST_REMOVE_PRODUCT_ENDPOINT = "/my-list/list-product-delete-favorite";
            var GET_SKU_OFFERS = "/dashboard/sku/api/";
            var ADD_CART_ITEM_URL_SUPPLIER = "/quotation/quotation/add-product";
            var GET_BANNERS = "/dashboard/domains/home_banners";
            var USER_REGION = ' (CNPJ)';
            var verificouCEP = false
            var API_GATEWAY_BASE_URL = 'https://apis.cotabest.com.br';

            function createTag(document, tag, src){
                var scriptTag = document.createElement(tag);
                firstScriptTag = document.getElementsByTagName(tag)[0];
                scriptTag.src = src;
                firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
            };

            window.onload = function() {

                rerenderElementDOM("footer", `
                
                    <footer class="footer atacadao"">
                        <div class="pt-3">
                            <div class="container">
                                <nav class="nav">
                                    
                                        <a class="nav-link text-white pl-0" href="/authentication">Entre ou cadastre-se</a>
                                        <a class="nav-link text-white" href="/quero-vender/">Seja parceiro</a>
                                        <a class="nav-link text-white" href="/my-list/">Lista de compras</a>
                                        <a class="nav-link text-white" href="/catalogo/">Ofertas online</a>
                                    
                                    
                                        <a class="nav-link text-white" href="/mapa-do-site/">Mapa do site</a>
                                    
                                </nav>
                                <div class="pb-2 border-bottom border-primary"></div>
                            </div>
                        </div>
                        <div class="pt-5">
                            <div class="container ">
                                <div class="row">
                                    
                                        <div class="col-4">
                                            <p class="h4 font-weight-light pb-3">
                                                Categorias de produtos
                                            </p>
                                            <ul class="nav flex-column js-highlight-categories-footer">
                                            </ul>
                                        </div>
                                    
                                    <div class="col-4">
                                        
                                            <p class="h4 font-weight-light pb-3">Institucional Atacadão</p>
                                            <ul class="nav flex-column">
                                                <li class="nav-item">
                                                    
                                                        <a class="nav-link text-white px-0" href="/institucional/">Institucional</a>
                                                        <a class="nav-link text-white px-0" href="/quem-somos/">Quem somos</a>
                                                        <a class="nav-link text-white px-0" href="/lojas">Nossas lojas</a>
                                                        <a class="nav-link text-white px-0" href="/folhetos">Folhetos</a>
                                                        <a class="nav-link text-white px-0" href="/cartao-atacadao/">Cartão Atacadão</a>
                                                        <a class="nav-link text-white px-0" href="/trabalhe-conosco/">Trabalhe conosco</a>
                                                        <a class="nav-link text-white px-0" href="https://www.grupocarrefourbrasil.com.br/" target="_blank">Grupo Carrefour Brasil</a>
                                                        <a class="nav-link text-white px-0" href="https://conexaoeticacarrefour.com.br/" target="_blank">Conexão Ética</a>
                                                    
                                                </li>
                                            </ul>
                                        
                                        
                                            <p class="h4 font-weight-light pb-3 pt-5">Políticas</p>
                                            <ul class="nav flex-column">
                                                <li class="nav-item">
                                                    <a class="nav-link text-white px-0" href="/termos-de-uso/">Termos de uso</a>
                                                    <a class="nav-link text-white px-0" href="/politica-de-privacidade/">Política de privacidade</a>
                                                    <a class="nav-link text-white px-0" href="/politica-de-privacidade/#terms-cookies">Política de cookies</a>
                                                    
                                                    <a class="nav-link text-white px-0" href="https://ri.grupocarrefourbrasil.com.br/governanca-corporativa/estatutos-politicas-e-codigos/" target="_blank">Política Anticorrupção</a>
                                                    <a class="nav-link text-white px-0" href="https://static.cotabest.com.br/docs/Politica-de-Diversidade-2022-1.pdf" target="_blank">Política de Diversidade</a>
                                                    
                                                </li>
                                            </ul>
                                        
                                    </div>
                                    

                                    <div class="col-4">
                                        <p class="h4 font-weight-light pb-3">Contato</p>
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                
                                                    <a class="nav-link text-white px-0" href="/entre-em-contato/">Central de ajuda</a>
                                                    <a class="nav-link text-white px-0" href="/lojas">Fale com uma unidade</a>
                                                    <a class="nav-link text-white px-0" href="https://www.cartaoatacadao.com.br/fale-conosco" target="_blank">Fale com o cartão Atacadão</a>
                                                    <a class="nav-link text-white px-0" href="/entre-em-contato/">Fale com a loja online</a>
                                                    <a class="nav-link text-white px-0" href="/imprensa/">Imprensa</a>
                                                
                                            </li>
                                        </ul>
            
                                        <p class="h4 font-weight-light pb-3 pt-5">Acompanhe a gente nas redes sociais</p>
                                        <div class="py-4">
                                            <span class="pb-2 d-flex">
                                                
                                                    <a class="mr-3" href="https://www.facebook.com/Atacadaosa.Oficial" target="_blank">
                                                        <img class=" ico-social" src="https://static.cotabest.com.br/img/atacadao/social/facebook-footer_v2.svg" />
                                                    </a>
                                                    <a class="mr-3" href="https://www.instagram.com/atacadaosa.oficial" target="_blank">
                                                        <img class=" ico-social" src="https://static.cotabest.com.br/img/atacadao/social/instagram-footer_v2.svg" />
                                                    </a>
                                                    <a class="mr-3" href="https://www.youtube.com/atacadaoautosservico" target="_blank">
                                                        <img class=" ico-social" src="https://static.cotabest.com.br/img/atacadao/social/youtube-footer_v2.svg" />
                                                    </a>
                                                    <a class="mr-3" href="https://twitter.com/atacadao_sa" target="_blank">
                                                        <img class=" ico-social" src="https://static.cotabest.com.br/img/atacadao/social/twitter-footer_v2.svg" />
                                                    </a>
                                                    <a class="mr-3" href="https://www.linkedin.com/company/atacadao/about/" target="_blank">
                                                        <img class=" ico-social" src="https://static.cotabest.com.br/img/atacadao/social/linkedin-footer_v2.svg" />
                                                    </a>
                                                    <a class="mr-3" href="https://blog.atacadao.com.br/" target="_blank">
                                                        <img class=" ico-social"
                                                            src="https://static.cotabest.com.br/img/atacadao/social/blog-footer_v2_atacadao.svg" />
                                                    </a>                                        
                                                
                                            </span>
                                            
                                                <p class="pb-2 pt-4 text-justify">
                                                    Racismo é crime. Denuncie. Disque 100 ou procure a delegacia de polícia civil mais próxima ou o Ministério Público.
                                                </p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="pb-5 border-bottom border-primary"></div>
                            </div>
                        </div>
                        <div class="py-4">
                            <div class="container text-center  d-flex justify-content-lg-between align-items-center">
                                
                                <p class="m-0 font-weight-light pb-2">
                                    &copy; Copyright Atacadão 2022 | Todos os Direitos Reservados
                                </p>
                                <p class="m-0">
                                    <img src="https://static.cotabest.com.br/img/atacadao/brand/logo-atacadao.svg" alt="Logo Atacadão" />
                                    <a href="https://www.cotabest.com.br/institucional/" target="_blank"><img class="ml-3" src="https://static.cotabest.com.br/img/atacadao/brand/cotabest-solution.webp" alt="Logo cotabest" height=48 /></a>
                                </p>
                                
                            </div>
                        </div>
                        
                            <div class="py-4 bg-white">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-9">
                                            <p class="font-weight-ligh">
                                                Formas de pagamento para compras online
                                            </p>
                                            <p class="m-0">
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/amex.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/diners.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/discover.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/elo.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/hipercard.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/jcb.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/mastercard.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/visa.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/vr.webp" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/transfer.svg" />
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/boleto.png" />
                                                <a href="/cartao-atacadao/"  title="Cartão Atacadão">
                                                    <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/cardatc.png" />
                                                </a>
                                                <img class="footer__payment-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/payments/pix.svg" />
                                            </p>
                                        </div>
                                        <div class="col-3">
                                            <p class="font-weight-ligh mt-4">
                                                Sua compra segura
                                            </p>
                                            <p>
                                                <img class="footer__security-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/security/cloudflare.svg" />
                                                <img class="footer__security-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/security/rede.svg" />
                                                <img class="footer__security-icon mr-3 mb-3" src="https://static.cotabest.com.br/img/atacadao/security/mundipagg.svg" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </footer>
                
                            `);

                // Load full images
                const homeInstitutional = document.querySelector('.home--institutional');
                if (MARKETPLACE_NAME === 'atacadao') {
                    if (homeInstitutional?.style) {
                        // https://res.cloudinary.com/cotabest-prod/image/upload/f_jpg,fl_progressive,q_auto:low,w_${window?.innerWidth || 200}/v1642192699/atacadao/institutional-home.jpg
                        homeInstitutional.style.backgroundImage = `url(https://static.cotabest.com.br/img/atacadao/bg/institutional-home.webp)`;
    
                        if (window?.innerWidth > 576) {
                            // https://res.cloudinary.com/cotabest-prod/image/upload/f_jpg,fl_progressive,q_auto:low,w_${window?.innerWidth || 200}/v1642192699/atacadao/institutional-home-desk.jpg
                            homeInstitutional.style.backgroundImage = `url(https://static.cotabest.com.br/img/atacadao/bg/institutional-home-desk.webp)`;
                        }
                    }
                } else {
                    if (homeInstitutional?.style) {
                        // https://res.cloudinary.com/cotabest-prod/image/upload/f_jpg,fl_progressive,q_auto:low,w_${window?.innerWidth || 200}/v1642192699/cotabest/institutional-home.jpg
                        homeInstitutional.style.backgroundImage = `url(https://static.cotabest.com.br/img/cotabest/bg/institutional-home.jpg)`;
    
                        if (window?.innerWidth > 576) {
                            // https://res.cloudinary.com/cotabest-prod/image/upload/f_jpg,fl_progressive,q_auto:low,w_${window?.innerWidth || 200}/v1642192699/cotabest/institutional-home-desk.jpg
                            homeInstitutional.style.backgroundImage = `url(https://static.cotabest.com.br/img/cotabest/bg/institutional-home-desk.jpg)`;
                        }
                    }
                }
            };
        