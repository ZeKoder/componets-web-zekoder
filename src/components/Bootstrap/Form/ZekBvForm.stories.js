import ZekBvForm from './ZekBvForm.vue'

export default {
  title: 'Bootstrap/ZekBvForm',
  component: ZekBvForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: 'action', action: 'submit' }, 
    onReset: { control: 'action', action: 'reset' },
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
    inputs: [
        {
            component: 'input',
            name: 'email',
            type: 'email',
            require: true,
            label: 'Enter email',
            width: 12,
            errorMessage: 'something wrong',
            placeholder: 'Enter your email',
            description: 'please enter correct email format',
        },
        {
            component: 'input',
            name: 'first_name',
            type: 'text',
            label: 'First name',
            placeholder: 'Enter your first name',
            require: true,
            width: '6 mt-4'
        },
        {
            component: 'input',
            name: 'last_name',
            type: 'text',
            label: 'Last name',
            placeholder: 'Enter your last name',
            require: true,
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
            require: true,
            label: '',
            width: 'auto mt-4'
        },
        {
            component: 'select',
            placeholder: 'Enter your last name',
            value: null,
            items: [
                { value: null, text: 'Please select an option', disabled: true },
                { value: 'male', text: 'Male' },
                { value: 'female', text: 'Female' },
            ],
            require: true,
            name: 'select',
            label: 'Gender',
            width: '12 mt-4'
        },
        {
            component: 'checkbox',
            name: 'checkbox',
            require: true,
            label: '',
            items: [
                {text: 'First Check', value: 'first'},
                {text: 'Second Check', value: 'second'},
            ],
            width: '12 mt-4'
        },
        {
            component: 'textarea',
            name: 'textarea',
            require: true,
            label: 'details',
            value: 'balbal',
            width: 'auto me-auto mt-4'
        },
        {
            component: 'radio',
            name: 'radio',
            require: true,
            label: '',
            items: [
                {text: 'First choice', value: 'first'},
                {text: 'Second choice', value: 'second'},
            ],
            width: '12 mt-4'
        },
      
    ],
    buttons: [
        {
            label: 'Reset',
            type: 'reset',
            width: 'auto mt-4',
            variant: 'danger'
        },
        {
            label: 'Submit',
            type: 'submit',
            width: 'auto mt-4',
            variant: 'primary',
        },
    ]
   
}
