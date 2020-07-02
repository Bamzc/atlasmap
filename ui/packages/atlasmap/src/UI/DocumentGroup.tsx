import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useRef,
} from "react";

import { FolderCloseIcon, FolderOpenIcon } from "@patternfly/react-icons";
import { css, StyleSheet } from "@patternfly/react-styles";

const styles = StyleSheet.create({
  buttonContent: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem 0.5rem 1.2rem",
  },
  buttonIcon: {
    marginRight: "1rem",
  },
  collectionIcon: {
    paddingLeft: "1.5rem",
  },
});

export interface IDocumentGroupProps {
  name: string;
  icon?: ReactElement;
  type?: string;
  showType?: boolean;
  expanded?: boolean;
}

export const DocumentGroup = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<IDocumentGroupProps>
>(function DocumentGroup(
  { name, type, icon, showType = false, expanded },
  ref,
) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const handleRef = (el: HTMLSpanElement | null) => {
    spanRef.current = el;
    if (ref) {
      if (typeof ref === "function") {
        ref(el);
      } else {
        // @ts-ignore
        ref.current = el;
      }
    }
  };

  return (
    <span
      className={css(styles.buttonContent)}
      ref={handleRef}
      data-testid={`field-group-${name}-expanded-${expanded}-field`}
    >
      <span className={css(styles.buttonIcon)}>
        {expanded ? <FolderOpenIcon /> : <FolderCloseIcon />}
      </span>
      {name}
      {showType && ` (${type})`}
      <span className={css(styles.collectionIcon)}>{icon}</span>
    </span>
  );
});
