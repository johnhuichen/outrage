"use client";

import { createContext, useCallback, useEffect, useReducer } from "react";

import cx from "classnames";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BodyColumn from "@/components/layout/BodyColumn";

type NotificationState = {
  content: string;
  isError: boolean;
};

type NotificationActionType = "SET_STATE";
const actionTypes: Record<NotificationActionType, NotificationActionType> = {
  SET_STATE: "SET_STATE",
};

type NotificationAction = {
  type: NotificationActionType;
  content: string;
  isError: boolean;
};

const reducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case actionTypes.SET_STATE:
      return {
        content: action.content,
        isError: action.isError,
      };
    default:
      return state;
  }
};

type NotificationContextProps = {
  setNotificationState(state: NotificationState): void;
};

export const NotificationContext = createContext<NotificationContextProps>({
  setNotificationState: () => {},
});

const initialState = {
  content: "",
  isError: false,
};

type NotificationProps = {
  content: string;
  isError: boolean;
  setNotificationState(state: NotificationState): void;
};

const Notification = ({
  content,
  isError,
  setNotificationState,
}: NotificationProps) => {
  useEffect(() => {
    if (!isError && content !== "") {
      setTimeout(() => setNotificationState(initialState), 5000);
    }
  }, [setNotificationState, content, isError]);

  if (!content) {
    return null;
  }

  return (
    <BodyColumn className="fixed z-50 top-16 left-[50%] translate-x-[-50%]">
      <div
        className={cx(
          "flex items-center py-1 px-4 m-auto rounded-md w-fit",
          "bg-slate-800 text-white",
          "animate-fade-in",
          {
            "!text-rose-500": isError,
          },
        )}
      >
        {isError && (
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="mr-2 text-rose-500"
          />
        )}
        {content}
        <button
          className="ml-2 rounded py-1 px-2 hover:bg-slate-700"
          onClick={() => setNotificationState(initialState)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </BodyColumn>
  );
};

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { content, isError } = state;

  const setNotificationState = useCallback(
    (newState: NotificationState) => {
      dispatch({
        type: actionTypes.SET_STATE,
        ...newState,
      });
    },
    [dispatch],
  );

  return (
    <NotificationContext.Provider value={{ setNotificationState }}>
      <Notification
        content={content}
        isError={isError}
        setNotificationState={setNotificationState}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
