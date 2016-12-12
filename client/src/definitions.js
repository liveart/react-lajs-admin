export const Font = {
  endpoint: 'fonts',
  header: 'Fonts',
  fields: [{val: 'id', friendlyName: '#', required: false, isIdentifier: true},
    {val: 'name', friendlyName: 'Name', required: true},
    {val: 'fontFamily', friendlyName: 'Font Family', required: true},
    {val: 'vector', friendlyName: 'Vector', required: true},
    {val: 'boldAllowed', friendlyName: 'Bold Allowed', required: false},
    {val: 'italicAllowed', friendlyName: 'Italic Allowed', required: false}]
};
