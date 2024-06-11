import "./Footer.css";

export const Footer = () => {
  const infoFooter = [
    {
      col_number: 1,
      col_values: [
        "Countries",
        "Regions",
        "Cities",
        "Districts",
        "Airports",
        "Hotels",
      ],
    },
    {
      col_number: 2,
      col_values: [
        "Homes",
        "Apartments",
        "Resorts",
        "Villas",
        "Hostels",
        "Guest houses",
      ],
    },
    {
      col_number: 3,
      col_values: [
        "Unique places to stay",
        "Reviews",
        "Unpacked: Travel articles",
        "Travel communities",
        "Seasonal and holiday deals",
      ],
    },
    {
      col_number: 4,
      col_values: [
        "Car rental",
        "Flight Finder",
        "Restaurant reservations",
        "Travel Agents",
      ],
    },
    {
      col_number: 5,
      col_values: [
        "Curtomer Service",
        "Partner Help",
        "Careers",
        "Sustainability",
        "Press center",
        "Safety Resource Center",
        "Investor relations",
        "Terms & conditions",
      ],
    },
  ];

  return (
    <div className="footerList">
      {infoFooter.map((item) => {
        return (
          <FooterItem key={item.col_number} listFooter={item.col_values} />
        );
      })}
    </div>
  );
};

const FooterItem = (props) => {
  return (
    <ul>
      {props.listFooter.map((content, i) => {
        return <li key={i}>{content}</li>;
      })}
    </ul>
  );
};
