
    <div id="SpeedBumpModal" class="modal external-site-modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-content__inner">
                    <div class="modal-media">
                        <svg focusable="false" role="presentation" aria-hidden="true">
                            <use xlink:href="/ResourcePackages/Bootstrap4Affinity/assets/dist/sprites/primaries.svg#popout"></use>
                        </svg>
                    </div>
                    <div class="modal-body">
                        <h2 class="external-site-modal__title">You're going to a different website.</h2>
                        {{Disclaimer}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="neutral_button external-site-modal__action external-site-modal__action--cancel" data-dismiss="modal">{{CancelText}}</button>
                    <a href="{{Url}}" class="default_button external-site-modal__action external-site-modal__action--continue" target="_blank" aria-label="{{ContinueText}} {{Url}}">
                        {{ContinueText}}
                        <svg focusable="false" role="presentation" aria-hidden="true" width="24px" height="26px">
                            <use xlink:href="/ResourcePackages/Bootstrap4Affinity/assets/dist/sprites/primaries.svg#arrowright"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
