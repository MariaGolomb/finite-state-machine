class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
        this._config=config;
        this._currentState=this._config.initial;
        this._history=[];
        this._currentIndex=-1;
        this._initialState=config.initial;
        } else {
            throw Error('No config passed');
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._currentState;

    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this._config.states){
            if(this._currentIndex===this._history.length-1){
                this._history.push(this._currentState);
                this._currentIndex++; 
                this._currentState=state;
            } else {
                this._history=this._history.slice(0, this._currentIndex+1);
                this._history.push(this._currentState);
                this._currentIndex++; 
                this._currentState=state;
            }
        } else {
            throw Error ('Undefended state')
        }
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

       // if( this._config.states[this._currentState].transitions[event] ){
            //this.changeState(this._config.states[this._currentState].transitions[event])
            if(this._config.states[this._currentState].transitions[event]){
                this.changeState(this._config.states[this._currentState].transitions[event]);
            } else {
                throw Error ('Forbidden state')
            }
        
       // }
     

        //this._config.states[state].transitions[event] 



    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._currentState =this._initialState;  

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event){
            let res=[];
            for(let state in this._config.states){
                if (this._config.states[state].transitions[event]){
                    res.push(state);
                }
            }
            return res; 

        } else {
            return Object.keys(this._config.states);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._currentIndex>=0){
            if(this._currentIndex===this._history.length-1){
                this._history.push(this._currentState);
                this._currentState=this._history[this._currentIndex]
                this._currentIndex--;
            } else {
                this._currentState=this._history[this._currentIndex]
                this._currentIndex--;
            }

            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._currentIndex<this._history.length-2){
            this._currentIndex++;
            this._currentState=this._history[this._currentIndex+1]
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._history=[];
        this._currentIndex=-1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
