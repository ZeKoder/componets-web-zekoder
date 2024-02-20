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
    inputs: [
        {
            component: 'input',
            name: 'email',
            type: 'email',
            require: true,
            label: 'enter email',
            width: 6,
            errorMessage: 'something wrong',
            description: 'please enter correct email format',
        },
        {
            component: 'input',
            name: 'date',
            type: 'date',
            require: true,
            label: 'enter date',
            width: 6
        },
        {
            component: 'label',
            label: 'custom label',
            width: 6
        },
        {
            component: 'input',
            name: 'text',
            type: 'text',
            value: 'balbal',
            require: true,
            width: '6'
        },
        {
            component: 'select',
            items: [
                'one', 'two'
            ],
            require: true,
            name: 'select',
            label: 'choose',
            width: '12'
        },
    ],
    buttons: [
        {
            label: 'Reset',
            type: 'reset',
            width: 'auto',
            variant: 'danger'
           
        },
        {
            label: 'Submit',
            type: 'submit',
            width: 'auto',
            variant: 'primary'
        },
    ]
   
}
