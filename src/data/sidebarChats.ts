export type SidebarSection = {
  date: string;
  items: Array<{ id: string; title: string; subtitle: string }>;
};

export const chatSections: SidebarSection[] = [
  {
    date: "Today",
    items: [
      {
        id: "chat-1",
        title: "Cape Town Escape",
        subtitle: "Traveler • 2:30 PM",
      },
      {
        id: "chat-2",
        title: "Lagos Food Tour",
        subtitle: "Explorer • 9:15 AM",
      },
      {
        id: "chat-3",
        title: "Lagos Food Tour",
        subtitle: "Explorer • 9:15 AM",
      },
      {
        id: "chat-4",
        title: "Lagos Food Tour",
        subtitle: "Explorer • 9:15 AM",
      },
      {
        id: "chat-5",
        title: "Lagos Food Tour",
        subtitle: "Explorer • 9:15 AM",
      },
      {
        id: "chat-6",
        title: "Lagos Food Tour",
        subtitle: "Explorer • 9:15 AM",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      { id: "chat-3", title: "Paris Getaway", subtitle: "Nomad • 7:45 PM" },
      { id: "chat-4", title: "Nairobi Trek", subtitle: "Guide • 11:20 AM" },
    ],
  },
];

export const tripSections: SidebarSection[] = [
  {
    date: "This week",
    items: [
      { id: "trip-1", title: "Tokyo Discovery", subtitle: "Departing Thu" },
      { id: "trip-2", title: "Lisbon Weekend", subtitle: "Departing Sat" },
    ],
  },
  {
    date: "Next week",
    items: [
      { id: "trip-3", title: "Accra Culture Tour", subtitle: "Departing Mon" },
      { id: "trip-4", title: "Zanzibar Retreat", subtitle: "Departing Fri" },
    ],
  },
];

