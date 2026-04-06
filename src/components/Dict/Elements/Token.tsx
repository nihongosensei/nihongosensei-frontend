import { MinorText } from "~components/ui/Typography/MinorText";
import type { TokenModel } from "~services/VocabularyService";

export function Token({ content, genus, numerus, type, article }: TokenModel) {
  return (
    <>
      {content}
      {!genus && type && (
        <MinorText>
          {" "}
          ({type}
          {!article && "Ar"})
        </MinorText>
      )}
      {genus && (
        <>
          {" "}
          <MinorText component="i">
            {genus.toLowerCase()}
            {numerus?.toLowerCase()}
          </MinorText>
        </>
      )}
    </>
  );
}
