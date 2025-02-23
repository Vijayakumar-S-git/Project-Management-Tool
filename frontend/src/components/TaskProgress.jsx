import React from 'react';

const TaskProgress = ({ progress, status, deadline }) => {
  return (
    <div>
      <p>Task progress: {progress}%</p>
      <p className="text-red-500">{status}, {deadline}</p>
    </div>
  );
};

export default TaskProgress;