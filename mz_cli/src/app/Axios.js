import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Url from "../constants/Global";
function Axios() {
    const {user} = useSelector(selectUser)
    const create = axios.create({
        baseURL: Url,
        headers: {
            'Authorization': user.token.type +' '+ user.token.token,
        },
    })

    return create;
}


export default Axios;