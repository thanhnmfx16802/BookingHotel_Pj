function status(dateStart, dateEnd) {
  const currentDate = new Date();
  if (currentDate > dateEnd) {
    return "Checkout";
  } else if (currentDate < dateStart) {
    return "Booked";
  } else return "Checkin";
}
export default status;
