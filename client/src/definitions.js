export const Font = {
  endpoint: 'fonts',
  fields: [{val: 'id', friendlyName: '#', required: false},
    {val: 'name', friendlyName: 'Name', required: true},
    {val: 'fontFamily', friendlyName: 'Font Family', required: true},
    {val: 'vector', friendlyName: 'Vector', required: true},
    {val: 'boldAllowed', friendlyName: 'Bold Allowed', required: false},
    {val: 'italicAllowed', friendlyName: 'Italic Allowed', required: false}]
};
