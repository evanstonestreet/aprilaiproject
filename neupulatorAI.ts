// Add your code here

/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/


/**
 * Custom blocks
 */
//% weight=100 color=#800000 icon=""
//% groups="['Setup', 'Training', 'Testing', 'Activities']"
namespace neupulatorAI {

    // training object that keeps track of all variables needed for training
    let training = {
        status: false, // determines whether or not we are in training mode (as opposed to testing)
        currentlyRunning: false, // true if we are in the middle of a training session and data is being recorded
        numOfTrainingSessions: 0, // gives number of training sessions (inputed by user as a block parameter)
        sessionNum: 0, // keeps track of how many sessions we have trained already
        dataSessions: [] as number[][], // 2D array that stores each 1D array of data associated with each training session
        currentSession: [] as number[], // 1D array that temporarily stores data for each session before pushing to dataSessions and clearing itself
        activity: "", // mo for motor and mu for music
        sessionColumns: [] as string[],
        moreSessions: function () { // returns true if we still have more sessions to train
            return training.sessionNum < training.numOfTrainingSessions
        }
    }

    let testing = {
        status: false,
        numOfDataFiles: 0,
        activities: [] as string[]
    }


    // Block to put inside the forever block. Will add code for the testing portion
    //% block = "foreverBlock"
    //% group="Setup"
    export function foreverBlock(): void {
        if (training.status && training.currentlyRunning) { // makes sure we are in training mode and we are currently running a session
            if (training.moreSessions()) {
                // PLACEHOLDER CODE BELOW, TO BE REPLACED WITH EMG CODE
                serial.writeLine(input.acceleration(Dimension.X) + "")
                datalogger.log(datalogger.createCV(training.sessionColumns[training.sessionNum], input.acceleration(Dimension.X)))
                training.currentSession.push(input.acceleration(Dimension.X))
            }

        }
    }

    //% block = "trainingMode"
    //% group="Training"
    // To be dragged into the onStart block
    export function trainingMode(): void {
        training.status = true;
        serial.writeLine("Training mode turned on")
    }


    //% block = "testingMode"
    //% group="Testing"
    // To be dragged into the onStart block
    export function testingMode(): void {
        testing.status = true;
        serial.writeLine("Testing mode turned on")
    }


    //% block="Read Data"
    //% group="Testing"
    export function readData(): void {
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function (){
            let data = serial.readUntil(serial.delimiters(Delimiters.NewLine));
            console.log(data);
        });

    }

    //____________________________________________CUSTOM BLOCKS FOR TRAINING TO BE PUT INSIDE BUTTON A AND BUTTON B RESPECTIVELY_____________________________________
    //_______________________________________________________________________________________________________________________________________________________________



    //% block = "trainingButtonA"
    //% group="Training"
    export function trainingButtonA(): void {
        if (training.status && !training.currentlyRunning) {
            training.currentlyRunning = true
        }
    }


    //% block = "trainingButtonB"
    //% group="Training"
    export function trainingButtonB(): void {
        serial.writeLine("Button B is pressed")
        if (training.status && training.currentlyRunning) {
            training.currentlyRunning = false
            training.dataSessions.push(training.currentSession)
            training.currentSession = []
            training.sessionNum += 1
            if (!training.moreSessions()) { // condition where training has completed
                serial.writeLine("You have completed your training with " + training.numOfTrainingSessions + " sessions")
            }
        }
    }

    //________________________________________________________________________________________________________________________________________________________________
    //________________________________________________________________________________________________________________________________________________________________


    // Motor turning activity block. To be dragged into On start    
    //% block="Turn motor by %degrees degrees (Train for %numSessions sessions)"
    //% group="Activities"
    export function turnMotor(degrees: number, numSessions: number) {
        //serial.writeLine("Turning motor by " + degrees + " degrees")
        training.numOfTrainingSessions = numSessions
        switch (numSessions) {
            case 1:
                datalogger.setColumnTitles("Session 1")
                training.sessionColumns = ["Session 1"]
                break;
            case 2:
                datalogger.setColumnTitles("Session 1", "Session 2")
                training.sessionColumns = ["Session 1", "Session 2"]
                break;
            case 3:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3"]
                break;
            case 4:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4"]
                break;
            case 5:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5"]
                break;
            case 6:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6"]
                break;
            case 7:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7"]
                break;
            case 8:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8"]
                break;
            case 9:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", "Session 9")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", "Session 9"]
                break;
            case 10:
                datalogger.setColumnTitles("Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", "Session 9", "Session 10")
                training.sessionColumns = ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5", "Session 6", "Session 7", "Session 8", "Session 9", "Session 10"]
                break;
        }

        training.activity = "mo"
    }
}
