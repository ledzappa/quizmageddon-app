import axios from 'axios';
const mocks = true;

const api = {
  getCategories: () =>
    axios.get(mocks ? 'mocks/categories.json' : '/api/categories'),
  getPlayerDescriptionWords: () =>
    axios.get('mocks/playerDescriptionWords.json'),
  getQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/questions', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }),
  getAllQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/all-questions', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }),
  getRoundAndRoundThemes: () =>
    axios.get(true ? 'mocks/roundAndRound.json' : '/api/round-and-round'),
  addQuestion: (formData) => axios.post('/api/questions', formData),
  saveQuestion: (formData) => axios.put('/api/questions', formData),
  deleteQuestion: (formData) => axios.delete('/api/questions', formData),
  addUser: (formData) => axios.post('/api/users', formData),
  login: (formData) =>
    axios.post(mocks ? 'mocks/login.json' : '/api/login', formData),
};

export default api;
