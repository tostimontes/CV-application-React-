import '../styles/CVDisplay.css';

export default function CVDisplay({ className, displayData }) {
  // TODO: each edu and job form should have an identifier or something so that it groups each card and both education and jobs can be iterated over in a uniform way
  const { header, education, jobs } = displayData;
  return (
    <div className={className}>
      <div className="header">
        <h2>Hola World</h2>
        <p>{header.fullName}</p>
        {education.map(item => {
          return (
            <p>{item.company}</p>
          )
        })}
        <p>{}</p>
        <p>{}</p>
        <p>{}</p>
      </div>
      <div className="education-display">
        <h2>Education</h2>
        <div className="card">
          {education.map(item => {

          })}
        </div>
      </div>
      <div className="jobs-display">
        <h2>Professional experience</h2>
      </div>
    </div>
  );
}
