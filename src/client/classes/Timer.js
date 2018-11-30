export default class Timer {
    constructor(callback, delay) {
        this.callback = callback;
        this.delay = delay;
        this.remaining = delay;
        this.timerId = 0;
    }

    /**
     * Start the timer.  If this isn't called, then the callback will never run.
     * This function is an alias for resume().
     */
    start() {
        this.resume();
    }

    /**
     * Restart the timer.  The timer will complete in as many milliseconds
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