import { useCallback, useEffect, useMemo, useState } from "react";
import { getCleanedUpClassNames } from "./utilities";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRoomById } from "./api";
import RoomIdInput from "../components/RoomIdInput";

export const useClassNames = (classNames) =>
  useMemo(() => getCleanedUpClassNames(classNames), [classNames]);

export const useClickOutside = (ref, handler) => {
  const clickHandler = useCallback(
    (event) =>
      ref.current && !ref.current.contains(event.target) && handler(event),
    [handler, ref]
  );

  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, [clickHandler]);
};

export const useRoomId = (roomDataHandler) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const urlRetrievedId = searchParams?.get("roomId");

  const navigate = useNavigate();

  useEffect(() => {
    if (!urlRetrievedId) {
      setIsLoading(false);
      return;
    }

    const loadRoomFromUrl = async () => {
      const room = await getRoomById(urlRetrievedId);
      if (room) setIsLoading(false);
      roomDataHandler(room);
    };

    loadRoomFromUrl();
  }, [navigate, roomDataHandler, urlRetrievedId]);

  return {
    isLoadingRoomFromUrl: isLoading,
    RoomIdInput: () => <RoomIdInput handleSuccess={roomDataHandler} />,
  };
};
