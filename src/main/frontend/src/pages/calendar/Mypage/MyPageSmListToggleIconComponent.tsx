import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";

interface MyPageSmListToggleIconComponentInterface {
    itemId:number;
    onToggle:(itemId:number)=>void;
}

const MyPageSmListToggleIconComponent:React.FC<MyPageSmListToggleIconComponentInterface> = ({ itemId, onToggle }) => {
    const [isForward, setIsForward] = useState<boolean>(true);

    const toggleIcon = () => {
        setIsForward((prevIsForward) => !prevIsForward);
        onToggle(itemId);
    };

    return (
        <span onClick={toggleIcon}>
          {isForward ? <IoIosArrowForward /> : <IoIosArrowDown />}
        </span>
    );
};

export default MyPageSmListToggleIconComponent;