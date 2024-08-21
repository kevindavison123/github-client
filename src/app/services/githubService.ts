import { Octokit } from "octokit";

const octokit = new Octokit({});
const USER_URL = "GET /users/{username}/repos";
const ORG_URL = "GET /orgs/{org}/repos";
export const getRepos = async (
  queryValue = "",
  callType: string,
  sort: string,
  per_page: string,
  direction: string,
  page: string,
) => {
  let baseUrl = USER_URL;
  const params = {
    sort: sort,
    per_page: per_page,
    direction: direction,
    page: page,
  };
  if (callType === "org") {
    baseUrl = ORG_URL;
    params["org"] = queryValue;
  } else {
    params["username"] = queryValue;
  }
  return octokit.request(baseUrl, params);
};
