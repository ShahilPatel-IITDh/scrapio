
    <div class="modal__inner" role="document">
      <span class="js-modal-begin visually-hidden">Modal start</span>
      <header class="modal__header js-modal-header">
        <h5 class="modal__title js-modal-title font-heading-4"></h5>
        <div class="modal__actions">
          <a class="btn modal__btn--download js-modal-btn-download" target="_blank" href="#">
            <span class="icon icon--16">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.084 8.296C5.498 4.754 8.442 2 12 2c3.557 0 6.501 2.754 6.915 6.296C21.788 8.731 24 11.28 24 14.346c0 3.372-2.673 6.116-5.959 6.116H5.958C2.672 20.462 0 17.718 0 14.346c0-3.067 2.212-5.615 5.084-6.05zm-3.238 6.165c0 2.354 1.844 4.154 4.112 4.154H18.04c2.268 0 4.113-1.8 4.113-4.153 0-2.354-1.845-4.154-4.113-4.154h-.503V9.154c0-2.926-2.716-5.308-5.538-5.308-2.823 0-5.538 2.382-5.538 5.308v1.154h-.504c-2.268 0-4.112 1.8-4.112 4.153z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.923 13.618v-6.08h-1.846v6.08L8.96 11.5l-1.305 1.305 3.692 3.693a.92.92 0 001.305 0l3.693-3.693-1.306-1.305-2.116 2.117z"/></svg>
            </span>
            <span class="visually-hidden">Download</span>
          </a>
          <button class="btn modal__btn--transcript js-modal-btn-transcript">
            <span class="icon icon--16">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 2.5C22 1.122 20.82 0 19.368 0H4.632C3.18 0 2 1.122 2 2.5v19C2 22.878 3.18 24 4.632 24h14.736C20.82 24 22 22.878 22 21.5v-19zM19.368 22c.29 0 .527-.224.527-.5v-19c0-.276-.237-.5-.527-.5H4.632a.515.515 0 00-.527.5v19c0 .276.237.5.527.5h14.736z"/><path d="M6.21 7.363c0-.451.354-.818.79-.818h9.228c.436 0 .79.367.79.818 0 .452-.354.819-.79.819H7c-.436 0-.79-.367-.79-.819zM6.21 11.728c0-.452.354-.819.79-.819h9.228c.436 0 .79.367.79.819 0 .451-.354.818-.79.818H7c-.436 0-.79-.367-.79-.818zM6.21 16.09c0-.451.354-.817.79-.817h9.228c.436 0 .79.366.79.818 0 .452-.354.818-.79.818H7c-.436 0-.79-.366-.79-.818z"/></svg>
            </span>
            <span class="visually-hidden">Show transcript</span>
          </button>
          <a class="skip-link--transcript visually-hidden focusable" href="#ModalAsideContent" title="Skip to transcript" tabindex="0">
            <span>Skip to transcript</span>
          </a>
          <button class="btn modal__btn--close js-modal-btn-close" id="modal-btn-close" data-event="site interaction">
            <span class="icon icon--16">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.532 4L12 10.532 5.467 4 4 5.468 10.531 12 4 18.532 5.467 20l6.532-6.531L18.532 20 20 18.532l-6.532-6.53L20 5.467 18.532 4z"/></svg>
            </span>
            <span class="visually-hidden">Close modal</span>
          </button>
        </div>
      </header>
      <div class="modal__content-wrap">
        <div class="modal__main" role="main">
          <button class="btn modal__btn--prev js-modal-btn-prev media__btn js-media-btn" type="button" aria-label="Previous slide">
            <span class="icon icon--16">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.56 10.566l.679-.714c.011-.013.028-.017.044-.03l8.766-9.23c.75-.79 1.964-.79 2.711 0l.68.712c.747.79.747 2.067 0 2.854l-7.45 7.843 7.45 7.84a2.098 2.098 0 010 2.857l-.68.71c-.747.79-1.961.79-2.71 0l-8.767-9.227c-.014-.014-.033-.018-.044-.033l-.68-.712A2.068 2.068 0 015 12.001c-.002-.52.184-1.04.56-1.435z"/></svg>
            </span>
          </button>
          <div class="modal__content js-modal-content"></div>
          <button class="btn modal__btn--next js-modal-btn-next media__btn js-media-btn" type="button" aria-label="Next slide">
            <span class="icon icon--16">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M18.44 10.566l-.679-.714c-.011-.013-.028-.017-.044-.03L8.951.591a1.848 1.848 0 00-2.711 0l-.68.712a2.096 2.096 0 000 2.854l7.45 7.843-7.45 7.84a2.098 2.098 0 000 2.857l.68.71c.747.79 1.961.79 2.71 0l8.767-9.227c.014-.014.033-.018.044-.033l.68-.712c.375-.396.56-.916.559-1.435a2.065 2.065 0 00-.56-1.435z"/></svg>

            </span>
          </button>
        </div>
        <div class="modal__aside js-modal-aside bg-color--shell" role="complementary" id="ModalAsideContent"></div>
      </div>
      <span class="visually-hidden">Modal end</span>
    </div>
  