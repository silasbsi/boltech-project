import api from "../api";

const UserService = {
    login: async function (data) {
        try {
            
            const response = await api.post('/auth/authenticate', data)
            console.log(response)
            if (response.status === 200) {
                
                localStorage.setItem('app-token', response.data.token ? true : false);
                return response;
            }
            return false;
                
        } catch (err) {
            console.log(err.message)
        }
    },

    isAuthenticated: function () {
        const isAuthenticated = localStorage.getItem('app-token');
        
        if (isAuthenticated) {
            return true;
        }

        return false;
    },

    register: async function (data) {
        try {
            await api.post('/auth/register', data)
                .then(response => {
                    if (response.status === 200)
                        return true;
                });
            
        } catch(err) {
            console.log(err.message)
        }
    }
}

export default UserService;