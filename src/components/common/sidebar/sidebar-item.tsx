/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import SidebarDropdown from "./sidebar-dropdown";

interface SidebarItemProps {
  item: any;
  pageName: string;
  setPageName: (pageName: string) => void;
}

const SidebarItem = ({ item, pageName, setPageName }: SidebarItemProps) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = (item: any) => {
    if (item.route === location.pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  const Icon = item?.icon;

  return (
    <>
      <li>
        <Link
          to={`${item.route}`}
          onClick={handleClick}
          className={`${isItemActive ? " text-primary font-bold" : "text-[#667185] font-medium "
            } group relative flex items-center gap-5 rounded-tl-sm rounded-bl-sm px-4 py-3 font-inter font-base  duration-300 ease-in-out `}
        >
          <Icon
            className={`text-2xl  ${isItemActive ? "text-primary" : "text-[#667185]"
              }`}
          />
          {item.label}
          {item.children && (
            <svg
              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${pageName === item.label.toLowerCase() && "rotate-180"
                }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </Link>

        {item.children && (
          <div
            className={`translate transform overflow-hidden ${pageName !== item.label.toLowerCase() && "hidden"
              }`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;
