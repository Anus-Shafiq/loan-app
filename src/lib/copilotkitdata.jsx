import { useCopilotReadable } from "@copilotkit/react-core";

export default function CopilotDataBridge(loanData, children) {
  useCopilotReadable({
    description: "List of all loans with id, name, amount, and status",
    value: loanData,
  });

  return children;
}
