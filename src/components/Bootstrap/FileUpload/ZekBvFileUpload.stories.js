import ZekBvFileUpload from './ZekBvFileUpload.vue'

export default {
  title: 'Bootstrap/ZekBvFileUpload',
  component: ZekBvFileUpload,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    customClass: { type: 'text' },
    customStyle: { type: 'object' },
    required: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    value: {
      control: { type: 'object' }
    },
    name: {
      control: { type: 'text' }
    },
    id: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    onRemove: { control: 'action', action: 'remove' },
    onUpdate: { control: 'action', action: 'update' },
    onPreview: { control: 'action', action: 'preview' },
  }
}

const Template = (args, { argTypes }) => ({
  setup() {
    return { args }
  },
  props: Object.keys(argTypes),
  components: { ZekBvFileUpload },
  template: '<ZekBvFileUpload v-bind="args" />'
})

export const Default = {
  render: Template,
  args: {}
}

export const WithPreloaded = {
  render: Template,
  args: {
    accept: '*',
    value: ['https://files.dev.zekoder.net/asset/7e2453a2-3331-4242-b417-768a47087fce'],
    secure: true,
    accessToken: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFb1ZKVF9MRFJnMXd3QWNYLVVGbmNmZ3AzTHNQbi1haVQ0bWNMRU5RS0JvIn0.eyJleHAiOjE3Mjc5NTQ0MTcsImlhdCI6MTcyNzk1NDExNywiYXV0aF90aW1lIjoxNzI3OTUxMTU4LCJqdGkiOiI1ZTBlMjJiZi02ODQ0LTQ3ZTQtODEwMC05YTg4ZTM0MGZhMjEiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmRldi56ZWtvZGVyLm5ldC9yZWFsbXMvemVzdHVkaW8iLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZWY5Y2VlYzUtNjA0Zi00Yzk1LWIzYmUtNDAzMzZhZTgyYzNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiemVzdHVkaW8td2ViIiwibm9uY2UiOiIzYTM2NjFhMy1jNGNiLTRhMGUtYTNmMC0zZDE4NmE3ZjFmN2MiLCJzZXNzaW9uX3N0YXRlIjoiNzRlMGI1NDUtZjVmNC00NmZlLWI5YzctMTc0YjNkMWVhNzI3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbImNyZWF0ZS1vcmdhbml6YXRpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGdyb3VwcyBvcmdhbml6YXRpb24gcHJvZmlsZSBlbWFpbCIsInNpZCI6Ijc0ZTBiNTQ1LWY1ZjQtNDZmZS1iOWM3LTE3NGIzZDFlYTcyNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJvcmciOnsicm9sZSI6WyJ2aWV3LW9yZ2FuaXphdGlvbiIsIm1hbmFnZS1vcmdhbml6YXRpb24iLCJ2aWV3LW1lbWJlcnMiLCJtYW5hZ2UtbWVtYmVycyIsInZpZXctcm9sZXMiLCJtYW5hZ2Utcm9sZXMiLCJ2aWV3LWludml0YXRpb25zIiwibWFuYWdlLWludml0YXRpb25zIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIl0sIm5hbWUiOiJhYmRhc2giLCJpZCI6IjAyZjJhZjk3LTdjMTYtNGYwZi1hYTdkLTJjYjUzZDdmYTM5NSIsImF0dHJpYnV0ZSI6e319LCJuYW1lIjoiQWJkIEFzaCIsImdyb3VwcyI6WyJtYW5hZ2Utb3JnYW5pemF0aW9uIl0sInByZWZlcnJlZF91c2VybmFtZSI6ImEubWFobXV0b2dsdUBjeWJlcm5ldGljbGFicy5pbyIsImdpdmVuX25hbWUiOiJBYmQiLCJmYW1pbHlfbmFtZSI6IkFzaCIsImVtYWlsIjoiYS5tYWhtdXRvZ2x1QGN5YmVybmV0aWNsYWJzLmlvIn0.T2YornH306yTiRepHdGUPDC9YgO_P-vGGoIvF_1kC7qnsXB9N4pTE0p6q97l7cYuawUu9fjAmWttlNaF0nyNTbf9D0MFqKA_mg6k3pYCz6vKkatvFITeb9QHDS5aHy5jwBcqmLOaE4uYY7jDxHORo8t8GMLP1qgNbcnQRrBZlXDQVk9dCXpeHN4hCbePJWmwuENhMemZKCXZh1RmCnEAJaok8b6zkUvQ57gsCdQLRIVhgT1wdkuJvsV51OOp_0fsnh21gYmXzPj2jCT3En_-ck1MdcbijMzawctGsWNQS6UttmQyzUO8S1L-ZaUq2qo6x4I9YsF2zoUluRBJgnkn_A`,
    allowPreview: true,
    allowRemove: true,
    label: 'File Upload',
  }
}