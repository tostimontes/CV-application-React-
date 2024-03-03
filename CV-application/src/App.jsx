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

function App() {
  // Hooks
  const [personalInfo, setPersonalInfo] = useState(() => {
    const stored = localStorage.getItem('personalInfo');
    return stored
      ? JSON.parse(stored)
      : {
          id: 'personal-info',
          isEditing: true,
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
              iconPath: mdiCancel,
              text: 'Cancel',
            },
            {
              name: 'save',
              type: 'submit',
              className: 'save-button',
              id: uuidv4(),
              iconPath: mdiContentSave,
              text: 'Save',
            },
            {
              name: 'edit',
              type: 'button',
              className: 'edit-button',
              id: uuidv4(),
              iconPath: mdiPencilOutline,
              text: 'Edit',
            },
          ],
        };
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

      return sortForms(updatedForms); // Sort the forms after updating
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
    setPersonalInfo({
      id: 'personal-info',
      isEditing: true,
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
          iconPath: mdiCancel,
          text: 'Cancel',
        },
        {
          name: 'save',
          type: 'submit',
          className: 'save-button',
          id: uuidv4(),
          iconPath: mdiContentSave,
          text: 'Save',
        },
        {
          name: 'edit',
          type: 'button',
          className: 'edit-button',
          id: uuidv4(),
          iconPath: mdiPencilOutline,
          text: 'Edit',
        },
      ],
    });
    setEducationForms([]);
    setJobForms([]);
  }

  function loadExample() {
    localStorage.clear();

    const exampleInfo = {
      id: 'personal-info',
      isEditing: true,
      title: 'Personal information',
      inputs: [
        {
          name: 'fullName',
          value: 'Jane Doe',
          placeholder: 'Enter your full name',
          type: 'text',
          id: '35a12a3d-07d3-43eb-95fb-5b5ee5311d19',
          className: 'full-name',
          isRequired: true,
          dataLabel: 'Full name',
        },
        {
          name: 'email',
          value: 'janedoe@example.com',
          placeholder: 'Enter your email',
          type: 'email',
          id: 'a712dd61-358c-45c4-9a36-406ea34b6917',
          className: 'email',
          isRequired: true,
          dataLabel: 'Email',
        },
        {
          name: 'phone',
          value: '987 654 321',
          placeholder: 'Enter your phone number',
          type: 'text',
          id: '4898b11e-0289-49f5-bb20-665028367946',
          className: 'phone-number',
          isRequired: true,
          dataLabel: 'Phone number',
        },
        {
          name: 'address',
          value: '12544 Chucklebay, AZ',
          placeholder: 'Zip code, city, country',
          type: 'text',
          id: '81fc9bae-6164-4770-93e6-a15a64980b25',
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
          id: '88ba4ec5-8320-4f94-b46f-d558f6dad585',
          iconPath:
            'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
          text: 'Cancel',
        },
        {
          name: 'save',
          type: 'submit',
          className: 'save-button',
          id: '753da3ce-c750-4405-907f-508ac6ef522c',
          iconPath:
            'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
          text: 'Save',
        },
        {
          name: 'edit',
          type: 'button',
          className: 'edit-button',
          id: 'a501e952-d695-4e9e-ab76-6dbc75002517',
          iconPath:
            'M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z',
          text: 'Edit',
        },
      ],
    };
    const exampleJobs = [
      {
        id: 'job-9f848028-3bee-4793-95ef-b7b9715bc6a9',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'company',
            value: 'Holly Jolly',
            placeholder: 'Enter company name',
            type: 'text',
            id: '9cc0826f-0932-4ed1-8c4f-fe20a947b109',
            className: 'company',
            isRequired: true,
            dataLabel: 'Company',
          },
          {
            name: 'position',
            value: 'Candy Taster',
            placeholder: 'Enter position / role',
            type: 'text',
            id: '045ea1a8-77bf-4cd7-8b0c-336b375630de',
            className: 'position',
            isRequired: true,
            dataLabel: 'Position / Role',
          },
          {
            name: 'start-date',
            value: '2023-01-02',
            placeholder: 'Enter start date',
            type: 'date',
            id: '99ef8217-0f53-4e8a-bda1-f8f89e36a809',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '',
            placeholder: 'Enter end date',
            type: 'date',
            id: '1974137d-748d-4c5a-9824-5d97b3b4269f',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'Monterrey, Mexico',
            placeholder: 'Enter city, country',
            type: 'text',
            id: 'ea404bca-6084-45bc-8206-8a942a8c6cf9',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: "I literally just taste candy all day. It's not that fun",
            placeholder: 'Enter description',
            type: 'textarea',
            id: '462f2e3e-bd81-4e67-94a8-3d694238ed0b',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: '072592e2-56c5-4d37-a576-4e62667498cf',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: '6353005b-3594-47f6-994f-ab464573afb5',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: '8e03bfab-f221-44d2-8f8c-6b3d45fb2ca5',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
      {
        id: 'job-aced7989-e447-474b-851b-8e635df64d6c',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'company',
            value: 'The Odin Project',
            placeholder: 'Enter company name',
            type: 'text',
            id: '1a4176e8-c16a-4215-b284-2f677c9cc450',
            className: 'company',
            isRequired: true,
            dataLabel: 'Company',
          },
          {
            name: 'position',
            value: 'Pull Request Merger (Internship)',
            placeholder: 'Enter position / role',
            type: 'text',
            id: '73317e3d-c492-4fe3-9d14-d3879ecfd944',
            className: 'position',
            isRequired: true,
            dataLabel: 'Position / Role',
          },
          {
            name: 'start-date',
            value: '2023-07-13',
            placeholder: 'Enter start date',
            type: 'date',
            id: '184f98a5-7420-4a60-8620-ede78c35db14',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '2023-10-16',
            placeholder: 'Enter end date',
            type: 'date',
            id: '74ab5e47-19e2-4b8b-bcb0-6942c8aae654',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'San Diego, CA',
            placeholder: 'Enter city, country',
            type: 'text',
            id: 'e3d51daf-8fd9-4b12-ba86-a7860e17a7d7',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: '3da9be8f-e23b-408b-9cdc-eda907f3e16f',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: '2f1ede08-6c02-46cc-831e-b20a3ca546fb',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: 'c1ac4010-d349-4be7-9ffc-e53d5f2ecf38',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: '38a8e4c2-caa9-4aa7-b309-ea994911b362',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
    ];
    const exampleEducation = [
      {
        id: 'education-a4dd0e95-c53f-4513-8671-8133296d9399',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'school',
            value: 'High School Musical',
            placeholder: 'Enter school / university',
            type: 'text',
            id: '826a1d56-c7e7-4ea1-99bb-077a607295c3',
            className: 'school',
            isRequired: true,
            dataLabel: 'School',
          },
          {
            name: 'degree',
            value: 'MA in Biology',
            placeholder: 'Enter degree / diploma',
            type: 'text',
            id: '44bf1a3b-e4c0-493c-b116-a55ece5c3f74',
            className: 'degree',
            isRequired: true,
            dataLabel: 'Degree / Diploma',
          },
          {
            name: 'start-date',
            value: '2023-02-10',
            placeholder: 'Enter start date',
            type: 'date',
            id: 'ccd666bd-4771-4171-ad50-3a17f462b324',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '',
            placeholder: 'Enter end date',
            type: 'date',
            id: '49b7aadb-4c26-4e3d-a0fb-8d8acdc20b36',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'New York',
            placeholder: 'Enter city, country',
            type: 'text',
            id: '52f6f3a5-6bba-4655-8f2b-0900631e6fef',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: '2e0a1c56-f702-4937-a4cf-e607a098a5fd',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: '863086f4-f2fb-468d-aa1d-96c9389c5ad1',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: 'ef2fcbeb-9af7-425d-940a-cab2eb888fd6',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: '23dfbf18-1237-4884-8fc7-086c9c16fac5',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
      {
        id: 'education-ee4ecb66-32c7-4241-b667-978ced451367',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'school',
            value: 'CodePong Bootcamp',
            placeholder: 'Enter school / university',
            type: 'text',
            id: '98b1c3c6-a43f-47f3-9a6a-a8ba9425e614',
            className: 'school',
            isRequired: true,
            dataLabel: 'School',
          },
          {
            name: 'degree',
            value: 'JavaScript Enjoyer Course',
            placeholder: 'Enter degree / diploma',
            type: 'text',
            id: '382c204d-338c-4c57-bdc7-f93596e29b49',
            className: 'degree',
            isRequired: true,
            dataLabel: 'Degree / Diploma',
          },
          {
            name: 'start-date',
            value: '2024-01-17',
            placeholder: 'Enter start date',
            type: 'date',
            id: '8e3709da-5eac-41a2-b168-ac07e81c6951',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '2024-02-14',
            placeholder: 'Enter end date',
            type: 'date',
            id: '1f4418be-1cde-4468-9243-4c0423cf989c',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'Paris, France',
            placeholder: 'Enter city, country',
            type: 'text',
            id: '6eb51c3a-f569-4601-a170-2ea7cc753a80',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: '4351437d-95f4-4e60-a58b-01f91fb341eb',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: 'e24b253c-8166-43f9-b3af-d8dbbf8d4334',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: 'f7819429-0c2d-438b-b664-ff9571b0f335',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: '197af7ad-e3fd-4c89-9181-76ec7fa8507d',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
      {
        id: 'education-04e637bf-b15f-45c3-91d4-7fd286f49ee4',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'school',
            value: 'Apocalypse Training Ground',
            placeholder: 'Enter school / university',
            type: 'text',
            id: 'b61aba0f-e908-4760-bb82-483eb77dcd82',
            className: 'school',
            isRequired: true,
            dataLabel: 'School',
          },
          {
            name: 'degree',
            value: 'Mushroom Foraging Expert',
            placeholder: 'Enter degree / diploma',
            type: 'text',
            id: '67110cd1-80bf-4f63-8551-9e0f9cc81933',
            className: 'degree',
            isRequired: true,
            dataLabel: 'Degree / Diploma',
          },
          {
            name: 'start-date',
            value: '2023-05-23',
            placeholder: 'Enter start date',
            type: 'date',
            id: '13545839-9c04-41dd-a2aa-5e22dd070a5b',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '2023-12-28',
            placeholder: 'Enter end date',
            type: 'date',
            id: '331a6dd1-856d-4693-9fde-f5575d66d9a5',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'Secret Location',
            placeholder: 'Enter city, country',
            type: 'text',
            id: 'ff20ea0b-5310-49c9-87b3-87e6f9dafa1e',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: 'e16c0106-92ed-4bcb-8655-03cc5102533b',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: '5d70cf03-9950-4536-a1fa-00a047d0dddc',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: '2f64096c-3d52-41eb-9fd5-b2d1194290bf',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: 'bd651c4f-8082-4b13-936e-8cd46b5735b0',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
      {
        id: 'education-885eaeb6-b07c-4fef-9b7c-752c0100932d',
        isEditing: false,
        isVisible: true,
        inputs: [
          {
            name: 'school',
            value: 'Hofmann School of Businness',
            placeholder: 'Enter school / university',
            type: 'text',
            id: '2fbc3af6-3163-4b8e-baef-54741552f926',
            className: 'school',
            isRequired: true,
            dataLabel: 'School',
          },
          {
            name: 'degree',
            value: 'AI Trading Expert',
            placeholder: 'Enter degree / diploma',
            type: 'text',
            id: '6c65288e-788f-4413-9245-92e9795a63ff',
            className: 'degree',
            isRequired: true,
            dataLabel: 'Degree / Diploma',
          },
          {
            name: 'start-date',
            value: '2023-09-13',
            placeholder: 'Enter start date',
            type: 'date',
            id: '7b6a340b-9852-462b-b7cb-01f69182d673',
            className: 'start-date',
            isRequired: false,
            dataLabel: 'Start Date',
          },
          {
            name: 'end-date',
            value: '2023-12-01',
            placeholder: 'Enter end date',
            type: 'date',
            id: '9f2af3ca-9bef-4483-9ddf-530066ecd4ac',
            className: 'end-date',
            isRequired: false,
            dataLabel: 'End Date',
          },
          {
            name: 'location',
            value: 'London, UK',
            placeholder: 'Enter city, country',
            type: 'text',
            id: '98785ba0-01b8-414e-bb9e-d59f0b1a10e8',
            className: 'location',
            isRequired: false,
            dataLabel: 'Location',
          },
          {
            name: 'description',
            value: '',
            placeholder: 'Enter description',
            type: 'textarea',
            id: '6fd212fb-8947-4f3a-bc02-58f03464cbb8',
            className: 'description',
            isRequired: false,
            dataLabel: 'Description',
          },
        ],
        buttons: [
          {
            name: 'delete',
            className: 'delete-button',
            id: '777a2544-a6a6-4878-b3f6-ec8c9d151a7e',
            iconPath:
              'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z',
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: 'c72cd38e-2777-46b7-a9e6-65e6441ffa06',
            iconPath:
              'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: '5546e638-cc98-4988-971d-c020a2864dbf',
            iconPath:
              'M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z',
            text: 'Save',
          },
        ],
      },
    ];

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
      const newForm = {
        id: `education-${uuidv4()}`,
        isEditing: true,
        isVisible: true,
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
            iconPath: mdiTrashCanOutline,
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: uuidv4(),
            iconPath: mdiCancel,
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: uuidv4(),
            iconPath: mdiContentSave,
            text: 'Save',
          },
        ],
      };
      setEducationForms((prevForms) => [...prevForms, newForm]);
    } else if (formType === 'jobs') {
      const newForm = {
        id: `job-${uuidv4()}`,
        isEditing: true,
        isVisible: true,
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
            iconPath: mdiTrashCanOutline,
            text: 'Delete',
          },
          {
            name: 'cancel',
            type: 'reset',
            className: 'cancel-button',
            id: uuidv4(),
            iconPath: mdiCancel,
            text: 'Cancel',
          },
          {
            name: 'save',
            type: 'submit',
            className: 'save-button',
            id: uuidv4(),
            iconPath: mdiContentSave,
            text: 'Save',
          },
        ],
      };
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
          <p>
            Press <kbd>Ctrl + P</kbd> or <kbd>Cmd + P</kbd> to print
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
