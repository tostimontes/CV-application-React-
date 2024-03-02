import '../styles/CVDisplay.css';

export default function CVDisplay({ className, displayData }) {
  const { header, education, jobs } = displayData;
  return (
    <div className={className}>
      <div className="header">
        <h2>Hola World</h2>
        <div className='contact-info'>
          {header.fullName} {header.phone} {header.email} {header.address}
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
  );
}
