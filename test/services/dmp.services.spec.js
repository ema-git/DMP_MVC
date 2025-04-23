import { DmpServices } from '../../src/services/dmp.services.js';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import td02ExistResponse from './../json/td02ExistResponse.json';

const dmpServices = new DmpServices();
const author = {
    'internalId': '1466'
};
const errorTxt = "erreur axios";
const ins = '1090763220834';
const ins_cle = '89';

vi.mock('axios');

beforeEach(() => {
    axios.post.mockReset();
})

describe('td02Exist', () => {

    test('returns correct data on success', async () => {
        axios.post.mockResolvedValue({
            data: td02ExistResponse
        });
        const response = await dmpServices.td02Exist(
            author,
            ins,
            ins_cle
        );
        expect(response).toBe(td02ExistResponse);
    });

    test('throws exception on error', async () => {
        axios.post.mockRejectedValue(new Error(errorTxt));
        await expect(dmpServices.td02Exist(author, ins, ins_cle)).rejects.toThrow('Impossible de vérifier l\'existence du DMP pour ce patient.');
    });

});

describe('td03AddAuthorization', () => {

    test('returns correct data on success', async () => {
        axios.put.mockResolvedValue({
            data: "OK"
        });
        const response = await dmpServices.td03AddAuthorization(author, ins);
        expect(response).toBe(undefined);
    });

    test('throws exception on error', async () => {
        axios.put.mockRejectedValue(new Error(errorTxt));
        await expect(dmpServices.td03AddAuthorization(author, ins)).rejects.toThrow('Impossible d\'accorder une autorisation à ce DMP.');
    });

});
