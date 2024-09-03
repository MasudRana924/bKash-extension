exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}.${minutes} ${amOrPm} ${day}/${month}/${year}`;
}
