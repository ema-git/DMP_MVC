import { createRouter, createWebHistory } from 'vue-router';
import { useDmpDocumentsStore } from '../models/stores/dmpDocumentsStore';

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { view: 'list' }
  },
  {
    path: '/:patientName',
    name: 'PatientDetail',
    component: () => import('../views/PatientDetailView.vue'),
    meta: { view: 'detail' },
    props: true
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to handle patient detail view
router.beforeEach(async (to, from, next) => {
  const dmpDocumentsStore = useDmpDocumentsStore();
  
  if (to.meta.view === 'list') {
    dmpDocumentsStore.currentView = 'list';
    next();
  } else if (to.meta.view === 'detail') {
    const patientName = to.params.patientName;
    
    // Wait for patients to be loaded
    if (dmpDocumentsStore.patients.length === 0) {
      // We need to wait for the patients to be loaded in App.vue mounted hook
      // This is a simple approach - in a real app, you might want to use a more robust solution
      let attempts = 0;
      const waitForPatients = setInterval(() => {
        attempts++;
        if (dmpDocumentsStore.patients.length > 0 || attempts > 10) {
          clearInterval(waitForPatients);
          findAndSetPatient();
        }
      }, 500);
    } else {
      findAndSetPatient();
    }
    
    function findAndSetPatient() {
      // Find the patient by name (case insensitive and ignoring spaces)
      const patient = dmpDocumentsStore.patients.find(p => {
        if (!p.prenom || !p.nomPatronymique) return false;
        const fullName = `${p.prenom}${p.nomPatronymique}`.toLowerCase().replace(/\s+/g, '');
        return fullName === patientName.toLowerCase().replace(/\s+/g, '');
      });
      
      if (patient) {
        dmpDocumentsStore.navigateToPatientDetail(patient);
      } else {
        console.error(`Patient with name ${patientName} not found`);
        // Fallback to list view if patient not found
        dmpDocumentsStore.currentView = 'list';
      }
      
      next();
    }
  } else {
    next();
  }
});

export default router;
