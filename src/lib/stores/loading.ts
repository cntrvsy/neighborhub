import { writable } from "svelte/store";

const advancedLoading = () => {
    const {subscribe, update, set} = writable({
        status: "IDLE", // IDLE, LOADING, NAVIGATING
        message: ''
    })

    function setNavigate(isNavigating: boolean){
        update(()=>{
            return {
                status: isNavigating ? 'NAVIGATING' : 'IDLE',
                message: '',
            }
        })
    }

    function setLoading(isLoading: boolean, message: string ='' ) {
        update(()=> {
            return{
                status: isLoading ? 'LOADING': 'IDLE',
                message: isLoading ? message : '',
            }
        })
    }

    return {subscribe, update, set, setNavigate, setLoading}
}

export const loading = advancedLoading();
