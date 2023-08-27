import {useSelector} from "react-redux";

const IsId=()=>{
    const user = useSelector((state) => state.user.value.user);
    return user ? user.membId : null;
}

export default IsId;