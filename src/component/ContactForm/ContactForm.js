import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import operations from '../../redux/operations';
import { getAllContacts } from '../../redux/contacts-selectors';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
  };
  handleChange = e => {
    // console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    const { contacts, onSubmit } = this.props;
    const { name, number } = this.state;

    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.find(contact => contact.number === number)
      ? alert(`${number} is already in contacts`)
      : onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              value={this.state.name}
              onChange={this.handleChange}
              type="text"
              name="name"
              className={styles.input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>

          <label className={styles.label}>
            Number
            <input
              value={this.state.number}
              onChange={this.handleChange}
              type="tel"
              name="number"
              className={styles.input}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button className={styles.btn} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => {
    return dispatch(operations.addContact(name, number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
