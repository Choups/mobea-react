import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Site web', field: 'url' },
      { title: 'Description', field: 'description' },
      { title: 'Pays', field: 'country_idcountry' },
      { title: 'Type', field: 'type' },
      { title: 'Catégorie', field: 'category' },
      { title: 'Contact', field: 'contact' },
      { title: 'Echanges', field: 'exchanges' }
    ],
    data: []
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/provider`)
      .then(response => response.data)
      .then(data => setState({ ...state, data: data }))
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MaterialTable
      title="Liste des fournisseurs"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            axios
              .post(`${process.env.REACT_APP_API_URL}/api/provider/new`, {
                url: newData.url,
                description: newData.description,
                country_idcountry: newData.country_idcountry,
                type: newData.type,
                category: newData.category,
                contact: newData.contact,
                exchanges: newData.exchanges
              })
              .catch(function (error) {
                console.log(error);
              });
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            axios
              .put(`${process.env.REACT_APP_API_URL}/api/provider/${newData.idprovider}`, {
                url: newData.url,
                description: newData.description,
                country_idcountry: newData.country_idcountry,
                type: newData.type,
                category: newData.category,
                contact: newData.contact,
                exchanges: newData.exchanges
              })
              .then(function (response) {
                console.log(response.data);
              });
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}
