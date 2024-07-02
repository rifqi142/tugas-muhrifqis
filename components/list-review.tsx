"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getInitials = (name: string) => {
  if (!name) return "";
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials.length > 2 ? initials.slice(0, 2) : initials;
};

interface ListReviewProps {
  cname: string;
  crating: number;
  ccomment: string;
}

const ListReview: React.FC<ListReviewProps> = ({
  cname,
  crating,
  ccomment,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? faStar : faStarEmpty}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const initials = getInitials(cname);

  return (
    <Card className="w-[300px]">
      <CardContent className="mt-5 flex justify-between gap-5">
        <div className="flex flex-col items-center justify-center">
          <Avatar>
            <AvatarImage src="" alt={cname} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <h2 className="bold-16 mt-2">{cname}</h2>
        </div>

        <div>
          <div className="flex mt-3">{renderStars(crating)}</div>
          <p className="regular-14 text-muted-foreground mt-3">{ccomment}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListReview;
