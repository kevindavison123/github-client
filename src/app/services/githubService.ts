import { Octokit } from "octokit";
import {API_URLS} from "@/app/config/apitUrls";

const octokit = new Octokit({});

export const getRepos = async (
  queryValue = "",
  callType: string,
  sort: string,
  per_page: string,
  direction: string,
  page: string,
) => {
  let baseUrl = API_URLS.USER_URL;
  const params = {
    sort: sort,
    per_page: per_page,
    direction: direction,
    page: page,
  };
  if (callType === "org") {
    baseUrl = API_URLS.ORG_URL;
    params["org"] = queryValue;
  } else {
    params["username"] = queryValue;
  }
  return octokit.request(baseUrl, params);
};
