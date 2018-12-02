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
     * @param {Int} interval The interval to run (in ms)
     * @param {Int} duration The amount of time that the interval will run for
     */
    constructor(onInterval, interval, duration) {
        this.onInterval = onInterval;
        this.duration = duration;
        this.interval = interval;
        this.remaining = duration;
        this.intervalId = 0;
    }

    resume() {
        // console.log(`play: remaining=${this.remaining}`);
        this.start = new Date();
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.onInterval, this.interval);
        this.timerId = setTimeout(() => clearInterval(this.intervalId), this.remaining);
    }

    pause() {
        // console.log('pause');
        clearInterval(this.intervalId);
        clearTimeout(this.timerId);
        this.remaining -= new Date() - this.start;
    }

}