/* eslint-disable react/prop-types */
const TrackDetailsButton = ({ url, bgColor, icon, label }) => {
  return (
    <a href={url} className={`ui button tiny ${bgColor} button`} target="_blank">
      <i className={`${icon} icon`}></i>
      {label}
    </a>
  );
};

export default TrackDetailsButton;
