import { useState, useEffect } from "react";

function Notif({
  className = "",
  avatar,
  display_name_id_sender,
  type_notif,
  created_at,
}) {
  function parseDateFrenchFormat(dateStr) {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute, second] = timePart.split(":");

    return new Date(year, month - 1, day, hour, minute, second);
  }

  function getNotifMessage(type, senderName, created_at) {
    // console.log("RAW created_at:", created_at);

    const date = parseDateFrenchFormat(created_at);

    const formattedDate = `${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
    // console.log("formattedDate", formattedDate);
    switch (type) {
      case "like":
        return `${senderName} liked one of your post on ${formattedDate}.`;
      case "comment":
        return `${senderName} commented one of your post on ${formattedDate}.`;
      case "follow":
        return `${senderName} started following you on ${formattedDate}.`;
      case "unfollow":
        return `${senderName} stopped following you on ${formattedDate}.`;
      case "repost":
        return `${senderName} reposted one of your post on ${formattedDate}.`;
      default:
        return `${senderName} sent you a notification on ${formattedDate}.`;
    }
  }

  const messageNotif = getNotifMessage(
    type_notif,
    display_name_id_sender,
    created_at
  );

  return (
    <>
      <div
        id="post-container"
        className={`h-fit w-5/6 relative rounded-2xl p-4 ring-2 ring-black dark:ring-white flex flex-row gap-2 items-center ${className}`}
      >
        <div id="profile-image" className="w-8 h-8 aspect-square flex-none">
          <img
            src={avatar}
            className="w-8 h-8 aspect-square object-cover bg-transparent ring-[#ff6600] rounded-xl ring-2 flex-none shrink-0"
          />
        </div>
        <div
          id="message"
          className=" dark:text-white font-roboto text-base"
        >
          {messageNotif}
        </div>
      </div>
    </>
  );
}

export default Notif;
