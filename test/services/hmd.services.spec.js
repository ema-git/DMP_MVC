import { HmdServices } from '../../src/services/hmd.services.js';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import patients from './../json/fetchPatientsResponse.json';

const hmdServices = new HmdServices();
const num_med = "112";

vi.mock('axios');

beforeEach(() => {
    axios.get.mockReset();
});

describe('fetchPatients', () => {

    test('returns correct data on success', async () => {
        axios.get.mockResolvedValue({
            status: 200,
            data: patients
        });
        const response = await hmdServices.fetchPatients(num_med);
        expect(axios.get).toHaveBeenCalledOnce();
        expect(axios.get).toHaveBeenCalledWith('/fetchPatients.php', { params: { num_med: num_med } });
        expect(response).toStrictEqual(patients);
    });

    test('throws error on failure', async () => {

        axios.get.mockRejectedValue(new Error('Erreur Axios'));
        await expect(hmdServices.fetchPatients(num_med)).rejects.toThrow('Impossible de récupérer la liste des patients');
        expect(axios.get).toHaveBeenCalledOnce();
        expect(axios.get).toHaveBeenCalledWith('/fetchPatients.php', { params: { num_med: num_med } });
    });

})
