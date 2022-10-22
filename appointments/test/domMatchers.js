import { toContainText } from "./matchers/toContainText";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
expect.extend({ toContainText, toBeInputFieldOfType });
