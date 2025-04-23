import { DmpServices } from "../services/dmp.services.js";
import { FileServices } from "../services/file.services.js";

const dmpServices = new DmpServices();
const fileServices = new FileServices();

const state = {
  documents: [],
  isLoading: false,
  error: null,
  isDmpInactive: false,
  dmpInactiveReason: null,
  selectedSort: 0, // 0: Name ASC, 1: Name DESC, 2: Date ASC, 3: Date DESC
};

const getters = {
  documents: (state) => state.documents,
  isLoading: (state) => state.isLoading,
  error: (state) => state.error,
  isDmpInactive: (state) => state.isDmpInactive,
  dmpInactiveReason: (state) => state.dmpInactiveReason,
};

const mutations = {
  setDocuments(state, documents) {
    state.documents = documents;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setError(state, error) {
    state.error = error;
  },
  setDmpInactive(state, payload) {
    state.isDmpInactive = payload.status;
    state.dmpInactiveReason = payload.reason;
  },
  toggleSortByName(state) {
    state.selectedSort = state.selectedSort === 0 ? 1 : 0;
  },
  toggleSortByDate(state) {
    state.selectedSort = state.selectedSort === 2 ? 3 : 2;
  },
};

const actions = {
  async checkDMPExistanceAndFetchDocuments({ commit, dispatch }) {
    try {
      const dmpStatus = await dmpServices.checkDMPExistance();
      if (dmpStatus) {
        await dispatch("fetchDocuments");
      } else {
        commit("setDmpInactive", { status: true, reason: "DMP inactif" });
      }
    } catch (error) {
      commit("setError", error.message || "Erreur de récupération des documents");
    }
  },

  async fetchDocuments({ commit, state }) {
    commit("setLoading", true);
    try {
      const documents = await dmpServices.fetchDocuments(state.selectedSort);
      commit("setDocuments", documents);
    } catch (error) {
      commit("setError", error.message || "Erreur de récupération des documents");
    } finally {
      commit("setLoading", false);
    }
  },

  async previewFile({ commit }, index) {
    try {
      const file = await fileServices.getFileContent(index);
      commit("setFilePreview", file);
    } catch (error) {
      commit("setError", error.message || "Erreur de prévisualisation");
    }
  },

  async downloadFile({ commit }, index) {
    try {
      await fileServices.downloadFile(index);
    } catch (error) {
      commit("setError", error.message || "Erreur de téléchargement");
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};