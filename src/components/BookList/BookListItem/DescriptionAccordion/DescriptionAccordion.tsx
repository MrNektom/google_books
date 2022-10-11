import React, { useRef, useState } from "react";

import s from "./DescriptionAccordion.module.css";

interface DescriptionAccorionProps {
  description: string;
}

export const DescriptionAccorion: React.FC<DescriptionAccorionProps> = ({
  description,
}: DescriptionAccorionProps) => {
  const [hidden, setHidden] = useState(true);
  const [height, setHeight] = useState(0);
  return (
    <>
      {description && (
        <div
          ref={(a) => setHeight(a?.getBoundingClientRect().height || 0)}
          className={[s.accordion, hidden && s.hidden].join(" ")}
        >
          {description}
          {height >= 100 && (
            <button
              className={s.accordion__toggle}
              onClick={() => setHidden(!hidden)}
            >
              {hidden ? "Show" : "Hide"}
            </button>
          )}
        </div>
      )}
    </>
  );
};
