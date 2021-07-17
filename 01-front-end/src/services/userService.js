import Api from "../api/api";
import { createBrowserHistory } from "history";

const UserService = {
    login: (data) => {
        console.log(data)
        localStorage.setItem('app-token', true);
        
        createBrowserHistory().push('/dashboard');
    },

    isAuthenticated: () => {
        const isAuthenticated = localStorage.getItem('app-token');
        console.log(isAuthenticated);
        if (isAuthenticated) {
            return true;
        }

        return false;
    },

    register: () => {
        console.log("Chegou no registro")
    }
}

export default UserService;