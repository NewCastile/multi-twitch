import { FlatErrorEntrie } from "@/types";

export const MAX_BROADCASTS_NUMBER = 9;
export const FOLLOWED_ITEMS_PER_PAGE = 7;
export const SEARCH_ITEMS_PER_PAGE = 20;

export const INITIAL_PAGE_ROUTE = "/watch/knekro/alimentacionchino/jujalag/zackrawrr/werlyb";

export const ERROR_STATUS = {
  resourceNotFound: {
    statusText: "Resource Not Found",
    case: {
      accountNotFound: {
        statusText: "Account Not Found",
        message: "No account associated to this user was found.",
      },
      channelNotFound: {
        statusText: "Channel Not Found",
        message: "Sorry, we couldnt find your twitch channel. Log out and try again.",
      },
      sessionNotFound: {
        statusText: "Session Not Found",
        message: "No session associated to this user was found.",
      },
      userNotFound: { statusText: "User Not Found", message: "User not found in database." },
    },
  },
  unauthorized: {
    statusText: "Unauthorized",
    message: "You need to log in to access the content of this page.",
  },
  sessionExpired: {
    statusText: "Session Expired",
    message: "Your session has expired. You will be redirected to the login page.",
  },
  badRequest: {
    statusText: "Bad Request",
    case: {
      missingQueryParameter: {
        statusText: "Missing Query Parameter",
        message: (param: string) => `No ${param} parameter was passed to the request URL.`,
      },
      invalidAccessToken: {
        statusText: "Invalid Access Token",
        message: "Your access token has expired.",
      },
    },
  },
};

// Extracts the inner statuses of the ERROR_STATUS object
const getFlatErrorStatusArray = () => {
  const flattenedErrorsArray: Array<FlatErrorEntrie> = [];

  const makeflattenedErrorsArray = () =>
    Array.from(Object.entries(ERROR_STATUS)).forEach((entrie) => {
      const [_, entrieContent] = entrie;

      if ("case" in entrieContent) {
        const { statusText: statusGroup } = entrieContent;

        Array.from(Object.entries(entrieContent["case"])).forEach(([__, caseContent]) => {
          const { statusText, message } = caseContent;

          flattenedErrorsArray.push({ statusGroup, statusText, message });
        });
      } else {
        const { statusText, message } = entrieContent;

        flattenedErrorsArray.push({ statusGroup: statusText, statusText, message });
      }
    });

  makeflattenedErrorsArray();

  return flattenedErrorsArray;
};

export const FLAT_ERROR_STATUS = getFlatErrorStatusArray();
