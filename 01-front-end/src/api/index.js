import axios from 'axios';

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjIzNjgyMzVkOTdlOTllOGQwNDQwYSIsImlhdCI6MTYyNjQ5Nzk3OSwiZXhwIjoxNjI2NTg0Mzc5fQ.mQJvpbZFyQdg7805ERhmY8uCJsEZN9byY9kf-YpSDSs";

const api = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
});

export default api;