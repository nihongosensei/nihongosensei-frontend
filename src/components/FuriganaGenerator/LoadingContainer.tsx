import { useStore } from "~components/FuriganaGenerator/FuriganaGeneratorContext";
import { LoadingProgress } from "~components/ui/LoadingProgress";

export function LoadingContainer() {
  const store = useStore();

  return store.loading.value ? <LoadingProgress /> : null;
}
