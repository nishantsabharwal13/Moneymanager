export default formatDate = date => {

  const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  let formatedDate = new Date(date);
  const day = formatedDate.getDate();
  const monthIndex = formatedDate.getMonth();
  const year = formatedDate.getFullYear();

  return  `${monthNames[monthIndex]} ${day}, ${year}`;
}