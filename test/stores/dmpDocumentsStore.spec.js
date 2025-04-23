import { describe, it, expect, beforeEach } from 'vitest'
import { useDmpDocumentsStore } from '../../src/stores/dmpDocumentsStore.js';
import { createPinia, setActivePinia } from 'pinia';
import patients from '../json/fetchPatientsResponse.json';

beforeEach(() => {
    setActivePinia(createPinia())
})

describe('dmpDocumentsStore', () => {

    it('updates properties', () => {
        const dmpDocumentsStore = useDmpDocumentsStore();
        expect(dmpDocumentsStore.documents).toStrictEqual([]);
        expect(dmpDocumentsStore.invisibleToThePatient).toStrictEqual(false);
        expect(dmpDocumentsStore.invisibleToTheHealthcareProfessional).toStrictEqual(false);
        expect(dmpDocumentsStore.invisibleToLegalRepresentatives).toStrictEqual(false);
        expect(dmpDocumentsStore.showOnlyMyDocuments).toStrictEqual(false);
        expect(dmpDocumentsStore.documentStatus).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionStartDate).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionEndTime).toStrictEqual(null);
        expect(dmpDocumentsStore.documentCategory).toStrictEqual(null);
        expect(dmpDocumentsStore.documentType).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromEndTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actToStartDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actToStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actToEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actToEndTime).toStrictEqual(null);
        dmpDocumentsStore.documents = [{ "a": "1" }, { "a": "2" }];
        dmpDocumentsStore.invisibleToThePatient = true;
        dmpDocumentsStore.invisibleToTheHealthcareProfessional = true;
        dmpDocumentsStore.invisibleToLegalRepresentatives = true;
        dmpDocumentsStore.showOnlyMyDocuments = true;
        dmpDocumentsStore.documentStatus = "TYPE_TEST";
        dmpDocumentsStore.submissionStartDate = new Date(2023, 10, 3);
        dmpDocumentsStore.submissionStartTime = "14:35";
        dmpDocumentsStore.submissionEndDate = new Date(2023, 12, 3);
        dmpDocumentsStore.submissionEndTime = "07:00";
        dmpDocumentsStore.documentCategory = "DOC_CATEGORY";
        dmpDocumentsStore.documentType = "DOC_TYPE";
        dmpDocumentsStore.actFromStartDate = new Date(2020, 4, 15);
        dmpDocumentsStore.actFromStartTime = "19:12";
        dmpDocumentsStore.actFromEndDate = new Date(2020, 7, 1);
        dmpDocumentsStore.actFromEndTime = "23:01";
        dmpDocumentsStore.actToStartDate = new Date(2020, 8, 15);
        dmpDocumentsStore.actToStartTime = "22:10";
        dmpDocumentsStore.actToEndDate = new Date(2016, 11, 11);
        dmpDocumentsStore.actToEndTime = "00:07";
        expect(dmpDocumentsStore.documents).toStrictEqual([{ "a": "1" }, { "a": "2" }]);
        expect(dmpDocumentsStore.invisibleToThePatient).toStrictEqual(true);
        expect(dmpDocumentsStore.invisibleToTheHealthcareProfessional).toStrictEqual(true);
        expect(dmpDocumentsStore.invisibleToLegalRepresentatives).toStrictEqual(true);
        expect(dmpDocumentsStore.showOnlyMyDocuments).toStrictEqual(true);
        expect(dmpDocumentsStore.documentStatus).toStrictEqual("TYPE_TEST");
        expect(dmpDocumentsStore.submissionStartDate).toStrictEqual(new Date(2023, 10, 3));
        expect(dmpDocumentsStore.submissionStartTime).toStrictEqual('14:35');
        expect(dmpDocumentsStore.submissionEndDate).toStrictEqual(new Date(2023, 12, 3));
        expect(dmpDocumentsStore.submissionEndTime).toStrictEqual('07:00');
        expect(dmpDocumentsStore.documentCategory).toStrictEqual('DOC_CATEGORY');
        expect(dmpDocumentsStore.documentType).toStrictEqual('DOC_TYPE');
        expect(dmpDocumentsStore.actFromStartDate).toStrictEqual(new Date(2020, 4, 15));
        expect(dmpDocumentsStore.actFromStartTime).toStrictEqual('19:12');
        expect(dmpDocumentsStore.actFromEndDate).toStrictEqual(new Date(2020, 7, 1));
        expect(dmpDocumentsStore.actFromEndTime).toStrictEqual('23:01');
        expect(dmpDocumentsStore.actToStartDate).toStrictEqual(new Date(2020, 8, 15));
        expect(dmpDocumentsStore.actToStartTime).toStrictEqual('22:10');
        expect(dmpDocumentsStore.actToEndDate).toStrictEqual(new Date(2016, 11, 11));
        expect(dmpDocumentsStore.actToEndTime).toStrictEqual('00:07');
    });

    it('resets state', () => {
        const dmpDocumentsStore = useDmpDocumentsStore();
        dmpDocumentsStore.documents = [{ "a": "1" }, { "a": "2" }];
        dmpDocumentsStore.invisibleToThePatient = true;
        dmpDocumentsStore.invisibleToTheHealthcareProfessional = true;
        dmpDocumentsStore.invisibleToLegalRepresentatives = true;
        dmpDocumentsStore.showOnlyMyDocuments = true;
        dmpDocumentsStore.documentStatus = "TYPE_TEST";
        dmpDocumentsStore.submissionStartDate = new Date(2023, 10, 3);
        dmpDocumentsStore.submissionStartTime = "14:35";
        dmpDocumentsStore.submissionEndDate = new Date(2023, 12, 3);
        dmpDocumentsStore.submissionEndTime = "07:00";
        dmpDocumentsStore.documentCategory = "DOC_CATEGORY";
        dmpDocumentsStore.documentType = "DOC_TYPE";
        dmpDocumentsStore.actFromStartDate = new Date(2020, 4, 15);
        dmpDocumentsStore.actFromStartTime = "19:12";
        dmpDocumentsStore.actFromEndDate = new Date(2020, 7, 1);
        dmpDocumentsStore.actFromEndTime = "23:01";
        dmpDocumentsStore.actToStartDate = new Date(2020, 8, 15);
        dmpDocumentsStore.actToStartTime = "22:10";
        dmpDocumentsStore.actToEndDate = new Date(2016, 11, 11);
        dmpDocumentsStore.actToEndTime = "00:07";
        dmpDocumentsStore.reset();
        expect(dmpDocumentsStore.documents).toStrictEqual([]);
        expect(dmpDocumentsStore.invisibleToThePatient).toStrictEqual(false);
        expect(dmpDocumentsStore.invisibleToTheHealthcareProfessional).toStrictEqual(false);
        expect(dmpDocumentsStore.invisibleToLegalRepresentatives).toStrictEqual(false);
        expect(dmpDocumentsStore.showOnlyMyDocuments).toStrictEqual(false);
        expect(dmpDocumentsStore.documentStatus).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionStartDate).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.submissionEndTime).toStrictEqual(null);
        expect(dmpDocumentsStore.documentCategory).toStrictEqual(null);
        expect(dmpDocumentsStore.documentType).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromStartDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actFromEndTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actToStartDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actToStartTime).toStrictEqual(null);
        expect(dmpDocumentsStore.actToEndDate).toStrictEqual(null);
        expect(dmpDocumentsStore.actToEndTime).toStrictEqual(null);
    });

    it('updates selected patient', () => {
        const dmpDocumentsStore = useDmpDocumentsStore();
        const patient = patients[0];
        expect(dmpDocumentsStore.patient).toStrictEqual(null);
        dmpDocumentsStore.updateSelectedPatient(patient);
        expect(dmpDocumentsStore.patient).toStrictEqual(patient);
    });

})