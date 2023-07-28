import { useMemo } from "react";
import { getCleanedUpClassNames } from "./utilities";

export const useClassNames = (classNames) =>
  useMemo(() => getCleanedUpClassNames(classNames), [classNames]);
