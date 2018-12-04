export class Timer {
	constructor(callback, delay) {
		this.callback = callback;
		this.delay = delay;
		this.remaining = delay;
		this.timerId = 0;
	}

	/**
	 * Start/resume the timer.  The timer will complete in as many milliseconds
	 * as was remaining when it was paused.
	 */
	resume() {
		this.start = new Date();
		clearTimeout(this.timerId);
		this.timerId = setTimeout(this.callback, this.remaining);
	}

	/**
	 * Pause the timer.  The timer will rememeber how much time remains.
	 */
	pause() {
		clearTimeout(this.timerId);
		this.remaining -= new Date() - this.start;
	}

	skip(ms) {
		clearTimeout(this.timerId);
		if (this.remaining - ms < 0) {
			this.callback();
		} else {
			this.timerId = setTimeout(this.callback, this.remaining - ms);
		}
	}
}

export class TimeoutInterval {
	/**
	 * Create an interval timer which is set to expire after a given amount of time.
	 * @param {Function} onInterval The function to be run on a given interval
	 * @param {Number} interval The interval to run (in ms)
	 * @param {Number} duration The amount of time that the interval will run for
	 * @param {Function} onTimeout The function to be run when the timer ends
	 */
	constructor(onInterval, interval, duration = 0, onTimeout = null) {
		this.onInterval = onInterval;
		this.onTimeout = onTimeout;
		this.duration = duration;
		this.interval = interval;
		this.remaining = duration;
        this.intervalId = 0;
        this.hasCompleted = false;
	}

	resume() {
        // console.log(`play: remaining=${this.remaining}`);
        if (!this.hasCompleted) {
            this.start = new Date();
            clearInterval(this.intervalId);
            this.intervalId = setInterval(this.onInterval, this.interval);
            this.timerId = setTimeout(() => {
                this.hasCompleted = true;
                clearInterval(this.intervalId);
                if (this.onTimeout) {
					this.onTimeout();
				}
            }, this.remaining);
        }
		
	}

	pause() {
		// console.log('pause');
		clearInterval(this.intervalId);
		clearTimeout(this.timerId);
		this.remaining -= new Date() - this.start;
	}
}
