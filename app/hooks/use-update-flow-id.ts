import { useEffect } from "react";

export default function useUpdateFlowId(id: string) {
  useEffect(() => {
    //we need to set the flow id in the url after creating a new flow
    const url = new URL(window.location.href);
    const currentFlowId = url.searchParams.get("flow");
    if (!currentFlowId || currentFlowId !== id) {
      url.searchParams.set("flow", id);
      // only replaces the current history entry, no reload, no RR nav
      window.history.replaceState(null, "", url.toString());
    }
  }, [id]);
}
