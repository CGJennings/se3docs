/**
 * # threads library
 * 
 * Support for multithreaded scripting. Threads allow you to call
 * multiple functions simultaneously, for example, to perform a
 * complex calculation in the background.
 * 
 * **Important:** Any calls into Strange Eons APIs from a thread
 * *must* be made on the *event dispatch thread*. This can be
 * done using [[invokeLater]] and [[invokeAndWait]].
 * 
 * Include this library by adding `useLibrary("threads")` to your script.
 * See the plug-in authoring kit for examples that use this library.
 */
declare module threads {
    class Thread {
        /**
         * Creates a new thread that will execute the specified function
         * in parallel.
         * 
         * @param name an optional name for the thread
         * @param functionToRun the function to be called by the thread
         */
        constructor(name: string, functionToRun: CallableFunction);

        /**
         * Creates a new thread that will execute the specified function
         * in parallel.
         * 
         * @param functionToRun the function to be called by the thread
         */
        constructor(functionToRun: CallableFunction);

        /**
         * Starts executing the thread in parallel. A new operating system
         * thread is created, and then the supplied function will be called from
         * that thread.
         * 
         * Note that a thread can only be started once. To run the same
         * function multiple times in parallel, you must create a new
         * thread for each run.
         */
        start(): void;

        /**
         * Returns whether the thread is still alive.
         * @returns true if the thread has been started but has not finished
         */
        get alive(): boolean;

        /**
         * Returns the name of the thread, if any. IF the thread was not
         * assigned a name at construction, it is given a default name.
         * @returns the thread name
         */
        get name(): string;

        /**
         * Returns true if this thread has finished and did not end by
         * throwing an uncaught exception.
         * @returns whether this thread's function returned normally
         */
        get hasReturnValue(): boolean;

        /**
         * Returns the value returned by the function passed to the
         * thread's constructor. A function that returns no value
         * implicitly returns undefined. If the function has not
         * yet finished, this method returns null. If the function
         * threw an uncaught exception, then calling this method
         * will immediately throw that exception.
         */
        get returnValue(): boolean;

        /**
         * Sets the thread's *interrupted* flag.
         */
        interrupt(): void;

        /**
         * When called from any thread, returns true if that thread's
         * *interrupted* flag has been set, then clears the flag.
         */
        static get interrupted(): boolean;

        /**
         * Cause the thread that this method is called from to wait until
         * the thread represented by the Thread instance finishes running.
         * If a timeout is specified, it will wait up to that long; otherwise
         * it will wait forever.
         * 
         * @param timeoutInMs the maximum time, in milliseconds, to wait for the thread
         * @returns the value that was returned by the function passed to the constructor (if the thread ended before the timeout elapsed)
         */
        join(timeoutInMs?: number): any;

        /**
         * This is a convenience function that creates a new thread for the specified function and immediately starts it.
         * 
         * @param functionToRun the function to call from another thread
         * @returns the new, already-started Thread instance
         */
        static run(functionToRun: CallableFunction): Thread;

        /**
         * Calls the given function on the event dispatch (user interface)
         * thread at some point in the future, without waiting for it to return.
         * For example:
         * ```
         * Thread.invokeLater(
         *     function() {
         *         println("I will be called later.");
         *     }
         * );
         * println("I will be called now.");
         * ```
         * 
         * @param functionToRunLater the function to invoke in the future from the interface thread
         */
        static invokeLater(functionToRunLater: CallableFunction): void;

        /**
         * Calls the given function on the event dispatch (user interface) thread,
         * waiting for it to return.
         * If the current thread *is* the event dispatch thread, then it will
         * run immediately. Otherwise, the current thread will be paused
         * until the event dispatch thread is able to execute the function.
         * Note that if you create a situation where the interface thread is waiting
         * for this thread, and this thread is waiting for the interface thread,
         * the app will deadlock.
         *
         * @returns the result returned by the function, if any
         */
        static invokeAndWait(functionToRunLater: CallableFunction): any;

        /**
         * Runs a lengthy task in the background while providing feedback to the
         * user on the progress of the task. When called, this function blocks
         * the user interface with a status window as long as the `task` executes.
         * The window displays title and status text that can be updated to reflect
         * the state of the task, as well as a progress bar, and optionally a
         * **Cancel** button. The task function is passed a single object whose
         * properties can be updated to change the status displayed by the busy window.
         * 
         * @param task the function to run during which the app is "busy"
         * @param title a title for the window
         * @param canCancel if true, a cancel button is shown whose status can be read from the task function
         */
        static busyWindow(task: TaskFunction, title?: string, canCancel?: boolean): void;

        /**
         * A convenient reference to the ReentrantLock class that can be used for
         * synchronization purposes.
         */
        static Lock: JavaObject<"java.util.concurrent.locks.ReentrantLock">;
    }

    /**
     * A function that executes show task in the background while blocking the
     * user interface with a [[busyWindow]].
     */
    interface TaskFunction {
        (status: BusyWindowProperties): void
    }

    /**
     * An object with these properties is passed to the task function that is
     * invoked by a [[busyWindow]]. Changing these properties from the task
     * function will modify the feedback shown to the user by the window.
     */
    interface BusyWindowProperties {
        /** This can be set to an integer representing the total number of steps that need to be performed. Initially the progress bar indicates that the task will run for an indeterminate amount of time. If the task function sets this property, then the progress bar will indicate the current progress is proportional to `currentProgress/maximumProgress`. */
        maximumProgress: number;
        /** This can be set to an integer representing how many steps have been completed. This will be used to show a progress bar in the busy window. */
        currentProgress: number;
        /** Sets the main title of the busy window. */
        title: string;
        /** Sets the status text of the busy window; this is smaller text that usually describes the current stage or step of the procedure. */
        status: string;
        /** This will be set to true if the user clicked the **Cancel** button. Always false if no cancel button was requested. When used, the task function should periodically check this value, and if set cancel the request and return as soon as possible. */
        cancelled: boolean;
    }
}