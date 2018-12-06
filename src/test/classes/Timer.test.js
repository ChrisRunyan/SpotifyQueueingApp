import { Timer, TimeoutInterval } from '../../client/classes/Timer';

const testCallback = () => {

}

describe('Timer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    
    it('properly initializes the Timer', () => {
        const timer = new Timer(testCallback, 1000);
    })
    
    it('setsTimeout on first resume', () => {
        const timer = new Timer(testCallback, 1000);
        const id = timer.resume();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(testCallback, 1000);
    });
    
    it('cancelsTimeout after pause', () => {
        const timer = new Timer(testCallback, 1000);
        const id = timer.resume();
        timer.pause();
        expect(clearTimeout).toHaveBeenCalledTimes(2);
        expect(clearTimeout).toHaveBeenLastCalledWith(id);
    });
    
    it('waits until duration to run the function', () => {
        const cb = jest.fn();
        const timer = new Timer(cb, 3000);
        const id = timer.resume();
    
        expect(cb).not.toBeCalled();
    
        jest.runAllTimers();
    
        expect(cb).toHaveBeenCalledTimes(1);
    
    });
})

describe('TimeoutInterval', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    it('properly initializes a timer', () => {
        const timer = new TimeoutInterval(testCallback, 1000, 80);
    })

    it('returns 0 on resume after completion', () => {
        const cb = jest.fn();
        const timer = new TimeoutInterval(cb, 1000);
        let id = timer.resume();
        expect(id).not.toBe(0);
        jest.runAllTimers();
        id = timer.resume();
        expect(id).toBe(0);
    });

});

