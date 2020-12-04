import React, { Component, useState } from "react";
import VSensor from "react-visibility-sensor";

interface Props {
    once: boolean,
}

export const VisibilitySensor: React.FC<Props> = ({once, children}) => {
    const [active, setActive] = useState<boolean>(true)
    return (
      <VSensor
        active={active}
        onChange={isVisible =>
          once &&
          isVisible &&
          setActive(false)
        }
        {...children}
      />
    );
  }
