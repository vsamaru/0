import { useContext } from "react";

import { TestRunOverviewPage } from "./Overview/TestRunOverviewContextRoot";
import { TestRunList } from "./TestRunList";
import { TestRunsContainer, TestRunsContext } from "./TestRunsContextRoot";

export function TestRunsPage() {
  return (
    <TestRunsContainer>
      <TestRunsContent />
    </TestRunsContainer>
  );
}

function TestRunsContent() {
  const { focusId } = useContext(TestRunsContext);

  return (
    <div className="flex flex-grow flex-row overflow-hidden">
      <TestRunList />
      {focusId ? <TestRunOverviewPage /> : null}
    </div>
  );
}
