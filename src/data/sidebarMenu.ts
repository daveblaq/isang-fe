import { PiBriefcaseBold, PiChatsBold, PiMoneyWavyBold } from "react-icons/pi";
import { PiHouseBold } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";

type menuGroupsType = {
  name: string;
  menuItems: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
    route: string;
  }[];
};

export const menuGroups: menuGroupsType[] = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: PiHouseBold,
        label: "Home",
        route: "/dashboard/talent",
      },
      {
        icon: BiSearch,
        label: "Find Jobs",
        route: "/dashboard/talent/find-jobs",
      },
      {
        icon: PiBriefcaseBold,
        label: "My Jobs",
        route: "/dashboard/talent/my-jobs",
      },
      {
        icon: PiChatsBold,
        label: "Conversations",
        route: "/dashboard/conversations",
      },
      {
        icon: PiMoneyWavyBold,
        label: "Earnings",
        route: "/dashboard/notifications",
      },
    ],
  },
];


