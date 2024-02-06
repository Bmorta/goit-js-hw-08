// Importing throttle function from lodash
import throttle from 'lodash.throttle';

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  
  // Function to save form state to local storage
  const saveStateToLocalStorage = throttle(() => {
    const state = {
      email: emailInput.value,
      message: messageInput.value
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(state));
  }, 500);
  
  // Function to load form state from local storage
  const loadStateFromLocalStorage = () => {
    const state = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (state) {
      emailInput.value = state.email || '';
      messageInput.value = state.message || '';
    }
  };
  
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const state = JSON.parse(localStorage.getItem('feedback-form-state'));
    console.log('Form Data:', state);
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
  };
  
  // Event listeners
  form.addEventListener('input', saveStateToLocalStorage);
  form.addEventListener('submit', handleSubmit);
  
  // Load form state on page load
  loadStateFromLocalStorage();
});
