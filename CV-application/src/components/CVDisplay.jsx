import Icon from '@mdi/react';
import '../styles/CVDisplay.css';
import { mdiEmail, mdiMapMarker, mdiPhone } from '@mdi/js';

export default function CVDisplay({ className, displayData }) {
  const { header, education, jobs } = displayData;
  return (
    <div className="display-wrapper">
      <div className={className}>
        <div className="header">
          <h2>{header.fullName}</h2>
          <div className="contact-info">
            <Icon path={mdiPhone} /> {header.phone}
            <Icon path={mdiEmail} /> {header.email}
            <Icon path={mdiMapMarker} /> {header.address}
          </div>
        </div>
        <div className="education-display">
          <h2>Education</h2>
          {education.map((item) => (
            <div className="card">
              <div className="date-and-location">
                <p className="date">{`${item['start-date']} - ${item['end-date'] === '' ? 'present' : item['end-date']}`}</p>
                <p className="location">{item.location}</p>
              </div>
              <div className="school-and-degree">
                <h3 className="school">{item.school}</h3>
                <p className="degree">{item.degree}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="jobs-display">
          <h2>Professional experience</h2>
          {jobs.map((item) => (
            <div className="card">
              <div className="date-and-location">
                <p className="date">{`${item['start-date']} - ${item['end-date'] === '' ? 'present' : item['end-date']}`}</p>
                <p className="location">{item.location}</p>
              </div>
              <div className="company-and-position">
                <h3 className="company">{item.company}</h3>
                <p className="position">{item.position}</p>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
