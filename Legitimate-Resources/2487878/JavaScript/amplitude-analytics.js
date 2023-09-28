/**
* File: amplitude-analytics.js
*
* Amplitude Analytics.
* @since 1.0.0
* @author Care.com <www.care.com>
*/
( function( window, document ) {
    'use strict';

    // Make sure everything is loaded first.
    if (
        ( 'complete' === document.readyState || 'loading' !== document.readyState ) &&
        ! document.documentElement.doScroll
    ) {
        amplitudeAnalyticsInit();
    } else {
        document.addEventListener( 'DOMContentLoaded', amplitudeAnalyticsInit );
    }

    function getCookie( cname ) {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent( document.cookie );
        const ca = decodedCookie.split( ';' );
        for ( let i = 0; i < ca.length; i++ ) {
            let c = ca[ i ];
            while ( ' ' == c.charAt( 0 ) ) {
                c = c.substring( 1 );
            }
            if ( 0 == c.indexOf( name ) ) {
                return c.substring( name.length, c.length );
            }
        }
        return '';
    }

    const amplitudeSettings = window.amplitude_analytics_params;

    const apiKey    = amplitudeSettings && amplitudeSettings.api_key;
	const isEnabled = !! apiKey;

    window.amplitudeSDK = {

        /**
         * @var bool Does enabled Amplitude events.
         */
        isEnabled: !!isEnabled,

        /**
         * Get Amplitude object.
         *
         * @return {Amplitude} Amplitude object.
         */
        getAmplitude() {
            return window.amplitude;
        },

        /**
         * Get Amplitude instance.
         *
         * @return {*} Amplitude instance.
         */
        getAmplitudeInstance() {
            return this.getAmplitude().getInstance();
        },

        /**
         * Initializes the Amplitude Javascript SDK with your apiKey and any optional configurations.
         * This is required before any other methods can be called.
         *
         * @param {string} apiKey - The API key for your app.
         * @param {string} opt_userId - (optional) An identifier for this user.
         * @param {object} opt_config - (optional) Configuration options.
         * See [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js#L14) for list of options and default values.
         * @param {function} opt_callback - (optional) Provide a callback function to run after initialization is complete.
         */
        init( apiKey, opt_userId, opt_config, opt_callback ) {
            return this.getAmplitudeInstance().init( apiKey, opt_userId, opt_config, opt_callback );
        },

        /**
         * Log an event with eventType and eventProperties.
         *
         * @param {string} eventType Name of event
         * @param {object} [eventProperties] An object with string keys and values for the event properties.
         * @param {Amplitude~eventCallback} [opt_callback] A callback function to run after the event is logged.
         */
        logEvent( eventType, eventProperties, opt_callback ) {
            if ( this.isEnabled ) {
                const commonProps = {
                    url : amplitudeSettings.url,
                    url_path : window.location.pathname,
                    screen_name : amplitudeSettings.platform,
                    web_platform : isMobile() ? 'Mobile Web' : 'Desktop',
                    environment : amplitudeSettings.environment,
                }

                return this.getAmplitudeInstance().logEvent( eventType, Object.assign({}, commonProps, eventProperties), opt_callback );
            }
        }
    };

	if ( ! apiKey ) {
		window.console.error( 'Error: `window.amplitude_analytics_params` not defined or missing some options.' );

		return;
	}

    /**
     * Get & set some defaults.
     */
    function amplitudeAnalyticsInit() {
        connectToAmplitude();

        window.amplitudeSDK.init( apiKey, amplitudeSettings.member_id );

        const urlParams       = new URLSearchParams( window.location.search );
        const related_content = urlParams.get( 'related_content' );
        const guideHeader     = document.querySelector( 'h3.care-guides-sidebar-nav-header a' );

        const eventPropsCommon = {
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
            page_type: landing_page_params.member_type,
        }

        const eventProps = {
            article_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
            slug: amplitudeSettings.post && amplitudeSettings.post.post_name,
            article_id: amplitudeSettings.post && amplitudeSettings.post.ID,
            persona_type: amplitudeSettings.member_type,
            vertical: amplitudeSettings.vertical,
            author: amplitudeSettings.post && amplitudeSettings.post.post_author,
            date_published: amplitudeSettings.post && amplitudeSettings.post.post_date,
            date_updated: amplitudeSettings.post && amplitudeSettings.post.post_modified,
            comments: amplitudeSettings.post && amplitudeSettings.post.comments_count || 0,
            category_name: amplitudeSettings.post_category && amplitudeSettings.post_category[0] && amplitudeSettings.post_category[0].name,
            event_type: 'Article Viewed',
            guide_name: guideHeader ? guideHeader.textContent : '',
        };

        const eventPropsLanding = {
            screen_name: 'Resources',
            landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
            landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
            page_vertical: landing_page_params.vertical,
            origin: window.location.pathname.split( 'landing-page' )[0] + 'vertical/' + landing_page_params.vertical,
            event_type: 'Landing Viewed',
            ...eventPropsCommon,
        };

        const eventPropsVertical = {
            screen_name: 'Resources',
            vertical_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
            vertical_id: amplitudeSettings.post && amplitudeSettings.post.ID,
            slug: amplitudeSettings.post && amplitudeSettings.post.post_name,
            persona_type: amplitudeSettings.member_type,
            page_vertical: landing_page_params.vertical,
            category_name: 'Uncategorized',
            event_type: 'Vertical Viewed',
        };

        const eventPropsError = {
            event_type: 'Error Viewed',
        };

        const eventPropsSearch = {
            url: window.location.href,
            event_type: 'Search Viewed',
        };

        // Topic clicked on vertical page.
        if ( window.location.pathname.includes( '/vertical/' ) ) {
            const topicLinks = document.querySelectorAll( '.sidebar.widget-area a' );
            topicLinks.forEach( function( topicLink ) {
                topicLink.addEventListener( 'click', function( e ) {
                    sessionStorage.setItem( 'Topic', e.target.text );
                } );
            } );
        };

        if( sessionStorage.getItem( 'Topic' ) !== null ) {
            const eventPropsTopic = {
                screen_name: 'Resources',
                origin: document.referrer,
                topic_text: sessionStorage.getItem( 'Topic' ),
                event_type : 'Topic Clicked',
                ...eventPropsCommon,
            };
            window.amplitudeSDK.logEvent( 'Topic Clicked', eventPropsTopic );
            sessionStorage.removeItem( 'Topic' );
        };

        // Article clicked on landing page.
        if ( ( amplitudeSettings.post && amplitudeSettings.post.post_type === 'landing-page' ) || landing_page_params.is_front_page === '1' ) {

            const articleLinks = document.querySelectorAll( '.related-post a' );
            const featuredStories = document.querySelectorAll( '.content-card a' );

            articleLinks.forEach( function( articleLink ) {
                articleLink.addEventListener( 'click', function( e ) {
                    // Save the name of the block/section in sessionStorage.
                    if( e.target.closest( 'section' ).closest( 'div' ).querySelector( 'h3' ) ) {
                        sessionStorage.setItem( 'Section', e.target.closest( 'section' ).closest( 'div' ).querySelector( 'h3' ).innerHTML );
                    } else {
                        const articleSection = e.target.closest( 'section' ).closest( 'div' ).querySelector( 'h2' );
                        if( articleSection.classList.contains( 'post-title' ) ) {
                            sessionStorage.setItem( 'Section', 'Featured Post' );
                        } else {
                          sessionStorage.setItem( 'Section', articleSection.innerHTML );
                        }
                    }
                } );
            } );

            featuredStories.forEach( function( featuredStory ) {
                featuredStory.addEventListener( 'click', function( e ) {
                    // Save the name of the block/section in sessionStorage.
                    sessionStorage.setItem( 'Section', e.target.closest( 'section' ).closest( 'div' ).querySelector( 'h2' ).innerHTML );
                } );
            } );

        }

        if( sessionStorage.getItem( 'Section' ) !== null ) {
            const eventPropsArticle = {
                screen_name: 'Resources',
                origin: sessionStorage.getItem( 'Section' ),
                event_type : 'Article Clicked',
                ...eventPropsCommon,
            };
            window.amplitudeSDK.logEvent( 'Article Clicked', eventPropsArticle );
            sessionStorage.removeItem( 'Section' );
        };

        if( amplitudeSettings.post ) {

            if ( amplitudeSettings.post.post_type === 'post' && !window.location.pathname.includes( '/vertical/' ) && !document.body.classList.contains( 'search-results' ) ) {

                if ( related_content ) {
                    const post_url = new URL(related_content);
                    let origin = '';
                    if ( document.referrer.includes( '/vertical/' ) ) {
                        const refURL = new URL(document.referrer);
                        origin = refURL.pathname;
                    } else {
                        origin = 'Related Content';
                    }
                    const eventPropsExtended = {
                        origin,
                        url: post_url.href,
                        url_path: post_url.pathname,
                        event_type : 'Article Clicked',
                        ...( document.referrer.includes( '/vertical/' ) && eventPropsCommon)

                    };
                    window.amplitudeSDK.logEvent( 'Article Clicked', eventPropsExtended );
                }
                window.amplitudeSDK.logEvent( 'Article Viewed', eventProps );
                if( document.referrer.includes( '?s=' ) ) {
                    const eventPropsSearchArticle = {
                        screen_name: 'Search Results',
                        origin: document.referrer,
                        member_type: amplitudeSettings.member_type,
                        member_vertical: amplitudeSettings.vertical,
                        page_type: landing_page_params.member_type,
                        event_type: 'Article Clicked',
                    }
                    window.amplitudeSDK.logEvent( 'Article Clicked', eventPropsSearchArticle );
                }
            }

            if ( amplitudeSettings.post.post_type === 'landing-page' || landing_page_params.is_front_page === '1' ) {

                window.amplitudeSDK.logEvent( 'Landing Viewed', eventPropsLanding );

            }

            if ( window.location.pathname.includes( '/vertical/' ) ) {

                window.amplitudeSDK.logEvent( 'Vertical Viewed', eventPropsVertical );

            }
        }

        if ( document.body.classList.contains( 'error404' ) ) {

            window.amplitudeSDK.logEvent( 'Error Viewed', eventPropsError );

        }

        if ( document.body.classList.contains( 'search-results' ) ) {

            window.amplitudeSDK.logEvent( 'Search Viewed', eventPropsSearch );

        }

        // Sticky header.
        const cscCookieStickyHeader = getCookie( 'csc' ) ?? null;
        const commonPropsStickyHeader = {
            job_flow: 'Content Sticky Header - Seeker',
            czen_session_id: cscCookieStickyHeader,
            visitor_id: cscCookieStickyHeader,
            vertical: window.amplitude_analytics_params && window.amplitude_analytics_params.vertical,
        };

        window.addEventListener( 'stickyHeader', () => {

            // Only fire Test Exposure event on 'Resources' site.
            if( 'Resources' === window.amplitude_analytics_params.platform ) {
                window.amplitudeSDK.logEvent( 'Test Exposure', {
                    ...commonPropsStickyHeader,
                    test_name: 'growth-content-seeker-sticky-header',
                    test_variant: parseInt( ( window.sticky_header_params && window.sticky_header_params.variant ) || 0, 10 ),
                } );
            }

            window.addEventListener( 'stickyHeaderShown', () => {
                window.amplitudeSDK.logEvent( 'Screen Viewed', {
                    ...commonPropsStickyHeader,
                    referrer: amplitudeSettings.post && amplitudeSettings.post.post_title,
                } );
            }, { once: true } );

            const stickHeaderCTA = document.querySelector( '#vb-sticky-header-button' );
            if( stickHeaderCTA ) {
                stickHeaderCTA.addEventListener( 'click', () => {
                    window.amplitudeSDK.logEvent( 'CTA_Interacted', {
                        ...commonPropsStickyHeader,
                        cta_clicked: 'Find care',
                    } );
                } );
            }
        }, { once: true } );

        // Enrollment modal viewed.
        const cscCookieModal = getCookie( 'csc' ) ?? null;
        const commonPropsModal = {
            screen_name: 'Resources',
            job_flow: 'Content Overlay - Seeker',
            czen_session_id: cscCookieModal,
            visitor_id: cscCookieModal,
            vertical: window.amplitude_analytics_params && window.amplitude_analytics_params.vertical,
        };

        window.addEventListener( 'modalScreen1Viewed', () => {
            window.amplitudeSDK.logEvent( 'Screen Viewed', {
                ...commonPropsModal,
                overlay_step: '1',
                referrer: amplitudeSettings.post && amplitudeSettings.post.post_title,
            } );
        }, { once: true } );

        window.addEventListener( 'modalScreen2Viewed', () => {
            window.amplitudeSDK.logEvent( 'CTA_Interacted', {
                ...commonPropsModal,
                overlay_step: '1',
                cta_clicked: 'Next',
            } );
            window.amplitudeSDK.logEvent( 'Screen Viewed', {
                ...commonPropsModal,
                overlay_step: '2',
                referrer: amplitudeSettings.post && amplitudeSettings.post.post_title,
            } );
        }, { once: true } );

        window.addEventListener( 'enrollmentModalComplete', () => {
            window.amplitudeSDK.logEvent( 'CTA_Interacted', {
                ...commonPropsModal,
                overlay_step: '2',
                cta_clicked: 'Join now',
            } );
            window.amplitudeSDK.logEvent( 'Screen Viewed', {
                ...commonPropsModal,
                overlay_step: '3',
                referrer: amplitudeSettings.post && amplitudeSettings.post.post_title,
            } );
        }, { once: true } );

        // Screen 3 CTA clicked.
        const enrollmentModalCTA = document.querySelector( '#enrollment-modal-cta' );
        if( enrollmentModalCTA ) {
            enrollmentModalCTA.addEventListener( 'click', () => {
                window.amplitudeSDK.logEvent( 'CTA_Interacted', {
                    ...commonPropsModal,
                    overlay_step: '3',
                    cta_clicked: 'Start now',
                } );
            } );
        }

        // "Continue reading" clicked.
        const enrollmentModalContinue = document.querySelector( '#enrollment-modal-enrolled-continue' );
        if( enrollmentModalContinue ) {
            enrollmentModalContinue.addEventListener( 'click', () => {
                window.amplitudeSDK.logEvent( 'CTA_Interacted', {
                    ...commonPropsModal,
                    overlay_step: '3',
                    cta_clicked: 'Continue reading article',
                } );
            } );
        }

        // Enrollment modal closed.
        window.addEventListener( 'modalClosed', ( e ) => {
            window.amplitudeSDK.logEvent( 'Modal Closed', {
                ...commonPropsModal,
                overlay_step: e.step,
            } );
        }, { once: true } );

		// Safety pages - Landing Viewed.
		if( window.location.pathname.includes( '/about/safety' ) ) {
			window.amplitudeSDK.logEvent( 'Landing Viewed', {
				screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				event_type: 'Landing Viewed',
				...eventPropsCommon,
			} );
		}

		// Sticky modal on Safety pages - Screen Viewed.
		window.addEventListener( 'safetyModalShown', () => {
			window.amplitudeSDK.logEvent( 'Screen Viewed', {
				screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				event_type: 'Screen Viewed',
				job_flow: "Safety Toaster",
				...eventPropsCommon,
			} );
		}, { once: true } );

		// Sticky modal on Safety pages - CTA Clicked.
		window.addEventListener( 'safetyModalCTA', () => {
			window.amplitudeSDK.logEvent( 'CTA Clicked', {
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				czen_session_id: cscCookieModal,
            	visitor_id: cscCookieModal,
				cta_clicked: "Join Now",
				job_flow: "Safety Toaster",
				event_type: 'CTA Interacted',
				...eventPropsCommon,
			} );
		}, { once: true } );

        // Enrollment block - Screen Viewed.
        const enrollmentBlock = document.querySelector( '.wp-block-careblocks-enrollment' );
        const loggedIn        = window.landing_page_params ? window.landing_page_params.is_logged_in : null;
        const wpEnroll        = getCookie( 'WP_Enroll' );

        // Log Screen Viewed event if block exists, user is not logged in and WP_Enroll cookie is not set.
        if( enrollmentBlock && ! loggedIn && ! wpEnroll ) {
            window.amplitudeSDK.logEvent( 'Screen Viewed', {
                screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
                event_type: 'Screen Viewed',
				job_flow: 'Enroll Inline Block',
                block_step: '1',
				...eventPropsCommon,
			} );
    }

    // Enrollment block - CTA Clicked.
    const cscCookieEnrollmentBlock = getCookie( 'csc' ) ?? null;
		window.addEventListener( 'enrollmentBlockButtonClicked', () => {
			window.amplitudeSDK.logEvent( 'CTA Interacted', {
                screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				czen_session_id: cscCookieEnrollmentBlock,
            	visitor_id: cscCookieEnrollmentBlock,
                event_type: 'CTA Interacted',
				cta_clicked: 'Join Now',
				job_flow: 'Enroll Inline Block',
                block_step: '1',
				...eventPropsCommon,
			} );
		} );

    // Enrollment block - Member Enrolled.
    window.addEventListener( 'enrollmentBlockComplete', ( e ) => {
			window.amplitudeSDK.logEvent( 'Member Enrolled', {
                screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				czen_session_id: cscCookieEnrollmentBlock,
            	visitor_id: cscCookieEnrollmentBlock,
                vertical: window.amplitude_analytics_params && window.amplitude_analytics_params.vertical,
                event_type: 'Member Enrolled',
                job_flow: 'Enroll Inline Block',
                enrollmentStep: 'SingleEnrollment',
                enrollment_flow: 'SingleEnrollment',
                final_step: 'true',
                zip: e.zip,
				...eventPropsCommon,
			} );
		} );

    // Enrollment block - Screen Viewed (block step 2).
		window.addEventListener( 'enrollmentBlockComplete', () => {
			window.amplitudeSDK.logEvent( 'Screen Viewed', {
                screen_name: 'Resources',
				landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
				landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
				origin: document.referrer,
				czen_session_id: cscCookieEnrollmentBlock,
            	visitor_id: cscCookieEnrollmentBlock,
                vertical: window.amplitude_analytics_params && window.amplitude_analytics_params.vertical,
				event_type: 'Screen Viewed',
                job_flow: 'Enroll Inline Block',
                block_step: '2',
				...eventPropsCommon,
			} );
		} );

    // Enrollment block - CTA Interacted (block step 2).
    window.addEventListener( 'enrollmentBlockCTAClicked', () => {
        window.amplitudeSDK.logEvent( 'CTA Interacted', {
            screen_name: 'Resources',
            landing_page_name: amplitudeSettings.post && amplitudeSettings.post.post_title,
            landing_page_id: amplitudeSettings.post && amplitudeSettings.post.ID,
            origin: document.referrer,
            czen_session_id: cscCookieEnrollmentBlock,
            visitor_id: cscCookieEnrollmentBlock,
            vertical: window.amplitude_analytics_params && window.amplitude_analytics_params.vertical,
            event_type: 'CTA Interacted',
            cta_clicked: 'Find Care Now',
            job_flow: 'Enroll Inline Block',
            block_step: '2',
            ...eventPropsCommon,
        } );
    } );

    // Guide pages - Guides Homepage Viewed.
    const cscCookie = getCookie( 'csc' ) ?? null;
    if( 'guides' === landing_page_params.post_slug ) {
        window.amplitudeSDK.logEvent( 'Guides Homepage Viewed', {
            screen_name: 'Resources',
            slug: landing_page_params.post_slug,
            date_published: amplitudeSettings.post && amplitudeSettings.post.post_date,
            date_updated: amplitudeSettings.post && amplitudeSettings.post.post_modified,
            origin: document.referrer,
            czen_session_id: cscCookie,
            visitor_id: cscCookie,
            event_type: 'Guides Homepage Viewed',
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
            page_type: amplitudeSettings.member_type,
        } );
    }

    // Guide pages - Guide link clicked.
    if( 'guides' === landing_page_params.post_slug ) {
        const guideLinks = document.querySelectorAll( '.guide-list-links a' );
        guideLinks.forEach( function( guideLink ) {
            guideLink.addEventListener( 'click', function( e ) {
                sessionStorage.setItem( 'Guide', e.target.text );
            } );
        } );
    };

    if( sessionStorage.getItem( 'Guide' ) !== null ) {
        const eventPropsTopic = {
            screen_name: 'Resources',
            origin: document.referrer,
            cta_clicked: sessionStorage.getItem( 'Guide' ),
            event_type : 'Guide Clicked',
            czen_session_id: cscCookie,
            visitor_id: cscCookie,
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
        };
        window.amplitudeSDK.logEvent( 'Guide Clicked', eventPropsTopic );
        sessionStorage.removeItem( 'Guide' );
    };

    // Guide pages - Table of Contents link clicked.
    const guideTOCLinks = document.querySelectorAll( '.care-guide-sidebar-nav-container a' );
    guideTOCLinks.forEach( function( guideTOCLink ) {
        guideTOCLink.addEventListener( 'click', function( e ) {
            sessionStorage.setItem( 'Guide TOC Link', e.target.text );
        } );
    } );

    if( sessionStorage.getItem( 'Guide TOC Link' ) !== null ) {
        const eventPropsTOCClicked = {
            screen_name: 'Resources',
            origin: document.referrer,
            cta_clicked: sessionStorage.getItem( 'Guide TOC Link' ),
            event_type : 'Guide TOC Linked Clicked',
            czen_session_id: cscCookie,
            visitor_id: cscCookie,
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
        };
        window.amplitudeSDK.logEvent( 'Guide TOC Link Clicked', eventPropsTOCClicked );
        sessionStorage.removeItem( 'Guide TOC Link' );
    };

    // Guide pages - Article link clicked.
    if( 'guides' === landing_page_params.post_type ) {
        const guideArticleLinks = document.querySelectorAll( '.guide-chapter a' );
        guideArticleLinks.forEach( function( guideArticleLink ) {
            guideArticleLink.addEventListener( 'click', function( e ) {
                sessionStorage.setItem( 'Guide Article', e.target.text );
            } );
        } );
    };

    if( sessionStorage.getItem( 'Guide Article' ) !== null ) {
        const eventPropsGuideArticle = {
            screen_name: 'Resources',
            origin: document.referrer,
            cta_clicked: sessionStorage.getItem( 'Guide Article' ),
            event_type : 'Guide Article Clicked',
            czen_session_id: cscCookie,
            visitor_id: cscCookie,
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
        };
        window.amplitudeSDK.logEvent( 'Guide Article Clicked', eventPropsGuideArticle );
        sessionStorage.removeItem( 'Guide Article' );
    };

    // Guide pages - Guide Viewed.
    if( 'guides' === landing_page_params.post_type ) {
        window.amplitudeSDK.logEvent( 'Guide Viewed', {
            screen_name: 'Resources',
            event_type: 'Guide Viewed',
            slug: landing_page_params.post_slug,
            guide_name: landing_page_params.post_title,
            origin: document.referrer,
            page_vertical: landing_page_params.vertical,
            member_vertical: amplitudeSettings.vertical,
            member_type: amplitudeSettings.member_type,
            czen_session_id: cscCookie,
            visitor_id: cscCookie,
        } );
    }

	// SEO Menu event handlers.
	window.addEventListener( 'Extended_Menu_Interacted_One', function( event ) {
		// Event that fires when this menu is opened or closed.

		const ExtendedMenuInteracted = {
			czen_session_id: cscCookie,
			visitor_id: cscCookie,
			cta_clicked: 'Internal linking menu',
			cta_location: 'Resources header',
			label: event.detail.isMenuOpen ? 'SEO mega menu button click (opened)' : 'SEO mega menu button click (closed)',
			isMenuOpen: event.detail.isMenuOpen,
			viewport_resolution: `${window.innerWidth}x${window.innerHeight}`,
			screen_resolution: `${screen.width}x${screen.height}`,
			referrer: document.referrer,
			event_type : 'CTA Interacted',
			page_vertical: landing_page_params.vertical,
			...eventPropsCommon
		};

		window.amplitudeSDK.logEvent( 'CTA Interacted', ExtendedMenuInteracted );
	} );

	window.addEventListener( 'Extended_Menu_Interacted_Two', function( event ) {
		// Event that fires whenever a Level 2 link is clicked.

		const ExtendedMenuInteracted = {
			anchor_text: event.detail.anchorText,
			root_menu: event.detail.rootMenu,
			event_type : 'SEO Menu',
			visitor_id: cscCookie,
			czen_session_id: cscCookie,
			page_vertical: landing_page_params.vertical,
			cta_clicked: 'Internal linking menu',
			cta_location: 'Resources header',
			label: `SEO mega menu link click: ${event.detail.rootMenu} > ${event.detail.anchorText}`,
			submenu: event.detail.rootMenu,
			...eventPropsCommon
		};

		window.amplitudeSDK.logEvent( 'CTA Interacted', ExtendedMenuInteracted );
	} );

	}

    /**
     * Check the Useragent string to determine if device is a mobile.
     *
     * @since June 27, 2021
     * @author Care.com
     */
    function isMobile() {

        // Adapted from: http://detectmobilebrowsers.com/
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                ua
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                ua.substr(0, 4)
            )
        ) {
            return true;
        }
    }

    /**
     * Registers and init amplitude SDK.
     *
     * @author Denys Chesanovskyi <denys.chesanovskyi@care.com>
     * @since 1.0.0
     */
    function connectToAmplitude() {
        (function(e, t) {
            var n = e.amplitude || {
                _q: [],
                _iq: {}
            };
            var r = t.createElement("script");
            r.type = "text/javascript";
            r.integrity = "sha384-u0hlTAJ1tNefeBKwiBNwB4CkHZ1ck4ajx/pKmwWtc+IufKJiCQZ+WjJIi+7C6Ntm";
            r.crossOrigin = "anonymous";
            r.async = true;
            r.src = "https://cdn.amplitude.com/libs/amplitude-8.1.0-min.gz.js";
            r.onload = function() {
                if (!e.amplitude.runQueuedFunctions) {
                    console.log("[Amplitude] Error: could not load SDK")
                }
            };
            var i = t.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(r, i);

            function s(e, t) {
                e.prototype[t] = function() {
                    this._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
                    return this
                }
            }
            var o = function() {
                this._q = [];
                return this
            };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset", "preInsert", "postInsert", "remove"];
            for (var c = 0; c < a.length; c++) {
                s(o, a[c])
            }
            n.Identify = o;
            var u = function() {
                this._q = [];
                return this
            };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) {
                s(u, l[p])
            }
            n.Revenue = u;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];

            function v(e) {
                function t(t) {
                    e[t] = function() {
                        e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
                    }
                }
                for (var n = 0; n < d.length; n++) {
                    t(d[n])
                }
            }
            v(n);
            n.getInstance = function(e) {
                e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase();
                if (!Object.prototype.hasOwnProperty.call(n._iq, e)) {
                    n._iq[e] = {
                        _q: []
                    };
                    v(n._iq[e])
                }
                return n._iq[e]
            };
            e.amplitude = n
        })(window, document);
    }

} ( window, document ) );
