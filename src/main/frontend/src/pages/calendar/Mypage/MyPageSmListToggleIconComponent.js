import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";

const MyPageSmListToggleIconComponent = ({ itemId, onToggle }) => {
    const [isForward, setIsForward] = useState(true);

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