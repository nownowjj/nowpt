import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";

const Role=()=>{
    const user = useSelector((state:RootState) => state.user.user);
    return user ? user.roles : null;
}

export default Role;