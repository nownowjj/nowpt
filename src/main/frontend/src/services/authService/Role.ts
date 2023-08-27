import {useSelector} from "react-redux";

const Role=()=>{
    const user = useSelector((state) => state.user.value.user);
    return user ? user.roles : null;
}

export default Role;