import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";

interface User {
  userName: string;
}

function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = "#" + hex.toString(16);

  return color;
}

export default function AvatarGenerator({ userName }: User) {
  return (
    <Avatar
      style={{
        backgroundColor: randomColor(),
      }}
    >
      {userName.charAt(0)}
    </Avatar>
  );
}
