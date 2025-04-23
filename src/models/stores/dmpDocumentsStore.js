import { defineStore } from 'pinia';
import axios from 'axios';

export const useDmpDocumentsStore = defineStore('dmpDocuments', {
  state: () => ({
    documentStatus: null,
    submissionStartDate: null,
    submissionStartTime: null,
    submissionEndDate: null,
    submissionEndTime: null,
    documentCategory: null,
    documentType: null,
    actFromStartDate: null,
    actFromStartTime: null,
    actFromEndDate: null,
    actFromEndTime: null,
    actToStartDate: null,
    actToStartTime: null,
    actToEndDate: null,
    actToEndTime: null,
    invisibleToThePatient: false,
    invisibleToTheHealthcareProfessional: false,
    invisibleToLegalRepresentatives: false,
    showOnlyMyDocuments: false,
    classeDoc: [],
    typeDocAll: [],
    typeDoc: [],
  }),
  actions: {
    resetFilters() {
      this.documentStatus = null;
      this.submissionStartDate = null;
      this.submissionStartTime = null;
      this.submissionEndDate = null;
      this.submissionEndTime = null;
      this.documentCategory = null;
      this.documentType = null;
      this.actFromStartDate = null;
      this.actFromStartTime = null;
      this.actFromEndDate = null;
      this.actFromEndTime = null;
      this.actToStartDate = null;
      this.actToStartTime = null;
      this.actToEndDate = null;
      this.actToEndTime = null;
      this.invisibleToThePatient = false;
      this.invisibleToTheHealthcareProfessional = false;
      this.invisibleToLegalRepresentatives = false;
      this.showOnlyMyDocuments = false;
    },

    async getAllClassDoc() {
      const res = [];
      const response = await axios.get("http://127.0.0.1:8080/dmp/nomenclatures?jeuxValeurs=CLASS_CODE");
      response.data.forEach(type => {
        if (type.codingScheme !== "URN") {
          res.push({ libelle: type.libelle, id: type.code });
        }
      });
      this.classeDoc = res;
    },

    async getAllTypeDoc() {
      const res = [];
      const response = await axios.get("http://127.0.0.1:8080/dmp/nomenclatures/typesByClassCode");
      this.classeDoc.forEach(classe => {
        res.push({ array: response.data[classe.id], id: classe.id });
      });
      this.typeDocAll = res;
    },

    getTypeDoc(id) {
      return this.typeDocAll.find(type => type.id === id)?.array.map(item => ({ libelle: item.libelle, id: item.code })) || [];
    },

    getActDateText(date, time) {
      return date ? `${date}` + (time ? ` à ${time}` : "") : "-";
    },

    getAllActiveFilters() {
      const allFilterList = [
        this.documentStatus,
        this.submissionStartDate,
        this.submissionStartTime,
        this.submissionEndDate,
        this.submissionEndTime,
        this.documentCategory,
        this.documentType,
        this.actFromStartDate,
        this.actFromStartTime,
        this.actFromEndDate,
        this.actFromEndTime,
        this.actToStartDate,
        this.actToStartTime,
        this.actToEndDate,
        this.actToEndTime,
        this.invisibleToThePatient,
        this.invisibleToTheHealthcareProfessional,
        this.invisibleToLegalRepresentatives,
        this.showOnlyMyDocuments,
      ];

      return allFilterList.filter(filter => filter != null && filter !== false && filter !== "").join(';');
    },
  },
});