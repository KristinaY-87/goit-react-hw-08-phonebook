import React from 'react';
import { connect } from 'react-redux';
import operations from '../../redux/operations';
import styles from './ContactList.module.css';
import { getVisibleContacts } from '../../redux/contacts-selectors';

const ContactList = ({ contacts, onDeleteContacts }) => (
  <>
    <h2 className={styles.title}>Contacts</h2>
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <span className={styles.text}>
            {name}: {number}
          </span>

          <button
            className={styles.btn}
            type="button"
            onClick={() => onDeleteContacts(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContacts: id => dispatch(operations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
