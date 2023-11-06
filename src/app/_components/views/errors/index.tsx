"use client";
import { ERROR_STATUS, FLAT_ERROR_STATUS } from "@/app/constants";
import { ApiErrorResponse, ErrorViewEntrie } from "@/app/types";

import BadRequestView from "./lib/bad-request-view";
import DefaultView from "./lib/default-view";
import ResourceNotFoundView from "./lib/resource-not-found-view";
import SessionExpiredView from "./lib/session-expired-view";
import UnauthorizedView from "./lib/unauthorized-view";

const ErrorView = ({ message, status, statusText }: ApiErrorResponse) => {
  const [filteredView] = ErrorViews.filter((view) => {
    return view.statusText === statusText;
  });

  return <CurrentView error={{ message, status, statusText }} matchingView={filteredView} />;
};

const CurrentView = ({
  matchingView,
  error,
}: {
  matchingView: ErrorViewEntrie | undefined | null;
  error: ApiErrorResponse;
}) => {
  const { message } = error;

  if (matchingView) {
    const { component: ErrorComponent, statusText, statusGroup } = matchingView;

    return <ErrorComponent {...{ message, status: statusGroup, statusText }} />;
  } else {
    return <DefaultView {...error} />;
  }
};

const ErrorViews: ErrorViewEntrie[] = FLAT_ERROR_STATUS.map((statusEntrie) => {
  const { statusGroup, statusText } = statusEntrie;

  switch (statusGroup) {
    case ERROR_STATUS.sessionExpired.statusText:
      return { statusText, statusGroup, component: SessionExpiredView };
    case ERROR_STATUS.unauthorized.statusText:
      return { statusText, statusGroup, component: UnauthorizedView };
    case ERROR_STATUS.resourceNotFound.statusText:
      return { statusText, statusGroup, component: ResourceNotFoundView };
    case ERROR_STATUS.badRequest.statusText:
      return { statusText, statusGroup, component: BadRequestView };
    default:
      return { statusText, statusGroup, component: DefaultView };
  }
});

export default ErrorView;
