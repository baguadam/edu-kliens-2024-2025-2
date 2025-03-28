/* eslint-disable react/prop-types */
const Result = ({ wrongTips, maxWrongTips }) => {
  return (
    <div id="eredmeny">
      {wrongTips}/{maxWrongTips}
    </div>
  );
};

export default Result;
