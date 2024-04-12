/**
 * Class represents data about player 
 */
 class loginInfo {
    /**
     * Create inicial loginInfo
     */
    constructor() {
        this.user = '';
        this.firstName = '';
        this.turma = '';
        this.escola = '';
    }

    // sessionStorage format:
    // "user": string
    // "firstName": string
    // "turma": string
    // "escola": string

    /**
     * Retrieve data saved in the browser's sessionstorage if it exists
     */
    getLocalData(){
        if(typeof(Storage) === "undefined") {
            return;
        }
        
        let dataAux = sessionStorage.getItem('loginInfo');
        if(dataAux != null){
            let data = JSON.parse(dataAux);
            this.parseData(data);
        }

    }

    /**
     * Set browser's sessionstorage accordingly to the current class data
     */
    setLocalData(){
        
        if(typeof(Storage) === "undefined") {
            return;
        }
        
        let storeInfo = {
            'user': this.user, 'firstName': this.firstName,
            'turma': this.turma, 'escola': this.escola};


        let info = JSON.stringify(storeInfo);

        sessionStorage.setItem("loginInfo", info);
    }

    /**
     * Delete user login info
     */
    logout() {
        this.user = '';
        this.firstName = '';
        this.turma = '';
        this.escola = '';
        this.setLocalData();
    }



    /**
     * Parse retreave data from browser's sessionstorage
     * @param {JSON} data - retrieved data in Json format
     */
    parseData(data) {
        if(data['user']){ // returns false if undefined/null
            this.user = data['user'];
        }
        if (data['firstName']) { // returns false if undefined/null
            this.firstName = data['firstName'];
        }
        if (data['turma']) { // returns false if undefined/null
            this.turma = data['turma'];
        }
        if (data['escola']) { // returns false if undefined/null
            this.escola = data['escola'];
        }   
    }
}
