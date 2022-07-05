import { Icon } from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { Action } from "react-tiny-fab";
import { darken } from 'polished';

type FooterMenuActionProps = {
    icon: IconType;
    clickFunction: ()=>void;
}

export const FooterMenuAction = ({icon, clickFunction}: FooterMenuActionProps)  =>{
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () =>{
        setIsHovering(true);

    }

    const handleMouseLeave = () =>{
        setIsHovering(false);
    }

    return(
        <>
            <Action onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{backgroundColor: isHovering ? darken(0.2, "#7166B6") : "#7166B6", transition: "0.2s ease-in-out"}}>
                <Icon
                    as={icon}
                    aria-label="30px"
                    fontSize="24px"
                    cursor="pointer"
                    bg={isHovering ? darken(0.2, "#7166B6") : "#7166B6"}
                    transition="0.2s ease-in-out"
                    onClick={clickFunction}
                />
            </Action>
        </>
            
  )
}

export default FooterMenuAction;