import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Buttons';
import Form from './components/Form';
import CVDisplay from './components/CVDisplay';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Hooks
  const [personalInfo, setPersonalInfo] = useState({
    id: uuidv4(),
    title: 'Personal information',
    inputs: [
      {
        name: 'fullName',
        value: '',
        placeholder: 'Enter your full name',
        type: 'text',
        id: uuidv4(),
        className: 'full-name',
        isRequired: true,
        dataLabel: 'Full name',
      },
      {
        name: 'email',
        value: '',
        placeholder: 'Enter your email',
        type: 'email',
        id: uuidv4(),
        className: 'email',
        isRequired: true,
        dataLabel: 'Email',
      },
      {
        name: 'phone',
        value: '',
        placeholder: 'Enter your phone number',
        type: 'text',
        id: uuidv4(),
        className: 'phone-number',
        isRequired: true,
        dataLabel: 'Phone number',
      },
      {
        name: 'address',
        value: '',
        placeholder: 'Zip code, city, country',
        type: 'text',
        id: uuidv4(),
        className: 'address',
        isRequired: true,
        dataLabel: 'Address',
      },
    ],
    buttons: [
      {
        name: 'cancel',
        type: 'reset',
        className: 'cancel-button',
        id: uuidv4(),
        children: ['Cancel', 'C'],
      },
      {
        name: 'save',
        type: 'submit',
        className: 'save-button',
        id: uuidv4(),
        children: ['Save', 'S'],
      },
    ],
  });
  const [educationForms, setEducationForms] = useState([]);
  const [jobForms, setJobForms] = useState([]);

  const [isAddingNewForm, setIsAddingNewForm] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  // Helpers and handlers
  const handleFormSubmit = (formData) => {
    if (formData.id === 'personalInfo') {
      setPersonalInfo((prevInfo) => ({
        ...prevInfo,
        inputs: prevInfo.inputs.map((input) => ({
          ...input,
          value: formData[input.name] || input.value,
        })),
      }));
    } else {
      function updateForms(forms) {
        return forms.map((form) => {
          if (form.id === formData.id) {
            return { ...form, ...formData, isEditing: false };
          }
          return form;
        });
      }

      if (formData.id.startsWith('education-')) {
        setEducationForms((prevForms) => updateForms(prevForms));
      } else if (formData.id.startsWith('job-')) {
        setJobForms((prevForms) => updateForms(prevForms));
      }
      setIsAddingNewForm(false);
    }
  };

  function handleFormEdit() {}

  function toggleShow(form) {
    // update CVDisplay
  }

  function createNewForm(formType) {
    if (formType === 'education') {
      const newForm = {
        id: `education-${uuidv4()}`,
        isEditing: true,
        inputs: [
          {
            name: 'school',
            value: '',
            placeholder: 'Enter school / university',
            type: 'text',
            id: uuidv4(),
            className: 'school',
            isRequired: true,
            dataLabel: 'School',
          },
          {
            name: 'degree',
            value: '',
            placeholder: 'Enter degree / diploma',
            type: 'text',
            id: uuidv4(),
            className: 'degree',
            isRequired: true,
            dataLabel: 'Degree / Diploma',
          },
          {
            name: 'start-date',
            value: '',
            placeholder: 'Enter start date',
            type: 'date',
            id: uuidv4(),
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '',
            placeholder: 'Enter end date',
            type: 'date',
            id: uuidv4(),
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: '',
            placeholder: 'Enter city, country',
            type: 'text',
            id: uuidv4(),
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: uuidv4(),
            children: ['Delete', 'D'],
            onClick: handleFormDelete,
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: uuidv4(),
            children: ['Cancel', 'C'],
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: uuidv4(),
            children: ['Save', 'S'],
          },
        ],
      };
      setEducationForms((prevForms) => [...prevForms, newForm]);
    } else if (formType === 'jobs') {
      const newForm = {
        id: `job-${uuidv4()}`,
        isEditing: true,
        inputs: [
          {
            name: 'company',
            value: '',
            placeholder: 'Enter company name',
            type: 'text',
            id: uuidv4(),
            className: 'company',
            isRequired: true,
            dataLabel: 'Company',
          },
          {
            name: 'position',
            value: '',
            placeholder: 'Enter position / role',
            type: 'text',
            id: uuidv4(),
            className: 'position',
            isRequired: true,
            dataLabel: 'Position / Role',
          },
          {
            name: 'start-date',
            value: '',
            placeholder: 'Enter start date',
            type: 'date',
            id: uuidv4(),
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '',
            placeholder: 'Enter end date',
            type: 'date',
            id: uuidv4(),
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: '',
            placeholder: 'Enter city, country',
            type: 'text',
            id: uuidv4(),
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: uuidv4(),
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: uuidv4(),
            children: ['Delete', 'D'],
            onClick: handleFormDelete,
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: uuidv4(),
            children: ['Cancel', 'C'],
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: uuidv4(),
            children: ['Save', 'S'],
          },
        ],
      };
      setJobForms((prevForms) => [...prevForms, newForm]);
    }
    setIsAddingNewForm(true);
  }

  // TODO: add functionality to delete button
  function handleFormCancel() {
    // take advantage of form onReset to reestablish old values
  }

  function handleFormDelete() {}

  function handleEdit(formToEdit) {
    setEducationForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formToEdit.id ? { ...form, isEditing: true } : form,
      ),
    );
    // TODO: populate form for edition with old values
  }

  // Arrays to pass props to components

  const exampleEducation = {
    inputs: [],
    buttons: [],
  };

  const exampleJobs = {
    inputs: [],
    buttons: [],
  };

  return (
    <>
      <h1>CV Builder</h1>
      <div className="forms">
        <Form
          id={personalInfo.id}
          title={personalInfo.title}
          inputs={personalInfo.inputs}
          buttons={personalInfo.buttons}
          onSubmit={handleFormSubmit}
        ></Form>
        <div className="education">
          <h2>Education</h2>
          {educationForms.map((form) => (
            <>
              {!form.isEditing && (
                <>
                  <div
                    key={form.id}
                    className="form-wrapper"
                    onClick={() => handleEdit(form)}
                  >
                    {`${form.degree} from ${form.school} `}
                    <Button
                      id={uuidv4()}
                      className="toggle-show"
                      name="toggle-show"
                      onClick={() => toggleShow()}
                    >
                      {/* TODO: the SVG should change depending on hide state */}
                      {'SVG'}
                    </Button>
                  </div>
                </>
              )}
              {form.isEditing && (
                <Form
                  id={form.id}
                  inputs={form.inputs}
                  buttons={form.buttons}
                  onSubmit={handleFormSubmit}
                  onDelete={handleFormDelete}
                  onReset={handleFormCancel}
                  onEdit={handleFormEdit}
                />
              )}
            </>
          ))}
          {!isAddingNewForm && (
            <Button
              id={uuidv4()}
              className="add-button"
              name="add-education"
              onClick={() => createNewForm('education')}
            >
              {'+ Education'}
            </Button>
          )}
        </div>
        <div className="jobs">
          <h2>Professional experience</h2>
          {jobForms.map((form) => (
            <div
              key={form.id}
              className="form-wrapper"
              onClick={() => handleEdit(form.id)}
            >
              {`${form.position} at ${form.company} `}
              {form.isEditing && (
                <Form
                  id={form.id}
                  inputs={form.inputs}
                  buttons={form.buttons}
                  onSubmit={handleFormSubmit}
                  onDelete={handleFormDelete}
                  onReset={handleFormCancel}
                  onEdit={handleFormEdit}
                />
              )}
              {!form.isEditing && (
                <Button
                  id={uuidv4()}
                  className="toggle-show"
                  name="toggle-show"
                  onClick={toggleShow}
                >
                  {'SVG'}
                </Button>
              )}
            </div>
          ))}
          {!isAddingNewForm && (
            <Button
              id={uuidv4()}
              className="add-button"
              name="add-job"
              onClick={() => createNewForm('jobs')}
            >
              {'+ Job'}
            </Button>
          )}
        </div>
      </div>
      {/* 
    <CVDisplay></CVDisplay> 
    */}
    </>
  );
}

export default App;
