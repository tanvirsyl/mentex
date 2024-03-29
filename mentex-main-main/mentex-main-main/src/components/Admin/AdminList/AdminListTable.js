import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../Alert/ConfirmDialog/ConfirmDialog';
import Notification from '../../Alert/Notification/Notification';
import './AdminList.css';


const AdminListTable = ({ adminList }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
  })

  const deleteEvent = (id) => { /* delete api*/
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    fetch(`http://localhost:5000/deleteAdmin/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          console.log(result)
        }
      })
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    })
  }
  return (
    <div className="table-responsive">
      <table class="table table-striped table-dark table__list">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            adminList.map((admin, index) =>
              <tr key={admin._id}>
                <th scope="row">{index + 1}</th>
                <td>{admin.email}</td>
                <td>{admin.fullName}</td>
                <td>{admin.mobile}</td>
                <td> <button type="button"
                  onClick={() =>
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this record?',
                      subTitle: "You can't undo this operation",
                      onConfirm: () => { deleteEvent(admin._id) }
                    })
                  }
                  class="btn btn-danger"><i className="fas fa-trash"></i></button>
                </td>
                <td>
                  <Link to={`/editAdmin/${admin._id}`}>
                    <button class="btn btn-success" type="button" ><i class="fas fa-edit"></i></button>
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div className="table__banner row mt-3 mb-5 ml-3">
        <h3 className="about-title">Get In Touch</h3>
        <p className="lead">“Anything that’s human is mentionable, and anything that is mentionable can be more manageable. When we can talk about our feelings, they become less overwhelming, less upsetting, and less scary.”</p>
        <p className="lead feel">Feel Free to contact with us...</p>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
};

export default AdminListTable;