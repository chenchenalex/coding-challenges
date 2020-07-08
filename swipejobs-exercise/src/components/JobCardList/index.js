import React, { useState } from "react";
import styled from "styled-components";
import JobCard from "./JobCard";
import MockJobs from "../../API/mockData/jobs";

const StyledJobList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    > li {
      margin-bottom: 15px;
    }
  }
`;
function JobCardList({ workerId }) {
  const [jobData] = useState(MockJobs);

  return (
    <StyledJobList>
      {jobData.map((job) => (
        <li key={job.jobId}>
          <JobCard job={job} />
        </li>
      ))}
    </StyledJobList>
  );
}

export default JobCardList;
