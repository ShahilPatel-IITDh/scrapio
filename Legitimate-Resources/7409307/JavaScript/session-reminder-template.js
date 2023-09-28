
	<h2 class="popover-header">Session Reminder</h2>
	<p class="message">Hi there, this is just a gentle reminder to say that you've been playing for <%= getTotalTimePlayed() %></p>

    <div class="cta-wrapper">
        <a data-action="play" class="cta noHidePopover" href="#">Continue Playing</a>
        <a data-action="quit" class="noHidePopover" href="#">Stop Playing</a>
        <a data-action="activity" class="noHidePopover" href="#">View your activity statement</a>
    </div>
