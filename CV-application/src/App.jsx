import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Buttons';
import Form from './components/Form';
import CVDisplay from './components/CVDisplay';
import { v4 as uuidv4 } from 'uuid';
import Icon from '@mdi/react';
import {
  mdiCancel,
  mdiContentSave,
  mdiTrashCanOutline,
  mdiPencilOutline,
  mdiEye,
  mdiEyeClosed,
  mdiEraser,
  mdiUpload,
} from '@mdi/js';
import {
  defaultPersonalInfo,
  exampleEducation,
  exampleInfo,
  exampleJobs,
  newEducationForm,
  newJobForm,
} from './forms.jsx';

function App() {
  // * Hooks
  const [personalInfo, setPersonalInfo] = useState(() => {
    const stored = localStorage.getItem('personalInfo');
    return stored ? JSON.parse(stored) : defaultPersonalInfo;
  });

  const [educationForms, setEducationForms] = useState(() => {
    const stored = localStorage.getItem('educationForms');
    return stored ? JSON.parse(stored) : [];
  });

  const [jobForms, setJobForms] = useState(() => {
    const stored = localStorage.getItem('jobForms');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('educationForms', JSON.stringify(educationForms));
  }, [educationForms]);

  useEffect(() => {
    localStorage.setItem('jobForms', JSON.stringify(jobForms));
  }, [jobForms]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  // * Helpers and handlers
  function processFormsUpdate(formData) {
    let allPropertiesEmpty = true;

    Object.keys(formData).forEach((key) => {
      if (key !== 'id' && formData[key]) {
        allPropertiesEmpty = false;
      }
    });

    if (allPropertiesEmpty) {
      return handleFormDeletion(formData.id);
    }
    function sortForms(forms) {
      return forms.sort((a, b) => {
        const endDateA = a.inputs.find(
          (input) => input.name === 'end-date',
        )?.value;
        const endDateB = b.inputs.find(
          (input) => input.name === 'end-date',
        )?.value;

        // Convert end-dates to Date objects, use current date if end-date is empty or invalid
        const dateA = endDateA ? new Date(endDateA) : new Date();
        const dateB = endDateB ? new Date(endDateB) : new Date();

        return dateB - dateA;
      });
    }

    function updateForms(forms, formData) {
      const updatedForms = forms.map((form) => {
        if (form.id === formData.id) {
          const updatedInputs = form.inputs.map((input) => {
            return {
              ...input,
              value:
                formData[input.name] !== undefined
                  ? formData[input.name]
                  : input.value,
            };
          });

          return { ...form, inputs: updatedInputs, isEditing: false };
        }
        return form;
      });

      return sortForms(updatedForms);
    }

    if (formData.id === 'personal-info') {
      const updatedInputs = personalInfo.inputs.map((input) => {
        return {
          ...input,
          value:
            formData[input.name] !== undefined
              ? formData[input.name]
              : input.value,
        };
      });

      setPersonalInfo({
        ...personalInfo,
        inputs: updatedInputs,
        isEditing: false,
      });
    } else if (formData.id.startsWith('education-')) {
      setEducationForms((prevForms) => updateForms(prevForms, formData));
    } else if (formData.id.startsWith('job-')) {
      setJobForms((prevForms) => updateForms(prevForms, formData));
    }
    setIsFormOpen(false);
  }

  function handleClear() {
    localStorage.clear();

    setPersonalInfo(defaultPersonalInfo);
    setEducationForms([]);
    setJobForms([]);
  }

  function loadExample() {
    localStorage.clear();

    setPersonalInfo(exampleInfo);
    setEducationForms(exampleEducation);
    setJobForms(exampleJobs);
  }

  function toggleShow(formId) {
    setEducationForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, isVisible: !form.isVisible } : form,
      ),
    );
    setJobForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, isVisible: !form.isVisible } : form,
      ),
    );
  }
  function createNewForm(formType) {
    if (formType === 'education') {
      const newForm = newEducationForm;
      setEducationForms((prevForms) => [...prevForms, newForm]);
    } else if (formType === 'jobs') {
      const newForm = newJobForm;
      setJobForms((prevForms) => [...prevForms, newForm]);
    }
    setIsFormOpen(true);
  }
  function handleFormDeletion(formId) {
    setEducationForms((prevForms) =>
      prevForms.filter((form) => form.id !== formId),
    );
    setJobForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    setIsFormOpen(false);
  }
  function handleEdit(formToEdit) {
    setIsFormOpen(true);

    setPersonalInfo((prevInfo) => ({ ...prevInfo, isEditing: true }));

    setEducationForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formToEdit.id ? { ...form, isEditing: true } : form,
      ),
    );
    setJobForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formToEdit.id ? { ...form, isEditing: true } : form,
      ),
    );
  }

  function setInitialData(form) {
    const currentValues = {};

    form.inputs.forEach((input) => {
      currentValues[input.name] = input.value || '';
    });

    return currentValues;
  }

  function prepareDataForDisplay(personalInfo, educationForms, jobForms) {
    const header = {};
    const education = [];
    const jobs = [];

    personalInfo.inputs.forEach((input) => {
      header[input.name] = input.value;
    });

    educationForms.forEach((form) => {
      if (form.isVisible !== false) {
        const educationData = {};
        form.inputs.forEach((input) => {
          educationData[input.name] = input.value;
        });
        education.push(educationData);
      }
    });

    jobForms.forEach((form) => {
      if (form.isVisible !== false) {
        const jobData = {};
        form.inputs.forEach((input) => {
          jobData[input.name] = input.value;
        });
        jobs.push(jobData);
      }
    });

    return {
      header,
      education,
      jobs,
    };
  }

  return (
    <>
      <div className="forms">
        <div className="title">
          <h1>CV Builder</h1>
          <p className="print">
            Press <kbd>Ctrl + P</kbd> or <kbd>Cmd + P</kbd> to print
          </p>
          <p className="print">
            (<i>Set margins to</i> '<b>None</b>')
          </p>
          <div className="buttons-wrapper">
            <Button onClick={handleClear}>
              <Icon path={mdiEraser} /> Clear
            </Button>
            <Button onClick={loadExample}>
              <Icon path={mdiUpload} /> Load example CV
            </Button>
          </div>
        </div>
        <div className="forms-wrapper">
          <Form
            className="input-forms"
            id={personalInfo.id}
            isEditing={personalInfo.isEditing}
            title={personalInfo.title}
            inputs={personalInfo.inputs}
            buttons={personalInfo.buttons}
            onSubmit={processFormsUpdate}
            onReset={processFormsUpdate}
            onEdit={() => handleEdit(personalInfo)}
            initialData={setInitialData(personalInfo)}
          ></Form>
          <div className="education">
            <h2>Education</h2>
            {educationForms.map((form) => (
              <>
                {!form.isEditing && !isFormOpen && (
                  <div
                    key={form.id}
                    className="form-wrapper"
                    onClick={() => handleEdit(form)}
                  >
                    <p>
                      <i>{form.inputs[1].value}</i> @{' '}
                      <b>{form.inputs[0].value}</b>
                    </p>
                    <Button
                      id={uuidv4()}
                      className="toggle-show"
                      name="toggle-show"
                      onClick={() => toggleShow(form.id)}
                    >
                      {form.isVisible ? (
                        <Icon path={mdiEye} />
                      ) : (
                        <Icon path={mdiEyeClosed} />
                      )}
                    </Button>
                  </div>
                )}
                {form.isEditing && (
                  <Form
                    className="input-forms"
                    id={form.id}
                    inputs={form.inputs}
                    buttons={form.buttons}
                    onSubmit={processFormsUpdate}
                    onReset={processFormsUpdate}
                    onDelete={() => handleFormDeletion(form.id)}
                    initialData={setInitialData(form)}
                  />
                )}
              </>
            ))}
            {!isFormOpen && (
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
              <>
                {!form.isEditing && !isFormOpen && (
                  <div
                    key={form.id}
                    className="form-wrapper"
                    onClick={() => handleEdit(form)}
                  >
                    <p>
                      <i>{form.inputs[1].value}</i> @{' '}
                      <b>{form.inputs[0].value}</b>
                    </p>
                    <Button
                      id={uuidv4()}
                      className="toggle-show"
                      name="toggle-show"
                      onClick={() => toggleShow(form.id)}
                    >
                      {form.isVisible ? (
                        <Icon path={mdiEye} />
                      ) : (
                        <Icon path={mdiEyeClosed} />
                      )}
                    </Button>
                  </div>
                )}
                {form.isEditing && (
                  <Form
                    className="input-forms"
                    id={form.id}
                    inputs={form.inputs}
                    buttons={form.buttons}
                    onSubmit={processFormsUpdate}
                    onReset={processFormsUpdate}
                    onDelete={() => handleFormDeletion(form.id)}
                    initialData={setInitialData(form)}
                  />
                )}
              </>
            ))}
            {!isFormOpen && (
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
      </div>

      <CVDisplay
        className="display"
        displayData={prepareDataForDisplay(
          personalInfo,
          educationForms,
          jobForms,
        )}
      ></CVDisplay>
    </>
  );
}

export default App;
