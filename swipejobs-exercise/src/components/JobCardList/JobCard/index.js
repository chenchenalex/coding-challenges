import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faTools,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  StyledJobCard,
  StyledJobDescription,
  StyledJobHeading,
} from "./styles";
import { formatPhone } from "../../../utils";

function JobCard({ job }) {
  if (!job) {
    return <>Error, No job data provided</>;
  }

  const {
    jobTitle,
    company,
    milesToTravel,
    wagePerHourInCents,
    shifts,
    requirements,
  } = job;

  return (
    <StyledJobCard>
      <StyledJobHeading>
        <img src={jobTitle.imageUrl} alt={jobTitle.name} />
        <h1>{jobTitle.name}</h1>
        <h2>{company.name}</h2>
      </StyledJobHeading>

      <StyledJobDescription>
        {/* Main section */}
        <section className="heading">
          <div>
            <p className="heading_label">Distance</p>
            <span className="heading_value">
              {milesToTravel.toFixed(2)} miles
            </span>
          </div>
          <div>
            <p className="heading_label">Hourly Rate</p>
            <span className="heading_value">
              <sup>$</sup>
              {(wagePerHourInCents / 100).toFixed(2)}
            </span>
          </div>
        </section>

        {/* Date section */}
        <section className="dates">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="content">
            <p className="title">ShiftDates</p>
            <ul>
              {shifts.map((shift) => (
                <li key={shift.startDate}>
                  {shift.startDate} - {shift.endDate}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Location section */}
        <section className="location">
          <div className="icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className="content">
            <p className="title">Location</p>
            <p className="value">{company.address.formattedAddress}</p>
            <p className="info">
              {milesToTravel} miles from your job search location
            </p>
          </div>
        </section>

        {/* Requirement section */}
        {requirements && (
          <section className="requirement">
            <div className="icon">
              <FontAwesomeIcon icon={faTools} />
            </div>
            <div className="content">
              <p className="title">Requirement</p>
              <ul className="value">
                {requirements.map((requirement) => (
                  <li key={requirement}>- {requirement}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Report section */}
        {company.reportTo && (
          <section className="requirement">
            <div className="icon">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div className="content">
              <p className="title">Report To</p>
              <p className="value">
                {`${company.reportTo.name} ${formatPhone(
                  company.reportTo.phone,
                )}`}
              </p>
            </div>
          </section>
        )}
      </StyledJobDescription>
    </StyledJobCard>
  );
}

export default JobCard;
