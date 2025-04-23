import axios from 'axios';

export class HmdServices {

    constructor() { }
    
    async fetchPatients(num_med) {
        try {
            let fetchPatientsResponse = await axios.get(
                '/fetchPatients.php',
                {
                    params: {
                        num_med: num_med
                    }
                }
            );
            return fetchPatientsResponse.data;
        }
        catch (axiosError) {
            throw Error('Impossible de récupérer la liste des patients');
        }
    }

}