import ZekContainer  from './ZekContainer.vue';

export default {
  title: 'Common/ZekContainter',
  component: ZekContainer,
  tags: ['autodocs'],
};

const Template = (args, { argTypes }) => ({
  components: { ZekContainer },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: '<ZekContainer v-bind="args"/>',
});

export const Simple = Template.bind({});
Simple.args = { 
  column: {
    rows: [
      {
        columns: [
          {
            columnWidth: 12,
            class: "text-center",
            component: "ZekBvButton",
            data: {
              label: 'Hello World'
            }
          },
          {
            columnWidth: 12,
            component: "ZekBSelect",
            data: {
              label: 'Hello World'
            }
          }
        ]
      }
    ]
  }
};
