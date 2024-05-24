import ZekBvForm from './ZekBvForm.vue'

export default {
  title: 'Bootstrap/ZekBvForm',
  component: ZekBvForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: 'action', action: 'submit' },
    onReset: { control: 'action', action: 'reset' },
    onCancel: { control: 'action', action: 'cancel' }
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvForm },
  template: '<ZekBvForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  customClass: 'container bg-white p-3 rounded',
  initialData: {
    email: 'asd@asd.com',
    first_name: 'John',
    last_name: 'Doe',
  },
  inputs: [
    {
      component: 'input',
      name: 'email',
      type: 'email',
      required: true,
      label: 'Enter email',
      width: 12,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      placeholder: 'Enter your email',
      description: 'please enter correct email format'
    },
    {
      component: 'input',
      name: 'first_name',
      type: 'text',
      min: '10',
      label: 'First name',
      placeholder: 'Enter your first name',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '6 mt-4'
    },
    {
      component: 'input',
      name: 'last_name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Enter your last name',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '6 mt-4'
    },
    {
      component: 'label',
      text: 'Date of birth',
      width: 'auto mt-4'
    },
    {
      component: 'input',
      name: 'date',
      type: 'date',
      required: true,
      label: '',
      width: 'auto mt-4',
      errorMessage: 'something wrong',
      successMessage: 'looks good'
    },
    {
      component: 'select',
      placeholder: 'Enter your last name',

      items: [
        { value: '1', text: 'Please select an option', disabled: true },
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      required: true,
      name: 'select',
      label: 'Gender',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '12 mt-4'
    },
    {
      component: 'checkbox',
      name: 'checkbox',
      numberOfRequiredChecks: 1,
      label: 'checkbox',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      items: [
        { text: 'First Check', value: 'first' },
        { text: 'Second Check', value: 'second' }
      ],
      width: '12 mt-4'
    },
    {
      component: 'textarea',
      name: 'textarea',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      label: 'details',
      value: 'balbal',
      width: 'auto me-auto mt-4'
    },
    {
      component: 'radio',
      name: 'radio',
      required: true,
      label: 'radio',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      items: [
        { text: 'First choice', value: 'first' },
        { text: 'Second choice', value: 'second' }
      ],
      width: '12 mt-4'
    }
  ]
}

export const WithSteps = Template.bind({})
WithSteps.args = {
  customClass: 'container bg-white p-3 rounded',
  allowSteps: true,
  initialData: {
    email: 'asd@asd.com',
    first_name: 'John',
    last_name: 'Doe',
  },
  inputs: [
    {
      component: 'input',
      name: 'email',
      type: 'email',
      required: true,
      label: 'Enter email',
      width: 12,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      placeholder: 'Enter your email',
      description: 'please enter correct email format',
      step: 1
    },
    {
      component: 'input',
      name: 'first_name',
      type: 'text',
      min: '10',
      label: 'First name',
      placeholder: 'Enter your first name',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '6 mt-4',
      step: 2
    },
    {
      component: 'input',
      name: 'last_name',
      type: 'text',
      label: 'Last name',
      placeholder: 'Enter your last name',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '6 mt-4',
      step: 2
    },
    {
      component: 'label',
      text: 'Date of birth',
      width: 'auto mt-4',
      step: 3
    },
    {
      component: 'input',
      name: 'date',
      type: 'date',
      required: true,
      label: '',
      width: 'auto mt-4',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      step: 3
    },
    {
      component: 'select',
      placeholder: 'Enter your last name',
      items: [
        { value: '1', text: 'Please select an option', disabled: true },
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
      ],
      required: true,
      name: 'select',
      label: 'Gender',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      width: '12 mt-4',
      step: 4
    },
    {
      component: 'checkbox',
      name: 'checkbox',
      numberOfRequiredChecks: 1,
      label: 'checkbox',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      items: [
        { text: 'First Check', value: 'first' },
        { text: 'Second Check', value: 'second' }
      ],
      width: '12 mt-4',
      step: 4
    },
    {
      component: 'textarea',
      name: 'textarea',
      required: true,
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      label: 'details',
      value: 'balbal',
      width: 'auto me-auto mt-4',
      step: 5
    },
    {
      component: 'radio',
      name: 'radio',
      required: true,
      label: 'radio',
      errorMessage: 'something wrong',
      successMessage: 'looks good',
      items: [
        { text: 'First choice', value: 'first' },
        { text: 'Second choice', value: 'second' }
      ],
      width: '12 mt-4',
      step: 5
    }
  ]
}