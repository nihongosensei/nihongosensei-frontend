import type {
  ByTextQueryModel,
  ByTextResponseModel,
} from "../../pages/api/entry/byText";
import type { FuriganaResponseModel } from "../../pages/api/furigana";

export interface ApiClient {
  getByText(options?: ByTextQueryModel): Promise<ByTextResponseModel>;

  getFurigana(text: string): Promise<FuriganaResponseModel>;
}
