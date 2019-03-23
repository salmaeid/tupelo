import axios from "axios";
import { Constants } from "expo";

export default axios.create({
  baseURL: Constants.manifest.extra.apiUrl,
  responseType: "json"
});
