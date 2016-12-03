// ----------------------------------------------------------------------
// this function keeps the log-box scrolled to the very bottom
// when new content is added
function updateLogBoxScroll(logBox) {
	logBox.scrollTop = logBox.scrollHeight;
}

// ----------------------------------------------------------------------
// clicker-function
// will be executed if .clicker will be clicked with any mouse key
function logClickEvent(event) {
	console.log(event.button);
	var counterElem;
	if (event.which == 1 || event.button == 0) {
		counterElem = document.getElementById('counter-left');
	} else if (event.which == 2 || event.button == 1) {
		counterElem = document.getElementById('counter-wheel');
	} else if (event.which == 3 || event.button == 2) {
		counterElem = document.getElementById('counter-right');
	} else {
		return false;
	}

	counterElem.innerHTML = String(parseInt(counterElem.innerHTML) + 1);
	var logText = '<p>' + '--------------------'
					+ '</br>which: ' + event.which
					+ '</br>button: ' + event.button
					+ '</p>';
	var loggerClick = document.getElementById('logger-click');
	loggerClick.innerHTML += logText;
	updateLogBoxScroll(loggerClick);
	return false;
}

// ----------------------------------------------------------------------
// onscroll function
// will be executed if .scroller will be scrolled
var scrollInner = document.getElementById('scroll-inner');
scrollInner.scrollTop = 1;

var oldScrollTopValue = 0;

scrollInner.onscroll = function() {
	console.log('scrolling begins.');

	// decide which direction was scrolled
	var scrollerWasResetted = false;
	var scrollDirection = "";
	if(oldScrollTopValue < scrollInner.scrollTop
		&& scrollInner.scrollTop !== 1) {
		scrollDirection = 'down';
		console.log('scrolled down.');
		oldScrollTopValue = scrollInner.scrollTop;
	} else if ((oldScrollTopValue > scrollInner.scrollTop)
					|| scrollInner.scrollTop == 1) {
		scrollDirection = 'up';
		console.log('scrolled up.');
		oldScrollTopValue = scrollInner.scrollTop;
	}

	// inrease the counter
	var scrollCounter = document.getElementById('counter-scroll');
	scrollCounter.innerHTML = String(parseInt(scrollCounter.innerHTML) + 1);
	console.log('scrollCounter increased by 1.');

	// achieve endless scrolling to top by resetting scrollTop position to 1
	// when ever the top (0) is reached
	if(scrollInner.scrollTop == 0) {
		scrollInner.scrollTop = 1;
		console.log('resetted scrollTop position form 0 to 1.');
		// counter will get -1 here because javascript scrolls when it sets
		// scrollTop value
		scrollCounter.innerHTML = String(parseInt(scrollCounter.innerHTML) - 1);
		console.log('removed 1 count from counter.');
		scrollerWasResetted = true;
	}

	// achieve endless scrolling to bottim by increasing the inner div height
	// on scroll
	var scrollerAction = document.getElementById('scroller-action');
	var scrollerActionHeight = window.getComputedStyle(
								scrollerAction).getPropertyValue('height');
	var scrollerActionHeightValue = parseInt(scrollerActionHeight.slice(0, -2));
	if(scrollerActionHeightValue == 201) {
		scrollCounter.innerHTML = 0;
		console.log('resetted counter to 0'
						+ 'because it was the initial scrolling.');

	}
	scrollerAction.style.height = (scrollerActionHeightValue + 1) + "px";
	console.log("New scrollerAction height: "
					+ (scrollerActionHeightValue + 1)
					+ "px");

	// log scroller to logger-scroll
	if(scrollerActionHeightValue !== 201 && !scrollerWasResetted) {
		var loggerScroll = document.getElementById('logger-scroll');
		var logText = '<p>' + '--------------------'
						+ '<br/>scrolled ' + scrollDirection + '.';
		loggerScroll.innerHTML += logText;
		updateLogBoxScroll(loggerScroll);
	}
}
