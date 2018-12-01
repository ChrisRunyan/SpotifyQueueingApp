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
        this.remaining = new Date() - this.start;
    }
}

export class TimeoutInterval {
    constructor(callback, interval, duration) {
        this.callback = callback;
        this.duration = duration;
        this.interval = interval;
        this.remaining = duration;
        this.intervalId = 0;
    }

    resume() {
        this.start = new Date();
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.callback, this.interval);
        this.timerId = setTimeout(() => clearInterval(this.intervalId), this.remaining);
    }

    pause() {
        clearInterval(this.intervalId);
        clearTimeout(this.timerId);
        this.remaining = new Date() - this.start;
    }

}