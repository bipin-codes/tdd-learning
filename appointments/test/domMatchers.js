import { toContainText } from "./matchers/toContainText";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
expect.extend({ toContainText, toBeInputFieldOfType });

expect.extend({
  toBeCalled(received) {
    if (received.receivedArguments() === undefined) {
      return {
        pass: false,
        message: () => "Spy wasn't called.",
      };
    }
    return {
      pass: true,
      message: () => "Spy was called",
    };
  },
  toBeCalledWith(received, ...expectedArguments) {
    if (received.receivedArguments() === undefined) {
    }
    const noMatch = !this.equals(
      received.receivedArguments(),
      expectedArguments
    );

    if (noMatch) {
      return {
        pass: false,
        message: () =>
          "Spy called with wrong arguments" +
          received.receivedArguments() +
          ".",
      };
    }
    return {
      pass: true,
      message: "Spy was called with correct arguments!",
    };
  },
});
