import '../styles/CVDisplay.css'

export default function CVDisplay({props}) {
    

    return (
        <>
            <div className="CVDisplay">
                <div className="personal-info">
                    <h2>{name}</h2>
                    <div className="contact-info">
                        <div className="email">{email}</div>
                        <div className="phone">{phone}</div>
                        <div className="city">{city}</div>
                    </div>
                </div>
                <div className="education">
                    <h2>Education</h2>
                    {education.map()}
                </div>
                <div className="professional-experience">
                    <h2>Professional experience</h2>
                    {jobs.map()}
                </div>
            </div>
        </>
    )
}